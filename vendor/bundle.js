var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/util.js
function deepClone(v) {
  return v === void 0 ? v : JSON.parse(JSON.stringify(v));
}
function isNum(v) {
  return typeof v === "number" && Number.isFinite(v);
}
function uid(prefix = "id") {
  uidCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${uidCounter}`;
}
function fmtArea(m2) {
  if (m2 === null || m2 === void 0 || !Number.isFinite(m2)) return "\u2014";
  const a = Math.abs(m2);
  if (a >= 1e6) return `${(m2 / 1e6).toFixed(3)} km\xB2`;
  if (a >= 1) return `${m2.toFixed(2)} m\xB2`;
  return `${(m2 * 1e4).toFixed(2)} ha`.replace("ha", "ha");
}
function download(filename, text, mime = "application/json") {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function makeCsv(rows) {
  return rows.map(
    (r) => r.map((cell) => {
      const s = String(cell ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  ).join("\n");
}
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function stableHash(value) {
  const s = JSON.stringify(
    value,
    (k, v) => typeof v === "number" ? Number(v.toFixed(9)) : v
  );
  let h = 5381;
  for (let i2 = 0; i2 < s.length; i2 += 1) {
    h = (h << 5) + h + s.charCodeAt(i2) | 0;
  }
  return `h${(h >>> 0).toString(36)}`;
}
var uidCounter;
var init_util = __esm({
  "src/util.js"() {
    uidCounter = 0;
  }
});

// node_modules/proj4/lib/global.js
function global_default(defs2) {
  defs2("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs2("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs2("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
  for (var i2 = 1; i2 <= 60; ++i2) {
    defs2("EPSG:" + (32600 + i2), "+proj=utm +zone=" + i2 + " +datum=WGS84 +units=m");
    defs2("EPSG:" + (32700 + i2), "+proj=utm +zone=" + i2 + " +south +datum=WGS84 +units=m");
  }
  defs2("EPSG:5041", "+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
  defs2("EPSG:5042", "+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
  defs2.WGS84 = defs2["EPSG:4326"];
  defs2["EPSG:3785"] = defs2["EPSG:3857"];
  defs2.GOOGLE = defs2["EPSG:3857"];
  defs2["EPSG:900913"] = defs2["EPSG:3857"];
  defs2["EPSG:102113"] = defs2["EPSG:3857"];
}
var init_global = __esm({
  "node_modules/proj4/lib/global.js"() {
  }
});

// node_modules/proj4/lib/constants/values.js
var PJD_3PARAM, PJD_7PARAM, PJD_GRIDSHIFT, PJD_WGS84, PJD_NODATUM, SRS_WGS84_SEMIMAJOR, SRS_WGS84_SEMIMINOR, SRS_WGS84_ESQUARED, SEC_TO_RAD, HALF_PI, SIXTH, RA4, RA6, EPSLN, D2R, R2D, FORTPI, TWO_PI, SPI;
var init_values = __esm({
  "node_modules/proj4/lib/constants/values.js"() {
    PJD_3PARAM = 1;
    PJD_7PARAM = 2;
    PJD_GRIDSHIFT = 3;
    PJD_WGS84 = 4;
    PJD_NODATUM = 5;
    SRS_WGS84_SEMIMAJOR = 6378137;
    SRS_WGS84_SEMIMINOR = 6356752314e-3;
    SRS_WGS84_ESQUARED = 0.0066943799901413165;
    SEC_TO_RAD = 484813681109536e-20;
    HALF_PI = Math.PI / 2;
    SIXTH = 0.16666666666666666;
    RA4 = 0.04722222222222222;
    RA6 = 0.022156084656084655;
    EPSLN = 1e-10;
    D2R = 0.017453292519943295;
    R2D = 57.29577951308232;
    FORTPI = Math.PI / 4;
    TWO_PI = Math.PI * 2;
    SPI = 3.14159265359;
  }
});

// node_modules/proj4/lib/constants/PrimeMeridian.js
var primeMeridian, PrimeMeridian_default;
var init_PrimeMeridian = __esm({
  "node_modules/proj4/lib/constants/PrimeMeridian.js"() {
    primeMeridian = {};
    primeMeridian.greenwich = 0;
    primeMeridian.lisbon = -9.131906111111;
    primeMeridian.paris = 2.337229166667;
    primeMeridian.bogota = -74.080916666667;
    primeMeridian.madrid = -3.687938888889;
    primeMeridian.rome = 12.452333333333;
    primeMeridian.bern = 7.439583333333;
    primeMeridian.jakarta = 106.807719444444;
    primeMeridian.ferro = -17.666666666667;
    primeMeridian.brussels = 4.367975;
    primeMeridian.stockholm = 18.058277777778;
    primeMeridian.athens = 23.7163375;
    primeMeridian.oslo = 10.722916666667;
    PrimeMeridian_default = primeMeridian;
  }
});

// node_modules/proj4/lib/constants/units.js
var units_default;
var init_units = __esm({
  "node_modules/proj4/lib/constants/units.js"() {
    units_default = {
      mm: { to_meter: 1e-3 },
      cm: { to_meter: 0.01 },
      ft: { to_meter: 0.3048 },
      "us-ft": { to_meter: 1200 / 3937 },
      fath: { to_meter: 1.8288 },
      kmi: { to_meter: 1852 },
      "us-ch": { to_meter: 20.1168402336805 },
      "us-mi": { to_meter: 1609.34721869444 },
      km: { to_meter: 1e3 },
      "ind-ft": { to_meter: 0.30479841 },
      "ind-yd": { to_meter: 0.91439523 },
      mi: { to_meter: 1609.344 },
      yd: { to_meter: 0.9144 },
      ch: { to_meter: 20.1168 },
      link: { to_meter: 0.201168 },
      dm: { to_meter: 0.1 },
      in: { to_meter: 0.0254 },
      "ind-ch": { to_meter: 20.11669506 },
      "us-in": { to_meter: 0.025400050800101 },
      "us-yd": { to_meter: 0.914401828803658 }
    };
  }
});

// node_modules/proj4/lib/match.js
function match(obj, key2) {
  if (obj[key2]) {
    return obj[key2];
  }
  var keys2 = Object.keys(obj);
  var lkey = key2.toLowerCase().replace(ignoredChar, "");
  var i2 = -1;
  var testkey, processedKey;
  while (++i2 < keys2.length) {
    testkey = keys2[i2];
    processedKey = testkey.toLowerCase().replace(ignoredChar, "");
    if (processedKey === lkey) {
      return obj[testkey];
    }
  }
}
var ignoredChar;
var init_match = __esm({
  "node_modules/proj4/lib/match.js"() {
    ignoredChar = /[\s_\-\/\(\)]/g;
  }
});

// node_modules/proj4/lib/projString.js
function projString_default(defData) {
  var self = {};
  var paramObj = defData.split("+").map(function(v) {
    return v.trim();
  }).filter(function(a) {
    return a;
  }).reduce(function(p, a) {
    var split = a.split("=");
    split.push(true);
    p[split[0].toLowerCase()] = split[1];
    return p;
  }, {});
  var paramName, paramVal, paramOutname;
  var params2 = {
    proj: function(v) {
      self.projName = ["lonlat", "latlon", "latlong"].includes(v) ? "longlat" : v;
    },
    datum: "datumCode",
    rf: function(v) {
      self.rf = parseFloat(v);
    },
    lat_0: function(v) {
      self.lat0 = v * D2R;
    },
    lat_1: function(v) {
      self.lat1 = v * D2R;
    },
    lat_2: function(v) {
      self.lat2 = v * D2R;
    },
    lat_ts: function(v) {
      self.lat_ts = v * D2R;
    },
    lon_0: function(v) {
      self.long0 = v * D2R;
    },
    lon_wrap: function(v) {
      self.long_wrap = parseFloat(v) * D2R;
    },
    lon_1: function(v) {
      self.long1 = v * D2R;
    },
    lon_2: function(v) {
      self.long2 = v * D2R;
    },
    alpha: function(v) {
      self.alpha = parseFloat(v) * D2R;
    },
    gamma: function(v) {
      self.rectified_grid_angle = parseFloat(v) * D2R;
    },
    lonc: function(v) {
      self.longc = v * D2R;
    },
    x_0: function(v) {
      self.x0 = parseFloat(v);
    },
    y_0: function(v) {
      self.y0 = parseFloat(v);
    },
    h_0: function(v) {
      self.h = parseFloat(v);
    },
    k_0: function(v) {
      self.k0 = parseFloat(v);
    },
    k: function(v) {
      self.k0 = parseFloat(v);
    },
    a: function(v) {
      self.a = parseFloat(v);
    },
    b: function(v) {
      self.b = parseFloat(v);
    },
    r: function(v) {
      self.a = self.b = parseFloat(v);
    },
    r_a: function() {
      self.R_A = true;
    },
    zone: function(v) {
      self.zone = parseInt(v, 10);
    },
    south: function() {
      self.utmSouth = true;
    },
    hyperbolic: function() {
      self.hyperbolic = true;
    },
    towgs84: function(v) {
      self.datum_params = v.split(",").map(function(a) {
        return parseFloat(a);
      });
    },
    to_meter: function(v) {
      self.to_meter = parseFloat(v);
    },
    units: function(v) {
      self.units = v;
      var unit = match(units_default, v);
      if (unit) {
        self.to_meter = unit.to_meter;
      }
    },
    from_greenwich: function(v) {
      self.from_greenwich = v * D2R;
    },
    pm: function(v) {
      var pm = match(PrimeMeridian_default, v);
      self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R;
    },
    nadgrids: function(v) {
      if (v === "@null") {
        self.datumCode = "none";
      } else {
        self.nadgrids = v;
      }
    },
    axis: function(v) {
      var legalAxis = "ewnsud";
      if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
        self.axis = v;
      }
    },
    approx: function() {
      self.approx = true;
    },
    over: function() {
      self.over = true;
    }
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params2) {
      paramOutname = params2[paramName];
      if (typeof paramOutname === "function") {
        paramOutname(paramVal);
      } else {
        self[paramOutname] = paramVal;
      }
    } else {
      self[paramName] = paramVal;
    }
  }
  if (typeof self.datumCode === "string" && self.datumCode !== "WGS84") {
    self.datumCode = self.datumCode.toLowerCase();
  }
  self["projStr"] = defData;
  return self;
}
var init_projString = __esm({
  "node_modules/proj4/lib/projString.js"() {
    init_values();
    init_PrimeMeridian();
    init_units();
    init_match();
  }
});

// node_modules/wkt-parser/util.js
function d2r(input) {
  return input * D2R2;
}
function isEquidistantCylindrical(projName) {
  return /^(equirectangular|equidistant[ _]cylindrical)/i.test(projName || "");
}
function applyProjectionDefaults(wkt) {
  const normalizedProjName = (wkt.projName || "").toLowerCase().replace(/_/g, " ");
  if (wkt.long0 === void 0 && wkt.longc !== void 0) {
    wkt.long0 = wkt.longc;
  }
  if (!wkt.lat_ts && wkt.lat1 && (normalizedProjName === "stereographic south pole" || normalizedProjName === "polar stereographic (variant b)")) {
    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
    wkt.lat_ts = wkt.lat1;
    delete wkt.lat1;
  } else if (!wkt.lat_ts && wkt.lat0 && (normalizedProjName === "polar stereographic" || normalizedProjName === "polar stereographic (variant a)")) {
    wkt.lat_ts = wkt.lat0;
    wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);
    delete wkt.lat1;
  } else if (wkt.lat_ts === void 0 && wkt.lat1 !== void 0 && isEquidistantCylindrical(wkt.projName)) {
    wkt.lat_ts = wkt.lat1;
    delete wkt.lat1;
  }
}
var D2R2;
var init_util2 = __esm({
  "node_modules/wkt-parser/util.js"() {
    D2R2 = 0.017453292519943295;
  }
});

// node_modules/wkt-parser/PROJJSONBuilder.js
var PROJJSONBuilderBase, PROJJSONBuilder_default;
var init_PROJJSONBuilder = __esm({
  "node_modules/wkt-parser/PROJJSONBuilder.js"() {
    init_util2();
    PROJJSONBuilderBase = class {
      static getId(node) {
        const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
        if (idNode && idNode.length >= 3) {
          return {
            authority: idNode[1],
            code: this.parseCode(idNode[2])
          };
        }
        return null;
      }
      // PROJJSON codes are integers, or strings for codes like IGNF:LURESG
      static parseCode(code) {
        return /^-?\d+$/.test(code) ? parseInt(code, 10) : code;
      }
      static convertUnit(node, type = "unit") {
        if (!node || node.length < 3) {
          return { type, name: "unknown", conversion_factor: null };
        }
        const name = node[1];
        const conversionFactor = parseFloat(node[2]) || null;
        const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
        const id = idNode ? {
          authority: idNode[1],
          code: this.parseCode(idNode[2])
        } : null;
        return {
          type,
          name,
          conversion_factor: conversionFactor,
          id
        };
      }
      static convertAxis(node) {
        const name = node[1] || "Unknown";
        let direction;
        const abbreviationMatch = name.match(/^\((.)\)$/);
        if (abbreviationMatch) {
          const abbreviation = abbreviationMatch[1].toUpperCase();
          if (abbreviation === "E") direction = "east";
          else if (abbreviation === "N") direction = "north";
          else if (abbreviation === "U") direction = "up";
          else if (node[2]) direction = node[2];
          else throw new Error(`Unknown axis abbreviation: ${abbreviation}`);
        } else {
          direction = node[2] || "unknown";
        }
        const orderNode = node.find((child) => Array.isArray(child) && child[0] === "ORDER");
        const order2 = orderNode ? parseInt(orderNode[1], 10) : null;
        const unitNode = node.find(
          (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
        );
        const unit = this.convertUnit(unitNode);
        return {
          name,
          direction,
          // Use the valid PROJJSON direction value
          unit,
          order: order2
        };
      }
      static extractAxes(node) {
        return node.filter((child) => Array.isArray(child) && child[0] === "AXIS").map((axis) => this.convertAxis(axis)).sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      // A prime meridian without a unit takes the angle unit of its CRS (ISO 19162, 8.2.2).
      // Like PROJ, write the longitude as a number in degrees, or as a value with a unit.
      static convertPrimeMeridianLongitude(primem, crsAngleUnitNode) {
        const value = parseFloat(primem[2]);
        const unitNode = primem.find(
          (child) => Array.isArray(child) && (child[0] === "ANGLEUNIT" || child[0] === "UNIT")
        ) || crsAngleUnitNode;
        const unit = this.convertUnit(unitNode, "AngularUnit");
        if (!unit.conversion_factor || Math.abs(unit.conversion_factor / d2r(1) - 1) < 1e-9) {
          return value;
        }
        return { value, unit };
      }
      static convert(node, result = {}) {
        switch (node[0]) {
          case "PROJCRS":
            result.type = "ProjectedCRS";
            result.name = node[1];
            const baseCrsNode = node.find(
              (child) => Array.isArray(child) && (child[0] === "BASEGEOGCRS" || child[0] === "BASEGEODCRS")
            );
            result.base_crs = baseCrsNode ? this.convert(baseCrsNode) : null;
            result.conversion = node.find((child) => Array.isArray(child) && child[0] === "CONVERSION") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "CONVERSION")) : null;
            const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
            if (csNode) {
              result.coordinate_system = {
                subtype: csNode[1],
                axis: this.extractAxes(node)
              };
            }
            const lengthUnitNode = node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT");
            if (lengthUnitNode) {
              const unit2 = this.convertUnit(lengthUnitNode);
              result.coordinate_system.unit = unit2;
            }
            result.id = this.getId(node);
            break;
          case "BASEGEOGCRS":
          case "BASEGEODCRS":
          case "GEOGCRS":
          case "GEODCRS":
            result.type = node[0] === "GEODCRS" ? "GeodeticCRS" : "GeographicCRS";
            result.name = node[1];
            const datumOrEnsembleNode = node.find(
              (child) => Array.isArray(child) && (child[0] === "DATUM" || child[0] === "ENSEMBLE")
            );
            if (datumOrEnsembleNode) {
              const datumOrEnsemble = this.convert(datumOrEnsembleNode);
              if (datumOrEnsembleNode[0] === "ENSEMBLE") {
                result.datum_ensemble = datumOrEnsemble;
              } else {
                result.datum = datumOrEnsemble;
              }
              const primem = node.find((child) => Array.isArray(child) && child[0] === "PRIMEM");
              if (primem && primem[1] !== "Greenwich") {
                datumOrEnsemble.prime_meridian = {
                  name: primem[1],
                  longitude: this.convertPrimeMeridianLongitude(
                    primem,
                    node.find((child) => Array.isArray(child) && child[0] === "ANGLEUNIT")
                  )
                };
              }
            }
            const geogCsNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
            result.coordinate_system = {
              subtype: geogCsNode ? geogCsNode[1] : "ellipsoidal",
              axis: this.extractAxes(node)
            };
            result.id = this.getId(node);
            break;
          case "DATUM":
            result.type = "GeodeticReferenceFrame";
            result.name = node[1];
            result.ellipsoid = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID")) : null;
            break;
          case "ENSEMBLE":
            result.type = "DatumEnsemble";
            result.name = node[1];
            result.members = node.filter((child) => Array.isArray(child) && child[0] === "MEMBER").map((member) => ({
              type: "DatumEnsembleMember",
              name: member[1],
              id: this.getId(member)
              // Extract ID as { authority, code }
            }));
            const accuracyNode = node.find((child) => Array.isArray(child) && child[0] === "ENSEMBLEACCURACY");
            if (accuracyNode) {
              result.accuracy = parseFloat(accuracyNode[1]);
            }
            const ellipsoidNode = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID");
            if (ellipsoidNode) {
              result.ellipsoid = this.convert(ellipsoidNode);
            }
            result.id = this.getId(node);
            break;
          case "ELLIPSOID":
            result.type = "Ellipsoid";
            result.name = node[1];
            result.semi_major_axis = parseFloat(node[2]);
            result.inverse_flattening = parseFloat(node[3]);
            const ellipsoidUnitNode = node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT");
            if (ellipsoidUnitNode) {
              this.convert(ellipsoidUnitNode, result);
            }
            break;
          case "CONVERSION":
            result.type = "Conversion";
            result.name = node[1];
            result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
            result.parameters = node.filter((child) => Array.isArray(child) && child[0] === "PARAMETER").map((param) => this.convert(param));
            break;
          case "METHOD":
            result.type = "Method";
            result.name = node[1];
            result.id = this.getId(node);
            break;
          case "PARAMETER":
            result.type = "Parameter";
            result.name = node[1];
            result.value = parseFloat(node[2]);
            result.unit = this.convertUnit(
              node.find(
                (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
              )
            );
            result.id = this.getId(node);
            break;
          case "COMPOUNDCRS":
            result.type = "CompoundCRS";
            result.name = node[1];
            result.components = node.slice(2).filter((child) => Array.isArray(child) && child[0].endsWith("CRS")).map((child) => this.convert(child));
            result.id = this.getId(node);
            break;
          case "BOUNDCRS":
            result.type = "BoundCRS";
            const sourceCrsNode = node.find((child) => Array.isArray(child) && child[0] === "SOURCECRS");
            if (sourceCrsNode) {
              const sourceCrsContent = sourceCrsNode.find((child) => Array.isArray(child));
              result.source_crs = sourceCrsContent ? this.convert(sourceCrsContent) : null;
            }
            const targetCrsNode = node.find((child) => Array.isArray(child) && child[0] === "TARGETCRS");
            if (targetCrsNode) {
              const targetCrsContent = targetCrsNode.find((child) => Array.isArray(child));
              result.target_crs = targetCrsContent ? this.convert(targetCrsContent) : null;
            }
            const transformationNode = node.find((child) => Array.isArray(child) && child[0] === "ABRIDGEDTRANSFORMATION");
            if (transformationNode) {
              result.transformation = this.convert(transformationNode);
            } else {
              result.transformation = null;
            }
            break;
          case "ABRIDGEDTRANSFORMATION":
            result.type = "Transformation";
            result.name = node[1];
            result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
            result.parameters = node.filter((child) => Array.isArray(child) && (child[0] === "PARAMETER" || child[0] === "PARAMETERFILE")).map((param) => {
              if (param[0] === "PARAMETER") {
                return this.convert(param);
              } else if (param[0] === "PARAMETERFILE") {
                return {
                  name: param[1],
                  value: param[2],
                  id: {
                    "authority": "EPSG",
                    "code": 8656
                  }
                };
              }
            });
            if (result.parameters.length === 7) {
              const scaleDifference = result.parameters[6];
              if (scaleDifference.name === "Scale difference" && !scaleDifference.unit.conversion_factor) {
                scaleDifference.value = Math.round((scaleDifference.value - 1) * 1e12) / 1e6;
                scaleDifference.unit = { type: "ScaleUnit", name: "parts per million", conversion_factor: 1e-6, id: null };
              }
            }
            result.id = this.getId(node);
            break;
          case "AXIS":
            if (!result.coordinate_system) {
              result.coordinate_system = { type: "unspecified", axis: [] };
            }
            result.coordinate_system.axis.push(this.convertAxis(node));
            break;
          case "LENGTHUNIT":
            const unit = this.convertUnit(node, "LinearUnit");
            if (result.coordinate_system && result.coordinate_system.axis) {
              result.coordinate_system.axis.forEach((axis) => {
                if (!axis.unit) {
                  axis.unit = unit;
                }
              });
            }
            if (unit.conversion_factor && unit.conversion_factor !== 1) {
              if (result.semi_major_axis) {
                result.semi_major_axis = {
                  value: result.semi_major_axis,
                  unit
                };
              }
            }
            break;
          default:
            result.keyword = node[0];
            break;
        }
        return result;
      }
    };
    PROJJSONBuilder_default = PROJJSONBuilderBase;
  }
});

// node_modules/wkt-parser/buildPROJJSON.js
function upperCaseKeywords(node) {
  node[0] = node[0].toUpperCase();
  for (var i2 = 1; i2 < node.length; i2++) {
    if (Array.isArray(node[i2])) {
      upperCaseKeywords(node[i2]);
    }
  }
}
function usePreferredKeywords(node) {
  node[0] = preferredKeywords[node[0]] || node[0];
  for (var i2 = 1; i2 < node.length; i2++) {
    if (Array.isArray(node[i2])) {
      usePreferredKeywords(node[i2]);
    }
  }
}
function buildPROJJSON(root) {
  upperCaseKeywords(root);
  usePreferredKeywords(root);
  return PROJJSONBuilder_default.convert(root);
}
var preferredKeywords;
var init_buildPROJJSON = __esm({
  "node_modules/wkt-parser/buildPROJJSON.js"() {
    init_PROJJSONBuilder();
    preferredKeywords = {
      GEODETICCRS: "GEODCRS",
      GEOGRAPHICCRS: "GEOGCRS",
      PROJECTEDCRS: "PROJCRS",
      GEODETICDATUM: "DATUM",
      TRF: "DATUM",
      SPHEROID: "ELLIPSOID",
      PRIMEMERIDIAN: "PRIMEM",
      PROJECTION: "METHOD",
      VERTICALCRS: "VERTCRS",
      VERTICALDATUM: "VDATUM",
      VRF: "VDATUM",
      ENGINEERINGCRS: "ENGCRS",
      ENGINEERINGDATUM: "EDATUM",
      PARAMETRICDATUM: "PDATUM",
      TIMEDATUM: "TDATUM",
      TEMPORALQUANTITY: "TIMEUNIT"
    };
  }
});

// node_modules/wkt-parser/detectWKTVersion.js
function detectWKTVersion(wkt) {
  const normalizedWKT = wkt.toUpperCase();
  if (normalizedWKT.includes("PROJCRS") || normalizedWKT.includes("GEOGCRS") || normalizedWKT.includes("BOUNDCRS") || normalizedWKT.includes("VERTCRS") || normalizedWKT.includes("LENGTHUNIT") || normalizedWKT.includes("ANGLEUNIT") || normalizedWKT.includes("SCALEUNIT")) {
    return "WKT2";
  }
  if (normalizedWKT.includes("PROJCS") || normalizedWKT.includes("GEOGCS") || normalizedWKT.includes("LOCAL_CS") || normalizedWKT.includes("VERT_CS") || normalizedWKT.includes("UNIT")) {
    return "WKT1";
  }
  return "WKT1";
}
var init_detectWKTVersion = __esm({
  "node_modules/wkt-parser/detectWKTVersion.js"() {
  }
});

// node_modules/wkt-parser/parser.js
function Parser(text) {
  if (typeof text !== "string") {
    throw new Error("not a string");
  }
  this.text = text.trim();
  this.level = 0;
  this.place = 0;
  this.root = null;
  this.stack = [];
  this.currentObject = null;
  this.state = NEUTRAL;
}
function parseString(txt) {
  var parser = new Parser(txt);
  return parser.output();
}
var parser_default, NEUTRAL, KEYWORD, NUMBER, QUOTED, AFTERQUOTE, ENDED, whitespace, latin, keyword, endThings, digets;
var init_parser = __esm({
  "node_modules/wkt-parser/parser.js"() {
    parser_default = parseString;
    NEUTRAL = 1;
    KEYWORD = 2;
    NUMBER = 3;
    QUOTED = 4;
    AFTERQUOTE = 5;
    ENDED = -1;
    whitespace = /\s/;
    latin = /[A-Za-z]/;
    keyword = /[A-Za-z84_]/;
    endThings = /[,\])]/;
    digets = /[\d\.Ee\-\+]/;
    Parser.prototype.readCharicter = function() {
      var char = this.text[this.place++];
      if (this.state !== QUOTED) {
        while (whitespace.test(char)) {
          if (this.place >= this.text.length) {
            return;
          }
          char = this.text[this.place++];
        }
      }
      switch (this.state) {
        case NEUTRAL:
          return this.neutral(char);
        case KEYWORD:
          return this.keyword(char);
        case QUOTED:
          return this.quoted(char);
        case AFTERQUOTE:
          return this.afterquote(char);
        case NUMBER:
          return this.number(char);
        case ENDED:
          return;
      }
    };
    Parser.prototype.afterquote = function(char) {
      if (char === '"') {
        this.word += '"';
        this.state = QUOTED;
        return;
      }
      if (endThings.test(char)) {
        this.word = this.word.trim();
        this.afterItem(char);
        return;
      }
      throw new Error(`havn't handled "` + char + '" in afterquote yet, index ' + this.place);
    };
    Parser.prototype.afterItem = function(char) {
      if (char === ",") {
        if (this.word !== null) {
          this.currentObject.push(this.word);
        }
        this.word = null;
        this.state = NEUTRAL;
        return;
      }
      if (char === "]" || char === ")") {
        this.level--;
        if (this.word !== null) {
          this.currentObject.push(this.word);
          this.word = null;
        }
        this.state = NEUTRAL;
        this.currentObject = this.stack.pop();
        if (!this.currentObject) {
          this.state = ENDED;
        }
        return;
      }
    };
    Parser.prototype.number = function(char) {
      if (digets.test(char)) {
        this.word += char;
        return;
      }
      if (endThings.test(char)) {
        this.word = parseFloat(this.word);
        this.afterItem(char);
        return;
      }
      throw new Error(`havn't handled "` + char + '" in number yet, index ' + this.place);
    };
    Parser.prototype.quoted = function(char) {
      if (char === '"') {
        this.state = AFTERQUOTE;
        return;
      }
      this.word += char;
      return;
    };
    Parser.prototype.keyword = function(char) {
      if (keyword.test(char)) {
        this.word += char;
        return;
      }
      if (char === "[" || char === "(") {
        var newObjects = [];
        newObjects.push(this.word);
        this.level++;
        if (this.root === null) {
          this.root = newObjects;
        } else {
          this.currentObject.push(newObjects);
        }
        this.stack.push(this.currentObject);
        this.currentObject = newObjects;
        this.state = NEUTRAL;
        return;
      }
      if (endThings.test(char)) {
        this.afterItem(char);
        return;
      }
      throw new Error(`havn't handled "` + char + '" in keyword yet, index ' + this.place);
    };
    Parser.prototype.neutral = function(char) {
      if (latin.test(char)) {
        this.word = char;
        this.state = KEYWORD;
        return;
      }
      if (char === '"') {
        this.word = "";
        this.state = QUOTED;
        return;
      }
      if (digets.test(char)) {
        this.word = char;
        this.state = NUMBER;
        return;
      }
      if (endThings.test(char)) {
        this.afterItem(char);
        return;
      }
      throw new Error(`havn't handled "` + char + '" in neutral yet, index ' + this.place);
    };
    Parser.prototype.output = function() {
      while (this.place < this.text.length) {
        this.readCharicter();
      }
      if (this.state === ENDED) {
        return this.root;
      }
      throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
    };
  }
});

// node_modules/wkt-parser/process.js
function mapit(obj, key2, value) {
  if (Array.isArray(key2)) {
    value.unshift(key2);
    key2 = null;
  }
  var thing = key2 ? {} : obj;
  var out = value.reduce(function(newObj, item) {
    sExpr(item, newObj);
    return newObj;
  }, thing);
  if (key2) {
    obj[key2] = out;
  }
}
function sExpr(v, obj) {
  if (!Array.isArray(v)) {
    obj[v] = true;
    return;
  }
  var key2 = v.shift();
  if (key2 === "PARAMETER") {
    key2 = v.shift();
  }
  if (v.length === 1) {
    if (Array.isArray(v[0])) {
      obj[key2] = {};
      sExpr(v[0], obj[key2]);
      return;
    }
    obj[key2] = v[0];
    return;
  }
  if (!v.length) {
    obj[key2] = true;
    return;
  }
  if (key2 === "TOWGS84") {
    obj[key2] = v;
    return;
  }
  if (key2 === "AXIS") {
    if (!(key2 in obj)) {
      obj[key2] = [];
    }
    obj[key2].push(v);
    return;
  }
  if (!Array.isArray(key2)) {
    obj[key2] = {};
  }
  var i2;
  switch (key2) {
    case "UNIT":
    case "PRIMEM":
    case "VERT_DATUM":
      obj[key2] = {
        name: v[0].toLowerCase(),
        convert: v[1]
      };
      if (v.length === 3) {
        sExpr(v[2], obj[key2]);
      }
      return;
    case "SPHEROID":
    case "ELLIPSOID":
      obj[key2] = {
        name: v[0],
        a: v[1],
        rf: v[2]
      };
      if (v.length === 4) {
        sExpr(v[3], obj[key2]);
      }
      return;
    case "EDATUM":
    case "ENGINEERINGDATUM":
    case "LOCAL_DATUM":
    case "DATUM":
    case "VERT_CS":
    case "VERTCRS":
    case "VERTICALCRS":
      v[0] = ["name", v[0]];
      mapit(obj, key2, v);
      return;
    case "COMPD_CS":
    case "COMPOUNDCRS":
    case "FITTED_CS":
    // the followings are the crs defined in
    // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11
    case "PROJECTEDCRS":
    case "PROJCRS":
    case "GEOGCS":
    case "GEOCCS":
    case "PROJCS":
    case "LOCAL_CS":
    case "GEODCRS":
    case "GEODETICCRS":
    case "GEODETICDATUM":
    case "ENGCRS":
    case "ENGINEERINGCRS":
      v[0] = ["name", v[0]];
      mapit(obj, key2, v);
      obj[key2].type = key2;
      return;
    default:
      i2 = -1;
      while (++i2 < v.length) {
        if (!Array.isArray(v[i2])) {
          return sExpr(v, obj[key2]);
        }
      }
      return mapit(obj, key2, v);
  }
}
var init_process = __esm({
  "node_modules/wkt-parser/process.js"() {
  }
});

// node_modules/wkt-parser/transformPROJJSON.js
function processUnit(unit) {
  let result = { units: null, to_meter: void 0 };
  if (typeof unit === "string") {
    result.units = unit.toLowerCase();
    if (result.units === "metre") {
      result.units = "meter";
    }
    if (result.units === "meter") {
      result.to_meter = 1;
    }
  } else if (unit && unit.name) {
    result.units = unit.name.toLowerCase();
    if (result.units === "metre") {
      result.units = "meter";
    }
    result.to_meter = unit.conversion_factor;
  }
  return result;
}
function toValue(valueOrObject) {
  if (typeof valueOrObject === "object") {
    return valueOrObject.value * valueOrObject.unit.conversion_factor;
  }
  return valueOrObject;
}
function toRadians(angle) {
  if (typeof angle !== "object") {
    return angle * Math.PI / 180;
  }
  return angle.unit === "degree" ? angle.value * Math.PI / 180 : toValue(angle);
}
function toDatumParam(param, i2) {
  const unit = param.unit;
  const factor = unit && typeof unit === "object" ? unit.conversion_factor : unit === "degree" ? Math.PI / 180 : unit === "metre" || unit === "unity" ? 1 : null;
  return factor && i2 < DATUM_PARAMS_UNITS.length ? param.value * factor / DATUM_PARAMS_UNITS[i2] : param.value;
}
function isCoordinateFrameRotation(method) {
  if (!method) {
    return false;
  }
  if (method.id && method.id.authority === "EPSG") {
    return [9607, 1032, 1038].includes(Number(method.id.code));
  }
  return /^Coordinate Frame rotation\b/i.test(method.name);
}
function calculateEllipsoid(value, result) {
  if (value.ellipsoid.radius) {
    result.a = value.ellipsoid.radius;
    result.rf = 0;
  } else {
    result.a = toValue(value.ellipsoid.semi_major_axis);
    if (value.ellipsoid.inverse_flattening !== void 0) {
      result.rf = value.ellipsoid.inverse_flattening;
    } else if (value.ellipsoid.semi_major_axis !== void 0 && value.ellipsoid.semi_minor_axis !== void 0) {
      result.rf = result.a / (result.a - toValue(value.ellipsoid.semi_minor_axis));
    }
  }
}
function isHorizontalCRS(crs) {
  if (crs.type === "BoundCRS") {
    return Boolean(crs.source_crs) && isHorizontalCRS(crs.source_crs);
  }
  if (crs.type === "GeodeticCRS") {
    return !crs.coordinate_system || crs.coordinate_system.subtype !== "Cartesian";
  }
  return crs.type === "GeographicCRS" || crs.type === "ProjectedCRS";
}
function transformPROJJSON(projjson, result = {}) {
  if (!projjson || typeof projjson !== "object") {
    return projjson;
  }
  if (projjson.type === "CompoundCRS") {
    const horizontal = (projjson.components || []).find(isHorizontalCRS);
    return horizontal ? transformPROJJSON(horizontal, result) : result;
  }
  if (projjson.type === "BoundCRS") {
    transformPROJJSON(projjson.source_crs, result);
    if (projjson.transformation) {
      if (projjson.transformation.method && projjson.transformation.method.name === "NTv2") {
        result.nadgrids = projjson.transformation.parameters[0].value;
      } else {
        result.datum_params = projjson.transformation.parameters.map(toDatumParam);
        if (result.datum_params.length >= 6 && isCoordinateFrameRotation(projjson.transformation.method)) {
          for (let i2 = 3; i2 < 6; ++i2) {
            result.datum_params[i2] = -result.datum_params[i2];
          }
        }
      }
    }
    return result;
  }
  Object.keys(projjson).forEach((key2) => {
    const value = projjson[key2];
    if (value === null) {
      return;
    }
    switch (key2) {
      case "name":
        if (result.srsCode) {
          break;
        }
        result.name = value;
        result.srsCode = value;
        break;
      case "type":
        if (value === "GeographicCRS") {
          result.projName = "longlat";
        } else if (value === "GeodeticCRS") {
          if (projjson.coordinate_system && projjson.coordinate_system.subtype === "Cartesian") {
            result.projName = "geocent";
          } else {
            result.projName = "longlat";
          }
        } else if (value === "ProjectedCRS" && projjson.conversion && projjson.conversion.method) {
          result.projName = projjson.conversion.method.name;
        }
        break;
      case "datum":
      case "datum_ensemble":
        if (value.ellipsoid) {
          result.ellps = value.ellipsoid.name;
          calculateEllipsoid(value, result);
        }
        if (value.prime_meridian) {
          result.from_greenwich = toRadians(value.prime_meridian.longitude);
        }
        break;
      case "ellipsoid":
        result.ellps = value.name;
        calculateEllipsoid(value, result);
        break;
      case "prime_meridian":
        result.long0 = toRadians(value.longitude || 0);
        break;
      case "coordinate_system":
        if (value.axis) {
          const directionMap = {
            "east": "e",
            "north": "n",
            "west": "w",
            "south": "s",
            "up": "u",
            "down": "d",
            "geocentricx": "e",
            "geocentricy": "n",
            "geocentricz": "u"
          };
          const mapped = value.axis.map((axis) => directionMap[axis.direction.toLowerCase()]);
          if (mapped.every(Boolean)) {
            result.axis = mapped.join("");
            if (result.axis.length === 2) {
              result.axis += "u";
            }
          }
          if (value.unit) {
            const { units, to_meter } = processUnit(value.unit);
            result.units = units;
            result.to_meter = to_meter;
          } else if (value.axis[0] && value.axis[0].unit) {
            const { units, to_meter } = processUnit(value.axis[0].unit);
            result.units = units;
            result.to_meter = to_meter;
          }
        }
        break;
      case "id":
        if (value.authority && value.code) {
          result.title = value.authority + ":" + value.code;
        }
        break;
      case "conversion":
        if (value.method && value.method.name) {
          result.projName = value.method.name;
        }
        if (value.parameters) {
          value.parameters.forEach((param) => {
            const paramName = param.name.toLowerCase().replace(/\s+/g, "_");
            const paramValue = param.value;
            if (param.unit && param.unit.conversion_factor) {
              result[paramName] = paramValue * param.unit.conversion_factor;
            } else if (param.unit === "degree") {
              result[paramName] = paramValue * Math.PI / 180;
            } else {
              result[paramName] = paramValue;
            }
          });
        }
        break;
      case "unit":
        if (value.name) {
          result.units = value.name.toLowerCase();
          if (result.units === "metre") {
            result.units = "meter";
          }
        }
        if (value.conversion_factor) {
          result.to_meter = value.conversion_factor;
        }
        break;
      case "base_crs":
        transformPROJJSON(value, result);
        result.datumCode = value.id ? value.id.authority + "_" + value.id.code : value.name;
        break;
      default:
        break;
    }
  });
  if (!result.datumCode && (projjson.type === "GeographicCRS" || projjson.type === "GeodeticCRS") && projjson.id) {
    result.datumCode = projjson.id.authority + "_" + projjson.id.code;
  }
  if (result.latitude_of_false_origin !== void 0) {
    result.lat0 = result.latitude_of_false_origin;
  }
  if (result.longitude_of_false_origin !== void 0) {
    result.long0 = result.longitude_of_false_origin;
  }
  if (result.latitude_of_standard_parallel !== void 0) {
    result.lat0 = result.latitude_of_standard_parallel;
    result.lat1 = result.latitude_of_standard_parallel;
  }
  if (result.latitude_of_1st_standard_parallel !== void 0) {
    result.lat1 = result.latitude_of_1st_standard_parallel;
  }
  if (result.latitude_of_2nd_standard_parallel !== void 0) {
    result.lat2 = result.latitude_of_2nd_standard_parallel;
  }
  if (result.latitude_of_projection_centre !== void 0) {
    result.lat0 = result.latitude_of_projection_centre;
  }
  if (result.longitude_of_projection_centre !== void 0) {
    result.longc = result.longitude_of_projection_centre;
  }
  if (result.easting_at_false_origin !== void 0) {
    result.x0 = result.easting_at_false_origin;
  }
  if (result.northing_at_false_origin !== void 0) {
    result.y0 = result.northing_at_false_origin;
  }
  if (result.latitude_of_natural_origin !== void 0) {
    result.lat0 = result.latitude_of_natural_origin;
  }
  if (result.longitude_of_natural_origin !== void 0) {
    result.long0 = result.longitude_of_natural_origin;
  }
  if (result.longitude_of_origin !== void 0) {
    result.long0 = result.longitude_of_origin;
  }
  if (result.false_easting !== void 0) {
    result.x0 = result.false_easting;
  }
  if (result.easting_at_projection_centre) {
    result.x0 = result.easting_at_projection_centre;
  }
  if (result.false_northing !== void 0) {
    result.y0 = result.false_northing;
  }
  if (result.northing_at_projection_centre) {
    result.y0 = result.northing_at_projection_centre;
  }
  if (result.projection_plane_origin_height !== void 0) {
    result.h = result.projection_plane_origin_height;
  }
  if (result.satellite_height !== void 0) {
    result.h = result.satellite_height;
  }
  if (result.viewpoint_height !== void 0) {
    result.h = result.viewpoint_height;
  }
  if (result.standard_parallel_1 !== void 0) {
    result.lat1 = result.standard_parallel_1;
  }
  if (result.standard_parallel_2 !== void 0) {
    result.lat2 = result.standard_parallel_2;
  }
  if (result.scale_factor_at_natural_origin !== void 0) {
    result.k0 = result.scale_factor_at_natural_origin;
  }
  if (result.scale_factor_at_projection_centre !== void 0) {
    result.k0 = result.scale_factor_at_projection_centre;
  }
  if (result.scale_factor_on_pseudo_standard_parallel !== void 0) {
    result.k0 = result.scale_factor_on_pseudo_standard_parallel;
  }
  if (result.azimuth !== void 0) {
    result.alpha = result.azimuth;
  }
  if (result.azimuth_at_projection_centre !== void 0) {
    result.alpha = result.azimuth_at_projection_centre;
  }
  if (result.angle_from_rectified_to_skew_grid) {
    result.rectified_grid_angle = result.angle_from_rectified_to_skew_grid;
  }
  if (result.long0 === void 0 && result.central_meridian !== void 0) {
    result.long0 = result.central_meridian;
  }
  if (result.lat0 === void 0 && result.latitude_of_origin !== void 0) {
    result.lat0 = result.latitude_of_origin;
  }
  if (result.lat0 === void 0 && result.latitude_of_center !== void 0) {
    result.lat0 = result.latitude_of_center;
  }
  if (result.longc === void 0 && result.longitude_of_center !== void 0) {
    result.longc = result.longitude_of_center;
  }
  if (result.k0 === void 0 && result.scale_factor !== void 0) {
    result.k0 = result.scale_factor;
  }
  applyProjectionDefaults(result);
  return result;
}
var ARC_SECOND, DATUM_PARAMS_UNITS;
var init_transformPROJJSON = __esm({
  "node_modules/wkt-parser/transformPROJJSON.js"() {
    init_util2();
    ARC_SECOND = Math.PI / 648e3;
    DATUM_PARAMS_UNITS = [1, 1, 1, ARC_SECOND, ARC_SECOND, ARC_SECOND, 1e-6];
  }
});

// node_modules/wkt-parser/index.js
function rename(obj, params2) {
  var outName = params2[0];
  var inName = params2[1];
  if (!(outName in obj) && inName in obj) {
    obj[outName] = obj[inName];
    if (params2.length === 3) {
      obj[outName] = params2[2](obj[outName]);
    }
  }
}
function cleanWKT(wkt) {
  var keys2 = Object.keys(wkt);
  for (var i2 = 0, ii = keys2.length; i2 < ii; ++i2) {
    var key2 = keys2[i2];
    if (knownTypes.indexOf(key2) !== -1) {
      setPropertiesFromWkt(wkt[key2]);
    }
    if (typeof wkt[key2] === "object") {
      cleanWKT(wkt[key2]);
    }
  }
}
function setPropertiesFromWkt(wkt) {
  if (wkt.AUTHORITY) {
    var authority = Object.keys(wkt.AUTHORITY)[0];
    if (authority && authority in wkt.AUTHORITY) {
      wkt.title = authority + ":" + wkt.AUTHORITY[authority];
    }
  }
  if (wkt.type === "GEOGCS") {
    wkt.projName = "longlat";
  } else if (wkt.type === "LOCAL_CS") {
    wkt.projName = "identity";
    wkt.local = true;
  } else {
    if (typeof wkt.PROJECTION === "object") {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    } else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.AXIS) {
    var axisOrder = "";
    for (var i2 = 0, ii = wkt.AXIS.length; i2 < ii; ++i2) {
      var axis = [wkt.AXIS[i2][0].toLowerCase(), wkt.AXIS[i2][1].toLowerCase()];
      if (axis[0].indexOf("north") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "north") {
        axisOrder += "n";
      } else if (axis[0].indexOf("south") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "south") {
        axisOrder += "s";
      } else if (axis[0].indexOf("east") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "east") {
        axisOrder += "e";
      } else if (axis[0].indexOf("west") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "west") {
        axisOrder += "w";
      }
    }
    if (axisOrder.length === 2) {
      axisOrder += "u";
    }
    if (axisOrder.length === 3) {
      wkt.axis = axisOrder;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === "metre") {
      wkt.units = "meter";
    }
    if (wkt.UNIT.convert) {
      if (wkt.type === "GEOGCS") {
        if (wkt.DATUM && wkt.DATUM.SPHEROID) {
          wkt.to_meter = wkt.UNIT.convert * wkt.DATUM.SPHEROID.a;
        }
      } else {
        wkt.to_meter = wkt.UNIT.convert;
      }
    }
  }
  var geogcs = wkt.GEOGCS;
  if (wkt.type === "GEOGCS") {
    geogcs = wkt;
  }
  if (geogcs) {
    if (geogcs.PRIMEM && geogcs.PRIMEM.convert) {
      wkt.from_greenwich = d2r(geogcs.PRIMEM.convert);
    }
    if (geogcs.DATUM) {
      wkt.datumCode = geogcs.DATUM.name.toLowerCase();
    } else {
      wkt.datumCode = geogcs.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === "d_") {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === "new_zealand_1949") {
      wkt.datumCode = "nzgd49";
    }
    if (wkt.datumCode === "wgs_1984" || wkt.datumCode === "world_geodetic_system_1984") {
      if (wkt.PROJECTION === "Mercator_Auxiliary_Sphere") {
        wkt.sphere = true;
      }
      wkt.datumCode = "wgs84";
    }
    if (wkt.datumCode === "belge_1972") {
      wkt.datumCode = "rnb72";
    }
    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk");
      if (wkt.ellps.toLowerCase().slice(0, 13) === "international") {
        wkt.ellps = "intl";
      }
      wkt.a = geogcs.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf);
    }
    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
      wkt.datum_params = geogcs.DATUM.TOWGS84;
    }
    if (~wkt.datumCode.indexOf("osgb_1936")) {
      wkt.datumCode = "osgb36";
    }
    if (~wkt.datumCode.indexOf("osni_1952")) {
      wkt.datumCode = "osni52";
    }
    if (~wkt.datumCode.indexOf("tm65") || ~wkt.datumCode.indexOf("geodetic_datum_of_1965")) {
      wkt.datumCode = "ire65";
    }
    if (wkt.datumCode === "ch1903+") {
      wkt.datumCode = "ch1903";
    }
    if (~wkt.datumCode.indexOf("israel")) {
      wkt.datumCode = "isr93";
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }
  var angularUnit = geogcs && geogcs.UNIT && geogcs.UNIT.convert;
  var toRadians2 = angularUnit && Math.abs(angularUnit / d2r(1) - 1) > 1e-9 ? function(input) {
    return input * angularUnit;
  } : d2r;
  if (wkt.rectified_grid_angle) {
    wkt.rectified_grid_angle = toRadians2(wkt.rectified_grid_angle);
  }
  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return input * ratio;
  }
  var renamer = function(a) {
    return rename(wkt, a);
  };
  var list = [
    ["standard_parallel_1", "Standard_Parallel_1"],
    ["standard_parallel_1", "Latitude of 1st standard parallel"],
    ["standard_parallel_2", "Standard_Parallel_2"],
    ["standard_parallel_2", "Latitude of 2nd standard parallel"],
    ["false_easting", "False_Easting"],
    ["false_easting", "False easting"],
    ["false-easting", "Easting at false origin"],
    ["false_northing", "False_Northing"],
    ["false_northing", "False northing"],
    ["false_northing", "Northing at false origin"],
    ["central_meridian", "Central_Meridian"],
    ["central_meridian", "Longitude of natural origin"],
    ["central_meridian", "Longitude of false origin"],
    ["latitude_of_origin", "Latitude_Of_Origin"],
    ["latitude_of_origin", "Central_Parallel"],
    ["latitude_of_origin", "Latitude of natural origin"],
    ["latitude_of_origin", "Latitude of false origin"],
    ["scale_factor", "Scale_Factor"],
    ["k0", "scale_factor"],
    ["latitude_of_center", "Latitude_Of_Center"],
    ["latitude_of_center", "Latitude_of_center"],
    ["lat0", "latitude_of_center", toRadians2],
    ["longitude_of_center", "Longitude_Of_Center"],
    ["longitude_of_center", "Longitude_of_center"],
    ["longc", "longitude_of_center", toRadians2],
    ["x0", "false_easting", toMeter],
    ["y0", "false_northing", toMeter],
    ["long0", "central_meridian", toRadians2],
    ["lat0", "latitude_of_origin", toRadians2],
    ["lat1", "standard_parallel_1", toRadians2],
    ["lat2", "standard_parallel_2", toRadians2],
    ["h", "Height", toMeter],
    ["azimuth", "Azimuth"],
    ["alpha", "azimuth", toRadians2],
    ["srsCode", "name"]
  ];
  list.forEach(renamer);
  if (!isEquidistantCylindrical(wkt.projName)) {
    renamer(["lat0", "standard_parallel_1", toRadians2]);
  }
  applyProjectionDefaults(wkt);
}
function wkt_parser_default(wkt) {
  if (typeof wkt === "object") {
    return transformPROJJSON(wkt);
  }
  const version = detectWKTVersion(wkt);
  var lisp = parser_default(wkt);
  if (version === "WKT2") {
    const projjson = buildPROJJSON(lisp);
    return transformPROJJSON(projjson);
  }
  var type = lisp[0];
  var obj = {};
  sExpr(lisp, obj);
  cleanWKT(obj);
  var result = obj[type];
  if (type === "COMPD_CS") {
    var horizontal = result.PROJCS || result.GEOGCS;
    if (horizontal) {
      projectionProperties.forEach(function(key2) {
        if (key2 in horizontal) {
          result[key2] = horizontal[key2];
        }
      });
    }
  }
  return result;
}
var knownTypes, projectionProperties;
var init_wkt_parser = __esm({
  "node_modules/wkt-parser/index.js"() {
    init_buildPROJJSON();
    init_detectWKTVersion();
    init_parser();
    init_process();
    init_transformPROJJSON();
    init_util2();
    knownTypes = [
      "PROJECTEDCRS",
      "PROJCRS",
      "GEOGCS",
      "GEOCCS",
      "PROJCS",
      "LOCAL_CS",
      "GEODCRS",
      "GEODETICCRS",
      "GEODETICDATUM",
      "ENGCRS",
      "ENGINEERINGCRS"
    ];
    projectionProperties = [
      "projName",
      "axis",
      "units",
      "to_meter",
      "datumCode",
      "datum_params",
      "nadgrids",
      "ellps",
      "from_greenwich",
      "a",
      "rf",
      "sphere",
      "k0",
      "x0",
      "y0",
      "long0",
      "longc",
      "lat0",
      "lat1",
      "lat2",
      "lat_ts",
      "alpha",
      "rectified_grid_angle"
    ];
  }
});

// node_modules/proj4/lib/defs.js
function defs(name) {
  var that = this;
  if (arguments.length === 2) {
    var def = arguments[1];
    if (typeof def === "string") {
      if (def.charAt(0) === "+") {
        defs[
          /** @type {string} */
          name
        ] = projString_default(arguments[1]);
      } else {
        defs[
          /** @type {string} */
          name
        ] = wkt_parser_default(arguments[1]);
      }
    } else if (def && typeof def === "object" && !("projName" in def)) {
      defs[
        /** @type {string} */
        name
      ] = wkt_parser_default(arguments[1]);
    } else {
      defs[
        /** @type {string} */
        name
      ] = def;
      if (!def) {
        delete defs[
          /** @type {string} */
          name
        ];
      }
    }
  } else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function(v) {
        if (Array.isArray(v)) {
          return defs.apply(that, v);
        } else {
          return defs(v);
        }
      });
    } else if (typeof name === "string") {
      if (name in defs) {
        return defs[name];
      }
    } else if ("EPSG" in name) {
      defs["EPSG:" + name.EPSG] = name;
    } else if ("ESRI" in name) {
      defs["ESRI:" + name.ESRI] = name;
    } else if ("IAU2000" in name) {
      defs["IAU2000:" + name.IAU2000] = name;
    } else {
      console.log(name);
    }
    return;
  }
}
var defs_default;
var init_defs = __esm({
  "node_modules/proj4/lib/defs.js"() {
    init_global();
    init_projString();
    init_wkt_parser();
    global_default(defs);
    defs_default = defs;
  }
});

// node_modules/proj4/lib/parseCode.js
function testObj(code) {
  return typeof code === "string";
}
function testDef(code) {
  return code in defs_default;
}
function testWKT(code) {
  return code.indexOf("+") !== 0 && (code.indexOf("[") !== -1 || code.indexOf("(") !== -1) || typeof code === "object" && !("srsCode" in code);
}
function checkMercator(item) {
  if (item.title) {
    return item.title.toLowerCase().indexOf("epsg:") === 0 && codes.indexOf(item.title.substr(5)) > -1;
  }
  var auth = match(item, "authority");
  if (!auth) {
    return;
  }
  var code = match(auth, "epsg");
  return code && codes.indexOf(code) > -1;
}
function checkProjStr(item) {
  var ext = match(item, "extension");
  if (!ext) {
    return;
  }
  return match(ext, "proj4");
}
function testProj(code) {
  return code[0] === "+";
}
function parse(code) {
  let out;
  if (testObj(code)) {
    if (testDef(code)) {
      out = defs_default[code];
    } else if (testWKT(code)) {
      out = wkt_parser_default(code);
      var maybeProjStr = checkProjStr(out);
      if (maybeProjStr) {
        out = projString_default(maybeProjStr);
      }
    } else if (testProj(code)) {
      out = projString_default(code);
    }
  } else if (!("projName" in code)) {
    out = wkt_parser_default(code);
  } else {
    out = code;
  }
  return out && checkMercator(out) ? defs_default["EPSG:3857"] : out;
}
var codes, parseCode_default;
var init_parseCode = __esm({
  "node_modules/proj4/lib/parseCode.js"() {
    init_defs();
    init_wkt_parser();
    init_projString();
    init_match();
    codes = ["3857", "900913", "3785", "102113"];
    parseCode_default = parse;
  }
});

// node_modules/proj4/lib/extend.js
function extend_default(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== void 0) {
      destination[property] = value;
    }
  }
  return destination;
}
var init_extend = __esm({
  "node_modules/proj4/lib/extend.js"() {
  }
});

// node_modules/proj4/lib/common/msfnz.js
function msfnz_default(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / Math.sqrt(1 - con * con);
}
var init_msfnz = __esm({
  "node_modules/proj4/lib/common/msfnz.js"() {
  }
});

// node_modules/proj4/lib/common/sign.js
function sign_default(x) {
  return x < 0 ? -1 : 1;
}
var init_sign = __esm({
  "node_modules/proj4/lib/common/sign.js"() {
  }
});

// node_modules/proj4/lib/common/adjust_lon.js
function adjust_lon_default(x, skipAdjust) {
  if (skipAdjust) {
    return x;
  }
  return Math.abs(x) <= SPI ? x : x - sign_default(x) * TWO_PI;
}
var init_adjust_lon = __esm({
  "node_modules/proj4/lib/common/adjust_lon.js"() {
    init_values();
    init_sign();
  }
});

// node_modules/proj4/lib/common/tsfnz.js
function tsfnz_default(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow((1 - con) / (1 + con), com);
  return Math.tan(0.5 * (HALF_PI - phi)) / con;
}
var init_tsfnz = __esm({
  "node_modules/proj4/lib/common/tsfnz.js"() {
    init_values();
  }
});

// node_modules/proj4/lib/common/phi2z.js
function phi2z_default(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = HALF_PI - 2 * Math.atan(ts);
  for (var i2 = 0; i2 <= 15; i2++) {
    con = eccent * Math.sin(phi);
    dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return -9999;
}
var init_phi2z = __esm({
  "node_modules/proj4/lib/common/phi2z.js"() {
    init_values();
  }
});

// node_modules/proj4/lib/projections/merc.js
function init() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    } else {
      this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  } else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      } else {
        this.k0 = 1;
      }
    }
  }
}
function forward(p) {
  var lon = p.x;
  var lat = p.y;
  if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
    return null;
  }
  var x, y;
  if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    return null;
  } else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0, this.over);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
    } else {
      var sinphi = Math.sin(lat);
      var ts = tsfnz_default(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0, this.over);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p.x = x;
    p.y = y;
    return p;
  }
}
function inverse(p) {
  var x = p.x - this.x0;
  var y = p.y - this.y0;
  var lon, lat;
  if (this.sphere) {
    lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  } else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = phi2z_default(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = adjust_lon_default(this.long0 + x / (this.a * this.k0), this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
var names, merc_default;
var init_merc = __esm({
  "node_modules/proj4/lib/projections/merc.js"() {
    init_msfnz();
    init_adjust_lon();
    init_tsfnz();
    init_phi2z();
    init_values();
    names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "Mercator_Variant_A", "merc"];
    merc_default = {
      init,
      forward,
      inverse,
      names
    };
  }
});

// node_modules/proj4/lib/projections/longlat.js
function init2() {
}
function identity(pt) {
  return pt;
}
var names2, longlat_default;
var init_longlat = __esm({
  "node_modules/proj4/lib/projections/longlat.js"() {
    names2 = ["longlat", "identity", "lonlat", "latlon", "latlong"];
    longlat_default = {
      init: init2,
      forward: identity,
      inverse: identity,
      names: names2
    };
  }
});

// node_modules/proj4/lib/projections.js
function add(proj, i2) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i2);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function(n) {
    names3[n.toLowerCase()] = len;
  });
  return this;
}
function getNormalizedProjName(n) {
  return n.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
}
function get(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof names3[n] !== "undefined" && projStore[names3[n]]) {
    return projStore[names3[n]];
  }
  n = getNormalizedProjName(n);
  if (n in names3 && projStore[names3[n]]) {
    return projStore[names3[n]];
  }
}
function start() {
  projs.forEach(add);
}
var projs, names3, projStore, projections_default;
var init_projections = __esm({
  "node_modules/proj4/lib/projections.js"() {
    init_merc();
    init_longlat();
    projs = [merc_default, longlat_default];
    names3 = {};
    projStore = [];
    projections_default = {
      start,
      add,
      get
    };
  }
});

// node_modules/proj4/lib/constants/Ellipsoid.js
var ellipsoids, Ellipsoid_default;
var init_Ellipsoid = __esm({
  "node_modules/proj4/lib/constants/Ellipsoid.js"() {
    ellipsoids = {
      MERIT: {
        a: 6378137,
        rf: 298.257,
        ellipseName: "MERIT 1983"
      },
      SGS85: {
        a: 6378136,
        rf: 298.257,
        ellipseName: "Soviet Geodetic System 85"
      },
      GRS80: {
        a: 6378137,
        rf: 298.257222101,
        ellipseName: "GRS 1980(IUGG, 1980)"
      },
      IAU76: {
        a: 6378140,
        rf: 298.257,
        ellipseName: "IAU 1976"
      },
      airy: {
        a: 6377563396e-3,
        b: 635625691e-2,
        ellipseName: "Airy 1830"
      },
      "APL4.9": {
        a: 6378137,
        rf: 298.25,
        ellipseName: "Appl. Physics. 1965"
      },
      NWL9D: {
        a: 6378145,
        rf: 298.25,
        ellipseName: "Naval Weapons Lab., 1965"
      },
      mod_airy: {
        a: 6377340189e-3,
        b: 6356034446e-3,
        ellipseName: "Modified Airy"
      },
      andrae: {
        a: 637710443e-2,
        rf: 300,
        ellipseName: "Andrae 1876 (Den., Iclnd.)"
      },
      danish: {
        a: 63770192563e-4,
        rf: 300,
        ellipseName: "Andrae 1876 (Denmark, Iceland)"
      },
      aust_SA: {
        a: 6378160,
        rf: 298.25,
        ellipseName: "Australian Natl & S. Amer. 1969"
      },
      GRS67: {
        a: 6378160,
        rf: 298.247167427,
        ellipseName: "GRS 67(IUGG 1967)"
      },
      GSK2011: {
        a: 63781365e-1,
        rf: 298.2564151,
        ellipseName: "GSK-2011"
      },
      bessel: {
        a: 6377397155e-3,
        rf: 299.1528128,
        ellipseName: "Bessel 1841"
      },
      bess_nam: {
        a: 6377483865e-3,
        rf: 299.1528128,
        ellipseName: "Bessel 1841 (Namibia)"
      },
      clrk66: {
        a: 63782064e-1,
        b: 63565838e-1,
        ellipseName: "Clarke 1866"
      },
      clrk80: {
        a: 6378249145e-3,
        rf: 293.4663,
        ellipseName: "Clarke 1880 mod."
      },
      clrk80ign: {
        a: 63782492e-1,
        b: 6356515,
        rf: 293.4660213,
        ellipseName: "Clarke 1880 (IGN)"
      },
      clrk58: {
        a: 6378293645208759e-9,
        rf: 294.2606763692654,
        ellipseName: "Clarke 1858"
      },
      CPM: {
        a: 63757387e-1,
        rf: 334.29,
        ellipseName: "Comm. des Poids et Mesures 1799"
      },
      delmbr: {
        a: 6376428,
        rf: 311.5,
        ellipseName: "Delambre 1810 (Belgium)"
      },
      engelis: {
        a: 637813605e-2,
        rf: 298.2566,
        ellipseName: "Engelis 1985"
      },
      evrst30: {
        a: 6377276345e-3,
        rf: 300.8017,
        ellipseName: "Everest 1830"
      },
      evrst48: {
        a: 6377304063e-3,
        rf: 300.8017,
        ellipseName: "Everest 1948"
      },
      evrst56: {
        a: 6377301243e-3,
        rf: 300.8017,
        ellipseName: "Everest 1956"
      },
      evrst69: {
        a: 6377295664e-3,
        rf: 300.8017,
        ellipseName: "Everest 1969"
      },
      evrstSS: {
        a: 6377298556e-3,
        rf: 300.8017,
        ellipseName: "Everest (Sabah & Sarawak)"
      },
      fschr60: {
        a: 6378166,
        rf: 298.3,
        ellipseName: "Fischer (Mercury Datum) 1960"
      },
      fschr60m: {
        a: 6378155,
        rf: 298.3,
        ellipseName: "Fischer 1960"
      },
      fschr68: {
        a: 6378150,
        rf: 298.3,
        ellipseName: "Fischer 1968"
      },
      helmert: {
        a: 6378200,
        rf: 298.3,
        ellipseName: "Helmert 1906"
      },
      hough: {
        a: 6378270,
        rf: 297,
        ellipseName: "Hough"
      },
      intl: {
        a: 6378388,
        rf: 297,
        ellipseName: "International 1909 (Hayford)"
      },
      kaula: {
        a: 6378163,
        rf: 298.24,
        ellipseName: "Kaula 1961"
      },
      lerch: {
        a: 6378139,
        rf: 298.257,
        ellipseName: "Lerch 1979"
      },
      mprts: {
        a: 6397300,
        rf: 191,
        ellipseName: "Maupertius 1738"
      },
      new_intl: {
        a: 63781575e-1,
        b: 63567722e-1,
        ellipseName: "New International 1967"
      },
      plessis: {
        a: 6376523,
        b: 6355863,
        ellipseName: "Plessis 1817 (France)"
      },
      PZ90: {
        a: 6378136,
        rf: 298.25784,
        ellipseName: "PZ-90"
      },
      krass: {
        a: 6378245,
        rf: 298.3,
        ellipseName: "Krassovsky, 1942"
      },
      SEasia: {
        a: 6378155,
        b: 63567733205e-4,
        ellipseName: "Southeast Asia"
      },
      walbeck: {
        a: 6376896,
        b: 63558348467e-4,
        ellipseName: "Walbeck"
      },
      WGS60: {
        a: 6378165,
        rf: 298.3,
        ellipseName: "WGS 60"
      },
      WGS66: {
        a: 6378145,
        rf: 298.25,
        ellipseName: "WGS 66"
      },
      WGS72: {
        a: 6378135,
        rf: 298.26,
        ellipseName: "WGS 72"
      },
      WGS84: {
        a: 6378137,
        rf: 298.257223563,
        ellipseName: "WGS 84"
      },
      sphere: {
        a: 6370997,
        b: 6370997,
        ellipseName: "Normal Sphere (r=6370997)"
      }
    };
    Ellipsoid_default = ellipsoids;
  }
});

// node_modules/proj4/lib/deriveConstants.js
function eccentricity(a, b, rf, R_A) {
  var a2 = a * a;
  var b2 = b * b;
  var es = (a2 - b2) / a2;
  var e = 0;
  if (R_A) {
    a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
    a2 = a * a;
    es = 0;
  } else {
    e = Math.sqrt(es);
  }
  var ep2 = (a2 - b2) / b2;
  return {
    es,
    e,
    ep2
  };
}
function sphere(a, b, rf, ellps, sphere2) {
  if (!a) {
    var ellipse = match(Ellipsoid_default, ellps);
    if (!ellipse) {
      ellipse = WGS84;
    }
    a = ellipse.a;
    b = ellipse.b;
    rf = ellipse.rf;
  }
  if (rf && !b) {
    b = (1 - 1 / rf) * a;
  }
  if (rf === 0 || Math.abs(a - b) < EPSLN) {
    sphere2 = true;
    b = a;
  }
  return {
    a,
    b,
    rf,
    sphere: sphere2
  };
}
var WGS84;
var init_deriveConstants = __esm({
  "node_modules/proj4/lib/deriveConstants.js"() {
    init_values();
    init_Ellipsoid();
    init_match();
    WGS84 = Ellipsoid_default.WGS84;
  }
});

// node_modules/proj4/lib/constants/Datum.js
var datums, towgs84s, keys, i, towgs84, datum, key, Datum_default;
var init_Datum = __esm({
  "node_modules/proj4/lib/constants/Datum.js"() {
    datums = {
      wgs84: {
        towgs84: "0,0,0",
        ellipse: "WGS84",
        datumName: "WGS84"
      },
      ch1903: {
        towgs84: "674.374,15.056,405.346",
        ellipse: "bessel",
        datumName: "swiss"
      },
      ggrs87: {
        towgs84: "-199.87,74.79,246.62",
        ellipse: "GRS80",
        datumName: "Greek_Geodetic_Reference_System_1987"
      },
      nad83: {
        towgs84: "0,0,0",
        ellipse: "GRS80",
        datumName: "North_American_Datum_1983"
      },
      nad27: {
        nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
        ellipse: "clrk66",
        datumName: "North_American_Datum_1927"
      },
      potsdam: {
        towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
        ellipse: "bessel",
        datumName: "Potsdam Rauenberg 1950 DHDN"
      },
      carthage: {
        towgs84: "-263.0,6.0,431.0",
        ellipse: "clrk80ign",
        datumName: "Carthage 1934 Tunisia"
      },
      hermannskogel: {
        towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
        ellipse: "bessel",
        datumName: "Hermannskogel"
      },
      mgi: {
        towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
        ellipse: "bessel",
        datumName: "Militar-Geographische Institut"
      },
      osni52: {
        towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
        ellipse: "airy",
        datumName: "Irish National"
      },
      ire65: {
        towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
        ellipse: "mod_airy",
        datumName: "Ireland 1965"
      },
      rassadiran: {
        towgs84: "-133.63,-157.5,-158.62",
        ellipse: "intl",
        datumName: "Rassadiran"
      },
      nzgd49: {
        towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
        ellipse: "intl",
        datumName: "New Zealand Geodetic Datum 1949"
      },
      osgb36: {
        towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
        ellipse: "airy",
        datumName: "Ordnance Survey of Great Britain 1936"
      },
      s_jtsk: {
        towgs84: "589,76,480",
        ellipse: "bessel",
        datumName: "S-JTSK (Ferro)"
      },
      beduaram: {
        towgs84: "-106,-87,188",
        ellipse: "clrk80",
        datumName: "Beduaram"
      },
      gunung_segara: {
        towgs84: "-403,684,41",
        ellipse: "bessel",
        datumName: "Gunung Segara Jakarta"
      },
      rnb72: {
        towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
        ellipse: "intl",
        datumName: "Reseau National Belge 1972"
      },
      amersfoort: {
        towgs84: "565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244",
        ellipse: "bessel",
        datumName: "Amersfoort"
      }
    };
    towgs84s = {
      "213.11,9.37,-74.95": "EPSG_5451",
      "-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43": "IGNF_LURESG IGNF_LUREF IGNF_LURES IGNF_LUXGEO",
      "-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065": "EPSG_4614",
      "-499,-249,314": "EPSG_4615",
      "-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031": "ESRI_37241",
      "-440.296,58.548,296.265,1.128,10.202,4.559,-0.438": "ESRI_37249",
      "-511.151,-181.269,139.609,1.05,2.703,1.798,3.071": "ESRI_37245",
      "24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01": "EPSG_4178",
      "-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984": "EPSG_4622",
      "126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227": "EPSG_4625 IGNF_MART38 IGNF_MART38G IGNF_MART38GEO IGNF_MARTFD IGNF_MARTFDG",
      "0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439": "EPSG_5252 EPSG_5250 EPSG_5251",
      "597.1,71.4,412.1,0.894,0.068,-1.563,7.58": "EPSG_4314",
      "-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166": "EPSG_4282",
      "-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218": "EPSG_4231",
      "-239.749,88.181,30.488,0.263,0.082,1.211,2.229": "EPSG_4274",
      "-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006": "EPSG_4134",
      "18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013": "EPSG_4254",
      "-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175": "EPSG_4159",
      "0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093": "EPSG_4687 EPSG_4998 EPSG_4999",
      "-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225": "EPSG_4227",
      "599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46": "EPSG_4746",
      "612.4,77,440.2,-0.054,0.057,-2.797,2.55": "EPSG_4745",
      "8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926": "EPSG_6311 EPSG_6309 EPSG_6310",
      "565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244": "EPSG_4289",
      "-89.5,-93.8,-123.1,0,0,-0.156,1.2": "EPSG_4230",
      "-123.02,-158.95,-168.47": "EPSG_4154",
      "570.8,85.7,462.8,4.998,1.587,5.261,3.56": "EPSG_4156",
      "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15": "EPSG_4299 EPSG_4300 EPSG_4188",
      "33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84": "EPSG_4179",
      "-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747": "EPSG_4313",
      "163.511,127.533,-159.789,0,0,0.814,-0.6": "EPSG_4194",
      "105,326,-102.5,0,0,0.814,-0.6": "EPSG_4195",
      "-45,417,-3.5,0,0,0.814,-0.6": "EPSG_4196",
      "-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246": "EPSG_4611",
      "137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824": "EPSG_4633 IGNF_LIFOU56 IGNF_LIFOU56G",
      "-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993": "EPSG_4641 IGNF_MARE53 IGNF_MARE53G",
      "-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002": "EPSG_4643",
      "982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805": "EPSG_4660",
      "97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259": "EPSG_4662",
      "577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664": "EPSG_3906",
      "-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547": "EPSG_4307",
      "-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686": "EPSG_6892",
      "221.597,152.441,176.523,2.403,1.3893,0.884,11.4648": "EPSG_4690",
      "218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817": "EPSG_4691 IGNF_MOOREA87 IGNF_MOOREA87G IGNF_MOOREA87GEO",
      "72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653": "EPSG_4629",
      "165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111": "EPSG_4630",
      "217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093": "EPSG_4692",
      "0,0,0,-0.008393,0.000749,-0.010276,0": "EPSG_9333 EPSG_9331 EPSG_9332",
      "601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887": "EPSG_4312 EPSG_9266 EPSG_9267",
      "-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496": "EPSG_4123",
      "-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365": "EPSG_4309",
      "-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058": "ESRI_104106",
      "-275.7224,94.7824,340.8944,-8.001,-4.42,-11.821,1": "EPSG_4281",
      "0,0,4.5,0,0,0.554,0.2263": "EPSG_4322 EPSG_4720 EPSG_4984 EPSG_4985",
      "0,0,1.9,0,0,0.814,-0.38": "EPSG_4324 EPSG_4986 EPSG_4987",
      "43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549": "EPSG_4284 ESRI_104135",
      "446.448,-125.157,542.06,0.15,0.247,0.842,-20.489": "EPSG_4277",
      "-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46": "EPSG_4207 EPSG_4803",
      "347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647": "EPSG_4688",
      "410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218": "EPSG_4689",
      "278.3,93,474.5,7.889,0.05,-6.61,6.21": "EPSG_4273 EPSG_4817",
      "204.64,834.74,293.8": "EPSG_4240",
      "426.62,142.62,460.09,4.98,4.49,-12.42,-17.1": "ESRI_104131",
      "-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68": "EPSG_4265 EPSG_4806",
      "-111.92,-87.85,114.5,1.875,0.202,0.219,0.032": "EPSG_4263",
      "-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536": "EPSG_4298",
      "-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424": "EPSG_4270",
      "-130,110,-13": "EPSG_4229",
      "-55.5,-348,-229.2": "EPSG_4220",
      "12.646,-155.176,-80.863": "EPSG_4214",
      "-345,3,223": "EPSG_4232",
      "-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037": "EPSG_4238",
      "-170,33,326": "EPSG_4168",
      "198,881,317": "EPSG_4131",
      "-0.9738,1.9453,0.5486,0.027551,0.010049,0.011359,0": "EPSG_4152 EPSG_4956 EPSG_4957",
      "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0": "EPSG_9075 EPSG_9072 EPSG_9073 EPSG_9074 EPSG_9070 EPSG_9071",
      "572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378": "EPSG_5228 ESRI_104696 ESRI_104697 EPSG_5229",
      "485.021,169.465,483.839,7.786342,4.397554,4.102655,0": "EPSG_8351 ESRI_104648",
      "-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06": "EPSG_4683 EPSG_4994 EPSG_4995",
      "1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388": "EPSG_9294 EPSG_9292 EPSG_9293",
      "31.95,300.99,419.19": "EPSG_4212",
      "-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703": "EPSG_4191",
      "52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191": "EPSG_4237",
      "-1.08,-0.27,-0.9,0,0,0.16,-0.12": "EPSG_4740 EPSG_4922 EPSG_4923",
      "419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496": "EPSG_4124",
      "584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922": "EPSG_5681 EPSG_5828 EPSG_5830",
      "23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262": "EPSG_4141",
      "-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194": "EPSG_4204",
      "226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798": "EPSG_4319",
      "24.82,-131.21,-82.66,0,0,0.16,-0.12": "EPSG_4200",
      "-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359": "EPSG_4127",
      "674.374,15.056,405.346": "EPSG_4149 EPSG_4150 EPSG_4801",
      "-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0": "EPSG_4617 EPSG_4954 EPSG_4955",
      "-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485": "EPSG_4663",
      "-211.939,137.626,58.3,-0.089,0.251,0.079,0.384": "EPSG_4664",
      "-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048": "EPSG_4665",
      "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43": "EPSG_4666 ESRI_104105 EPSG_4904",
      "-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188": "EPSG_4756",
      "-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925": "EPSG_4723",
      "8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081": "EPSG_4726",
      "-8.0,160.0,176.0": "EPSG_4267 OGC_CRS27",
      "-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693": "EPSG_5365 EPSG_5363 EPSG_5364",
      "304.5,306.5,-318.1": "EPSG_4218 EPSG_4802",
      "-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95": "EPSG_4242",
      "-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289": "EPSG_4216",
      "174.05,-25.49,112.57,0,0,0.554,0.2263": "EPSG_4673",
      "-124,-60,154": "EPSG_4202",
      "-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191": "EPSG_4203",
      "595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408": "EPSG_3819",
      "-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169": "EPSG_8694",
      "275.57,676.78,229.6": "EPSG_4145",
      "0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994": "EPSG_4283 EPSG_4938 EPSG_4939",
      "2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063": "EPSG_4317",
      "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993": "EPSG_4272",
      "-307.7,265.3,-363.5": "EPSG_4248",
      "24,-121,-76": "EPSG_5561 EPSG_5558 EPSG_5560",
      "-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338": "EPSG_5233 ESRI_104693",
      "-86,-98,-119": "ESRI_104130 EPSG_4668",
      "682,-203,480": "ESRI_104102 EPSG_4805",
      "7,-10,-26": "ESRI_37207",
      "-100,-248,259": "EPSG_4675",
      "-89.121,-348.182,260.871": "ESRI_104109",
      "-185.583,-230.096,281.361": "ESRI_104112",
      "25.1,-275.6,222.6": "ESRI_104113",
      "0,12,6": "IGNF_WGS72G IGNF_WGS72 IGNF_WGS72GEO",
      "-168,-60,320": "IGNF_NTFG IGNF_NTF EPSG_4275 EPSG_4807 IGNF_NTFPGRAD IGNF_NTFP",
      "-127,-769,472": "IGNF_EFATE57G EPSG_4714 IGNF_EFATE57 IGNF_EFATE57GEO",
      "324.8,153.6,172.1": "IGNF_PGP50G IGNF_PGP50 IGNF_TERA50 IGNF_TERA50GEO IGNF_TERA50G",
      "94,-948,-1262": "IGNF_REUN47G IGNF_REUN47 IGNF_REUN47GEO IGNF_REUN49 IGNF_REUN49G EPSG_4626",
      "-186,230,110": "IGNF_CSG67G IGNF_CSG67 IGNF_CSG67GEO EPSG_4623",
      "-467,-16,-300": "IGNF_GUAD48G IGNF_GUAD48 IGNF_GUAD48GEO IGNF_GUADANN IGNF_GUADANNG",
      "162,117,154": "IGNF_TAHI51G IGNF_TAHI51 EPSG_4628",
      "65,342,77": "IGNF_TAHAAG IGNF_TAHAA IGNF_TAHAAGEO",
      "84,274,65": "IGNF_NUKU72G IGNF_NUKU72 IGNF_NUKU72GEO",
      "365,194,166": "IGNF_PETRELS72G IGNF_PETRELS72 EPSG_4636",
      "253,-133,-127": "IGNF_WALL78G IGNF_WALL78 IGNF_WALL78GEO",
      "-382,-59,-262": "IGNF_MAYO50G IGNF_MAYO50 IGNF_MAYO50GEO EPSG_4632",
      "-139,-967,436": "IGNF_TANNAG IGNF_TANNA",
      "-13,-348,292": "IGNF_IGN72G EPSG_4642 IGNF_IGN72 IGNF_IGN72GEO IGNF_OUVE72 IGNF_OUVE72G IGNF_OUVEA72 IGNF_OUVEA72G",
      "1118,23,66": "IGNF_ATIGG EPSG_4901 IGNF_ATI IGNF_ATIG",
      "150.57,158.33,118.32": "IGNF_FANGA84G IGNF_FANGA84",
      "202.13,174.6,-15.74": "IGNF_RUSAT84G IGNF_RUSAT84 IGNF_SAT84 IGNF_SAT84G",
      "126.74,300.1,-75.49": "IGNF_KAUE70G IGNF_KAUE70",
      "-10.8,-1.8,12.77": "IGNF_MOP90G IGNF_MOP90 IGNF_TETIA90 IGNF_TETIA90G",
      "338.08,212.58,-296.17": "IGNF_MHPF67G IGNF_MHPF67",
      "160.61,116.05,153.69": "IGNF_TAHI79G IGNF_TAHI79 IGNF_TAHI79GEO",
      "1.5,3.84,4.81": "IGNF_ANAA92G IGNF_ANAA92 IGNF_ANAA92GEO",
      "330.91,-13.92,58.56": "IGNF_MARQUI72G IGNF_MARQUI72",
      "143.6,197.82,74.05": "IGNF_APAT86G IGNF_APAT86 IGNF_TUAM86 IGNF_TUAM86G",
      "237.17,171.61,-77.84": "IGNF_TUBU69G IGNF_TUBU69",
      "11.363,424.148,373.13": "IGNF_STPM50G IGNF_STPM50 IGNF_STPM50GEO EPSG_4638",
      "-208.4058,-109.8777,-2.5764": "EPSG_4754 EPSG_4899 EPSG_4900",
      "372.87,149.23,585.29": "ESRI_104101",
      "0,-0.15,0.68": "EPSG_4693",
      "293.17,726.18,245.36": "EPSG_6207",
      "-133.63,-157.5,-158.62": "EPSG_4153",
      "-241.54,-163.64,396.06": "EPSG_4132",
      "-154.5,150.7,100.4": "EPSG_4221",
      "-80.7,-132.5,41.1": "EPSG_4266",
      "-70.9,-151.8,-41.4": "EPSG_4193",
      "-0.41,0.46,-0.35": "EPSG_5340 EPSG_5341 EPSG_5342",
      "-294.7,-200.1,525.5": "EPSG_4246",
      "-3.2,-5.7,2.8": "EPSG_4318",
      "-199.87,74.79,246.62": "EPSG_4121",
      "-260.1,5.5,432.2": "EPSG_4223 ESRI_37225 EPSG_4816",
      "-0.465,372.095,171.736": "EPSG_4158",
      "-128.16,-282.42,21.93": "EPSG_4285",
      "-404.78,685.68,45.47": "EPSG_4613 EPSG_4820",
      "195.671,332.517,274.607": "EPSG_4607",
      "-381.788,-57.501,-256.673": "EPSG_4475 EPSG_4472 EPSG_4473",
      "-157.84,308.54,-146.6": "EPSG_4208",
      "70.995,-335.916,262.898": "EPSG_4743",
      "-323.65,551.39,-491.22": "EPSG_4710",
      "-0.077,0.079,0.086": "EPSG_7881 EPSG_7879 EPSG_7880",
      "283.729,735.942,261.143": "EPSG_4682",
      "-156,-271,-189": "EPSG_4739",
      "-80.01,253.26,291.19": "EPSG_4679",
      "-56.263,16.136,-22.856": "EPSG_4750",
      "-10.18,-350.43,291.37": "EPSG_4644",
      "-103.746,-9.614,-255.95": "EPSG_4695",
      "-355,21,72": "EPSG_4292",
      "-61.702,284.488,472.052": "EPSG_4302",
      "-124.76,53,466.79": "EPSG_4143",
      "-153,153,307": "EPSG_4606",
      "-770.1,158.4,-498.2": "EPSG_4699",
      "-273.5,110.6,-357.9": "EPSG_4247",
      "8.88,184.86,106.69": "EPSG_4160",
      "-233.43,6.65,173.64": "EPSG_4161",
      "-9.5,122.9,138.2": "EPSG_9251",
      "-78.1,101.6,133.3": "EPSG_9253",
      "-198.383,-240.517,-107.909": "EPSG_4297 EPSG_4810",
      "-147,506,687": "EPSG_4301",
      "-59,-11,-52": "EPSG_4618",
      "44.585,-131.212,-39.544": "EPSG_4678 EPSG_4992 EPSG_4993",
      "-130,29,364": "EPSG_4250",
      "214,804,268": "EPSG_4144",
      "-17.51,-108.32,-62.39": "EPSG_4147",
      "-254.1,-5.36,-100.29": "EPSG_4259",
      "-76,-138,67": "EPSG_4164",
      "-378.873,676.002,-46.255": "EPSG_4211 EPSG_4813",
      "-422.651,-172.995,84.02": "EPSG_4182",
      "-143.87,243.37,-33.52": "EPSG_4224",
      "-205.57,168.77,-4.12": "EPSG_4225",
      "-67.35,3.88,-38.22": "EPSG_5527",
      "98,390,-22": "EPSG_4752",
      "-30,190,89": "EPSG_4310",
      "-192.26,65.72,132.08": "EPSG_9248",
      "124.5,-63.5,-281": "EPSG_4680",
      "-79.9,-158,-168.9": "EPSG_4701",
      "-146.21,112.63,4.05": "EPSG_4706",
      "-165,-11,206": "EPSG_4201",
      "-157,-2,-299": "EPSG_4210",
      "-104,167,-38": "EPSG_4183",
      "11,72,-101": "EPSG_4139",
      "-2,151,181": "EPSG_4717",
      "102,52,-38": "EPSG_4732",
      "-377,681,-50": "EPSG_4280",
      "-138,-105,-289": "EPSG_4209",
      "31,146,47": "EPSG_4261",
      "-73,46,-86": "EPSG_4658",
      "265.025,384.929,-194.046": "EPSG_4721",
      "-136,-108,-292": "EPSG_4222",
      "-255,-15,71": "EPSG_4601",
      "725,685,536": "EPSG_4602",
      "72,213.7,93": "EPSG_4603",
      "9,183,236": "EPSG_4605",
      "137,248,-430": "EPSG_4621",
      "-28,199,5": "EPSG_4657",
      "103.25,-100.4,-307.19": "EPSG_4316",
      "145,-187,103": "EPSG_4698",
      "-206.1,-174.7,-87.7": "EPSG_4192",
      "-265,120,-358": "EPSG_4311",
      "58,-283,-182": "EPSG_4135",
      "198,-226,-347": "ESRI_104138",
      "-11,851,5": "EPSG_4245",
      "-125,53,467": "EPSG_4142",
      "-106,-87,188": "EPSG_4213",
      "-133,-77,-51": "EPSG_4253",
      "-132,-110,-335": "EPSG_4129",
      "-77,-128,142": "EPSG_4713",
      "217,823,299": "EPSG_4239",
      "295,736,257": "EPSG_4146",
      "-83,37,124": "EPSG_4155",
      "-173,253,27": "EPSG_4165",
      "175,-38,113": "EPSG_4672",
      "-637,-549,-203": "EPSG_4236",
      "-90,40,88": "EPSG_4251",
      "-2,374,172": "EPSG_4271",
      "-88,4,101": "EPSG_4175",
      "298,-304,-375": "EPSG_4716",
      "-23,259,-9": "EPSG_4315",
      "-242.2,-144.9,370.3": "EPSG_4744",
      "-97,787,86": "EPSG_4244",
      "616,97,-251": "EPSG_4293",
      "260,12,-147": "EPSG_4736",
      "-235,-110,393": "EPSG_6883",
      "-63,176,185": "EPSG_6894",
      "-43,-163,45": "EPSG_4205",
      "41,-220,-134": "EPSG_4256",
      "639,405,60": "EPSG_4262",
      "174,359,365": "EPSG_4604",
      "-115,118,426": "EPSG_4169",
      "-106,-129,165": "EPSG_4620",
      "-203,141,53": "EPSG_4184",
      "-289,-124,60": "EPSG_4616",
      "-307,-92,127": "EPSG_9403 EPSG_4728",
      "-133,-321,50": "EPSG_4684",
      "-491,-22,435": "EPSG_4708",
      "114,-116,-333": "EPSG_4707",
      "145,75,-272": "EPSG_4709",
      "-205,107,53": "EPSG_4712",
      "124,-234,-25": "EPSG_4711",
      "230,-199,-752": "EPSG_4718 ESRI_37218",
      "211,147,111": "EPSG_4719",
      "208,-435,-229": "EPSG_4724",
      "189,-79,-202": "EPSG_4725",
      "647,1777,-1124": "EPSG_4735",
      "-794,119,-298": "EPSG_4722",
      "-632,438,-609": "EPSG_4734",
      "912,-58,1227": "EPSG_4727",
      "185,165,42": "EPSG_4729",
      "170,42,84": "EPSG_4730",
      "276,-57,149": "EPSG_4733",
      "-7,215,225": "ESRI_37240",
      "252,-209,-751": "ESRI_37221",
      "-123,-206,219": "ESRI_4305",
      "-73,-247,227": "ESRI_104139 EPSG_4304 EPSG_4811",
      "51,391,-36": "EPSG_4748",
      "-384,664,-48": "EPSG_4219",
      "-333,-222,114": "EPSG_4255",
      "-587.8,519.75,145.76": "EPSG_4257 EPSG_4804",
      "-963,510,-359": "EPSG_4646",
      "-24,-203,268": "EPSG_6881",
      "-183,-15,273": "EPSG_6882",
      "-104,-129,239": "EPSG_4715",
      "0,0,0": "IGNF_RGNCG EPSG_7683 IGNF_RGNC IGNF_RGNCGEO IGNF_RGNCGEODD EPSG_7681 EPSG_7682",
      "589,76,480": "EPSG_4818",
      "-189.6806,18.3463,-42.7695,-0.33746,-3.09264,2.53861,0.4598": "EPSG_9892 EPSG_9893 EPSG_4181",
      "-84,-97,-117": "IGNF_ED50 IGNF_ED50GEO IGNF_ED50G",
      "325,154,172": "EPSG_4637",
      "253,-132,-127": "EPSG_4639"
    };
    for (towgs84 in towgs84s) {
      keys = towgs84s[towgs84].split(" ");
      for (i = 0; i < keys.length; i++) {
        datums[keys[i]] = { towgs84 };
      }
    }
    for (key in datums) {
      datum = datums[key];
      if (!datum.datumName) {
        continue;
      }
      datums[datum.datumName] = datum;
    }
    Datum_default = datums;
  }
});

// node_modules/proj4/lib/datum.js
function datum2(datumCode, datum_params, a, b, es, ep2, nadgrids) {
  var out = {};
  out.datum_type = PJD_NODATUM;
  if (datum_params) {
    out.datum_type = PJD_WGS84;
    out.datum_params = datum_params.map(parseFloat);
    if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
      out.datum_type = PJD_3PARAM;
    }
    if (out.datum_params.length > 3) {
      if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
        out.datum_type = PJD_7PARAM;
        out.datum_params[3] *= SEC_TO_RAD;
        out.datum_params[4] *= SEC_TO_RAD;
        out.datum_params[5] *= SEC_TO_RAD;
        out.datum_params[6] = out.datum_params[6] / 1e6 + 1;
      }
    }
  }
  if (nadgrids) {
    out.datum_type = PJD_GRIDSHIFT;
    out.grids = nadgrids;
  }
  out.a = a;
  out.b = b;
  out.es = es;
  out.ep2 = ep2;
  return out;
}
var datum_default;
var init_datum = __esm({
  "node_modules/proj4/lib/datum.js"() {
    init_values();
    datum_default = datum2;
  }
});

// node_modules/proj4/lib/nadgrid.js
function nadgrid(key2, data, options) {
  if (data instanceof ArrayBuffer) {
    return readNTV2Grid(key2, data, options);
  }
  return { ready: readGeotiffGrid(key2, data) };
}
function readNTV2Grid(key2, data, options) {
  var includeErrorFields = true;
  if (options !== void 0 && options.includeErrorFields === false) {
    includeErrorFields = false;
  }
  var view = new DataView(data);
  var isLittleEndian = detectLittleEndian(view);
  var header = readHeader(view, isLittleEndian);
  var subgrids = readSubgrids(view, header, isLittleEndian, includeErrorFields);
  var nadgrid2 = { header, subgrids };
  loadedNadgrids[key2] = nadgrid2;
  return nadgrid2;
}
async function readGeotiffGrid(key2, tiff) {
  var subgrids = [];
  var subGridCount = await tiff.getImageCount();
  for (var subgridIndex = subGridCount - 1; subgridIndex >= 0; subgridIndex--) {
    var image = await tiff.getImage(subgridIndex);
    var rasters = await image.readRasters();
    var data = rasters;
    var lim = [image.getWidth(), image.getHeight()];
    var imageBBoxRadians = image.getBoundingBox().map(degreesToRadians);
    var modelPixelScale = typeof image.fileDirectory.getValue === "function" ? image.fileDirectory.getValue("ModelPixelScale") : (
      /** @type {any} */
      image.fileDirectory.ModelPixelScale
    );
    var del = [modelPixelScale[0], modelPixelScale[1]].map(degreesToRadians);
    var maxX = imageBBoxRadians[0] + (lim[0] - 1) * del[0];
    var minY = imageBBoxRadians[3] - (lim[1] - 1) * del[1];
    var latitudeOffsetBand = data[0];
    var longitudeOffsetBand = data[1];
    var nodes = [];
    for (let i2 = lim[1] - 1; i2 >= 0; i2--) {
      for (let j = lim[0] - 1; j >= 0; j--) {
        var index = i2 * lim[0] + j;
        nodes.push([-secondsToRadians(longitudeOffsetBand[index]), secondsToRadians(latitudeOffsetBand[index])]);
      }
    }
    subgrids.push({
      del,
      lim,
      ll: [-maxX, minY],
      cvs: nodes
    });
  }
  var tifGrid = {
    header: {
      nSubgrids: subGridCount
    },
    subgrids
  };
  loadedNadgrids[key2] = tifGrid;
  return tifGrid;
}
function getNadgrids(nadgrids) {
  if (nadgrids === void 0) {
    return null;
  }
  var grids = nadgrids.split(",");
  return grids.map(parseNadgridString);
}
function parseNadgridString(value) {
  if (value.length === 0) {
    return null;
  }
  var optional = value[0] === "@";
  if (optional) {
    value = value.slice(1);
  }
  if (value === "null") {
    return { name: "null", mandatory: !optional, grid: null, isNull: true };
  }
  return {
    name: value,
    mandatory: !optional,
    grid: loadedNadgrids[value] || null,
    isNull: false
  };
}
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function secondsToRadians(seconds) {
  return seconds / 3600 * Math.PI / 180;
}
function detectLittleEndian(view) {
  var nFields = view.getInt32(8, false);
  if (nFields === 11) {
    return false;
  }
  nFields = view.getInt32(8, true);
  if (nFields !== 11) {
    console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
  }
  return true;
}
function readHeader(view, isLittleEndian) {
  return {
    nFields: view.getInt32(8, isLittleEndian),
    nSubgridFields: view.getInt32(24, isLittleEndian),
    nSubgrids: view.getInt32(40, isLittleEndian),
    shiftType: decodeString(view, 56, 56 + 8).trim(),
    fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
    fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
    toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
    toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
  };
}
function decodeString(view, start2, end) {
  return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start2, end)));
}
function readSubgrids(view, header, isLittleEndian, includeErrorFields) {
  var gridOffset = 176;
  var grids = [];
  for (var i2 = 0; i2 < header.nSubgrids; i2++) {
    var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
    var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian, includeErrorFields);
    var lngColumnCount = Math.round(
      1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval
    );
    var latColumnCount = Math.round(
      1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval
    );
    grids.push({
      ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
      del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
      lim: [lngColumnCount, latColumnCount],
      count: subHeader.gridNodeCount,
      cvs: mapNodes(nodes)
    });
    var rowSize = 16;
    if (includeErrorFields === false) {
      rowSize = 8;
    }
    gridOffset += 176 + subHeader.gridNodeCount * rowSize;
  }
  return grids;
}
function mapNodes(nodes) {
  return nodes.map(function(r) {
    return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];
  });
}
function readGridHeader(view, offset, isLittleEndian) {
  return {
    name: decodeString(view, offset + 8, offset + 16).trim(),
    parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
    lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
    upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
    lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
    upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
    latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
    longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
    gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
  };
}
function readGridNodes(view, offset, gridHeader, isLittleEndian, includeErrorFields) {
  var nodesOffset = offset + 176;
  var gridRecordLength = 16;
  if (includeErrorFields === false) {
    gridRecordLength = 8;
  }
  var gridShiftRecords = [];
  for (var i2 = 0; i2 < gridHeader.gridNodeCount; i2++) {
    var record = {
      latitudeShift: view.getFloat32(nodesOffset + i2 * gridRecordLength, isLittleEndian),
      longitudeShift: view.getFloat32(nodesOffset + i2 * gridRecordLength + 4, isLittleEndian)
    };
    if (includeErrorFields !== false) {
      record.latitudeAccuracy = view.getFloat32(nodesOffset + i2 * gridRecordLength + 8, isLittleEndian);
      record.longitudeAccuracy = view.getFloat32(nodesOffset + i2 * gridRecordLength + 12, isLittleEndian);
    }
    gridShiftRecords.push(record);
  }
  return gridShiftRecords;
}
var loadedNadgrids;
var init_nadgrid = __esm({
  "node_modules/proj4/lib/nadgrid.js"() {
    loadedNadgrids = {};
  }
});

// node_modules/proj4/lib/Proj.js
function Projection(srsCode, callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  this.forward = null;
  this.inverse = null;
  this.init = null;
  this.name;
  this.axis;
  this.names = null;
  this.title;
  callback = callback || function(error) {
    if (error) {
      throw error;
    }
  };
  var json = parseCode_default(srsCode);
  if (typeof json !== "object") {
    callback("Could not parse to valid json: " + srsCode);
    return;
  }
  var ourProj = Projection.projections.get(json.projName);
  if (!ourProj) {
    callback("Could not get projection name from: " + srsCode);
    return;
  }
  if (json.datumCode && json.datumCode !== "none") {
    var datumDef = match(Datum_default, json.datumCode);
    if (datumDef) {
      json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(",") : null);
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  json.axis = json.axis || "enu";
  json.ellps = json.ellps || "wgs84";
  json.lat1 = json.lat1 || json.lat0;
  json.x0 = json.x0 || 0;
  json.y0 = json.y0 || 0;
  json.lat0 = json.lat0 || 0;
  json.long0 = json.long0 || 0;
  var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
  var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
  var nadgrids = getNadgrids(json.nadgrids);
  var datumObj = json.datum || datum_default(
    json.datumCode,
    json.datum_params,
    sphere_.a,
    sphere_.b,
    ecc.es,
    ecc.ep2,
    nadgrids
  );
  extend_default(this, json);
  extend_default(this, ourProj);
  this.a = sphere_.a;
  this.b = sphere_.b;
  this.rf = sphere_.rf;
  this.sphere = sphere_.sphere;
  this.es = ecc.es;
  this.e = ecc.e;
  this.ep2 = ecc.ep2;
  this.datum = datumObj;
  if ("init" in this && typeof this.init === "function") {
    this.init();
  }
  if (!this.k0) {
    this.k0 = 1;
  }
  callback(null, this);
}
var Proj_default;
var init_Proj = __esm({
  "node_modules/proj4/lib/Proj.js"() {
    init_parseCode();
    init_extend();
    init_projections();
    init_deriveConstants();
    init_Datum();
    init_datum();
    init_match();
    init_nadgrid();
    Projection.projections = projections_default;
    Projection.projections.start();
    Proj_default = Projection;
  }
});

// node_modules/proj4/lib/datumUtils.js
function compareDatums(source, dest) {
  if (source.datum_type !== dest.datum_type) {
    return false;
  } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 5e-11) {
    return false;
  } else if (source.datum_type === PJD_3PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
  } else if (source.datum_type === PJD_7PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
  } else {
    return true;
  }
}
function geodeticToGeocentric(p, es, a) {
  var Longitude = p.x;
  var Latitude = p.y;
  var Height = p.z ? p.z : 0;
  var Rn;
  var Sin_Lat;
  var Sin2_Lat;
  var Cos_Lat;
  if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
    Latitude = -HALF_PI;
  } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
    Latitude = HALF_PI;
  } else if (Latitude < -HALF_PI) {
    return { x: -Infinity, y: -Infinity, z: p.z };
  } else if (Latitude > HALF_PI) {
    return { x: Infinity, y: Infinity, z: p.z };
  }
  if (Longitude > Math.PI) {
    Longitude -= 2 * Math.PI;
  }
  Sin_Lat = Math.sin(Latitude);
  Cos_Lat = Math.cos(Latitude);
  Sin2_Lat = Sin_Lat * Sin_Lat;
  Rn = a / Math.sqrt(1 - es * Sin2_Lat);
  return {
    x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
    y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
    z: (Rn * (1 - es) + Height) * Sin_Lat
  };
}
function geocentricToGeodetic(p, es, a, b) {
  var genau = 1e-12;
  var genau2 = genau * genau;
  var maxiter = 30;
  var P;
  var RR;
  var CT;
  var ST;
  var RX;
  var RK;
  var RN;
  var CPHI0;
  var SPHI0;
  var CPHI;
  var SPHI;
  var SDPHI;
  var iter;
  var X = p.x;
  var Y = p.y;
  var Z2 = p.z ? p.z : 0;
  var Longitude;
  var Latitude;
  var Height;
  P = Math.sqrt(X * X + Y * Y);
  RR = Math.sqrt(X * X + Y * Y + Z2 * Z2);
  if (P / a < genau) {
    Longitude = 0;
    if (RR / a < genau) {
      Latitude = HALF_PI;
      Height = -b;
      return {
        x: Longitude,
        y: Latitude,
        z: Height
      };
    }
  } else {
    Longitude = Math.atan2(Y, X);
  }
  CT = Z2 / RR;
  ST = P / RR;
  RX = 1 / Math.sqrt(1 - es * (2 - es) * ST * ST);
  CPHI0 = ST * (1 - es) * RX;
  SPHI0 = CT * RX;
  iter = 0;
  do {
    iter++;
    RN = a / Math.sqrt(1 - es * SPHI0 * SPHI0);
    Height = P * CPHI0 + Z2 * SPHI0 - RN * (1 - es * SPHI0 * SPHI0);
    RK = es * RN / (RN + Height);
    RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST);
    CPHI = ST * (1 - RK) * RX;
    SPHI = CT * RX;
    SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
    CPHI0 = CPHI;
    SPHI0 = SPHI;
  } while (SDPHI * SDPHI > genau2 && iter < maxiter);
  Latitude = Math.atan(SPHI / Math.abs(CPHI));
  return {
    x: Longitude,
    y: Latitude,
    z: Height
  };
}
function geocentricToWgs84(p, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    return {
      x: p.x + datum_params[0],
      y: p.y + datum_params[1],
      z: p.z + datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    return {
      x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
      y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
      z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
    };
  }
}
function geocentricFromWgs84(p, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    return {
      x: p.x - datum_params[0],
      y: p.y - datum_params[1],
      z: p.z - datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    var x_tmp = (p.x - Dx_BF) / M_BF;
    var y_tmp = (p.y - Dy_BF) / M_BF;
    var z_tmp = (p.z - Dz_BF) / M_BF;
    return {
      x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
      y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
      z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
    };
  }
}
var init_datumUtils = __esm({
  "node_modules/proj4/lib/datumUtils.js"() {
    "use strict";
    init_values();
  }
});

// node_modules/proj4/lib/datum_transform.js
function checkParams(type) {
  return type === PJD_3PARAM || type === PJD_7PARAM;
}
function datum_transform_default(source, dest, point) {
  if (compareDatums(source, dest)) {
    return point;
  }
  if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
    return point;
  }
  var source_a = source.a;
  var source_es = source.es;
  if (source.datum_type === PJD_GRIDSHIFT) {
    var gridShiftCode = applyGridShift(source, false, point);
    if (gridShiftCode !== 0) {
      return void 0;
    }
    source_a = SRS_WGS84_SEMIMAJOR;
    source_es = SRS_WGS84_ESQUARED;
  }
  var dest_a = dest.a;
  var dest_b = dest.b;
  var dest_es = dest.es;
  if (dest.datum_type === PJD_GRIDSHIFT) {
    dest_a = SRS_WGS84_SEMIMAJOR;
    dest_b = SRS_WGS84_SEMIMINOR;
    dest_es = SRS_WGS84_ESQUARED;
  }
  if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
    return point;
  }
  point = geodeticToGeocentric(point, source_es, source_a);
  if (checkParams(source.datum_type)) {
    point = geocentricToWgs84(point, source.datum_type, source.datum_params);
  }
  if (checkParams(dest.datum_type)) {
    point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
  }
  point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);
  if (dest.datum_type === PJD_GRIDSHIFT) {
    var destGridShiftResult = applyGridShift(dest, true, point);
    if (destGridShiftResult !== 0) {
      return void 0;
    }
  }
  return point;
}
function applyGridShift(source, inverse37, point) {
  if (source.grids === null || source.grids.length === 0) {
    console.log("Grid shift grids not found");
    return -1;
  }
  var input = { x: -point.x, y: point.y };
  var output = { x: Number.NaN, y: Number.NaN };
  var attemptedGrids = [];
  outer:
    for (var i2 = 0; i2 < source.grids.length; i2++) {
      var grid = source.grids[i2];
      attemptedGrids.push(grid.name);
      if (grid.isNull) {
        output = input;
        break;
      }
      if (grid.grid === null) {
        if (grid.mandatory) {
          console.log("Unable to find mandatory grid '" + grid.name + "'");
          return -1;
        }
        continue;
      }
      var subgrids = grid.grid.subgrids;
      for (var j = 0, jj = subgrids.length; j < jj; j++) {
        var subgrid = subgrids[j];
        var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 1e4;
        var minX = subgrid.ll[0] - epsilon;
        var minY = subgrid.ll[1] - epsilon;
        var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
        var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
        if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
          continue;
        }
        output = applySubgridShift(input, inverse37, subgrid);
        if (!isNaN(output.x)) {
          break outer;
        }
      }
    }
  if (isNaN(output.x)) {
    console.log("Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
    return -1;
  }
  point.x = -output.x;
  point.y = output.y;
  return 0;
}
function applySubgridShift(pin, inverse37, ct) {
  var val = { x: Number.NaN, y: Number.NaN };
  if (isNaN(pin.x)) {
    return val;
  }
  var tb = { x: pin.x, y: pin.y };
  tb.x -= ct.ll[0];
  tb.y -= ct.ll[1];
  tb.x = adjust_lon_default(tb.x - Math.PI) + Math.PI;
  var t = nadInterpolate(tb, ct);
  if (inverse37) {
    if (isNaN(t.x)) {
      return val;
    }
    t.x = tb.x - t.x;
    t.y = tb.y - t.y;
    var i2 = 9, tol = 1e-12;
    var dif, del;
    do {
      del = nadInterpolate(t, ct);
      if (isNaN(del.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      dif = { x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y) };
      t.x += dif.x;
      t.y += dif.y;
    } while (i2-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
    if (i2 < 0) {
      console.log("Inverse grid shift iterator failed to converge.");
      return val;
    }
    val.x = adjust_lon_default(t.x + ct.ll[0]);
    val.y = t.y + ct.ll[1];
  } else {
    if (!isNaN(t.x)) {
      val.x = pin.x + t.x;
      val.y = pin.y + t.y;
    }
  }
  return val;
}
function nadInterpolate(pin, ct) {
  var t = { x: pin.x / ct.del[0], y: pin.y / ct.del[1] };
  var indx = { x: Math.floor(t.x), y: Math.floor(t.y) };
  var frct = { x: t.x - 1 * indx.x, y: t.y - 1 * indx.y };
  var val = { x: Number.NaN, y: Number.NaN };
  var inx;
  if (indx.x < 0 || indx.x >= ct.lim[0]) {
    return val;
  }
  if (indx.y < 0 || indx.y >= ct.lim[1]) {
    return val;
  }
  inx = indx.y * ct.lim[0] + indx.x;
  var f00 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx++;
  var f10 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx += ct.lim[0];
  var f11 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx--;
  var f01 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  var m11 = frct.x * frct.y, m10 = frct.x * (1 - frct.y), m00 = (1 - frct.x) * (1 - frct.y), m01 = (1 - frct.x) * frct.y;
  val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x;
  val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y;
  return val;
}
var init_datum_transform = __esm({
  "node_modules/proj4/lib/datum_transform.js"() {
    init_values();
    init_datumUtils();
    init_adjust_lon();
  }
});

// node_modules/proj4/lib/adjust_axis.js
function adjustAxisToEnu(crs, point) {
  const out = {};
  for (let i2 = 0, ii = crs.axis.length; i2 < ii; i2++) {
    if (i2 === 2 && point.z === void 0) {
      continue;
    }
    let v = point[order[i2]];
    switch (crs.axis[i2]) {
      case "e":
        out.x = v;
        break;
      case "w":
        out.x = -v;
        break;
      case "n":
        out.y = v;
        break;
      case "s":
        out.y = -v;
        break;
      case "u":
        out.z = v;
        break;
      case "d":
        out.z = -v;
        break;
      default:
        return null;
    }
  }
  return out;
}
function adjustAxisFromEnu(crs, point) {
  const out = (
    /** @type {import("./core").InterfaceCoordinates} */
    {}
  );
  for (let i2 = 0, ii = crs.axis.length; i2 < ii; i2++) {
    if (i2 === 2 && point.z === void 0) {
      continue;
    }
    switch (crs.axis[i2]) {
      case "e":
        out[order[i2]] = point.x;
        break;
      case "w":
        out[order[i2]] = -point.x;
        break;
      case "n":
        out[order[i2]] = point.y;
        break;
      case "s":
        out[order[i2]] = -point.y;
        break;
      case "u":
        out[order[i2]] = point.z;
        break;
      case "d":
        out[order[i2]] = -point.z;
        break;
      default:
        return null;
    }
  }
  return out;
}
var order;
var init_adjust_axis = __esm({
  "node_modules/proj4/lib/adjust_axis.js"() {
    order = ["x", "y", "z"];
  }
});

// node_modules/proj4/lib/common/toPoint.js
function toPoint_default(array) {
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length > 2) {
    out.z = array[2];
  }
  if (array.length > 3) {
    out.m = array[3];
  }
  return out;
}
var init_toPoint = __esm({
  "node_modules/proj4/lib/common/toPoint.js"() {
  }
});

// node_modules/proj4/lib/checkSanity.js
function checkSanity_default(point) {
  checkCoord(point.x);
  checkCoord(point.y);
}
function checkCoord(num) {
  if (typeof Number.isFinite === "function") {
    if (Number.isFinite(num)) {
      return;
    }
    throw new TypeError("coordinates must be finite numbers");
  }
  if (typeof num !== "number" || num !== num || !isFinite(num)) {
    throw new TypeError("coordinates must be finite numbers");
  }
}
var init_checkSanity = __esm({
  "node_modules/proj4/lib/checkSanity.js"() {
  }
});

// node_modules/proj4/lib/transform.js
function checkNotWGS(source, dest) {
  return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== "WGS84" || (dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== "WGS84";
}
function transformInternal(source, dest, point, enforceAxis) {
  var hasZ = point.z !== void 0;
  checkSanity_default(point);
  if (source.datum && dest.datum && checkNotWGS(source, dest)) {
    if (!wgs84Proj || wgs84Def !== defs_default("WGS84")) {
      wgs84Proj = new Proj_default("WGS84");
      wgs84Def = defs_default("WGS84");
    }
    point = transformInternal(source, wgs84Proj, point, enforceAxis);
    source = wgs84Proj;
  }
  if (enforceAxis && source.axis !== "enu") {
    point = adjustAxisToEnu(source, point);
  }
  if (source.projName === "longlat") {
    point = {
      x: point.x * D2R,
      y: point.y * D2R,
      z: point.z || 0
    };
  } else {
    if (source.to_meter) {
      point = {
        x: point.x * source.to_meter,
        y: point.y * source.to_meter,
        z: point.z || 0
      };
    }
    point = source.inverse(point);
    if (!point) {
      return;
    }
  }
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }
  point = datum_transform_default(source.datum, dest.datum, point);
  if (!point) {
    return;
  }
  point = /** @type {import('./core').InterfaceCoordinates} */
  point;
  if (dest.from_greenwich) {
    point = {
      x: point.x - dest.from_greenwich,
      y: point.y,
      z: point.z || 0
    };
  }
  if (dest.projName === "longlat") {
    if (dest.long_wrap !== void 0) {
      point.x = dest.long_wrap + adjust_lon_default(point.x - dest.long_wrap);
    }
    point = {
      x: point.x * R2D,
      y: point.y * R2D,
      z: point.z || 0
    };
  } else {
    point = dest.forward(point);
    if (dest.to_meter) {
      point = {
        x: point.x / dest.to_meter,
        y: point.y / dest.to_meter,
        z: point.z || 0
      };
    }
  }
  if (enforceAxis && dest.axis !== "enu") {
    return adjustAxisFromEnu(dest, point);
  }
  if (point && !hasZ && dest.projName !== "geocent") {
    point = point.m === void 0 ? { x: point.x, y: point.y } : { x: point.x, y: point.y, m: point.m };
  }
  return point;
}
function transform(source, dest, point, enforceAxis) {
  var pt;
  if (Array.isArray(point)) {
    pt = toPoint_default(point);
  } else {
    pt = { x: point.x, y: point.y, z: point.z, m: point.m };
  }
  return transformInternal(source, dest, pt, enforceAxis);
}
var wgs84Def, wgs84Proj;
var init_transform = __esm({
  "node_modules/proj4/lib/transform.js"() {
    init_values();
    init_datum_transform();
    init_adjust_lon();
    init_adjust_axis();
    init_Proj();
    init_defs();
    init_toPoint();
    init_checkSanity();
  }
});

// node_modules/proj4/lib/core.js
function transformer(from, to, coords, enforceAxis) {
  var out, geocent, keys2;
  if (Array.isArray(coords)) {
    out = transformInternal(from, to, toPoint_default(coords), enforceAxis) || { x: NaN, y: NaN };
    if (coords.length > 2) {
      geocent = typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent";
      if (geocent) {
        if (typeof out.z === "number") {
          return (
            /** @type {T} */
            [out.x, out.y, out.z].concat(coords.slice(3))
          );
        }
        return (
          /** @type {T} */
          [out.x, out.y, coords[2]].concat(coords.slice(3))
        );
      }
      if (enforceAxis && typeof out.z === "number") {
        return (
          /** @type {T} */
          [out.x, out.y, out.z].concat(coords.slice(3))
        );
      }
      return (
        /** @type {T} */
        [out.x, out.y].concat(coords.slice(2))
      );
    }
    return (
      /** @type {T} */
      [out.x, out.y]
    );
  } else {
    out = transformInternal(from, to, { x: coords.x, y: coords.y, z: coords.z, m: coords.m }, enforceAxis) || { x: NaN, y: NaN };
    keys2 = Object.keys(coords);
    if (keys2.length === 2) {
      return (
        /** @type {T} */
        out
      );
    }
    geocent = typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent";
    keys2.forEach(function(key2) {
      if (key2 === "x" || key2 === "y") {
        return;
      }
      if (key2 === "z" && (geocent || enforceAxis)) {
        return;
      }
      out[key2] = coords[key2];
    });
    return (
      /** @type {T} */
      out
    );
  }
}
function checkProj(item) {
  if (item instanceof Proj_default) {
    return item;
  }
  if (typeof item === "object" && "oProj" in item) {
    return item.oProj;
  }
  return Proj_default(
    /** @type {string | PROJJSONDefinition} */
    item
  );
}
function proj4(fromProjOrToProj, toProjOrCoord, coord) {
  var fromProj;
  var toProj;
  var single = false;
  var obj;
  if (typeof toProjOrCoord === "undefined") {
    toProj = checkProj(fromProjOrToProj);
    fromProj = wgs84;
    single = true;
  } else if (typeof /** @type {?} */
  toProjOrCoord.x !== "undefined" || Array.isArray(toProjOrCoord)) {
    coord = /** @type {T} */
    /** @type {?} */
    toProjOrCoord;
    toProj = checkProj(fromProjOrToProj);
    fromProj = wgs84;
    single = true;
  }
  if (!fromProj) {
    fromProj = checkProj(fromProjOrToProj);
  }
  if (!toProj) {
    toProj = checkProj(
      /** @type {string | PROJJSONDefinition | proj } */
      toProjOrCoord
    );
  }
  if (coord) {
    return transformer(fromProj, toProj, coord);
  } else {
    obj = {
      /**
       * @template {TemplateCoordinates} T
       * @param {T} coords
       * @param {boolean=} enforceAxis
       * @returns {T}
       */
      forward: function(coords, enforceAxis) {
        return transformer(fromProj, toProj, coords, enforceAxis);
      },
      /**
       * @template {TemplateCoordinates} T
       * @param {T} coords
       * @param {boolean=} enforceAxis
       * @returns {T}
       */
      inverse: function(coords, enforceAxis) {
        return transformer(toProj, fromProj, coords, enforceAxis);
      }
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}
var wgs84, core_default;
var init_core = __esm({
  "node_modules/proj4/lib/core.js"() {
    init_Proj();
    init_transform();
    init_toPoint();
    wgs84 = Proj_default("WGS84");
    core_default = proj4;
  }
});

// node_modules/mgrs/mgrs.js
function forward2(ll, accuracy) {
  accuracy = accuracy || 5;
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
}
function inverse2(mgrs) {
  var bbox2 = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox2.lat && bbox2.lon) {
    return [bbox2.lon, bbox2.lat, bbox2.lon, bbox2.lat];
  }
  return [bbox2.left, bbox2.bottom, bbox2.right, bbox2.top];
}
function toPoint(mgrs) {
  var bbox2 = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox2.lat && bbox2.lon) {
    return [bbox2.lon, bbox2.lat];
  }
  return [(bbox2.left + bbox2.right) / 2, (bbox2.top + bbox2.bottom) / 2];
}
function degToRad(deg) {
  return deg * (Math.PI / 180);
}
function radToDeg(rad) {
  return 180 * (rad / Math.PI);
}
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a = 6378137;
  var eccSquared = 669438e-8;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A5, M2;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;
  if (Long === 180) {
    ZoneNumber = 60;
  }
  if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) {
    ZoneNumber = 32;
  }
  if (Lat >= 72 && Lat < 84) {
    if (Long >= 0 && Long < 9) {
      ZoneNumber = 31;
    } else if (Long >= 9 && Long < 21) {
      ZoneNumber = 33;
    } else if (Long >= 21 && Long < 33) {
      ZoneNumber = 35;
    } else if (Long >= 33 && Long < 42) {
      ZoneNumber = 37;
    }
  }
  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
  LongOriginRad = degToRad(LongOrigin);
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A5 = Math.cos(LatRad) * (LongRad - LongOriginRad);
  M2 = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
  var UTMEasting = k0 * N * (A5 + (1 - T + C) * A5 * A5 * A5 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 / 120) + 5e5;
  var UTMNorthing = k0 * (M2 + N * Math.tan(LatRad) * (A5 * A5 / 2 + (5 - T + 9 * C + 4 * C * C) * A5 * A5 * A5 * A5 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 * A5 / 720));
  if (Lat < 0) {
    UTMNorthing += 1e7;
  }
  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}
function UTMtoLL(utm) {
  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }
  var k0 = 0.9996;
  var a = 6378137;
  var eccSquared = 669438e-8;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C13, R1, D, M2;
  var LongOrigin;
  var mu, phi1Rad;
  var x = UTMEasting - 5e5;
  var y = UTMNorthing;
  if (zoneLetter < "N") {
    y -= 1e7;
  }
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3;
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  M2 = y / k0;
  mu = M2 / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C13 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);
  var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C13 - 4 * C13 * C13 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C13 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C13 * C13) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);
  var lon = (D - (1 + 2 * T1 + C13) * D * D * D / 6 + (5 - 2 * C13 + 28 * T1 - 3 * C13 * C13 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);
  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  } else {
    result = {
      lat,
      lon
    };
  }
  return result;
}
function getLetterDesignator(lat) {
  var LetterDesignator = "Z";
  if (84 >= lat && lat >= 72) {
    LetterDesignator = "X";
  } else if (72 > lat && lat >= 64) {
    LetterDesignator = "W";
  } else if (64 > lat && lat >= 56) {
    LetterDesignator = "V";
  } else if (56 > lat && lat >= 48) {
    LetterDesignator = "U";
  } else if (48 > lat && lat >= 40) {
    LetterDesignator = "T";
  } else if (40 > lat && lat >= 32) {
    LetterDesignator = "S";
  } else if (32 > lat && lat >= 24) {
    LetterDesignator = "R";
  } else if (24 > lat && lat >= 16) {
    LetterDesignator = "Q";
  } else if (16 > lat && lat >= 8) {
    LetterDesignator = "P";
  } else if (8 > lat && lat >= 0) {
    LetterDesignator = "N";
  } else if (0 > lat && lat >= -8) {
    LetterDesignator = "M";
  } else if (-8 > lat && lat >= -16) {
    LetterDesignator = "L";
  } else if (-16 > lat && lat >= -24) {
    LetterDesignator = "K";
  } else if (-24 > lat && lat >= -32) {
    LetterDesignator = "J";
  } else if (-32 > lat && lat >= -40) {
    LetterDesignator = "H";
  } else if (-40 > lat && lat >= -48) {
    LetterDesignator = "G";
  } else if (-48 > lat && lat >= -56) {
    LetterDesignator = "F";
  } else if (-56 > lat && lat >= -64) {
    LetterDesignator = "E";
  } else if (-64 > lat && lat >= -72) {
    LetterDesignator = "D";
  } else if (-72 > lat && lat >= -80) {
    LetterDesignator = "C";
  }
  return LetterDesignator;
}
function encode(utm, accuracy) {
  var seasting = "00000" + utm.easting, snorthing = "00000" + utm.northing;
  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 1e5);
  var setRow = Math.floor(northing / 1e5) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}
function get100kSetForZone(i2) {
  var setParm = i2 % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }
  return setParm;
}
function getLetter100kID(column, row, parm) {
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }
  if (colInt === I || colOrigin < I && colInt > I || (colInt > I || colOrigin < I) && rollover) {
    colInt++;
  }
  if (colInt === O || colOrigin < O && colInt > O || (colInt > O || colOrigin < O) && rollover) {
    colInt++;
    if (colInt === I) {
      colInt++;
    }
  }
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  } else {
    rollover = false;
  }
  if (rowInt === I || rowOrigin < I && rowInt > I || (rowInt > I || rowOrigin < I) && rollover) {
    rowInt++;
  }
  if (rowInt === O || rowOrigin < O && rowInt > O || (rowInt > O || rowOrigin < O) && rollover) {
    rowInt++;
    if (rowInt === I) {
      rowInt++;
    }
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }
  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}
function decode(mgrsString) {
  if (mgrsString && mgrsString.length === 0) {
    throw "MGRSPoint coverting from nothing";
  }
  var length = mgrsString.length;
  var hunK = null;
  var sb = "";
  var testChar;
  var i2 = 0;
  while (!/[A-Z]/.test(testChar = mgrsString.charAt(i2))) {
    if (i2 >= 2) {
      throw "MGRSPoint bad conversion from: " + mgrsString;
    }
    sb += testChar;
    i2++;
  }
  var zoneNumber = parseInt(sb, 10);
  if (i2 === 0 || i2 + 3 > length) {
    throw "MGRSPoint bad conversion from: " + mgrsString;
  }
  var zoneLetter = mgrsString.charAt(i2++);
  if (zoneLetter <= "A" || zoneLetter === "B" || zoneLetter === "Y" || zoneLetter >= "Z" || zoneLetter === "I" || zoneLetter === "O") {
    throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
  }
  hunK = mgrsString.substring(i2, i2 += 2);
  var set = get100kSetForZone(zoneNumber);
  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);
  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2e6;
  }
  var remainder = length - i2;
  if (remainder % 2 !== 0) {
    throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
  }
  var sep = remainder / 2;
  var sepEasting = 0;
  var sepNorthing = 0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 1e5 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i2, i2 + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i2 + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }
  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;
  return {
    easting,
    northing,
    zoneLetter,
    zoneNumber,
    accuracy: accuracyBonus
  };
}
function getEastingFromChar(e, set) {
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 1e5;
  var rewindMarker = false;
  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw "Bad character: " + e;
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 1e5;
  }
  return eastingValue;
}
function getNorthingFromChar(n, set) {
  if (n > "V") {
    throw "MGRSPoint given invalid Northing " + n;
  }
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0;
  var rewindMarker = false;
  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    if (curRow > V) {
      if (rewindMarker) {
        throw "Bad character: " + n;
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 1e5;
  }
  return northingValue;
}
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
    case "C":
      northing = 11e5;
      break;
    case "D":
      northing = 2e6;
      break;
    case "E":
      northing = 28e5;
      break;
    case "F":
      northing = 37e5;
      break;
    case "G":
      northing = 46e5;
      break;
    case "H":
      northing = 55e5;
      break;
    case "J":
      northing = 64e5;
      break;
    case "K":
      northing = 73e5;
      break;
    case "L":
      northing = 82e5;
      break;
    case "M":
      northing = 91e5;
      break;
    case "N":
      northing = 0;
      break;
    case "P":
      northing = 8e5;
      break;
    case "Q":
      northing = 17e5;
      break;
    case "R":
      northing = 26e5;
      break;
    case "S":
      northing = 35e5;
      break;
    case "T":
      northing = 44e5;
      break;
    case "U":
      northing = 53e5;
      break;
    case "V":
      northing = 62e5;
      break;
    case "W":
      northing = 7e6;
      break;
    case "X":
      northing = 79e5;
      break;
    default:
      northing = -1;
  }
  if (northing >= 0) {
    return northing;
  } else {
    throw "Invalid zone letter: " + zoneLetter;
  }
}
var NUM_100K_SETS, SET_ORIGIN_COLUMN_LETTERS, SET_ORIGIN_ROW_LETTERS, A, I, O, V, Z, mgrs_default;
var init_mgrs = __esm({
  "node_modules/mgrs/mgrs.js"() {
    NUM_100K_SETS = 6;
    SET_ORIGIN_COLUMN_LETTERS = "AJSAJS";
    SET_ORIGIN_ROW_LETTERS = "AFAFAF";
    A = 65;
    I = 73;
    O = 79;
    V = 86;
    Z = 90;
    mgrs_default = {
      forward: forward2,
      inverse: inverse2,
      toPoint
    };
  }
});

// node_modules/proj4/lib/Point.js
function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0;
  } else if (typeof x === "object") {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0;
  } else if (typeof x === "string" && typeof y === "undefined") {
    var coords = x.split(",");
    this.x = parseFloat(coords[0]);
    this.y = parseFloat(coords[1]);
    this.z = parseFloat(coords[2]) || 0;
  } else {
    this.x = x;
    this.y = y;
    this.z = z || 0;
  }
  console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
var Point_default;
var init_Point = __esm({
  "node_modules/proj4/lib/Point.js"() {
    init_mgrs();
    Point.fromMGRS = function(mgrsStr) {
      return new Point(toPoint(mgrsStr));
    };
    Point.prototype.toMGRS = function(accuracy) {
      return forward2([this.x, this.y], accuracy);
    };
    Point_default = Point;
  }
});

// node_modules/proj4/lib/common/pj_enfn.js
function pj_enfn_default(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
}
var C00, C02, C04, C06, C08, C22, C44, C46, C48, C66, C68, C88;
var init_pj_enfn = __esm({
  "node_modules/proj4/lib/common/pj_enfn.js"() {
    C00 = 1;
    C02 = 0.25;
    C04 = 0.046875;
    C06 = 0.01953125;
    C08 = 0.01068115234375;
    C22 = 0.75;
    C44 = 0.46875;
    C46 = 0.013020833333333334;
    C48 = 0.007120768229166667;
    C66 = 0.3645833333333333;
    C68 = 0.005696614583333333;
    C88 = 0.3076171875;
  }
});

// node_modules/proj4/lib/common/pj_mlfn.js
function pj_mlfn_default(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
}
var init_pj_mlfn = __esm({
  "node_modules/proj4/lib/common/pj_mlfn.js"() {
  }
});

// node_modules/proj4/lib/common/pj_inv_mlfn.js
function pj_inv_mlfn_default(arg, es, en) {
  var k = 1 / (1 - es);
  var phi = arg;
  for (var i2 = MAX_ITER; i2; --i2) {
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    t = (pj_mlfn_default(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
    phi -= t;
    if (Math.abs(t) < EPSLN) {
      return phi;
    }
  }
  return phi;
}
var MAX_ITER;
var init_pj_inv_mlfn = __esm({
  "node_modules/proj4/lib/common/pj_inv_mlfn.js"() {
    init_pj_mlfn();
    init_values();
    MAX_ITER = 20;
  }
});

// node_modules/proj4/lib/projections/tmerc_approx.js
function init3() {
  if (this.es) {
    this.en = pj_enfn_default(this.es);
    this.ml0 = pj_mlfn_default(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}
function forward3(p) {
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon_default(lon - this.long0, this.over);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);
  if (!this.es) {
    var b = cos_phi * Math.sin(delta_lon);
    if (Math.abs(Math.abs(b) - 1) < EPSLN) {
      return 93;
    } else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
      y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
      b = Math.abs(y);
      if (b >= 1) {
        if (b - 1 > EPSLN) {
          return 93;
        } else {
          y = 0;
        }
      } else {
        y = Math.acos(y);
      }
      if (lat < 0) {
        y = -y;
      }
      y = this.a * this.k0 * (y - this.lat0) + this.y0;
    }
  } else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c = this.ep2 * Math.pow(cos_phi, 2);
    var cs = Math.pow(c, 2);
    var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
    var t = Math.pow(tq, 2);
    var ts = Math.pow(t, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    al = al / Math.sqrt(con);
    var ml = pj_mlfn_default(lat, sin_phi, cos_phi, this.en);
    x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
    y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
  }
  p.x = x;
  p.y = y;
  return p;
}
function inverse3(p) {
  var con, phi;
  var lat, lon;
  var x = (p.x - this.x0) * (1 / this.a);
  var y = (p.y - this.y0) * (1 / this.a);
  if (!this.es) {
    var f = Math.exp(x / this.k0);
    var g = 0.5 * (f - 1 / f);
    var temp = this.lat0 + y / this.k0;
    var h = Math.cos(temp);
    con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
    lat = Math.asin(con);
    if (y < 0) {
      lat = -lat;
    }
    if (g === 0 && h === 0) {
      lon = 0;
    } else {
      lon = adjust_lon_default(Math.atan2(g, h) + this.long0, this.over);
    }
  } else {
    con = this.ml0 + y / this.k0;
    phi = pj_inv_mlfn_default(con, this.es, this.en);
    if (Math.abs(phi) < HALF_PI) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var d = x * Math.sqrt(con) / this.k0;
      var ds = Math.pow(d, 2);
      con = con * tan_phi;
      lat = phi - con * ds / (1 - this.es) * 0.5 * (1 - ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
      lon = adjust_lon_default(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi, this.over);
    } else {
      lat = HALF_PI * sign_default(y);
      lon = 0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var names4, tmerc_approx_default;
var init_tmerc_approx = __esm({
  "node_modules/proj4/lib/projections/tmerc_approx.js"() {
    init_pj_enfn();
    init_pj_mlfn();
    init_pj_inv_mlfn();
    init_adjust_lon();
    init_values();
    init_sign();
    names4 = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
    tmerc_approx_default = {
      init: init3,
      forward: forward3,
      inverse: inverse3,
      names: names4
    };
  }
});

// node_modules/proj4/lib/common/sinh.js
function sinh_default(x) {
  var r = Math.exp(x);
  r = (r - 1 / r) / 2;
  return r;
}
var init_sinh = __esm({
  "node_modules/proj4/lib/common/sinh.js"() {
  }
});

// node_modules/proj4/lib/common/hypot.js
function hypot_default(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  var a = Math.max(x, y);
  var b = Math.min(x, y) / (a ? a : 1);
  return a * Math.sqrt(1 + Math.pow(b, 2));
}
var init_hypot = __esm({
  "node_modules/proj4/lib/common/hypot.js"() {
  }
});

// node_modules/proj4/lib/common/log1py.js
function log1py_default(x) {
  var y = 1 + x;
  var z = y - 1;
  return z === 0 ? x : x * Math.log(y) / z;
}
var init_log1py = __esm({
  "node_modules/proj4/lib/common/log1py.js"() {
  }
});

// node_modules/proj4/lib/common/asinhy.js
function asinhy_default(x) {
  var y = Math.abs(x);
  y = log1py_default(y * (1 + y / (hypot_default(1, y) + 1)));
  return x < 0 ? -y : y;
}
var init_asinhy = __esm({
  "node_modules/proj4/lib/common/asinhy.js"() {
    init_hypot();
    init_log1py();
  }
});

// node_modules/proj4/lib/common/gatg.js
function gatg_default(pp, B, cos2B, sin2B) {
  var cos_2B = 2 * (cos2B === void 0 ? Math.cos(2 * B) : cos2B);
  var i2 = pp.length - 1;
  var h1 = pp[i2];
  var h2 = 0;
  var h;
  while (--i2 >= 0) {
    h = -h2 + cos_2B * h1 + pp[i2];
    h2 = h1;
    h1 = h;
  }
  return B + h * (sin2B === void 0 ? Math.sin(2 * B) : sin2B);
}
var init_gatg = __esm({
  "node_modules/proj4/lib/common/gatg.js"() {
  }
});

// node_modules/proj4/lib/common/clens.js
function clens_default(pp, arg_r) {
  var r = 2 * Math.cos(arg_r);
  var i2 = pp.length - 1;
  var hr1 = pp[i2];
  var hr2 = 0;
  var hr;
  while (--i2 >= 0) {
    hr = -hr2 + r * hr1 + pp[i2];
    hr2 = hr1;
    hr1 = hr;
  }
  return Math.sin(arg_r) * hr;
}
var init_clens = __esm({
  "node_modules/proj4/lib/common/clens.js"() {
  }
});

// node_modules/proj4/lib/common/cosh.js
function cosh_default(x) {
  var r = Math.exp(x);
  r = (r + 1 / r) / 2;
  return r;
}
var init_cosh = __esm({
  "node_modules/proj4/lib/common/cosh.js"() {
  }
});

// node_modules/proj4/lib/common/clens_cmplx.js
function clens_cmplx_default(pp, arg_r, arg_i) {
  var sin_arg_r = Math.sin(arg_r);
  var cos_arg_r = Math.cos(arg_r);
  var sinh_arg_i = sinh_default(arg_i);
  var cosh_arg_i = cosh_default(arg_i);
  var r = 2 * cos_arg_r * cosh_arg_i;
  var i2 = -2 * sin_arg_r * sinh_arg_i;
  var j = pp.length - 1;
  var hr = pp[j];
  var hi1 = 0;
  var hr1 = 0;
  var hi = 0;
  var hr2;
  var hi2;
  while (--j >= 0) {
    hr2 = hr1;
    hi2 = hi1;
    hr1 = hr;
    hi1 = hi;
    hr = -hr2 + r * hr1 - i2 * hi1 + pp[j];
    hi = -hi2 + i2 * hr1 + r * hi1;
  }
  r = sin_arg_r * cosh_arg_i;
  i2 = cos_arg_r * sinh_arg_i;
  return [r * hr - i2 * hi, r * hi + i2 * hr];
}
var init_clens_cmplx = __esm({
  "node_modules/proj4/lib/common/clens_cmplx.js"() {
    init_sinh();
    init_cosh();
  }
});

// node_modules/proj4/lib/projections/etmerc.js
function init4() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  }
  if (this.approx) {
    tmerc_approx_default.init.apply(this);
    this.forward = tmerc_approx_default.forward;
    this.inverse = tmerc_approx_default.inverse;
  }
  this.k0 = this.k0 !== void 0 ? this.k0 : 1;
  this.cgb = [];
  this.cbg = [];
  this.utg = [];
  this.gtu = [];
  var f = this.es / (1 + Math.sqrt(1 - this.es));
  var n = f / (2 - f);
  var np = n;
  this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
  this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
  np = np * n;
  this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
  this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
  np = np * n;
  this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
  this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
  np = np * n;
  this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
  this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
  np = np * n;
  this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
  this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
  np = np * n;
  this.cgb[5] = np * (601676 / 22275);
  this.cbg[5] = np * (444337 / 155925);
  np = Math.pow(n, 2);
  this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
  this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
  this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
  this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
  this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
  np = np * n;
  this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
  this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));
  np = np * n;
  this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
  this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));
  np = np * n;
  this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
  this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));
  np = np * n;
  this.utg[5] = np * (-20648693 / 638668800);
  this.gtu[5] = np * (212378941 / 319334400);
  var Z2 = gatg_default(this.cbg, this.lat0);
  this.Zb = -this.Qn * (Z2 + clens_default(this.gtu, 2 * Z2));
}
function forward4(p) {
  var Ce = adjust_lon_default(p.x - this.long0, this.over);
  var Cn = p.y;
  Cn = gatg_default(this.cbg, Cn);
  var sin_Cn = Math.sin(Cn);
  var cos_Cn = Math.cos(Cn);
  var sin_Ce = Math.sin(Ce);
  var cos_Ce = Math.cos(Ce);
  Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
  Ce = asinhy_default(sin_Ce * cos_Cn / hypot_default(sin_Cn, cos_Cn * cos_Ce));
  var tmp = clens_cmplx_default(this.gtu, 2 * Cn, 2 * Ce);
  Cn = Cn + tmp[0];
  Ce = Ce + tmp[1];
  var x;
  var y;
  if (Math.abs(Ce) <= 2.623395162778) {
    x = this.a * (this.Qn * Ce) + this.x0;
    y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
  } else {
    x = Infinity;
    y = Infinity;
  }
  p.x = x;
  p.y = y;
  return p;
}
function inverse4(p) {
  var Ce = (p.x - this.x0) * (1 / this.a);
  var Cn = (p.y - this.y0) * (1 / this.a);
  Cn = (Cn - this.Zb) / this.Qn;
  Ce = Ce / this.Qn;
  var lon;
  var lat;
  if (Math.abs(Ce) <= 2.623395162778) {
    var tmp = clens_cmplx_default(this.utg, 2 * Cn, 2 * Ce);
    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];
    var sinh_Ce = sinh_default(Ce);
    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var h = hypot_default(sinh_Ce, cos_Cn);
    Ce = Math.atan2(sinh_Ce, cos_Cn);
    Cn = Math.atan2(sin_Cn, h);
    lon = adjust_lon_default(Ce + this.long0, this.over);
    var r2 = sin_Cn * sin_Cn + h * h;
    lat = gatg_default(this.cgb, Cn, (h * h - sin_Cn * sin_Cn) / r2, 2 * sin_Cn * h / r2);
  } else {
    lon = Infinity;
    lat = Infinity;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var names5, etmerc_default;
var init_etmerc = __esm({
  "node_modules/proj4/lib/projections/etmerc.js"() {
    init_tmerc_approx();
    init_sinh();
    init_hypot();
    init_asinhy();
    init_gatg();
    init_clens();
    init_clens_cmplx();
    init_adjust_lon();
    names5 = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc"];
    etmerc_default = {
      init: init4,
      forward: forward4,
      inverse: inverse4,
      names: names5
    };
  }
});

// node_modules/proj4/lib/projections/tmerc.js
function init5() {
  var impl = this.approx || this.es === 0 ? tmerc_approx_default : etmerc_default;
  impl.init.apply(this);
  this.forward = impl.forward;
  this.inverse = impl.inverse;
  if (/south[\W_]*orientated/i.test(this.projName)) {
    this.x0 = -this.x0;
    this.y0 = -this.y0;
    if (this.axis === "enu") {
      this.axis = "wsu";
    }
  }
}
var names6, tmerc_default;
var init_tmerc = __esm({
  "node_modules/proj4/lib/projections/tmerc.js"() {
    init_tmerc_approx();
    init_etmerc();
    names6 = ["Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "Transverse_Mercator_South_Orientated", "tmerc"];
    tmerc_default = {
      init: init5,
      names: names6
    };
  }
});

// node_modules/proj4/lib/common/adjust_zone.js
function adjust_zone_default(zone, lon) {
  if (zone === void 0) {
    zone = Math.floor((adjust_lon_default(lon) + Math.PI) * 30 / Math.PI) + 1;
    if (zone < 0) {
      return 0;
    } else if (zone > 60) {
      return 60;
    }
  }
  return zone;
}
var init_adjust_zone = __esm({
  "node_modules/proj4/lib/common/adjust_zone.js"() {
    init_adjust_lon();
  }
});

// node_modules/proj4/lib/projections/utm.js
function init6() {
  var zone = adjust_zone_default(this.zone, this.long0);
  if (zone === void 0) {
    throw new Error("unknown utm zone");
  }
  this.lat0 = 0;
  this.long0 = (6 * Math.abs(zone) - 183) * D2R;
  this.x0 = 5e5;
  this.y0 = this.utmSouth ? 1e7 : 0;
  this.k0 = 0.9996;
  etmerc_default.init.apply(this);
  this.forward = etmerc_default.forward;
  this.inverse = etmerc_default.inverse;
}
var dependsOn, names7, utm_default;
var init_utm = __esm({
  "node_modules/proj4/lib/projections/utm.js"() {
    init_adjust_zone();
    init_etmerc();
    init_values();
    dependsOn = "etmerc";
    names7 = ["Universal Transverse Mercator System", "utm"];
    utm_default = {
      init: init6,
      names: names7,
      dependsOn
    };
  }
});

// node_modules/proj4/lib/common/srat.js
function srat_default(esinp, exp) {
  return Math.pow((1 - esinp) / (1 + esinp), exp);
}
var init_srat = __esm({
  "node_modules/proj4/lib/common/srat.js"() {
  }
});

// node_modules/proj4/lib/projections/gauss.js
function init7() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat_default(this.e * sphi, this.ratexp));
}
function forward5(p) {
  var lon = p.x;
  var lat = p.y;
  p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat_default(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
  p.x = this.C * lon;
  return p;
}
function inverse5(p) {
  var DEL_TOL = 1e-14;
  var lon = p.x / this.C;
  var lat = p.y;
  var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
  for (var i2 = MAX_ITER2; i2 > 0; --i2) {
    lat = 2 * Math.atan(num * srat_default(this.e * Math.sin(p.y), -0.5 * this.e)) - HALF_PI;
    if (Math.abs(lat - p.y) < DEL_TOL) {
      break;
    }
    p.y = lat;
  }
  if (!i2) {
    return null;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var MAX_ITER2, names8, gauss_default;
var init_gauss = __esm({
  "node_modules/proj4/lib/projections/gauss.js"() {
    init_srat();
    init_values();
    MAX_ITER2 = 20;
    names8 = ["gauss"];
    gauss_default = {
      init: init7,
      forward: forward5,
      inverse: inverse5,
      names: names8
    };
  }
});

// node_modules/proj4/lib/projections/sterea.js
function init8() {
  gauss_default.init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
}
function forward6(p) {
  var sinc, cosc, cosl, k;
  p.x = adjust_lon_default(p.x - this.long0, this.over);
  gauss_default.forward.apply(this, [p]);
  sinc = Math.sin(p.y);
  cosc = Math.cos(p.y);
  cosl = Math.cos(p.x);
  k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p.x = k * cosc * Math.sin(p.x);
  p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}
function inverse6(p) {
  var sinc, cosc, lon, lat, rho;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  p.x /= this.k0;
  p.y /= this.k0;
  if (rho = hypot_default(p.x, p.y)) {
    var c = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p.x = lon;
  p.y = lat;
  gauss_default.inverse.apply(this, [p]);
  p.x = adjust_lon_default(p.x + this.long0, this.over);
  return p;
}
var names9, sterea_default;
var init_sterea = __esm({
  "node_modules/proj4/lib/projections/sterea.js"() {
    init_gauss();
    init_adjust_lon();
    init_hypot();
    names9 = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
    sterea_default = {
      init: init8,
      forward: forward6,
      inverse: inverse6,
      names: names9
    };
  }
});

// node_modules/proj4/lib/projections/stere.js
function ssfn_(phit, sinphi, eccen) {
  sinphi *= eccen;
  return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen);
}
function init9() {
  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (!isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
      this.k0 = 0.5 * (1 + sign_default(this.lat0) * Math.sin(this.lat_ts));
    }
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (this.lat0 > 0) {
        this.con = 1;
      } else {
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (!isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
      this.k0 = 0.5 * this.cons * msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz_default(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = msfnz_default(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
}
function forward7(p) {
  var lon = p.x;
  var lat = p.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A5, X, sinX, cosX, ts, rh;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
    p.x = NaN;
    p.y = NaN;
    return p;
  }
  if (this.sphere) {
    A5 = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p.x = this.a * A5 * coslat * Math.sin(dlon) + this.x0;
    p.y = this.a * A5 * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p;
  } else {
    X = 2 * Math.atan(ssfn_(lat, sinlat, this.e)) - HALF_PI;
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= EPSLN) {
      ts = tsfnz_default(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p.x = this.x0 + rh * Math.sin(lon - this.long0);
      p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      return p;
    } else if (Math.abs(this.sinlat0) < EPSLN) {
      A5 = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p.y = A5 * sinX;
    } else {
      A5 = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p.y = A5 * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p.x = A5 * cosX * Math.sin(dlon) + this.x0;
  }
  return p;
}
function inverse7(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p.x * p.x + p.y * p.y);
  if (this.sphere) {
    var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= EPSLN) {
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < EPSLN) {
      if (this.lat0 > 0) {
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
      } else {
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x, p.y), this.over);
      }
    } else {
      lon = adjust_lon_default(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)), this.over);
    }
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (rh <= EPSLN) {
        lat = this.lat0;
        lon = this.long0;
        p.x = lon;
        p.y = lat;
        return p;
      }
      p.x *= this.con;
      p.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * phi2z_default(this.e, ts);
      lon = this.con * adjust_lon_default(this.con * this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
    } else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= EPSLN) {
        Chi = this.X0;
      } else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)), this.over);
      }
      lat = -1 * phi2z_default(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var names10, stere_default;
var init_stere = __esm({
  "node_modules/proj4/lib/projections/stere.js"() {
    init_values();
    init_sign();
    init_msfnz();
    init_tsfnz();
    init_phi2z();
    init_adjust_lon();
    names10 = ["stere", "Stereographic_South_Pole", "Polar_Stereographic_variant_A", "Polar_Stereographic_variant_B", "Polar_Stereographic"];
    stere_default = {
      init: init9,
      forward: forward7,
      inverse: inverse7,
      names: names10,
      ssfn_
    };
  }
});

// node_modules/proj4/lib/projections/somerc.js
function init10() {
  if (!this.k0) {
    this.k0 = 1;
  }
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}
function forward8(p) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
  var S = -this.alpha * (Sa1 + Sa2) + this.K;
  var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);
  var I2 = this.alpha * (p.x - this.lambda0);
  var rotI = Math.atan(Math.sin(I2) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I2)));
  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I2));
  p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p.x = this.R * rotI + this.x0;
  return p;
}
function inverse8(p) {
  var Y = p.x - this.x0;
  var X = p.y - this.y0;
  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);
  var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I2 = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));
  var lambda = this.lambda0 + I2 / this.alpha;
  var S = 0;
  var phy = b;
  var prevPhy = -1e3;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 1e-7) {
    if (++iteration > 20) {
      return;
    }
    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
  }
  p.x = lambda;
  p.y = phy;
  return p;
}
var names11, somerc_default;
var init_somerc = __esm({
  "node_modules/proj4/lib/projections/somerc.js"() {
    names11 = ["somerc"];
    somerc_default = {
      init: init10,
      forward: forward8,
      inverse: inverse8,
      names: names11
    };
  }
});

// node_modules/proj4/lib/projections/omerc.js
function isTypeA(P) {
  var typeAProjections = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"];
  var projectionName = typeof P.projName === "object" ? Object.keys(P.projName)[0] : P.projName;
  return "no_uoff" in P || "no_off" in P || typeAProjections.indexOf(projectionName) !== -1 || typeAProjections.indexOf(getNormalizedProjName(projectionName)) !== -1;
}
function init11() {
  var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0, gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
  if (!this.k0) {
    this.k0 = 1;
  }
  this.no_off = isTypeA(this);
  this.no_rot = "no_rot" in this;
  var alp = false;
  if ("alpha" in this) {
    alp = true;
  }
  var gam = false;
  if ("rectified_grid_angle" in this) {
    gam = true;
  }
  if (alp) {
    alpha_c = this.alpha;
  }
  if (gam) {
    gamma = this.rectified_grid_angle;
    if (!alp) {
      alpha_c = 0;
      alp = true;
    }
  }
  if (alp || gam) {
    lamc = this.longc;
  } else {
    lam1 = this.long1;
    phi1 = this.lat1;
    lam2 = this.long2;
    phi2 = this.lat2;
    if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL || Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL || Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
      throw new Error();
    }
  }
  var one_es = 1 - this.es;
  com = Math.sqrt(one_es);
  if (Math.abs(this.lat0) > EPSLN) {
    sinph0 = Math.sin(this.lat0);
    cosph0 = Math.cos(this.lat0);
    con = 1 - this.es * sinph0 * sinph0;
    this.B = cosph0 * cosph0;
    this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
    this.A = this.B * this.k0 * com / con;
    D = this.B * com / (cosph0 * Math.sqrt(con));
    F = D * D - 1;
    if (F <= 0) {
      F = 0;
    } else {
      F = Math.sqrt(F);
      if (this.lat0 < 0) {
        F = -F;
      }
    }
    this.E = F += D;
    this.E *= Math.pow(tsfnz_default(this.e, this.lat0, sinph0), this.B);
  } else {
    this.B = 1 / com;
    this.A = this.k0;
    this.E = D = F = 1;
  }
  if (alp || gam) {
    if (alp) {
      gamma0 = Math.asin(Math.sin(alpha_c) / D);
      if (!gam) {
        gamma = alpha_c;
      }
    } else {
      gamma0 = gamma;
      alpha_c = Math.asin(D * Math.sin(gamma0));
    }
    this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
  } else {
    H = Math.pow(tsfnz_default(this.e, phi1, Math.sin(phi1)), this.B);
    L = Math.pow(tsfnz_default(this.e, phi2, Math.sin(phi2)), this.B);
    F = this.E / H;
    p = (L - H) / (L + H);
    J = this.E * this.E;
    J = (J - L * H) / (J + L * H);
    con = lam1 - lam2;
    if (con < -Math.PI) {
      lam2 -= TWO_PI;
    } else if (con > Math.PI) {
      lam2 += TWO_PI;
    }
    this.lam0 = adjust_lon_default(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B, this.over);
    gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon_default(lam1 - this.lam0, this.over)) / (F - 1 / F));
    gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
  }
  this.singam = Math.sin(gamma0);
  this.cosgam = Math.cos(gamma0);
  this.sinrot = Math.sin(gamma);
  this.cosrot = Math.cos(gamma);
  this.rB = 1 / this.B;
  this.ArB = this.A * this.rB;
  this.BrA = 1 / this.ArB;
  if (this.no_off) {
    this.u_0 = 0;
  } else {
    this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
    if (this.lat0 < 0) {
      this.u_0 = -this.u_0;
    }
  }
  F = 0.5 * gamma0;
  this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
  this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
}
function forward9(p) {
  var coords = {};
  var S, T, U, V2, W, temp, u, v;
  p.x = p.x - this.lam0;
  if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
    W = this.E / Math.pow(tsfnz_default(this.e, p.y, Math.sin(p.y)), this.B);
    temp = 1 / W;
    S = 0.5 * (W - temp);
    T = 0.5 * (W + temp);
    V2 = Math.sin(this.B * p.x);
    U = (S * this.singam - V2 * this.cosgam) / T;
    if (Math.abs(Math.abs(U) - 1) < EPSLN) {
      throw new Error();
    }
    v = 0.5 * this.ArB * Math.log((1 - U) / (1 + U));
    temp = Math.cos(this.B * p.x);
    if (Math.abs(temp) < TOL) {
      u = this.A * p.x;
    } else {
      u = this.ArB * Math.atan2(S * this.cosgam + V2 * this.singam, temp);
    }
  } else {
    v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
    u = this.ArB * p.y;
  }
  if (this.no_rot) {
    coords.x = u;
    coords.y = v;
  } else {
    u -= this.u_0;
    coords.x = v * this.cosrot + u * this.sinrot;
    coords.y = u * this.cosrot - v * this.sinrot;
  }
  coords.x = this.a * coords.x + this.x0;
  coords.y = this.a * coords.y + this.y0;
  if (p.z !== void 0) {
    coords.z = p.z;
  }
  if (p.m !== void 0) {
    coords.m = p.m;
  }
  return coords;
}
function inverse9(p) {
  var u, v, Qp, Sp, Tp, Vp, Up;
  var coords = {};
  p.x = (p.x - this.x0) * (1 / this.a);
  p.y = (p.y - this.y0) * (1 / this.a);
  if (this.no_rot) {
    v = p.y;
    u = p.x;
  } else {
    v = p.x * this.cosrot - p.y * this.sinrot;
    u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
  }
  Qp = Math.exp(-this.BrA * v);
  Sp = 0.5 * (Qp - 1 / Qp);
  Tp = 0.5 * (Qp + 1 / Qp);
  Vp = Math.sin(this.BrA * u);
  Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
  if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
    coords.x = 0;
    coords.y = Up < 0 ? -HALF_PI : HALF_PI;
  } else {
    coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
    coords.y = phi2z_default(this.e, Math.pow(coords.y, 1 / this.B));
    if (coords.y === Infinity) {
      throw new Error();
    }
    coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u));
  }
  coords.x += this.lam0;
  if (p.z !== void 0) {
    coords.z = p.z;
  }
  if (p.m !== void 0) {
    coords.m = p.m;
  }
  return coords;
}
var TOL, names12, omerc_default;
var init_omerc = __esm({
  "node_modules/proj4/lib/projections/omerc.js"() {
    init_tsfnz();
    init_adjust_lon();
    init_phi2z();
    init_values();
    init_projections();
    TOL = 1e-7;
    names12 = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Variant_B", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
    omerc_default = {
      init: init11,
      forward: forward9,
      inverse: inverse9,
      names: names12
    };
  }
});

// node_modules/proj4/lib/projections/lcc.js
function init12() {
  if (!this.lat2) {
    this.lat2 = this.lat1;
  }
  if (!this.k0) {
    this.k0 = 1;
  }
  if (/west[\W_]*orientated/i.test(this.projName)) {
    this.x0 = -this.x0;
    if (this.axis === "enu") {
      this.axis = "wnu";
    }
  }
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);
  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = msfnz_default(this.e, sin1, cos1);
  var ts1 = tsfnz_default(this.e, this.lat1, sin1);
  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = msfnz_default(this.e, sin2, cos2);
  var ts2 = tsfnz_default(this.e, this.lat2, sin2);
  var ts0 = tsfnz_default(this.e, this.lat0, Math.sin(this.lat0));
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  } else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN ? 0 : this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
}
function forward10(p) {
  var lon = p.x;
  var lat = p.y;
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
    lat = sign_default(lat) * (HALF_PI - 2 * EPSLN);
  }
  var con = Math.abs(Math.abs(lat) - HALF_PI);
  var ts, rh1;
  if (con > EPSLN) {
    ts = tsfnz_default(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  } else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * adjust_lon_default(lon - this.long0, this.over);
  p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;
  return p;
}
function inverse10(p) {
  var rh1, con, ts;
  var lat, lon;
  var x = (p.x - this.x0) / this.k0;
  var y = this.rh - (p.y - this.y0) / this.k0;
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * x, con * y);
  }
  if (rh1 !== 0 || this.ns > 0) {
    con = 1 / this.ns;
    ts = Math.pow(rh1 / (this.a * this.f0), con);
    lat = phi2z_default(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  } else {
    lat = -HALF_PI;
  }
  lon = adjust_lon_default(theta / this.ns + this.long0, this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
var names13, lcc_default;
var init_lcc = __esm({
  "node_modules/proj4/lib/projections/lcc.js"() {
    init_msfnz();
    init_tsfnz();
    init_sign();
    init_adjust_lon();
    init_phi2z();
    init_values();
    names13 = [
      "Lambert Tangential Conformal Conic Projection",
      "Lambert_Conformal_Conic",
      "Lambert_Conformal_Conic_1SP",
      "Lambert_Conformal_Conic_2SP",
      "lcc",
      "Lambert Conic Conformal (1SP)",
      "Lambert Conic Conformal (2SP)",
      "Lambert Conic Conformal (West Orientated)",
      "Lambert_Conic_Conformal_(West_Orientated)"
    ];
    lcc_default = {
      init: init12,
      forward: forward10,
      inverse: inverse10,
      names: names13
    };
  }
});

// node_modules/proj4/lib/projections/krovak.js
function modKrovakCorrection(xr, yr) {
  var xr2 = xr * xr;
  var yr2 = yr * yr;
  var xr4 = xr2 * xr2;
  var yr4 = yr2 * yr2;
  return [
    C1 + C3 * xr - C4 * yr - 2 * C6 * xr * yr + C5 * (xr2 - yr2) + C7 * xr * (xr2 - 3 * yr2) - C8 * yr * (3 * xr2 - yr2) + 4 * C9 * xr * yr * (xr2 - yr2) + C10 * (xr4 + yr4 - 6 * xr2 * yr2),
    C2 + C3 * yr + C4 * xr + 2 * C5 * xr * yr + C6 * (xr2 - yr2) + C8 * xr * (xr2 - 3 * yr2) + C7 * yr * (3 * xr2 - yr2) - 4 * C10 * xr * yr * (xr2 - yr2) + C9 * (xr4 + yr4 - 6 * xr2 * yr2)
  ];
}
function init13() {
  var name = getNormalizedProjName(this.projName).toLowerCase();
  this.modified = name === "mod_krovak" || name.indexOf("krovak_modified") === 0;
  this.a = 6377397155e-3;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448;
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
}
function forward11(p) {
  var gfi, u, deltav, s, d, eps, ro, dxy;
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon_default(lon - this.long0, this.over);
  gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
  u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
  d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p.y = ro * Math.cos(eps) / 1;
  p.x = ro * Math.sin(eps) / 1;
  if (this.modified) {
    dxy = modKrovakCorrection(p.y - X0, p.x - Y0);
    p.y -= dxy[0];
    p.x -= dxy[1];
  }
  p.y += this.y0;
  p.x += this.x0;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  return p;
}
function inverse11(p) {
  var u, deltav, s, d, eps, ro, fi1, dxy;
  var ok;
  var tmp = p.x;
  p.x = p.y;
  p.y = tmp;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  p.x -= this.y0;
  p.y -= this.x0;
  if (this.modified) {
    dxy = modKrovakCorrection(p.x - X0, p.y - Y0);
    p.x += dxy[0];
    p.y += dxy[1];
  }
  ro = Math.sqrt(p.x * p.x + p.y * p.y);
  eps = Math.atan2(p.y, p.x);
  d = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
  deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
  p.x = this.long0 - deltav / this.alfa;
  fi1 = u;
  ok = 0;
  var iter = 0;
  do {
    p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p.y) < 1e-10) {
      ok = 1;
    }
    fi1 = p.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }
  return p;
}
var X0, Y0, C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, names14, krovak_default;
var init_krovak = __esm({
  "node_modules/proj4/lib/projections/krovak.js"() {
    init_adjust_lon();
    init_projections();
    X0 = 1089e3;
    Y0 = 654e3;
    C1 = 0.02946529277;
    C2 = 0.02515965696;
    C3 = 1193845912e-16;
    C4 = -4668270147e-16;
    C5 = 9233980362e-21;
    C6 = 1523735715e-21;
    C7 = 1696780024e-27;
    C8 = 4408314235e-27;
    C9 = -8331083518e-33;
    C10 = -3689471323e-33;
    names14 = ["Krovak", "Krovak Modified", "Krovak (North Orientated)", "Krovak Modified (North Orientated)", "krovak", "mod_krovak"];
    krovak_default = {
      init: init13,
      forward: forward11,
      inverse: inverse11,
      names: names14
    };
  }
});

// node_modules/proj4/lib/common/adjust_lat.js
function adjust_lat_default(x) {
  return Math.abs(x) < HALF_PI ? x : x - sign_default(x) * Math.PI;
}
var init_adjust_lat = __esm({
  "node_modules/proj4/lib/common/adjust_lat.js"() {
    init_values();
    init_sign();
  }
});

// node_modules/proj4/lib/projections/cass.js
function init14() {
  this.hyperbolic = Boolean(this.hyperbolic) || getNormalizedProjName(this.projName).toLowerCase() === "hyperbolic_cassini_soldner";
  if (!this.sphere) {
    this.en = pj_enfn_default(this.es);
    this.m0 = pj_mlfn_default(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}
function e_fwd(lam, phi) {
  var es = this.es;
  var sinphi = Math.sin(phi);
  var cosphi = Math.cos(phi);
  var M2 = pj_mlfn_default(phi, sinphi, cosphi, this.en);
  var nu = 1 / Math.sqrt(1 - es * sinphi * sinphi);
  var tanphi = Math.tan(phi);
  var T = tanphi * tanphi;
  var A5 = lam * cosphi;
  var C = es * cosphi * cosphi / (1 - es);
  var A22 = A5 * A5;
  var x = nu * A5 * (1 - A22 * T * (1 / 6 + (8 - T + 8 * C) * A22 / 120));
  var y = M2 - this.m0 + nu * tanphi * A22 * (0.5 + (5 - T + 6 * C) * A22 / 24);
  if (this.hyperbolic) {
    var rho = nu * nu * nu * (1 - es);
    y -= y * y * y / (6 * rho * nu);
  }
  return [x, y];
}
function generic_inverse_2d(fwd, x, y, lam, phi) {
  var deriv_lam_X = 0;
  var deriv_lam_Y = 0;
  var deriv_phi_X = 0;
  var deriv_phi_Y = 0;
  for (var i2 = 0; i2 < 15; i2++) {
    var xyApprox = fwd(lam, phi);
    var deltaX = xyApprox[0] - x;
    var deltaY = xyApprox[1] - y;
    if (Math.abs(deltaX) < 1e-12 && Math.abs(deltaY) < 1e-12) {
      return [lam, phi];
    }
    if (i2 === 0 || Math.abs(deltaX) > 1e-6 || Math.abs(deltaY) > 1e-6) {
      var dLam = lam > 0 ? -1e-6 : 1e-6;
      var xy2 = fwd(lam + dLam, phi);
      var deriv_X_lam = (xy2[0] - xyApprox[0]) / dLam;
      var deriv_Y_lam = (xy2[1] - xyApprox[1]) / dLam;
      var dPhi = phi > 0 ? -1e-6 : 1e-6;
      xy2 = fwd(lam, phi + dPhi);
      var deriv_X_phi = (xy2[0] - xyApprox[0]) / dPhi;
      var deriv_Y_phi = (xy2[1] - xyApprox[1]) / dPhi;
      var det = deriv_X_lam * deriv_Y_phi - deriv_X_phi * deriv_Y_lam;
      if (det !== 0) {
        deriv_lam_X = deriv_Y_phi / det;
        deriv_lam_Y = -deriv_X_phi / det;
        deriv_phi_X = -deriv_Y_lam / det;
        deriv_phi_Y = deriv_X_lam / det;
      }
    }
    lam -= Math.max(Math.min(deltaX * deriv_lam_X + deltaY * deriv_lam_Y, 0.3), -0.3);
    lam = Math.max(Math.min(lam, Math.PI), -Math.PI);
    phi -= Math.max(Math.min(deltaX * deriv_phi_X + deltaY * deriv_phi_Y, 0.3), -0.3);
    phi = Math.max(Math.min(phi, HALF_PI), -HALF_PI);
  }
  return null;
}
function forward12(p) {
  var x, y;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon_default(lam - this.long0, this.over);
  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  } else {
    var xy = e_fwd.call(this, lam, phi);
    x = this.a * xy[0];
    y = this.a * xy[1];
  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}
function inverse12(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var phi, lam;
  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  } else {
    var es = this.es;
    var phi1 = pj_inv_mlfn_default(this.m0 + y, es, this.en);
    if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
      p.x = this.long0;
      p.y = HALF_PI;
      if (y < 0) {
        p.y *= -1;
      }
      return p;
    }
    var tanphi1 = Math.tan(phi1);
    var T1 = tanphi1 * tanphi1;
    var sinphi1 = Math.sin(phi1);
    var nu1 = 1 / Math.sqrt(1 - es * sinphi1 * sinphi1);
    var rho1 = nu1 * nu1 * nu1 * (1 - es);
    var D = x / nu1;
    var D2 = D * D;
    phi = phi1 - nu1 * tanphi1 / rho1 * D2 * (0.5 - (1 + 3 * T1) * D2 / 24);
    lam = D * (1 - T1 * D2 * (1 / 3 - (1 + 3 * T1) * D2 / 15)) / Math.cos(phi1);
    var lp = generic_inverse_2d(e_fwd.bind(this), x, y, lam, phi);
    if (!lp) {
      return null;
    }
    lam = lp[0];
    phi = lp[1];
  }
  p.x = adjust_lon_default(lam + this.long0, this.over);
  p.y = this.sphere ? adjust_lat_default(phi) : phi;
  return p;
}
var names15, cass_default;
var init_cass = __esm({
  "node_modules/proj4/lib/projections/cass.js"() {
    init_pj_enfn();
    init_pj_mlfn();
    init_pj_inv_mlfn();
    init_adjust_lon();
    init_adjust_lat();
    init_values();
    init_projections();
    names15 = ["Cassini", "Cassini_Soldner", "Hyperbolic_Cassini_Soldner", "cass"];
    cass_default = {
      init: init14,
      forward: forward12,
      inverse: inverse12,
      names: names15
    };
  }
});

// node_modules/proj4/lib/common/qsfnz.js
function qsfnz_default(eccent, sinphi) {
  var con;
  if (eccent > 1e-7) {
    con = eccent * sinphi;
    return (1 - eccent * eccent) * (sinphi / (1 - con * con) - 0.5 / eccent * Math.log((1 - con) / (1 + con)));
  } else {
    return 2 * sinphi;
  }
}
var init_qsfnz = __esm({
  "node_modules/proj4/lib/common/qsfnz.js"() {
  }
});

// node_modules/proj4/lib/common/authset.js
function authset(es) {
  var t;
  var APA = [];
  APA[0] = es * P00;
  t = es * es;
  APA[0] += t * P01;
  APA[1] = t * P10;
  t *= es;
  APA[0] += t * P02;
  APA[1] += t * P11;
  APA[2] = t * P20;
  return APA;
}
var P00, P01, P02, P10, P11, P20;
var init_authset = __esm({
  "node_modules/proj4/lib/common/authset.js"() {
    P00 = 0.3333333333333333;
    P01 = 0.17222222222222222;
    P02 = 0.10257936507936508;
    P10 = 0.06388888888888888;
    P11 = 0.0664021164021164;
    P20 = 0.016415012942191543;
  }
});

// node_modules/proj4/lib/common/authlat.js
function authlat(beta, APA) {
  var t = beta + beta;
  return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
}
var init_authlat = __esm({
  "node_modules/proj4/lib/common/authlat.js"() {
  }
});

// node_modules/proj4/lib/projections/laea.js
function init15() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? S_POLE : N_POLE;
  } else if (Math.abs(t) < EPSLN) {
    this.mode = EQUIT;
  } else {
    this.mode = OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;
    this.qp = qsfnz_default(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = authset(this.es);
    switch (this.mode) {
      case N_POLE:
        this.dd = 1;
        break;
      case S_POLE:
        this.dd = 1;
        break;
      case EQUIT:
        this.rq = Math.sqrt(0.5 * this.qp);
        this.dd = 1 / this.rq;
        this.xmf = 1;
        this.ymf = 0.5 * this.qp;
        break;
      case OBLIQ:
        this.rq = Math.sqrt(0.5 * this.qp);
        sinphi = Math.sin(this.lat0);
        this.sinb1 = qsfnz_default(this.e, sinphi) / this.qp;
        this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
        this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
        this.ymf = (this.xmf = this.rq) / this.dd;
        this.xmf *= this.dd;
        break;
    }
  } else {
    if (this.mode === OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
}
function forward13(p) {
  var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon_default(lam - this.long0, this.over);
  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= EPSLN) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.lat0) < EPSLN) {
        return null;
      }
      y = FORTPI - phi * 0.5;
      y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  } else {
    sinb = 0;
    cosb = 0;
    b = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q = qsfnz_default(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
      case this.OBLIQ:
        b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
        break;
      case this.EQUIT:
        b = 1 + cosb * coslam;
        break;
      case this.N_POLE:
        b = HALF_PI + phi;
        q = this.qp - q;
        break;
      case this.S_POLE:
        b = phi - HALF_PI;
        q = this.qp + q;
        break;
    }
    if (Math.abs(b) < EPSLN) {
      return null;
    }
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        b = Math.sqrt(2 / b);
        if (this.mode === this.OBLIQ) {
          y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
        } else {
          y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
        }
        x = this.xmf * b * cosb * sinlam;
        break;
      case this.N_POLE:
      case this.S_POLE:
        if (q >= 0) {
          x = (b = Math.sqrt(q)) * sinlam;
          y = coslam * (this.mode === this.S_POLE ? b : -b);
        } else {
          x = y = 0;
        }
        break;
    }
  }
  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
}
function inverse13(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var lam, phi, cCe, sCe, q, rho, ab;
  if (this.sphere) {
    var cosz = 0, rh, sinz = 0;
    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
      case this.EQUIT:
        phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh);
        x *= sinz;
        y = cosz * rh;
        break;
      case this.OBLIQ:
        phi = Math.abs(rh) <= EPSLN ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
        x *= sinz * this.cosph0;
        y = (cosz - Math.sin(phi) * this.sinph0) * rh;
        break;
      case this.N_POLE:
        y = -y;
        phi = HALF_PI - phi;
        break;
      case this.S_POLE:
        phi -= HALF_PI;
        break;
    }
    lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
  } else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < EPSLN) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= sCe = Math.sin(sCe);
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      } else {
        ab = y * sCe / rho;
        q = this.qp * ab;
        y = rho * cCe;
      }
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q = x * x + y * y;
      if (!q) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      ab = 1 - q / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = authlat(Math.asin(ab), this.apa);
  }
  p.x = adjust_lon_default(this.long0 + lam, this.over);
  p.y = phi;
  return p;
}
var S_POLE, N_POLE, EQUIT, OBLIQ, names16, laea_default;
var init_laea = __esm({
  "node_modules/proj4/lib/projections/laea.js"() {
    init_values();
    init_qsfnz();
    init_adjust_lon();
    init_authset();
    init_authlat();
    S_POLE = 1;
    N_POLE = 2;
    EQUIT = 3;
    OBLIQ = 4;
    names16 = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
    laea_default = {
      init: init15,
      forward: forward13,
      inverse: inverse13,
      names: names16,
      S_POLE,
      N_POLE,
      EQUIT,
      OBLIQ
    };
  }
});

// node_modules/proj4/lib/common/asinz.js
function asinz_default(x) {
  if (Math.abs(x) > 1) {
    x = x > 1 ? 1 : -1;
  }
  return Math.asin(x);
}
var init_asinz = __esm({
  "node_modules/proj4/lib/common/asinz.js"() {
  }
});

// node_modules/proj4/lib/projections/aea.js
function init16() {
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);
  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = msfnz_default(this.e3, this.sin_po, this.cos_po);
  this.qs1 = qsfnz_default(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = msfnz_default(this.e3, this.sin_po, this.cos_po);
  this.qs2 = qsfnz_default(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = qsfnz_default(this.e3, this.sin_po);
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  } else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}
function forward14(p) {
  var lon = p.x;
  var lat = p.y;
  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);
  var qs = qsfnz_default(this.e3, this.sin_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * adjust_lon_default(lon - this.long0, this.over);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;
  p.x = x;
  p.y = y;
  return p;
}
function inverse14(p) {
  var rh1, qs, con, theta, lon, lat;
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  } else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }
  lon = adjust_lon_default(theta / this.ns0 + this.long0, this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
function phi1z(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = asinz_default(0.5 * qs);
  if (eccent < EPSLN) {
    return phi;
  }
  var eccnts = eccent * eccent;
  for (var i2 = 1; i2 <= 25; i2++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
}
var names17, aea_default;
var init_aea = __esm({
  "node_modules/proj4/lib/projections/aea.js"() {
    init_msfnz();
    init_qsfnz();
    init_adjust_lon();
    init_asinz();
    init_values();
    names17 = ["Albers_Conic_Equal_Area", "Albers_Equal_Area", "Albers", "aea"];
    aea_default = {
      init: init16,
      forward: forward14,
      inverse: inverse14,
      names: names17,
      phi1z
    };
  }
});

// node_modules/proj4/lib/projections/gnom.js
function init17() {
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  this.infinity_dist = 1e3 * this.a;
  this.rc = 1;
}
function forward15(p) {
  var sinphi, cosphi;
  var dlon;
  var coslon;
  var ksp;
  var g;
  var x, y;
  var lon = p.x;
  var lat = p.y;
  dlon = adjust_lon_default(lon - this.long0, this.over);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if (g > 0 || Math.abs(g) <= EPSLN) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
  } else {
    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}
function inverse15(p) {
  var rh;
  var sinc, cosc;
  var c;
  var lon, lat;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  p.x /= this.k0;
  p.y /= this.k0;
  if (rh = Math.sqrt(p.x * p.x + p.y * p.y)) {
    c = Math.atan2(rh, this.rc);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = asinz_default(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh);
    lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
    lon = adjust_lon_default(this.long0 + lon, this.over);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var names18, gnom_default;
var init_gnom = __esm({
  "node_modules/proj4/lib/projections/gnom.js"() {
    init_adjust_lon();
    init_asinz();
    init_values();
    names18 = ["gnom"];
    gnom_default = {
      init: init17,
      forward: forward15,
      inverse: inverse15,
      names: names18
    };
  }
});

// node_modules/proj4/lib/common/iqsfnz.js
function iqsfnz_default(eccent, q) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q) - temp) < 1e-6) {
    if (q < 0) {
      return -1 * HALF_PI;
    } else {
      return HALF_PI;
    }
  }
  var phi = Math.asin(0.5 * q);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i2 = 0; i2 < 30; i2++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return NaN;
}
var init_iqsfnz = __esm({
  "node_modules/proj4/lib/common/iqsfnz.js"() {
    init_values();
  }
});

// node_modules/proj4/lib/projections/cea.js
function init18() {
  if (!this.sphere) {
    this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
}
function forward16(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  } else {
    var qs = qsfnz_default(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }
  p.x = x;
  p.y = y;
  return p;
}
function inverse16(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat;
  if (this.sphere) {
    lon = adjust_lon_default(this.long0 + p.x / this.a / Math.cos(this.lat_ts), this.over);
    lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts));
  } else {
    lat = iqsfnz_default(this.e, 2 * p.y * this.k0 / this.a);
    lon = adjust_lon_default(this.long0 + p.x / (this.a * this.k0), this.over);
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var names19, cea_default;
var init_cea = __esm({
  "node_modules/proj4/lib/projections/cea.js"() {
    init_adjust_lon();
    init_qsfnz();
    init_msfnz();
    init_iqsfnz();
    names19 = ["cea"];
    cea_default = {
      init: init18,
      forward: forward16,
      inverse: inverse16,
      names: names19
    };
  }
});

// node_modules/proj4/lib/projections/labrd.js
function init19() {
  if (!this.lat0) {
    throw new Error("Invalid value for lat_0: lat_0 should be different from 0");
  }
  if (!this.k0) {
    this.k0 = 1;
  }
  var az = this.alpha !== void 0 ? this.alpha : (parseFloat(this.azi) || 0) * D2R;
  var sinp = Math.sin(this.lat0);
  var t = 1 - this.es * sinp * sinp;
  var N = 1 / Math.sqrt(t);
  var R = (1 - this.es) * N / t;
  this.kRg = this.k0 * Math.sqrt(N * R);
  this.p0s = Math.atan(Math.sqrt(R / N) * Math.tan(this.lat0));
  this.A = sinp / Math.sin(this.p0s);
  t = this.e * sinp;
  this.C = 0.5 * this.e * this.A * Math.log((1 + t) / (1 - t)) - this.A * Math.log(Math.tan(FORTPI + 0.5 * this.lat0)) + Math.log(Math.tan(FORTPI + 0.5 * this.p0s));
  t = az + az;
  this.Cb = 1 / (12 * this.kRg * this.kRg);
  this.Ca = (1 - Math.cos(t)) * this.Cb;
  this.Cb *= Math.sin(t);
  this.Cc = 3 * (this.Ca * this.Ca - this.Cb * this.Cb);
  this.Cd = 6 * this.Ca * this.Cb;
}
function forward17(p) {
  var lam = adjust_lon_default(p.x - this.long0, this.over);
  var phi = p.y;
  var V1 = this.A * Math.log(Math.tan(FORTPI + 0.5 * phi));
  var t = this.e * Math.sin(phi);
  var V2 = 0.5 * this.e * this.A * Math.log((1 + t) / (1 - t));
  var ps = 2 * (Math.atan(Math.exp(V1 - V2 + this.C)) - FORTPI);
  var I1 = ps - this.p0s;
  var cosps = Math.cos(ps);
  var cosps2 = cosps * cosps;
  var sinps = Math.sin(ps);
  var sinps2 = sinps * sinps;
  var I4 = this.A * cosps;
  var I2 = 0.5 * this.A * I4 * sinps;
  var I3 = I2 * this.A * this.A * (5 * cosps2 - sinps2) / 12;
  var I6 = I4 * this.A * this.A;
  var I5 = I6 * (cosps2 - sinps2) / 6;
  I6 *= this.A * this.A * (5 * cosps2 * cosps2 + sinps2 * (sinps2 - 18 * cosps2)) / 120;
  t = lam * lam;
  var x = this.kRg * lam * (I4 + t * (I5 + t * I6));
  var y = this.kRg * (I1 + t * (I2 + t * I3));
  var x2 = x * x;
  var y2 = y * y;
  V1 = 3 * x * y2 - x * x2;
  V2 = y * y2 - 3 * x2 * y;
  x += this.Ca * V1 + this.Cb * V2;
  y += this.Ca * V2 - this.Cb * V1;
  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
}
function inverse17(p) {
  var x = (p.x - this.x0) / this.a;
  var y = (p.y - this.y0) / this.a;
  var x2 = x * x;
  var y2 = y * y;
  var V1 = 3 * x * y2 - x * x2;
  var V2 = y * y2 - 3 * x2 * y;
  var V3 = x * (5 * y2 * y2 + x2 * (-10 * y2 + x2));
  var V4 = y * (5 * x2 * x2 + y2 * (-10 * x2 + y2));
  x += -this.Ca * V1 - this.Cb * V2 + this.Cc * V3 + this.Cd * V4;
  y += this.Cb * V1 - this.Ca * V2 - this.Cd * V3 + this.Cc * V4;
  var ps = this.p0s + y / this.kRg;
  var pe = ps + this.lat0 - this.p0s;
  var t, tpe;
  for (var i2 = 20; i2; --i2) {
    V1 = this.A * Math.log(Math.tan(FORTPI + 0.5 * pe));
    tpe = this.e * Math.sin(pe);
    V2 = 0.5 * this.e * this.A * Math.log((1 + tpe) / (1 - tpe));
    t = ps - 2 * (Math.atan(Math.exp(V1 - V2 + this.C)) - FORTPI);
    pe += t;
    if (Math.abs(t) < EPSLN) {
      break;
    }
  }
  t = this.e * Math.sin(pe);
  t = 1 - t * t;
  var Re = (1 - this.es) / (t * Math.sqrt(t));
  t = Math.tan(ps);
  var t2 = t * t;
  var s = this.kRg * this.kRg;
  var d = Re * this.k0 * this.kRg;
  var I7 = t / (2 * d);
  var I8 = t * (5 + 3 * t2) / (24 * d * s);
  d = Math.cos(ps) * this.kRg * this.A;
  var I9 = 1 / d;
  d *= s;
  var I10 = (1 + 2 * t2) / (6 * d);
  var I11 = (5 + t2 * (28 + 24 * t2)) / (120 * d * s);
  x2 = x * x;
  p.x = adjust_lon_default(x * (I9 + x2 * (-I10 + x2 * I11)) + this.long0, this.over);
  p.y = pe + x2 * (-I7 + I8 * x2);
  return p;
}
var names20, labrd_default;
var init_labrd = __esm({
  "node_modules/proj4/lib/projections/labrd.js"() {
    init_adjust_lon();
    init_values();
    names20 = ["Laborde_Oblique_Mercator", "labrd"];
    labrd_default = {
      init: init19,
      forward: forward17,
      inverse: inverse17,
      names: names20
    };
  }
});

// node_modules/proj4/lib/projections/eqc.js
function init20() {
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
  this.rc = Math.cos(this.lat_ts);
  if (this.es) {
    var sinphi1 = Math.sin(this.lat_ts);
    var nu1 = 1 / Math.sqrt(1 - this.es * sinphi1 * sinphi1);
    this.rc *= nu1;
    this.en = pj_enfn_default(this.es);
    this.ml0 = pj_mlfn_default(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}
function forward18(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  p.x = this.x0 + this.a * dlon * this.rc;
  if (this.es) {
    p.y = this.y0 + this.a * (pj_mlfn_default(lat, Math.sin(lat), Math.cos(lat), this.en) - this.ml0);
  } else {
    p.y = this.y0 + this.a * (lat - this.lat0);
  }
  return p;
}
function inverse18(p) {
  var x = p.x;
  var y = p.y;
  p.x = adjust_lon_default(this.long0 + (x - this.x0) / (this.a * this.rc), this.over);
  if (this.es) {
    p.y = pj_inv_mlfn_default((y - this.y0) / this.a + this.ml0, this.es, this.en);
  } else {
    p.y = this.lat0 + (y - this.y0) / this.a;
  }
  return p;
}
var names21, eqc_default;
var init_eqc = __esm({
  "node_modules/proj4/lib/projections/eqc.js"() {
    init_adjust_lon();
    init_pj_enfn();
    init_pj_mlfn();
    init_pj_inv_mlfn();
    names21 = ["Equirectangular", "Equidistant_Cylindrical", "Equidistant_Cylindrical_Spherical", "Equidistant_Cylindrical_Ellipsoidal", "Plate_Carree", "eqc"];
    eqc_default = {
      init: init20,
      forward: forward18,
      inverse: inverse18,
      names: names21
    };
  }
});

// node_modules/proj4/lib/common/e0fn.js
function e0fn_default(x) {
  return 1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x));
}
var init_e0fn = __esm({
  "node_modules/proj4/lib/common/e0fn.js"() {
  }
});

// node_modules/proj4/lib/common/e1fn.js
function e1fn_default(x) {
  return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x));
}
var init_e1fn = __esm({
  "node_modules/proj4/lib/common/e1fn.js"() {
  }
});

// node_modules/proj4/lib/common/e2fn.js
function e2fn_default(x) {
  return 0.05859375 * x * x * (1 + 0.75 * x);
}
var init_e2fn = __esm({
  "node_modules/proj4/lib/common/e2fn.js"() {
  }
});

// node_modules/proj4/lib/common/e3fn.js
function e3fn_default(x) {
  return x * x * x * (35 / 3072);
}
var init_e3fn = __esm({
  "node_modules/proj4/lib/common/e3fn.js"() {
  }
});

// node_modules/proj4/lib/common/mlfn.js
function mlfn_default(e0, e1, e2, e3, phi) {
  return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
}
var init_mlfn = __esm({
  "node_modules/proj4/lib/common/mlfn.js"() {
  }
});

// node_modules/proj4/lib/common/gN.js
function gN_default(a, e, sinphi) {
  var temp = e * sinphi;
  return a / Math.sqrt(1 - temp * temp);
}
var init_gN = __esm({
  "node_modules/proj4/lib/common/gN.js"() {
  }
});

// node_modules/proj4/lib/projections/poly.js
function init21() {
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn_default(this.es);
  this.e1 = e1fn_default(this.es);
  this.e2 = e2fn_default(this.es);
  this.e3 = e3fn_default(this.es);
  this.ml0 = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function forward19(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y, el;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    } else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * (adjust_lat_default(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  } else {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    } else {
      var nl = gN_default(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }
  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}
function inverse19(p) {
  var lon, lat, x, y, i2;
  var al, bl;
  var phi, dphi;
  x = p.x - this.x0;
  y = p.y - this.y0;
  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
      lon = adjust_lon_default(x / this.a + this.long0, this.over);
      lat = 0;
    } else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i2 = MAX_ITER3; i2; --i2) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      lon = adjust_lon_default(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat), this.over);
    }
  } else {
    if (Math.abs(y + this.ml0) <= EPSLN) {
      lat = 0;
      lon = adjust_lon_default(this.long0 + x / this.a, this.over);
    } else {
      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i2 = MAX_ITER3; i2; --i2) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = adjust_lon_default(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat), this.over);
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var MAX_ITER3, names22, poly_default;
var init_poly = __esm({
  "node_modules/proj4/lib/projections/poly.js"() {
    init_e0fn();
    init_e1fn();
    init_e2fn();
    init_e3fn();
    init_adjust_lon();
    init_adjust_lat();
    init_mlfn();
    init_values();
    init_gN();
    MAX_ITER3 = 20;
    names22 = ["Polyconic", "American_Polyconic", "poly"];
    poly_default = {
      init: init21,
      forward: forward19,
      inverse: inverse19,
      names: names22
    };
  }
});

// node_modules/proj4/lib/projections/nzmg.js
function init22() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -55161e-7;
  this.A[7] = 26906e-7;
  this.A[8] = -1333e-6;
  this.A[9] = 67e-5;
  this.A[10] = -34e-5;
  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 3371507e-9;
  this.B_re[3] = -1541739e-9;
  this.B_im[3] = 0.04105856;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;
  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -7809598e-9;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;
  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 7317e-6;
  this.D[7] = 0.0122;
  this.D[8] = 394e-5;
  this.D[9] = -13e-4;
}
function forward20(p) {
  var n;
  var lon = p.x;
  var lat = p.y;
  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;
  var d_phi = delta_lat / SEC_TO_RAD * 1e-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1;
  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }
  var th_re = d_psi;
  var th_im = d_lambda;
  var th_n_re = 1;
  var th_n_im = 0;
  var th_n_re1;
  var th_n_im1;
  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }
  p.x = z_im * this.a + this.x0;
  p.y = z_re * this.a + this.y0;
  return p;
}
function inverse20(p) {
  var n;
  var x = p.x;
  var y = p.y;
  var delta_x = x - this.x0;
  var delta_y = y - this.y0;
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;
  var z_n_re = 1;
  var z_n_im = 0;
  var z_n_re1;
  var z_n_im1;
  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }
  for (var i2 = 0; i2 < this.iterations; i2++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;
    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }
    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1;
  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }
  var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5;
  var lon = this.long0 + d_lambda;
  p.x = lon;
  p.y = lat;
  return p;
}
var iterations, names23, nzmg_default;
var init_nzmg = __esm({
  "node_modules/proj4/lib/projections/nzmg.js"() {
    init_values();
    iterations = 1;
    names23 = ["New_Zealand_Map_Grid", "nzmg"];
    nzmg_default = {
      init: init22,
      forward: forward20,
      inverse: inverse20,
      names: names23,
      iterations
    };
  }
});

// node_modules/proj4/lib/projections/mill.js
function init23() {
}
function forward21(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
  p.x = x;
  p.y = y;
  return p;
}
function inverse21(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon = adjust_lon_default(this.long0 + p.x / this.a, this.over);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);
  p.x = lon;
  p.y = lat;
  return p;
}
var names24, mill_default;
var init_mill = __esm({
  "node_modules/proj4/lib/projections/mill.js"() {
    init_adjust_lon();
    names24 = ["Miller_Cylindrical", "mill"];
    mill_default = {
      init: init23,
      forward: forward21,
      inverse: inverse21,
      names: names24
    };
  }
});

// node_modules/proj4/lib/projections/sinu.js
function init24() {
  if (!this.sphere) {
    this.en = pj_enfn_default(this.es);
  } else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }
}
function forward22(p) {
  var x, y;
  var lon = p.x;
  var lat = p.y;
  lon = adjust_lon_default(lon - this.long0, this.over);
  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    } else {
      var k = this.n * Math.sin(lat);
      for (var i2 = MAX_ITER4; i2; --i2) {
        var V2 = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
        lat -= V2;
        if (Math.abs(V2) < EPSLN) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;
  } else {
    var s = Math.sin(lat);
    var c = Math.cos(lat);
    y = this.a * pj_mlfn_default(lat, s, c, this.en);
    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
  }
  p.x = x;
  p.y = y;
  return p;
}
function inverse22(p) {
  var lat, temp, lon, s;
  p.x -= this.x0;
  lon = p.x / this.a;
  p.y -= this.y0;
  lat = p.y / this.a;
  if (this.sphere) {
    lat /= this.C_y;
    if (Math.abs(lat) > HALF_PI) {
      lat = sign_default(lat) * HALF_PI;
    }
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = asinz_default((this.m * lat + Math.sin(lat)) / this.n);
    } else if (this.n !== 1) {
      lat = asinz_default(Math.sin(lat) / this.n);
    }
    if (!this.over && Math.abs(lon) > Math.PI) {
      lon = sign_default(lon) * Math.PI;
    }
    lon = adjust_lon_default(lon + this.long0, this.over);
  } else {
    lat = pj_inv_mlfn_default(p.y / this.a, this.es, this.en);
    if (Math.abs(lat) > HALF_PI) {
      lat = sign_default(lat) * HALF_PI;
    }
    s = Math.abs(lat);
    if (s < HALF_PI) {
      s = Math.sin(lat);
      temp = p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      if (!this.over && Math.abs(temp) > Math.PI) {
        temp = sign_default(temp) * Math.PI;
      }
      lon = adjust_lon_default(this.long0 + temp, this.over);
    } else {
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var MAX_ITER4, names25, sinu_default;
var init_sinu = __esm({
  "node_modules/proj4/lib/projections/sinu.js"() {
    init_adjust_lon();
    init_sign();
    init_pj_enfn();
    init_pj_mlfn();
    init_pj_inv_mlfn();
    init_values();
    init_asinz();
    MAX_ITER4 = 20;
    names25 = ["Sinusoidal", "sinu"];
    sinu_default = {
      init: init24,
      forward: forward22,
      inverse: inverse22,
      names: names25
    };
  }
});

// node_modules/proj4/lib/projections/eck6.js
function init25() {
  this.sphere = true;
  this.b = this.a;
  this.m = 1;
  this.n = 2.5707963267948966;
  this.es = 0;
  this.C_y = Math.sqrt((this.m + 1) / this.n);
  this.C_x = this.C_y / (this.m + 1);
}
var forward23, inverse23, names26, eck6_default;
var init_eck6 = __esm({
  "node_modules/proj4/lib/projections/eck6.js"() {
    init_sinu();
    forward23 = forward22;
    inverse23 = inverse22;
    names26 = ["Eckert_VI", "eck6"];
    eck6_default = {
      init: init25,
      forward: forward23,
      inverse: inverse23,
      names: names26
    };
  }
});

// node_modules/proj4/lib/projections/moll.js
function init26() {
}
function forward24(p) {
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon_default(lon - this.long0, this.over);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);
  while (true) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < EPSLN) {
      break;
    }
  }
  theta /= 2;
  if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
  p.x = x;
  p.y = y;
  return p;
}
function inverse24(p) {
  var theta;
  var arg;
  p.x -= this.x0;
  p.y -= this.y0;
  arg = p.y / (1.4142135623731 * this.a);
  if (Math.abs(arg) > 0.999999999999) {
    arg = sign_default(arg) * 0.999999999999;
  }
  theta = Math.asin(arg);
  var delta_lon = p.x / (0.900316316158 * this.a * Math.cos(theta));
  if (!this.over && Math.abs(delta_lon) > Math.PI) {
    delta_lon = sign_default(delta_lon) * Math.PI;
  }
  var lon = adjust_lon_default(this.long0 + delta_lon, this.over);
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);
  p.x = lon;
  p.y = lat;
  return p;
}
var names27, moll_default;
var init_moll = __esm({
  "node_modules/proj4/lib/projections/moll.js"() {
    init_adjust_lon();
    init_sign();
    init_values();
    names27 = ["Mollweide", "moll"];
    moll_default = {
      init: init26,
      forward: forward24,
      inverse: inverse24,
      names: names27
    };
  }
});

// node_modules/proj4/lib/common/imlfn.js
function imlfn_default(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;
  phi = ml / e0;
  for (var i2 = 0; i2 < 15; i2++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return NaN;
}
var init_imlfn = __esm({
  "node_modules/proj4/lib/common/imlfn.js"() {
  }
});

// node_modules/proj4/lib/projections/eqdc.js
function init27() {
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn_default(this.es);
  this.e1 = e1fn_default(this.es);
  this.e2 = e2fn_default(this.es);
  this.e3 = e3fn_default(this.es);
  this.sin_phi = Math.sin(this.lat1);
  this.cos_phi = Math.cos(this.lat1);
  this.ms1 = msfnz_default(this.e, this.sin_phi, this.cos_phi);
  this.ml1 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat1);
  if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
    this.ns = this.sin_phi;
  } else {
    this.sin_phi = Math.sin(this.lat2);
    this.cos_phi = Math.cos(this.lat2);
    this.ms2 = msfnz_default(this.e, this.sin_phi, this.cos_phi);
    this.ml2 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
}
function forward25(p) {
  var lon = p.x;
  var lat = p.y;
  var rh1;
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  } else {
    var ml = mlfn_default(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * adjust_lon_default(lon - this.long0, this.over);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p.x = x;
  p.y = y;
  return p;
}
function inverse25(p) {
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  if (this.sphere) {
    lon = adjust_lon_default(this.long0 + theta / this.ns, this.over);
    lat = adjust_lat_default(this.g - rh1 / this.a);
    p.x = lon;
    p.y = lat;
    return p;
  } else {
    var ml = this.g - rh1 / this.a;
    lat = imlfn_default(ml, this.e0, this.e1, this.e2, this.e3);
    lon = adjust_lon_default(this.long0 + theta / this.ns, this.over);
    p.x = lon;
    p.y = lat;
    return p;
  }
}
var names28, eqdc_default;
var init_eqdc = __esm({
  "node_modules/proj4/lib/projections/eqdc.js"() {
    init_e0fn();
    init_e1fn();
    init_e2fn();
    init_e3fn();
    init_msfnz();
    init_mlfn();
    init_adjust_lon();
    init_adjust_lat();
    init_imlfn();
    init_values();
    names28 = ["Equidistant_Conic", "eqdc"];
    eqdc_default = {
      init: init27,
      forward: forward25,
      inverse: inverse25,
      names: names28
    };
  }
});

// node_modules/proj4/lib/projections/vandg.js
function init28() {
  this.R = this.a;
}
function forward26(p) {
  var lon = p.x;
  var lat = p.y;
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  var x, y;
  if (Math.abs(lat) <= EPSLN) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
    p.x = x;
    p.y = y;
    return p;
  }
  var theta = asinz_default(2 * Math.abs(lat / Math.PI));
  if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    } else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
    p.x = x;
    p.y = y;
    return p;
  }
  var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);
  var g = costh / (sinth + costh - 1);
  var gsq = g * g;
  var m = g * (2 / sinth - 1);
  var msq = m * m;
  var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  var q = asq + g;
  con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
  if (lat >= 0) {
    y = this.y0 + con;
  } else {
    y = this.y0 - con;
  }
  p.x = x;
  p.y = y;
  return p;
}
function inverse26(p) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d;
  p.x -= this.x0;
  p.y -= this.y0;
  con = Math.PI * this.R;
  xx = p.x / con;
  yy = p.y / con;
  xys = xx * xx + yy * yy;
  if (xys > 1) {
    con = Math.sqrt(xys);
    xx /= con;
    yy /= con;
    xys = 1;
  }
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = 3 * d / a1 / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    } else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  } else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  if (Math.abs(xx) < EPSLN) {
    lon = this.long0;
  } else {
    lon = adjust_lon_default(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx, this.over);
  }
  p.x = lon;
  p.y = lat;
  return p;
}
var names29, vandg_default;
var init_vandg = __esm({
  "node_modules/proj4/lib/projections/vandg.js"() {
    init_adjust_lon();
    init_values();
    init_asinz();
    names29 = ["Van_der_Grinten_I", "VanDerGrinten", "Van_der_Grinten", "vandg"];
    vandg_default = {
      init: init28,
      forward: forward26,
      inverse: inverse26,
      names: names29
    };
  }
});

// node_modules/proj4/lib/common/vincenty.js
function vincentyInverse(lat1, lon1, lat2, lon2, a, f) {
  const L = lon2 - lon1;
  const U1 = Math.atan((1 - f) * Math.tan(lat1));
  const U2 = Math.atan((1 - f) * Math.tan(lat2));
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
  let lambda = L, lambdaP, iterLimit = 100;
  let sinLambda, cosLambda, sinSigma, cosSigma, sigma, sinAlpha, cos2Alpha, cos2SigmaM, C;
  let uSq, A5, B, deltaSigma, s;
  do {
    sinLambda = Math.sin(lambda);
    cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
    );
    if (sinSigma === 0) {
      return { azi1: 0, s12: 0 };
    }
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    cos2Alpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cos2Alpha !== 0 ? cosSigma - 2 * sinU1 * sinU2 / cos2Alpha : 0;
    C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
    lambdaP = lambda;
    lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
  if (iterLimit === 0) {
    return { azi1: NaN, s12: NaN };
  }
  uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
  A5 = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
  s = a * (1 - f) * A5 * (sigma - deltaSigma);
  const azi1 = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
  return { azi1, s12: s };
}
function vincentyDirect(lat1, lon1, azi1, s12, a, f) {
  const U1 = Math.atan((1 - f) * Math.tan(lat1));
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
  const sinAlpha1 = Math.sin(azi1), cosAlpha1 = Math.cos(azi1);
  const sigma1 = Math.atan2(sinU1, cosU1 * cosAlpha1);
  const sinAlpha = cosU1 * sinAlpha1;
  const cos2Alpha = 1 - sinAlpha * sinAlpha;
  const uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
  const A5 = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  let sigma = s12 / (a * (1 - f) * A5), sigmaP, iterLimit = 100;
  let cos2SigmaM, sinSigma, cosSigma, deltaSigma;
  do {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s12 / (a * (1 - f) * A5) + deltaSigma;
  } while (Math.abs(sigma - sigmaP) > 1e-12 && --iterLimit > 0);
  if (iterLimit === 0) {
    return { lat2: NaN, lon2: NaN };
  }
  const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  const lat2 = Math.atan2(
    sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
  );
  const lambda = Math.atan2(
    sinSigma * sinAlpha1,
    cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1
  );
  const C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
  const L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  const lon2 = lon1 + L;
  return { lat2, lon2 };
}
var init_vincenty = __esm({
  "node_modules/proj4/lib/common/vincenty.js"() {
  }
});

// node_modules/proj4/lib/projections/aeqd.js
function init29() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
  this.f = this.es / (1 + Math.sqrt(1 - this.es));
  this.guam = (this.guam === true || getNormalizedProjName(this.projName).toLowerCase() === "guam_projection") && this.es !== 0;
  if (this.guam) {
    this.en = pj_enfn_default(this.es);
    this.M1 = pj_mlfn_default(this.lat0, this.sin_p12, this.cos_p12, this.en);
  }
}
function forward27(p) {
  var lon = p.x;
  var lat = p.y;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var dlon = adjust_lon_default(lon - this.long0, this.over);
  var e0, e1, e2, e3, Mlp, Ml, c, kp, cos_c, vars, azi1, t;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
      p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
      p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
      return p;
    } else {
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c = Math.acos(cos_c);
      kp = c ? c / Math.sin(c) : 1;
      p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p;
    }
  } else if (this.guam) {
    t = 1 / Math.sqrt(1 - this.es * sinphi * sinphi);
    p.x = this.x0 + this.a * dlon * cosphi * t;
    p.y = this.y0 + this.a * (pj_mlfn_default(lat, sinphi, cosphi, this.en) - this.M1 + 0.5 * dlon * dlon * cosphi * sinphi * t);
    return p;
  } else {
    e0 = e0fn_default(this.es);
    e1 = e1fn_default(this.es);
    e2 = e2fn_default(this.es);
    e3 = e3fn_default(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p;
    } else {
      if (Math.abs(lon) < EPSLN && Math.abs(lat - this.lat0) < EPSLN) {
        p.x = this.x0;
        p.y = this.y0;
        return p;
      }
      vars = vincentyInverse(this.lat0, this.long0, lat, lon, this.a, this.f);
      azi1 = vars.azi1;
      p.x = this.x0 + vars.s12 * Math.sin(azi1);
      p.y = this.y0 + vars.s12 * Math.cos(azi1);
      return p;
    }
  }
}
function inverse27(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M2, azi1, s12, vars, x, x2, t, i2;
  if (this.sphere) {
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > 2 * HALF_PI * this.a) {
      return;
    }
    z = rh / this.a;
    sinz = Math.sin(z);
    cosz = Math.cos(z);
    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
    } else {
      lat = asinz_default(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh);
      con = Math.abs(this.lat0) - HALF_PI;
      if (Math.abs(con) <= EPSLN) {
        if (this.lat0 >= 0) {
          lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -p.y), this.over);
        } else {
          lon = adjust_lon_default(this.long0 - Math.atan2(-p.x, p.y), this.over);
        }
      } else {
        lon = adjust_lon_default(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz), this.over);
      }
    }
    p.x = lon;
    p.y = lat;
    return p;
  } else if (this.guam) {
    x = p.x / this.a;
    x2 = 0.5 * x * x;
    lat = this.lat0;
    for (i2 = 0; i2 < 3; ++i2) {
      t = this.e * Math.sin(lat);
      t = Math.sqrt(1 - t * t);
      lat = pj_inv_mlfn_default(this.M1 + p.y / this.a - x2 * Math.tan(lat) * t, this.es, this.en);
    }
    p.x = adjust_lon_default(this.long0 + x * t / Math.cos(lat), this.over);
    p.y = lat;
    return p;
  } else {
    e0 = e0fn_default(this.es);
    e1 = e1fn_default(this.es);
    e2 = e2fn_default(this.es);
    e3 = e3fn_default(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M2 = Mlp - rh;
      lat = imlfn_default(M2 / this.a, e0, e1, e2, e3);
      lon = adjust_lon_default(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
      p.x = lon;
      p.y = lat;
      return p;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M2 = rh - Mlp;
      lat = imlfn_default(M2 / this.a, e0, e1, e2, e3);
      lon = adjust_lon_default(this.long0 + Math.atan2(p.x, p.y), this.over);
      p.x = lon;
      p.y = lat;
      return p;
    } else {
      azi1 = Math.atan2(p.x, p.y);
      s12 = Math.sqrt(p.x * p.x + p.y * p.y);
      vars = vincentyDirect(this.lat0, this.long0, azi1, s12, this.a, this.f);
      p.x = vars.lon2;
      p.y = vars.lat2;
      return p;
    }
  }
}
var names30, aeqd_default;
var init_aeqd = __esm({
  "node_modules/proj4/lib/projections/aeqd.js"() {
    init_adjust_lon();
    init_values();
    init_mlfn();
    init_e0fn();
    init_e1fn();
    init_e2fn();
    init_e3fn();
    init_asinz();
    init_imlfn();
    init_vincenty();
    init_pj_enfn();
    init_pj_mlfn();
    init_pj_inv_mlfn();
    init_projections();
    names30 = ["Azimuthal_Equidistant", "Guam_Projection", "aeqd"];
    aeqd_default = {
      init: init29,
      forward: forward27,
      inverse: inverse27,
      names: names30
    };
  }
});

// node_modules/proj4/lib/projections/ortho.js
function init30() {
  var lat0 = this.lat0 || 0;
  this.sin_p14 = Math.sin(lat0);
  this.cos_p14 = Math.cos(lat0);
  this.sinalpha = Math.sin(this.alpha || 0);
  this.cosalpha = Math.cos(this.alpha || 0);
  if (Math.abs(Math.abs(lat0) - HALF_PI) <= EPSLN) {
    this.mode = lat0 < 0 ? S_POLE2 : N_POLE2;
  } else if (Math.abs(lat0) > EPSLN) {
    this.mode = OBLIQ2;
  } else {
    this.mode = EQUIT2;
  }
  this.nu0 = 1 / Math.sqrt(1 - this.es * this.sin_p14 * this.sin_p14);
  this.y_shift = this.es * this.nu0 * this.sin_p14 * this.cos_p14;
  this.y_scale = 1 / Math.sqrt(1 - this.es * this.cos_p14 * this.cos_p14);
}
function forward28(p) {
  var sinphi, cosphi;
  var dlon;
  var coslon;
  var g, x, y, xp, yp, nu, ak;
  var lon = p.x;
  var lat = p.y;
  dlon = adjust_lon_default(lon - (this.long0 || 0), this.over);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  if (g > 0 || Math.abs(g) <= EPSLN) {
    ak = this.a * this.k0;
    nu = 1 / Math.sqrt(1 - this.es * sinphi * sinphi);
    xp = ak * nu * cosphi * Math.sin(dlon);
    yp = ak * (nu * (sinphi * this.cos_p14 - cosphi * this.sin_p14 * coslon) + this.es * (this.nu0 * this.sin_p14 - nu * sinphi) * this.cos_p14);
    x = (this.x0 || 0) + this.cosalpha * xp - this.sinalpha * yp;
    y = (this.y0 || 0) + this.sinalpha * xp + this.cosalpha * yp;
  }
  p.x = x;
  p.y = y;
  return p;
}
function inverse28(p) {
  var rh;
  var z;
  var sinz, cosz;
  var con;
  var lon, lat;
  var long0, lat0;
  var xf, yf, yr, rh2, sinphi2, sinphi, cosphi, sinlam, coslam;
  var nu, rho, j11, j12, j21, j22, det, dx, dy, dphi, dlam, i2;
  xf = p.x - (this.x0 || 0);
  yf = p.y - (this.y0 || 0);
  p.x = (this.cosalpha * xf + this.sinalpha * yf) / this.k0;
  p.y = (-this.sinalpha * xf + this.cosalpha * yf) / this.k0;
  if (this.es !== 0) {
    xf = p.x / this.a;
    yf = p.y / this.a;
    if (this.mode === N_POLE2 || this.mode === S_POLE2) {
      rh2 = xf * xf + yf * yf;
      if (rh2 >= 1 - 1e-15) {
        if (rh2 - 1 > EPSLN) {
          return null;
        }
        lat = 0;
      } else {
        lat = Math.acos(Math.sqrt(rh2 * (1 - this.es) / (1 - this.es * rh2))) * (this.mode === N_POLE2 ? 1 : -1);
      }
      lon = Math.atan2(xf, yf * (this.mode === N_POLE2 ? -1 : 1));
    } else if (this.mode === EQUIT2) {
      yr = yf * this.a / this.b;
      if (xf * xf + yr * yr > 1 + 1e-11) {
        return null;
      }
      con = (1 - this.es) / yf;
      sinphi2 = yf === 0 ? 0 : 1 / (con * con + this.es);
      if (sinphi2 > 1 - 1e-11) {
        lat = HALF_PI * (yf > 0 ? 1 : -1);
        lon = 0;
      } else {
        lat = Math.asin(Math.sqrt(sinphi2)) * (yf > 0 ? 1 : -1);
        sinlam = xf * Math.sqrt((1 - this.es * sinphi2) / (1 - sinphi2));
        lon = Math.abs(sinlam) - 1 > -1e-15 ? HALF_PI * (xf > 0 ? 1 : -1) : Math.asin(sinlam);
      }
    } else {
      yr = (yf - this.y_shift) / this.y_scale;
      rh2 = xf * xf + yr * yr;
      if (rh2 > 1 + 1e-11) {
        return null;
      }
      rh = Math.sqrt(rh2);
      if (rh <= EPSLN) {
        lat = this.lat0;
        lon = 0;
      } else {
        sinz = Math.min(rh, 1);
        cosz = Math.sqrt(1 - sinz * sinz);
        sinphi = cosz * this.sin_p14 + yr * sinz * this.cos_p14 / rh;
        lat = asinz_default(sinphi);
        lon = Math.atan2(xf * sinz * this.cos_p14, (cosz - this.sin_p14 * sinphi) * rh);
      }
      for (i2 = 0; i2 < 20; i2++) {
        sinphi = Math.sin(lat);
        cosphi = Math.cos(lat);
        sinlam = Math.sin(lon);
        coslam = Math.cos(lon);
        con = 1 - this.es * sinphi * sinphi;
        nu = 1 / Math.sqrt(con);
        rho = (1 - this.es) * nu / con;
        j11 = -rho * sinphi * sinlam;
        j12 = nu * cosphi * coslam;
        j21 = rho * (cosphi * this.cos_p14 + sinphi * this.sin_p14 * coslam);
        j22 = nu * this.sin_p14 * cosphi * sinlam;
        det = j11 * j22 - j12 * j21;
        dx = xf - nu * cosphi * sinlam;
        dy = yf - (nu * (sinphi * this.cos_p14 - cosphi * this.sin_p14 * coslam) + this.es * (this.nu0 * this.sin_p14 - nu * sinphi) * this.cos_p14);
        if (Math.abs(dx) < 1e-15 && Math.abs(dy) < 1e-15) {
          break;
        }
        dphi = (j22 * dx - j12 * dy) / det;
        dlam = (-j21 * dx + j11 * dy) / det;
        lat += dphi;
        if (lat > HALF_PI) {
          lat = HALF_PI - (lat - HALF_PI);
          lon = adjust_lon_default(lon + Math.PI);
        } else if (lat < -HALF_PI) {
          lat = -HALF_PI + (-HALF_PI - lat);
          lon = adjust_lon_default(lon + Math.PI);
        }
        lon += dlam;
        if (Math.abs(dphi) < 1e-12 && Math.abs(dlam) < 1e-12) {
          break;
        }
      }
      if (i2 === 20) {
        return null;
      }
    }
    p.x = adjust_lon_default(lon + (this.long0 || 0), this.over);
    p.y = lat;
    return p;
  }
  rh = Math.sqrt(p.x * p.x + p.y * p.y);
  z = asinz_default(rh / this.a);
  sinz = Math.sin(z);
  cosz = Math.cos(z);
  long0 = this.long0 || 0;
  lat0 = this.lat0 || 0;
  lon = long0;
  if (Math.abs(rh) <= EPSLN) {
    lat = lat0;
    p.x = lon;
    p.y = lat;
    return p;
  }
  lat = asinz_default(cosz * this.sin_p14 + p.y * sinz * this.cos_p14 / rh);
  con = Math.abs(lat0) - HALF_PI;
  if (Math.abs(con) <= EPSLN) {
    if (lat0 >= 0) {
      lon = adjust_lon_default(long0 + Math.atan2(p.x, -p.y), this.over);
    } else {
      lon = adjust_lon_default(long0 - Math.atan2(-p.x, p.y), this.over);
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  lon = adjust_lon_default(long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz), this.over);
  p.x = lon;
  p.y = lat;
  return p;
}
var N_POLE2, S_POLE2, EQUIT2, OBLIQ2, names31, ortho_default;
var init_ortho = __esm({
  "node_modules/proj4/lib/projections/ortho.js"() {
    init_adjust_lon();
    init_asinz();
    init_values();
    N_POLE2 = 1;
    S_POLE2 = 2;
    EQUIT2 = 3;
    OBLIQ2 = 4;
    names31 = ["Orthographic", "Local_Orthographic", "ortho"];
    ortho_default = {
      init: init30,
      forward: forward28,
      inverse: inverse28,
      names: names31
    };
  }
});

// node_modules/proj4/lib/projections/qsc.js
function init31() {
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Quadrilateralized Spherical Cube";
  if (this.lat0 >= HALF_PI - FORTPI / 2) {
    this.face = FACE_ENUM.TOP;
  } else if (this.lat0 <= -(HALF_PI - FORTPI / 2)) {
    this.face = FACE_ENUM.BOTTOM;
  } else if (Math.abs(this.long0) <= FORTPI) {
    this.face = FACE_ENUM.FRONT;
  } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
    this.face = this.long0 > 0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
  } else {
    this.face = FACE_ENUM.BACK;
  }
  if (this.es !== 0) {
    this.one_minus_f = 1 - (this.a - this.b) / this.a;
    this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
  }
}
function forward29(p) {
  var xy = { x: 0, y: 0 };
  var lat, lon;
  var theta, phi;
  var t, mu;
  var area = { value: 0 };
  p.x -= this.long0;
  if (this.es !== 0) {
    lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
  } else {
    lat = p.y;
  }
  lon = p.x;
  if (this.face === FACE_ENUM.TOP) {
    phi = HALF_PI - lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = lon - HALF_PI;
    } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_1;
      theta = lon > 0 ? lon - SPI : lon + SPI;
    } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
      area.value = AREA_ENUM.AREA_2;
      theta = lon + HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = HALF_PI + lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = -lon + HALF_PI;
    } else if (lon < FORTPI && lon >= -FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta = -lon;
    } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = -lon - HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon > 0 ? -lon + SPI : -lon - SPI;
    }
  } else {
    var q, r, s;
    var sinlat, coslat;
    var sinlon, coslon;
    if (this.face === FACE_ENUM.RIGHT) {
      lon = qsc_shift_lon_origin(lon, +HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lon = qsc_shift_lon_origin(lon, +SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lon = qsc_shift_lon_origin(lon, -HALF_PI);
    }
    sinlat = Math.sin(lat);
    coslat = Math.cos(lat);
    sinlon = Math.sin(lon);
    coslon = Math.cos(lon);
    q = coslat * coslon;
    r = coslat * sinlon;
    s = sinlat;
    if (this.face === FACE_ENUM.FRONT) {
      phi = Math.acos(q);
      theta = qsc_fwd_equat_face_theta(phi, s, r, area);
    } else if (this.face === FACE_ENUM.RIGHT) {
      phi = Math.acos(r);
      theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
    } else if (this.face === FACE_ENUM.BACK) {
      phi = Math.acos(-q);
      theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
    } else if (this.face === FACE_ENUM.LEFT) {
      phi = Math.acos(-r);
      theta = qsc_fwd_equat_face_theta(phi, s, q, area);
    } else {
      phi = theta = 0;
      area.value = AREA_ENUM.AREA_0;
    }
  }
  mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
  t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));
  if (area.value === AREA_ENUM.AREA_1) {
    mu += HALF_PI;
  } else if (area.value === AREA_ENUM.AREA_2) {
    mu += SPI;
  } else if (area.value === AREA_ENUM.AREA_3) {
    mu += 1.5 * SPI;
  }
  xy.x = t * Math.cos(mu);
  xy.y = t * Math.sin(mu);
  xy.x = xy.x * this.a + this.x0;
  xy.y = xy.y * this.a + this.y0;
  p.x = xy.x;
  p.y = xy.y;
  return p;
}
function inverse29(p) {
  var lp = { lam: 0, phi: 0 };
  var mu, nu, cosmu, tannu;
  var tantheta, theta, cosphi, phi;
  var t;
  var area = { value: 0 };
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
  mu = Math.atan2(p.y, p.x);
  if (p.x >= 0 && p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_0;
  } else if (p.y >= 0 && p.y >= Math.abs(p.x)) {
    area.value = AREA_ENUM.AREA_1;
    mu -= HALF_PI;
  } else if (p.x < 0 && -p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_2;
    mu = mu < 0 ? mu + SPI : mu - SPI;
  } else {
    area.value = AREA_ENUM.AREA_3;
    mu += HALF_PI;
  }
  t = SPI / 12 * Math.tan(mu);
  tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
  theta = Math.atan(tantheta);
  cosmu = Math.cos(mu);
  tannu = Math.tan(nu);
  cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
  if (cosphi < -1) {
    cosphi = -1;
  } else if (cosphi > 1) {
    cosphi = 1;
  }
  if (this.face === FACE_ENUM.TOP) {
    phi = Math.acos(cosphi);
    lp.phi = HALF_PI - phi;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = theta < 0 ? theta + SPI : theta - SPI;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = theta - HALF_PI;
    } else {
      lp.lam = theta;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = Math.acos(cosphi);
    lp.phi = phi - HALF_PI;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = -theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = -theta;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = -theta - HALF_PI;
    } else {
      lp.lam = theta < 0 ? -theta - SPI : -theta + SPI;
    }
  } else {
    var q, r, s;
    q = cosphi;
    t = q * q;
    if (t >= 1) {
      s = 0;
    } else {
      s = Math.sqrt(1 - t) * Math.sin(theta);
    }
    t += s * s;
    if (t >= 1) {
      r = 0;
    } else {
      r = Math.sqrt(1 - t);
    }
    if (area.value === AREA_ENUM.AREA_1) {
      t = r;
      r = -s;
      s = t;
    } else if (area.value === AREA_ENUM.AREA_2) {
      r = -r;
      s = -s;
    } else if (area.value === AREA_ENUM.AREA_3) {
      t = r;
      r = s;
      s = -t;
    }
    if (this.face === FACE_ENUM.RIGHT) {
      t = q;
      q = -r;
      r = t;
    } else if (this.face === FACE_ENUM.BACK) {
      q = -q;
      r = -r;
    } else if (this.face === FACE_ENUM.LEFT) {
      t = q;
      q = r;
      r = -t;
    }
    lp.phi = Math.acos(-s) - HALF_PI;
    lp.lam = Math.atan2(r, q);
    if (this.face === FACE_ENUM.RIGHT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
    }
  }
  if (this.es !== 0) {
    var invert_sign;
    var tanphi, xa;
    invert_sign = lp.phi < 0 ? 1 : 0;
    tanphi = Math.tan(lp.phi);
    xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
    lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
    if (invert_sign) {
      lp.phi = -lp.phi;
    }
  }
  lp.lam += this.long0;
  p.x = lp.lam;
  p.y = lp.phi;
  return p;
}
function qsc_fwd_equat_face_theta(phi, y, x, area) {
  var theta;
  if (phi < EPSLN) {
    area.value = AREA_ENUM.AREA_0;
    theta = 0;
  } else {
    theta = Math.atan2(y, x);
    if (Math.abs(theta) <= FORTPI) {
      area.value = AREA_ENUM.AREA_0;
    } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta -= HALF_PI;
    } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = theta >= 0 ? theta - SPI : theta + SPI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta += HALF_PI;
    }
  }
  return theta;
}
function qsc_shift_lon_origin(lon, offset) {
  var slon = lon + offset;
  if (slon < -SPI) {
    slon += TWO_PI;
  } else if (slon > +SPI) {
    slon -= TWO_PI;
  }
  return slon;
}
var FACE_ENUM, AREA_ENUM, names32, qsc_default;
var init_qsc = __esm({
  "node_modules/proj4/lib/projections/qsc.js"() {
    init_values();
    FACE_ENUM = {
      FRONT: 1,
      RIGHT: 2,
      BACK: 3,
      LEFT: 4,
      TOP: 5,
      BOTTOM: 6
    };
    AREA_ENUM = {
      AREA_0: 1,
      AREA_1: 2,
      AREA_2: 3,
      AREA_3: 4
    };
    names32 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
    qsc_default = {
      init: init31,
      forward: forward29,
      inverse: inverse29,
      names: names32
    };
  }
});

// node_modules/proj4/lib/projections/robin.js
function newton_rapshon(f_df, start2, max_err, iters) {
  var x = start2;
  for (; iters; --iters) {
    var upd = f_df(x);
    x -= upd;
    if (Math.abs(upd) < max_err) {
      break;
    }
  }
  return x;
}
function init32() {
  this.es = 0;
  this.title = this.title || "Robinson";
}
function forward30(ll) {
  var lon = adjust_lon_default(ll.x - this.long0, this.over);
  var dphi = Math.abs(ll.y);
  var i2 = Math.floor(dphi * C12);
  if (i2 < 0) {
    i2 = 0;
  } else if (i2 >= NODES) {
    i2 = NODES - 1;
  }
  dphi = R2D * (dphi - RC1 * i2);
  var xy = {
    x: poly3_val(COEFS_X[i2], dphi) * lon,
    y: poly3_val(COEFS_Y[i2], dphi)
  };
  if (ll.y < 0) {
    xy.y = -xy.y;
  }
  xy.x = xy.x * this.a * FXC + this.x0;
  xy.y = xy.y * this.a * FYC + this.y0;
  if (ll.z !== void 0) {
    xy.z = ll.z;
  }
  if (ll.m !== void 0) {
    xy.m = ll.m;
  }
  return xy;
}
function inverse30(xy) {
  var ll = {
    x: (xy.x - this.x0) / (this.a * FXC),
    y: Math.abs(xy.y - this.y0) / (this.a * FYC)
  };
  if (ll.y >= 1) {
    ll.x /= COEFS_X[NODES][0];
    ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
  } else {
    var i2 = Math.floor(ll.y * NODES);
    if (i2 < 0) {
      i2 = 0;
    } else if (i2 >= NODES) {
      i2 = NODES - 1;
    }
    for (; ; ) {
      if (COEFS_Y[i2][0] > ll.y) {
        --i2;
      } else if (COEFS_Y[i2 + 1][0] <= ll.y) {
        ++i2;
      } else {
        break;
      }
    }
    var coefs = COEFS_Y[i2];
    var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i2 + 1][0] - coefs[0]);
    t = newton_rapshon(function(x) {
      return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
    }, t, EPSLN, 100);
    ll.x /= poly3_val(COEFS_X[i2], t);
    ll.y = (5 * i2 + t) * D2R;
    if (xy.y < 0) {
      ll.y = -ll.y;
    }
  }
  if (!this.over && Math.abs(ll.x) > Math.PI) {
    ll.x = sign_default(ll.x) * Math.PI;
  }
  ll.x = adjust_lon_default(ll.x + this.long0, this.over);
  if (xy.z !== void 0) {
    ll.z = xy.z;
  }
  if (xy.m !== void 0) {
    ll.m = xy.m;
  }
  return ll;
}
var COEFS_X, COEFS_Y, FXC, FYC, C12, RC1, NODES, poly3_val, poly3_der, names33, robin_default;
var init_robin = __esm({
  "node_modules/proj4/lib/projections/robin.js"() {
    init_values();
    init_adjust_lon();
    init_sign();
    COEFS_X = [
      [1, 22199e-21, -715515e-10, 31103e-10],
      [0.9986, -482243e-9, -24897e-9, -13309e-10],
      [0.9954, -83103e-8, -448605e-10, -986701e-12],
      [0.99, -135364e-8, -59661e-9, 36777e-10],
      [0.9822, -167442e-8, -449547e-11, -572411e-11],
      [0.973, -214868e-8, -903571e-10, 18736e-12],
      [0.96, -305085e-8, -900761e-10, 164917e-11],
      [0.9427, -382792e-8, -653386e-10, -26154e-10],
      [0.9216, -467746e-8, -10457e-8, 481243e-11],
      [0.8962, -536223e-8, -323831e-10, -543432e-11],
      [0.8679, -609363e-8, -113898e-9, 332484e-11],
      [0.835, -698325e-8, -640253e-10, 934959e-12],
      [0.7986, -755338e-8, -500009e-10, 935324e-12],
      [0.7597, -798324e-8, -35971e-9, -227626e-11],
      [0.7186, -851367e-8, -701149e-10, -86303e-10],
      [0.6732, -986209e-8, -199569e-9, 191974e-10],
      [0.6213, -0.010418, 883923e-10, 624051e-11],
      [0.5722, -906601e-8, 182e-6, 624051e-11],
      [0.5322, -677797e-8, 275608e-9, 624051e-11]
    ];
    COEFS_Y = [
      [-520417e-23, 0.0124, 121431e-23, -845284e-16],
      [0.062, 0.0124, -126793e-14, 422642e-15],
      [0.124, 0.0124, 507171e-14, -160604e-14],
      [0.186, 0.0123999, -190189e-13, 600152e-14],
      [0.248, 0.0124002, 710039e-13, -224e-10],
      [0.31, 0.0123992, -264997e-12, 835986e-13],
      [0.372, 0.0124029, 988983e-12, -311994e-12],
      [0.434, 0.0123893, -369093e-11, -435621e-12],
      [0.4958, 0.0123198, -102252e-10, -345523e-12],
      [0.5571, 0.0121916, -154081e-10, -582288e-12],
      [0.6176, 0.0119938, -241424e-10, -525327e-12],
      [0.6769, 0.011713, -320223e-10, -516405e-12],
      [0.7346, 0.0113541, -397684e-10, -609052e-12],
      [0.7903, 0.0109107, -489042e-10, -104739e-11],
      [0.8435, 0.0103431, -64615e-9, -140374e-14],
      [0.8936, 969686e-8, -64636e-9, -8547e-9],
      [0.9394, 840947e-8, -192841e-9, -42106e-10],
      [0.9761, 616527e-8, -256e-6, -42106e-10],
      [1, 328947e-8, -319159e-9, -42106e-10]
    ];
    FXC = 0.8487;
    FYC = 1.3523;
    C12 = R2D / 5;
    RC1 = 1 / C12;
    NODES = 18;
    poly3_val = function(coefs, x) {
      return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
    };
    poly3_der = function(coefs, x) {
      return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
    };
    names33 = ["Robinson", "robin"];
    robin_default = {
      init: init32,
      forward: forward30,
      inverse: inverse30,
      names: names33
    };
  }
});

// node_modules/proj4/lib/projections/geocent.js
function init33() {
  this.name = "geocent";
}
function forward31(p) {
  var point = geodeticToGeocentric(p, this.es, this.a);
  return point;
}
function inverse31(p) {
  var point = geocentricToGeodetic(p, this.es, this.a, this.b);
  return point;
}
var names34, geocent_default;
var init_geocent = __esm({
  "node_modules/proj4/lib/projections/geocent.js"() {
    init_datumUtils();
    names34 = ["Geocentric", "geocentric", "geocent", "Geocent"];
    geocent_default = {
      init: init33,
      forward: forward31,
      inverse: inverse31,
      names: names34
    };
  }
});

// node_modules/proj4/lib/projections/tpers.js
function init34() {
  Object.keys(params).forEach(function(p) {
    if (typeof this[p] === "undefined") {
      this[p] = params[p].def;
    } else if (params[p].num && isNaN(this[p])) {
      throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
    } else if (params[p].num) {
      this[p] = parseFloat(this[p]);
    }
    if (params[p].degrees) {
      this[p] = this[p] * D2R;
    }
  }.bind(this));
  if (Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
  } else if (Math.abs(this.lat0) < EPSLN) {
    this.mode = mode.EQUIT;
  } else {
    this.mode = mode.OBLIQ;
    this.sinph0 = Math.sin(this.lat0);
    this.cosph0 = Math.cos(this.lat0);
  }
  this.pn1 = this.h / this.a;
  if (this.pn1 <= 0 || this.pn1 > 1e10) {
    throw new Error("Invalid height");
  }
  this.p = 1 + this.pn1;
  this.rp = 1 / this.p;
  this.h1 = 1 / this.pn1;
  this.pfact = (this.p + 1) * this.h1;
  this.es = 0;
  var omega = this.tilt;
  var gamma = this.azi;
  this.cg = Math.cos(gamma);
  this.sg = Math.sin(gamma);
  this.cw = Math.cos(omega);
  this.sw = Math.sin(omega);
}
function forward32(p) {
  p.x -= this.long0;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var coslam = Math.cos(p.x);
  var x, y;
  switch (this.mode) {
    case mode.OBLIQ:
      y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y = cosphi * coslam;
      break;
    case mode.S_POLE:
      y = -sinphi;
      break;
    case mode.N_POLE:
      y = sinphi;
      break;
  }
  y = this.pn1 / (this.p - y);
  x = y * cosphi * Math.sin(p.x);
  switch (this.mode) {
    case mode.OBLIQ:
      y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y *= sinphi;
      break;
    case mode.N_POLE:
      y *= -(cosphi * coslam);
      break;
    case mode.S_POLE:
      y *= cosphi * coslam;
      break;
  }
  var yt, ba;
  yt = y * this.cg + x * this.sg;
  ba = 1 / (yt * this.sw * this.h1 + this.cw);
  x = (x * this.cg - y * this.sg) * this.cw * ba;
  y = yt * ba;
  p.x = x * this.a;
  p.y = y * this.a;
  return p;
}
function inverse32(p) {
  p.x /= this.a;
  p.y /= this.a;
  var r = { x: p.x, y: p.y };
  var bm, bq, yt;
  yt = 1 / (this.pn1 - p.y * this.sw);
  bm = this.pn1 * p.x * yt;
  bq = this.pn1 * p.y * this.cw * yt;
  p.x = bm * this.cg + bq * this.sg;
  p.y = bq * this.cg - bm * this.sg;
  var rh = hypot_default(p.x, p.y);
  if (Math.abs(rh) < EPSLN) {
    r.x = 0;
    r.y = p.y;
  } else {
    var cosz, sinz;
    sinz = 1 - rh * rh * this.pfact;
    sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
    cosz = Math.sqrt(1 - sinz * sinz);
    switch (this.mode) {
      case mode.OBLIQ:
        r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
        p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
        p.x *= sinz * this.cosph0;
        break;
      case mode.EQUIT:
        r.y = Math.asin(p.y * sinz / rh);
        p.y = cosz * rh;
        p.x *= sinz;
        break;
      case mode.N_POLE:
        r.y = Math.asin(cosz);
        p.y = -p.y;
        break;
      case mode.S_POLE:
        r.y = -Math.asin(cosz);
        break;
    }
    r.x = Math.atan2(p.x, p.y);
  }
  p.x = r.x + this.long0;
  p.y = r.y;
  return p;
}
var mode, params, names35, tpers_default;
var init_tpers = __esm({
  "node_modules/proj4/lib/projections/tpers.js"() {
    init_values();
    init_hypot();
    mode = {
      N_POLE: 0,
      S_POLE: 1,
      EQUIT: 2,
      OBLIQ: 3
    };
    params = {
      h: { def: 1e5, num: true },
      // default is Karman line, no default in PROJ.7
      azi: { def: 0, num: true, degrees: true },
      // default is North
      tilt: { def: 0, num: true, degrees: true },
      // default is Nadir
      long0: { def: 0, num: true },
      // default is Greenwich, conversion to rad is automatic
      lat0: { def: 0, num: true }
      // default is Equator, conversion to rad is automatic
    };
    names35 = ["Tilted_Perspective", "tpers"];
    tpers_default = {
      init: init34,
      forward: forward32,
      inverse: inverse32,
      names: names35
    };
  }
});

// node_modules/proj4/lib/projections/geos.js
function init35() {
  this.flip_axis = this.sweep === "x" ? 1 : 0;
  this.h = Number(this.h);
  this.radius_g_1 = this.h / this.a;
  if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
    throw new Error();
  }
  this.radius_g = 1 + this.radius_g_1;
  this.C = this.radius_g * this.radius_g - 1;
  if (this.es !== 0) {
    var one_es = 1 - this.es;
    var rone_es = 1 / one_es;
    this.radius_p = Math.sqrt(one_es);
    this.radius_p2 = one_es;
    this.radius_p_inv2 = rone_es;
    this.shape = "ellipse";
  } else {
    this.radius_p = 1;
    this.radius_p2 = 1;
    this.radius_p_inv2 = 1;
    this.shape = "sphere";
  }
  if (!this.title) {
    this.title = "Geostationary Satellite View";
  }
}
function forward33(p) {
  var lon = p.x;
  var lat = p.y;
  var tmp, v_x, v_y, v_z;
  lon = lon - this.long0;
  if (this.shape === "ellipse") {
    lat = Math.atan(this.radius_p2 * Math.tan(lat));
    var r = this.radius_p / hypot_default(this.radius_p * Math.cos(lat), Math.sin(lat));
    v_x = r * Math.cos(lon) * Math.cos(lat);
    v_y = r * Math.sin(lon) * Math.cos(lat);
    v_z = r * Math.sin(lat);
    if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
      p.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
    }
  } else if (this.shape === "sphere") {
    tmp = Math.cos(lat);
    v_x = Math.cos(lon) * tmp;
    v_y = Math.sin(lon) * tmp;
    v_z = Math.sin(lat);
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
      p.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
    }
  }
  p.x = p.x * this.a;
  p.y = p.y * this.a;
  return p;
}
function inverse33(p) {
  var v_x = -1;
  var v_y = 0;
  var v_z = 0;
  var a, b, det, k;
  p.x = p.x / this.a;
  p.y = p.y / this.a;
  if (this.shape === "ellipse") {
    if (this.flip_axis) {
      v_z = Math.tan(p.y / this.radius_g_1);
      v_y = Math.tan(p.x / this.radius_g_1) * hypot_default(1, v_z);
    } else {
      v_y = Math.tan(p.x / this.radius_g_1);
      v_z = Math.tan(p.y / this.radius_g_1) * hypot_default(1, v_y);
    }
    var v_zp = v_z / this.radius_p;
    a = v_y * v_y + v_zp * v_zp + v_x * v_x;
    b = 2 * this.radius_g * v_x;
    det = b * b - 4 * a * this.C;
    if (det < 0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    k = (-b - Math.sqrt(det)) / (2 * a);
    v_x = this.radius_g + k * v_x;
    v_y *= k;
    v_z *= k;
    p.x = Math.atan2(v_y, v_x);
    p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
    p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
  } else if (this.shape === "sphere") {
    if (this.flip_axis) {
      v_z = Math.tan(p.y / this.radius_g_1);
      v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1 + v_z * v_z);
    } else {
      v_y = Math.tan(p.x / this.radius_g_1);
      v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1 + v_y * v_y);
    }
    a = v_y * v_y + v_z * v_z + v_x * v_x;
    b = 2 * this.radius_g * v_x;
    det = b * b - 4 * a * this.C;
    if (det < 0) {
      p.x = Number.NaN;
      p.y = Number.NaN;
      return p;
    }
    k = (-b - Math.sqrt(det)) / (2 * a);
    v_x = this.radius_g + k * v_x;
    v_y *= k;
    v_z *= k;
    p.x = Math.atan2(v_y, v_x);
    p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
  }
  p.x = p.x + this.long0;
  return p;
}
var names36, geos_default;
var init_geos = __esm({
  "node_modules/proj4/lib/projections/geos.js"() {
    init_hypot();
    names36 = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
    geos_default = {
      init: init35,
      forward: forward33,
      inverse: inverse33,
      names: names36
    };
  }
});

// node_modules/proj4/lib/projections/eqearth.js
function init36() {
  if (this.es !== 0) {
    this.apa = authset(this.es);
    this.qp = qsfnz_default(this.e, 1);
    this.rqda = Math.sqrt(0.5 * this.qp);
  }
}
function forward34(p) {
  var lam = adjust_lon_default(p.x - this.long0, this.over);
  var phi = p.y;
  var sinphi = Math.sin(phi);
  if (this.es !== 0) {
    sinphi = qsfnz_default(this.e, sinphi) / this.qp;
  }
  var paramLat = Math.asin(M * sinphi), paramLatSq = paramLat * paramLat, paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p.x = lam * Math.cos(paramLat) / (M * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
  p.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
  if (this.es !== 0) {
    p.x *= this.rqda;
    p.y *= this.rqda;
  }
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}
function inverse34(p) {
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;
  if (this.es !== 0) {
    p.x /= this.rqda;
    p.y /= this.rqda;
  }
  var EPS2 = 1e-9, NITER = 12, paramLat = p.y, paramLatSq, paramLatPow6, fy, fpy, dlat, i2;
  for (i2 = 0; i2 < NITER; ++i2) {
    paramLatSq = paramLat * paramLat;
    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
    fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p.y;
    fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
    paramLat -= dlat = fy / fpy;
    if (Math.abs(dlat) < EPS2) {
      break;
    }
  }
  if (Math.abs(paramLat) > Math.PI / 3) {
    paramLat = sign_default(paramLat) * Math.PI / 3;
  }
  paramLatSq = paramLat * paramLat;
  paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p.x = M * p.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
  if (!this.over && Math.abs(p.x) > Math.PI) {
    p.x = sign_default(p.x) * Math.PI;
  }
  p.y = Math.asin(Math.sin(paramLat) / M);
  if (this.es !== 0) {
    p.y = authlat(p.y, this.apa);
  }
  p.x = adjust_lon_default(p.x + this.long0, this.over);
  return p;
}
var A1, A2, A3, A4, M, names37, eqearth_default;
var init_eqearth = __esm({
  "node_modules/proj4/lib/projections/eqearth.js"() {
    init_adjust_lon();
    init_sign();
    init_qsfnz();
    init_authset();
    init_authlat();
    A1 = 1.340264;
    A2 = -0.081106;
    A3 = 893e-6;
    A4 = 3796e-6;
    M = Math.sqrt(3) / 2;
    names37 = ["eqearth", "Equal Earth", "Equal_Earth"];
    eqearth_default = {
      init: init36,
      forward: forward34,
      inverse: inverse34,
      names: names37
    };
  }
});

// node_modules/proj4/lib/projections/bonne.js
function init37() {
  var c;
  this.phi1 = this.lat1;
  if (Math.abs(this.phi1) < EPS10) {
    throw new Error();
  }
  if (this.es) {
    this.en = pj_enfn_default(this.es);
    this.m1 = pj_mlfn_default(
      this.phi1,
      this.am1 = Math.sin(this.phi1),
      c = Math.cos(this.phi1),
      this.en
    );
    this.am1 = c / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1);
    this.inverse = e_inv;
    this.forward = e_fwd2;
  } else {
    if (Math.abs(this.phi1) + EPS10 >= HALF_PI) {
      this.cphi1 = 0;
    } else {
      this.cphi1 = 1 / Math.tan(this.phi1);
    }
    this.inverse = s_inv;
    this.forward = s_fwd;
  }
}
function e_fwd2(p) {
  var lam = adjust_lon_default(p.x - (this.long0 || 0), this.over);
  var phi = p.y;
  var rh, E, c;
  rh = this.am1 + this.m1 - pj_mlfn_default(phi, E = Math.sin(phi), c = Math.cos(phi), this.en);
  E = c * lam / (rh * Math.sqrt(1 - this.es * E * E));
  p.x = rh * Math.sin(E);
  p.y = this.am1 - rh * Math.cos(E);
  p.x = this.a * p.x + (this.x0 || 0);
  p.y = this.a * p.y + (this.y0 || 0);
  return p;
}
function e_inv(p) {
  p.x = (p.x - (this.x0 || 0)) / this.a;
  p.y = (p.y - (this.y0 || 0)) / this.a;
  var s, rh, lam, phi;
  rh = hypot_default(p.x, p.y = this.am1 - p.y);
  phi = pj_inv_mlfn_default(this.am1 + this.m1 - rh, this.es, this.en);
  if ((s = Math.abs(phi)) < HALF_PI) {
    s = Math.sin(phi);
    lam = rh * Math.atan2(p.x, p.y) * Math.sqrt(1 - this.es * s * s) / Math.cos(phi);
  } else if (Math.abs(s - HALF_PI) <= EPS10) {
    lam = 0;
  } else {
    throw new Error();
  }
  p.x = adjust_lon_default(lam + (this.long0 || 0), this.over);
  p.y = adjust_lat_default(phi);
  return p;
}
function s_fwd(p) {
  var lam = adjust_lon_default(p.x - (this.long0 || 0), this.over);
  var phi = p.y;
  var E, rh;
  rh = this.cphi1 + this.phi1 - phi;
  if (Math.abs(rh) > EPS10) {
    p.x = rh * Math.sin(E = lam * Math.cos(phi) / rh);
    p.y = this.cphi1 - rh * Math.cos(E);
  } else {
    p.x = p.y = 0;
  }
  p.x = this.a * p.x + (this.x0 || 0);
  p.y = this.a * p.y + (this.y0 || 0);
  return p;
}
function s_inv(p) {
  p.x = (p.x - (this.x0 || 0)) / this.a;
  p.y = (p.y - (this.y0 || 0)) / this.a;
  var lam, phi;
  var rh = hypot_default(p.x, p.y = this.cphi1 - p.y);
  phi = this.cphi1 + this.phi1 - rh;
  if (Math.abs(phi) > HALF_PI) {
    throw new Error();
  }
  if (Math.abs(Math.abs(phi) - HALF_PI) <= EPS10) {
    lam = 0;
  } else {
    lam = rh * Math.atan2(p.x, p.y) / Math.cos(phi);
  }
  p.x = adjust_lon_default(lam + (this.long0 || 0), this.over);
  p.y = adjust_lat_default(phi);
  return p;
}
var EPS10, names38, bonne_default;
var init_bonne = __esm({
  "node_modules/proj4/lib/projections/bonne.js"() {
    init_adjust_lat();
    init_adjust_lon();
    init_hypot();
    init_pj_enfn();
    init_pj_inv_mlfn();
    init_pj_mlfn();
    init_values();
    EPS10 = 1e-10;
    names38 = ["bonne", "Bonne (Werner lat_1=90)"];
    bonne_default = {
      init: init37,
      names: names38
    };
  }
});

// node_modules/proj4/lib/projections/ob_tran.js
function init38() {
  this.title = this.title || "General Oblique Transformation";
  this.isIdentity = names2.includes(this.o_proj);
  if (!this.o_proj) {
    throw new Error("Missing parameter: o_proj");
  }
  if (this.o_proj === `ob_tran`) {
    throw new Error("Invalid value for o_proj: " + this.o_proj);
  }
  const newProjStr = this.projStr.replace("+proj=ob_tran", "").replace("+o_proj=", "+proj=").trim();
  const oProj = Proj_default(newProjStr);
  if (!oProj) {
    throw new Error("Invalid parameter: o_proj. Unknown projection " + this.o_proj);
  }
  oProj.long0 = 0;
  this.obliqueProjection = oProj;
  let matchedSet;
  const paramSetsKeys = Object.keys(paramSets);
  const parseParam = (name) => {
    if (typeof this[name] === `undefined`) {
      return void 0;
    }
    const val = parseFloat(this[name]) * D2R;
    if (isNaN(val)) {
      throw new Error("Invalid value for " + name + ": " + this[name]);
    }
    return val;
  };
  for (let i2 = 0; i2 < paramSetsKeys.length; i2++) {
    const setKey = paramSetsKeys[i2];
    const set = paramSets[setKey];
    const params2 = Object.entries(set);
    const setHasParams = params2.some(
      ([p]) => typeof this[p] !== "undefined"
    );
    if (!setHasParams) {
      continue;
    }
    matchedSet = set;
    for (let ii = 0; ii < params2.length; ii++) {
      const [inputParam, param] = params2[ii];
      const val = parseParam(inputParam);
      if (typeof val === "undefined") {
        throw new Error("Missing parameter: " + inputParam + ".");
      }
      this[param] = val;
    }
    break;
  }
  if (!matchedSet) {
    throw new Error("No valid parameters provided for ob_tran projection.");
  }
  const { lamp, phip } = createRotation(this, matchedSet);
  this.lamp = lamp;
  if (Math.abs(phip) > EPSLN) {
    this.cphip = Math.cos(phip);
    this.sphip = Math.sin(phip);
    this.projectionType = projectionType.OBLIQUE;
  } else {
    this.projectionType = projectionType.TRANSVERSE;
  }
}
function forward35(p) {
  return this.projectionType.forward(this, p);
}
function inverse35(p) {
  return this.projectionType.inverse(this, p);
}
function createRotation(params2, how) {
  let phip, lamp;
  if (how === paramSets.ROTATE) {
    let lamc = params2.oLongC;
    let phic = params2.oLatC;
    let alpha = params2.oAlpha;
    if (Math.abs(Math.abs(phic) - HALF_PI) <= EPSLN) {
      throw new Error("Invalid value for o_lat_c: " + params2.o_lat_c + " should be < 90\xB0");
    }
    lamp = lamc + Math.atan2(-1 * Math.cos(alpha), -1 * Math.sin(alpha) * Math.sin(phic));
    phip = Math.asin(Math.cos(phic) * Math.sin(alpha));
  } else if (how === paramSets.NEW_POLE) {
    lamp = params2.oLongP;
    phip = params2.oLatP;
  } else {
    let lam1 = params2.oLong1;
    let phi1 = params2.oLat1;
    let lam2 = params2.oLong2;
    let phi2 = params2.oLat2;
    let con = Math.abs(phi1);
    if (Math.abs(phi1) > HALF_PI - EPSLN) {
      throw new Error("Invalid value for o_lat_1: " + params2.o_lat_1 + " should be < 90\xB0");
    }
    if (Math.abs(phi2) > HALF_PI - EPSLN) {
      throw new Error("Invalid value for o_lat_2: " + params2.o_lat_2 + " should be < 90\xB0");
    }
    if (Math.abs(phi1 - phi2) < EPSLN) {
      throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");
    }
    if (con < EPSLN) {
      throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");
    }
    lamp = Math.atan2(
      Math.cos(phi1) * Math.sin(phi2) * Math.cos(lam1) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2),
      Math.sin(phi1) * Math.cos(phi2) * Math.sin(lam2) - Math.cos(phi1) * Math.sin(phi2) * Math.sin(lam1)
    );
    phip = Math.atan(-1 * Math.cos(lamp - lam1) / Math.tan(phi1));
  }
  return { lamp, phip };
}
function forwardOblique(self, lp) {
  let { x: lam, y: phi } = lp;
  lam = adjust_lon_default(lam - self.long0, self.over);
  const coslam = Math.cos(lam);
  const sinphi = Math.sin(phi);
  const cosphi = Math.cos(phi);
  lp.x = adjust_lon_default(
    Math.atan2(
      cosphi * Math.sin(lam),
      self.sphip * cosphi * coslam + self.cphip * sinphi
    ) + self.lamp
  );
  lp.y = Math.asin(
    self.sphip * sinphi - self.cphip * cosphi * coslam
  );
  const result = self.obliqueProjection.forward(lp);
  if (self.isIdentity) {
    result.x *= R2D;
    result.y *= R2D;
  }
  return result;
}
function forwardTransverse(self, lp) {
  let { x: lam, y: phi } = lp;
  lam = adjust_lon_default(lam - self.long0, self.over);
  const cosphi = Math.cos(phi);
  const coslam = Math.cos(lam);
  lp.x = adjust_lon_default(
    Math.atan2(
      cosphi * Math.sin(lam),
      Math.sin(phi)
    ) + self.lamp
  );
  lp.y = Math.asin(-1 * cosphi * coslam);
  const result = self.obliqueProjection.forward(lp);
  if (self.isIdentity) {
    result.x *= R2D;
    result.y *= R2D;
  }
  return result;
}
function inverseOblique(self, lp) {
  if (self.isIdentity) {
    lp.x *= D2R;
    lp.y *= D2R;
  }
  const innerLp = self.obliqueProjection.inverse(lp);
  if (!innerLp) {
    return null;
  }
  let { x: lam, y: phi } = innerLp;
  if (lam < Number.MAX_VALUE) {
    lam -= self.lamp;
    const coslam = Math.cos(lam);
    const sinphi = Math.sin(phi);
    const cosphi = Math.cos(phi);
    lp.x = Math.atan2(
      cosphi * Math.sin(lam),
      self.sphip * cosphi * coslam - self.cphip * sinphi
    );
    lp.y = Math.asin(
      self.sphip * sinphi + self.cphip * cosphi * coslam
    );
  }
  lp.x = adjust_lon_default(lp.x + self.long0);
  return lp;
}
function inverseTransverse(self, lp) {
  if (self.isIdentity) {
    lp.x *= D2R;
    lp.y *= D2R;
  }
  const innerLp = self.obliqueProjection.inverse(lp);
  if (!innerLp) {
    return null;
  }
  let { x: lam, y: phi } = innerLp;
  if (lam < Number.MAX_VALUE) {
    const cosphi = Math.cos(phi);
    lam -= self.lamp;
    lp.x = Math.atan2(
      cosphi * Math.sin(lam),
      -1 * Math.sin(phi)
    );
    lp.y = Math.asin(
      cosphi * Math.cos(lam)
    );
  }
  lp.x = adjust_lon_default(lp.x + self.long0);
  return lp;
}
var projectionType, paramSets, names39, ob_tran_default;
var init_ob_tran = __esm({
  "node_modules/proj4/lib/projections/ob_tran.js"() {
    init_adjust_lon();
    init_values();
    init_Proj();
    init_longlat();
    projectionType = {
      OBLIQUE: {
        forward: forwardOblique,
        inverse: inverseOblique
      },
      TRANSVERSE: {
        forward: forwardTransverse,
        inverse: inverseTransverse
      }
    };
    paramSets = {
      ROTATE: {
        o_alpha: "oAlpha",
        o_lon_c: "oLongC",
        o_lat_c: "oLatC"
      },
      NEW_POLE: {
        o_lat_p: "oLatP",
        o_lon_p: "oLongP"
      },
      NEW_EQUATOR: {
        o_lon_1: "oLong1",
        o_lat_1: "oLat1",
        o_lon_2: "oLong2",
        o_lat_2: "oLat2"
      }
    };
    names39 = ["General Oblique Transformation", "General_Oblique_Transformation", "ob_tran"];
    ob_tran_default = {
      init: init38,
      forward: forward35,
      inverse: inverse35,
      names: names39
    };
  }
});

// node_modules/proj4/lib/projections/col_urban.js
function init39() {
  this.h = this.h || 0;
  var h0 = this.h / this.a;
  var sinphi0 = Math.sin(this.lat0);
  var nu0 = 1 / Math.sqrt(1 - this.es * sinphi0 * sinphi0);
  this.A = 1 + h0 / nu0;
  this.rho0 = (1 - this.es) / Math.pow(1 - this.es * sinphi0 * sinphi0, 1.5);
  this.B = Math.tan(this.lat0) / (2 * this.rho0 * nu0);
  this.C = 1 + h0;
  this.D = this.rho0 * (1 + h0 / (1 - this.es));
}
function forward36(p) {
  var lam = adjust_lon_default(p.x - this.long0, this.over);
  var phi = p.y;
  var sinphi = Math.sin(phi);
  var nu = 1 / Math.sqrt(1 - this.es * sinphi * sinphi);
  var lamNuCosphi = lam * nu * Math.cos(phi);
  var sinphim = Math.sin(0.5 * (phi + this.lat0));
  var rhom = (1 - this.es) / Math.pow(1 - this.es * sinphim * sinphim, 1.5);
  var g = 1 + this.h / (this.a * rhom);
  p.x = this.a * this.A * lamNuCosphi + this.x0;
  p.y = this.a * g * this.rho0 * (phi - this.lat0 + this.B * lamNuCosphi * lamNuCosphi) + this.y0;
  return p;
}
function inverse36(p) {
  var x = (p.x - this.x0) / this.a;
  var y = (p.y - this.y0) / this.a;
  var phi = this.lat0 + y / this.D - this.B * (x / this.C) * (x / this.C);
  var sinphi = Math.sin(phi);
  var nu = 1 / Math.sqrt(1 - this.es * sinphi * sinphi);
  var lam = x / (this.C * nu * Math.cos(phi));
  p.x = adjust_lon_default(lam + this.long0, this.over);
  p.y = phi;
  return p;
}
var names40, col_urban_default;
var init_col_urban = __esm({
  "node_modules/proj4/lib/projections/col_urban.js"() {
    init_adjust_lon();
    names40 = ["Colombia Urban", "IGAC_Plano_Cartesiano", "col_urban"];
    col_urban_default = {
      init: init39,
      forward: forward36,
      inverse: inverse36,
      names: names40
    };
  }
});

// node_modules/proj4/projs.js
function projs_default(proj43) {
  proj43.Proj.projections.add(tmerc_default);
  proj43.Proj.projections.add(tmerc_approx_default);
  proj43.Proj.projections.add(etmerc_default);
  proj43.Proj.projections.add(utm_default);
  proj43.Proj.projections.add(sterea_default);
  proj43.Proj.projections.add(stere_default);
  proj43.Proj.projections.add(somerc_default);
  proj43.Proj.projections.add(omerc_default);
  proj43.Proj.projections.add(lcc_default);
  proj43.Proj.projections.add(krovak_default);
  proj43.Proj.projections.add(cass_default);
  proj43.Proj.projections.add(laea_default);
  proj43.Proj.projections.add(aea_default);
  proj43.Proj.projections.add(gnom_default);
  proj43.Proj.projections.add(cea_default);
  proj43.Proj.projections.add(labrd_default);
  proj43.Proj.projections.add(eqc_default);
  proj43.Proj.projections.add(poly_default);
  proj43.Proj.projections.add(nzmg_default);
  proj43.Proj.projections.add(mill_default);
  proj43.Proj.projections.add(sinu_default);
  proj43.Proj.projections.add(eck6_default);
  proj43.Proj.projections.add(moll_default);
  proj43.Proj.projections.add(eqdc_default);
  proj43.Proj.projections.add(vandg_default);
  proj43.Proj.projections.add(aeqd_default);
  proj43.Proj.projections.add(ortho_default);
  proj43.Proj.projections.add(qsc_default);
  proj43.Proj.projections.add(robin_default);
  proj43.Proj.projections.add(geocent_default);
  proj43.Proj.projections.add(tpers_default);
  proj43.Proj.projections.add(geos_default);
  proj43.Proj.projections.add(eqearth_default);
  proj43.Proj.projections.add(bonne_default);
  proj43.Proj.projections.add(ob_tran_default);
  proj43.Proj.projections.add(col_urban_default);
}
var init_projs = __esm({
  "node_modules/proj4/projs.js"() {
    init_tmerc();
    init_tmerc_approx();
    init_etmerc();
    init_utm();
    init_sterea();
    init_stere();
    init_somerc();
    init_omerc();
    init_lcc();
    init_krovak();
    init_cass();
    init_laea();
    init_aea();
    init_gnom();
    init_cea();
    init_labrd();
    init_eqc();
    init_poly();
    init_nzmg();
    init_mill();
    init_sinu();
    init_eck6();
    init_moll();
    init_eqdc();
    init_vandg();
    init_aeqd();
    init_ortho();
    init_qsc();
    init_robin();
    init_geocent();
    init_tpers();
    init_geos();
    init_eqearth();
    init_bonne();
    init_ob_tran();
    init_col_urban();
  }
});

// node_modules/proj4/lib/index.js
var proj42, lib_default;
var init_lib = __esm({
  "node_modules/proj4/lib/index.js"() {
    init_core();
    init_Proj();
    init_Point();
    init_toPoint();
    init_defs();
    init_nadgrid();
    init_transform();
    init_mgrs();
    init_projs();
    proj42 = Object.assign(core_default, {
      defaultDatum: "WGS84",
      Proj: Proj_default,
      WGS84: new Proj_default("WGS84"),
      Point: Point_default,
      toPoint: toPoint_default,
      defs: defs_default,
      nadgrid,
      transform,
      mgrs: mgrs_default,
      version: "__VERSION__"
    });
    projs_default(proj42);
    lib_default = proj42;
  }
});

// src/crs.js
function utmCode(zone, north = true) {
  return `EPSG:${north ? 32600 + zone : 32700 + zone}`;
}
function utmDef(zone, north = true) {
  return `+proj=utm +zone=${zone} ${north ? "" : "+south "}+datum=WGS84 +units=m +no_defs +axis=enu`;
}
function ensureCrs(code) {
  if (!code) return null;
  const key2 = String(code).toUpperCase();
  const preset = CRS_REGISTRY.find((c) => c.code.toUpperCase() === key2);
  if (preset) {
    lib_default.defs(preset.code, preset.def);
    return preset;
  }
  const m = key2.match(/^EPSG:(32[67])(\d{2})$/);
  if (m) {
    const zone = Number(m[2]);
    if (zone >= 1 && zone <= 60) {
      const north = m[1] === "326";
      const entry = {
        code: utmCode(zone, north),
        name: `UTM ${zone}N/S (WGS84, \u7C73)`,
        geographic: false,
        def: utmDef(zone, north)
      };
      lib_default.defs(entry.code, entry.def);
      return entry;
    }
  }
  if (lib_default.defs[key2]) {
    return { code: key2, name: key2, geographic: false, def: lib_default.defs[key2] };
  }
  return null;
}
function isGeographic(code) {
  const c = ensureCrs(code);
  return Boolean(c && c.geographic);
}
function transformPoint(x, y, fromCode, toCode) {
  if (!fromCode || !toCode) throw new Error("\u7F3A\u5C11\u5750\u6807\u7CFB\uFF0C\u65E0\u6CD5\u8F6C\u6362");
  if (String(fromCode).toUpperCase() === String(toCode).toUpperCase()) return [x, y];
  const from = ensureCrs(fromCode);
  const to = ensureCrs(toCode);
  if (!from) throw new Error(`\u672A\u77E5\u6E90\u5750\u6807\u7CFB\uFF1A${fromCode}`);
  if (!to) throw new Error(`\u672A\u77E5\u76EE\u6807\u5750\u6807\u7CFB\uFF1A${toCode}`);
  return lib_default(from.code, to.code, [x, y]);
}
function transformGeometry(geom, fromCode, toCode) {
  if (!geom || geom.type === "GeometryCollection") {
    if (geom && geom.type === "GeometryCollection") {
      return {
        type: "GeometryCollection",
        geometries: geom.geometries.map((g) => transformGeometry(g, fromCode, toCode))
      };
    }
    return geom;
  }
  const conv = (coords, depth) => {
    if (depth === 0) {
      const [nx, ny] = transformPoint(coords[0], coords[1], fromCode, toCode);
      return coords.length > 2 ? [nx, ny, coords[2]] : [nx, ny];
    }
    return coords.map((c) => conv(c, depth - 1));
  };
  const depthMap = {
    Point: 0,
    MultiPoint: 1,
    LineString: 1,
    MultiLineString: 2,
    Polygon: 2,
    MultiPolygon: 3
  };
  if (!(geom.type in depthMap)) throw new Error(`\u4E0D\u652F\u6301\u7684\u51E0\u4F55\u7C7B\u578B\uFF1A${geom.type}`);
  return { type: geom.type, coordinates: conv(geom.coordinates, depthMap[geom.type]) };
}
function inferAxisHint(coordsSample) {
  let lonLike = 0;
  let latLike = 0;
  let swapped = 0;
  let projected = 0;
  for (const [x, y] of coordsSample) {
    if (![x, y].every(Number.isFinite)) continue;
    const xGeo = Math.abs(x) <= 180 && Math.abs(y) <= 90;
    const yGeo = Math.abs(y) <= 180 && Math.abs(x) <= 90;
    if (xGeo) lonLike += 1;
    if (yGeo && !xGeo) swapped += 1;
    if (!xGeo && !yGeo && (Math.abs(x) > 180 || Math.abs(y) > 90)) projected += 1;
    if (xGeo || yGeo) latLike += 1;
  }
  return { total: coordsSample.length, lonLike, swapped, projected };
}
function readGeoJsonCrs(geoJson) {
  const crs = geoJson && geoJson.crs;
  if (!crs) return null;
  if (crs.type === "name" && crs.properties && crs.properties.name) {
    let raw = String(crs.properties.name);
    const m = raw.match(/EPSG::?(\d+)/i);
    if (m) raw = `EPSG:${m[1]}`;
    return ensureCrs(raw) ? raw : { raw, unknown: true };
  }
  return null;
}
var GEOG_4326, GEOG_4490, CRS_REGISTRY;
var init_crs = __esm({
  "src/crs.js"() {
    init_lib();
    GEOG_4326 = "+proj=longlat +datum=WGS84 +no_defs +axis=enu";
    GEOG_4490 = "+proj=longlat +ellps=GRS80 +no_defs +axis=enu";
    CRS_REGISTRY = [
      { code: "EPSG:4326", name: "WGS84 \u7ECF\u7EAC\u5EA6 (lon, lat)", geographic: true, def: GEOG_4326 },
      { code: "EPSG:4490", name: "CGCS2000 \u7ECF\u7EAC\u5EA6", geographic: true, def: GEOG_4490 },
      { code: "EPSG:3857", name: "Web \u58A8\u5361\u6258 (\u7403\u9762\u7C73)", geographic: false, def: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs" }
    ];
  }
});

// src/geom.js
function eachCoord(geom, cb, path = []) {
  if (!geom) return;
  if (geom.type === "GeometryCollection") {
    geom.geometries.forEach((g, i2) => eachCoord(g, cb, path.concat(["gc", i2])));
    return;
  }
  const walk = (arr, depth, p) => {
    if (depth === 0) cb(arr, p);
    else arr.forEach((c, i2) => walk(c, depth - 1, p.concat(i2)));
  };
  const depthMap = {
    Point: 0,
    MultiPoint: 1,
    LineString: 1,
    MultiLineString: 2,
    Polygon: 2,
    MultiPolygon: 3
  };
  if (geom.type in depthMap) walk(geom.coordinates, depthMap[geom.type], path);
}
function coordCount(geom) {
  let n = 0;
  eachCoord(geom, () => {
    n += 1;
  });
  return n;
}
function eachRing(geom, cb) {
  if (!geom) return;
  if (geom.type === "GeometryCollection") {
    geom.geometries.forEach((g) => eachRing(g, cb));
  } else if (geom.type === "Polygon") {
    geom.coordinates.forEach((ring, ri) => cb(ring, { polygonIndex: 0, ringIndex: ri }));
  } else if (geom.type === "MultiPolygon") {
    geom.coordinates.forEach((poly, pi) => poly.forEach((ring, ri) => cb(ring, { polygonIndex: pi, ringIndex: ri })));
  }
}
function eachLine(geom, cb) {
  if (!geom) return;
  if (geom.type === "GeometryCollection") {
    geom.geometries.forEach((g) => eachLine(g, cb));
  } else if (geom.type === "LineString") {
    cb(geom.coordinates, { lineIndex: 0 });
  } else if (geom.type === "MultiLineString") {
    geom.coordinates.forEach((line, i2) => cb(line, { lineIndex: i2 }));
  }
}
function isEmptyGeom(geom) {
  if (!geom) return true;
  if (geom.type === "GeometryCollection") {
    return geom.geometries.length === 0 || geom.geometries.every(isEmptyGeom);
  }
  if (!("coordinates" in geom)) return true;
  const c = geom.coordinates;
  if (c == null) return true;
  if (Array.isArray(c) && c.length === 0) return true;
  let hasPoint = false;
  eachCoord(geom, () => {
    hasPoint = true;
  });
  return !hasPoint;
}
function bbox(geom) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  eachCoord(geom, ([x, y]) => {
    if (!isNum(x) || !isNum(y)) return;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  if (!Number.isFinite(minX)) return null;
  return [minX, minY, maxX, maxY];
}
function cross(ax, ay, bx, by, cx, cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}
function onSegment(px, py, ax, ay, bx, by) {
  return Math.min(ax, bx) - 1e-12 <= px && px <= Math.max(ax, bx) + 1e-12 && Math.min(ay, by) - 1e-12 <= py && py <= Math.max(ay, by) + 1e-12;
}
function segIntersect(a, b, c, d) {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [cx, cy] = c;
  const [dx, dy] = d;
  const d1 = cross(cx, cy, dx, dy, ax, ay);
  const d2 = cross(cx, cy, dx, dy, bx, by);
  const d3 = cross(ax, ay, bx, by, cx, cy);
  const d4 = cross(ax, ay, bx, by, dx, dy);
  if ((d1 > EPS && d2 < -EPS || d1 < -EPS && d2 > EPS) && (d3 > EPS && d4 < -EPS || d3 < -EPS && d4 > EPS)) {
    const t = d3 / (d3 - d4);
    return { proper: true, weak: false, point: [ax + t * (bx - ax), ay + t * (by - ay)] };
  }
  if (Math.abs(d1) <= EPS && Math.abs(d2) <= EPS && Math.abs(d3) <= EPS && Math.abs(d4) <= EPS) {
    return { proper: false, weak: true, collinear: true, point: null };
  }
  const touches = [];
  if (Math.abs(d1) <= EPS && onSegment(ax, ay, cx, cy, dx, dy)) touches.push(a);
  if (Math.abs(d2) <= EPS && onSegment(bx, by, cx, cy, dx, dy)) touches.push(b);
  if (Math.abs(d3) <= EPS && onSegment(cx, cy, ax, ay, bx, by)) touches.push(c);
  if (Math.abs(d4) <= EPS && onSegment(dx, dy, ax, ay, bx, by)) touches.push(d);
  if (touches.length) return { proper: false, weak: true, point: touches[0] };
  return null;
}
function samePt(a, b, tol = 1e-9) {
  return Math.abs(a[0] - b[0]) <= tol && Math.abs(a[1] - b[1]) <= tol;
}
function selfIntersections(ring) {
  const out = [];
  const n = ring.length;
  for (let i2 = 0; i2 < n - 1; i2 += 1) {
    for (let j = i2 + 1; j < n - 1; j += 1) {
      const adjacent = j === i2 + 1;
      const wrapAdjacent = i2 === 0 && j === n - 2;
      const hit = segIntersect(ring[i2], ring[i2 + 1], ring[j], ring[j + 1]);
      if (!hit) continue;
      if ((adjacent || wrapAdjacent) && !hit.proper && !hit.collinear) continue;
      if (hit.proper || hit.collinear) {
        out.push({ point: hit.point, proper: hit.proper, collinear: Boolean(hit.collinear), weak: false, edges: [i2, j] });
      } else if (hit.weak) {
        out.push({ point: hit.point, proper: false, weak: true, edges: [i2, j] });
      }
    }
  }
  return out;
}
function ringIsClosed(ring) {
  return ring.length >= 2 && samePt(ring[0], ring[ring.length - 1]);
}
function repeatedPoints(ring) {
  const idxs = [];
  for (let i2 = 1; i2 < ring.length; i2 += 1) {
    if (samePt(ring[i2 - 1], ring[i2])) idxs.push(i2);
  }
  return idxs;
}
function ringAreaPlanar(ring) {
  let s = 0;
  for (let i2 = 0; i2 < ring.length - 1; i2 += 1) {
    s += ring[i2][0] * ring[i2 + 1][1] - ring[i2 + 1][0] * ring[i2][1];
  }
  return s / 2;
}
function ringAreaSpherical(ring) {
  let s = 0;
  for (let i2 = 0; i2 < ring.length - 1; i2 += 1) {
    const lon1 = ring[i2][0] * Math.PI / 180;
    const lat1 = ring[i2][1] * Math.PI / 180;
    const lon2 = ring[i2 + 1][0] * Math.PI / 180;
    const lat2 = ring[i2 + 1][1] * Math.PI / 180;
    s += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }
  return s * EARTH_R * EARTH_R / 2;
}
function geometryArea(geom, geographic) {
  if (!geom || isEmptyGeom(geom)) return 0;
  const ringArea = geographic ? ringAreaSpherical : ringAreaPlanar;
  let total = 0;
  eachRing(geom, (ring, { ringIndex }) => {
    if (ring.length < 4) return;
    const a = ringArea(ring);
    total += ringIndex === 0 ? a : -a;
  });
  return Math.abs(total);
}
function pointInRing([x, y], ring) {
  let inside = false;
  for (let i2 = 0, j = ring.length - 1; i2 < ring.length; j = i2, i2 += 1) {
    const xi = ring[i2][0];
    const yi = ring[i2][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function crossesAntimeridian(geom) {
  let hit = false;
  const checkLine = (line) => {
    for (let i2 = 1; i2 < line.length; i2 += 1) {
      if (Math.abs(line[i2][0] - line[i2 - 1][0]) > 180) {
        hit = true;
      }
    }
  };
  eachLine(geom, checkLine);
  eachRing(geom, (ring) => checkLine(ring));
  return hit;
}
function splitLineAtDateline(line) {
  const parts = [[]];
  for (let i2 = 0; i2 < line.length; i2 += 1) {
    const p = line[i2];
    if (i2 === 0) {
      parts[0].push(p);
      continue;
    }
    const prev = line[i2 - 1];
    const dx = p[0] - prev[0];
    if (Math.abs(dx) > 180) {
      const boundaryLon = prev[0] > 0 ? 180 : -180;
      const t = (boundaryLon - prev[0]) / dx;
      const lat = prev[1] + (p[1] - prev[1]) * t;
      parts[parts.length - 1].push([boundaryLon, lat]);
      parts.push([[-boundaryLon, lat]]);
    }
    parts[parts.length - 1].push(p);
  }
  return parts.filter((p) => p.length >= 2);
}
var EPS, EARTH_R;
var init_geom = __esm({
  "src/geom.js"() {
    init_util();
    EPS = 1e-12;
    EARTH_R = 6378137;
  }
});

// src/parsing.js
var parsing_exports = {};
__export(parsing_exports, {
  parseCsv: () => parseCsv,
  parseCsvRows: () => parseCsvRows,
  parseGeoJson: () => parseGeoJson
});
function buildLineIndex(text) {
  const starts = [0];
  for (let i2 = 0; i2 < text.length; i2 += 1) {
    if (text[i2] === "\n") starts.push(i2 + 1);
  }
  return {
    lineOf(offset) {
      let lo = 0;
      let hi = starts.length - 1;
      while (lo < hi) {
        const mid = lo + hi + 1 >> 1;
        if (starts[mid] <= offset) lo = mid;
        else hi = mid - 1;
      }
      return lo + 1;
    },
    total: starts.length
  };
}
function findFeatureOffsets(text) {
  const offsets = [];
  let i2 = 0;
  const n = text.length;
  const skipWs = () => {
    while (i2 < n && /\s/.test(text[i2])) i2 += 1;
  };
  const readStr = () => {
    let s = "";
    i2 += 1;
    while (i2 < n && text[i2] !== '"') {
      if (text[i2] === "\\") {
        s += text[i2] + (text[i2 + 1] ?? "");
        i2 += 2;
      } else {
        s += text[i2];
        i2 += 1;
      }
    }
    i2 += 1;
    return s;
  };
  const skipValue = () => {
    skipWs();
    const ch = text[i2];
    if (ch === '"') {
      readStr();
      return;
    }
    if (ch === "{" || ch === "[") {
      const open = ch;
      const close = open === "{" ? "}" : "]";
      let depth = 0;
      do {
        if (text[i2] === '"') readStr();
        else {
          if (text[i2] === open) depth += 1;
          if (text[i2] === close) depth -= 1;
          i2 += 1;
        }
      } while (i2 < n && depth > 0);
      return;
    }
    while (i2 < n && !/[\s,}\]]/.test(text[i2])) i2 += 1;
  };
  let featuresArrayStart = -1;
  while (i2 < n) {
    skipWs();
    if (text[i2] !== '"') {
      i2 += 1;
      continue;
    }
    const keyStart = i2;
    const key2 = readStr();
    skipWs();
    if (text[i2] === ":") {
      i2 += 1;
      skipWs();
      if (key2 === "features" && text[i2] === "[") {
        featuresArrayStart = i2;
        break;
      }
      skipValue();
    }
    keyStart;
  }
  if (featuresArrayStart < 0) return offsets;
  i2 = featuresArrayStart + 1;
  while (i2 < n) {
    skipWs();
    if (text[i2] === "]") break;
    if (text[i2] === ",") {
      i2 += 1;
      continue;
    }
    if (text[i2] !== "{") {
      i2 += 1;
      continue;
    }
    const start2 = i2;
    let depth = 0;
    do {
      if (text[i2] === '"') readStr();
      else {
        if (text[i2] === "{") depth += 1;
        if (text[i2] === "}") depth -= 1;
        i2 += 1;
      }
    } while (i2 < n && depth > 0);
    offsets.push([start2, i2 - 1]);
  }
  return offsets;
}
function makeFeature(raw, source, index, lineStart, lineEnd) {
  const geom = raw.type === "Feature" ? raw.geometry : raw;
  const props = raw.type === "Feature" && raw.properties ? raw.properties : {};
  const id = raw.type === "Feature" && "id" in raw ? raw.id : void 0;
  return {
    fid: uid("f"),
    sourceIndex: index,
    // 在源 FeatureCollection 中的序号
    id,
    properties: props || {},
    geometry: deepClone(geom),
    // 原始坐标，永不修改
    originalGeometry: deepClone(geom),
    // 同一份原始坐标的独立存档
    source,
    // { kind:'geojson'|'csv', name }
    lineStart,
    lineEnd,
    coordCount: coordCount(geom),
    empty: isEmptyGeom(geom),
    geomHash: stableHash(geom),
    derived: null
    // 集合几何拆分/修复产生的要素挂这里
  };
}
function parseGeoJson(text, fileName) {
  const lineIndex = buildLineIndex(text);
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error(`GeoJSON \u89E3\u6790\u5931\u8D25\uFF1A${e.message}`);
  }
  const offsets = findFeatureOffsets(text);
  const raws = [];
  if (data.type === "FeatureCollection") {
    data.features.forEach((f, idx) => raws.push([f, idx]));
  } else if (data.type === "Feature") {
    raws.push([data, 0]);
  } else if (typeof data.type === "string" && data.coordinates !== void 0) {
    raws.push([data, 0]);
  } else {
    throw new Error("\u672A\u8BC6\u522B\u7684 GeoJSON \u7ED3\u6784\uFF08\u9700\u8981 FeatureCollection / Feature / Geometry\uFF09");
  }
  const features = raws.map(([raw, idx]) => {
    const off = offsets[idx];
    const lineStart = off ? lineIndex.lineOf(off[0]) : null;
    const lineEnd = off ? lineIndex.lineOf(off[1]) : null;
    return makeFeature(raw, { kind: "geojson", name: fileName }, idx, lineStart, lineEnd);
  });
  const crsRaw = readGeoJsonCrs(data);
  const fallbackName = fileName.replace(/\.(geo)?json$/i, "");
  return {
    layer: {
      lid: uid("layer"),
      // 优先采用 FeatureCollection 自带的业务名称；缺失时回退到文件名
      name: typeof data.name === "string" && data.name.trim() || fallbackName,
      sourceName: fileName,
      sourceKind: "geojson",
      features,
      crsRaw,
      crsUser: null,
      crs: typeof crsRaw === "string" ? crsRaw : null,
      crsMissing: !crsRaw,
      importedAt: (/* @__PURE__ */ new Date()).toISOString(),
      lineage: data.__qc_lineage || null,
      isCandidate: Boolean(data.__qc_lineage),
      derivedFrom: data.__qc_lineage ? data.__qc_lineage.sourceLayer : null
    },
    warnings: typeof crsRaw === "object" && crsRaw && crsRaw.unknown ? [`\u65E0\u6CD5\u8BC6\u522B\u7684 CRS \u540D\u79F0\uFF1A${crsRaw.raw}\uFF0C\u8BF7\u624B\u52A8\u6307\u5B9A`] : []
  };
}
function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let lineNo = 1;
  const rowStartLines = [1];
  const pushRow = () => {
    row.push(field);
    rows.push(row);
    row = [];
    field = "";
  };
  for (let i2 = 0; i2 < text.length; i2 += 1) {
    const ch = text[i2];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i2 + 1] === '"') {
          field += '"';
          i2 += 1;
        } else inQuotes = false;
      } else {
        field += ch;
        if (ch === "\n") lineNo += 1;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i2 + 1] === "\n") i2 += 1;
      pushRow();
      lineNo += 1;
      rowStartLines.push(lineNo);
    } else {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    pushRow();
    rowStartLines.push(lineNo);
  }
  return { rows, rowStartLines };
}
function pickColumn(headers, candidates) {
  const lower = headers.map((h) => String(h).trim().toLowerCase());
  for (const c of candidates) {
    const idx = lower.indexOf(c);
    if (idx >= 0) return idx;
  }
  return -1;
}
function parseCsv(text, fileName, opts = {}) {
  const { rows, rowStartLines } = parseCsvRows(text);
  if (rows.length < 2) throw new Error("CSV \u81F3\u5C11\u9700\u8981\u8868\u5934\u548C\u4E00\u884C\u6570\u636E");
  const headers = rows[0].map((h) => h.trim());
  const xIdx = opts.xColumn != null ? opts.xColumn : pickColumn(headers, X_NAMES);
  const yIdx = opts.yColumn != null ? opts.yColumn : pickColumn(headers, Y_NAMES);
  const features = [];
  const parseNotes = [];
  for (let r = 1; r < rows.length; r += 1) {
    const cells = rows[r];
    if (cells.length === 1 && cells[0].trim() === "") continue;
    const props = {};
    headers.forEach((h, i2) => {
      props[h || `col${i2}`] = cells[i2] ?? "";
    });
    let geom = null;
    let coordNote = null;
    if (xIdx >= 0 && yIdx >= 0) {
      const x = Number(cells[xIdx]);
      const y = Number(cells[yIdx]);
      if (Number.isFinite(x) && Number.isFinite(y)) {
        geom = { type: "Point", coordinates: [x, y] };
      } else {
        coordNote = `\u7B2C ${xIdx + 1}/${yIdx + 1} \u5217\u5750\u6807\u975E\u6570\u503C\uFF1A"${cells[xIdx] ?? ""}", "${cells[yIdx] ?? ""}"`;
        geom = { type: "Point", coordinates: [] };
      }
    }
    if (coordNote) parseNotes.push({ row: r + 1, note: coordNote });
    const f = makeFeature(
      { type: "Feature", properties: props, geometry: geom },
      { kind: "csv", name: fileName },
      r - 1,
      rowStartLines[r] ?? r + 1,
      rowStartLines[r] ?? r + 1
    );
    f.csvHeaders = headers;
    features.push(f);
  }
  return {
    layer: {
      lid: uid("layer"),
      name: fileName.replace(/\.csv$/i, ""),
      sourceName: fileName,
      sourceKind: "csv",
      features,
      crsRaw: opts.crs || null,
      crsUser: opts.crs || null,
      crs: opts.crs || null,
      crsMissing: !opts.crs,
      importedAt: (/* @__PURE__ */ new Date()).toISOString(),
      lineage: null,
      csvColumns: headers
    },
    warnings: [
      ...xIdx < 0 || yIdx < 0 ? ["\u672A\u80FD\u81EA\u52A8\u8BC6\u522B\u7ECF\u7EAC\u5EA6\u5217\uFF0C\u8BF7\u5728\u5BFC\u5165\u65F6\u624B\u52A8\u6307\u5B9A"] : [],
      ...parseNotes.map((p) => `\u7B2C ${p.row} \u884C\uFF1A${p.note}`)
    ]
  };
}
var X_NAMES, Y_NAMES;
var init_parsing = __esm({
  "src/parsing.js"() {
    init_util();
    init_crs();
    init_geom();
    X_NAMES = ["lng", "lon", "long", "longitude", "x", "\u7ECF\u5EA6", "x\u5750\u6807", "coord_x"];
    Y_NAMES = ["lat", "latitude", "y", "\u7EAC\u5EA6", "y\u5750\u6807", "coord_y"];
  }
});

// src/state.js
init_parsing();

// src/checks.js
init_util();
init_crs();
init_geom();
init_util();
var ISSUE_TYPES = {
  CRS_MISSING: { sev: "critical", label: "\u5750\u6807\u7CFB\u7F3A\u5931", hint: "\u65E0\u6CD5\u6295\u5F71\u8F6C\u6362\uFF0C\u9700\u663E\u5F0F\u6307\u5B9A CRS" },
  CRS_UNKNOWN: { sev: "critical", label: "\u5750\u6807\u7CFB\u65E0\u6CD5\u8BC6\u522B", hint: "\u5143\u6570\u636E\u4E2D\u7684 CRS \u540D\u79F0\u65E0\u6548" },
  AXIS_SWAPPED: { sev: "critical", label: "\u7ECF\u7EAC\u5EA6\u7591\u4F3C\u98A0\u5012", hint: "\u6570\u503C\u8303\u56F4\u663E\u793A (lat, lon) \u800C\u975E (lon, lat)" },
  PROJECTED_AS_LL: { sev: "critical", label: "\u6295\u5F71\u5750\u6807\u8BEF\u5F53\u7ECF\u7EAC\u5EA6", hint: "\u6570\u503C\u8FDC\u8D85 \xB1180/\xB190\uFF0C\u7591\u4F3C\u5E73\u9762\u5750\u6807" },
  OUT_OF_BOUNDS: { sev: "serious", label: "\u8D8A\u754C\u5750\u6807\u70B9", hint: "\u7ECF\u5EA6\u987B\u5728 [-180,180]\u3001\u7EAC\u5EA6\u5728 [-90,90]" },
  EMPTY_GEOM: { sev: "serious", label: "\u7A7A\u51E0\u4F55", hint: "\u51E0\u4F55\u7F3A\u5931\u6216\u5750\u6807\u4E3A\u7A7A\uFF0C\u9700\u5355\u72EC\u5904\u7406" },
  INVALID_POLY: { sev: "serious", label: "\u975E\u6CD5\u591A\u8FB9\u5F62", hint: "\u672A\u95ED\u5408\u3001\u81EA\u76F8\u4EA4\u3001\u6D1E\u5728\u5916\u7B49" },
  SELF_INTERSECT: { sev: "serious", label: "\u81EA\u76F8\u4EA4", hint: "\u73AF/\u7EBF\u81EA\u8EAB\u4EA4\u53C9\uFF0C\u62D3\u6251\u65E0\u6548" },
  DUPLICATE: { sev: "warning", label: "\u91CD\u590D\u8981\u7D20", hint: "\u51E0\u4F55\uFF08\u53CA\u5C5E\u6027\uFF09\u5B8C\u5168\u76F8\u540C" },
  DATELINE: { sev: "warning", label: "\u8DE8\u65E5\u671F\u53D8\u66F4\u7EBF", hint: "\u5DF2\u4FDD\u7559\u539F\u59CB\u62D3\u6251\uFF0C\u6E32\u67D3\u65F6\u62C6\u5206\u663E\u793A" },
  GEOM_COLLECTION: { sev: "info", label: "\u96C6\u5408\u51E0\u4F55", hint: "\u68C0\u67E5/\u4FEE\u590D\u65F6\u62C6\u5206\u4E3A\u6210\u5458\u51E0\u4F55\u5904\u7406" },
  REPEATED_POINT: { sev: "warning", label: "\u8FDE\u7EED\u91CD\u590D\u70B9", hint: "\u76F8\u90BB\u5750\u6807\u5B8C\u5168\u76F8\u540C" }
};
var issueSeq = 0;
function makeIssue(type, layer, feature, extra = {}) {
  const t = ISSUE_TYPES[type];
  issueSeq += 1;
  return {
    iid: `iss_${issueSeq}`,
    type,
    severity: t.sev,
    label: t.label,
    hint: t.hint,
    layerId: layer.lid,
    layerName: layer.name,
    featureFid: feature ? feature.fid : null,
    sourceIndex: feature ? feature.sourceIndex : null,
    lineStart: feature ? feature.lineStart : null,
    lineEnd: feature ? feature.lineEnd : null,
    coordPath: null,
    point: null,
    detail: "",
    repairable: false,
    ...extra
  };
}
function sampleLayerCoords(layer, cap = 500) {
  const sample = [];
  for (const f of layer.features) {
    eachCoord(f.geometry, (p) => {
      if (sample.length < cap && p.length >= 2) sample.push(p);
    });
  }
  return sample;
}
function checkCrsAndAxis(layer, issues) {
  if (!layer.crs || layer.crsMissing) {
    issues.push(makeIssue("CRS_MISSING", layer, null, {
      detail: `\u56FE\u5C42\u300C${layer.name}\u300D\u6CA1\u6709\u53EF\u8BFB\u7684 CRS \u5143\u6570\u636E\uFF0C\u6295\u5F71\u8F6C\u6362\u5DF2\u505C\u6B62\uFF1B\u8BF7\u663E\u5F0F\u6307\u5B9A\u5750\u6807\u7CFB`,
      repairable: false
    }));
    return;
  }
  if (!ensureCrs(layer.crs)) {
    issues.push(makeIssue("CRS_UNKNOWN", layer, null, {
      detail: `CRS\u300C${layer.crs}\u300D\u4E0D\u5728\u5185\u7F6E\u5B9A\u4E49\u4E2D\uFF0C\u6295\u5F71\u8F6C\u6362\u5DF2\u505C\u6B62`
    }));
    return;
  }
  if (!isGeographic(layer.crs)) return;
  const hint = inferAxisHint(sampleLayerCoords(layer));
  if (hint.total === 0) return;
  const swappedRatio = hint.swapped / hint.total;
  const projectedRatio = hint.projected / hint.total;
  if (projectedRatio > 0.5) {
    issues.push(makeIssue("PROJECTED_AS_LL", layer, null, {
      detail: `${(projectedRatio * 100).toFixed(0)}% \u7684\u5750\u6807\u8D85\u51FA\u7ECF\u7EAC\u5EA6\u8303\u56F4\uFF0C\u5F53\u524D CRS \u58F0\u660E\u4E3A\u5730\u7406\u5750\u6807\u7CFB\uFF0C\u7591\u4F3C\u628A\u5E73\u9762\u5750\u6807\u8BEF\u5F53\u7ECF\u7EAC\u5EA6`,
      repairable: true
    }));
  } else if (swappedRatio > 0.5 && hint.lonLike === 0) {
    issues.push(makeIssue("AXIS_SWAPPED", layer, null, {
      detail: `\u591A\u6570\u70B9\u6EE1\u8DB3 |x|\u226490 \u4E14 |y|\u2264180\uFF0C\u7591\u4F3C\u7ECF\u7EAC\u5EA6\u987A\u5E8F\u98A0\u5012\u4E3A (lat, lon)`,
      repairable: true
    }));
  }
}
function checkBoundsAndEmpty(layer, issues, geo) {
  for (const f of layer.features) {
    if (isEmptyGeom(f.geometry)) {
      issues.push(makeIssue("EMPTY_GEOM", layer, f, {
        detail: `\u8981\u7D20 #${f.sourceIndex} \u51E0\u4F55\u4E3A\u7A7A\uFF08${f.geometry ? f.geometry.type : "\u65E0 geometry \u5B57\u6BB5"}\uFF09`,
        repairable: true
      }));
      continue;
    }
    if (f.geometry.type === "GeometryCollection") {
      issues.push(makeIssue("GEOM_COLLECTION", layer, f, {
        detail: `\u8981\u7D20 #${f.sourceIndex} \u4E3A GeometryCollection\uFF0C\u542B ${f.geometry.geometries.length} \u4E2A\u6210\u5458\uFF0C\u68C0\u67E5\u4E0E\u4FEE\u590D\u6309\u6210\u5458\u62C6\u5206\uFF0C\u539F\u59CB\u96C6\u5408\u4FDD\u7559`
      }));
    }
    if (geo) {
      const bad = [];
      eachCoord(f.geometry, (p, path) => {
        const [x, y] = p;
        if (!isNum(x) || !isNum(y) || x < -180 || x > 180 || y < -90 || y > 90) {
          bad.push({ p, path });
        }
      });
      if (bad.length) {
        issues.push(makeIssue("OUT_OF_BOUNDS", layer, f, {
          coordPath: bad[0].path,
          point: bad[0].p,
          detail: `\u8981\u7D20 #${f.sourceIndex} \u6709 ${bad.length} \u4E2A\u8D8A\u754C\u5750\u6807\u70B9\uFF0C\u9996\u4E2A\uFF1A[${bad[0].p.map((v) => isNum(v) ? v : "NaN").join(", ")}]`
        }));
      }
    }
    if (crossesAntimeridian(f.geometry)) {
      issues.push(makeIssue("DATELINE", layer, f, {
        detail: `\u8981\u7D20 #${f.sourceIndex} \u542B\u7ECF\u5EA6\u8DF3\u53D8 >180\xB0 \u7684\u7EBF\u6BB5\uFF0C\u8DE8\u65E5\u671F\u53D8\u66F4\u7EBF\uFF1B\u539F\u59CB\u5750\u6807\u4E0E\u62D3\u6251\u4FDD\u7559\uFF0C\u4EC5\u5728\u6E32\u67D3\u65F6\u62C6\u5206`
      }));
    }
  }
}
function checkPolygonValidity(layer, issues) {
  for (const f of layer.features) {
    if (isEmptyGeom(f.geometry)) continue;
    eachRing(f.geometry, (ring, loc) => {
      if (ring.length < 4) {
        issues.push(makeIssue("INVALID_POLY", layer, f, {
          coordPath: ["coordinates", loc.polygonIndex, loc.ringIndex],
          detail: `\u8981\u7D20 #${f.sourceIndex} \u7B2C ${loc.ringIndex + 1} \u4E2A\u73AF\u53EA\u6709 ${ring.length} \u4E2A\u70B9\uFF0C\u65E0\u6CD5\u6784\u6210\u9762`,
          repairable: true
        }));
        return;
      }
      if (!ringIsClosed(ring)) {
        issues.push(makeIssue("INVALID_POLY", layer, f, {
          coordPath: ["coordinates", loc.polygonIndex, loc.ringIndex],
          point: ring[ring.length - 1],
          detail: `\u8981\u7D20 #${f.sourceIndex} \u7B2C ${loc.ringIndex + 1} \u4E2A\u73AF\u672A\u95ED\u5408\uFF08\u9996\u5C3E\u70B9\u4E0D\u4E00\u81F4\uFF09`,
          repairable: true
        }));
      }
      const dup = repeatedPoints(ring);
      if (dup.length) {
        issues.push(makeIssue("REPEATED_POINT", layer, f, {
          coordPath: ["coordinates", loc.polygonIndex, loc.ringIndex, dup[0]],
          point: ring[dup[0]],
          detail: `\u8981\u7D20 #${f.sourceIndex} \u73AF\u5185\u6709 ${dup.length} \u5904\u8FDE\u7EED\u91CD\u590D\u70B9`,
          repairable: true
        }));
      }
      const hits = selfIntersections(ring);
      const proper = hits.filter((h) => h.proper || h.collinear);
      if (proper.length) {
        issues.push(makeIssue("SELF_INTERSECT", layer, f, {
          coordPath: ["coordinates", loc.polygonIndex, loc.ringIndex],
          point: proper[0].point,
          detail: `\u8981\u7D20 #${f.sourceIndex} \u7B2C ${loc.ringIndex + 1} \u4E2A\u73AF\u5B58\u5728 ${proper.length} \u5904\u81EA\u76F8\u4EA4\uFF08\u542B\u5171\u7EBF\u91CD\u53E0\uFF09\uFF0C\u4EA4\u70B9\u7EA6 (${proper[0].point ? proper[0].point.map((v) => v.toFixed(4)).join(", ") : "\u5171\u7EBF"})`,
          repairable: true
        }));
      }
    });
    eachLine(f.geometry, (line, loc) => {
      if (line.length < 2) return;
      const dupLine = repeatedPoints(line);
      if (dupLine.length) {
        issues.push(makeIssue("REPEATED_POINT", layer, f, {
          coordPath: ["coordinates", loc.lineIndex, dupLine[0]],
          point: line[dupLine[0]],
          detail: `\u8981\u7D20 #${f.sourceIndex} \u7EBF ${loc.lineIndex + 1} \u6709 ${dupLine.length} \u5904\u8FDE\u7EED\u91CD\u590D\u70B9`,
          repairable: true
        }));
      }
      const hits = selfIntersections(line);
      const proper = hits.filter((h) => h.proper);
      if (proper.length) {
        issues.push(makeIssue("SELF_INTERSECT", layer, f, {
          coordPath: ["coordinates", loc.lineIndex],
          point: proper[0].point,
          detail: `\u8981\u7D20 #${f.sourceIndex} \u7EBF ${loc.lineIndex + 1} \u5B58\u5728 ${proper.length} \u5904\u81EA\u76F8\u4EA4`,
          repairable: true
        }));
      }
    });
    eachRing(f.geometry, (ring, loc) => {
      if (loc.ringIndex !== 0 || ring.length < 4) return;
      const outer = ring;
      const polyRings = f.geometry.type === "Polygon" ? f.geometry.coordinates : f.geometry.coordinates[loc.polygonIndex];
      for (let hi = 1; hi < polyRings.length; hi += 1) {
        const hole = polyRings[hi];
        if (!hole.length) continue;
        if (!pointInRing(hole[0], outer)) {
          issues.push(makeIssue("INVALID_POLY", layer, f, {
            coordPath: ["coordinates", loc.polygonIndex, hi],
            point: hole[0],
            detail: `\u8981\u7D20 #${f.sourceIndex} \u7B2C ${hi + 1} \u4E2A\u6D1E\u7684\u53C2\u8003\u70B9\u843D\u5728\u5916\u73AF\u4E4B\u5916\uFF0C\u591A\u8FB9\u5F62\u975E\u6CD5`,
            repairable: false
          }));
        }
      }
    });
  }
}
function checkDuplicates(layer, issues) {
  const byGeom = /* @__PURE__ */ new Map();
  const byAll = /* @__PURE__ */ new Map();
  for (const f of layer.features) {
    if (f.empty) continue;
    const gKey = stableHash(f.geometry);
    if (!byGeom.has(gKey)) byGeom.set(gKey, []);
    byGeom.get(gKey).push(f);
    const aKey = stableHash({ g: f.geometry, p: f.properties });
    if (!byAll.has(aKey)) byAll.set(aKey, []);
    byAll.get(aKey).push(f);
  }
  const reported = /* @__PURE__ */ new Set();
  for (const [key2, group] of byAll) {
    if (group.length > 1) {
      for (const f of group) {
        reported.add(f.fid);
        issues.push(makeIssue("DUPLICATE", layer, f, {
          detail: `\u8981\u7D20 #${f.sourceIndex} \u4E0E #${group.filter((g) => g !== f).map((g) => g.sourceIndex).join(", #")} \u51E0\u4F55\u4E0E\u5C5E\u6027\u5B8C\u5168\u76F8\u540C`,
          repairable: true,
          dupKey: key2
        }));
      }
    }
  }
  for (const [key2, group] of byGeom) {
    if (group.length > 1) {
      for (const f of group) {
        if (reported.has(f.fid)) continue;
        issues.push(makeIssue("DUPLICATE", layer, f, {
          detail: `\u8981\u7D20 #${f.sourceIndex} \u51E0\u4F55\u4E0E\u5176\u4ED6 ${group.length - 1} \u4E2A\u8981\u7D20\u91CD\u5408\uFF08\u5C5E\u6027\u4E0D\u540C\uFF09`,
          repairable: true,
          dupKey: key2
        }));
      }
    }
  }
}
function runChecks(layers) {
  const issues = [];
  for (const layer of layers) {
    const geo = layer.crs ? isGeographic(layer.crs) : true;
    checkCrsAndAxis(layer, issues);
    checkBoundsAndEmpty(layer, issues, geo);
    checkPolygonValidity(layer, issues);
    checkDuplicates(layer, issues);
  }
  const order2 = { critical: 0, serious: 1, warning: 2, info: 3 };
  issues.sort((a, b) => order2[a.severity] - order2[b.severity] || a.layerName.localeCompare(b.layerName) || (a.sourceIndex ?? 0) - (b.sourceIndex ?? 0));
  const summary = { total: issues.length, critical: 0, serious: 0, warning: 0, info: 0 };
  for (const iss of issues) summary[iss.severity] += 1;
  const featureCount = layers.reduce((s, l) => s + l.features.length, 0);
  const emptyCount = layers.reduce((s, l) => s + l.features.filter((f) => f.empty).length, 0);
  return { issues, summary, featureCount, emptyCount };
}

// src/repair.js
init_util();
init_geom();
function fixRingClosed(ring) {
  if (ringIsClosed(ring) || ring.length < 2) return ring;
  return ring.concat([deepClone(ring[0])]);
}
function fixRingDedup(ring) {
  const out = [ring[0]];
  for (let i2 = 1; i2 < ring.length; i2 += 1) {
    const prev = out[out.length - 1];
    if (prev[0] !== ring[i2][0] || prev[1] !== ring[i2][1]) out.push(ring[i2]);
  }
  if (ring.length > 1 && ringIsClosed(ring) && !ringIsClosed(out)) {
    out.push(deepClone(out[0]));
  }
  return out;
}
function dedupLine(line) {
  if (line.length < 2) return deepClone(line);
  const out = [line[0]];
  for (let i2 = 1; i2 < line.length; i2 += 1) {
    const prev = out[out.length - 1];
    if (prev[0] !== line[i2][0] || prev[1] !== line[i2][1]) out.push(line[i2]);
  }
  return out;
}
function swapAxesGeom(geom) {
  const swap = (v, depth) => {
    if (depth === 0) {
      const [x, y, ...rest] = v;
      return [y, x, ...rest];
    }
    return v.map((c) => swap(c, depth - 1));
  };
  const depthMap = {
    Point: 0,
    MultiPoint: 1,
    LineString: 1,
    MultiLineString: 2,
    Polygon: 2,
    MultiPolygon: 3
  };
  return { type: geom.type, coordinates: swap(geom.coordinates, depthMap[geom.type]) };
}
function fixRingIssues(geom) {
  const out = deepClone(geom);
  eachRing(out, (ring) => {
    let r = fixRingClosed(ring);
    r = fixRingDedup(r);
    ring.length = 0;
    ring.push(...r);
  });
  eachLine(out, (line) => {
    const deduped = dedupLine(line);
    line.length = 0;
    line.push(...deduped);
  });
  return out;
}
function splitBowtie(ring) {
  const hits = selfIntersections(ring).filter((h) => h.proper);
  if (hits.length !== 1 || !hits[0].point) return null;
  const P = hits[0].point;
  const [e1, e2] = hits[0].edges;
  const base = ringIsClosed(ring) ? ring.slice(0, -1) : ring.slice();
  const n = base.length;
  const inserted = [];
  for (let i2 = 0; i2 < n; i2 += 1) {
    inserted.push(base[i2]);
    if (i2 === e1 || i2 === e2) inserted.push(P);
  }
  const pIdx = inserted.map((p, i2) => p === P ? i2 : -1).filter((i2) => i2 >= 0);
  if (pIdx.length !== 2) return null;
  const [pA, pB] = pIdx;
  const chain = (from, to) => {
    const out = [];
    for (let k = from; k !== to; k = (k + 1) % inserted.length) out.push(inserted[k]);
    out.push(inserted[to]);
    return out;
  };
  const loop1 = chain(pA, pB);
  const loop2 = chain(pB, pA);
  const close = (loop) => {
    const first = loop[0];
    const last = loop[loop.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) loop.push([...first]);
    return loop;
  };
  const polys = [loop1, loop2].map(close).filter((r) => r.length >= 4 && Math.abs(geometryArea({ type: "Polygon", coordinates: [r] }, false)) > 1e-12);
  if (polys.length < 1) return null;
  return polys;
}
function fixSelfIntersect(geom) {
  if (geom.type === "Polygon" && geom.coordinates.length === 1) {
    const split = splitBowtie(geom.coordinates[0]);
    if (!split) return { geom: null, note: "\u5B58\u5728\u591A\u4E2A\u4EA4\u70B9\uFF0C\u65E0\u6CD5\u81EA\u52A8\u62C6\u5206\uFF0C\u4EC5\u6807\u8BB0" };
    return {
      geom: { type: "MultiPolygon", coordinates: split.map((r) => [r]) },
      note: `\u8774\u8776\u7ED3\u591A\u8FB9\u5F62\u5DF2\u5728\u4EA4\u70B9\u5904\u62C6\u5206\u4E3A ${split.length} \u4E2A\u591A\u8FB9\u5F62`
    };
  }
  if (geom.type === "MultiPolygon") {
    const out = [];
    let changed = false;
    let failed = false;
    for (const poly of geom.coordinates) {
      if (poly.length === 1) {
        const split = splitBowtie(poly[0]);
        if (split) {
          split.forEach((r) => out.push([r]));
          changed = true;
        } else {
          out.push(poly);
          failed = true;
        }
      } else out.push(poly);
    }
    if (!changed) return { geom: null, note: failed ? "\u542B\u591A\u4EA4\u70B9\u6216\u5E26\u6D1E\u81EA\u76F8\u4EA4\uFF0C\u65E0\u6CD5\u81EA\u52A8\u62C6\u5206" : "\u65E0\u9700\u62C6\u5206" };
    return {
      geom: { type: "MultiPolygon", coordinates: out },
      note: failed ? "\u90E8\u5206\u8774\u8776\u7ED3\u5DF2\u62C6\u5206\uFF0C\u590D\u6742\u9762\u4FDD\u7559\u539F\u6837" : `\u5DF2\u62C6\u5206\u4E3A ${out.length} \u4E2A\u591A\u8FB9\u5F62`
    };
  }
  return { geom: null, note: "\u8BE5\u51E0\u4F55\u7C7B\u578B\u7684\u81EA\u76F8\u4EA4\u4E0D\u652F\u6301\u81EA\u52A8\u4FEE\u590D" };
}
function buildCandidate(sourceLayer, issueList, actions, { geographic = true } = {}) {
  const selected = new Set(actions);
  const features = [];
  const changeLog = [];
  const areaChanges = [];
  let removed = 0;
  let splitCount = 0;
  let modified = 0;
  const issuesByFid = /* @__PURE__ */ new Map();
  const layerLevelTypes = /* @__PURE__ */ new Set();
  for (const iss of issueList) {
    if (iss.layerId !== sourceLayer.lid || !selected.has(iss.type)) continue;
    if (iss.featureFid === null) {
      layerLevelTypes.add(iss.type);
      continue;
    }
    if (!issuesByFid.has(iss.featureFid)) issuesByFid.set(iss.featureFid, []);
    issuesByFid.get(iss.featureFid).push(iss);
  }
  const areaOf = (geom) => geom ? geometryArea(geom, geographic) : 0;
  for (const original of sourceLayer.features) {
    const myIssues = issuesByFid.get(original.fid) || [];
    const types = /* @__PURE__ */ new Set([...myIssues.map((i2) => i2.type), ...layerLevelTypes]);
    if (myIssues.length === 0 && layerLevelTypes.size === 0) {
      features.push(cloneFeature(original, { action: "kept", note: "\u672A\u6D89\u53CA\u6240\u9009\u68C0\u67E5\u9879" }));
      continue;
    }
    let geom = deepClone(original.geometry);
    const notes = [];
    let dupKey = null;
    if (types.has("EMPTY_GEOM")) {
      removed += 1;
      changeLog.push({ sourceIndex: original.sourceIndex, line: original.lineStart, action: "removed", reason: "\u7A7A\u51E0\u4F55", detail: myIssues[0].detail });
      continue;
    }
    if (types.has("AXIS_SWAPPED")) {
      geom = swapAxesGeom(geom);
      notes.push("\u5DF2\u4EA4\u6362 x/y \u8F74\uFF08\u7ECF\u7EAC\u5EA6\u987A\u5E8F\u7EA0\u6B63\uFF09");
    }
    if (types.has("INVALID_POLY") || types.has("REPEATED_POINT")) {
      const before = JSON.stringify(geom);
      geom = fixRingIssues(geom);
      if (JSON.stringify(geom) !== before) notes.push("\u5DF2\u95ED\u5408\u672A\u95ED\u5408\u73AF\u5E76\u79FB\u9664\u8FDE\u7EED\u91CD\u590D\u70B9");
    }
    if (types.has("SELF_INTERSECT")) {
      const res = fixSelfIntersect(geom);
      if (res.geom) {
        geom = res.geom;
        notes.push(res.note);
        splitCount += 1;
      } else notes.push(res.note || "\u81EA\u76F8\u4EA4\u65E0\u6CD5\u81EA\u52A8\u4FEE\u590D\uFF0C\u4FDD\u7559\u539F\u6837");
    }
    if (types.has("DUPLICATE")) {
      const key2 = myIssues.find((i2) => i2.dupKey)?.dupKey || stableHash(original.geometry);
      const kept = features.find((f) => f._dupKey === key2);
      if (kept) {
        removed += 1;
        changeLog.push({ sourceIndex: original.sourceIndex, line: original.lineStart, action: "removed", reason: "\u91CD\u590D\u8981\u7D20", detail: `\u4E0E\u8981\u7D20 #${kept.sourceIndex} \u91CD\u590D` });
        continue;
      }
      notes.push("\u91CD\u590D\u7EC4\u4FDD\u7559\u9996\u4E2A\uFF0C\u5176\u4F59\u79FB\u9664");
      dupKey = key2;
    }
    if (types.has("PROJECTED_AS_LL")) {
      notes.push("\u672A\u6539\u52A8\u5750\u6807\uFF1B\u8BF7\u5728\u5BFC\u51FA\u65F6\u628A CRS \u91CD\u65B0\u6307\u5B9A\u4E3A\u6B63\u786E\u7684\u6295\u5F71\u5750\u6807\u7CFB\uFF08\u5019\u9009\u526F\u672C\u53EF\u6539 CRS \u58F0\u660E\uFF09");
    }
    const beforeArea = areaOf(original.geometry);
    const afterArea = areaOf(geom);
    const changedGeom = JSON.stringify(geom) !== JSON.stringify(original.geometry);
    const nf = cloneFeature(original, {
      action: changedGeom ? "modified" : "kept",
      note: notes.join("\uFF1B") || "\u68C0\u67E5\u9879\u65E0\u9700\u51E0\u4F55\u6539\u52A8",
      newGeom: geom
    });
    if (dupKey) nf._dupKey = dupKey;
    features.push(nf);
    if (changedGeom) modified += 1;
    areaChanges.push({
      sourceIndex: original.sourceIndex,
      line: original.lineStart,
      before: beforeArea,
      after: afterArea,
      delta: afterArea - beforeArea,
      comparable: beforeArea > 0 || afterArea > 0,
      note: notes.join("\uFF1B")
    });
    changeLog.push({
      sourceIndex: original.sourceIndex,
      line: original.lineStart,
      action: changedGeom ? "modified" : "kept",
      reason: [...types].join(", "),
      detail: notes.join("\uFF1B")
    });
  }
  const candidate = {
    lid: uid("layer"),
    name: `${sourceLayer.name}__\u5019\u9009\u4FEE\u590D_${(/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace(/:/g, "")}`,
    sourceName: `${sourceLayer.name}__candidate.geojson`,
    sourceKind: "geojson",
    features: features.map(stripInternal),
    crs: sourceLayer.crs,
    crsRaw: sourceLayer.crsRaw,
    crsUser: sourceLayer.crsUser,
    crsMissing: sourceLayer.crsMissing,
    importedAt: (/* @__PURE__ */ new Date()).toISOString(),
    isCandidate: true,
    derivedFrom: sourceLayer.lid,
    lineage: {
      sourceLayer: sourceLayer.name,
      sourceFile: sourceLayer.sourceName,
      sourceCrs: sourceLayer.crs,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      actions: [...selected],
      changeLog,
      areaChanges,
      stats: { input: sourceLayer.features.length, output: features.length, removed, modified, splitCount },
      guarantee: "\u6E90\u6587\u4EF6\u4E0E\u6E90\u56FE\u5C42\u672A\u88AB\u4FEE\u6539\uFF1B\u672C\u56FE\u5C42\u4E3A\u5019\u9009\u526F\u672C"
    }
  };
  return candidate;
}
function cloneFeature(original, { action, note, newGeom }) {
  const geom = newGeom ? deepClone(newGeom) : deepClone(original.geometry);
  return {
    fid: uid("f"),
    sourceIndex: original.sourceIndex,
    id: original.id,
    properties: deepClone(original.properties),
    geometry: geom,
    originalGeometry: deepClone(original.originalGeometry),
    // 原始坐标随副本留存
    source: original.source,
    lineStart: original.lineStart,
    lineEnd: original.lineEnd,
    coordCount: original.coordCount,
    empty: isEmptyGeom(geom),
    geomHash: stableHash(geom),
    lineage: {
      action,
      note,
      sourceFid: original.fid,
      sourceLine: original.lineStart
    }
  };
}
function stripInternal(f) {
  const { _dupKey, ...rest } = f;
  return rest;
}
function candidateToGeoJson(layer) {
  const fc = {
    type: "FeatureCollection",
    name: layer.name,
    crs: layer.crs ? { type: "name", properties: { name: layer.crs } } : void 0,
    __qc_lineage: layer.lineage,
    features: layer.features.map((f) => ({
      type: "Feature",
      id: f.id,
      properties: {
        ...f.properties,
        _qc_source_index: f.sourceIndex,
        _qc_source_line: f.lineStart,
        _qc_repair: f.lineage ? f.lineage.action : void 0,
        _qc_repair_note: f.lineage ? f.lineage.note : void 0
      },
      geometry: f.geometry
    }))
  };
  return JSON.stringify(fc, null, 2);
}

// src/state.js
init_crs();
init_util();
init_geom();
var LAYER_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#6250d6"];
var state = {
  layers: [],
  // 图层（源图层 + 候选副本图层）
  mapEntries: [],
  // 地图渲染条目
  report: null,
  // runChecks 结果
  displayCrs: "EPSG:4326",
  // 地图级统一显示 CRS（仅影响渲染，原始坐标不变）
  filters: { layerId: "", severity: "", type: "", text: "" },
  selectedIssueId: null,
  selectedFid: null,
  activeTab: "issues",
  csvDraft: null
  // 待确认的 CSV 导入
};
function layerColor(index) {
  return LAYER_COLORS[index % LAYER_COLORS.length];
}
function addLayer(layer) {
  const idx = state.layers.length;
  state.layers.push(layer);
  state.mapEntries.push({
    lid: layer.lid,
    layer,
    visible: true,
    color: layer.isCandidate ? "#1baf7a" : layerColor(idx),
    displayCrs: layer.crs,
    _cache: null
  });
  refreshChecks();
}
function removeLayer(lid) {
  state.layers = state.layers.filter((l) => l.lid !== lid);
  state.mapEntries = state.mapEntries.filter((e) => e.lid !== lid);
  refreshChecks();
}
function refreshChecks() {
  state.report = runChecks(state.layers);
  return state.report;
}
function mapEntryOf(lid) {
  return state.mapEntries.find((e) => e.lid === lid);
}
function featureById(fid) {
  for (const layer of state.layers) {
    const f = layer.features.find((x) => x.fid === fid);
    if (f) return { feature: f, layer };
  }
  return null;
}
function filteredIssues() {
  const { layerId, severity, type, text } = state.filters;
  const q = text.trim().toLowerCase();
  return state.report.issues.filter((iss) => {
    if (layerId && iss.layerId !== layerId) return false;
    if (severity && iss.severity !== severity) return false;
    if (type && iss.type !== type) return false;
    if (q) {
      const hay = `${iss.label} ${iss.detail} ${iss.layerName} ${iss.lineStart ?? ""} ${iss.sourceIndex ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
async function importGeoJsonFiles(fileList) {
  const msgs = [];
  for (const file of fileList) {
    const text = await file.text();
    const { layer, warnings } = parseGeoJson(text, file.name);
    addLayer(layer);
    msgs.push(`\u5DF2\u5BFC\u5165 ${file.name}\uFF1A${layer.features.length} \u4E2A\u8981\u7D20` + (layer.crsMissing ? "\uFF08\u7F3A CRS\uFF0C\u6295\u5F71\u8F6C\u6362\u5DF2\u505C\u6B62\uFF09" : `\uFF0CCRS=${layer.crs}`));
    warnings.forEach((w) => msgs.push(`\u26A0 ${w}`));
  }
  return msgs;
}
function importCsv(text, fileName, opts) {
  const { layer, warnings } = parseCsv(text, fileName, opts);
  addLayer(layer);
  return { layer, warnings };
}
function assignCrs(lid, code) {
  const layer = state.layers.find((l) => l.lid === lid);
  if (!layer) return;
  layer.crsUser = code;
  layer.crs = code;
  layer.crsMissing = !code;
  const entry = mapEntryOf(lid);
  if (entry) entry._cache = null;
  refreshChecks();
}
function createCandidate(sourceLayerId, actionTypes, basis) {
  const source = state.layers.find((l) => l.lid === sourceLayerId);
  if (!source) throw new Error("\u627E\u4E0D\u5230\u6E90\u56FE\u5C42");
  const geographic = basis === "geo";
  const candidate = buildCandidate(source, state.report.issues, actionTypes, { geographic });
  addLayer(candidate);
  return candidate;
}
function exportCandidate(layer) {
  const text = candidateToGeoJson(layer);
  download(layer.sourceName, text, "application/geo+json");
}
function exportIssuesCsv() {
  const rows = [["\u56FE\u5C42", "\u4E25\u91CD\u5EA6", "\u95EE\u9898\u7C7B\u578B", "\u8981\u7D20\u5E8F\u53F7", "\u6E90\u8D77\u59CB\u884C", "\u6E90\u7ED3\u675F\u884C", "\u8BE6\u60C5", "\u53EF\u4FEE\u590D"]];
  for (const iss of filteredIssues()) {
    rows.push([
      iss.layerName,
      iss.severity,
      iss.label,
      iss.sourceIndex ?? "",
      iss.lineStart ?? "",
      iss.lineEnd ?? "",
      iss.detail,
      iss.repairable ? "\u662F" : "\u5426"
    ]);
  }
  download(`\u8D28\u68C0\u95EE\u9898_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, makeCsv(rows), "text/csv");
}
function crsOptions() {
  const opts = CRS_REGISTRY.map((c) => [c.code, `${c.code} \u2014 ${c.name}`]);
  for (let z = 1; z <= 60; z += 1) {
    opts.push([utmCode(z, true), `${utmCode(z, true)} \u2014 UTM ${z}N (WGS84)`]);
    opts.push([utmCode(z, false), `${utmCode(z, false)} \u2014 UTM ${z}S (WGS84)`]);
  }
  return opts;
}

// src/mapview.js
init_crs();
init_geom();
var SEVERITY_COLOR = {
  critical: "#d03b3b",
  serious: "#ec835a",
  warning: "#fab219",
  info: "#2a78d6"
};
var MapView = class {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.cb = callbacks;
    this.layers = [];
    this.view = { cx: 0, cy: 0, scale: 1 };
    this.geoMode = true;
    this.mapCrs = "EPSG:4326";
    this.highlightFid = null;
    this.hoverFid = null;
    this.hitRegions = [];
    this.dpr = window.devicePixelRatio || 1;
    this.bindEvents();
    this.resize();
  }
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.render();
  }
  setLayers(layers) {
    this.layers = [];
    this.hitRegions = [];
    this.layers = layers;
  }
  setHighlight(fid) {
    this.highlightFid = fid;
    this.render();
  }
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
    const key2 = feature.fid;
    if (entry._cache && entry._cache.mapCrs === this.mapCrs && entry._cache.fid === key2) {
      return entry._cache.geom;
    }
    const geom = transformGeometry(feature.geometry, entry.layer.crs, this.mapCrs);
    entry._cache = { fid: key2, mapCrs: this.mapCrs, geom };
    return geom;
  }
  // 坐标 -> 屏幕
  project(x, y) {
    return [
      this.w / 2 + (x - this.view.cx) * this.view.scale,
      this.h / 2 - (y - this.view.cy) * this.view.scale
    ];
  }
  unproject(px, py) {
    return [
      this.view.cx + (px - this.w / 2) / this.view.scale,
      this.view.cy - (py - this.h / 2) / this.view.scale
    ];
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
        if (b[0] < -180 || b[2] > 180 || b[1] < -90 || b[3] > 90) return false;
        if (b[2] - b[0] > 300) return false;
        return true;
      }
      const typX = Math.max(median(spanX), 1e-9);
      const typY = Math.max(median(spanY), 1e-9);
      return b[2] - b[0] <= typX * 20 && b[3] - b[1] <= typY * 20;
    });
    const use = valid.length ? valid : boxes;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const b of use) {
      minX = Math.min(minX, b[0]);
      maxX = Math.max(maxX, b[2]);
      minY = Math.min(minY, b[1]);
      maxY = Math.max(maxY, b[3]);
    }
    const pad = 40;
    const dx = Math.max(maxX - minX, 1e-9);
    const dy = Math.max(maxY - minY, 1e-9);
    const sx = (this.w - pad * 2) / dx;
    const sy = (this.h - pad * 2) / dy;
    this.view = {
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      scale: Math.min(sx, sy)
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
    const dx = Math.max(b[2] - b[0], 1e-9);
    const dy = Math.max(b[3] - b[1], 1e-9);
    this.view.cx = (b[0] + b[2]) / 2;
    this.view.cy = (b[1] + b[3]) / 2;
    this.view.scale = Math.min((this.w - pad * 2) / dx, (this.h - pad * 2) / dy, this.view.scale * 4);
    this.highlightFid = feature.fid;
    this.render();
  }
  bindEvents() {
    let drag = null;
    this.canvas.addEventListener("pointerdown", (e) => {
      drag = { x: e.offsetX, y: e.offsetY, vx: this.view.cx, vy: this.view.cy, moved: false };
      this.canvas.setPointerCapture(e.pointerId);
    });
    this.canvas.addEventListener("pointermove", (e) => {
      if (drag) {
        const dx = e.offsetX - drag.x;
        const dy = e.offsetY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
        this.view.cx = drag.vx - dx / this.view.scale;
        this.view.cy = drag.vy + dy / this.view.scale;
        this.render();
      } else {
        const hit = this.pick(e.offsetX, e.offsetY);
        this.canvas.style.cursor = hit ? "pointer" : "grab";
        if ((hit && hit.fid) !== this.hoverFid) {
          this.hoverFid = hit ? hit.fid : null;
          this.render();
          if (this.cb.onHover) this.cb.onHover(hit, { x: e.offsetX, y: e.offsetY });
        }
      }
    });
    this.canvas.addEventListener("pointerup", (e) => {
      if (drag && !drag.moved) {
        const hit = this.pick(e.offsetX, e.offsetY);
        if (hit && this.cb.onPick) this.cb.onPick(hit);
      }
      drag = null;
    });
    this.canvas.addEventListener("wheel", (e) => {
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
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--map-bg") || "#0f1620";
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
    ctx.font = "11px system-ui, sans-serif";
    for (let lon = Math.ceil(left / step) * step; lon <= right; lon += step) {
      const [x] = this.project(lon, 0);
      ctx.strokeStyle = "rgba(140,160,190,0.18)";
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.h);
      ctx.stroke();
      ctx.fillStyle = "rgba(170,185,210,0.75)";
      ctx.fillText(`${lon.toFixed(step < 1 ? 1 : 0)}\xB0E`, x + 4, this.h - 8);
    }
    for (let lat = Math.ceil(bottom / step) * step; lat <= top; lat += step) {
      const [, y] = this.project(0, lat);
      ctx.strokeStyle = "rgba(140,160,190,0.18)";
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.w, y);
      ctx.stroke();
      ctx.fillStyle = "rgba(170,185,210,0.75)";
      ctx.fillText(`${lat.toFixed(step < 1 ? 1 : 0)}\xB0N`, 6, y - 4);
    }
  }
  drawPlanarGrid() {
    const ctx = this.ctx;
    const [left, top] = this.unproject(0, 0);
    const [right, bottom] = this.unproject(this.w, this.h);
    const step = this.niceStep(this.w);
    ctx.font = "11px system-ui, sans-serif";
    for (let x = Math.ceil(left / step) * step; x <= right; x += step) {
      const [px] = this.project(x, 0);
      ctx.strokeStyle = "rgba(140,160,190,0.15)";
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, this.h);
      ctx.stroke();
      ctx.fillStyle = "rgba(170,185,210,0.7)";
      ctx.fillText(`${x.toFixed(0)} m`, px + 4, this.h - 8);
    }
    for (let y = Math.ceil(bottom / step) * step; y <= top; y += step) {
      const [, py] = this.project(0, y);
      ctx.strokeStyle = "rgba(140,160,190,0.15)";
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(this.w, py);
      ctx.stroke();
      ctx.fillStyle = "rgba(170,185,210,0.7)";
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
      const color = isHi ? "#ffd23d" : entry.color;
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
        pts.forEach((p, i2) => {
          const [x, y] = this.toScreenPath(p);
          if (i2 === 0) c.moveTo(x, y);
          else c.lineTo(x, y);
        });
      };
      region.paths.push(path);
      ctx.beginPath();
      path(ctx);
      ctx.stroke();
    };
    ctx.lineWidth = isHi ? 3 : 1.6;
    ctx.strokeStyle = color;
    ctx.fillStyle = this.hexA(color, isHover ? 0.35 : 0.18);
    if (geom.type === "Point" || geom.type === "MultiPoint") {
      const pts = geom.type === "Point" ? [geom.coordinates] : geom.coordinates;
      pts.forEach((p) => {
        const [x, y] = this.toScreenPath(p);
        region.points.push([x, y]);
        ctx.beginPath();
        ctx.arc(x, y, isHi ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.fillStyle = this.hexA(color, 0.18);
      });
      return;
    }
    if (geom.type === "LineString" || geom.type === "MultiLineString") {
      const lines = geom.type === "LineString" ? [geom.coordinates] : geom.coordinates;
      for (const line of lines) {
        for (const part of splitLineAtDateline(line)) drawLinePts(part);
      }
      return;
    }
    if (geom.type === "Polygon" || geom.type === "MultiPolygon") {
      const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
      for (const poly of polys) {
        for (const ring of poly) {
          const parts = splitLineAtDateline(ring);
          for (const part of parts) {
            const path = (c) => {
              part.forEach((p, i2) => {
                const [x, y] = this.toScreenPath(p);
                if (i2 === 0) c.moveTo(x, y);
                else c.lineTo(x, y);
              });
            };
            region.paths.push(path);
            ctx.beginPath();
            path(ctx);
            ctx.fillStyle = this.hexA(color, isHover ? 0.35 : 0.16);
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();
          }
        }
      }
      return;
    }
    if (geom.type === "GeometryCollection") {
      geom.geometries.forEach((g) => this.drawGeometry(g, color, isHi, isHover, region));
    }
  }
  drawChrome() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.w - 34, 44);
    ctx.fillStyle = "rgba(240,239,236,0.9)";
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(7, 10);
    ctx.lineTo(0, 5);
    ctx.lineTo(-7, 10);
    ctx.closePath();
    ctx.fill();
    ctx.font = "bold 11px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("N", 0, -20);
    ctx.restore();
    const step = this.niceStep(160);
    const pxLen = step * this.view.scale;
    if (pxLen > 20 && pxLen < this.w / 2) {
      ctx.strokeStyle = "rgba(240,239,236,0.85)";
      ctx.fillStyle = "rgba(240,239,236,0.85)";
      ctx.lineWidth = 2;
      const x0 = 20;
      const y0 = this.h - 24;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0 + pxLen, y0);
      ctx.moveTo(x0, y0 - 5);
      ctx.lineTo(x0, y0 + 5);
      ctx.moveTo(x0 + pxLen, y0 - 5);
      ctx.lineTo(x0 + pxLen, y0 + 5);
      ctx.stroke();
      ctx.font = "11px system-ui";
      ctx.textAlign = "left";
      const label = this.geoMode ? `${step}\xB0` : step >= 1e3 ? `${step / 1e3} km` : `${step} m`;
      ctx.fillText(label, x0, y0 - 8);
    }
    ctx.font = "11px system-ui";
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(170,185,210,0.6)";
    ctx.fillText("\u79BB\u7EBF\u6E32\u67D3 \xB7 \u65E0\u5728\u7EBF\u5E95\u56FE", this.w - 12, this.h - 10);
  }
  hexA(hex, alpha) {
    const m = hex.replace("#", "");
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
};

// src/main.js
init_util();

// src/samples.js
var SAMPLE_FILES = [
  {
    "name": "sample_4326.geojson",
    "kind": "geojson",
    "text": '{\n  "type": "FeatureCollection",\n  "name": "\u793A\u4F8B\u56FE\u5C42_4326\uFF08\u542B\u5404\u7C7B\u95EE\u9898\uFF09",\n  "crs": {\n    "type": "name",\n    "properties": {\n      "name": "EPSG:4326"\n    }\n  },\n  "features": [\n    {\n      "type": "Feature",\n      "id": "F01-\u6B63\u5E38\u9762",\n      "properties": {\n        "name": "F01-\u6B63\u5E38\u9762"\n      },\n      "geometry": {\n        "type": "Polygon",\n        "coordinates": [\n          [\n            [\n              116.3,\n              39.9\n            ],\n            [\n              116.35,\n              39.9\n            ],\n            [\n              116.35,\n              39.94\n            ],\n            [\n              116.3,\n              39.94\n            ],\n            [\n              116.3,\n              39.9\n            ]\n          ]\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F02-\u5E26\u6D1E\u9762",\n      "properties": {\n        "name": "F02-\u5E26\u6D1E\u9762"\n      },\n      "geometry": {\n        "type": "Polygon",\n        "coordinates": [\n          [\n            [\n              116.4,\n              39.9\n            ],\n            [\n              116.48,\n              39.9\n            ],\n            [\n              116.48,\n              39.96\n            ],\n            [\n              116.4,\n              39.96\n            ],\n            [\n              116.4,\n              39.9\n            ]\n          ],\n          [\n            [\n              116.43,\n              39.92\n            ],\n            [\n              116.45,\n              39.92\n            ],\n            [\n              116.45,\n              39.94\n            ],\n            [\n              116.43,\n              39.94\n            ],\n            [\n              116.43,\n              39.92\n            ]\n          ]\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F03-\u8774\u8776\u7ED3\u81EA\u76F8\u4EA4",\n      "properties": {\n        "name": "F03-\u8774\u8776\u7ED3\u81EA\u76F8\u4EA4"\n      },\n      "geometry": {\n        "type": "Polygon",\n        "coordinates": [\n          [\n            [\n              116.5,\n              39.85\n            ],\n            [\n              116.58,\n              39.92\n            ],\n            [\n              116.5,\n              39.92\n            ],\n            [\n              116.58,\n              39.85\n            ],\n            [\n              116.5,\n              39.85\n            ]\n          ]\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F04-\u672A\u95ED\u5408\u73AF",\n      "properties": {\n        "name": "F04-\u672A\u95ED\u5408\u73AF"\n      },\n      "geometry": {\n        "type": "Polygon",\n        "coordinates": [\n          [\n            [\n              116.6,\n              39.9\n            ],\n            [\n              116.66,\n              39.9\n            ],\n            [\n              116.66,\n              39.95\n            ],\n            [\n              116.6,\n              39.95\n            ]\n          ]\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F05-\u91CD\u590D\u70B9",\n      "properties": {\n        "name": "F05-\u91CD\u590D\u70B9"\n      },\n      "geometry": {\n        "type": "LineString",\n        "coordinates": [\n          [\n            116.3,\n            39.8\n          ],\n          [\n            116.36,\n            39.8\n          ],\n          [\n            116.36,\n            39.8\n          ],\n          [\n            116.4,\n            39.84\n          ]\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F06-\u7A7A\u51E0\u4F55",\n      "properties": {\n        "name": "F06-\u7A7A\u51E0\u4F55"\n      },\n      "geometry": null\n    },\n    {\n      "type": "Feature",\n      "id": "F07-\u8D8A\u754C\u70B9",\n      "properties": {\n        "name": "F07-\u8D8A\u754C\u70B9"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          116.4,\n          95\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F08-\u91CD\u590DA",\n      "properties": {\n        "kind": "\u76D1\u6D4B\u4E95",\n        "label": "\u540C\u4E00\u70B9\u4F4D"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          116.42,\n          39.88\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F09-\u91CD\u590DB",\n      "properties": {\n        "kind": "\u76D1\u6D4B\u4E95",\n        "label": "\u540C\u4E00\u70B9\u4F4D"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          116.42,\n          39.88\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F10-\u96C6\u5408\u51E0\u4F55",\n      "properties": {\n        "name": "F10-\u96C6\u5408\u51E0\u4F55"\n      },\n      "geometry": {\n        "type": "GeometryCollection",\n        "geometries": [\n          {\n            "type": "Point",\n            "coordinates": [\n              116.55,\n              39.98\n            ]\n          },\n          {\n            "type": "LineString",\n            "coordinates": [\n              [\n                116.55,\n                39.98\n              ],\n              [\n                116.6,\n                40\n              ]\n            ]\n          }\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F11-\u8DE8\u65E5\u671F\u53D8\u66F4\u7EBF",\n      "properties": {\n        "name": "F11-\u8DE8\u65E5\u671F\u53D8\u66F4\u7EBF"\n      },\n      "geometry": {\n        "type": "LineString",\n        "coordinates": [\n          [\n            177.5,\n            -18\n          ],\n          [\n            179.5,\n            -18.2\n          ],\n          [\n            -179,\n            -18.4\n          ],\n          [\n            -177,\n            -18.1\n          ]\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "F12-\u6B63\u5E38\u591A\u70B9",\n      "properties": {\n        "name": "F12-\u6B63\u5E38\u591A\u70B9"\n      },\n      "geometry": {\n        "type": "MultiPoint",\n        "coordinates": [\n          [\n            116.33,\n            39.96\n          ],\n          [\n            116.37,\n            39.97\n          ],\n          [\n            116.39,\n            39.95\n          ]\n        ]\n      }\n    }\n  ]\n}'
  },
  {
    "name": "sample_no_crs.geojson",
    "kind": "geojson",
    "text": '{\n  "type": "FeatureCollection",\n  "name": "\u793A\u4F8B\u56FE\u5C42_\u7F3A\u5750\u6807\u7CFB",\n  "features": [\n    {\n      "type": "Feature",\n      "id": "N01",\n      "properties": {\n        "name": "N01"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          121.47,\n          31.23\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "N02",\n      "properties": {\n        "name": "N02"\n      },\n      "geometry": {\n        "type": "Polygon",\n        "coordinates": [\n          [\n            [\n              121.47,\n              31.23\n            ],\n            [\n              121.5,\n              31.23\n            ],\n            [\n              121.5,\n              31.26\n            ],\n            [\n              121.47,\n              31.26\n            ],\n            [\n              121.47,\n              31.23\n            ]\n          ]\n        ]\n      }\n    }\n  ]\n}'
  },
  {
    "name": "sample_utm50n.geojson",
    "kind": "geojson",
    "text": '{\n  "type": "FeatureCollection",\n  "name": "\u793A\u4F8B\u56FE\u5C42_UTM50N\uFF08\u5E73\u9762\u7C73\uFF09",\n  "crs": {\n    "type": "name",\n    "properties": {\n      "name": "EPSG:32650"\n    }\n  },\n  "features": [\n    {\n      "type": "Feature",\n      "id": "U01-UTM\u9762",\n      "properties": {\n        "name": "U01-UTM\u9762"\n      },\n      "geometry": {\n        "type": "Polygon",\n        "coordinates": [\n          [\n            [\n              440160.8727109804,\n              4416892.772497362\n            ],\n            [\n              448746.67831862264,\n              4416892.772497362\n            ],\n            [\n              448746.67831862264,\n              4422380.055414884\n            ],\n            [\n              440160.8727109804,\n              4422380.055414884\n            ],\n            [\n              440160.8727109804,\n              4416892.772497362\n            ]\n          ]\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "U02-UTM\u70B9",\n      "properties": {\n        "name": "U02-UTM\u70B9"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          444499.80124005367,\n          4425739.6978758\n        ]\n      }\n    }\n  ]\n}'
  },
  {
    "name": "sample_swapped.geojson",
    "kind": "geojson",
    "text": '{\n  "type": "FeatureCollection",\n  "name": "\u793A\u4F8B\u56FE\u5C42_\u7ECF\u7EAC\u5EA6\u98A0\u5012",\n  "crs": {\n    "type": "name",\n    "properties": {\n      "name": "EPSG:4326"\n    }\n  },\n  "features": [\n    {\n      "type": "Feature",\n      "id": "S01-\u98A0\u5012\u70B91",\n      "properties": {\n        "name": "S01-\u98A0\u5012\u70B91"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          39.9,\n          116.3\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "S02-\u98A0\u5012\u70B92",\n      "properties": {\n        "name": "S02-\u98A0\u5012\u70B92"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          31.23,\n          121.47\n        ]\n      }\n    },\n    {\n      "type": "Feature",\n      "id": "S03-\u98A0\u5012\u70B93",\n      "properties": {\n        "name": "S03-\u98A0\u5012\u70B93"\n      },\n      "geometry": {\n        "type": "Point",\n        "coordinates": [\n          22.54,\n          114.06\n        ]\n      }\n    }\n  ]\n}'
  },
  {
    "name": "sample_points.csv",
    "kind": "csv",
    "text": "id,name,longitude,latitude,note\nC01,\u4E00\u53F7\u70B9,116.340,39.910,\u6B63\u5E38\nC02,\u4E8C\u53F7\u70B9,116.360,39.925,\u6B63\u5E38\nC03,\u4E09\u53F7\u70B9,bad,39.900,\u5750\u6807\u975E\u6570\u503C->\u7A7A\u51E0\u4F55\nC04,\u56DB\u53F7\u70B9,116.390,39.930,\u6B63\u5E38\nC05,\u91CD\u590D\u70B9,116.340,39.910,\u4E0E\u4E00\u53F7\u70B9\u91CD\u590D",
    "csvOpts": {
      "crs": "EPSG:4326"
    }
  }
];

// src/main.js
var $ = (sel) => document.querySelector(sel);
var $$ = (sel) => [...document.querySelectorAll(sel)];
var map = new MapView($("#map"), {
  onPick: (hit) => selectFeature(hit.feature.fid, { focusTab: true }),
  onHover: (hit, pos) => showMapTooltip(hit, pos)
});
var toastTimer = null;
function toast(msg, ms = 3600) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, ms);
}
function renderLayerBar() {
  const bar = $("#layer-bar");
  bar.innerHTML = "";
  state.layers.forEach((layer, idx) => {
    const entry = mapEntryOf(layer.lid);
    const chip = document.createElement("div");
    chip.className = `layer-chip${layer.isCandidate ? " candidate" : ""}`;
    chip.innerHTML = `
      <span class="dot" style="background:${entry.color}"></span>
      <label style="display:flex;align-items:center;gap:5px;cursor:pointer">
        <input type="checkbox" ${entry.visible ? "checked" : ""} data-act="toggle" />
        ${esc(layer.name)}
      </label>
      <span class="crs-tag">${layer.crs ? esc(layer.crs) : "\u65E0 CRS"}</span>
      ${layer.isCandidate ? '<span class="tag candidate-tag">\u5019\u9009\u526F\u672C</span>' : ""}
      <button data-act="export" title="\u5BFC\u51FA\u4E3A GeoJSON">\u2913</button>
      <button data-act="remove" title="\u79FB\u9664\u56FE\u5C42">\u2715</button>`;
    chip.querySelector("[data-act=toggle]").addEventListener("change", (e) => {
      entry.visible = e.target.checked;
      map.setLayers(state.mapEntries);
      map.render();
    });
    chip.querySelector("[data-act=export]").addEventListener("click", () => {
      if (layer.isCandidate) exportCandidate(layer);
      else exportPlainLayer(layer);
    });
    chip.querySelector("[data-act=remove]").addEventListener("click", () => {
      removeLayer(layer.lid);
      renderAll();
    });
    bar.appendChild(chip);
  });
  $("#map-empty").style.display = state.layers.length ? "none" : "grid";
}
function exportPlainLayer(layer) {
  const fc = {
    type: "FeatureCollection",
    name: layer.name,
    crs: layer.crs ? { type: "name", properties: { name: layer.crs } } : void 0,
    features: layer.features.map((f) => ({
      type: "Feature",
      id: f.id,
      properties: f.properties,
      geometry: f.geometry
    }))
  };
  download(`${layer.name}.geojson`, JSON.stringify(fc, null, 2), "application/geo+json");
}
function renderStats() {
  const r = state.report;
  const el = $("#stats");
  if (!r) {
    el.innerHTML = "";
    return;
  }
  const cards = [
    ["\u56FE\u5C42", state.layers.length, ""],
    ["\u8981\u7D20", r.featureCount, ""],
    ["\u4E25\u91CD", r.summary.critical, "sev-critical"],
    ["\u91CD\u8981", r.summary.serious, "sev-serious"],
    ["\u8B66\u544A/\u63D0\u793A", r.summary.warning + r.summary.info, "sev-warning"]
  ];
  el.innerHTML = cards.map(([lbl, num, cls]) => `<div class="stat ${cls}"><div class="num">${num}</div><div class="lbl">${lbl}</div></div>`).join("");
}
function renderIssueList() {
  const list = $("#issue-list");
  const issues = filteredIssues();
  if (!issues.length) {
    list.innerHTML = '<p class="muted small" style="padding:18px 4px">\u5F53\u524D\u8FC7\u6EE4\u6761\u4EF6\u4E0B\u6CA1\u6709\u95EE\u9898\u3002</p>';
    return;
  }
  list.innerHTML = issues.map((iss) => `
    <article class="issue-card ${state.selectedIssueId === iss.iid ? "selected" : ""}"
      style="border-left-color:${SEVERITY_COLOR[iss.severity]}" data-iid="${iss.iid}">
      <div class="issue-head">
        <span class="sev-badge sev-${iss.severity}">${sevText(iss.severity)}</span>
        <span class="issue-type">${esc(iss.label)}</span>
        ${iss.repairable ? '<span class="repair-flag">\u53EF\u751F\u6210\u5019\u9009\u4FEE\u590D</span>' : ""}
      </div>
      <div class="issue-meta">
        ${esc(iss.layerName)} \xB7 \u8981\u7D20 #${iss.sourceIndex ?? "\u2014"}
        \xB7 \u6E90\u884C ${iss.lineStart ?? "\u2014"}${iss.lineEnd && iss.lineEnd !== iss.lineStart ? `\u2013${iss.lineEnd}` : ""}
      </div>
      <div class="issue-detail">${esc(iss.detail)}</div>
      <div class="issue-actions">
        ${iss.featureFid ? '<button class="link-btn" data-act="locate">\u5728\u5730\u56FE\u4E0A\u5B9A\u4F4D\u56FE\u5F62</button>' : ""}
        ${iss.lineStart ? '<button class="link-btn" data-act="source">\u67E5\u770B\u539F\u59CB\u884C</button>' : ""}
        <button class="link-btn" data-act="detail">\u8BE6\u60C5\u4E0E\u5750\u6807\u8DEF\u5F84</button>
      </div>
    </article>`).join("");
  list.querySelectorAll(".issue-card").forEach((card) => {
    const iss = issues.find((x) => x.iid === card.dataset.iid);
    card.addEventListener("click", () => selectIssue(iss.iid));
    card.querySelector("[data-act=locate]")?.addEventListener("click", (e) => {
      e.stopPropagation();
      locateIssue(iss);
    });
    card.querySelector("[data-act=source]")?.addEventListener("click", (e) => {
      e.stopPropagation();
      showSourceLine(iss);
    });
    card.querySelector("[data-act=detail]")?.addEventListener("click", (e) => {
      e.stopPropagation();
      showIssueDetail(iss);
    });
  });
}
function sevText(s) {
  return { critical: "\u4E25\u91CD", serious: "\u91CD\u8981", warning: "\u8B66\u544A", info: "\u63D0\u793A" }[s] || s;
}
function renderFeatureTable() {
  const layerSel = $("#feature-layer");
  const current = layerSel.value;
  layerSel.innerHTML = state.layers.map((l) => `<option value="${l.lid}" ${current === l.lid ? "selected" : ""}>${esc(l.name)}</option>`).join("");
  const layer = state.layers.find((l) => l.lid === layerSel.value) || state.layers[0];
  const q = $("#feature-search").value.trim().toLowerCase();
  const tbody = $("#feature-table tbody");
  if (!layer) {
    tbody.innerHTML = "";
    return;
  }
  const rows = layer.features.filter((f) => {
    if (!q) return true;
    return `${f.sourceIndex} ${f.lineStart ?? ""} ${f.geometry?.type ?? ""} ${JSON.stringify(f.properties)}`.toLowerCase().includes(q);
  });
  tbody.innerHTML = rows.map((f) => {
    const issueCount = state.report.issues.filter((i2) => i2.featureFid === f.fid).length;
    const propSummary = Object.entries(f.properties).slice(0, 3).map(([k, v]) => `${esc(k)}=${esc(String(v).slice(0, 18))}`).join("\uFF0C");
    return `<tr data-fid="${f.fid}" class="${state.selectedFid === f.fid ? "selected" : ""}">
      <td class="num">#${f.sourceIndex}</td>
      <td class="num">${f.lineStart ?? "\u2014"}</td>
      <td>${f.empty ? '<span class="tag empty">\u7A7A\u51E0\u4F55</span>' : esc(f.geometry.type)}</td>
      <td class="num">${f.coordCount}</td>
      <td>${propSummary || '<span class="muted">\u2014</span>'}</td>
      <td>${issueCount ? `<span class="sev-badge sev-serious">${issueCount} \u9879\u95EE\u9898</span>` : '<span style="color:var(--good)">\u2713 \u6B63\u5E38</span>'}</td>
    </tr>`;
  }).join("");
  tbody.querySelectorAll("tr").forEach((tr) => tr.addEventListener("click", () => selectFeature(tr.dataset.fid, { focusTab: false, locate: true })));
}
var REPAIR_ACTIONS = [
  ["EMPTY_GEOM", "\u79FB\u9664\u7A7A\u51E0\u4F55", "\u7A7A\u51E0\u4F55\u4E0D\u53C2\u4E0E\u4EFB\u4F55\u4FEE\u590D\uFF0C\u76F4\u63A5\u4ECE\u5019\u9009\u526F\u672C\u79FB\u9664\u5E76\u5217\u6E05\u5355"],
  ["DUPLICATE", "\u53BB\u91CD\uFF08\u4FDD\u7559\u6BCF\u7EC4\u9996\u4E2A\uFF09", "\u51E0\u4F55\u6216\u51E0\u4F55+\u5C5E\u6027\u5B8C\u5168\u76F8\u540C\u7684\u8981\u7D20\uFF0C\u53EA\u4FDD\u7559\u7B2C\u4E00\u4E2A"],
  ["INVALID_POLY", "\u95ED\u5408\u672A\u95ED\u5408\u73AF", "\u9996\u5C3E\u70B9\u4E0D\u4E00\u81F4\u7684\u73AF\u81EA\u52A8\u95ED\u5408\uFF0C\u5E26\u6D1E\u9762\u7ED3\u6784\u4FDD\u7559"],
  ["REPEATED_POINT", "\u79FB\u9664\u8FDE\u7EED\u91CD\u590D\u70B9", "\u76F8\u90BB\u5B8C\u5168\u76F8\u540C\u7684\u5750\u6807\u70B9\u53BB\u91CD\uFF0C\u4FDD\u6301\u73AF\u95ED\u5408"],
  ["SELF_INTERSECT", "\u62C6\u5206\u8774\u8776\u7ED3\u81EA\u76F8\u4EA4\u9762", "\u5355\u4EA4\u70B9\u7684 8 \u5B57\u9762\u5728\u4EA4\u70B9\u62C6\u6210\u4E24\u4E2A\u9762\uFF1B\u590D\u6742\u591A\u4EA4\u70B9\u4EC5\u6807\u8BB0\u4E0D\u81EA\u52A8\u6539"],
  ["AXIS_SWAPPED", "\u7EA0\u6B63\u7ECF\u7EAC\u5EA6\u98A0\u5012", "\u4EA4\u6362\u6240\u6709\u5750\u6807\u7684 x/y\uFF1B\u539F\u59CB\u5750\u6807\u4ECD\u968F\u526F\u672C\u7559\u5B58"],
  ["PROJECTED_AS_LL", "\u6295\u5F71\u8BEF\u5224\u4EC5\u6807\u6CE8", "\u4E0D\u6539\u5750\u6807\uFF0C\u63D0\u793A\u91CD\u65B0\u6307\u5B9A CRS\uFF08\u9632\u6B62\u9759\u9ED8\u6539\u5199\uFF09"]
];
function renderRepairPanel() {
  const sourceLayers = state.layers.filter((l) => !l.isCandidate);
  const preferred = $("#feature-layer")?.value;
  const selector = `
    <div class="repair-row">
      <label>\u6E90\u56FE\u5C42\uFF08\u4FEE\u590D\u53EA\u751F\u6210\u526F\u672C\uFF0C\u8BE5\u56FE\u5C42\u4FDD\u6301\u4E0D\u53D8\uFF09
        <select id="repair-source">
          ${sourceLayers.length ? sourceLayers.map((l) => `<option value="${l.lid}" ${preferred === l.lid ? "selected" : ""}>${esc(l.name)}\uFF08${l.features.length} \u8981\u7D20\uFF0C${esc(l.crs || "\u65E0 CRS")}\uFF09</option>`).join("") : '<option value="">\uFF08\u8BF7\u5148\u5BFC\u5165\u6E90\u56FE\u5C42\uFF09</option>'}
        </select>
      </label>
    </div>`;
  const box = $("#repair-actions");
  box.innerHTML = selector + REPAIR_ACTIONS.map(([type, name, desc], i2) => `
    <label>
      <input type="checkbox" value="${type}" ${i2 < 5 ? "checked" : ""} />
      <span><span class="ra-name">${name}</span><br/><span class="ra-desc">${desc}</span></span>
    </label>`).join("");
}
function renderRepairResult(candidate) {
  const s = candidate.lineage.stats;
  const areaRows = candidate.lineage.areaChanges.filter((a) => a.comparable).map((a) => {
    const cls = a.delta > 0 ? "delta-pos" : a.delta < 0 ? "delta-neg" : "";
    return `<tr>
        <td class="num">#${a.sourceIndex}</td><td class="num">${a.line ?? "\u2014"}</td>
        <td class="num">${fmtArea(a.before)}</td><td class="num">${fmtArea(a.after)}</td>
        <td class="num ${cls}">${a.delta >= 0 ? "+" : ""}${fmtArea(a.delta)}</td>
        <td>${esc(a.note || "\u2014")}</td>
      </tr>`;
  }).join("");
  $("#repair-result").innerHTML = `
    <div class="result-summary">
      <h4>\u5019\u9009\u526F\u672C\u5DF2\u751F\u6210\uFF1A${esc(candidate.name)}</h4>
      <p class="small muted" style="margin:4px 0">${esc(candidate.lineage.guarantee)}</p>
      <ul>
        <li>\u8F93\u5165 ${s.input} \u4E2A\u8981\u7D20 \u2192 \u8F93\u51FA ${s.output} \u4E2A\uFF1B\u79FB\u9664 ${s.removed}\uFF0C\u4FEE\u6539 ${s.modified}\uFF0C\u62C6\u5206 ${s.splitCount}</li>
        <li>\u88AB\u79FB\u9664/\u62C6\u5206\u7684\u8981\u7D20\u89C1\u4E0B\u65B9\u6E05\u5355\u4E0E\u300C\u6EAF\u6E90\u300D\u9875</li>
      </ul>
      <button class="btn btn-primary btn-block" id="btn-export-candidate">\u5BFC\u51FA\u4FEE\u6B63\u7248 GeoJSON\uFF08\u53EF\u91CD\u65B0\u52A0\u8F7D\u590D\u68C0\uFF09</button>
    </div>
    <h4 class="small">\u9762\u79EF\u53D8\u5316\uFF08\u7403\u9762/\u5E73\u9762 m\xB2\uFF0C\u4EC5\u5217\u53EF\u6BD4\u8981\u7D20\uFF09</h4>
    <div class="table-wrap" style="max-height:260px">
      <table class="area-table">
        <thead><tr><th>\u8981\u7D20</th><th>\u6E90\u884C</th><th>\u4FEE\u590D\u524D</th><th>\u4FEE\u590D\u540E</th><th>\u53D8\u5316</th><th>\u8BF4\u660E</th></tr></thead>
        <tbody>${areaRows || '<tr><td colspan="6" class="muted">\u65E0\u9762\u79EF\u53EF\u6BD4\u7684\u6539\u52A8</td></tr>'}</tbody>
      </table>
    </div>`;
  $("#btn-export-candidate").addEventListener("click", () => {
    exportCandidate(candidate);
    toast("\u5DF2\u5BFC\u51FA\u5019\u9009\u526F\u672C\uFF1B\u6E90\u6587\u4EF6\u672A\u88AB\u4FEE\u6539\u3002\u53EF\u91CD\u65B0\u5BFC\u5165\u8BE5\u6587\u4EF6\u518D\u6B21\u8FD0\u884C\u68C0\u67E5");
  });
}
function renderLineage() {
  const view = $("#lineage-view");
  const candidates = state.layers.filter((l) => l.isCandidate);
  if (!candidates.length) {
    view.innerHTML = '<p class="muted">\u751F\u6210\u5019\u9009\u4FEE\u590D\u5E76\u91CD\u65B0\u52A0\u8F7D\u540E\uFF0C\u8FD9\u91CC\u663E\u793A\u6539\u52A8\u53EA\u4F5C\u7528\u4E8E\u526F\u672C\u7684\u5B8C\u6574\u8BC1\u636E\u94FE\u3002</p>';
    return;
  }
  view.innerHTML = candidates.map((c) => {
    const lin = c.lineage;
    const removed = lin.changeLog.filter((x) => x.action === "removed");
    const split = lin.areaChanges.filter((x) => x.note.includes("\u62C6\u5206"));
    return `<div class="lineage-card">
      <h4>${esc(c.name)} <span class="tag candidate-tag">\u5019\u9009\u526F\u672C</span></h4>
      <dl>
        <dt>\u6765\u6E90\u56FE\u5C42</dt><dd>${esc(lin.sourceLayer)}\uFF08${esc(lin.sourceFile)}\uFF09</dd>
        <dt>\u751F\u6210\u65F6\u95F4</dt><dd>${esc(lin.generatedAt)}</dd>
        <dt>\u6E90 CRS</dt><dd>${esc(lin.sourceCrs || "\u7F3A\u5931")}</dd>
        <dt>\u52A8\u4F5C</dt><dd>${lin.actions.map((a) => esc(ISSUE_TYPES[a]?.label || a)).join("\u3001")}</dd>
        <dt>\u79FB\u9664\u6E05\u5355</dt><dd>${removed.length ? removed.map((r) => `#${r.sourceIndex}(\u884C${r.line}) ${esc(r.reason)}`).join("\uFF1B") : "\u65E0"}</dd>
        <dt>\u62C6\u5206\u8981\u7D20</dt><dd>${split.length ? split.map((r) => `#${r.sourceIndex}`).join("\u3001") : "\u65E0"}</dd>
        <dt class="guarantee">\u5B89\u5168\u4FDD\u8BC1</dt><dd class="guarantee">${esc(lin.guarantee)}</dd>
      </dl>
    </div>`;
  }).join("");
}
function selectIssue(iid) {
  state.selectedIssueId = iid;
  const iss = state.report.issues.find((x) => x.iid === iid);
  if (iss?.featureFid) selectFeature(iss.featureFid, { focusTab: false, locate: false });
  renderIssueList();
}
function selectFeature(fid, { focusTab, locate } = {}) {
  state.selectedFid = fid;
  const found = featureById(fid);
  if (!found) return;
  const entry = mapEntryOf(found.layer.lid);
  if (locate && entry) entry.visible = true;
  map.setHighlight(fid);
  if (locate) map.zoomToFeature(found.feature, entry);
  if (focusTab) {
    const iss = state.report.issues.find((i2) => i2.featureFid === fid);
    if (iss) {
      switchTab("issues");
      state.selectedIssueId = iss.iid;
      renderIssueList();
    }
  }
  renderFeatureTable();
  renderLayerBar();
}
function locateIssue(iss) {
  if (!iss.featureFid) return;
  const found = featureById(iss.featureFid);
  const entry = mapEntryOf(found.layer.lid);
  entry.visible = true;
  map.setLayers(state.mapEntries);
  map.zoomToFeature(found.feature, entry);
  map.setHighlight(found.feature.fid);
  toast(`\u5B9A\u4F4D\u5230 ${found.layer.name} \u8981\u7D20 #${found.feature.sourceIndex}\uFF08\u6E90\u884C ${found.feature.lineStart ?? "\u2014"}\uFF09`);
}
function showMapTooltip(hit, pos) {
  const tip = $("#map-tooltip");
  if (!hit) {
    tip.hidden = true;
    return;
  }
  const { feature, layer } = hit.entry;
  const issues = state.report.issues.filter((i2) => i2.featureFid === feature.fid);
  const name = feature.properties.name || feature.id || `#${feature.sourceIndex}`;
  tip.innerHTML = `<b>${esc(String(name))}</b><br/>${esc(layer.name)} \xB7 ${feature.empty ? "\u7A7A\u51E0\u4F55" : esc(feature.geometry.type)}
    <br/>${issues.length ? `<span style="color:#ff9b9b">${issues.length} \u9879\u95EE\u9898</span>` : '<span style="color:#86e0b0">\u65E0\u95EE\u9898</span>'}`;
  tip.hidden = false;
  const rect = $("#map").getBoundingClientRect();
  tip.style.left = `${Math.min(rect.width - 210, (pos?.x ?? 60) + 14)}px`;
  tip.style.top = `${(pos?.y ?? 60) + 14}px`;
}
function showSourceLine(iss) {
  const found = iss.featureFid ? featureById(iss.featureFid) : null;
  $("#detail-title").textContent = `\u539F\u59CB\u884C\u5B9A\u4F4D \xB7 ${iss.layerName}`;
  $("#detail-body").innerHTML = `
    <dl class="detail-grid">
      <dt>\u6E90\u6587\u4EF6</dt><dd>${esc(found?.layer.sourceName || iss.layerName)}</dd>
      <dt>\u7269\u7406\u884C\u53F7</dt><dd>${iss.lineStart}${iss.lineEnd && iss.lineEnd !== iss.lineStart ? ` \u2013 ${iss.lineEnd}` : ""}</dd>
      <dt>\u8981\u7D20\u5E8F\u53F7</dt><dd>#${iss.sourceIndex ?? "\u2014"}</dd>
    </dl>
    <p class="small muted" style="margin-top:10px">\u4EE5\u4E0B\u4E3A\u8BE5\u8981\u7D20\u5728\u6E90\u6587\u4EF6\u5BF9\u5E94\u884C\u8303\u56F4\u5185\u7684\u5B8C\u6574 JSON\uFF08\u539F\u59CB\u5750\u6807\uFF0C\u672A\u505A\u4EFB\u4F55\u6539\u5199\uFF09\uFF1A</p>
    <pre class="coords">${esc(JSON.stringify(found?.feature.originalGeometry ?? iss.detail, null, 2))}</pre>`;
  $("#dlg-detail").showModal();
}
function showIssueDetail(iss) {
  const found = iss.featureFid ? featureById(iss.featureFid) : null;
  $("#detail-title").textContent = `${iss.label} \xB7 ${sevText(iss.severity)}`;
  $("#detail-body").innerHTML = `
    <dl class="detail-grid">
      <dt>\u56FE\u5C42</dt><dd>${esc(iss.layerName)}</dd>
      <dt>\u8981\u7D20</dt><dd>#${iss.sourceIndex ?? "\u2014"}\uFF08\u6E90\u884C ${iss.lineStart ?? "\u2014"}\uFF09</dd>
      <dt>\u95EE\u9898\u8BF4\u660E</dt><dd>${esc(iss.detail)}</dd>
      <dt>\u4FEE\u590D\u5EFA\u8BAE</dt><dd>${esc(iss.hint)}</dd>
      <dt>\u5750\u6807\u8DEF\u5F84</dt><dd>${iss.coordPath ? esc(JSON.stringify(iss.coordPath)) : "\u2014"}</dd>
      <dt>\u95EE\u9898\u5750\u6807</dt><dd>${iss.point ? esc(JSON.stringify(iss.point)) : "\u2014"}</dd>
    </dl>
    ${found ? `<p class="small muted" style="margin-top:10px">\u539F\u59CB\u51E0\u4F55\uFF1A</p><pre class="coords">${esc(JSON.stringify(found.feature.originalGeometry, null, 2))}</pre>` : ""}`;
  $("#dlg-detail").showModal();
}
function renderFilterOptions() {
  const layerSel = $("#filter-layer");
  const cur = layerSel.value;
  layerSel.innerHTML = '<option value="">\u5168\u90E8\u56FE\u5C42</option>' + state.layers.map((l) => `<option value="${l.lid}">${esc(l.name)}</option>`).join("");
  layerSel.value = cur;
  const typeSel = $("#filter-type");
  const curType = typeSel.value;
  const present = new Set(state.report.issues.map((i2) => i2.type));
  typeSel.innerHTML = '<option value="">\u5168\u90E8\u7C7B\u578B</option>' + [...present].map((t) => `<option value="${t}">${esc(ISSUE_TYPES[t].label)}</option>`).join("");
  typeSel.value = curType;
}
function switchTab(name) {
  state.activeTab = name;
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  $$(".tab-panel").forEach((p) => p.classList.toggle("active", p.dataset.panel === name));
  if (name === "features") renderFeatureTable();
  if (name === "repair") renderRepairPanel();
  if (name === "lineage") renderLineage();
}
function renderAll() {
  refreshChecks();
  state.mapEntries.forEach((e) => {
    e._cache = null;
  });
  map.setLayers(state.mapEntries);
  const geo = isGeographic(state.displayCrs);
  map.geoMode = geo;
  map.setMapCrs(state.displayCrs);
  const visibleCrs = state.mapEntries.filter((e) => e.visible).map((e) => e.layer.crs ? state.displayCrs : "\u672A\u77E5\uFF08\u7F3A CRS\uFF09");
  const modes = [...new Set(visibleCrs)];
  $("#map-mode").textContent = `\u663E\u793A\u5750\u6807\uFF1A${modes.join(" / ") || "\u2014"}`;
  map.fitToData();
  renderLayerBar();
  renderStats();
  renderFilterOptions();
  renderIssueList();
  renderFeatureTable();
  renderLineage();
}
function bindEvents() {
  $$(".tab").forEach((t) => t.addEventListener("click", () => switchTab(t.dataset.tab)));
  $("#filter-layer").addEventListener("change", (e) => {
    state.filters.layerId = e.target.value;
    renderIssueList();
  });
  $("#filter-sev").addEventListener("change", (e) => {
    state.filters.severity = e.target.value;
    renderIssueList();
  });
  $("#filter-type").addEventListener("change", (e) => {
    state.filters.type = e.target.value;
    renderIssueList();
  });
  $("#filter-text").addEventListener("input", (e) => {
    state.filters.text = e.target.value;
    renderIssueList();
  });
  $("#feature-layer").addEventListener("change", renderFeatureTable);
  $("#feature-search").addEventListener("input", renderFeatureTable);
  $("#btn-fit").addEventListener("click", () => map.fitToData());
  $("#btn-export-issues").addEventListener("click", () => {
    exportIssuesCsv();
    toast("\u95EE\u9898\u5217\u8868\u5DF2\u6309\u5F53\u524D\u8FC7\u6EE4\u6761\u4EF6\u5BFC\u51FA CSV");
  });
  $("#file-geojson").addEventListener("change", async (e) => {
    const files = [...e.target.files];
    e.target.value = "";
    for (const file of files) {
      try {
        const msgs = await importGeoJsonFiles([file]);
        msgs.forEach((m, i2) => setTimeout(() => toast(m), i2 * 400));
      } catch (err) {
        toast(`\u5BFC\u5165\u5931\u8D25 ${file.name}\uFF1A${err.message}`, 6e3);
      }
    }
    renderAll();
  });
  $("#btn-csv").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,text/csv";
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      const text = await file.text();
      openCsvDialog(file, text);
    };
    input.click();
  });
  $("#form-csv").addEventListener("submit", (e) => {
    if (e.submitter?.value !== "confirm" || !state.csvDraft) return;
    e.preventDefault();
    const { file, text } = state.csvDraft;
    const crs = $("#csv-crs").value || null;
    try {
      const { layer, warnings } = importCsv(text, file.name, {
        xColumn: Number($("#csv-x").value),
        yColumn: Number($("#csv-y").value),
        crs
      });
      state.csvDraft = null;
      $("#dlg-csv").close();
      renderAll();
      toast(`CSV \u5DF2\u5BFC\u5165\uFF1A${layer.features.length} \u4E2A\u70B9${crs ? `\uFF0CCRS=${crs}` : "\uFF0C\u672A\u6307\u5B9A CRS\uFF0C\u6295\u5F71\u8F6C\u6362\u505C\u6B62"}`);
      warnings.forEach((w, i2) => setTimeout(() => toast(`\u26A0 ${w}`, 5e3), (i2 + 1) * 500));
    } catch (err) {
      toast(`CSV \u5BFC\u5165\u5931\u8D25\uFF1A${err.message}`, 6e3);
    }
  });
  $("#btn-proj").addEventListener("click", () => {
    const opts = crsOptions();
    $("#proj-target").innerHTML = opts.map(([code, label]) => `<option value="${code}">${esc(label)}</option>`).join("");
    const missing = state.layers.filter((l) => l.crsMissing || !ensureCrs(l.crs));
    $("#proj-warn").hidden = missing.length === 0;
    $("#proj-warn").textContent = missing.length ? `\u4EE5\u4E0B\u56FE\u5C42\u7F3A CRS \u6216 CRS \u65E0\u6CD5\u8BC6\u522B\uFF0C\u5C06\u8DF3\u8FC7\u6295\u5F71\u8F6C\u6362\uFF1A${missing.map((l) => l.name).join("\u3001")}` : "";
    $("#dlg-proj").showModal();
  });
  $("#form-proj").addEventListener("submit", (e) => {
    if (e.submitter?.value !== "confirm") return;
    e.preventDefault();
    const target = $("#proj-target").value;
    let switched = 0;
    let skipped = 0;
    for (const entry of state.mapEntries) {
      if (!entry.layer.crs || !ensureCrs(entry.layer.crs)) {
        skipped += 1;
        continue;
      }
      switched += 1;
    }
    state.displayCrs = target;
    $("#dlg-proj").close();
    renderAll();
    toast(`\u663E\u793A\u6295\u5F71\u5DF2\u5207\u6362\u4E3A ${target}\uFF1A${switched} \u4E2A\u56FE\u5C42\u5DF2\u8F6C\u6362\uFF0C${skipped} \u4E2A\u56E0\u7F3A CRS \u8DF3\u8FC7\uFF1B\u539F\u59CB\u5750\u6807\u672A\u6539\u52A8`);
  });
  $("#btn-crs-assign").addEventListener("click", () => {
    $("#crs-layer").innerHTML = state.layers.map((l) => `<option value="${l.lid}">${esc(l.name)}\uFF08\u5F53\u524D\uFF1A${esc(l.crs || "\u7F3A\u5931")}\uFF09</option>`).join("") || '<option value="">\uFF08\u65E0\u56FE\u5C42\uFF09</option>';
    $("#crs-code").innerHTML = '<option value="">\u2014 \u4E0D\u6307\u5B9A \u2014</option>' + crsOptions().map(([code, label]) => `<option value="${code}">${esc(label)}</option>`).join("");
    $("#dlg-crs").showModal();
  });
  $("#form-crs").addEventListener("submit", (e) => {
    if (e.submitter?.value !== "confirm") return;
    e.preventDefault();
    const lid = $("#crs-layer").value;
    const code = $("#crs-code").value || null;
    if (lid) {
      assignCrs(lid, code);
      renderAll();
      toast(code ? `\u5DF2\u6307\u5B9A CRS=${code}\uFF08\u5750\u6807\u6570\u503C\u672A\u6539\u52A8\uFF09` : "\u5DF2\u6E05\u9664 CRS \u6307\u5B9A");
    }
    $("#dlg-crs").close();
  });
  $("#btn-build-candidate").addEventListener("click", () => {
    const sourceId = $("#repair-source")?.value;
    const source = state.layers.find((l) => l.lid === sourceId);
    if (!source) {
      toast("\u8BF7\u5148\u5BFC\u5165\u6570\u636E\u5E76\u9009\u62E9\u6E90\u56FE\u5C42");
      return;
    }
    const actions = [...$$("#repair-actions input:checked")].map((i2) => i2.value);
    if (!actions.length) {
      toast("\u8BF7\u81F3\u5C11\u52FE\u9009\u4E00\u9879\u4FEE\u590D\u52A8\u4F5C");
      return;
    }
    const basis = source.crs && !isGeographic(source.crs) ? "planar" : "geo";
    const candidate = createCandidate(source.lid, actions, basis);
    renderAll();
    renderRepairResult(candidate);
    switchTab("repair");
    toast(`\u5019\u9009\u526F\u672C\u5DF2\u751F\u6210\uFF1A\u6E90\u56FE\u5C42\u300C${source.name}\u300D\u4FDD\u6301\u4E0D\u53D8`);
  });
  $("#btn-sample").addEventListener("click", loadSamples);
}
async function openCsvDialog(file, text) {
  const { parseCsvRows: parseCsvRows2 } = await Promise.resolve().then(() => (init_parsing(), parsing_exports));
  const { rows } = parseCsvRows2(text);
  const headers = rows[0].map((h) => h.trim());
  state.csvDraft = { file, text, headers };
  $("#csv-file-name").textContent = file.name;
  $("#csv-x").innerHTML = headers.map((h, i2) => `<option value="${i2}">${esc(h)}</option>`).join("");
  $("#csv-y").innerHTML = headers.map((h, i2) => `<option value="${i2}">${esc(h)}</option>`).join("");
  const xGuess = headers.findIndex((h) => /lng|lon|long|经度|^x$/i.test(h));
  const yGuess = headers.findIndex((h) => /lat|纬度|^y$/i.test(h));
  if (xGuess >= 0) $("#csv-x").value = xGuess;
  if (yGuess >= 0) $("#csv-y").value = yGuess;
  $("#csv-crs").innerHTML = '<option value="">\u2014 \u4E0D\u6307\u5B9A\uFF08\u6295\u5F71\u8F6C\u6362\u5C06\u505C\u6B62\uFF09\u2014</option>' + crsOptions().map(([code, label]) => `<option value="${code}" ${code === "EPSG:4326" ? "selected" : ""}>${esc(label)}</option>`).join("");
  const warn = xGuess < 0 || yGuess < 0 ? "\u672A\u80FD\u81EA\u52A8\u8BC6\u522B\u7ECF\u7EAC\u5EA6\u5217\uFF0C\u8BF7\u624B\u52A8\u9009\u62E9 X/Y \u5217" : "";
  $("#csv-warn").hidden = !warn;
  $("#csv-warn").textContent = warn;
  $("#dlg-csv").showModal();
}
async function loadSamples() {
  for (const { name, kind, text, csvOpts } of SAMPLE_FILES) {
    if (kind === "geojson") {
      const { parseGeoJson: parseGeoJson2 } = await Promise.resolve().then(() => (init_parsing(), parsing_exports));
      const { layer, warnings } = parseGeoJson2(text, name);
      addLayer(layer);
      warnings.forEach((w) => toast(`\u26A0 ${w}`, 5e3));
    } else {
      importCsv(text, name, csvOpts || { crs: "EPSG:4326" });
    }
  }
  renderAll();
  toast("\u5DF2\u8F7D\u5165 5 \u4E2A\u865A\u6784\u793A\u4F8B\u56FE\u5C42\uFF08\u542B\u5168\u90E8\u68C0\u67E5\u9879\u573A\u666F\uFF09");
}
bindEvents();
renderRepairPanel();
renderAll();
