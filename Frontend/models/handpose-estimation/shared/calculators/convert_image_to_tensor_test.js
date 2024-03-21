"use strict";
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
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var test_util_2 = require("../test_util");
var convert_image_to_tensor_1 = require("./convert_image_to_tensor");
var image_utils_1 = require("./image_utils");
var mask_util_1 = require("./mask_util");
// Measured in pixels.
var EPS = 7;
describe('ImageToTensorCalculator', function () {
    var input;
    var timeout;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
                    return [4 /*yield*/, (0, test_util_2.loadImage)('shared/image_to_tensor_input.jpg', 64, 128)];
                case 2:
                    input = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    function runTest(roi, config, expectedFileName) {
        return __awaiter(this, void 0, void 0, function () {
            var imageTensor, _a, rangeMin, rangeMax, _b, scale, offset, actualResult, expectedResultRGBA, expectedResultRGB;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        imageTensor = (0, convert_image_to_tensor_1.convertImageToTensor)(input, config, roi).imageTensor;
                        _a = config.outputTensorFloatRange, rangeMin = _a[0], rangeMax = _a[1];
                        _b = (0, image_utils_1.transformValueRange)(rangeMin, rangeMax, 0, 255), scale = _b.scale, offset = _b.offset;
                        actualResult = tf.tidy(function () { return tf.add(tf.mul(imageTensor, scale), offset); });
                        tf.dispose(imageTensor);
                        return [4 /*yield*/, (0, test_util_2.loadImage)("shared/" + expectedFileName, config.outputTensorSize.width, config.outputTensorSize.height)
                                .then(function (image) { return (0, mask_util_1.toImageDataLossy)(image); })];
                    case 1:
                        expectedResultRGBA = _c.sent();
                        expectedResultRGB = expectedResultRGBA.data.filter(function (_, index) { return index % 4 !== 3; });
                        (0, test_util_1.expectArraysClose)(new Uint8ClampedArray(actualResult.dataSync()), expectedResultRGB, EPS);
                        return [2 /*return*/];
                }
            });
        });
    }
    it('medium sub rect keep aspect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.65,
                        yCenter: 0.4,
                        width: 0.5,
                        height: 0.5,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 256, height: 256 },
                        keepAspectRatio: true,
                        borderMode: 'replicate'
                    }, 'medium_sub_rect_keep_aspect.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('medium sub rect keep aspect border zero.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.65,
                        yCenter: 0.4,
                        width: 0.5,
                        height: 0.5,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 256, height: 256 },
                        keepAspectRatio: true,
                        borderMode: 'zero'
                    }, 'medium_sub_rect_keep_aspect_border_zero.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('medium sub rect keep aspect with rotation.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.65,
                        yCenter: 0.4,
                        width: 0.5,
                        height: 0.5,
                        rotation: Math.PI * 90 / 180,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 256, height: 256 },
                        keepAspectRatio: true,
                        borderMode: 'replicate'
                    }, 'medium_sub_rect_keep_aspect_with_rotation.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('medium sub rect keep aspect with rotation border zero.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.65,
                        yCenter: 0.4,
                        width: 0.5,
                        height: 0.5,
                        rotation: Math.PI * 90 / 180,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 256, height: 256 },
                        keepAspectRatio: true,
                        borderMode: 'zero'
                    }, 'medium_sub_rect_keep_aspect_with_rotation_border_zero.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('medium sub rect with rotation.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.65,
                        yCenter: 0.4,
                        width: 0.5,
                        height: 0.5,
                        rotation: Math.PI * -45 / 180,
                    }, {
                        outputTensorFloatRange: [-1, 1],
                        outputTensorSize: { width: 256, height: 256 },
                        keepAspectRatio: false,
                        borderMode: 'replicate'
                    }, 'medium_sub_rect_with_rotation.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('medium sub rect with rotation border zero.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.65,
                        yCenter: 0.4,
                        width: 0.5,
                        height: 0.5,
                        rotation: Math.PI * -45 / 180,
                    }, {
                        outputTensorFloatRange: [-1, 1],
                        outputTensorSize: { width: 256, height: 256 },
                        keepAspectRatio: false,
                        borderMode: 'zero'
                    }, 'medium_sub_rect_with_rotation_border_zero.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('large sub rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.5,
                        height: 1.1,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 128, height: 128 },
                        keepAspectRatio: false,
                        borderMode: 'replicate'
                    }, 'large_sub_rect.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('large sub rect border zero.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.5,
                        height: 1.1,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 128, height: 128 },
                        keepAspectRatio: false,
                        borderMode: 'zero'
                    }, 'large_sub_rect_border_zero.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('large sub keep aspect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.5,
                        height: 1.1,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 128, height: 128 },
                        keepAspectRatio: true,
                        borderMode: 'replicate'
                    }, 'large_sub_rect_keep_aspect.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('large sub keep aspect border zero.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.5,
                        height: 1.1,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 128, height: 128 },
                        keepAspectRatio: true,
                        borderMode: 'zero'
                    }, 'large_sub_rect_keep_aspect_border_zero.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('large sub keep aspect with rotation.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.5,
                        height: 1.1,
                        rotation: Math.PI * -15 / 180,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 128, height: 128 },
                        keepAspectRatio: true,
                        borderMode: 'replicate'
                    }, 'large_sub_rect_keep_aspect_with_rotation.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('large sub keep aspect with rotation border zero.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.5,
                        height: 1.1,
                        rotation: Math.PI * -15 / 180,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 128, height: 128 },
                        keepAspectRatio: true,
                        borderMode: 'zero'
                    }, 'large_sub_rect_keep_aspect_with_rotation_border_zero.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('no op except range.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.0,
                        height: 1.0,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 64, height: 128 },
                        keepAspectRatio: true,
                        borderMode: 'replicate'
                    }, 'noop_except_range.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('no op except range border zero.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runTest({
                        xCenter: 0.5,
                        yCenter: 0.5,
                        width: 1.0,
                        height: 1.0,
                        rotation: 0,
                    }, {
                        outputTensorFloatRange: [0, 1],
                        outputTensorSize: { width: 64, height: 128 },
                        keepAspectRatio: true,
                        borderMode: 'zero'
                    }, 'noop_except_range.png')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=convert_image_to_tensor_test.js.map