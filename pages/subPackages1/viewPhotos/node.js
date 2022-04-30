module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseMarginValue = parseMarginValue;
exports.parseBorderValue = parseBorderValue;
exports.isArray = isArray;
exports.measureText = measureText;
exports.stringifyFont = stringifyFont;
exports.parseOverflowValue = parseOverflowValue;
exports.parseStyleStr = parseStyleStr;
exports.findIndex = findIndex;
exports.forIn = forIn;
exports.downloadFile = downloadFile;
exports.parseClassName = parseClassName;
function parseMarginValue(value) {
  value = "" + value;
  var values = value.split(/\s+/);
  if (!values[0]) {
    return values;
  }
  if (!values[1]) {
    values[1] = values[0];
  }
  if (!values[2]) {
    values[2] = values[0];
  }
  if (!values[3]) {
    values[3] = values[1];
  }
  return values;
}

var rBorderWidth = /\d+[a-z]+/i;

function parseBorderValue(value) {
  var values = value.split(/\s+/);
  var hasWidth = rBorderWidth.test(value);
  var len = values.length;
  var width = void 0;
  var style = void 0;
  var color = void 0;
  switch (len) {
    case 1:
      style = values[0];
      break;
    case 2:
      if (hasWidth) {
        width = values[0];
        style = values[1];
      } else {
        style = values[1];
        color = values[1];
      }
      break;
    case 3:
      width = values[0];
      style = values[1];
      color = values[2];
      break;
    default:
      break;
  }
  return {
    width: width,
    style: style,
    color: color
  };
}

function isArray(v) {
  return Object.prototype.toString.call(v) === "[object Array]";
}

function measureText(ctx, text, font) {
  ctx.font = font;
  return ctx.measureText(text);
}

function stringifyFont(font) {
  return font["font-style"].value() + " " + font["font-variant"].value() + " " + font["font-weight"].value() + " " + font["font-stretch"].value() + " " + font["font-size"].value() + "px/" + font["line-height"].value() + " " + font["font-family"].value();
}

function parseOverflowValue(value) {
  value = "" + value;
  var values = value.split(/\s+/);
  if (!values[0]) {
    return values;
  }
  if (!values[1]) {
    values[1] = values[0];
  }
  return values;
}

function parseStyleStr() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var rtn = {};
  var parts = style.split(';');
  parts.forEach(function (part) {
    var items = part.split(':');
    var key = (items[0] || '').replace(/^\s+|\s+$/g, '');
    var value = (items[1] || '').replace(/^\s+|\s+$/g, '');
    if (key) {
      rtn[key] = value;
    }
  });
  return rtn;
}

function findIndex(arr, compare) {
  var index = -1;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (compare(arr[i])) {
      index = i;
      break;
    }
  }
  return index;
}

function forIn(obj, func) {
  Object.keys(obj).forEach(function (key) {
    func(obj[key], key);
  });
}

function downloadFile(url) {
  return new Promise(function (resolve, reject) {
    wx.downloadFile({
      url: url,
      success: function success(res) {
        if (res.statusCode === 200) {
          return resolve(res.tempFilePath);
        } else {
          return reject(new Error("download " + url + " fail"));
        }
      },
      fail: function fail(e) {
        reject(e);
      }
    });
  });
}

function parseClassName(className) {
  return className.split(/\s+/g).filter(function (name) {
    return !!name;
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.CssValue = exports.AVALIABLE_PROP = exports.FLEX_PROP = exports.BOX_PROP = exports.INHERITED_PROPERTIES = undefined;
exports.defaultCssValue = defaultCssValue;

var _cssFontParser = __webpack_require__(5);

var _cssFontParser2 = _interopRequireDefault(_cssFontParser);

var _tools = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INHERITED_PROPERTIES = exports.INHERITED_PROPERTIES = ["--*", "-ms-high-contrast-adjust", "-ms-hyphenate-limit-chars", "-ms-hyphenate-limit-lines", "-ms-hyphenate-limit-zone", "-ms-overflow-style", "-ms-scrollbar-3dlight-color", "-ms-scrollbar-arrow-color", "-ms-scrollbar-base-color", "-ms-scrollbar-darkshadow-color", "-ms-scrollbar-face-color", "-ms-scrollbar-highlight-color", "-ms-scrollbar-shadow-color", "-ms-scrollbar-track-color", "-ms-scroll-translation", "-ms-touch-select", "-moz-context-properties", "-moz-image-region", "-moz-stack-sizing", "-moz-user-input", "-moz-user-modify", "-webkit-border-before", "-webkit-border-before-color", "-webkit-border-before-style", "-webkit-border-before-width", "-webkit-overflow-scrolling", "-webkit-text-fill-color", "-webkit-text-stroke", "-webkit-text-stroke-color", "-webkit-text-stroke-width", "-webkit-touch-callout", "-webkit-user-modify", "azimuth", "block-overflow", "border-collapse", "border-spacing", "caption-side", "caret-color", "color", "color-adjust", "cursor", "direction", "empty-cells", "font", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-variation-settings", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "hanging-punctuation", "hyphens", "image-orientation", "image-rendering", "image-resolution", "letter-spacing", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "object-position", "orphans", "overflow-wrap", "paint-order", "pointer-events", "quotes", "ruby-align", "ruby-merge", "ruby-position", "scrollbar-color", "tab-size", "text-align", "text-align-last", "text-combine-upright", "text-decoration-skip", "text-decoration-skip-ink", "text-indent", "text-justify", "text-orientation", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "visibility", "white-space", "widows", "word-break", "word-spacing", "word-wrap", "writing-mode"];

var BOX_PROP = exports.BOX_PROP = {
  margin: {
    inherited: false,
    initial: ["margin-bottom", "margin-left", "margin-right", "margin-top"],
    computed: ["margin-bottom", "margin-left", "margin-right", "margin-top"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseMarginValue)(v);
      return {
        "margin-top": values[0],
        "margin-right": values[1],
        "margin-bottom": values[2],
        "margin-left": values[3]
      };
    }
  },
  "margin-left": { inherited: false, initial: "0px" },
  "margin-top": { inherited: false, initial: "0px" },
  "margin-right": { inherited: false, initial: "0px" },
  "margin-bottom": { inherited: false, initial: "0px" },
  padding: {
    inherited: false,
    initial: ["padding-bottom", "padding-left", "padding-right", "padding-top"],
    computed: ["padding-bottom", "padding-left", "padding-right", "padding-top"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseMarginValue)(v);
      return {
        "padding-top": values[0],
        "padding-right": values[1],
        "padding-bottom": values[2],
        "padding-left": values[3]
      };
    }
  },
  "padding-left": { inherited: false, initial: "0px" },
  "padding-top": { inherited: false, initial: "0px" },
  "padding-right": { inherited: false, initial: "0px" },
  "padding-bottom": { inherited: false, initial: "0px" },
  width: { inherited: false, initial: "auto" },
  height: { inherited: false, initial: "auto" },
  border: {
    inherited: false,
    initial: ["border-width", "border-style", "border-color"],
    computed: ["border-width", "border-style", "border-color"],
    parseParts: function parseParts(v) {
      return {
        "border-top": v,
        "border-right": v,
        "border-bottom": v,
        "border-left": v
      };
    }
  },
  "border-left": {
    inherited: false,
    initial: ["border-left-width", "border-left-style", "border-left-color"],
    computed: ["border-left-width", "border-left-style", "border-left-color"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseBorderValue)(v);
      return {
        "border-left-width": values.width,
        "border-left-style": values.style,
        "border-left-color": values.color
      };
    }
  },
  "border-top": {
    inherited: false,
    initial: ["border-top-width", "border-top-style", "border-top-color"],
    computed: ["border-top-width", "border-top-style", "border-top-color"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseBorderValue)(v);
      return {
        "border-top-width": values.width,
        "border-top-style": values.style,
        "border-top-color": values.color
      };
    }
  },
  "border-right": {
    inherited: false,
    initial: ["border-right-width", "border-right-style", "border-right-color"],
    computed: ["border-right-width", "border-right-style", "border-right-color"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseBorderValue)(v);
      return {
        "border-right-width": values.width,
        "border-right-style": values.style,
        "border-right-color": values.color
      };
    }
  },
  "border-bottom": {
    inherited: false,
    initial: ["border-bottom-width", "border-bottom-style", "border-bottom-color"],
    computed: ["border-bottom-width", "border-bottom-style", "border-bottom-color"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseBorderValue)(v);
      return {
        "border-bottom-width": values.width,
        "border-bottom-style": values.style,
        "border-bottom-color": values.color
      };
    }
  },
  "border-width": {
    inherited: false,
    initial: ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"],
    computed: ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseMarginValue)(v);
      return {
        "border-top-width": values[0],
        "border-right-width": values[1],
        "border-bottom-width": values[2],
        "border-left-width": values[3]
      };
    }
  },
  "border-style": {
    inherited: false,
    initial: ["border-top-style", "border-right-style", "border-bottom-style", "border-left-style"],
    computed: ["border-top-style", "border-right-style", "border-bottom-style", "border-left-style"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseMarginValue)(v);
      return {
        "border-top-style": values[0],
        "border-right-style": values[1],
        "border-bottom-style": values[2],
        "border-left-style": values[3]
      };
    }
  },
  "border-color": {
    inherited: false,
    initial: ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"],
    computed: ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseMarginValue)(v);
      return {
        "border-top-color": values[0],
        "border-right-color": values[1],
        "border-bottom-color": values[2],
        "border-left-color": values[3]
      };
    }
  },
  "border-left-style": { inherited: false, initial: "none" },
  "border-left-color": { inherited: false, initial: "transparent" },
  "border-left-width": { inherited: false, initial: "0px" },
  "border-top-style": { inherited: false, initial: "none" },
  "border-top-color": { inherited: false, initial: "transparent" },
  "border-top-width": { inherited: false, initial: "0px" },
  "border-right-style": { inherited: false, initial: "none" },
  "border-right-color": { inherited: false, initial: "transparent" },
  "border-right-width": { inherited: false, initial: "0px" },
  "border-bottom-style": { inherited: false, initial: "none" },
  "border-bottom-color": { inherited: false, initial: "transparent" },
  "border-bottom-width": { inherited: false, initial: "0px" }
};

var FLEX_PROP = exports.FLEX_PROP = {
  flex: {
    inherited: false,
    initial: ["flex-grow", "flex-shrink", "flex-basis"]
  },
  "flex-basis": {
    inherited: false,
    initial: "auto"
  },
  "flex-direction": {
    inherited: false,
    initial: "row"
  },
  "flex-flow": {
    inherited: false,
    initial: ["flex-direction", "flex-wrap"]
  },
  "flex-grow": {
    inherited: false,
    initial: "0"
  },
  "flex-shrink": {
    inherited: false,
    initial: "1"
  },
  "flex-wrap": {
    inherited: false,
    initial: "nowrap"
  }
};

var AVALIABLE_PROP = exports.AVALIABLE_PROP = Object.assign({}, BOX_PROP, {
  color: { inherited: true, initial: "#000000" },
  display: { inherited: false, initial: "initial" },
  "background-color": {
    inherited: false,
    initial: "transparent"
  },
  "border-radius": {
    inherited: false,
    initial: ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"],
    computed: ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseMarginValue)(v);
      return {
        "border-top-left-radius": values[0],
        "border-top-right-radius": values[1],
        "border-bottom-right-radius": values[2],
        "border-bottom-left-radius": values[3]
      };
    }
  },
  "border-top-left-radius": {
    inherited: false,
    initial: "0px"
  },
  "border-top-right-radius": {
    inherited: false,
    initial: "0px"
  },
  "border-bottom-left-radius": {
    inherited: false,
    initial: "0px"
  },
  "border-bottom-right-radius": {
    inherited: false,
    initial: "0px"
  },
  "box-sizing": {
    inherited: false,
    initial: "content-box"
  },
  font: {
    inherited: true,
    initial: ["font-style", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"],
    computed: ["font-style", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"],
    parseParts: function parseParts(v) {
      var parts = (0, _cssFontParser2.default)(v);
      if (parts["font-family"]) {
        parts["font-family"] = parts["font-family"].join(",");
      }
      return parts;
    }
  },
  "font-style": {
    media: "visual",
    inherited: true,
    initial: "normal"
  },
  "font-variant": {
    inherited: true,
    initial: "normal"
  },
  "font-weight": { inherited: true, initial: "normal" },
  "font-stretch": {
    inherited: true,
    initial: "normal"
  },
  "font-size": { inherited: true, initial: "16px" },
  "line-height": {
    inherited: true,
    initial: "1.2"
  },
  "font-family": {
    inherited: true,
    initial: "PingFang SC"
  },
  "text-align": {
    inherited: true,
    initial: "left"
  },
  position: {
    inherited: false,
    initial: "static"
  },
  overflow: {
    inherited: false,
    initial: ["overflow-x", "overflow-y"],
    computed: ["overflow-x", "overflow-y"],
    parseParts: function parseParts(v) {
      var values = (0, _tools.parseOverflowValue)(v);
      return {
        "overflow-x": values[0],
        "overflow-y": values[1]
      };
    }
  },
  "overflow-x": {
    inherited: false,
    initial: "visible"
  },
  "overflow-y": {
    inherited: false,
    initial: "visible"
  },
  top: {
    inherited: false,
    initial: "auto"
  },
  left: {
    inherited: false,
    initial: "auto"
  },
  right: {
    inherited: false,
    initial: "auto"
  },
  bottom: {
    inherited: false,
    initial: "auto"
  },
  "z-index": {
    inherited: false,
    initial: "0"
  }
});

var rCssNumberValue = /^(-?[\d.]+)\s*([a-z%]*)$/i;

function pFloat(v) {
  v = parseFloat(v);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(v)) {
    v = 0;
  }
  return v;
}

var CssValue = exports.CssValue = function () {
  function CssValue(v) {
    _classCallCheck(this, CssValue);

    if (v._v) {
      v = v._v;
    }
    this._v = v.replace(/^\s+|\s+$/g, "");
    var match = rCssNumberValue.exec(v);
    if (match) {
      this._value = parseFloat(match[1]);
      this.unit = match[2];
    } else {
      this._value = v.replace(/^\s+|\s+$/g, "");
    }
  }

  CssValue.prototype.isAbsolute = function isAbsolute() {
    return typeof this._value === "number" && this.unit !== "%";
  };

  CssValue.prototype.isPercentage = function isPercentage() {
    return this.unit === "%" && typeof this._value === "number";
  };

  // transform unit


  CssValue.prototype.value = function value() {
    return this._value;
  };

  CssValue.prototype.plus = function plus() {
    var rtn = pFloat(this._value);
    var items = [].slice.call(arguments);
    items.forEach(function (item) {
      if (item instanceof CssValue) {
        rtn += pFloat(item.value());
      }
    });
    return new CssValue("" + rtn + this.unit);
  };

  CssValue.prototype.minus = function minus() {
    var rtn = pFloat(this._value);
    var items = [].slice.call(arguments);
    items.forEach(function (item) {
      if (item instanceof CssValue) {
        rtn -= pFloat(item.value());
      }
    });
    return new CssValue("" + rtn + this.unit);
  };

  CssValue.prototype.divide = function divide(target) {
    if (target instanceof CssValue) {
      target = target.value();
    }
    return new CssValue("" + this._value / target + this.unit);
  };

  CssValue.prototype.clone = function clone() {
    return new CssValue(this._v);
  };

  return CssValue;
}();

CssValue.min = function () {
  var items = [].slice.call(arguments);
  var value = void 0;
  items.forEach(function (item) {
    if (!value || item.minus(value).value() < 0) {
      value = item;
    }
  });
  return value;
};

CssValue.max = function () {
  var items = [].slice.call(arguments);
  var value = void 0;
  items.forEach(function (item) {
    if (!value || item.minus(value).value() > 0) {
      value = item;
    }
  });
  return value;
};

function defaultCssValue(prop) {
  if (!AVALIABLE_PROP[prop]) {
    return new CssValue("initial");
  }
  var initial = AVALIABLE_PROP[prop].initial;
  if (typeof initial === "string") {
    return new CssValue(initial);
  } else if ((0, _tools.isArray)(initial)) {
    return initial.reduce(function (res, v) {
      return new CssValue(res ? res + " " + defaultCssValue(v)._v : defaultCssValue(v)._v);
    }, "");
  }
  return new CssValue("initial");
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _node = __webpack_require__(3);

Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_node).default;
  }
});

var _canvas = __webpack_require__(10);

Object.defineProperty(exports, "Canvas", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_canvas).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _setValue = __webpack_require__(4);

var _setValue2 = _interopRequireDefault(_setValue);

var _css = __webpack_require__(1);

var _html = __webpack_require__(6);

var _htmlparser = __webpack_require__(7);

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _flow = __webpack_require__(9);

var _flow2 = _interopRequireDefault(_flow);

var _tools = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(name, props) {
    var _this = this;

    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Node);

    if ((typeof name === "undefined" ? "undefined" : _typeof(name)) === "object") {
      this.nodeName = name.nodeName;
      this.text = name.text;
      this.type = name.text ? "text" : name.type;
      this.props = name.props || {};
      children = name.childNodes || [];
    } else if (typeof props === "string") {
      this.nodeName = name;
      this.text = props;
      this.type = "text";
      this.props = children || {};
      children = arguments[3] || [];
    } else {
      this.nodeName = name;
      this.props = props || {};
    }
    this.parentNode = null;
    this.previousSibling = null;
    this.nextSibling = null;
    this.childNodes = [];
    this._posRelativeToParent = {
      left: new _css.CssValue("0px"),
      top: new _css.CssValue("0px")
    };
    this._style = {};
    this._box = {
      border: {
        left: {
          width: (0, _css.defaultCssValue)("border-left-width"),
          style: (0, _css.defaultCssValue)("border-left-style"),
          color: (0, _css.defaultCssValue)("border-left-color")
        },
        top: {
          width: (0, _css.defaultCssValue)("border-top-width"),
          style: (0, _css.defaultCssValue)("border-top-style"),
          color: (0, _css.defaultCssValue)("border-top-color")
        },
        right: {
          width: (0, _css.defaultCssValue)("border-right-width"),
          style: (0, _css.defaultCssValue)("border-right-style"),
          color: (0, _css.defaultCssValue)("border-right-color")
        },
        bottom: {
          width: (0, _css.defaultCssValue)("border-bottom-width"),
          style: (0, _css.defaultCssValue)("border-bottom-style"),
          color: (0, _css.defaultCssValue)("border-bottom-color")
        }
      },
      padding: {
        left: (0, _css.defaultCssValue)("padding-left"),
        top: (0, _css.defaultCssValue)("padding-top"),
        right: (0, _css.defaultCssValue)("padding-right"),
        bottom: (0, _css.defaultCssValue)("padding-bottom")
      },
      margin: {
        left: (0, _css.defaultCssValue)("margin-left"),
        top: (0, _css.defaultCssValue)("margin-top"),
        right: (0, _css.defaultCssValue)("margin-right"),
        bottom: (0, _css.defaultCssValue)("margin-bottom")
      },
      width: (0, _css.defaultCssValue)("width"),
      height: (0, _css.defaultCssValue)("height")
    };
    children.forEach(function (node) {
      if (node instanceof Node) {
        _this.appendChild(node);
      } else {
        _this.appendChild(new Node(node));
      }
    });
    if (_typeof(this.props.style) !== "object") {
      this.props.style = (0, _tools.parseStyleStr)(this.props.style);
    }
    (0, _tools.forIn)(this.props.style, function (value, key) {
      _this.style(key, value);
    });
  }

  Node.prototype.insertBefore = function insertBefore(node, target) {
    if (this.isTextNode() || node._isEmptyText()) {
      return this;
    }
    node._unMount();
    var index = this._childIndex(target);
    this._insert(index - 1, node);
    return node;
  };

  Node.prototype.insertAfter = function insertAfter(node, target) {
    if (this.isTextNode() || node._isEmptyText()) {
      return this;
    }
    node._unMount();
    var index = this._childIndex(target);
    this._insert(index, node);
    return node;
  };

  Node.prototype.appendChild = function appendChild(node) {
    if (this.isTextNode() || node._isEmptyText()) {
      return this;
    }
    node._unMount();
    var index = this.childNodes.length - 1;
    this._insert(index, node);
    return node;
  };

  Node.prototype.cloneNode = function cloneNode(deep) {
    if (!deep) {
      return new Node(this.nodeName, this.text || this.props, []);
    } else {
      return new Node(this.nodeName, this.text || this.props, this.childNodes.map(function (node) {
        return node.cloneNode(deep);
      }));
    }
  };

  Node.prototype.removeChild = function removeChild(node) {
    if (this.isTextNode() || node._isEmptyText()) {
      return this;
    }
    var index = this._childIndex(node);
    if (index > -1) {
      node._unMount();
    }
    return node;
  };

  Node.prototype.getElementById = function getElementById(id) {
    var node = void 0;
    this.trevel(function (n) {
      if (n.props.id === id) {
        node = n;
        return true;
      }
      return false;
    }, true);
    return node;
  };

  Node.prototype.getElementsByClassName = function getElementsByClassName(className) {
    var eles = [];
    this.trevel(function (n) {
      if ((0, _tools.parseClassName)(n.props.class).indexOf(className) > -1) {
        eles.push(n);
      }
    }, true);
    return eles;
  };

  Node.prototype.getElementsByTagName = function getElementsByTagName(tagName) {
    var eles = [];
    this.trevel(function (n) {
      if (n.nodeName === tagName) {
        eles.push(n);
      }
    }, true);
    return eles;
  };

  Node.prototype.relativePostion = function relativePostion() {
    var position = this.style('position').value();
    var relativeNode = this._relativeNode();
    if (position === 'static') {
      return this._posRelativeToParent;
    }
    var top = this.style("top");
    var right = this.style("right");
    var bottom = this.style("bottom");
    var left = this.style("left");
    var fontSize = this.style("font-size").value();

    if (top.unit === "%" && relativeNode) {
      top = new _css.CssValue(top.value() * relativeNode.style("height").value() / 100 + "px");
    }
    if (top.unit === "em" && relativeNode) {
      top = new _css.CssValue(top.value() * fontSize + "px");
    }

    if (bottom.unit === "%" && relativeNode) {
      bottom = new _css.CssValue(bottom.value() * relativeNode.style("height").value() / 100 + "px");
    }
    if (bottom.unit === "em" && relativeNode) {
      bottom = new _css.CssValue(bottom.value() * fontSize + "px");
    }

    if (left.unit === "%" && relativeNode) {
      left = new _css.CssValue(left.value() * relativeNode.style("width").value() / 100 + "px");
    }
    if (left.unit === "em" && relativeNode) {
      left = new _css.CssValue(left.value() * fontSize + "px");
    }

    if (right.unit === "%" && relativeNode) {
      right = new _css.CssValue(right.value() * relativeNode.style("width").value() / 100 + "px");
    }
    if (right.unit === "em" && relativeNode) {
      right = new _css.CssValue(right.value() * fontSize + "px");
    }

    if (position === 'relative') {
      // eslint-disable-next-line no-empty
      if (top.isAbsolute()) {} else if (bottom.isAbsolute() && relativeNode) {
        top = new _css.CssValue("-" + bottom.value() + "px");
      } else {
        top = new _css.CssValue("0px");
      }
      // eslint-disable-next-line no-empty
      if (left.isAbsolute()) {} else if (right.isAbsolute()) {
        left = new _css.CssValue("-" + right.value() + "px");
      } else {
        left = new _css.CssValue("0px");
      }
      return {
        top: this._posRelativeToParent.top.minus(top),
        left: this._posRelativeToParent.left.minus(left)
      };
    } else {
      // eslint-disable-next-line no-empty
      if (top.isAbsolute()) {} else if (bottom.isAbsolute() && relativeNode) {
        top = relativeNode.boxHeight().minus(bottom.plus(this._boxHeight()));
      } else {
        top = new _css.CssValue("0px");
      }
      // eslint-disable-next-line no-empty
      if (left.isAbsolute()) {} else if (right.isAbsolute()) {
        left = relativeNode.boxWidth().minus(right.plus(this._boxWidth()));
      } else {
        left = new _css.CssValue("0px");
      }

      return {
        top: top,
        left: left
      };
    }
  };

  Node.prototype.rootPosition = function rootPosition() {
    var top = new _css.CssValue("0px");
    var left = new _css.CssValue("0px");
    var position = this.style('position').value();
    var parentNode = this._relativeNode();
    var relativePos = this.relativePostion();
    top = top.plus(relativePos.top);
    left = left.plus(relativePos.left);
    while (parentNode) {
      var box = parentNode._box;
      if (position !== 'absolute' && position !== 'fixed') {
        top = box.border.top.width.plus(box.margin.top).plus(box.padding.top).plus(top);
        left = box.border.left.width.plus(box.margin.left).plus(box.padding.left).plus(left);
      }
      var _relativePos = parentNode.relativePostion();
      top = top.plus(_relativePos.top);
      left = left.plus(_relativePos.left);
      position = parentNode.style('position').value();
      parentNode = parentNode._relativeNode();
    }
    return {
      top: top,
      left: left
    };
  };

  Node.prototype.setStyle = function setStyle(name, value) {
    this.props.style[name] = value;
    this.style(name, value);
  };

  Node.prototype.style = function style(name, value) {
    var _this2 = this;

    if ((typeof name === "undefined" ? "undefined" : _typeof(name)) === "object") {
      (0, _tools.forIn)(name, function (v, k) {
        _this2.style(k, v);
      });
      return this;
    }
    if (value !== undefined) {
      name = name.toLowerCase().replace(/^\s+|\s+$/g, "");
      value = new _css.CssValue(value);
      var propDef = _css.AVALIABLE_PROP[name];
      if (!propDef) {
        this._logUnsupportCssProp(name);
      }
      if (propDef && propDef.parseParts) {
        var parts = propDef.parseParts(value._v);
        (0, _tools.forIn)(parts, function (v, k) {
          _this2.style(k, v);
        });
      } else if (_css.BOX_PROP[name]) {
        this._changeBox(name, value);
      }
      this._setStyle(name, value);
      return this;
    }
    var v = this._getStyle(name);
    if (v === undefined && _css.INHERITED_PROPERTIES.indexOf(name) > -1 && this.parentNode) {
      name = name.toLowerCase().replace(/^\s+|\s+$/g, "");
      if (!_css.AVALIABLE_PROP[name]) {
        this._logUnsupportCssProp(name);
      }
      return this.parentNode.style(name);
    }
    v = v || (0, _css.defaultCssValue)(name);
    if (v instanceof _css.CssValue && v.value() === "inherit" && this.parentNode) {
      return this.parentNode.style(name);
    }
    return v;
  };

  Node.prototype.isTextNode = function isTextNode() {
    return this.type === "text";
  };

  Node.prototype.isStaticNode = function isStaticNode() {
    return ['static'].indexOf(this.style("position").value()) > -1;
  };

  Node.prototype.textContent = function textContent() {
    if (this.isTextNode()) {
      return this.text;
    } else {
      return this.childNodes.map(function (node) {
        return node.textContent();
      }).join("");
    }
  };

  Node.prototype.lookUp = function lookUp(func, self) {
    var stop = false;
    if (self) {
      stop = func(this);
    }
    if (!stop && this.parentNode) {
      this.parentNode.lookUp(func, true);
    }
  };

  Node.prototype.trevel = function trevel(func, self) {
    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var stop = false;
    if (self) {
      stop = func(this);
    }
    if (!stop) {
      this.childNodes.forEach(function (node) {
        node.trevel(func, self, hooks);
      });
      if (hooks.afterTrevelChildren) {
        hooks.afterTrevelChildren(this);
      }
    }
  };

  Node.prototype.layout = function layout(ctx) {
    var _this3 = this;

    var root = void 0;
    return this.loadResource().then(function () {
      _this3.lookUp(function (node) {
        if (!node.parentNode) {
          root = node;
          return true;
        }
        return false;
      }, true);
      if (root) {
        root._layout(ctx);
      }
    });
  };

  Node.prototype.wxLoadImage = function wxLoadImage(src) {
    return new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: src,
        success: function success(res) {
          res.src = res.path;
          resolve(res);
        },
        fail: function fail(e) {
          reject(e);
        }
      });
    });
  };

  Node.prototype.loadImage = function loadImage(src) {
    if (typeof wx !== 'undefined') {
      return this.wxLoadImage(src);
    }
    throw new Error('node.loadImage() not implement');
  };

  Node.prototype.loadResource = function loadResource() {
    var _this4 = this;

    var tasks = [];
    this.trevel(function (node) {
      if (node.nodeName === "img" && node.props.src && !node._resource) {
        tasks.push({
          type: 'img',
          src: node.props.src,
          node: node
        });
      }
    }, true);
    return Promise.all(tasks.map(function (task) {
      return _this4.loadImage(task.src);
    })).then(function (results) {
      results.forEach(function (res, index) {
        tasks[index].node._resource = res;
      });
      return results;
    });
  };

  Node.prototype._layout = function _layout(ctx) {
    var _this5 = this;

    if (this.isTextNode()) {
      return;
    }
    this._absolutes = [];
    var isBlockNode = this._isBlockNode();
    var boxSizing = this.style("box-sizing").value();
    var originWidth = this.props.style.width || "";
    var originHeight = this.props.style.height || "";
    var cssWidth = originWidth ? new _css.CssValue(originWidth) : (0, _css.defaultCssValue)("width");
    var cssHeight = originHeight ? new _css.CssValue(originHeight) : (0, _css.defaultCssValue)("height");
    var widthComputed = false;
    var heightComputed = false;

    if (cssWidth.isAbsolute()) {
      if (boxSizing === "border-box") {
        cssWidth = cssWidth.minus(this._box.padding.left).minus(this._box.padding.right);
      }
      widthComputed = true;
    } else if (isBlockNode && this.parentNode) {
      var parentCssWidth = this.parentNode.style("width");
      if (parentCssWidth.isAbsolute()) {
        if (cssWidth.isPercentage()) {
          cssWidth = new _css.CssValue("" + parentCssWidth.value() * cssWidth.value() / 100 + parentCssWidth.unit);
        } else {
          cssWidth = new _css.CssValue("" + parentCssWidth.value() + parentCssWidth.unit).minus(this._boxWidth(true));
        }
        if (boxSizing === "border-box") {
          cssWidth = cssWidth.minus(this._box.padding.left).minus(this._box.padding.right);
        }
        widthComputed = true;
      }
    } else if (this.parentNode && cssWidth.isPercentage()) {
      var _parentCssWidth = this.parentNode.style("width");
      if (_parentCssWidth.isAbsolute()) {
        cssWidth = new _css.CssValue("" + _parentCssWidth.value() * cssWidth.value() / 100 + _parentCssWidth.unit);
        if (boxSizing === "border-box") {
          cssWidth = cssWidth.minus(this._box.padding.left).minus(this._box.padding.right);
        }
        widthComputed = true;
      }
    }

    if (cssHeight.isAbsolute()) {
      if (boxSizing === "border-box") {
        cssHeight = cssHeight.minus(this._box.padding.top).minus(this._box.padding.bottom);
      }
      heightComputed = true;
    } else if (cssHeight.isPercentage() && this.parentNode) {
      var percent = cssHeight.value();
      var parentCssHeight = this.parentNode.style("height");
      if (parentCssHeight.isAbsolute()) {
        cssHeight = new _css.CssValue("" + parentCssHeight.value() * percent / 100 + parentCssHeight.unit);
        if (boxSizing === "border-box") {
          cssHeight = cssHeight.minus(this._box.padding.top).minus(this._box.padding.bottom);
        }
        heightComputed = true;
      }
    }

    if (this.isImageNode()) {
      if (!widthComputed) {
        if (this.parentNode && this.parentNode.style('width').isAbsolute()) {
          cssWidth = new _css.CssValue(Math.min(this._resource.width, this.parentNode.style('width')) + "px");
        } else {
          cssWidth = new _css.CssValue(this._resource.width + "px");
        }
        widthComputed = true;
      }
      if (!heightComputed) {
        cssHeight = new _css.CssValue(cssWidth.value() * this._resource.height / this._resource.width + "px");
        heightComputed = true;
      }
    }

    if (widthComputed) {
      this.style("width", cssWidth);
      this._box.width = cssWidth;
      if (this.parentNode && isBlockNode) {
        var remainingHorizontalSpace = this.parentNode._box.width.minus(this._boxWidth());
        var autoSize = new _css.CssValue("0px");
        var autoCount = 0;
        var isMarginLeftAuto = false;
        var isMarginRightAuto = false;
        if (this._box.margin.left.value() === "auto") {
          isMarginLeftAuto = true;
          autoCount++;
        }
        if (this._box.margin.right.value() === "auto") {
          isMarginRightAuto = true;
          autoCount++;
        }
        if (autoCount > 0) {
          autoSize = remainingHorizontalSpace.divide(autoCount);
        }
        if (isMarginLeftAuto) {
          this._changeBox("margin-left", autoSize.clone());
        }
        if (isMarginRightAuto) {
          this._changeBox("margin-right", autoSize.clone());
        }
      }
    }

    if (heightComputed) {
      this.style("height", cssHeight);
    }

    this.childNodes.forEach(function (childNode) {
      childNode._layout(ctx);
    });

    this._flows = new _flow2.default(this);
    this.childNodes.forEach(function (node) {
      var position = node.style("position").value();
      if (position === "static" || position === "relative" || !node.parentNode) {
        _this5._flows.addNode(node, ctx);
        return;
      }
      var relativeNode = void 0;
      node.lookUp(function (n) {
        relativeNode = n;
        if (position === "absolute" && ["relative", "absolute", "fixed"].indexOf(n.style("position").value()) > -1) {
          return true;
        }
        return false;
      }, false);
      relativeNode._absolutes.push(node);
    });

    if (!widthComputed) {
      cssWidth = this._flows.getWidth();
      this.style("width", cssWidth);
      widthComputed = true;
    }

    if (!heightComputed) {
      cssHeight = this._flows.getHeight();
      this.style("height", cssHeight);
      heightComputed = true;
    }
  };

  Node.prototype._initflowInfo = function _initflowInfo() {
    return {
      direction: "row",
      justifyContent: "start",
      alignItems: "start",
      nodes: []
    };
  };

  Node.prototype._relativeNode = function _relativeNode() {
    var position = this.style('position').value();
    if (position === 'static' || position === 'relative') {
      return this.parentNode;
    }
    var node = void 0;
    this.lookUp(function (n) {
      node = n;
      if (!n.isStaticNode()) {
        return true;
      }
      return false;
    }, false);
    return node;
  };

  Node.prototype.boxWidth = function boxWidth() {
    return this._boxWidth();
  };

  Node.prototype._boxWidth = function _boxWidth(skipContent) {
    var box = this._box;
    var width = box.border.left.width.plus(box.margin.left).plus(box.padding.left).plus(box.padding.right).plus(box.margin.right).plus(box.border.right.width);
    if (skipContent) {
      return width;
    }
    return width.plus(box.width);
  };

  Node.prototype.boxHeight = function boxHeight() {
    return this._boxHeight();
  };

  Node.prototype._boxHeight = function _boxHeight(skipContent) {
    var box = this._box;
    var height = box.border.top.width.plus(box.margin.top).plus(box.padding.top).plus(box.padding.bottom).plus(box.margin.bottom).plus(box.border.bottom.width);
    if (skipContent) {
      return height;
    }
    return height.plus(box.height);
  };

  Node.prototype._getStyle = function _getStyle(name) {
    var _this6 = this;

    var propDesc = _css.AVALIABLE_PROP[name];
    if (propDesc && propDesc.computed) {
      return propDesc.computed.reduce(function (rtn, v) {
        rtn[v] = _this6.style(v);
        return rtn;
      }, {});
    }
    var style = this._style[name];
    if (style) {
      style = style.clone();
    }
    return style;
  };

  Node.prototype._setStyle = function _setStyle(name, value) {
    this._style[name] = value;
  };

  Node.prototype._changeBox = function _changeBox(prop, cssValue) {
    this._setStyle(prop, cssValue);
    (0, _setValue2.default)(this._box, prop.replace(/-/g, "."), cssValue);
  };

  Node.prototype.isImageNode = function isImageNode() {
    return this.nodeName === "img";
  };

  Node.prototype._isEmptyText = function _isEmptyText() {
    if (this.type === 'text' && /^[\s↵ ]+$/.test(this.text)) {
      return true;
    }
    return false;
  };

  Node.prototype._isBlockNode = function _isBlockNode() {
    var cssDisplay = this.style("display").value();
    if (cssDisplay === "inline-block" || cssDisplay === "inline-flex" || cssDisplay === "inline") {
      return false;
    }
    if (cssDisplay === 'block') {
      return true;
    }
    if (_html.BLOCK_TAGS.indexOf(this.nodeName) > -1) {
      return true;
    }
    return false;
  };

  Node.prototype._isFlexChild = function _isFlexChild() {
    return this.parentNode ? this.parentNode._isFlexContainer() : false;
  };

  Node.prototype._isFlexContainer = function _isFlexContainer() {
    var cssDisplay = this.style("display").value();
    if (cssDisplay === "flex") {
      return true;
    }
    return false;
  };

  Node.prototype._isFlex = function _isFlex() {
    return this._isFlexContainer() || this.parentNode ? this.parentNode._isFlexContainer() : false;
  };

  Node.prototype._insert = function _insert(index, node) {
    node.parentNode = this;
    var prev = this.childNodes[index] || null;
    var next = this.childNodes[index + 1] || null;
    if (prev) {
      prev.nextSibling = node;
    }
    if (next) {
      next.previousSibling = node;
    }
    node.previousSibling = this.childNodes[index] || null;
    node.nextSibling = next;
    this.childNodes.splice(index + 1, 0, node);
  };

  Node.prototype._childIndex = function _childIndex(child) {
    return (0, _tools.findIndex)(this.childNodes, function (node) {
      return node === child;
    });
  };

  Node.prototype._unMount = function _unMount() {
    if (this.parentNode) {
      var index = this.parentNode._childIndex(this);
      if (index > -1) {
        this.parentNode.children.splice(index, 1);
      }
    }
    var prev = this.previousSibling;
    var next = this.nextSibling;
    if (prev) {
      prev.nextSibling = next;
    }
    if (next) {
      next.previousSibling = prev;
    }
  };

  Node.prototype._nodeId = function _nodeId() {
    var id = this.nodeName;
    if (this.props.id) {
      id += "#" + this.props.id;
    }
    if (this.props.class) {
      id += this.props.class.split(/\s+/g).join(".");
    }
    return id;
  };

  Node.prototype._nodePath = function _nodePath() {
    var path = "";
    this.lookUp(function (node) {
      if (node.parentNode) {
        path = "[" + node.parentNode._childIndex(node) + "] > " + node._nodeId() + path;
      } else {
        path = node._nodeId() + path;
      }
    }, true);
    return path;
  };

  Node.prototype._logUnsupportCssProp = function _logUnsupportCssProp(prop) {
    //console.warn(this._nodePath() + ": unsupport css property: " + prop);
    //console.warn("css property support list: ", Object.keys(_css.AVALIABLE_PROP));
  };

  Node.prototype._logDisplaySupportList = function _logDisplaySupportList() {
    //console.warn(this._nodePath() + ": display support list: block, inline-block, flex");
  };

  return Node;
}();

exports.default = Node;


function transformNode(node) {
  node.nodeName = node.name;
  node.props = node.attribs;
  node.text = node.type === "text" ? node.data : "";
  node.childNodes = node.children;
  (node.children || []).forEach(function (node) {
    transformNode(node);
  });
}

Node.fromHtml = function (html) {
  html = html.replace(/^\s+|\s+$/g, '');
  var handler = new _htmlparser2.default.DefaultHandler(function (error, dom) {
    if (error) {
      console.error(error);
    } else {
      dom.forEach(function (node) {
        transformNode(node);
      });
    }
  });
  var parser = new _htmlparser2.default.Parser(handler);
  parser.parseComplete(html);
  return new Node(handler.dom[0]);
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("set-value");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("css-font-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var BLOCK_TAGS = exports.BLOCK_TAGS = ["address", "fieldset", "li", "article", "figcaption", "main", "aside", "blockquote", "details", "dialog", "dd", "div", "dl", "dt", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "nav", "ol", "p", "pre", "section", "table", "ul"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, __filename, __dirname) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable */
/***********************************************
Copyright 2010, 2011, Chris Winberry <chris@winberry.net>. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
***********************************************/
/* v1.7.6 */

(function () {
  function runningInNode() {
    return  true && ( false ? undefined : _typeof(exports)) == "object" && ( false ? undefined : _typeof(module)) == "object" && typeof __filename == "string" && typeof __dirname == "string";
  }

  if (!runningInNode()) {
    if (!this.Tautologistics) this.Tautologistics = {};else if (this.Tautologistics.NodeHtmlParser) return; //NodeHtmlParser already defined!
    this.Tautologistics.NodeHtmlParser = {};
    exports = this.Tautologistics.NodeHtmlParser;
  }

  //Types of elements found in the DOM
  var ElementType = {
    Text: "text", //Plain text
    Directive: "directive", //Special tag <!...>
    Comment: "comment", //Special tag <!--...-->
    Script: "script", //Special tag <script>...</script>
    Style: "style", //Special tag <style>...</style>
    Tag: "tag" //Any tag that isn't special
  };

  function Parser(handler, options) {
    this._options = options ? options : {};
    if (this._options.includeLocation == undefined) {
      this._options.includeLocation = false; //Do not track element position in document by default
    }

    this.validateHandler(handler);
    this._handler = handler;
    this.reset();
  }

  //**"Static"**//
  //Regular expressions used for cleaning up and parsing (stateless)
  Parser._reTrim = /(^\s+|\s+$)/g; //Trim leading/trailing whitespace
  Parser._reTrimComment = /(^\!--|--$)/g; //Remove comment tag markup from comment contents
  Parser._reWhitespace = /\s/g; //Used to find any whitespace to split on
  Parser._reTagName = /^\s*(\/?)\s*([^\s\/]+)/; //Used to find the tag name for an element

  //Regular expressions used for parsing (stateful)
  Parser._reAttrib = /([^=<>\"\'\s]+)\s*=\s*"([^"]*)"|([^=<>\"\'\s]+)\s*=\s*'([^']*)'|([^=<>\"\'\s]+)\s*=\s*([^'"\s]+)|([^=<>\"\'\s\/]+)/g; //Find attributes in a tag
  Parser._reTags = /[\<\>]/g; //Find tag markers

  //**Public**//
  //Methods//
  //Parses a complete HTML and pushes it to the handler
  Parser.prototype.parseComplete = function Parser$parseComplete(data) {
    this.reset();
    this.parseChunk(data);
    this.done();
  };

  //Parses a piece of an HTML document
  Parser.prototype.parseChunk = function Parser$parseChunk(data) {
    if (this._done) this.handleError(new Error("Attempted to parse chunk after parsing already done"));
    this._buffer += data; //FIXME: this can be a bottleneck
    this.parseTags();
  };

  //Tells the parser that the HTML being parsed is complete
  Parser.prototype.done = function Parser$done() {
    if (this._done) return;
    this._done = true;

    //Push any unparsed text into a final element in the element list
    if (this._buffer.length) {
      var rawData = this._buffer;
      this._buffer = "";
      var element = {
        raw: rawData,
        data: this._parseState == ElementType.Text ? rawData : rawData.replace(Parser._reTrim, ""),
        type: this._parseState
      };
      if (this._parseState == ElementType.Tag || this._parseState == ElementType.Script || this._parseState == ElementType.Style) element.name = this.parseTagName(element.data);
      this.parseAttribs(element);
      this._elements.push(element);
    }

    this.writeHandler();
    this._handler.done();
  };

  //Resets the parser to a blank state, ready to parse a new HTML document
  Parser.prototype.reset = function Parser$reset() {
    this._buffer = "";
    this._done = false;
    this._elements = [];
    this._elementsCurrent = 0;
    this._current = 0;
    this._next = 0;
    this._location = {
      row: 0,
      col: 0,
      charOffset: 0,
      inBuffer: 0
    };
    this._parseState = ElementType.Text;
    this._prevTagSep = "";
    this._tagStack = [];
    this._handler.reset();
  };

  //**Private**//
  //Properties//
  Parser.prototype._options = null; //Parser options for how to behave
  Parser.prototype._handler = null; //Handler for parsed elements
  Parser.prototype._buffer = null; //Buffer of unparsed data
  Parser.prototype._done = false; //Flag indicating whether parsing is done
  Parser.prototype._elements = null; //Array of parsed elements
  Parser.prototype._elementsCurrent = 0; //Pointer to last element in _elements that has been processed
  Parser.prototype._current = 0; //Position in data that has already been parsed
  Parser.prototype._next = 0; //Position in data of the next tag marker (<>)
  Parser.prototype._location = null; //Position tracking for elements in a stream
  Parser.prototype._parseState = ElementType.Text; //Current type of element being parsed
  Parser.prototype._prevTagSep = ""; //Previous tag marker found
  //Stack of element types previously encountered; keeps track of when
  //parsing occurs inside a script/comment/style tag
  Parser.prototype._tagStack = null;

  //Methods//
  //Takes an array of elements and parses any found attributes
  Parser.prototype.parseTagAttribs = function Parser$parseTagAttribs(elements) {
    var idxEnd = elements.length;
    var idx = 0;

    while (idx < idxEnd) {
      var element = elements[idx++];
      if (element.type == ElementType.Tag || element.type == ElementType.Script || element.type == ElementType.style) this.parseAttribs(element);
    }

    return elements;
  };

  //Takes an element and adds an "attribs" property for any element attributes found
  Parser.prototype.parseAttribs = function Parser$parseAttribs(element) {
    //Only parse attributes for tags
    if (element.type != ElementType.Script && element.type != ElementType.Style && element.type != ElementType.Tag) return;

    var tagName = element.data.split(Parser._reWhitespace, 1)[0];
    var attribRaw = element.data.substring(tagName.length);
    if (attribRaw.length < 1) return;

    var match;
    Parser._reAttrib.lastIndex = 0;
    while (match = Parser._reAttrib.exec(attribRaw)) {
      if (element.attribs == undefined) element.attribs = {};

      if (typeof match[1] == "string" && match[1].length) {
        element.attribs[match[1]] = match[2];
      } else if (typeof match[3] == "string" && match[3].length) {
        element.attribs[match[3].toString()] = match[4].toString();
      } else if (typeof match[5] == "string" && match[5].length) {
        element.attribs[match[5]] = match[6];
      } else if (typeof match[7] == "string" && match[7].length) {
        element.attribs[match[7]] = match[7];
      }
    }
  };

  //Extracts the base tag name from the data value of an element
  Parser.prototype.parseTagName = function Parser$parseTagName(data) {
    if (data == null || data == "") return "";
    var match = Parser._reTagName.exec(data);
    if (!match) return "";
    return (match[1] ? "/" : "") + match[2];
  };

  //Parses through HTML text and returns an array of found elements
  //I admit, this function is rather large but splitting up had an noticeable impact on speed
  Parser.prototype.parseTags = function Parser$parseTags() {
    var bufferEnd = this._buffer.length - 1;
    while (Parser._reTags.test(this._buffer)) {
      this._next = Parser._reTags.lastIndex - 1;
      var tagSep = this._buffer.charAt(this._next); //The currently found tag marker
      var rawData = this._buffer.substring(this._current, this._next); //The next chunk of data to parse

      //A new element to eventually be appended to the element list
      var element = {
        raw: rawData,
        data: this._parseState == ElementType.Text ? rawData : rawData.replace(Parser._reTrim, ""),
        type: this._parseState
      };

      var elementName = this.parseTagName(element.data);

      //This section inspects the current tag stack and modifies the current
      //element if we're actually parsing a special area (script/comment/style tag)
      if (this._tagStack.length) {
        //We're parsing inside a script/comment/style tag
        if (this._tagStack[this._tagStack.length - 1] == ElementType.Script) {
          //We're currently in a script tag
          if (elementName.toLowerCase() == "/script")
            //Actually, we're no longer in a script tag, so pop it off the stack
            this._tagStack.pop();else {
            //Not a closing script tag
            if (element.raw.indexOf("!--") != 0) {
              //Make sure we're not in a comment
              //All data from here to script close is now a text element
              element.type = ElementType.Text;
              //If the previous element is text, append the current text to it
              if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Text) {
                var prevElement = this._elements[this._elements.length - 1];
                prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep + element.raw;
                element.raw = element.data = ""; //This causes the current element to not be added to the element list
              }
            }
          }
        } else if (this._tagStack[this._tagStack.length - 1] == ElementType.Style) {
          //We're currently in a style tag
          if (elementName.toLowerCase() == "/style")
            //Actually, we're no longer in a style tag, so pop it off the stack
            this._tagStack.pop();else {
            if (element.raw.indexOf("!--") != 0) {
              //Make sure we're not in a comment
              //All data from here to style close is now a text element
              element.type = ElementType.Text;
              //If the previous element is text, append the current text to it
              if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Text) {
                var prevElement = this._elements[this._elements.length - 1];
                if (element.raw != "") {
                  prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep + element.raw;
                  element.raw = element.data = ""; //This causes the current element to not be added to the element list
                } else {
                  //Element is empty, so just append the last tag marker found
                  prevElement.raw = prevElement.data = prevElement.raw + this._prevTagSep;
                }
              } else {
                //The previous element was not text
                if (element.raw != "") {
                  element.raw = element.data = element.raw;
                }
              }
            }
          }
        } else if (this._tagStack[this._tagStack.length - 1] == ElementType.Comment) {
          //We're currently in a comment tag
          var rawLen = element.raw.length;
          if (element.raw.charAt(rawLen - 2) == "-" && element.raw.charAt(rawLen - 1) == "-" && tagSep == ">") {
            //Actually, we're no longer in a style tag, so pop it off the stack
            this._tagStack.pop();
            //If the previous element is a comment, append the current text to it
            if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Comment) {
              var prevElement = this._elements[this._elements.length - 1];
              prevElement.raw = prevElement.data = (prevElement.raw + element.raw).replace(Parser._reTrimComment, "");
              element.raw = element.data = ""; //This causes the current element to not be added to the element list
              element.type = ElementType.Text;
            } //Previous element not a comment
            else element.type = ElementType.Comment; //Change the current element's type to a comment
          } else {
            //Still in a comment tag
            element.type = ElementType.Comment;
            //If the previous element is a comment, append the current text to it
            if (this._elements.length && this._elements[this._elements.length - 1].type == ElementType.Comment) {
              var prevElement = this._elements[this._elements.length - 1];
              prevElement.raw = prevElement.data = prevElement.raw + element.raw + tagSep;
              element.raw = element.data = ""; //This causes the current element to not be added to the element list
              element.type = ElementType.Text;
            } else element.raw = element.data = element.raw + tagSep;
          }
        }
      }

      //Processing of non-special tags
      if (element.type == ElementType.Tag) {
        element.name = elementName;
        var elementNameCI = elementName.toLowerCase();

        if (element.raw.indexOf("!--") == 0) {
          //This tag is really comment
          element.type = ElementType.Comment;
          delete element["name"];
          var rawLen = element.raw.length;
          //Check if the comment is terminated in the current element
          if (element.raw.charAt(rawLen - 1) == "-" && element.raw.charAt(rawLen - 2) == "-" && tagSep == ">") element.raw = element.data = element.raw.replace(Parser._reTrimComment, "");else {
            //It's not so push the comment onto the tag stack
            element.raw += tagSep;
            this._tagStack.push(ElementType.Comment);
          }
        } else if (element.raw.indexOf("!") == 0 || element.raw.indexOf("?") == 0) {
          element.type = ElementType.Directive;
          //TODO: what about CDATA?
        } else if (elementNameCI == "script") {
          element.type = ElementType.Script;
          //Special tag, push onto the tag stack if not terminated
          if (element.data.charAt(element.data.length - 1) != "/") this._tagStack.push(ElementType.Script);
        } else if (elementNameCI == "/script") element.type = ElementType.Script;else if (elementNameCI == "style") {
          element.type = ElementType.Style;
          //Special tag, push onto the tag stack if not terminated
          if (element.data.charAt(element.data.length - 1) != "/") this._tagStack.push(ElementType.Style);
        } else if (elementNameCI == "/style") element.type = ElementType.Style;
        if (element.name && element.name.charAt(0) == "/") element.data = element.name;
      }

      //Add all tags and non-empty text elements to the element list
      if (element.raw != "" || element.type != ElementType.Text) {
        if (this._options.includeLocation && !element.location) {
          element.location = this.getLocation(element.type == ElementType.Tag);
        }
        this.parseAttribs(element);
        this._elements.push(element);
        //If tag self-terminates, add an explicit, separate closing tag
        if (element.type != ElementType.Text && element.type != ElementType.Comment && element.type != ElementType.Directive && element.data.charAt(element.data.length - 1) == "/") this._elements.push({
          raw: "/" + element.name,
          data: "/" + element.name,
          name: "/" + element.name,
          type: element.type
        });
      }
      this._parseState = tagSep == "<" ? ElementType.Tag : ElementType.Text;
      this._current = this._next + 1;
      this._prevTagSep = tagSep;
    }

    if (this._options.includeLocation) {
      this.getLocation();
      this._location.row += this._location.inBuffer;
      this._location.inBuffer = 0;
      this._location.charOffset = 0;
    }
    this._buffer = this._current <= bufferEnd ? this._buffer.substring(this._current) : "";
    this._current = 0;

    this.writeHandler();
  };

  Parser.prototype.getLocation = function Parser$getLocation(startTag) {
    var c,
        l = this._location,
        end = this._current - (startTag ? 1 : 0),
        chunk = startTag && l.charOffset == 0 && this._current == 0;

    for (; l.charOffset < end; l.charOffset++) {
      c = this._buffer.charAt(l.charOffset);
      if (c == "\n") {
        l.inBuffer++;
        l.col = 0;
      } else if (c != "\r") {
        l.col++;
      }
    }
    return {
      line: l.row + l.inBuffer + 1,
      col: l.col + (chunk ? 0 : 1)
    };
  };

  //Checks the handler to make it is an object with the right "interface"
  Parser.prototype.validateHandler = function Parser$validateHandler(handler) {
    if ((typeof handler === "undefined" ? "undefined" : _typeof(handler)) != "object") throw new Error("Handler is not an object");
    if (typeof handler.reset != "function") throw new Error("Handler method 'reset' is invalid");
    if (typeof handler.done != "function") throw new Error("Handler method 'done' is invalid");
    if (typeof handler.writeTag != "function") throw new Error("Handler method 'writeTag' is invalid");
    if (typeof handler.writeText != "function") throw new Error("Handler method 'writeText' is invalid");
    if (typeof handler.writeComment != "function") throw new Error("Handler method 'writeComment' is invalid");
    if (typeof handler.writeDirective != "function") throw new Error("Handler method 'writeDirective' is invalid");
  };

  //Writes parsed elements out to the handler
  Parser.prototype.writeHandler = function Parser$writeHandler(forceFlush) {
    forceFlush = !!forceFlush;
    if (this._tagStack.length && !forceFlush) return;
    while (this._elements.length) {
      var element = this._elements.shift();
      switch (element.type) {
        case ElementType.Comment:
          this._handler.writeComment(element);
          break;
        case ElementType.Directive:
          this._handler.writeDirective(element);
          break;
        case ElementType.Text:
          this._handler.writeText(element);
          break;
        default:
          this._handler.writeTag(element);
          break;
      }
    }
  };

  Parser.prototype.handleError = function Parser$handleError(error) {
    if (typeof this._handler.error == "function") this._handler.error(error);else throw error;
  };

  //TODO: make this a trully streamable handler
  function RssHandler(callback) {
    RssHandler.super_.call(this, callback, {
      ignoreWhitespace: true,
      verbose: false,
      enforceEmptyTags: false
    });
  }
  inherits(RssHandler, DefaultHandler);

  RssHandler.prototype.done = function RssHandler$done() {
    var feed = {};
    var feedRoot;

    var found = DomUtils.getElementsByTagName(function (value) {
      return value == "rss" || value == "feed";
    }, this.dom, false);
    if (found.length) {
      feedRoot = found[0];
    }
    if (feedRoot) {
      if (feedRoot.name == "rss") {
        feed.type = "rss";
        feedRoot = feedRoot.children[0]; //<channel/>
        feed.id = "";
        try {
          feed.title = DomUtils.getElementsByTagName("title", feedRoot.children, false)[0].children[0].data;
        } catch (ex) {}
        try {
          feed.link = DomUtils.getElementsByTagName("link", feedRoot.children, false)[0].children[0].data;
        } catch (ex) {}
        try {
          feed.description = DomUtils.getElementsByTagName("description", feedRoot.children, false)[0].children[0].data;
        } catch (ex) {}
        try {
          feed.updated = new Date(DomUtils.getElementsByTagName("lastBuildDate", feedRoot.children, false)[0].children[0].data);
        } catch (ex) {}
        try {
          feed.author = DomUtils.getElementsByTagName("managingEditor", feedRoot.children, false)[0].children[0].data;
        } catch (ex) {}
        feed.items = [];
        DomUtils.getElementsByTagName("item", feedRoot.children).forEach(function (item, index, list) {
          var entry = {};
          try {
            entry.id = DomUtils.getElementsByTagName("guid", item.children, false)[0].children[0].data;
          } catch (ex) {}
          try {
            entry.title = DomUtils.getElementsByTagName("title", item.children, false)[0].children[0].data;
          } catch (ex) {}
          try {
            entry.link = DomUtils.getElementsByTagName("link", item.children, false)[0].children[0].data;
          } catch (ex) {}
          try {
            entry.description = DomUtils.getElementsByTagName("description", item.children, false)[0].children[0].data;
          } catch (ex) {}
          try {
            entry.pubDate = new Date(DomUtils.getElementsByTagName("pubDate", item.children, false)[0].children[0].data);
          } catch (ex) {}
          feed.items.push(entry);
        });
      } else {
        feed.type = "atom";
        try {
          feed.id = DomUtils.getElementsByTagName("id", feedRoot.children, false)[0].children[0].data;
        } catch (ex) {}
        try {
          feed.title = DomUtils.getElementsByTagName("title", feedRoot.children, false)[0].children[0].data;
        } catch (ex) {}
        try {
          feed.link = DomUtils.getElementsByTagName("link", feedRoot.children, false)[0].attribs.href;
        } catch (ex) {}
        try {
          feed.description = DomUtils.getElementsByTagName("subtitle", feedRoot.children, false)[0].children[0].data;
        } catch (ex) {}
        try {
          feed.updated = new Date(DomUtils.getElementsByTagName("updated", feedRoot.children, false)[0].children[0].data);
        } catch (ex) {}
        try {
          feed.author = DomUtils.getElementsByTagName("email", feedRoot.children, true)[0].children[0].data;
        } catch (ex) {}
        feed.items = [];
        DomUtils.getElementsByTagName("entry", feedRoot.children).forEach(function (item, index, list) {
          var entry = {};
          try {
            entry.id = DomUtils.getElementsByTagName("id", item.children, false)[0].children[0].data;
          } catch (ex) {}
          try {
            entry.title = DomUtils.getElementsByTagName("title", item.children, false)[0].children[0].data;
          } catch (ex) {}
          try {
            entry.link = DomUtils.getElementsByTagName("link", item.children, false)[0].attribs.href;
          } catch (ex) {}
          try {
            entry.description = DomUtils.getElementsByTagName("summary", item.children, false)[0].children[0].data;
          } catch (ex) {}
          try {
            entry.pubDate = new Date(DomUtils.getElementsByTagName("updated", item.children, false)[0].children[0].data);
          } catch (ex) {}
          feed.items.push(entry);
        });
      }

      this.dom = feed;
    }
    RssHandler.super_.prototype.done.call(this);
  };

  ///////////////////////////////////////////////////

  function DefaultHandler(callback, options) {
    this.reset();
    this._options = options ? options : {};
    if (this._options.ignoreWhitespace == undefined) this._options.ignoreWhitespace = false; //Keep whitespace-only text nodes
    if (this._options.verbose == undefined) this._options.verbose = true; //Keep data property for tags and raw property for all
    if (this._options.enforceEmptyTags == undefined) this._options.enforceEmptyTags = true; //Don't allow children for HTML tags defined as empty in spec
    if (typeof callback == "function") this._callback = callback;
  }

  //**"Static"**//
  //HTML Tags that shouldn't contain child nodes
  DefaultHandler._emptyTags = {
    area: 1,
    base: 1,
    basefont: 1,
    br: 1,
    col: 1,
    frame: 1,
    hr: 1,
    img: 1,
    input: 1,
    isindex: 1,
    link: 1,
    meta: 1,
    param: 1,
    embed: 1
  };
  //Regex to detect whitespace only text nodes
  DefaultHandler.reWhitespace = /^\s*$/;

  //**Public**//
  //Properties//
  DefaultHandler.prototype.dom = null; //The hierarchical object containing the parsed HTML
  //Methods//
  //Resets the handler back to starting state
  DefaultHandler.prototype.reset = function DefaultHandler$reset() {
    this.dom = [];
    this._done = false;
    this._tagStack = [];
    this._tagStack.last = function DefaultHandler$_tagStack$last() {
      return this.length ? this[this.length - 1] : null;
    };
  };
  //Signals the handler that parsing is done
  DefaultHandler.prototype.done = function DefaultHandler$done() {
    this._done = true;
    this.handleCallback(null);
  };
  DefaultHandler.prototype.writeTag = function DefaultHandler$writeTag(element) {
    this.handleElement(element);
  };
  DefaultHandler.prototype.writeText = function DefaultHandler$writeText(element) {
    if (this._options.ignoreWhitespace) if (DefaultHandler.reWhitespace.test(element.data)) return;
    this.handleElement(element);
  };
  DefaultHandler.prototype.writeComment = function DefaultHandler$writeComment(element) {
    this.handleElement(element);
  };
  DefaultHandler.prototype.writeDirective = function DefaultHandler$writeDirective(element) {
    this.handleElement(element);
  };
  DefaultHandler.prototype.error = function DefaultHandler$error(error) {
    this.handleCallback(error);
  };

  //**Private**//
  //Properties//
  DefaultHandler.prototype._options = null; //Handler options for how to behave
  DefaultHandler.prototype._callback = null; //Callback to respond to when parsing done
  DefaultHandler.prototype._done = false; //Flag indicating whether handler has been notified of parsing completed
  DefaultHandler.prototype._tagStack = null; //List of parents to the currently element being processed
  //Methods//
  DefaultHandler.prototype.handleCallback = function DefaultHandler$handleCallback(error) {
    if (typeof this._callback != "function") if (error) throw error;else return;
    this._callback(error, this.dom);
  };

  DefaultHandler.prototype.isEmptyTag = function (element) {
    var name = element.name.toLowerCase();
    if (name.charAt(0) == "/") {
      name = name.substring(1);
    }
    return this._options.enforceEmptyTags && !!DefaultHandler._emptyTags[name];
  };

  DefaultHandler.prototype.handleElement = function DefaultHandler$handleElement(element) {
    if (this._done) this.handleCallback(new Error("Writing to the handler after done() called is not allowed without a reset()"));
    if (!this._options.verbose) {
      //			element.raw = null; //FIXME: Not clean
      //FIXME: Serious performance problem using delete
      delete element.raw;
      if (element.type == "tag" || element.type == "script" || element.type == "style") delete element.data;
    }
    if (!this._tagStack.last()) {
      //There are no parent elements
      //If the element can be a container, add it to the tag stack and the top level list
      if (element.type != ElementType.Text && element.type != ElementType.Comment && element.type != ElementType.Directive) {
        if (element.name.charAt(0) != "/") {
          //Ignore closing tags that obviously don't have an opening tag
          this.dom.push(element);
          if (!this.isEmptyTag(element)) {
            //Don't add tags to the tag stack that can't have children
            this._tagStack.push(element);
          }
        }
      } //Otherwise just add to the top level list
      else this.dom.push(element);
    } else {
      //There are parent elements
      //If the element can be a container, add it as a child of the element
      //on top of the tag stack and then add it to the tag stack
      if (element.type != ElementType.Text && element.type != ElementType.Comment && element.type != ElementType.Directive) {
        if (element.name.charAt(0) == "/") {
          //This is a closing tag, scan the tagStack to find the matching opening tag
          //and pop the stack up to the opening tag's parent
          var baseName = element.name.substring(1);
          if (!this.isEmptyTag(element)) {
            var pos = this._tagStack.length - 1;
            while (pos > -1 && this._tagStack[pos--].name != baseName) {}
            if (pos > -1 || this._tagStack[0].name == baseName) while (pos < this._tagStack.length - 1) {
              this._tagStack.pop();
            }
          }
        } else {
          //This is not a closing tag
          if (!this._tagStack.last().children) this._tagStack.last().children = [];
          this._tagStack.last().children.push(element);
          if (!this.isEmptyTag(element))
            //Don't add tags to the tag stack that can't have children
            this._tagStack.push(element);
        }
      } else {
        //This is not a container element
        if (!this._tagStack.last().children) this._tagStack.last().children = [];
        this._tagStack.last().children.push(element);
      }
    }
  };

  var DomUtils = {
    testElement: function DomUtils$testElement(options, element) {
      if (!element) {
        return false;
      }

      for (var key in options) {
        if (key == "tag_name") {
          if (element.type != "tag" && element.type != "script" && element.type != "style") {
            return false;
          }
          if (!options["tag_name"](element.name)) {
            return false;
          }
        } else if (key == "tag_type") {
          if (!options["tag_type"](element.type)) {
            return false;
          }
        } else if (key == "tag_contains") {
          if (element.type != "text" && element.type != "comment" && element.type != "directive") {
            return false;
          }
          if (!options["tag_contains"](element.data)) {
            return false;
          }
        } else {
          if (!element.attribs || !options[key](element.attribs[key])) {
            return false;
          }
        }
      }

      return true;
    },

    getElements: function DomUtils$getElements(options, currentElement, recurse, limit) {
      recurse = recurse === undefined || recurse === null || !!recurse;
      limit = isNaN(parseInt(limit)) ? -1 : parseInt(limit);

      if (!currentElement) {
        return [];
      }

      var found = [];
      var elementList;

      function getTest(checkVal) {
        return function (value) {
          return value == checkVal;
        };
      }
      for (var key in options) {
        if (typeof options[key] != "function") {
          options[key] = getTest(options[key]);
        }
      }

      if (DomUtils.testElement(options, currentElement)) {
        found.push(currentElement);
      }

      if (limit >= 0 && found.length >= limit) {
        return found;
      }

      if (recurse && currentElement.children) {
        elementList = currentElement.children;
      } else if (currentElement instanceof Array) {
        elementList = currentElement;
      } else {
        return found;
      }

      for (var i = 0; i < elementList.length; i++) {
        found = found.concat(DomUtils.getElements(options, elementList[i], recurse, limit));
        if (limit >= 0 && found.length >= limit) {
          break;
        }
      }

      return found;
    },

    getElementById: function DomUtils$getElementById(id, currentElement, recurse) {
      var result = DomUtils.getElements({ id: id }, currentElement, recurse, 1);
      return result.length ? result[0] : null;
    },

    getElementsByTagName: function DomUtils$getElementsByTagName(name, currentElement, recurse, limit) {
      return DomUtils.getElements({ tag_name: name }, currentElement, recurse, limit);
    },

    getElementsByTagType: function DomUtils$getElementsByTagType(type, currentElement, recurse, limit) {
      return DomUtils.getElements({ tag_type: type }, currentElement, recurse, limit);
    }
  };

  function inherits(ctor, superCtor) {
    var tempCtor = function tempCtor() {};
    tempCtor.prototype = superCtor.prototype;
    ctor.super_ = superCtor;
    ctor.prototype = new tempCtor();
    ctor.prototype.constructor = ctor;
  }

  exports.Parser = Parser;

  exports.DefaultHandler = DefaultHandler;

  exports.RssHandler = RssHandler;

  exports.ElementType = ElementType;

  exports.DomUtils = DomUtils;
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)(module), "/index.js", "/"))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _css = __webpack_require__(1);

var _tools = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpenTagRegex = /[({[<（【《「]/;
var EnglishRegex = /[^\w]*(\w+)$/;
var PunctuationRegex = /[,，、.。?？!！;；:：>》」）】@#$%~^&*/]/;
var PunctuationEndRegex = /([^,，、.。?？!！;；:：>》」）】@#$%~^&*/][,，、.。?？!！;；:：>》」）】@#$%~^&*/]*)$/;

function processEnglish(lines) {
  if (lines.length === 0) {
    return lines;
  }
  var last = lines[lines.length - 1];
  if (last) {
    var match = EnglishRegex.exec(last);
    if (match && match[1].length < 20) {
      lines = lines.slice(0, lines.length - 1);
      lines.push(last.slice(0, last.length - match[1].length));
      lines.push(match[1]);
    }
  }
  return lines;
}

function processPunctuation(lines) {
  if (lines.length === 0) {
    return lines;
  }
  var last = lines[lines.length - 1];
  if (last) {
    var match = PunctuationEndRegex.exec(last);
    if (match && match[1].length < 20) {
      lines = lines.slice(0, lines.length - 1);
      lines.push(last.slice(0, last.length - match[1].length));
    }
    var prevLinesCount = lines.length;
    if (/\w/.test(match[1][0])) {
      lines = processEnglish(lines);
      var currentLinesCount = lines.length;
      if (prevLinesCount !== currentLinesCount) {
        lines[lines.length - 1] = lines[lines.length - 1] + match[1];
      } else {
        lines.push(match[1]);
      }
    } else {
      lines.push(match[1]);
    }
  }
  return lines;
}

function processEndOpenTag(lines, index) {
  if (lines.length === 0) {
    return lines;
  }
  var line = lines[index];
  var endLetter = line[line.length - 1];
  if (line && OpenTagRegex.test(endLetter)) {
    lines[index] = line.slice(0, -1);
    lines[index + 1] = endLetter + (lines[index + 1] || "");
  }
  return lines;
}

var Flow = function () {
  function Flow(container, direction, justifyContent, alignItems, top, left) {
    _classCallCheck(this, Flow);

    this.flowContainer = container;
    this.direction = direction;
    this.justifyContent = justifyContent || "flex-start";
    this.alignItems = alignItems || "flex-start";
    this.top = top || new _css.CssValue("0px");
    this.left = left || new _css.CssValue("0px");
    this.width = new _css.CssValue("0px");
    this.height = new _css.CssValue("0px");
    this.items = [];
  }

  Flow.prototype.canAccommodate = function canAccommodate(node) {
    var isEmpty = this.items.length === 0;
    if (isEmpty) {
      return true;
    }
    var isBlock = node._isBlockNode();
    if (isBlock || this.items[this.items.length - 1]._isBlockNode()) {
      return false;
    }
    var containerWidth = this.flowContainer.width;
    if (!containerWidth.isAbsolute()) {
      return true;
    }
    if (containerWidth.minus(this.width).minus(node._boxWidth()).value() >= 0) {
      return true;
    }
    if (node.isTextNode()) {
      var remainingSpace = containerWidth.minus(this.width).value();
      var fontSize = node.style("font-size").value();
      if (remainingSpace >= fontSize) {
        return true;
      }
    }
    return false;
  };

  Flow.prototype.getContentWidth = function getContentWidth() {
    return this.items.reduce(function (value, node) {
      return value.plus(node._boxWidth());
    }, new _css.CssValue("0px"));
  };

  Flow.prototype.getContentHeight = function getContentHeight() {
    var height = new _css.CssValue("0px");
    this.items.forEach(function (node) {
      var nodeHeight = node._boxHeight();
      if (nodeHeight.minus(height).value() > 0) {
        height = nodeHeight;
      }
    });
    return height;
  };

  Flow.prototype.addNode = function addNode(node) {
    this.items.push(node);
    this.layout();
  };

  Flow.prototype.layout = function layout() {
    var _this = this;

    var width = new _css.CssValue("0px");
    var height = new _css.CssValue("0px");
    this.items.forEach(function (node) {
      var nodeHeight = node._boxHeight();
      var nodeWidth = node._boxWidth();
      node._posRelativeToParent = {
        top: _this.top,
        left: width
      };
      if (nodeHeight.minus(height).value() > 0) {
        height = nodeHeight;
      }
      width = width.plus(nodeWidth);
    });
    this.width = width;
    this.height = height;
  };

  return Flow;
}();

var Flows = function () {
  function Flows(container, direction, wrap) {
    _classCallCheck(this, Flows);

    this.container = container;
    this.width = container.style("width");
    this.height = container.style("height");
    this.direction = direction || "row";
    this.wrap = wrap || true;
    this._flows = [];
  }

  Flows.prototype.newFlow = function newFlow() {
    var currentFlow = this._flows[this._flows.length - 1];
    var top = new _css.CssValue("0px");
    var left = new _css.CssValue("0px");
    if (currentFlow) {
      top = currentFlow.top.plus(currentFlow.height);
    }
    return new Flow(this, this.direction, "", "", top, left);
  };

  Flows.prototype.forEach = function forEach(func) {
    this._flows.forEach(function (flow) {
      flow.items.forEach(function (node) {
        func(node);
      });
    });
  };

  Flows.prototype.getWidth = function getWidth() {
    var width = new _css.CssValue("0px");
    this._flows.forEach(function (flow) {
      var flowWidth = flow.getContentWidth();
      if (flowWidth.minus(width).value() > 0) {
        width = flowWidth;
      }
    });
    return width;
  };

  Flows.prototype.getHeight = function getHeight() {
    var height = new _css.CssValue("0px");
    this._flows.forEach(function (flow) {
      height = height.plus(flow.getContentHeight());
    });
    return height;
  };

  Flows.prototype.addNode = function addNode(node, ctx) {
    var _this2 = this;

    var maxWidth = void 0;
    if (this.width.isAbsolute()) {
      maxWidth = this.width.value();
    }
    if (maxWidth === 0) {
      return;
    }
    if (!maxWidth) {
      maxWidth = Infinity;
    }
    var currentFlow = this._flows[this._flows.length - 1];
    if (!currentFlow || !currentFlow.canAccommodate(node)) {
      currentFlow = this.newFlow();
      this._flows.push(currentFlow);
    }
    if (!node.isTextNode()) {
      currentFlow.addNode(node);
      return;
    }

    var text = node.text;
    var textLength = text.length;
    var font = node.style("font");
    var fontSize = font["font-size"].value();
    var cssLineHeight = font["line-height"];
    var lineHeight = cssLineHeight.value();
    if (!cssLineHeight.unit) {
      lineHeight *= fontSize;
    }
    var fontStr = (0, _tools.stringifyFont)(font);

    var partBefore = false;
    if (currentFlow.width.value() > 0) {
      partBefore = true;
    }

    var width = maxWidth - currentFlow.width.value();
    var lines = [];
    var lineIndex = 0;
    var prevLetter = "";
    var letter = "";
    var lineWidth = 0;
    for (var i = 0; i < textLength; i++) {
      letter = text[i];
      lineWidth = (0, _tools.measureText)(ctx, (lines[lineIndex] || "") + letter, fontStr).width;
      if (lineWidth > width) {
        if (PunctuationRegex.test(letter)) {
          lines = processPunctuation(lines);
        } else if (/\w/.test(letter) && /\w/.test(prevLetter)) {
          lines = processEnglish(lines);
        }
        lines = processEndOpenTag(lines, lineIndex);
        lineIndex++;
        width = maxWidth;
      }
      lines[lineIndex] = (lines[lineIndex] || "") + letter;
      prevLetter = letter;
    }
    lines.forEach(function (line, index) {
      line = line.replace(/^\s+|\s+$/g, "");
      var lineWidth = (0, _tools.measureText)(ctx, line, fontStr).width;
      var partNode = node.cloneNode();
      partNode.text = line;
      partNode.style('width', lineWidth + "px");
      partNode.style('height', lineHeight + "px");
      partNode.parentNode = node.parentNode;
      if (!partBefore || index !== 0) {
        currentFlow = _this2.newFlow();
        _this2._flows.push(currentFlow);
      }
      currentFlow.addNode(partNode);
    });
  };

  return Flows;
}();

exports.default = Flows;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _tools = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas(ctx) {
    _classCallCheck(this, Canvas);

    if (!ctx) {
      throw new Error("new Canvas(ctx, width) require ctx");
    }
    this.ctx = ctx;
  }

  Canvas.prototype.draw = function draw(node) {
    var _this = this;

    if (!node) {
      return;
    }
    var ctx = this.ctx;
    ctx.save();
    var pos = node.rootPosition();
    this.drawNodeBorder(node, pos);
    this.processNodeBorderRadius(node, pos);
    this.drawNodeBackgroundColor(node, pos);
    this.drawNodeImage(node, pos);
    ctx.restore();
    this.processOverFlow(node, pos);
    this.drawNodeText(node, pos);
    (node._flows || []).forEach(function (node) {
      _this.draw(node, "", "", true);
    });
    (node._absolutes || []).sort(function (a, b) {
      var az = a.style("z-index").value();
      var bz = b.style("z-index").value();
      return az - bz;
    }).forEach(function (node) {
      _this.draw(node, "", "", true);
    });
    var overFlow = node.style("overflow");
    var overflowX = overFlow["overflow-x"].value();
    var overflowY = overFlow["overflow-y"].value();
    if (overflowX === "hidden" || overflowY === "hidden") {
      ctx.restore();
    }
    ctx.restore();
  };

  Canvas.prototype.drawNodeImage = function drawNodeImage(node, pos) {
    if (!node.isImageNode() || !node._resource) {
      return;
    }
    var ctx = this.ctx;
    var top = pos.top.plus(node._box.margin.top, node._box.padding.top, node._box.border.top.width).value();
    var left = pos.left.plus(node._box.margin.left, node._box.padding.left, node._box.border.left.width).value();
    ctx.drawImage(typeof wx !== "undefined" ? node._resource.src : node._resource, 0, 0, node._resource.width, node._resource.height, left, top, node.style("width").value(), node.style("height").value());
  };

  Canvas.prototype.drawNodeText = function drawNodeText(node, pos) {
    if (!node.isTextNode()) {
      return;
    }
    var top = pos.top.value();
    var left = pos.left.value();
    var ctx = this.ctx;
    var width = node.parentNode ? node.parentNode.style("width").value() : 0;
    var font = node.style("font");
    var color = node.style("color").value();
    var textAlign = node.style("text-align").value();
    if (textAlign === "center") {
      left += width / 2;
    }
    if (textAlign === "right") {
      left += width;
    }
    ctx.textAlign = textAlign;
    ctx.textBaseline = "top";
    ctx.font = (0, _tools.stringifyFont)(font);
    ctx.fillStyle = color;
    ctx.fillText(node.text, left, top);
  };

  Canvas.prototype.drawNodeBackgroundColor = function drawNodeBackgroundColor(node, pos) {
    pos = pos || node.rootPosition();
    var top = pos.top;
    var left = pos.left;
    var width = node._boxWidth();
    var height = node._boxHeight();
    var bgColor = node.style("background-color");
    if (bgColor.value() !== "transparent") {
      var bgTop = top.plus(node._box.margin.top).plus(node._box.border.top.width);
      var bgLeft = left.plus(node._box.margin.left).plus(node._box.border.left.width);
      var bgWidth = width.minus(node._box.margin.left).minus(node._box.border.left.width).minus(node._box.margin.right).minus(node._box.border.right.width);
      var bgHeight = height.minus(node._box.margin.top).minus(node._box.border.top.width).minus(node._box.margin.bottom).minus(node._box.border.bottom.width);
      this.ctx.fillStyle = bgColor.value();
      this.ctx.fillRect(bgLeft.value(), bgTop.value(), bgWidth.value(), bgHeight.value());
    }
  };

  Canvas.prototype.processOverFlow = function processOverFlow(node, pos) {
    var overFlow = node.style("overflow");
    var overflowX = overFlow["overflow-x"].value();
    var overflowY = overFlow["overflow-y"].value();
    if (overflowX !== "hidden" && overflowY !== "hidden") {
      return false;
    }
    var width = node._boxWidth();
    var height = node._boxHeight();
    if (overflowX !== "hidden" && node._flows && node._flows.getWidth().minus(width).value() > 0) {
      width = node._flows.getWidth();
    }
    if (overflowY !== "hidden" && node._flows && node._flows.getHeight().minus(height).value() > 0) {
      height = node._flows.getHeight();
    }
    var ctx = this.ctx;
    var conetntLeftPos = pos.left.plus(node._box.margin.left, node._box.border.left.width, node._box.padding.left);
    var conetntTopPos = pos.top.plus(node._box.margin.top, node._box.border.top.width, node._box.padding.top);
    var conetntRightPos = pos.left.plus(width).minus(node._box.margin.right, node._box.border.right.width, node._box.padding.right);
    var conetntBottomPos = pos.top.plus(height).minus(node._box.margin.bottom, node._box.border.bottom.width, node._box.padding.bottom);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(conetntLeftPos.value(), conetntTopPos.value());
    ctx.lineTo(conetntRightPos.value(), conetntTopPos.value());
    ctx.lineTo(conetntRightPos.value(), conetntBottomPos.value());
    ctx.lineTo(conetntLeftPos.value(), conetntBottomPos.value());
    ctx.lineTo(conetntLeftPos.value(), conetntTopPos.value());
    ctx.clip();
    return true;
  };

  Canvas.prototype.processNodeBorderRadius = function processNodeBorderRadius(node, pos) {
    pos = pos || node.rootPosition();
    var ctx = this.ctx;

    var borderRadius = node.style("border-radius");
    var borderTopLeftRadius = borderRadius["border-top-left-radius"];
    var borderTopRightRadius = borderRadius["border-top-right-radius"];
    var borderBottomLeftRadius = borderRadius["border-bottom-left-radius"];
    var borderBottomRightRadius = borderRadius["border-bottom-right-radius"];
    var borderTop = node._box.border.top;
    var borderRight = node._box.border.right;
    var borderBottom = node._box.border.bottom;
    var borderLeft = node._box.border.left;
    var borderLeftPos = pos.left.plus(node._box.margin.left).plus(borderLeft.width);
    var borderTopPos = pos.top.plus(node._box.margin.top).plus(borderTop.width);
    var borderRightPos = pos.left.plus(node._boxWidth()).minus(node._box.margin.right).minus(borderRight.width);
    var borderBottomPos = pos.top.plus(node._boxHeight()).minus(node._box.margin.bottom).minus(borderBottom.width);

    ctx.save();
    ctx.beginPath();

    var cx = borderLeftPos.plus(borderTopLeftRadius);
    var cy = borderTopPos.plus(borderTopLeftRadius);
    ctx.moveTo(borderLeftPos.value(), cy.value());
    if (borderTopLeftRadius.value() > 0) {
      ctx.arc(cx.value(), cy.value(), borderTopLeftRadius.value(), Math.PI, Math.PI * 1.5);
    } else {
      ctx.lineTo(borderLeftPos.value(), borderTopPos.value());
      ctx.lineTo(cx.value(), borderTopPos.value());
    }

    cx = borderRightPos.minus(borderTopRightRadius);
    cy = borderTopPos.plus(borderTopRightRadius);
    ctx.lineTo(cx.value(), borderTopPos.value());

    if (borderTopRightRadius.value() > 0) {
      ctx.arc(cx.value(), cy.value(), borderTopRightRadius.value(), Math.PI * 1.5, 0);
    } else {
      ctx.lineTo(borderRightPos.value(), borderTopPos.value());
      ctx.lineTo(borderRightPos.value(), cy.value());
    }

    cx = borderRightPos.minus(borderBottomRightRadius);
    cy = borderBottomPos.minus(borderBottomRightRadius);
    ctx.lineTo(borderRightPos.value(), cy.value());

    if (borderBottomRightRadius.value() > 0) {
      ctx.arc(cx.value(), cy.value(), borderBottomRightRadius.value(), 0, 0.5 * Math.PI);
    } else {
      ctx.lineTo(borderRightPos.value(), borderBottomPos.value());
      ctx.lineTo(cx.value(), borderBottomPos.value());
    }

    cx = borderLeftPos.plus(borderBottomLeftRadius);
    cy = borderBottomPos.minus(borderBottomLeftRadius);
    ctx.lineTo(cx.value(), borderBottomPos.value());

    if (borderBottomLeftRadius.value() > 0) {
      ctx.arc(cx.value(), cy.value(), borderBottomLeftRadius.value(), 0.5 * Math.PI, Math.PI);
    } else {
      ctx.lineTo(borderLeftPos.value(), borderBottomPos.value());
      ctx.lineTo(borderLeftPos.value(), cy.value());
    }

    cx = borderLeftPos.plus(borderTopLeftRadius);
    cy = borderTopPos.plus(borderTopLeftRadius);
    ctx.lineTo(borderLeftPos.value(), cy.value());

    ctx.clip();
  };

  Canvas.prototype.drawNodeBorder = function drawNodeBorder(node, pos) {
    pos = pos || node.rootPosition();
    var ctx = this.ctx;

    var borderRadius = node.style("border-radius");
    var borderTopLeftRadius = borderRadius["border-top-left-radius"];
    var borderTopRightRadius = borderRadius["border-top-right-radius"];
    var borderBottomLeftRadius = borderRadius["border-bottom-left-radius"];
    var borderBottomRightRadius = borderRadius["border-bottom-right-radius"];
    var borderTop = node._box.border.top;
    var borderRight = node._box.border.right;
    var borderBottom = node._box.border.bottom;
    var borderLeft = node._box.border.left;
    var borderLeftPos = pos.left.plus(node._box.margin.left).plus(borderLeft.width);
    var borderTopPos = pos.top.plus(node._box.margin.top).plus(borderTop.width);
    var borderRightPos = pos.left.plus(node._boxWidth()).minus(node._box.margin.right).minus(borderRight.width);
    var borderBottomPos = pos.top.plus(node._boxHeight()).minus(node._box.margin.bottom).minus(borderBottom.width);

    var cx = borderLeftPos.plus(borderTopLeftRadius);
    var cy = borderTopPos.plus(borderTopLeftRadius);
    if (borderTop.width.value() > 0) {
      ctx.beginPath();
      ctx.lineWidth = borderTop.width.value();
      ctx.strokeStyle = borderTop.color.value();
      if (borderTop.style.value() === "dashed") {
        ctx.setLineDash([6, 3]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.moveTo(borderLeftPos.value(), cy.value());
      if (borderTopLeftRadius.value() > 0) {
        ctx.arc(cx.value(), cy.value(), borderTopLeftRadius.value(), Math.PI, Math.PI * 1.5);
      } else {
        ctx.lineTo(borderLeftPos.value(), borderTopPos.value());
        ctx.lineTo(cx.value(), borderTopPos.value());
      }

      cx = borderRightPos.minus(borderTopRightRadius);
      cy = borderTopPos.plus(borderTopRightRadius);
      ctx.lineTo(cx.value(), borderTopPos.value());
      ctx.stroke();
    } else {
      cx = borderRightPos.minus(borderTopRightRadius);
      cy = borderTopPos.plus(borderTopRightRadius);
    }

    if (borderRight.width.value() > 0) {
      ctx.beginPath();
      ctx.moveTo(cx.value(), borderTopPos.value());
      ctx.strokeStyle = borderRight.color.value();
      ctx.lineWidth = borderRight.width.value();
      if (borderRight.style.value() === "dashed") {
        ctx.setLineDash([6, 3]);
      } else {
        ctx.setLineDash([]);
      }
      if (borderTopRightRadius.value() > 0) {
        ctx.arc(cx.value(), cy.value(), borderTopRightRadius.value(), Math.PI * 1.5, 0);
      } else {
        ctx.lineTo(borderRightPos.value(), borderTopPos.value());
        ctx.lineTo(borderRightPos.value(), cy.value());
      }

      cx = borderRightPos.minus(borderBottomRightRadius);
      cy = borderBottomPos.minus(borderBottomRightRadius);
      ctx.lineTo(borderRightPos.value(), cy.value());
      ctx.stroke();
    } else {
      cx = borderRightPos.minus(borderBottomRightRadius);
      cy = borderBottomPos.minus(borderBottomRightRadius);
    }

    if (borderBottom.width.value() > 0) {
      ctx.beginPath();
      ctx.moveTo(borderRightPos.value(), cy.value());
      ctx.strokeStyle = borderBottom.color.value();
      ctx.lineWidth = borderBottom.width.value();
      if (borderBottom.style.value() === "dashed") {
        ctx.setLineDash([6, 3]);
      } else {
        ctx.setLineDash([]);
      }
      if (borderBottomRightRadius.value() > 0) {
        ctx.arc(cx.value(), cy.value(), borderBottomRightRadius.value(), 0, 0.5 * Math.PI);
      } else {
        ctx.lineTo(borderRightPos.value(), borderBottomPos.value());
        ctx.lineTo(cx.value(), borderBottomPos.value());
      }

      cx = borderLeftPos.plus(borderBottomLeftRadius);
      cy = borderBottomPos.minus(borderBottomLeftRadius);
      ctx.lineTo(cx.value(), borderBottomPos.value());
      ctx.stroke();
    } else {
      cx = borderLeftPos.plus(borderBottomLeftRadius);
      cy = borderBottomPos.minus(borderBottomLeftRadius);
    }

    if (borderLeft.width.value() > 0) {
      ctx.beginPath();
      ctx.moveTo(cx.value(), borderBottomPos.value());
      ctx.strokeStyle = borderLeft.color.value();
      ctx.lineWidth = borderLeft.width.value();
      if (borderLeft.style.value() === "dashed") {
        ctx.setLineDash([6, 3]);
      } else {
        ctx.setLineDash([]);
      }
      if (borderBottomLeftRadius.value() > 0) {
        ctx.arc(cx.value(), cy.value(), borderBottomLeftRadius.value(), 0.5 * Math.PI, Math.PI);
      } else {
        ctx.lineTo(borderLeftPos.value(), borderBottomPos.value());
        ctx.lineTo(borderLeftPos.value(), cy.value());
      }

      cx = borderLeftPos.plus(borderTopLeftRadius);
      cy = borderTopPos.plus(borderTopLeftRadius);
      ctx.lineTo(borderLeftPos.value(), cy.value() - borderLeft.width.divide(2).value());

      ctx.stroke();
    }
  };

  return Canvas;
}();

exports.default = Canvas;

/***/ })
/******/ ]);