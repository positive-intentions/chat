(self["webpackChunkchat"] = self["webpackChunkchat"] || []).push([[990],{

/***/ 5573:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@tensorflow/tfjs-backend-webgl/dist/index.js + 335 modules
var dist = __webpack_require__(33162);
// EXTERNAL MODULE: ./node_modules/@tensorflow/tfjs-backend-wasm/dist/index.js + 168 modules
var tfjs_backend_wasm_dist = __webpack_require__(6554);
// EXTERNAL MODULE: ./node_modules/@tensorflow-models/hand-pose-detection/dist/hand-pose-detection.esm.js + 57 modules
var hand_pose_detection_esm = __webpack_require__(58410);
// EXTERNAL MODULE: ./node_modules/scatter-gl/dist/index.js
var scatter_gl_dist = __webpack_require__(4032);
;// CONCATENATED MODULE: ./src/components/pages/hands/handpose-estimation/shared/params.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

var DEFAULT_LINE_WIDTH = 2;
var DEFAULT_RADIUS = 2;
var VIDEO_SIZE = {
  '640 X 480': {
    width: 640,
    height: 480
  },
  '640 X 360': {
    width: 640,
    height: 360
  },
  '360 X 270': {
    width: 360,
    height: 270
  }
};
var STATE = {
  camera: {
    targetFPS: 60,
    sizeOption: '360 X 270'
  },
  backend: '',
  flags: {},
  modelConfig: {}
};
var MEDIAPIPE_HANDS_CONFIG = {
  type: 'full',
  render3D: false
};
/**
 * This map descripes tunable flags and theior corresponding types.
 *
 * The flags (keys) in the map satisfy the following two conditions:
 * - Is tunable. For example, `IS_BROWSER` and `IS_CHROME` is not tunable,
 * because they are fixed when running the scripts.
 * - Does not depend on other flags when registering in `ENV.registerFlag()`.
 * This rule aims to make the list streamlined, and, since there are
 * dependencies between flags, only modifying an independent flag without
 * modifying its dependents may cause inconsistency.
 * (`WEBGL_RENDER_FLOAT32_CAPABLE` is an exception, because only exposing
 * `WEBGL_FORCE_F16_TEXTURES` may confuse users.)
 */
var TUNABLE_FLAG_VALUE_RANGE_MAP = {
  WEBGL_VERSION: [1, 2],
  WASM_HAS_SIMD_SUPPORT: [true, false],
  WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
  WEBGL_CPU_FORWARD: [true, false],
  WEBGL_PACK: [true, false],
  WEBGL_FORCE_F16_TEXTURES: [true, false],
  WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
  WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  CHECK_COMPUTATION_FOR_ERRORS: [true, false]
};
var BACKEND_FLAGS_MAP = _defineProperty(_defineProperty(_defineProperty({}, 'tfjs-wasm', ['WASM_HAS_SIMD_SUPPORT', 'WASM_HAS_MULTITHREAD_SUPPORT']), 'tfjs-webgl', ['WEBGL_VERSION', 'WEBGL_CPU_FORWARD', 'WEBGL_PACK', 'WEBGL_FORCE_F16_TEXTURES', 'WEBGL_RENDER_FLOAT32_CAPABLE', 'WEBGL_FLUSH_THRESHOLD']), 'mediapipe-gpu', []);
var MODEL_BACKEND_MAP = _defineProperty({}, hand_pose_detection_esm/* SupportedModels */.J.MediaPipeHands, ['mediapipe-gpu', 'tfjs-webgl']);
var TUNABLE_FLAG_NAME_MAP = {
  PROD: 'production mode',
  WEBGL_VERSION: 'webgl version',
  WASM_HAS_SIMD_SUPPORT: 'wasm SIMD',
  WASM_HAS_MULTITHREAD_SUPPORT: 'wasm multithread',
  WEBGL_CPU_FORWARD: 'cpu forward',
  WEBGL_PACK: 'webgl pack',
  WEBGL_FORCE_F16_TEXTURES: 'enforce float16',
  WEBGL_RENDER_FLOAT32_CAPABLE: 'enable float32',
  WEBGL_FLUSH_THRESHOLD: 'GL flush wait time(ms)'
};
// EXTERNAL MODULE: ./node_modules/@tensorflow/tfjs-core/dist/index.js + 46 modules
var tfjs_core_dist = __webpack_require__(84373);
;// CONCATENATED MODULE: ./src/components/pages/hands/handpose-estimation/shared/util.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function util_typeof(o) { "@babel/helpers - typeof"; return util_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, util_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == util_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(util_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */


function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}
function isMobile() {
  return isAndroid() || isiOS();
}

/**
 * Reset the target backend.
 *
 * @param backendName The name of the backend to be reset.
 */
function resetBackend(_x) {
  return _resetBackend.apply(this, arguments);
}
/**
 * Set environment flags.
 *
 * This is a wrapper function of `tf.env().setFlags()` to constrain users to
 * only set tunable flags (the keys of `TUNABLE_FLAG_TYPE_MAP`).
 *
 * ```js
 * const flagConfig = {
 *        WEBGL_PACK: false,
 *      };
 * await setEnvFlags(flagConfig);
 *
 * console.log(tf.env().getBool('WEBGL_PACK')); // false
 * console.log(tf.env().getBool('WEBGL_PACK_BINARY_OPERATIONS')); // false
 * ```
 *
 * @param flagConfig An object to store flag-value pairs.
 */
function _resetBackend() {
  _resetBackend = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(backendName) {
    var ENGINE, backendFactory;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          ENGINE = tfjs_core_dist/* engine */.Hi9();
          if (backendName in ENGINE.registryFactory) {
            _context.next = 3;
            break;
          }
          throw new Error("".concat(backendName, " backend is not registed."));
        case 3:
          if (backendName in ENGINE.registry) {
            backendFactory = tfjs_core_dist/* findBackendFactory */.W4C(backendName);
            tfjs_core_dist/* removeBackend */.rEj(backendName);
            tfjs_core_dist/* registerBackend */.gJX(backendName, backendFactory);
          }
          _context.next = 6;
          return tfjs_core_dist/* setBackend */.jh6(backendName);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _resetBackend.apply(this, arguments);
}
function setBackendAndEnvFlags(_x2, _x3) {
  return _setBackendAndEnvFlags.apply(this, arguments);
}
function _setBackendAndEnvFlags() {
  _setBackendAndEnvFlags = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(flagConfig, backend) {
    var flag, _backend$split, _backend$split2, runtime, $backend;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(flagConfig == null)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return");
        case 4:
          if (!(util_typeof(flagConfig) !== 'object')) {
            _context2.next = 6;
            break;
          }
          throw new Error("An object is expected, while a(n) ".concat(util_typeof(flagConfig), " is found."));
        case 6:
          _context2.t0 = _regeneratorRuntime().keys(flagConfig);
        case 7:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 15;
            break;
          }
          flag = _context2.t1.value;
          if (flag in TUNABLE_FLAG_VALUE_RANGE_MAP) {
            _context2.next = 11;
            break;
          }
          throw new Error("".concat(flag, " is not a tunable or valid environment flag."));
        case 11:
          if (!(TUNABLE_FLAG_VALUE_RANGE_MAP[flag].indexOf(flagConfig[flag]) === -1)) {
            _context2.next = 13;
            break;
          }
          throw new Error("".concat(flag, " value is expected to be in the range [").concat(TUNABLE_FLAG_VALUE_RANGE_MAP[flag], "], while ").concat(flagConfig[flag]) + ' is found.');
        case 13:
          _context2.next = 7;
          break;
        case 15:
          tfjs_core_dist/* env */._K2().setFlags(flagConfig);
          _backend$split = backend.split('-'), _backend$split2 = _slicedToArray(_backend$split, 2), runtime = _backend$split2[0], $backend = _backend$split2[1];
          if (!(runtime === 'tfjs')) {
            _context2.next = 20;
            break;
          }
          _context2.next = 20;
          return resetBackend($backend);
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _setBackendAndEnvFlags.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/components/pages/hands/handpose-estimation/camera.js
function camera_typeof(o) { "@babel/helpers - typeof"; return camera_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, camera_typeof(o); }
function camera_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ camera_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == camera_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(camera_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function camera_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function camera_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { camera_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { camera_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || camera_unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function camera_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return camera_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return camera_arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return camera_arrayLikeToArray(arr); }
function camera_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, camera_toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function camera_toPropertyKey(t) { var i = camera_toPrimitive(t, "string"); return "symbol" == camera_typeof(i) ? i : i + ""; }
function camera_toPrimitive(t, r) { if ("object" != camera_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != camera_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */




// These anchor points allow the hand pointcloud to resize according to its
// position in the input.
var ANCHOR_POINTS = [[0, 0, 0], [0, 0.1, 0], [-0.1, 0, 0], [-0.1, -0.1, 0]];
var fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20]
}; // for rendering each finger as a polyline

var connections = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15], [15, 16], [0, 17], [17, 18], [18, 19], [19, 20]];
function createScatterGLContext(selectors) {
  var scatterGLEl = document.querySelector(selectors);
  return {
    scatterGLEl: scatterGLEl,
    scatterGL: new scatter_gl_dist/* ScatterGL */.q1(scatterGLEl, {
      'rotateOnStart': true,
      'selectEnabled': false,
      'styles': {
        polyline: {
          defaultOpacity: 1,
          deselectedOpacity: 1
        }
      }
    }),
    scatterGLHasInitialized: false
  };
}
var scatterGLCtxtLeftHand = createScatterGLContext('#scatter-gl-container-left');
var scatterGLCtxtRightHand = createScatterGLContext('#scatter-gl-container-right');
var Camera = /*#__PURE__*/function () {
  function Camera() {
    _classCallCheck(this, Camera);
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('output');
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   * @param cameraParam From app `STATE.camera`.
   */
  return _createClass(Camera, [{
    key: "drawCtx",
    value: function drawCtx() {
      this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    }
  }, {
    key: "clearCtx",
    value: function clearCtx() {
      this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
    }

    /**
     * Draw the keypoints on the video.
     * @param hands A list of hands to render.
     */
  }, {
    key: "drawResults",
    value: function drawResults(hands) {
      // Sort by right to left hands.
      hands.sort(function (hand1, hand2) {
        if (hand1.handedness < hand2.handedness) return 1;
        if (hand1.handedness > hand2.handedness) return -1;
        return 0;
      });

      // Pad hands to clear empty scatter GL plots.
      while (hands.length < 2) hands.push({});
      for (var i = 0; i < hands.length; ++i) {
        // Third hand and onwards scatterGL context is set to null since we
        // don't render them.
        var ctxt = [scatterGLCtxtLeftHand, scatterGLCtxtRightHand][i];
        this.drawResult(hands[i], ctxt);
      }
    }

    /**
     * Draw the keypoints on the video.
     * @param hand A hand with keypoints to render.
     * @param ctxt Scatter GL context to render 3D keypoints to.
     */
  }, {
    key: "drawResult",
    value: function drawResult(hand, ctxt) {
      if (hand.keypoints != null) {
        this.drawKeypoints(hand.keypoints, hand.handedness);
      }
      // Don't render 3D hands after first two.
      if (ctxt == null) {
        return;
      }
      if (hand.keypoints3D != null && STATE.modelConfig.render3D) {
        this.drawKeypoints3D(hand.keypoints3D, hand.handedness, ctxt);
      } else {
        // Clear scatter plot.
        this.drawKeypoints3D([], '', ctxt);
      }
    }

    /**
     * Draw the keypoints on the video.
     * @param keypoints A list of keypoints.
     * @param handedness Label of hand (either Left or Right).
     */
  }, {
    key: "drawKeypoints",
    value: function drawKeypoints(keypoints, handedness) {
      var keypointsArray = keypoints;
      this.ctx.fillStyle = handedness === 'Left' ? 'Red' : 'Blue';
      this.ctx.strokeStyle = 'White';
      this.ctx.lineWidth = DEFAULT_LINE_WIDTH;
      for (var i = 0; i < keypointsArray.length; i++) {
        var y = keypointsArray[i].x;
        var x = keypointsArray[i].y;
        this.drawPoint(x - 2, y - 2, 3);
      }
      var fingers = Object.keys(fingerLookupIndices);
      for (var _i = 0; _i < fingers.length; _i++) {
        var finger = fingers[_i];
        var points = fingerLookupIndices[finger].map(function (idx) {
          return keypoints[idx];
        });
        this.drawPath(points, false);
      }
    }
  }, {
    key: "drawPath",
    value: function drawPath(points, closePath) {
      var region = new Path2D();
      region.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        var point = points[i];
        region.lineTo(point.x, point.y);
      }
      if (closePath) {
        region.closePath();
      }
      this.ctx.stroke(region);
    }
  }, {
    key: "drawPoint",
    value: function drawPoint(y, x, r) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }, {
    key: "drawKeypoints3D",
    value: function drawKeypoints3D(keypoints, handedness, ctxt) {
      var scoreThreshold = STATE.modelConfig.scoreThreshold || 0;
      var pointsData = keypoints.map(function (keypoint) {
        return [-keypoint.x, -keypoint.y, -keypoint.z];
      });
      var dataset = new scatter_gl_dist/* ScatterGL */.q1.Dataset([].concat(_toConsumableArray(pointsData), ANCHOR_POINTS));
      ctxt.scatterGL.setPointColorer(function (i) {
        if (keypoints[i] == null || keypoints[i].score < scoreThreshold) {
          // hide anchor points and low-confident points.
          return '#ffffff';
        }
        return handedness === 'Left' ? '#ff0000' : '#0000ff';
      });
      if (!ctxt.scatterGLHasInitialized) {
        ctxt.scatterGL.render(dataset);
      } else {
        ctxt.scatterGL.updateDataset(dataset);
      }
      var sequences = connections.map(function (pair) {
        return {
          indices: pair
        };
      });
      ctxt.scatterGL.setSequences(sequences);
      ctxt.scatterGLHasInitialized = true;
    }
  }], [{
    key: "setupCamera",
    value: (function () {
      var _setupCamera = camera_asyncToGenerator( /*#__PURE__*/camera_regeneratorRuntime().mark(function _callee(cameraParam) {
        var targetFPS, sizeOption, $size, videoConfig, stream, camera, videoWidth, videoHeight, _i2, _arr, ctxt;
        return camera_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
                _context.next = 2;
                break;
              }
              throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
            case 2:
              targetFPS = cameraParam.targetFPS, sizeOption = cameraParam.sizeOption;
              $size = VIDEO_SIZE[sizeOption];
              videoConfig = {
                'audio': false,
                'video': {
                  // back camera
                  facingMode: 'environment',
                  // Only setting the video to a specified size for large screen, on
                  // mobile devices accept the default size.
                  // width: isMobile() ? params.VIDEO_SIZE['360 X 270'].width : $size.width,
                  // height: isMobile() ? params.VIDEO_SIZE['360 X 270'].height :
                  //  $size.height,
                  frameRate: {
                    ideal: targetFPS
                  }
                }
              };
              _context.next = 7;
              return navigator.mediaDevices.getUserMedia(videoConfig);
            case 7:
              stream = _context.sent;
              camera = new Camera();
              camera.video.srcObject = stream;
              _context.next = 12;
              return new Promise(function (resolve) {
                camera.video.onloadedmetadata = function () {
                  // Ensure the canvas matches the video's intrinsic size
                  camera.canvas.width = camera.video.videoWidth;
                  camera.canvas.height = camera.video.videoHeight;

                  // Update the container's style if necessary, can be handled with CSS
                  var canvasContainer = document.querySelector('.canvas-wrapper');
                  canvasContainer.style.width = '100%'; // Make the container responsive
                  canvasContainer.style.height = 'auto'; // Adjust height based on the content
                  resolve(video);
                };
              });
            case 12:
              camera.video.play();
              videoWidth = camera.video.videoWidth;
              videoHeight = camera.video.videoHeight; // Must set below two lines, otherwise video element doesn't show.
              // camera.video.width = videoWidth;
              // camera.video.height = videoHeight;
              // camera.canvas.width = videoWidth;
              // camera.canvas.height = videoHeight;
              // const canvasContainer = document.querySelector('.canvas-wrapper');
              // canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;
              // Because the image from camera is mirrored, need to flip horizontally.
              if (videoConfig.video.facingMode === 'user') {
                camera.ctx.translate(camera.video.videoWidth, 0);
                camera.ctx.scale(-1, 1);
              }
              for (_i2 = 0, _arr = [scatterGLCtxtLeftHand, scatterGLCtxtRightHand]; _i2 < _arr.length; _i2++) {
                ctxt = _arr[_i2];
                ctxt.scatterGLEl.style = "width: ".concat(videoWidth / 2, "px; height: ").concat(videoHeight / 2, "px;");
                ctxt.scatterGL.resize();
                ctxt.scatterGLEl.style.display = STATE.modelConfig.render3D ? 'inline-block' : 'none';
              }
              return _context.abrupt("return", camera);
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function setupCamera(_x) {
        return _setupCamera.apply(this, arguments);
      }
      return setupCamera;
    }())
  }]);
}();
// EXTERNAL MODULE: ./node_modules/dat.gui/build/dat.gui.module.js
var dat_gui_module = __webpack_require__(47924);
;// CONCATENATED MODULE: ./src/components/pages/hands/handpose-estimation/option_panel.js
function option_panel_typeof(o) { "@babel/helpers - typeof"; return option_panel_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, option_panel_typeof(o); }
function option_panel_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ option_panel_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == option_panel_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(option_panel_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { option_panel_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function option_panel_defineProperty(obj, key, value) { key = option_panel_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function option_panel_toPropertyKey(t) { var i = option_panel_toPrimitive(t, "string"); return "symbol" == option_panel_typeof(i) ? i : i + ""; }
function option_panel_toPrimitive(t, r) { if ("object" != option_panel_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != option_panel_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function option_panel_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function option_panel_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { option_panel_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { option_panel_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */





/**
 * Records each flag's default value under the runtime environment and is a
 * constant in runtime.
 */
var TUNABLE_FLAG_DEFAULT_VALUE_MAP;
var stringValueMap = {};
function setupDatGui(_x) {
  return _setupDatGui.apply(this, arguments);
}
function _setupDatGui() {
  _setupDatGui = option_panel_asyncToGenerator( /*#__PURE__*/option_panel_regeneratorRuntime().mark(function _callee(urlParams) {
    var gui, cameraFolder, fpsController, sizeController, modelFolder, model, type, maxNumHands, modelController, backendFolder;
    return option_panel_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          gui = new dat_gui_module/* default.GUI */.Ay.GUI({
            width: 300
          });
          gui.domElement.id = 'gui';
          gui.domElement.style.display = 'none';

          // The camera folder contains options for video settings.
          cameraFolder = gui.addFolder('Camera');
          fpsController = cameraFolder.add(STATE.camera, 'targetFPS');
          fpsController.onFinishChange(function (_) {
            STATE.isTargetFPSChanged = true;
          });
          sizeController = cameraFolder.add(STATE.camera, 'sizeOption', Object.keys(VIDEO_SIZE));
          sizeController.onChange(function (_) {
            STATE.isSizeOptionChanged = true;
          });
          cameraFolder.open();

          // The model folder contains options for model selection.
          modelFolder = gui.addFolder('Model');
          model = urlParams.get('model');
          type = urlParams.get('type');
          maxNumHands = urlParams.get('maxNumHands');
          _context.t0 = model;
          _context.next = _context.t0 === 'mediapipe_hands' ? 16 : 20;
          break;
        case 16:
          STATE.model = hand_pose_detection_esm/* SupportedModels */.J.MediaPipeHands;
          if (type !== 'full' && type !== 'lite') {
            // Nulify invalid value.
            type = 'lite';
          }
          if (maxNumHands == null || maxNumHands < 1) {
            // Nulify invalid value.
            maxNumHands = 1;
          }
          return _context.abrupt("break", 22);
        case 20:
          alert("".concat(urlParams.get('model')));
          return _context.abrupt("break", 22);
        case 22:
          modelController = modelFolder.add(STATE, 'model', Object.values(hand_pose_detection_esm/* SupportedModels */.J));
          modelController.onChange(function (_) {
            STATE.isModelChanged = true;
            showModelConfigs(modelFolder);
            showBackendConfigs(backendFolder);
          });
          showModelConfigs(modelFolder, type, maxNumHands);
          modelFolder.open();
          backendFolder = gui.addFolder('Backend');
          showBackendConfigs(backendFolder);
          backendFolder.open();
          return _context.abrupt("return", gui);
        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _setupDatGui.apply(this, arguments);
}
function showBackendConfigs(_x2) {
  return _showBackendConfigs.apply(this, arguments);
}
function _showBackendConfigs() {
  _showBackendConfigs = option_panel_asyncToGenerator( /*#__PURE__*/option_panel_regeneratorRuntime().mark(function _callee3(folderController) {
    var fixedSelectionCount, backends, backendController;
    return option_panel_regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // Clean up backend configs for the previous model.
          fixedSelectionCount = 0;
          while (folderController.__controllers.length > fixedSelectionCount) {
            folderController.remove(folderController.__controllers[folderController.__controllers.length - 1]);
          }
          backends = MODEL_BACKEND_MAP[STATE.model]; // The first element of the array is the default backend for the model.
          STATE.backend = backends[0];
          backendController = folderController.add(STATE, 'backend', backends);
          backendController.name('runtime-backend');
          backendController.onChange( /*#__PURE__*/function () {
            var _ref = option_panel_asyncToGenerator( /*#__PURE__*/option_panel_regeneratorRuntime().mark(function _callee2(backend) {
              return option_panel_regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    STATE.isBackendChanged = true;
                    _context2.next = 3;
                    return showFlagSettings(folderController, backend);
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x5) {
              return _ref.apply(this, arguments);
            };
          }());
          _context3.next = 9;
          return showFlagSettings(folderController, STATE.backend);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _showBackendConfigs.apply(this, arguments);
}
function showModelConfigs(folderController, type, maxNumHands) {
  // Clean up model configs for the previous model.
  // The first constroller under the `folderController` is the model
  // selection.
  var fixedSelectionCount = 1;
  while (folderController.__controllers.length > fixedSelectionCount) {
    folderController.remove(folderController.__controllers[folderController.__controllers.length - 1]);
  }
  switch (STATE.model) {
    case hand_pose_detection_esm/* SupportedModels */.J.MediaPipeHands:
      addMediaPipeHandsControllers(folderController, type, maxNumHands);
      break;
    default:
      alert("Model ".concat(STATE.model, " is not supported."));
  }
}

// The MediaPipeHands model config folder contains options for MediaPipeHands config
// settings.
function addMediaPipeHandsControllers(modelConfigFolder, type, maxNumHands) {
  STATE.modelConfig = _objectSpread({}, MEDIAPIPE_HANDS_CONFIG);
  STATE.modelConfig.type = type != null ? type : 'full';
  STATE.modelConfig.maxNumHands = maxNumHands != null ? maxNumHands : 2;
  var typeController = modelConfigFolder.add(STATE.modelConfig, 'type', ['lite', 'full']);
  typeController.onChange(function (_) {
    // Set isModelChanged to true, so that we don't render any result during
    // changing models.
    STATE.isModelChanged = true;
  });
  var maxNumHandsController = modelConfigFolder.add(STATE.modelConfig, 'maxNumHands', 1, 10).step(1);
  maxNumHandsController.onChange(function (_) {
    // Set isModelChanged to true, so that we don't render any result during
    // changing models.
    STATE.isModelChanged = true;
  });
  var render3DController = modelConfigFolder.add(STATE.modelConfig, 'render3D');
  render3DController.onChange(function (render3D) {
    document.querySelector('#scatter-gl-container-left').style.display = render3D ? 'inline-block' : 'none';
    document.querySelector('#scatter-gl-container-right').style.display = render3D ? 'inline-block' : 'none';
  });
}

/**
 * Query all tunable flags' default value and populate `STATE.flags` with them.
 */
function initDefaultValueMap() {
  return _initDefaultValueMap.apply(this, arguments);
}
/**
 * Heuristically determine flag's value range based on flag's default value.
 *
 * Assume that the flag's default value has already chosen the best option for
 * the runtime environment, so users can only tune the flag value downwards.
 *
 * For example, if the default value of `WEBGL_RENDER_FLOAT32_CAPABLE` is false,
 * the tunable range is [false]; otherwise, the tunable range is [true. false].
 *
 * @param {string} flag
 */
function _initDefaultValueMap() {
  _initDefaultValueMap = option_panel_asyncToGenerator( /*#__PURE__*/option_panel_regeneratorRuntime().mark(function _callee4() {
    var backend, index, flag, _flag;
    return option_panel_regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          // Clean up the cache to query tunable flags' default values.
          TUNABLE_FLAG_DEFAULT_VALUE_MAP = {};
          STATE.flags = {};
          _context4.t0 = option_panel_regeneratorRuntime().keys(BACKEND_FLAGS_MAP);
        case 3:
          if ((_context4.t1 = _context4.t0()).done) {
            _context4.next = 16;
            break;
          }
          backend = _context4.t1.value;
          index = 0;
        case 6:
          if (!(index < BACKEND_FLAGS_MAP[backend].length)) {
            _context4.next = 14;
            break;
          }
          flag = BACKEND_FLAGS_MAP[backend][index];
          _context4.next = 10;
          return tfjs_core_dist/* env */._K2().getAsync(flag);
        case 10:
          TUNABLE_FLAG_DEFAULT_VALUE_MAP[flag] = _context4.sent;
        case 11:
          index++;
          _context4.next = 6;
          break;
        case 14:
          _context4.next = 3;
          break;
        case 16:
          // Initialize STATE.flags with tunable flags' default values.
          for (_flag in TUNABLE_FLAG_DEFAULT_VALUE_MAP) {
            if (BACKEND_FLAGS_MAP[STATE.backend].indexOf(_flag) > -1) {
              STATE.flags[_flag] = TUNABLE_FLAG_DEFAULT_VALUE_MAP[_flag];
            }
          }
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _initDefaultValueMap.apply(this, arguments);
}
function getTunableRange(flag) {
  var defaultValue = TUNABLE_FLAG_DEFAULT_VALUE_MAP[flag];
  if (flag === 'WEBGL_FORCE_F16_TEXTURES') {
    return [false, true];
  } else if (flag === 'WEBGL_VERSION') {
    var tunableRange = [];
    for (var value = 1; value <= defaultValue; value++) {
      tunableRange.push(value);
    }
    return tunableRange;
  } else if (flag === 'WEBGL_FLUSH_THRESHOLD') {
    var _tunableRange = [-1];
    for (var _value = 0; _value <= 2; _value += 0.25) {
      _tunableRange.push(_value);
    }
    return _tunableRange;
  } else if (typeof defaultValue === 'boolean') {
    return defaultValue ? [false, true] : [false];
  } else if (TUNABLE_FLAG_VALUE_RANGE_MAP[flag] != null) {
    return TUNABLE_FLAG_VALUE_RANGE_MAP[flag];
  } else {
    return [defaultValue];
  }
}

/**
 * Show flag settings for the given backend under the UI element of
 * `folderController`.
 *
 * @param {dat.gui.GUI} folderController
 * @param {string} backendName
 */
function showBackendFlagSettings(folderController, backendName) {
  var tunableFlags = BACKEND_FLAGS_MAP[backendName];
  var _loop = function _loop() {
    var flag = tunableFlags[index];
    var flagName = TUNABLE_FLAG_NAME_MAP[flag] || flag;

    // When tunable (bool) and range (array) attributes of `flagRegistry` is
    // implemented, we can apply them to here.
    var flagValueRange = getTunableRange(flag);
    // Heuristically consider a flag with at least two options as tunable.
    if (flagValueRange.length < 2) {
      console.warn("The ".concat(flag, " is considered as untunable, ") + "because its value range is [".concat(flagValueRange, "]."));
      return 1; // continue
    }
    var flagController;
    if (typeof flagValueRange[0] === 'boolean') {
      // Show checkbox for boolean flags.
      flagController = folderController.add(STATE.flags, flag);
    } else {
      // Show dropdown for other types of flags.
      flagController = folderController.add(STATE.flags, flag, flagValueRange);

      // Because dat.gui always casts dropdown option values to string, we need
      // `stringValueMap` and `onFinishChange()` to recover the value type.
      if (stringValueMap[flag] == null) {
        stringValueMap[flag] = {};
        for (var _index = 0; _index < flagValueRange.length; _index++) {
          var realValue = flagValueRange[_index];
          var stringValue = String(flagValueRange[_index]);
          stringValueMap[flag][stringValue] = realValue;
        }
      }
      flagController.onFinishChange(function (stringValue) {
        STATE.flags[flag] = stringValueMap[flag][stringValue];
      });
    }
    flagController.name(flagName).onChange(function () {
      STATE.isFlagChanged = true;
    });
  };
  for (var index = 0; index < tunableFlags.length; index++) {
    if (_loop()) continue;
  }
}

/**
 * Set up flag settings under the UI element of `folderController`:
 * - If it is the first call, initialize the flags' default value and show flag
 * settings for both the general and the given backend.
 * - Else, clean up flag settings for the previous backend and show flag
 * settings for the new backend.
 *
 * @param {dat.gui.GUI} folderController
 * @param {string} backendName
 */
function showFlagSettings(_x3, _x4) {
  return _showFlagSettings.apply(this, arguments);
}
function _showFlagSettings() {
  _showFlagSettings = option_panel_asyncToGenerator( /*#__PURE__*/option_panel_regeneratorRuntime().mark(function _callee5(folderController, backendName) {
    var fixedSelectionCount;
    return option_panel_regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return initDefaultValueMap();
        case 2:
          // Clean up flag settings for the previous backend.
          // The first constroller under the `folderController` is the backend
          // setting.
          fixedSelectionCount = 1;
          while (folderController.__controllers.length > fixedSelectionCount) {
            folderController.remove(folderController.__controllers[folderController.__controllers.length - 1]);
          }

          // Show flag settings for the new backend.
          showBackendFlagSettings(folderController, backendName);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _showFlagSettings.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/components/pages/hands/handpose-estimation/index.js
function handpose_estimation_typeof(o) { "@babel/helpers - typeof"; return handpose_estimation_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, handpose_estimation_typeof(o); }
function handpose_estimation_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ handpose_estimation_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == handpose_estimation_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(handpose_estimation_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function handpose_estimation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function handpose_estimation_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { handpose_estimation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { handpose_estimation_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */


// import * as mpHands from '@mediapipe/hands';


tfjs_backend_wasm_dist/* setWasmPaths */.zj("https://chat.positive-intentions.com/wasm");






var detector, camera, stats;
var startInferenceTime,
  numInferences = 0;
var inferenceTimeSum = 0,
  lastPanelUpdate = 0;
var rafId;
function createDetector() {
  return _createDetector.apply(this, arguments);
}
function _createDetector() {
  _createDetector = handpose_estimation_asyncToGenerator( /*#__PURE__*/handpose_estimation_regeneratorRuntime().mark(function _callee() {
    var runtime;
    return handpose_estimation_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = STATE.model;
          _context.next = _context.t0 === hand_pose_detection_esm/* SupportedModels */.J.MediaPipeHands ? 3 : 10;
          break;
        case 3:
          runtime = STATE.backend.split('-')[0];
          if (!(runtime === 'mediapipe')) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", hand_pose_detection_esm/* createDetector */.F(STATE.model, {
            runtime: runtime,
            modelType: STATE.modelConfig.type,
            maxHands: STATE.modelConfig.maxNumHands,
            solutionPath: "https://chat.positive-intentions.com/wasm"
          }));
        case 8:
          if (!(runtime === 'tfjs')) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", hand_pose_detection_esm/* createDetector */.F(STATE.model, {
            runtime: runtime,
            modelType: STATE.modelConfig.type,
            maxHands: STATE.modelConfig.maxNumHands
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createDetector.apply(this, arguments);
}
function checkGuiUpdate() {
  return _checkGuiUpdate.apply(this, arguments);
}
function _checkGuiUpdate() {
  _checkGuiUpdate = handpose_estimation_asyncToGenerator( /*#__PURE__*/handpose_estimation_regeneratorRuntime().mark(function _callee2() {
    return handpose_estimation_regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(STATE.isTargetFPSChanged || STATE.isSizeOptionChanged)) {
            _context2.next = 6;
            break;
          }
          _context2.next = 3;
          return Camera.setupCamera(STATE.camera);
        case 3:
          camera = _context2.sent;
          STATE.isTargetFPSChanged = false;
          STATE.isSizeOptionChanged = false;
        case 6:
          if (!(STATE.isModelChanged || STATE.isFlagChanged || STATE.isBackendChanged)) {
            _context2.next = 26;
            break;
          }
          STATE.isModelChanged = true;
          window.cancelAnimationFrame(rafId);
          if (detector != null) {
            detector.dispose();
          }
          if (!(STATE.isFlagChanged || STATE.isBackendChanged)) {
            _context2.next = 13;
            break;
          }
          _context2.next = 13;
          return setBackendAndEnvFlags(STATE.flags, STATE.backend);
        case 13:
          _context2.prev = 13;
          _context2.next = 16;
          return createDetector(STATE.model);
        case 16:
          detector = _context2.sent;
          _context2.next = 23;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](13);
          detector = null;
          alert(_context2.t0);
        case 23:
          STATE.isFlagChanged = false;
          STATE.isBackendChanged = false;
          STATE.isModelChanged = false;
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[13, 19]]);
  }));
  return _checkGuiUpdate.apply(this, arguments);
}
function beginEstimateHandsStats() {
  startInferenceTime = (performance || Date).now();
}
function endEstimateHandsStats() {
  var endInferenceTime = (performance || Date).now();
  inferenceTimeSum += endInferenceTime - startInferenceTime;
  ++numInferences;
  var panelUpdateMilliseconds = 1000;
  if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {
    var averageInferenceTime = inferenceTimeSum / numInferences;
    inferenceTimeSum = 0;
    numInferences = 0;
    // stats.customFpsPanel.update(
    //     1000.0 / averageInferenceTime, 120 /* maxValue */);
    lastPanelUpdate = endInferenceTime;
  }
}
function renderResult() {
  return _renderResult.apply(this, arguments);
}
function _renderResult() {
  _renderResult = handpose_estimation_asyncToGenerator( /*#__PURE__*/handpose_estimation_regeneratorRuntime().mark(function _callee3() {
    var hands;
    return handpose_estimation_regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(camera.video.readyState < 2)) {
            _context3.next = 3;
            break;
          }
          _context3.next = 3;
          return new Promise(function (resolve) {
            camera.video.onloadeddata = function () {
              resolve(video);
            };
          });
        case 3:
          hands = null; // Detector can be null if initialization failed (for example when loading
          // from a URL that does not exist).
          if (!(detector != null)) {
            _context3.next = 18;
            break;
          }
          // FPS only counts the time it takes to finish estimateHands.
          beginEstimateHandsStats();

          // Detectors can throw errors, for example when using custom URLs that
          // contain a model that doesn't provide the expected output.
          _context3.prev = 6;
          _context3.next = 9;
          return detector.estimateHands(camera.video, {
            flipHorizontal: false
          });
        case 9:
          hands = _context3.sent;
          _context3.next = 17;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](6);
          detector.dispose();
          detector = null;
          alert(_context3.t0);
        case 17:
          endEstimateHandsStats();
        case 18:
          camera.drawCtx();

          // The null check makes sure the UI is not in the middle of changing to a
          // different model. If during model change, the result is from an old model,
          // which shouldn't be rendered.
          if (hands && hands.length > 0 && !STATE.isModelChanged) {
            camera.drawResults(hands);
          }
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[6, 12]]);
  }));
  return _renderResult.apply(this, arguments);
}
function renderPrediction() {
  return _renderPrediction.apply(this, arguments);
}
function _renderPrediction() {
  _renderPrediction = handpose_estimation_asyncToGenerator( /*#__PURE__*/handpose_estimation_regeneratorRuntime().mark(function _callee4() {
    return handpose_estimation_regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return checkGuiUpdate();
        case 2:
          if (STATE.isModelChanged) {
            _context4.next = 5;
            break;
          }
          _context4.next = 5;
          return renderResult();
        case 5:
          rafId = requestAnimationFrame(renderPrediction);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _renderPrediction.apply(this, arguments);
}
;
function app() {
  return _app.apply(this, arguments);
}
function _app() {
  _app = handpose_estimation_asyncToGenerator( /*#__PURE__*/handpose_estimation_regeneratorRuntime().mark(function _callee5() {
    var urlParams;
    return handpose_estimation_regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          // Gui content will change depending on which model is in the query string.
          urlParams = new URLSearchParams(window.location.search);
          if (!urlParams.has('model')) {
            // set default model to "mediapipe_hands"
            urlParams.set('model', 'mediapipe_hands');
          }
          _context5.next = 4;
          return setupDatGui(urlParams);
        case 4:
          _context5.next = 6;
          return Camera.setupCamera(STATE.camera);
        case 6:
          camera = _context5.sent;
          _context5.next = 9;
          return setBackendAndEnvFlags(STATE.flags, STATE.backend);
        case 9:
          _context5.next = 11;
          return createDetector();
        case 11:
          detector = _context5.sent;
          renderPrediction();
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _app.apply(this, arguments);
}
;
app();

/***/ }),

/***/ 9893:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 8074:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 45281:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 97244:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 13556:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 85817:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 96209:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 41234:
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=990.main.js.map