"use strict";
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
// tslint:disable-next-line: no-imports-from-dist
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
// tslint:disable-next-line: no-imports-from-dist
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var constants_1 = require("../constants");
var handPoseDetection = require("../index");
var test_util_2 = require("../shared/test_util");
// Measured in pixels.
var EPSILON_IMAGE = 12;
// Measured in pixels.
var EPSILON_VIDEO = 22;
// Measured in meters.
var EPSILON_VIDEO_WORLD = 0.012;
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/python/solutions/hands_test.py
var EXPECTED_HAND_KEYPOINTS_PREDICTION = [
    [
        [580, 34], [504, 50], [459, 94], [429, 146], [397, 182], [507, 167],
        [479, 245], [469, 292], [464, 330], [545, 180], [534, 265], [533, 319],
        [536, 360], [581, 172], [587, 252], [593, 304], [599, 346], [615, 168],
        [628, 223], [638, 258], [648, 288]
    ],
    [
        [138, 343], [211, 330], [257, 286], [289, 237], [322, 203], [219, 216],
        [238, 138], [249, 90], [253, 51], [177, 204], [184, 115], [187, 60],
        [185, 19], [138, 208], [131, 127], [124, 77], [117, 36], [106, 222],
        [92, 159], [79, 124], [68, 93]
    ]
];
(0, jasmine_util_1.describeWithFlags)('MediaPipeHands', jasmine_util_1.ALL_ENVS, function () {
    var timeout;
    beforeAll(function () {
        timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
    });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    it('estimateHands does not leak memory.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var startTensors, detector, input, beforeTensors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTensors = tf.memory().numTensors;
                    return [4 /*yield*/, handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands, { runtime: 'tfjs' })];
                case 1:
                    detector = _a.sent();
                    input = tf.zeros([128, 128, 3]);
                    beforeTensors = tf.memory().numTensors;
                    return [4 /*yield*/, detector.estimateHands(input)];
                case 2:
                    _a.sent();
                    expect(tf.memory().numTensors).toEqual(beforeTensors);
                    detector.dispose();
                    input.dispose();
                    expect(tf.memory().numTensors).toEqual(startTensors);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error when runtime is not set.', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands)];
                case 1:
                    _a.sent();
                    done.fail('Loading without runtime succeeded unexpectedly.');
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    expect(e_1.message).toEqual("Expect modelConfig.runtime to be either " +
                        "'tfjs' or 'mediapipe', but got undefined");
                    done();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
(0, jasmine_util_1.describeWithFlags)('MediaPipeHands static image ', jasmine_util_1.BROWSER_ENVS, function () {
    var detector;
    var image;
    var timeout;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 240000; // 2mins
                    return [4 /*yield*/, (0, test_util_2.loadImage)('hands.jpg', 720, 382)];
                case 1:
                    image = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    it('test lite model.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var startTensors, beforeTensors, result, keypoints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTensors = tf.memory().numTensors;
                    return [4 /*yield*/, handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands, { runtime: 'tfjs', modelType: 'lite' })];
                case 1:
                    // Note: this makes a network request for model assets.
                    detector = _a.sent();
                    beforeTensors = tf.memory().numTensors;
                    return [4 /*yield*/, detector.estimateHands(image, {
                            staticImageMode: true
                        })];
                case 2:
                    result = _a.sent();
                    keypoints = result.map(function (hand) { return hand.keypoints.map(function (keypoint) { return [keypoint.x, keypoint.y]; }); });
                    (0, test_util_1.expectArraysClose)(keypoints, EXPECTED_HAND_KEYPOINTS_PREDICTION, EPSILON_IMAGE);
                    expect(tf.memory().numTensors).toEqual(beforeTensors);
                    detector.dispose();
                    expect(tf.memory().numTensors).toEqual(startTensors);
                    return [2 /*return*/];
            }
        });
    }); });
    it('test full model.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var startTensors, beforeTensors, result, keypoints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTensors = tf.memory().numTensors;
                    return [4 /*yield*/, handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands, { runtime: 'tfjs', modelType: 'full' })];
                case 1:
                    // Note: this makes a network request for model assets.
                    detector = _a.sent();
                    beforeTensors = tf.memory().numTensors;
                    return [4 /*yield*/, detector.estimateHands(image, {
                            staticImageMode: true
                        })];
                case 2:
                    result = _a.sent();
                    keypoints = result.map(function (hand) { return hand.keypoints.map(function (keypoint) { return [keypoint.x, keypoint.y]; }); });
                    (0, test_util_1.expectArraysClose)(keypoints, EXPECTED_HAND_KEYPOINTS_PREDICTION, EPSILON_IMAGE);
                    expect(tf.memory().numTensors).toEqual(beforeTensors);
                    detector.dispose();
                    expect(tf.memory().numTensors).toEqual(startTensors);
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, jasmine_util_1.describeWithFlags)('MediaPipe Hands video ', jasmine_util_1.BROWSER_ENVS, function () {
    var detector;
    var timeout;
    var expected;
    var expected3D;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
                    return [4 /*yield*/, fetch(test_util_2.KARMA_SERVER + "/asl_hand.full.json")
                            .then(function (response) { return response.json(); })
                            .then(function (result) { return (0, test_util_2.getXYPerFrame)(result); })];
                case 1:
                    expected = _a.sent();
                    return [4 /*yield*/, fetch(test_util_2.KARMA_SERVER + "/asl_hand_3d.full.json")
                            .then(function (response) { return response.json(); })];
                case 2:
                    expected3D = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    it('test.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var model, result, result3D, callback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    model = handPoseDetection.SupportedModels.MediaPipeHands;
                    return [4 /*yield*/, handPoseDetection.createDetector(model, { runtime: 'tfjs', maxHands: 1 })];
                case 1:
                    detector = _a.sent();
                    result = [];
                    result3D = [];
                    callback = function (video, timestamp) { return __awaiter(void 0, void 0, void 0, function () {
                        var hands;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, detector.estimateHands(video, null /* config */)];
                                case 1:
                                    hands = _a.sent();
                                    // maxNumHands is set to 1.
                                    result.push(hands[0].keypoints.map(function (kp) { return [kp.x, kp.y]; }));
                                    result3D.push(hands[0].keypoints3D.map(function (kp) { return [kp.x, kp.y, kp.z]; }));
                                    return [2 /*return*/, hands[0].keypoints];
                            }
                        });
                    }); };
                    return [4 /*yield*/, (0, test_util_2.loadVideo)('asl_hand.25fps.mp4', 25 /* fps */, callback, expected, constants_1.MEDIAPIPE_CONNECTED_KEYPOINTS_PAIRS, 0 /* simulatedInterval unused */)];
                case 2:
                    _a.sent();
                    (0, test_util_1.expectArraysClose)(result, expected, EPSILON_VIDEO);
                    (0, test_util_1.expectArraysClose)(result3D, expected3D, EPSILON_VIDEO_WORLD);
                    detector.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=tfjs_test.js.map