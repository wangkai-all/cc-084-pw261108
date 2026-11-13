// 离线 Canvas 地图渲染器：无任何在线底图。
// 背景为经纬网格 + 海岸线占位说明；支持平移缩放、要素拾取、问题定位高亮。
import { transformGeometry } from './crs.js';
import { eachCoord, eachRing, eachLine, bbox, splitLineAtDateline, isEmptyGeom } from './geom.js';

const SEVERITY_COLOR = {
  critical: '#d03b3b',
  serious: '#ec835a',
  warning: '#fab219',
  info: '#2a78d6',
};

export class MapView {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cb = callbacks;
    this.layers = [];                 // { layer, visible, color, displayCrs }
    this.view = { cx: 0, cy: 0, scale: 1 }; // 屏幕像素/每显示坐标单位
    this.geoMode = true;              // 当前显示坐标是否为地理坐标
    this.mapCrs = 'EPSG:4326';        // 地图级统一显示 CRS：所有已知 CRS 图层都转换到它
    this.highlightFid = null;
    this.hoverFid = null;
    this.hitRegions = [];             // { fid, paths, points, bbox }
    this.dpr = window.devicePixelRatio || 1;
    this.bindEvents();
    this.resize();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.w = rect.width; this.h = rect.height;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.render();
  }

  setLayers(layers) { this.layers = []; this.hitRegions = []; this.layers = layers; }
  setHighlight(fid) { this.highlightFid = fid; this.render(); }

  // 切换地图级统一显示 CRS；清空各图层的转换缓存
  setMapCrs(code) {
    this.mapCrs = code;
    for (const entry of this.layers) entry._cache = null;
  }

  // 该图层在当前地图 CRS 下是否可绘制：
  // 有已知 CRS 的图层总能转换；缺 CRS 图层仅在地理模式按原始经纬度参与显示
  entryDrawable(entry) {
    return Boolean(entry.layer.crs) || this.geoMode;
  }

  // 要素在地图统一 CRS 下的显示几何（带每图层缓存）。不可绘制时返回 null。
  displayGeom(feature, entry) {
    if (!this.entryDrawable(entry)) return null;
    if (!entry.layer.crs || entry.layer.crs === this.mapCrs) return feature.geometry;
    const key = feature.fid;
    if (entry._cache && entry._cache.mapCrs === this.mapCrs && entry._cache.fid === key) {
      return entry._cache.geom;
    }
    const geom = transformGeometry(feature.geometry, entry.layer.crs, this.mapCrs);
    entry._cache = { fid: key, mapCrs: this.mapCrs, geom };
    return geom;
  }

  // 坐标 -> 屏幕
  project(x, y) {
    return [this.w / 2 + (x - this.view.cx) * this.view.scale,
      this.h / 2 - (y - this.view.cy) * this.view.scale];
  }

  unproject(px, py) {
    return [this.view.cx + (px - this.w / 2) / this.view.scale,
      this.view.cy - (py - this.h / 2) / this.view.scale];
  }

  // 按全部可见、可绘制图层数据范围自适应（统一在地图 CRS 坐标空间内）。
  // 异常数据（越界点、跨日期变更线的近全球跨度要素）仍会渲染，但不主导视图范围，
  // 否则正常要素会被压成亚像素。
  fitToData() {
    const boxes = [];
    for (const entry of this.layers) {
      if (!entry.visible || !this.entryDrawable(entry)) continue;
      for (const f of entry.layer.features) {
        if (f.empty || isEmptyGeom(f.geometry)) continue;
        const g = this.displayGeom(f, entry);
        if (!g) continue;
        const b = bbox(g);
        if (b) boxes.push(b);
      }
    }
    if (!boxes.length) {
      this.view = { cx: 0, cy: this.geoMode ? 20 : 0, scale: this.geoMode ? Math.min(this.w, this.h) / 90 : 1 };
      this.render();
      return;
    }
    const median = (arr) => {
      const s = [...arr].sort((a, b) => a - b);
      const m = Math.floor(s.length / 2);
      return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
    };
    const spanX = boxes.map((b) => b[2] - b[0]);
    const spanY = boxes.map((b) => b[3] - b[1]);
    const valid = boxes.filter((b) => {
      if (this.geoMode) {
        // 越界点/颠倒到极区的点：超出有效经纬度范围，不参与取景
        if (b[0] < -180 || b[2] > 180 || b[1] < -90 || b[3] > 90) return false;
        // 跨日期变更线的近全球跨度要素（经度跨度接近 360），不参与取景
        if ((b[2] - b[0]) > 300) return false;
        return true;
      }
      // 平面模式：无全局有效范围，用典型跨度的倍数排除离群
      const typX = Math.max(median(spanX), 1e-9);
      const typY = Math.max(median(spanY), 1e-9);
      return (b[2] - b[0]) <= typX * 20 && (b[3] - b[1]) <= typY * 20;
    });
    const use = valid.length ? valid : boxes;
    let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity;
    for (const b of use) {
      minX = Math.min(minX, b[0]); maxX = Math.max(maxX, b[2]);
      minY = Math.min(minY, b[1]); maxY = Math.max(maxY, b[3]);
    }
    const pad = 40;
    const dx = Math.max(maxX - minX, 1e-9); const dy = Math.max(maxY - minY, 1e-9);
    const sx = (this.w - pad * 2) / dx; const sy = (this.h - pad * 2) / dy;
    this.view = {
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      scale: Math.min(sx, sy),
    };
    this.render();
  }

  // 要素在地图统一 CRS 下的外包框
  displayBBox(feature, entry) {
    const g = this.displayGeom(feature, entry);
    return g ? bbox(g) : null;
  }

  // 定位到某要素
  zoomToFeature(feature, entry) {
    const b = this.displayBBox(feature, entry);
    if (!b) return;
    const pad = 60;
    const dx = Math.max(b[2] - b[0], 1e-9); const dy = Math.max(b[3] - b[1], 1e-9);
    this.view.cx = (b[0] + b[2]) / 2;
    this.view.cy = (b[1] + b[3]) / 2;
    this.view.scale = Math.min((this.w - pad * 2) / dx, (this.h - pad * 2) / dy, this.view.scale * 4);
    this.highlightFid = feature.fid;
    this.render();
  }

  bindEvents() {
    let drag = null;
    this.canvas.addEventListener('pointerdown', (e) => {
      drag = { x: e.offsetX, y: e.offsetY, vx: this.view.cx, vy: this.view.cy, moved: false };
      this.canvas.setPointerCapture(e.pointerId);
    });
    this.canvas.addEventListener('pointermove', (e) => {
      if (drag) {
        const dx = e.offsetX - drag.x; const dy = e.offsetY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
        this.view.cx = drag.vx - dx / this.view.scale;
        this.view.cy = drag.vy + dy / this.view.scale;
        this.render();
      } else {
        const hit = this.pick(e.offsetX, e.offsetY);
        this.canvas.style.cursor = hit ? 'pointer' : 'grab';
        if ((hit && hit.fid) !== this.hoverFid) {
          this.hoverFid = hit ? hit.fid : null;
          this.render();
          if (this.cb.onHover) this.cb.onHover(hit, { x: e.offsetX, y: e.offsetY });
        }
      }
    });
    this.canvas.addEventListener('pointerup', (e) => {
      if (drag && !drag.moved) {
        const hit = this.pick(e.offsetX, e.offsetY);
        if (hit && this.cb.onPick) this.cb.onPick(hit);
      }
      drag = null;
    });
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      const [gx, gy] = this.unproject(e.offsetX, e.offsetY);
      this.view.scale *= factor;
      const [gx2, gy2] = this.unproject(e.offsetX, e.offsetY);
      this.view.cx += gx - gx2;
      this.view.cy += gy - gy2;
      this.render();
    }, { passive: false });
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.canvas);
  }

  pick(px, py) {
    for (const region of this.hitRegions) {
      const nearPoint = region.points.some(([x, y]) => Math.hypot(x - px, y - py) <= 7);
      if (nearPoint) return { fid: region.fid, entry: region.entry, feature: region.feature };
      const inPath = region.paths.some((path) => {
        const ctx = this.ctx;
        ctx.beginPath();
        path(ctx);
        return ctx.isPointInPath(px, py);
      });
      if (inPath) return { fid: region.fid, entry: region.entry, feature: region.feature };
    }
    return null;
  }

  // ---- 渲染 ----------------------------------------------------------------
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    this.drawBackground();
    if (this.geoMode) this.drawGraticule();
    else this.drawPlanarGrid();
    this.hitRegions = [];
    for (const entry of this.layers) {
      if (!entry.visible) continue;
      this.drawLayer(entry);
    }
    this.drawChrome();
  }

  drawBackground() {
    const ctx = this.ctx;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--map-bg') || '#0f1620';
    ctx.fillRect(0, 0, this.w, this.h);
  }

  niceStep(rangePx) {
    const target = rangePx / 6;
    const pow = 10 ** Math.floor(Math.log10(target));
    const candidates = [1, 2, 2.5, 5, 10].map((m) => m * pow);
    return candidates.find((c) => c >= target) || candidates[candidates.length - 1];
  }

  drawGraticule() {
    const ctx = this.ctx;
    const [left, top] = this.unproject(0, 0);
    const [right, bottom] = this.unproject(this.w, this.h);
    const step = this.niceStep(this.w);
    ctx.lineWidth = 1;
    ctx.font = '11px system-ui, sans-serif';
    for (let lon = Math.ceil(left / step) * step; lon <= right; lon += step) {
      const [x] = this.project(lon, 0);
      ctx.strokeStyle = 'rgba(140,160,190,0.18)';
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.h); ctx.stroke();
      ctx.fillStyle = 'rgba(170,185,210,0.75)';
      ctx.fillText(`${lon.toFixed(step < 1 ? 1 : 0)}°E`, x + 4, this.h - 8);
    }
    for (let lat = Math.ceil(bottom / step) * step; lat <= top; lat += step) {
      const [, y] = this.project(0, lat);
      ctx.strokeStyle = 'rgba(140,160,190,0.18)';
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.w, y); ctx.stroke();
      ctx.fillStyle = 'rgba(170,185,210,0.75)';
      ctx.fillText(`${lat.toFixed(step < 1 ? 1 : 0)}°N`, 6, y - 4);
    }
  }

  drawPlanarGrid() {
    const ctx = this.ctx;
    const [left, top] = this.unproject(0, 0);
    const [right, bottom] = this.unproject(this.w, this.h);
    const step = this.niceStep(this.w);
    ctx.font = '11px system-ui, sans-serif';
    for (let x = Math.ceil(left / step) * step; x <= right; x += step) {
      const [px] = this.project(x, 0);
      ctx.strokeStyle = 'rgba(140,160,190,0.15)';
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, this.h); ctx.stroke();
      ctx.fillStyle = 'rgba(170,185,210,0.7)';
      ctx.fillText(`${x.toFixed(0)} m`, px + 4, this.h - 8);
    }
    for (let y = Math.ceil(bottom / step) * step; y <= top; y += step) {
      const [, py] = this.project(0, y);
      ctx.strokeStyle = 'rgba(140,160,190,0.15)';
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(this.w, py); ctx.stroke();
      ctx.fillStyle = 'rgba(170,185,210,0.7)';
      ctx.fillText(`${y.toFixed(0)} m`, 6, py - 4);
    }
  }

  drawLayer(entry) {
    if (!this.entryDrawable(entry)) return;
    for (const feature of entry.layer.features) {
      if (feature.empty) continue;
      const geom = this.displayGeom(feature, entry);
      if (!geom) continue;
      const isHi = this.highlightFid === feature.fid;
      const isHover = this.hoverFid === feature.fid;
      const color = isHi ? '#ffd23d' : entry.color;
      const region = { fid: feature.fid, entry, feature, paths: [], points: [] };
      this.drawGeometry(geom, color, isHi, isHover, region);
      this.hitRegions.push(region);
    }
  }

  toScreenPath(coords) {
    const [sx, sy] = this.project(coords[0], coords[1]);
    return [sx, sy];
  }

  drawGeometry(geom, color, isHi, isHover, region) {
    const ctx = this.ctx;
    const drawLinePts = (pts) => {
      const path = (c) => {
        pts.forEach((p, i) => {
          const [x, y] = this.toScreenPath(p);
          if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
        });
      };
      region.paths.push(path);
      ctx.beginPath(); path(ctx); ctx.stroke();
    };
    ctx.lineWidth = isHi ? 3 : 1.6;
    ctx.strokeStyle = color;
    ctx.fillStyle = this.hexA(color, isHover ? 0.35 : 0.18);

    if (geom.type === 'Point' || geom.type === 'MultiPoint') {
      const pts = geom.type === 'Point' ? [geom.coordinates] : geom.coordinates;
      pts.forEach((p) => {
        const [x, y] = this.toScreenPath(p);
        region.points.push([x, y]);
        ctx.beginPath();
        ctx.arc(x, y, isHi ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        ctx.lineWidth = 1.5; ctx.strokeStyle = '#ffffff'; ctx.stroke();
        ctx.fillStyle = this.hexA(color, 0.18);
      });
      return;
    }
    if (geom.type === 'LineString' || geom.type === 'MultiLineString') {
      const lines = geom.type === 'LineString' ? [geom.coordinates] : geom.coordinates;
      for (const line of lines) {
        // 日期变更线：渲染拆分，原始几何不动
        for (const part of splitLineAtDateline(line)) drawLinePts(part);
      }
      return;
    }
    if (geom.type === 'Polygon' || geom.type === 'MultiPolygon') {
      const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
      for (const poly of polys) {
        for (const ring of poly) {
          const parts = splitLineAtDateline(ring);
          for (const part of parts) {
            const path = (c) => {
              part.forEach((p, i) => {
                const [x, y] = this.toScreenPath(p);
                if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
              });
            };
            region.paths.push(path);
            ctx.beginPath(); path(ctx);
            ctx.fillStyle = this.hexA(color, isHover ? 0.35 : 0.16);
            ctx.fill();
            ctx.strokeStyle = color; ctx.stroke();
          }
        }
      }
      return;
    }
    if (geom.type === 'GeometryCollection') {
      geom.geometries.forEach((g) => this.drawGeometry(g, color, isHi, isHover, region));
    }
  }

  drawChrome() {
    const ctx = this.ctx;
    // 指北针
    ctx.save();
    ctx.translate(this.w - 34, 44);
    ctx.fillStyle = 'rgba(240,239,236,0.9)';
    ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(7, 10); ctx.lineTo(0, 5); ctx.lineTo(-7, 10); ctx.closePath(); ctx.fill();
    ctx.font = 'bold 11px system-ui'; ctx.textAlign = 'center';
    ctx.fillText('N', 0, -20);
    ctx.restore();
    // 比例尺
    const step = this.niceStep(160);
    const pxLen = step * this.view.scale;
    if (pxLen > 20 && pxLen < this.w / 2) {
      ctx.strokeStyle = 'rgba(240,239,236,0.85)'; ctx.fillStyle = 'rgba(240,239,236,0.85)';
      ctx.lineWidth = 2;
      const x0 = 20; const y0 = this.h - 24;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + pxLen, y0);
      ctx.moveTo(x0, y0 - 5); ctx.lineTo(x0, y0 + 5);
      ctx.moveTo(x0 + pxLen, y0 - 5); ctx.lineTo(x0 + pxLen, y0 + 5); ctx.stroke();
      ctx.font = '11px system-ui'; ctx.textAlign = 'left';
      const label = this.geoMode ? `${step}°` : step >= 1000 ? `${step / 1000} km` : `${step} m`;
      ctx.fillText(label, x0, y0 - 8);
    }
    // 无在线底图声明
    ctx.font = '11px system-ui'; ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(170,185,210,0.6)';
    ctx.fillText('离线渲染 · 无在线底图', this.w - 12, this.h - 10);
  }

  hexA(hex, alpha) {
    const m = hex.replace('#', '');
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
}

export { SEVERITY_COLOR };
