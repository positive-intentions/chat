"use strict";
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
exports.assertMaskValue = exports.toTensorLossy = exports.toImageDataLossy = exports.toHTMLCanvasElementLossy = void 0;
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
var tf = require("@tensorflow/tfjs-core");
function toNumber(value) {
    return value instanceof SVGAnimatedLength ? value.baseVal.value : value;
}
/**
 * Converts input image to an HTMLCanvasElement. Note that converting
 * back from the output of this function to imageData or a Tensor will be lossy
 * due to premultiplied alpha color values. For more details please reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
 * @param image Input image.
 *
 * @returns Converted HTMLCanvasElement.
 */
function toHTMLCanvasElementLossy(image) {
    return __awaiter(this, void 0, void 0, function () {
        var canvas, ctx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = document.createElement('canvas');
                    if (!(image instanceof tf.Tensor)) return [3 /*break*/, 2];
                    return [4 /*yield*/, tf.browser.toPixels(image, canvas)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    canvas.width = toNumber(image.width);
                    canvas.height = toNumber(image.height);
                    ctx = canvas.getContext('2d');
                    if (image instanceof ImageData) {
                        ctx.putImageData(image, 0, 0);
                    }
                    else {
                        ctx.drawImage(image, 0, 0);
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/, canvas];
            }
        });
    });
}
exports.toHTMLCanvasElementLossy = toHTMLCanvasElementLossy;
/**
 * Converts input image to ImageData. Note that converting
 * from a CanvasImageSource will be lossy due to premultiplied alpha color
 * values. For more details please reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
 * @param image Input image.
 *
 * @returns Converted ImageData.
 */
function toImageDataLossy(image) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, height, width, _b, canvas, ctx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(image instanceof tf.Tensor)) return [3 /*break*/, 2];
                    _a = image.shape.slice(0, 2), height = _a[0], width = _a[1];
                    _b = ImageData.bind;
                    return [4 /*yield*/, tf.browser.toPixels(image)];
                case 1: return [2 /*return*/, new (_b.apply(ImageData, [void 0, _c.sent(), width, height]))()];
                case 2:
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    canvas.width = toNumber(image.width);
                    canvas.height = toNumber(image.height);
                    ctx.drawImage(image, 0, 0);
                    return [2 /*return*/, ctx.getImageData(0, 0, canvas.width, canvas.height)];
            }
        });
    });
}
exports.toImageDataLossy = toImageDataLossy;
/**
 * Converts input image to Tensor. Note that converting
 * from a CanvasImageSource will be lossy due to premultiplied alpha color
 * values. For more details please reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
 * @param image Input image.
 *
 * @returns Converted Tensor.
 */
function toTensorLossy(image) {
    return __awaiter(this, void 0, void 0, function () {
        var pixelsInput, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(image instanceof SVGImageElement || image instanceof OffscreenCanvas)) return [3 /*break*/, 2];
                    return [4 /*yield*/, toHTMLCanvasElementLossy(image)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = image;
                    _b.label = 3;
                case 3:
                    pixelsInput = _a;
                    return [2 /*return*/, tf.browser.fromPixels(pixelsInput, 4)];
            }
        });
    });
}
exports.toTensorLossy = toTensorLossy;
function assertMaskValue(maskValue) {
    if (maskValue < 0 || maskValue >= 256) {
        throw new Error("Mask value must be in range [0, 255] but got " + maskValue);
    }
    if (!Number.isInteger(maskValue)) {
        throw new Error("Mask value must be an integer but got " + maskValue);
    }
}
exports.assertMaskValue = assertMaskValue;
//# sourceMappingURL=mask_util.js.map