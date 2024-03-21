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
var tfjs_core_1 = require("@tensorflow/tfjs-core");
// tslint:disable-next-line: no-imports-from-dist
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var maskUtil = require("./mask_util");
describe('maskUtil', function () {
    var rgbaValues = Array.from(new Array(24).keys());
    var expectedExact = rgbaValues;
    var expectedLossy = [
        0, 0, 0, 3, 0, 0, 0, 7, 0, 0, 0, 11,
        17, 17, 17, 15, 13, 13, 13, 19, 22, 22, 22, 23
    ];
    it('ImageData to HTMLCanvasElement.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imageData, canvas, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageData = new ImageData(new Uint8ClampedArray(rgbaValues), 2, 3);
                    return [4 /*yield*/, maskUtil.toHTMLCanvasElementLossy(imageData)];
                case 1:
                    canvas = _a.sent();
                    expect(canvas.width).toBe(imageData.width);
                    expect(canvas.height).toBe(imageData.height);
                    actual = Array.from(canvas.getContext('2d')
                        .getImageData(0, 0, canvas.width, canvas.height)
                        .data);
                    (0, test_util_1.expectArraysEqual)(actual, expectedLossy);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor to HTMLCanvasElement.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tensor, _a, height, width, canvas, actual;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = (0, tfjs_core_1.tensor3d)(rgbaValues, [2, 3, 4], 'int32');
                    _a = tensor.shape.slice(0, 2), height = _a[0], width = _a[1];
                    return [4 /*yield*/, maskUtil.toHTMLCanvasElementLossy(tensor)];
                case 1:
                    canvas = _b.sent();
                    expect(canvas.width).toBe(width);
                    expect(canvas.height).toBe(height);
                    actual = Array.from(canvas.getContext('2d')
                        .getImageData(0, 0, canvas.width, canvas.height)
                        .data);
                    (0, test_util_1.expectArraysEqual)(actual, expectedLossy);
                    return [2 /*return*/];
            }
        });
    }); });
    it('HTMLCanvasElement to ImageData.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvas, ctx, imageData, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    canvas.width = 2;
                    canvas.height = 3;
                    ctx.putImageData(new ImageData(new Uint8ClampedArray(rgbaValues), 2, 3), 0, 0);
                    return [4 /*yield*/, maskUtil.toImageDataLossy(canvas)];
                case 1:
                    imageData = _a.sent();
                    expect(imageData.width).toBe(canvas.width);
                    expect(imageData.height).toBe(canvas.height);
                    actual = Array.from(imageData.data);
                    (0, test_util_1.expectArraysEqual)(actual, expectedLossy);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor to ImageData.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tensor, _a, height, width, imageData, actual;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = (0, tfjs_core_1.tensor3d)(rgbaValues, [2, 3, 4], 'int32');
                    _a = tensor.shape.slice(0, 2), height = _a[0], width = _a[1];
                    return [4 /*yield*/, maskUtil.toImageDataLossy(tensor)];
                case 1:
                    imageData = _b.sent();
                    expect(imageData.width).toBe(width);
                    expect(imageData.height).toBe(height);
                    actual = Array.from(imageData.data);
                    (0, test_util_1.expectArraysEqual)(actual, expectedExact);
                    return [2 /*return*/];
            }
        });
    }); });
    it('HTMLCanvasElement to Tensor.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvas, ctx, tensor, _a, height, width;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    canvas.width = 2;
                    canvas.height = 3;
                    ctx.putImageData(new ImageData(new Uint8ClampedArray(rgbaValues), 2, 3), 0, 0);
                    return [4 /*yield*/, maskUtil.toTensorLossy(canvas)];
                case 1:
                    tensor = _b.sent();
                    _a = tensor.shape.slice(0, 2), height = _a[0], width = _a[1];
                    expect(width).toBe(canvas.width);
                    expect(height).toBe(canvas.height);
                    (0, test_util_1.expectArraysEqual)(tensor.dataSync(), expectedLossy);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ImageData to Tensor.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imageData, tensor, _a, height, width;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    imageData = new ImageData(new Uint8ClampedArray(rgbaValues), 2, 3);
                    return [4 /*yield*/, maskUtil.toTensorLossy(imageData)];
                case 1:
                    tensor = _b.sent();
                    _a = tensor.shape.slice(0, 2), height = _a[0], width = _a[1];
                    expect(width).toBe(imageData.width);
                    expect(height).toBe(imageData.height);
                    (0, test_util_1.expectArraysEqual)(tensor.dataSync(), expectedExact);
                    return [2 /*return*/];
            }
        });
    }); });
    it('assertMaskValue.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var uint8Values;
        return __generator(this, function (_a) {
            expect(function () { return maskUtil.assertMaskValue(-1); })
                .toThrowError(/Mask value must be in range \[0, 255\]/);
            expect(function () { return maskUtil.assertMaskValue(256); })
                .toThrowError(/Mask value must be in range \[0, 255\]/);
            expect(function () { return maskUtil.assertMaskValue(1.1); })
                .toThrowError(/must be an integer/);
            uint8Values = Array.from(Array(256).keys());
            uint8Values.forEach(function (value) { return expect(function () { return maskUtil.assertMaskValue(value); }).not.toThrow(); });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=mask_util_test.js.map