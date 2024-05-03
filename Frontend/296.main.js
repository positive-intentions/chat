"use strict";
(self["webpackChunkchat"] = self["webpackChunkchat"] || []).push([[296],{

/***/ 35296:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Verse)
});

// EXTERNAL MODULE: consume shared module (default) react@^17.0.0 || ^18.2.0 (singleton) (fallback: ./node_modules/react/index.js)
var index_js_ = __webpack_require__(5160);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./node_modules/@mui/material/Typography/Typography.js + 1 modules
var Typography = __webpack_require__(68857);
// EXTERNAL MODULE: ./node_modules/@mui/styles/makeStyles/makeStyles.js + 6 modules
var makeStyles = __webpack_require__(64332);
// EXTERNAL MODULE: ./node_modules/@mui/styles/useTheme/index.js
var useTheme = __webpack_require__(52600);
// EXTERNAL MODULE: ./src/components/redux/slices/userProfileSlice.js
var userProfileSlice = __webpack_require__(91608);
// EXTERNAL MODULE: ./src/components/atomic/organism/page-container/PageContainer.js + 1 modules
var PageContainer = __webpack_require__(84116);
// EXTERNAL MODULE: ./src/components/atomic/molecules/thread/Thread.js + 3 modules
var Thread = __webpack_require__(20972);
// EXTERNAL MODULE: ./src/components/atomic/atom/message/Message.js + 3 modules
var Message = __webpack_require__(61976);
// EXTERNAL MODULE: ./src/components/redux/slices/podsSlice.js
var podsSlice = __webpack_require__(6552);
// EXTERNAL MODULE: ./src/components/p2p/usePeer.js
var usePeer = __webpack_require__(91216);
// EXTERNAL MODULE: ./src/components/redux/slices/storageSlice.js
var storageSlice = __webpack_require__(16864);
// EXTERNAL MODULE: ./src/components/blockchain/Blockchain.js + 1 modules
var Blockchain = __webpack_require__(76968);
// EXTERNAL MODULE: ./src/components/blockchain/chains/profileChain.js
var profileChain = __webpack_require__(6088);
// EXTERNAL MODULE: ./src/components/blockchain/chains/podChain.js
var podChain = __webpack_require__(53012);
// EXTERNAL MODULE: ./node_modules/react-i18next/dist/es/index.js + 15 modules
var es = __webpack_require__(70100);
// EXTERNAL MODULE: ./node_modules/@babylonjs/loaders/glTF/index.js + 50 modules
var glTF = __webpack_require__(37406);
// EXTERNAL MODULE: ./node_modules/@babylonjs/loaders/OBJ/index.js + 4 modules
var OBJ = __webpack_require__(35824);
// EXTERNAL MODULE: ./node_modules/@babylonjs/core/index.js + 996 modules
var core = __webpack_require__(73052);
// EXTERNAL MODULE: ./node_modules/react-router/dist/index.js
var dist = __webpack_require__(83284);
// EXTERNAL MODULE: ./node_modules/react-redux/dist/react-redux.mjs
var react_redux = __webpack_require__(52328);
// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(33568);
;// CONCATENATED MODULE: ./src/components/pages/verse/SceneComponent.jsx
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["antialias", "engineOptions", "adaptToDeviceRatio", "sceneOptions", "onRender", "onSceneReady"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }












// detect if mobile device
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
/* harmony default export */ const SceneComponent = (function (_ref) {
  var _onlineUsersFromPod$;
  var antialias = _ref.antialias,
    engineOptions = _ref.engineOptions,
    adaptToDeviceRatio = _ref.adaptToDeviceRatio,
    sceneOptions = _ref.sceneOptions,
    onRender = _ref.onRender,
    onSceneReady = _ref.onSceneReady,
    rest = _objectWithoutProperties(_ref, _excluded);
  var reactCanvas = (0,index_js_.useRef)(null);
  var theme = (0,useTheme/* default */.c)();
  var isDarkTheme = theme.palette.mode === "dark";
  var _useState = (0,index_js_.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    engine = _useState2[0],
    setEngine = _useState2[1];
  var _useState3 = (0,index_js_.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    scene = _useState4[0],
    setScene = _useState4[1];
  var _useParams = (0,dist/* useParams */.W4)(),
    podId = _useParams.podId;
  var dispatch = (0,react_redux/* useDispatch */.OY)();
  var userProfileBlockchain = (0,react_redux/* useSelector */.w1)(function (state) {
    return state.userProfile.blockchain;
  });
  //   const addToBlockchainDispatch = ({block, blocks, storage}) => dispatch(addToBlockchain({ podId, block,blocks, storage }));
  var _useBlockchain = (0,Blockchain/* useBlockchain */.e)({
      compiler: profileChain/* compiler */.G,
      blockchain: userProfileBlockchain
      //   dispatch: addToBlockchainDispatch,
    }),
    userProfile = _useBlockchain.compiledBlockchain;
  var storedConnectionId = userProfile.connectionId;
  var storedPods = (0,react_redux/* useSelector */.w1)(function (state) {
    return state.pods;
  });
  var addToBlockchainDispatch = function addToBlockchainDispatch(_ref2) {
    var block = _ref2.block,
      blocks = _ref2.blocks,
      storage = _ref2.storage;
    return dispatch((0,podsSlice/* addToBlockchain */.Sk)({
      podId: podId,
      block: block,
      blocks: blocks,
      storage: storage
    }));
  };
  var conversation = storedPods.find(function (pod) {
    return pod.id === podId;
  });
  var _useBlockchain2 = (0,Blockchain/* useBlockchain */.e)({
      compiler: podChain/* compiler */.Gm,
      blockchain: conversation === null || conversation === void 0 ? void 0 : conversation.blockchain,
      dispatch: addToBlockchainDispatch
    }),
    podBlockchain = _useBlockchain2.compiledBlockchain,
    addBlocksToPod = _useBlockchain2.addBlocks;
  var _usePeer = (0,usePeer/* default */.c)((podBlockchain === null || podBlockchain === void 0 ? void 0 : podBlockchain.users) || []),
    sendMessage = _usePeer.sendMessage,
    makeCall = _usePeer.makeCall,
    endCall = _usePeer.endCall,
    calls = _usePeer.calls,
    callsHash = _usePeer.callsHash,
    activeConnections = _usePeer.activeConnections;
  var _ref3 = (0,react_redux/* useSelector */.w1)(function (state) {
      return state.pods.find(function (pod) {
        return pod.id === podId;
      });
    }) || {},
    ephemeralStorage = _ref3.ephemeralStorage;
  var _useState5 = (0,index_js_.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    mediaStream = _useState6[0],
    setMediaStream = _useState6[1];
  var _useState7 = (0,index_js_.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    calledContacts = _useState8[0],
    setCalledContacts = _useState8[1];

  // useEffect(() => {
  //     podBlockchain.users
  //         .filter(user => activeConnections)
  //         .forEach((user) => {
  //         // if (!calls.includes(c => c.peer === user) && activeConnections.includes(user)) {
  //         //     makeCall({ video: true, audio: true });
  //         // }

  //         // callsUnanswered.forEach((call) => {
  //             //     makeCall({ video: true, audio: true });
  //             //     setCalledContacts([...calledContacts, user]);
  //             // });

  //         // const callUnanswered = calls.filter((call) => !call._remoteStream && call.peer === user);
  //         // console.log({ callUnanswered, calls, user })
  //         // setCalledContacts([...calledContacts, user]);

  //             makeCall({ video: true, audio: true });
  //             setCalledContacts(true);
  //     });
  //     // if (calledContacts === false){
  //     // }
  // }, [calledContacts])

  var handleAnswerCall = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(call) {
      var _call$_remoteStream;
      var hasVideo, newMediaStream;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            hasVideo = ((_call$_remoteStream = call._remoteStream) === null || _call$_remoteStream === void 0 ? void 0 : _call$_remoteStream.getVideoTracks().length) > 0;
            _context.next = 3;
            return navigator.mediaDevices.getUserMedia({
              video: hasVideo ? true : true,
              audio: true
            });
          case 3:
            newMediaStream = _context.sent;
            call.answer(newMediaStream);
            // setMediaStream(newMediaStream)
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleAnswerCall(_x) {
      return _ref4.apply(this, arguments);
    };
  }();
  (0,index_js_.useEffect)(function () {
    console.log({
      calls: calls
    });
    calls.forEach(function (call) {
      // is this a new call?
      if (!call._remoteStream) {
        handleAnswerCall(call);
      }
    });
  }, [calls]);

  // console.log(">>>> isDarkTheme: ", isDarkTheme, theme.palette, calls, ephemeralStorage, ephemeralStorage?.verse?.position)

  var onMove = function onMove(position) {
    console.log("sending position: ", {
      position: position
    });
    sendMessage({
      type: "updateEphemeralStorage",
      callback: false,
      payload: {
        podId: podId,
        ephemeralStorage: {
          verse: {
            position: position
          }
        }
      }
    });
  };
  var storedContacts = (0,react_redux/* useSelector */.w1)(function (state) {
    return state.contacts;
  });
  var onlineUsersFromPod = ((podBlockchain === null || podBlockchain === void 0 ? void 0 : podBlockchain.users) || []).filter(function (user) {
    return activeConnections.includes(user);
  }).map(function (user) {
    var contact = storedContacts.find(function (contact) {
      return contact.connectionId === user;
    });
    return contact;
  });
  var peerAvatar = onlineUsersFromPod === null || onlineUsersFromPod === void 0 || (_onlineUsersFromPod$ = onlineUsersFromPod[0]) === null || _onlineUsersFromPod$ === void 0 ? void 0 : _onlineUsersFromPod$.avatar;
  var debouncedOnMove = (0,lodash.debounce)(onMove, 1000);
  var throttledOnMove = (0,lodash.throttle)(onMove, 5);
  var onReduxConnectedRender = (0,index_js_.useMemo)(function () {
    return onRender({
      calls: calls,
      ephemeralStorage: ephemeralStorage,
      onMove: throttledOnMove
    });
  }, [calls, ephemeralStorage, peerAvatar]);

  // set up basic engine and scene
  (0,index_js_.useEffect)(function () {
    var resize = function resize() {
      scene.getEngine().resize();
    };
    var initCanvas = function initCanvas() {
      var canvas = reactCanvas.current;
      if (!canvas) return;
      var engine = new core/* Engine */.Qz9(canvas, antialias, engineOptions, adaptToDeviceRatio);
      setEngine(engine);
      var scene = new core/* Scene */.KAh(engine, sceneOptions);
      setScene(scene);
      // const xr = scene.createDefaultXRExperienceAsync({
      //     // ask for an ar-session
      //     uiOptions: {
      //       sessionMode: "immersive-ar",
      //     },
      //   });

      if (scene.isReady()) {
        onSceneReady(scene, {
          isDarkTheme: isDarkTheme,
          calls: calls,
          isInPod: !!podId,
          peerAvatar: peerAvatar
        });
      } else {
        scene.onReadyObservable.addOnce(function (scene) {
          return onSceneReady(scene, {
            isDarkTheme: isDarkTheme,
            calls: calls,
            isInPod: !!podId,
            peerAvatar: peerAvatar
          });
        });
      }
      engine.runRenderLoop(function () {
        if (typeof onReduxConnectedRender === "function") onReduxConnectedRender(scene);
        scene.render();
      });
      if (window) {
        window.addEventListener("resize", resize);
      }
    };
    initCanvas();
    return function () {
      scene === null || scene === void 0 || scene.getEngine().dispose();
      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, isDarkTheme]);
  var throttledEngineReset = (0,lodash.throttle)(function () {
    if (engine) {
      engine.stopRenderLoop();
      engine.runRenderLoop(function () {
        if (typeof onReduxConnectedRender === "function") onReduxConnectedRender(scene);
        scene && scene.render();
      });
    }
  }, 5);
  (0,index_js_.useEffect)(function () {
    throttledEngineReset();
  }, [onReduxConnectedRender]);
  return /*#__PURE__*/index_js_default().createElement((index_js_default()).Fragment, null, /*#__PURE__*/index_js_default().createElement("canvas", _extends({
    ref: reactCanvas
  }, rest)), calls.length > 0 && calls.map(function (call) {
    return /*#__PURE__*/index_js_default().createElement("video", {
      key: call.peer,
      src: call._remoteStream,
      autoPlay: true,
      playsInline: true
      // hidden from view
      ,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: -1
      }
    });
  }));
});
;// CONCATENATED MODULE: ./src/components/pages/verse/Verse.js
function Verse_typeof(o) { "@babel/helpers - typeof"; return Verse_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Verse_typeof(o); }
function Verse_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ Verse_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == Verse_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(Verse_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function Verse_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function Verse_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Verse_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Verse_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



































 // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// import "./App.css";

var lightBackground = "/backgrounds/light-leaves.png";
var darkBackground = "/backgrounds/dark-leaves.png";
var box;
var box2;
var box3;
var box4;
var box5;
var box6;
var box7;
var box8;
var box9;
var cameraPosition = {
  x: 0,
  y: 0,
  z: 0
};
var cameraRotation = {
  x: 0,
  y: 0,
  z: 0
};
var mirror;
var peerPlane;
var peerAvatar;
var xr;
var VJC;
var skydome = null;
var catModel;
var catModelPath = "/models/cat.glb";
var handModel;
var handModelPath = "/models/l_hand_rhs.glb";

// detect if mobile device
var Verse_isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var onSceneReady = /*#__PURE__*/function () {
  var _ref2 = Verse_asyncToGenerator( /*#__PURE__*/Verse_regeneratorRuntime().mark(function _callee(scene, _ref) {
    var _xr;
    var isDarkTheme, calls, isInPod, peerAvatarBase64, camera, canvas, target, currentState, speed, rotation, mouseSpeed, mouseX, mouseY, lmx, lmy, clamp, light, material, material2, material3, material4, material5, material6, material7, material8, material9, result, catModel, materialPeerAvatar, peerAvatarBase64String, ground, groundMaterial, handModelUrl, isInXr;
    return Verse_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          clamp = function _clamp(value, min, max) {
            return Math.max(Math.min(value, max), min);
          };
          isDarkTheme = _ref.isDarkTheme, calls = _ref.calls, isInPod = _ref.isInPod, peerAvatarBase64 = _ref.peerAvatar;
          // This creates and positions a free camera (non-mesh)
          camera = new core/* FreeCamera */.khM("camera1", new core/* Vector3 */.O4c(0, 2, -6), scene); // This targets the camera to scene origin
          // camera.setTarget(Vector3.Zero());
          canvas = scene.getEngine().getRenderingCanvas();
          canvas.style.cursor = "none";

          // This attaches the camera to the canvas with slower movement speed.
          // camera.attachControl(canvas, true);
          camera.speed = 0.1;
          camera.angularSensibility = 3000;
          camera.attachControl(canvas, true);

          // wasd controls and up/down with spacebar and shift
          camera.keysUp.push(87); // W
          camera.keysDown.push(83); // S
          camera.keysLeft.push(65); // A
          camera.keysRight.push(68); // D
          camera.keysUpward.push(32); // Spacebar
          camera.keysDownward.push(16); // Shift

          //in-game changed variables
          target = new core/* TransformNode */.Qxc();
          currentState = "idle";
          speed = 0;
          rotation = 0;
          mouseSpeed = 1.0;
          mouseX = 0, mouseY = 0;
          lmx = 0, lmy = 0;
          scene.onPointerMove = function (evt) {
            var mx = evt.clientX;
            var my = evt.clientY;
            mouseX += (mx - lmx) * mouseSpeed;
            mouseY += (my - lmy) * mouseSpeed;
            mouseY = clamp(mouseY, -35, 45);
            lmx = mx;
            lmy = my;
            target.rotation = new core/* Vector3 */.O4c(core/* Tools */.sbU.ToRadians(mouseY) % 360, core/* Tools */.sbU.ToRadians(mouseX) % 360, 0);
          };
          //mouse lock
          canvas.onclick = function () {
            canvas.requestPointerLock();
          };
          // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
          light = new core/* HemisphericLight */.EVu("light", new core/* Vector3 */.O4c(0, 1, 0), scene); // Default intensity is 1. Let's dim the light a small amount
          light.intensity = 0.7;

          // Our built-in 'box' shape. make it light blue #1565c0
          box = core/* MeshBuilder */.OG0.CreateBox("box", {
            size: 0.5
          }, scene);
          material = new core/* StandardMaterial */.uGc("material", scene);
          material.diffuseTexture = new core/* Texture */.wlS("/avatars/1.jpg", scene);
          box.material = material;
          // Move the box upward 1/2 its height
          box.position.y = 1;
          box.position.z = -3;

          // create another box above with different colored sides
          box2 = core/* MeshBuilder */.OG0.CreateBox("box2", {
            size: 0.5
          }, scene);
          box2.position.y = 1.7;
          box2.position.z = -3;
          material2 = new core/* StandardMaterial */.uGc("material2", scene);
          material2.diffuseTexture = new core/* Texture */.wlS("/avatars/2.jpg", scene);
          material2.diffuseColor = new core/* Color3 */.gVi(0.212, 0.596, 0.941);
          box2.material = material2;

          // create another box above with different colored sides
          box3 = core/* MeshBuilder */.OG0.CreateBox("box3", {
            size: 0.5
          }, scene);
          box3.position.y = 2.4;
          box3.position.z = -3;
          material3 = new core/* StandardMaterial */.uGc("material3", scene);
          material3.diffuseTexture = new core/* Texture */.wlS("/avatars/3.jpg", scene);
          box3.material = material3;

          // create another box above with different colored sides
          box4 = core/* MeshBuilder */.OG0.CreateBox("box4", {
            size: 0.5
          }, scene);
          box4.position.y = 1;
          box4.position.x = 0.9;
          box4.position.z = -3;
          material4 = new core/* StandardMaterial */.uGc("material4", scene);
          material4.diffuseTexture = new core/* Texture */.wlS("/avatars/4.jpg", scene);
          material4.diffuseColor = new core/* Color3 */.gVi(0.212, 0.596, 0.941);
          box4.material = material4;

          // create another box above with different colored sides
          box5 = core/* MeshBuilder */.OG0.CreateBox("box5", {
            size: 0.5
          }, scene);
          box5.position.y = 1.7;
          box5.position.x = 0.9;
          box5.position.z = -3;
          material5 = new core/* StandardMaterial */.uGc("material5", scene);
          material5.diffuseTexture = new core/* Texture */.wlS("/avatars/5.jpg", scene);
          box5.material = material5;

          // create another box above with different colored sides
          box6 = core/* MeshBuilder */.OG0.CreateBox("box6", {
            size: 0.5
          }, scene);
          box6.position.y = 2.4;
          box6.position.x = 0.9;
          box6.position.z = -3;
          material6 = new core/* StandardMaterial */.uGc("material6", scene);
          material6.diffuseTexture = new core/* Texture */.wlS("/avatars/6.jpg", scene);
          material6.diffuseColor = new core/* Color3 */.gVi(0.212, 0.596, 0.941);
          box6.material = material6;

          // create another box above with different colored sides
          box7 = core/* MeshBuilder */.OG0.CreateBox("box7", {
            size: 0.5
          }, scene);
          box7.position.y = 1;
          box7.position.x = -0.9;
          box7.position.z = -3;
          material7 = new core/* StandardMaterial */.uGc("material7", scene);
          material7.diffuseTexture = new core/* Texture */.wlS("/avatars/7.jpg", scene);
          material7.diffuseColor = new core/* Color3 */.gVi(0.212, 0.596, 0.941);
          box7.material = material7;

          // create another box above with different colored sides
          box8 = core/* MeshBuilder */.OG0.CreateBox("box8", {
            size: 0.5
          }, scene);
          box8.position.y = 1.7;
          box8.position.x = -0.9;
          box8.position.z = -3;
          material8 = new core/* StandardMaterial */.uGc("material8", scene);
          material8.diffuseTexture = new core/* Texture */.wlS("/avatars/8.jpg", scene);
          box8.material = material8;

          // create another box above with different colored sides
          box9 = core/* MeshBuilder */.OG0.CreateBox("box9", {
            size: 0.5
          }, scene);
          box9.position.y = 2.4;
          box9.position.x = -0.9;
          box9.position.z = -3;
          material9 = new core/* StandardMaterial */.uGc("material9", scene);
          material9.diffuseTexture = new core/* Texture */.wlS("/avatars/9.jpg", scene);
          material9.diffuseColor = new core/* Color3 */.gVi(0.212, 0.596, 0.941);
          box9.material = material9;

          // // the cat model
          _context.next = 92;
          return core/* SceneLoader */.iAn.ImportMeshAsync(null, catModelPath, "", scene);
        case 92:
          result = _context.sent;
          catModel = result.meshes[1]; // scene.getMeshByName('cat');
          catModel.position.y = 1;
          catModel.position.z = 0;
          catModel.position.x = 0;
          catModel.rotate(new core/* Vector3 */.O4c(1, 0, 0), Math.PI / 2);
          catModel.rotate(new core/* Vector3 */.O4c(0, 0, 1), Math.PI);
          catModel.rotate(new core/* Vector3 */.O4c(0, 1, 0), Math.PI);

          // add video texture to plane
          // const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });

          core/* VideoTexture */.iGO.CreateFromWebCam(scene, function (videoTexture) {
            // const videoTexture = new VideoTexture("video", videoStream, scene, true);
            mirror = core/* MeshBuilder */.OG0.CreateBox("mirror", {
              width: 1,
              height: 1
            }, scene);
            mirror.position.y = 1;
            mirror.position.z = 3;
            // turn upside down
            mirror.rotation.z = Math.PI;
            var materialPlane = new core/* StandardMaterial */.uGc("materialPlane", scene);
            materialPlane.diffuseTexture = videoTexture;
            mirror.material = materialPlane;
          }, {
            maxWidth: 256,
            maxHeight: 256
          });

          // if (calls.length > 0) {
          //   // add video texture to plane
          //   const videoStream = calls[0]._remoteStream;
          //   const videoTexture = new VideoTexture("video", videoStream, scene, true);
          //   const plane = MeshBuilder.CreatePlane("plane", { width: 1, height: 1 }, scene);
          //   plane.position.y = 2;
          //   plane.position.z = 3;
          //   plane.rotation.z = Math.PI;
          //   const materialPlane = new StandardMaterial("materialPlane", scene);
          //   materialPlane.diffuseTexture = videoTexture;
          //   plane.material = materialPlane;
          // }

          peerAvatar = core/* MeshBuilder */.OG0.CreateBox("peerAvatar", {
            size: 0.3
          }, scene);
          peerAvatar.position.y = 1;
          peerAvatar.position.z = 3;
          peerAvatar.position.x = 0;
          materialPeerAvatar = new core/* StandardMaterial */.uGc("materialPeerAvatar", scene);
          peerAvatarBase64String = peerAvatarBase64 || "/avatars/1.jpg";
          materialPeerAvatar.diffuseTexture = new core/* Texture */.wlS(peerAvatarBase64String, scene);
          peerAvatar.material = materialPeerAvatar;
          // green
          peerAvatar.material.diffuseColor = new core/* Color3 */.gVi(0.212, 0.941, 0.596);
          peerAvatar.rotation = camera.rotation;
          if (calls.length > 0) {
            core/* VideoTexture */.iGO.CreateFromStreamAsync(scene, calls[0]._remoteStream, true).then(function (videoTexture) {
              peerPlane = core/* MeshBuilder */.OG0.CreatePlane("plane", {
                width: 1,
                height: 1
              }, scene);
              peerPlane.position.y = 2;
              peerPlane.position.z = 3;
              peerPlane.rotation.z = Math.PI;
              var materialPlane = new core/* StandardMaterial */.uGc("materialPlane", scene);
              materialPlane.diffuseTexture = videoTexture;
              // white
              peerAvatar.material.diffuseColor = new core/* Color3 */.gVi(0.941, 0.941, 0.941);
              peerPlane.material = materialPlane;
              peerPlane.lookAt(camera.position);
              // peerAvatar text ture to video texture
              materialPeerAvatar.diffuseTexture = videoTexture;
            });
          }

          // Our built-in 'ground' shape.
          ground = core/* MeshBuilder */.OG0.CreateGround("ground", {
            width: 6,
            height: 6
          }, scene);
          groundMaterial = new core/* StandardMaterial */.uGc("groundMaterial", scene);
          groundMaterial.diffuseTexture = new core/* Texture */.wlS(!isDarkTheme ? darkBackground : lightBackground, scene);
          ground.material = groundMaterial;
          ground.position.y = 0.01;

          //hand
          handModelUrl = handModelPath; // Load the hand model
          core/* SceneLoader */.iAn.ImportMeshAsync("", handModelUrl, "", scene).then(function (result) {
            var handMesh = result.meshes[0];
            handMesh.position = new core/* Vector3 */.O4c(0, 2, 0); // Adjust position as needed
            handMesh.scaling.scaleInPlace(4); // Scale if necessary

            // const skeleton = result.skeletons[0];
            // console.log(skeleton.bones);
            // const thumbMetacarpal = skeleton.bones.find(bone => bone.name.includes("thumb_metacarpal"));
            // const thumbProximal = skeleton.bones.find(bone => bone.name.includes("thumb-phalanx-proximal"));
            // const thumbDistal = skeleton.bones.find(bone => bone.name.includes("thumb-phalanx-distal"));

            // if (thumbMetacarpal && thumbProximal && thumbDistal) {
            //   thumbMetacarpal.setRotationQuaternion(Quaternion.FromEulerAngles(0, 0, Math.PI / 4));
            //   thumbProximal.setRotationQuaternion(Quaternion.FromEulerAngles(0, 0, Math.PI / 8));
            //   thumbDistal.setRotationQuaternion(Quaternion.FromEulerAngles(0, 0, Math.PI / 8));
            // }

            // Optionally set the orientation of the hand
            handMesh.rotation = new core/* Vector3 */.O4c(0, core/* Tools */.sbU.ToRadians(180), 0);
            handModel = handMesh;
          });
          _context.next = 121;
          return (_xr = xr) === null || _xr === void 0 ? void 0 : _xr.then(function (xr) {
            return xr.baseExperience.state.inXR;
          });
        case 121:
          isInXr = _context.sent;
          if (!isInXr) {
            skydome = core/* MeshBuilder */.OG0.CreateBox("sky", {
              size: 1000,
              sideOrientation: core/* Mesh */.Ss9.BACKSIDE
            }, scene);
            skydome.position.y = 500;
            skydome.isPickable = false;
            skydome.receiveShadows = true;
          }

          // const sky = new BackgroundMaterial("skyMaterial", scene);
          //   sky.reflectionTexture = scene.environmentTexture.clone();
          //   sky.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
          //   sky.enableGroundProjection = true;
          //   sky.projectedGroundRadius = 20;
          //   sky.projectedGroundHeight = 3;
          //   skydome.material = sky;

          // backgroud color is black or whit ebased on theme
          if (isDarkTheme) {
            scene.clearColor = new core/* Color3 */.gVi(0, 0, 0);
          } else {
            scene.clearColor = new core/* Color3 */.gVi(1, 1, 1);
          }
          if (!isInPod) {
            xr = scene.createDefaultXRExperienceAsync({
              // ask for an ar-session
              uiOptions: {
                sessionMode: "immersive-ar"
              },
              optionalFeatures: true
            });
          } else if (Verse_isMobile) {
            VJC = new core/* VirtualJoysticksCamera */.Ww6("VJC", scene.activeCamera.position, scene);
            VJC.rotation = scene.activeCamera.rotation;
            VJC.checkCollisions = scene.activeCamera.checkCollisions;
            VJC.applyGravity = scene.activeCamera.applyGravity;
            // speed
            VJC.speed = 0.5;
            VJC.angularSensibility = 20;
            VJC.inertia = 0.5;
            scene.executeWhenReady(function () {
              scene.activeCamera = VJC;
              scene.activeCamera.attachControl(canvas);
            });
          }
        case 125:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function onSceneReady(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
var onRender = function onRender(_ref3) {
  var calls = _ref3.calls,
    ephemeralStorage = _ref3.ephemeralStorage,
    onMove = _ref3.onMove;
  return /*#__PURE__*/function () {
    var _ref4 = Verse_asyncToGenerator( /*#__PURE__*/Verse_regeneratorRuntime().mark(function _callee2(scene) {
      var deltaTimeInMillis, rpm, _deltaTimeInMillis, _rpm, _deltaTimeInMillis2, _rpm2, _deltaTimeInMillis3, _rpm3, _deltaTimeInMillis4, _rpm4, _deltaTimeInMillis5, _rpm5, _deltaTimeInMillis6, _rpm6, _deltaTimeInMillis7, _rpm7, _deltaTimeInMillis8, _rpm8, _scene$activeCamera$p, x, y, z, newCameraPosition, _xr2, xrCamera, xrCameraPosition, isInXr, camera, _ephemeralStorage$ver, _ref5, _x4, _y, _z, _ephemeralStorage$ver2, _ref6, _x5, _y2, _z2;
      return Verse_regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (box !== undefined) {
              deltaTimeInMillis = scene.getEngine().getDeltaTime();
              rpm = 10;
              box.rotation.y += rpm / 60 * Math.PI * 2 * (deltaTimeInMillis / 1000);
            }
            if (box2 !== undefined) {
              _deltaTimeInMillis = scene.getEngine().getDeltaTime();
              _rpm = 10;
              box2.rotation.y -= _rpm / 60 * Math.PI * 2 * (_deltaTimeInMillis / 1000);
            }
            if (box3 !== undefined) {
              _deltaTimeInMillis2 = scene.getEngine().getDeltaTime();
              _rpm2 = 10;
              box3.rotation.y += _rpm2 / 60 * Math.PI * 2 * (_deltaTimeInMillis2 / 1000);
            }
            if (box4 !== undefined) {
              _deltaTimeInMillis3 = scene.getEngine().getDeltaTime();
              _rpm3 = 10;
              box4.rotation.y -= _rpm3 / 60 * Math.PI * 2 * (_deltaTimeInMillis3 / 1000);
            }
            if (box5 !== undefined) {
              _deltaTimeInMillis4 = scene.getEngine().getDeltaTime();
              _rpm4 = 10;
              box5.rotation.y += _rpm4 / 60 * Math.PI * 2 * (_deltaTimeInMillis4 / 1000);
            }
            if (box6 !== undefined) {
              _deltaTimeInMillis5 = scene.getEngine().getDeltaTime();
              _rpm5 = 10;
              box6.rotation.y -= _rpm5 / 60 * Math.PI * 2 * (_deltaTimeInMillis5 / 1000);
            }
            if (box7 !== undefined) {
              _deltaTimeInMillis6 = scene.getEngine().getDeltaTime();
              _rpm6 = 10;
              box7.rotation.y -= _rpm6 / 60 * Math.PI * 2 * (_deltaTimeInMillis6 / 1000);
            }
            if (box8 !== undefined) {
              _deltaTimeInMillis7 = scene.getEngine().getDeltaTime();
              _rpm7 = 10;
              box8.rotation.y += _rpm7 / 60 * Math.PI * 2 * (_deltaTimeInMillis7 / 1000);
            }
            if (box9 !== undefined) {
              _deltaTimeInMillis8 = scene.getEngine().getDeltaTime();
              _rpm8 = 10;
              box9.rotation.y -= _rpm8 / 60 * Math.PI * 2 * (_deltaTimeInMillis8 / 1000);
            }

            // the camera position is different position, log the xyz position
            _scene$activeCamera$p = scene.activeCamera.position, x = _scene$activeCamera$p._x, y = _scene$activeCamera$p._y, z = _scene$activeCamera$p._z;
            newCameraPosition = {
              x: x,
              y: y,
              z: z
            };
            if (!(x !== cameraPosition.x || y !== cameraPosition.y || z !== cameraPosition.z)) {
              _context2.next = 27;
              break;
            }
            cameraPosition = newCameraPosition;
            xrCamera = (_xr2 = xr) === null || _xr2 === void 0 ? void 0 : _xr2.then(function (xr) {
              return xr.baseExperience.camera;
            });
            if (!xrCamera) {
              _context2.next = 26;
              break;
            }
            _context2.next = 17;
            return xrCamera.then(function (xrCamera) {
              return xrCamera.position;
            });
          case 17:
            xrCameraPosition = _context2.sent;
            console.log({
              xrCameraPosition: xrCameraPosition
            });
            _context2.next = 21;
            return xr.then(function (xr) {
              return xr.baseExperience.state.inXR;
            });
          case 21:
            isInXr = _context2.sent;
            onMove(isInXr ? xrCameraPosition : cameraPosition);

            // /remove skydome
            if (skydome) {
              skydome.dispose();
              skydome = null;
            }
            _context2.next = 27;
            break;
          case 26:
            onMove(cameraPosition);
          case 27:
            // console.log({ cameraPosition, newCameraPosition });
            camera = scene.activeCamera;
            if (peerPlane) {
              // add video texture to plane
              // calls.forEach((call, i) => {
              //   // const videoStream = call._remoteStream;
              //   // const videoTexture = new VideoTexture("video", videoStream, scene, true);
              //   // const plane = MeshBuilder.CreatePlane("plane", { width: 1, height: 1 }, scene);
              //   // const {
              //   //   x,
              //   //   y,
              //   //   z
              //   // } = ephemeralStorage?.verse?.position || {};
              //   // plane.position.x = x || 0;
              //   // plane.position.y = y || 2;
              //   // plane.position.z = z || 3;
              //   // const materialPlane = new StandardMaterial("materialPlane", scene);
              //   // materialPlane.diffuseTexture = videoTexture;
              //   // plane.material = materialPlane;
              //   // VideoTexture.CreateFromStreamAsync(scene, call._remoteStream, true).then((videoTexture) => {
              //   //   const plane = MeshBuilder.CreatePlane("plane", { width: 1, height: 1 }, scene);
              //   //   plane.position.x = x || 0;
              //   //   plane.position.y = y || 2;
              //   //   plane.rotation.z = Math.PI;
              //   //   const materialPlane = new StandardMaterial("materialPlane", scene);
              //   //   materialPlane.diffuseTexture = videoTexture;
              //   //   plane.material = materialPlane;
              //   // });
              // });
              _ref5 = (ephemeralStorage === null || ephemeralStorage === void 0 || (_ephemeralStorage$ver = ephemeralStorage.verse) === null || _ephemeralStorage$ver === void 0 ? void 0 : _ephemeralStorage$ver.position) || {}, _x4 = _ref5.x, _y = _ref5.y, _z = _ref5.z; // console.log({ x, y, z });
              peerPlane.position.x = _x4 || 0;
              peerPlane.position.y = _y || 2;
              peerPlane.position.z = _z || 3;
              peerPlane.rotation.z = Math.PI;
              peerPlane.lookAt(camera.position);
            }
            if (peerAvatar) {
              _ref6 = (ephemeralStorage === null || ephemeralStorage === void 0 || (_ephemeralStorage$ver2 = ephemeralStorage.verse) === null || _ephemeralStorage$ver2 === void 0 ? void 0 : _ephemeralStorage$ver2.position) || {}, _x5 = _ref6.x, _y2 = _ref6.y, _z2 = _ref6.z;
              peerAvatar.position.x = _x5 || 0;
              peerAvatar.position.y = _y2 || 1;
              peerAvatar.position.z = _z2 || 3;
              peerAvatar.rotation = camera.rotation;
            }

            // position the hand infront of the camera facing

            // if (handModel) {
            //   const newPosition = {
            //     x: camera.position.x,
            //     y: camera.position.y,
            //     z: camera.position.z + camera.getFrontPosition(4).z,
            //   };
            //   handModel.position = newPosition;
            //   handModel.rotation = camera.rotation;
            // }
          case 30:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
};
var useStyles = (0,makeStyles/* default */.c)(function (theme) {
  return {
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(8)
    },
    appBar: {
      height: theme.spacing(8)
    },
    title: {
      fontWeight: "bold",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      height: "100%",
      padding: "0 ".concat(theme.spacing(3))
    }
  };
});
function Verse() {
  var theme = (0,useTheme/* default */.c)();
  var classes = useStyles();
  var pageTitle = "Verse";
  var verseRef = (0,index_js_.useRef)(null);

  // useEffect(() => {
  //   const createScene = async () => {
  //     // initialize babylon scene and engine
  //     // var engine = new Engine(canvas, true);
  //     // var scene = new Scene(engine);

  //     var engine = new Engine(verseRef.current, true);
  //     const createScene = async () => {

  //       var scene = new Scene(engine);

  //       var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  //       camera.setTarget(Vector3.Zero());
  //       camera.attachControl(verseRef.current, true);
  //       var light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
  //       var sphere = MeshBuilder.CreateSphere("sphere1", 16, 2, scene);
  //       sphere.position.y = 2;
  //       sphere.position.z = 5;

  //       // hide/show the Inspector
  //       window.addEventListener("keydown", (ev) => {
  //           // Shift+Ctrl+Alt+I
  //           if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
  //               if (scene.debugLayer.isVisible()) {
  //                   scene.debugLayer.hide();
  //               } else {
  //                   scene.debugLayer.show();
  //               }
  //           }
  //       });

  //       const xr = await scene.createDefaultXRExperienceAsync({
  //         // ask for an ar-session
  //         uiOptions: {
  //           sessionMode: "immersive-ar",
  //         },
  //       });

  //       return scene;
  //     }

  //     const scene = await createScene();

  //     // run the main render loop
  //     engine.runRenderLoop(() => {
  //         scene.render();
  //     });
  //   }
  //   createScene();
  // }, []);

  return /*#__PURE__*/index_js_default().createElement(PageContainer/* default */.c, {
    backgroundImage: "",
    headerProps: {
      // title: pageTitle,
      title: /*#__PURE__*/index_js_default().createElement("div", null, /*#__PURE__*/index_js_default().createElement(Typography/* default */.c, {
        variant: "h6",
        component: "div",
        sx: {
          flexGrow: 1
        }
      }, pageTitle), /*#__PURE__*/index_js_default().createElement(Typography/* default */.c, {
        variant: "subtitle2",
        component: "div",
        sx: {
          flexGrow: 1
        }
      })),
      backButton: true,
      // avatarProps: {
      //   src: isGroup ? conversation?.avatarUrl : contactDetails?.avatar,
      //   alt: pageTitle[0],
      //   isOnline,
      //   isSomeOnline
      // },
      menuProps: {
        icon: "more"
        // items: headerActions
      }
      // customButtons: (isOnline && !activeCalls.length) ? [
      //   !isGroup && !isMobile && { icon: 'screen', onClick: () => makeCall({ screen: true, video: true, audio: true }) },
      //   !isGroup && { icon: 'camera', onClick: () => makeCall({ video: true, audio: true }) },
      //   !isGroup && { icon: 'call', onClick: () => makeCall({ audio: true }) },
      // ].filter(i => !!i) : undefined
    },
    className: classes.conversation
  }, /*#__PURE__*/index_js_default().createElement(SceneComponent, {
    antialias: true,
    onSceneReady: onSceneReady,
    onRender: onRender,
    id: "my-canvas",
    style: {
      height: "100%",
      width: "100%"
    }
  }));
}

/***/ })

}]);
//# sourceMappingURL=296.main.js.map