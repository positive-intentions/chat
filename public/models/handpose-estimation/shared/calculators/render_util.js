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
exports.blurBodyPart = exports.drawBokehEffect = exports.drawPixelatedMask = exports.drawMask = exports.toColoredMask = exports.toBinaryMask = void 0;
var tf = require("@tensorflow/tfjs-core");
var CANVAS_NAMES = {
    blurred: 'blurred',
    blurredMask: 'blurred-mask',
    mask: 'mask',
    lowresPartMask: 'lowres-part-mask',
    drawImage: 'draw-image',
};
var offScreenCanvases = {};
function isSafari() {
    return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
}
function assertSameDimensions(_a, _b, nameA, nameB) {
    var widthA = _a.width, heightA = _a.height;
    var widthB = _b.width, heightB = _b.height;
    if (widthA !== widthB || heightA !== heightB) {
        throw new Error("error: dimensions must match. " + nameA + " has dimensions " + widthA + "x" + heightA + ", " + nameB + " has dimensions " + widthB + "x" + heightB);
    }
}
function getSizeFromImageLikeElement(input) {
    if ('offsetHeight' in input && input.offsetHeight !== 0 &&
        'offsetWidth' in input && input.offsetWidth !== 0) {
        return [input.offsetHeight, input.offsetWidth];
    }
    else if (input.height != null && input.width != null) {
        return [input.height, input.width];
    }
    else {
        throw new Error("HTMLImageElement must have height and width attributes set.");
    }
}
function getSizeFromVideoElement(input) {
    if (input.hasAttribute('height') && input.hasAttribute('width')) {
        // Prioritizes user specified height and width.
        // We can't test the .height and .width properties directly,
        // because they evaluate to 0 if unset.
        return [input.height, input.width];
    }
    else {
        return [input.videoHeight, input.videoWidth];
    }
}
function getInputSize(input) {
    if ((typeof (HTMLCanvasElement) !== 'undefined' &&
        input instanceof HTMLCanvasElement) ||
        (typeof (OffscreenCanvas) !== 'undefined' &&
            input instanceof OffscreenCanvas) ||
        (typeof (HTMLImageElement) !== 'undefined' &&
            input instanceof HTMLImageElement)) {
        return getSizeFromImageLikeElement(input);
    }
    else if (typeof (ImageData) !== 'undefined' && input instanceof ImageData) {
        return [input.height, input.width];
    }
    else if (typeof (HTMLVideoElement) !== 'undefined' &&
        input instanceof HTMLVideoElement) {
        return getSizeFromVideoElement(input);
    }
    else if (input instanceof tf.Tensor) {
        return [input.shape[0], input.shape[1]];
    }
    else {
        throw new Error("error: Unknown input type: " + input + ".");
    }
}
function createOffScreenCanvas() {
    if (typeof document !== 'undefined') {
        return document.createElement('canvas');
    }
    else if (typeof OffscreenCanvas !== 'undefined') {
        return new OffscreenCanvas(0, 0);
    }
    else {
        throw new Error('Cannot create a canvas in this context');
    }
}
function ensureOffscreenCanvasCreated(id) {
    if (!offScreenCanvases[id]) {
        offScreenCanvases[id] = createOffScreenCanvas();
    }
    return offScreenCanvases[id];
}
/**
 * Draw image data on a canvas.
 */
function renderImageDataToCanvas(image, canvas) {
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.putImageData(image, 0, 0);
}
function renderImageDataToOffScreenCanvas(image, canvasName) {
    var canvas = ensureOffscreenCanvasCreated(canvasName);
    renderImageDataToCanvas(image, canvas);
    return canvas;
}
/**
 * Draw image on a 2D rendering context.
 */
function drawImage(ctx, image, dx, dy, dw, dh) {
    return __awaiter(this, void 0, void 0, function () {
        var pixels, _a, height, width;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(image instanceof tf.Tensor)) return [3 /*break*/, 2];
                    return [4 /*yield*/, tf.browser.toPixels(image)];
                case 1:
                    pixels = _b.sent();
                    _a = getInputSize(image), height = _a[0], width = _a[1];
                    image = new ImageData(pixels, width, height);
                    _b.label = 2;
                case 2:
                    if (image instanceof ImageData) {
                        image = renderImageDataToOffScreenCanvas(image, CANVAS_NAMES.drawImage);
                    }
                    if (dw == null || dh == null) {
                        ctx.drawImage(image, dx, dy);
                    }
                    else {
                        ctx.drawImage(image, dx, dy, dw, dh);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Draw image on a canvas.
 */
function renderImageToCanvas(image, canvas) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, height, width, ctx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getInputSize(image), height = _a[0], width = _a[1];
                    canvas.width = width;
                    canvas.height = height;
                    ctx = canvas.getContext('2d');
                    return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function flipCanvasHorizontal(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
}
function drawWithCompositing(ctx, image, compositeOperation) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // TODO: Assert type 'compositeOperation as GlobalCompositeOperation' after
                    // typescript update to 4.6.0 or later
                    // tslint:disable-next-line: no-any
                    ctx.globalCompositeOperation = compositeOperation;
                    return [4 /*yield*/, drawImage(ctx, image, 0, 0)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// method copied from bGlur in https://codepen.io/zhaojun/pen/zZmRQe
function cpuBlur(canvas, image, blur) {
    return __awaiter(this, void 0, void 0, function () {
        var ctx, sum, delta, alphaLeft, step, y, x, weight, y, x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx = canvas.getContext('2d');
                    sum = 0;
                    delta = 5;
                    alphaLeft = 1 / (2 * Math.PI * delta * delta);
                    step = blur < 3 ? 1 : 2;
                    for (y = -blur; y <= blur; y += step) {
                        for (x = -blur; x <= blur; x += step) {
                            weight = alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta));
                            sum += weight;
                        }
                    }
                    y = -blur;
                    _a.label = 1;
                case 1:
                    if (!(y <= blur)) return [3 /*break*/, 6];
                    x = -blur;
                    _a.label = 2;
                case 2:
                    if (!(x <= blur)) return [3 /*break*/, 5];
                    ctx.globalAlpha = alphaLeft *
                        Math.exp(-(x * x + y * y) / (2 * delta * delta)) / sum * blur;
                    return [4 /*yield*/, drawImage(ctx, image, x, y)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    x += step;
                    return [3 /*break*/, 2];
                case 5:
                    y += step;
                    return [3 /*break*/, 1];
                case 6:
                    ctx.globalAlpha = 1;
                    return [2 /*return*/];
            }
        });
    });
}
function drawAndBlurImageOnCanvas(image, blurAmount, canvas) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, height, width, ctx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getInputSize(image), height = _a[0], width = _a[1];
                    ctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;
                    ctx.clearRect(0, 0, width, height);
                    ctx.save();
                    if (!isSafari()) return [3 /*break*/, 2];
                    return [4 /*yield*/, cpuBlur(canvas, image, blurAmount)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 2:
                    // tslint:disable:no-any
                    ctx.filter = "blur(" + blurAmount + "px)";
                    return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    ctx.restore();
                    return [2 /*return*/];
            }
        });
    });
}
function drawAndBlurImageOnOffScreenCanvas(image, blurAmount, offscreenCanvasName) {
    return __awaiter(this, void 0, void 0, function () {
        var canvas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = ensureOffscreenCanvasCreated(offscreenCanvasName);
                    if (!(blurAmount === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, renderImageToCanvas(image, canvas)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, drawAndBlurImageOnCanvas(image, blurAmount, canvas)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, canvas];
            }
        });
    });
}
function drawStroke(bytes, row, column, width, radius, color) {
    if (color === void 0) { color = {
        r: 0,
        g: 255,
        b: 255,
        a: 255
    }; }
    for (var i = -radius; i <= radius; i++) {
        for (var j = -radius; j <= radius; j++) {
            if (i !== 0 && j !== 0) {
                var n = (row + i) * width + (column + j);
                bytes[4 * n + 0] = color.r;
                bytes[4 * n + 1] = color.g;
                bytes[4 * n + 2] = color.b;
                bytes[4 * n + 3] = color.a;
            }
        }
    }
}
function isSegmentationBoundary(data, row, column, width, isForegroundId, alphaCutoff, radius) {
    if (radius === void 0) { radius = 1; }
    var numberBackgroundPixels = 0;
    for (var i = -radius; i <= radius; i++) {
        for (var j = -radius; j <= radius; j++) {
            if (i !== 0 && j !== 0) {
                var n = (row + i) * width + (column + j);
                if (!isForegroundId[data[4 * n]] || data[4 * n + 3] < alphaCutoff) {
                    numberBackgroundPixels += 1;
                }
            }
        }
    }
    return numberBackgroundPixels > 0;
}
/**
 * Given a segmentation or array of segmentations, generates an
 * image with foreground and background color at each pixel determined by the
 * corresponding binary segmentation value at the pixel from the output.  In
 * other words, pixels where there is a person will be colored with foreground
 * color and where there is not a person will be colored with background color.
 *
 * @param segmentation Single segmentation or array of segmentations.
 *
 * @param foreground Default to {r:0, g:0, b:0, a: 0}. The foreground color
 * (r,g,b,a) for visualizing pixels that belong to people.
 *
 * @param background Default to {r:0, g:0, b:0, a: 255}. The background color
 * (r,g,b,a) for visualizing pixels that don't belong to people.
 *
 * @param drawContour Default to false. Whether to draw the contour around each
 * person's segmentation mask or body part mask.
 *
 * @param foregroundThreshold Default to 0.5. The minimum probability
 * to color a pixel as foreground rather than background. The alpha channel
 * integer values will be taken as the probabilities (for more information refer
 * to `Segmentation` type's documentation).
 *
 * @param foregroundMaskValues Default to all mask values. The red channel
 *     integer values that represent foreground (for more information refer to
 * `Segmentation` type's documentation).
 *
 * @returns An ImageData with the same width and height of
 * the input segmentations, with opacity and
 * transparency at each pixel determined by the corresponding binary
 * segmentation value at the pixel from the output.
 */
function toBinaryMask(segmentation, foreground, background, drawContour, foregroundThreshold, foregroundMaskValues) {
    if (foreground === void 0) { foreground = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    }; }
    if (background === void 0) { background = {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    }; }
    if (drawContour === void 0) { drawContour = false; }
    if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
    if (foregroundMaskValues === void 0) { foregroundMaskValues = Array.from(Array(256).keys()); }
    return __awaiter(this, void 0, void 0, function () {
        var segmentations, masks, _a, width, height, bytes, alphaCutoff, isForegroundId, i, j, n, _i, masks_1, mask;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    segmentations = !Array.isArray(segmentation) ? [segmentation] : segmentation;
                    if (segmentations.length === 0) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, Promise.all(segmentations.map(function (segmentation) { return segmentation.mask.toImageData(); }))];
                case 1:
                    masks = _b.sent();
                    _a = masks[0], width = _a.width, height = _a.height;
                    bytes = new Uint8ClampedArray(width * height * 4);
                    alphaCutoff = Math.round(255 * foregroundThreshold);
                    isForegroundId = new Array(256).fill(false);
                    foregroundMaskValues.forEach(function (id) { return isForegroundId[id] = true; });
                    for (i = 0; i < height; i++) {
                        for (j = 0; j < width; j++) {
                            n = i * width + j;
                            bytes[4 * n + 0] = background.r;
                            bytes[4 * n + 1] = background.g;
                            bytes[4 * n + 2] = background.b;
                            bytes[4 * n + 3] = background.a;
                            for (_i = 0, masks_1 = masks; _i < masks_1.length; _i++) {
                                mask = masks_1[_i];
                                if (isForegroundId[mask.data[4 * n]] &&
                                    mask.data[4 * n + 3] >= alphaCutoff) {
                                    bytes[4 * n] = foreground.r;
                                    bytes[4 * n + 1] = foreground.g;
                                    bytes[4 * n + 2] = foreground.b;
                                    bytes[4 * n + 3] = foreground.a;
                                    if (drawContour && i - 1 >= 0 && i + 1 < height && j - 1 >= 0 &&
                                        j + 1 < width &&
                                        isSegmentationBoundary(mask.data, i, j, width, isForegroundId, alphaCutoff)) {
                                        drawStroke(bytes, i, j, width, 1);
                                    }
                                }
                            }
                        }
                    }
                    return [2 /*return*/, new ImageData(bytes, width, height)];
            }
        });
    });
}
exports.toBinaryMask = toBinaryMask;
/**
 * Given a segmentation or array of segmentations, and a function mapping
 * the red pixel values (representing body part labels) to colours,
 * generates an image with the corresponding color for each part at each pixel,
 * and background color used where there is no part.
 *
 * @param segmentation Single segmentation or array of segmentations.
 *
 * @param maskValueToColor A function mapping red channel mask values to
 * colors to use in output image.
 *
 * @param background Default to {r:0, g:0, b:0, a: 255}. The background color
 * (r,g,b,a) for visualizing pixels that don't belong to people.
 *
 * @param foregroundThreshold Default to 0.5. The minimum probability
 * to color a pixel as foreground rather than background. The alpha channel
 * integer values will be taken as the probabilities (for more information refer
 * to `Segmentation` type's documentation).
 *
 * @returns An ImageData with the same width and height of input segmentations,
 * with the corresponding color for each part at each pixel, and background
 * pixels where there is no part.
 */
function toColoredMask(segmentation, maskValueToColor, background, foregroundThreshold) {
    if (background === void 0) { background = {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    }; }
    if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
    return __awaiter(this, void 0, void 0, function () {
        var segmentations, masks, _a, width, height, bytes, alphaCutoff, i, j, _i, masks_2, mask, maskValue, color;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    segmentations = !Array.isArray(segmentation) ? [segmentation] : segmentation;
                    if (segmentations.length === 0) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, Promise.all(segmentations.map(function (segmentation) { return segmentation.mask.toImageData(); }))];
                case 1:
                    masks = _b.sent();
                    _a = masks[0], width = _a.width, height = _a.height;
                    bytes = new Uint8ClampedArray(width * height * 4);
                    alphaCutoff = Math.round(255 * foregroundThreshold);
                    for (i = 0; i < height * width; ++i) {
                        j = i * 4;
                        bytes[j + 0] = background.r;
                        bytes[j + 1] = background.g;
                        bytes[j + 2] = background.b;
                        bytes[j + 3] = background.a;
                        for (_i = 0, masks_2 = masks; _i < masks_2.length; _i++) {
                            mask = masks_2[_i];
                            if (mask.data[j + 3] >= alphaCutoff) {
                                maskValue = mask.data[j];
                                color = maskValueToColor(maskValue);
                                bytes[j + 0] = color.r;
                                bytes[j + 1] = color.g;
                                bytes[j + 2] = color.b;
                                bytes[j + 3] = color.a;
                            }
                        }
                    }
                    return [2 /*return*/, new ImageData(bytes, width, height)];
            }
        });
    });
}
exports.toColoredMask = toColoredMask;
/**
 * Given an image and a maskImage of type ImageData, draws the image with the
 * mask on top of it onto a canvas.
 *
 * @param canvas The canvas to be drawn onto.
 *
 * @param image The original image to apply the mask to.
 *
 * @param maskImage An ImageData containing the mask. Ideally this should be
 * generated by toBinaryMask or toColoredMask.
 *
 * @param maskOpacity The opacity of the mask when drawing it on top of the
 * image. Defaults to 0.7. Should be a float between 0 and 1.
 *
 * @param maskBlurAmount How many pixels to blur the mask by. Defaults to 0.
 * Should be an integer between 0 and 20.
 *
 * @param flipHorizontal If the result should be flipped horizontally.  Defaults
 * to false.
 */
function drawMask(canvas, image, maskImage, maskOpacity, maskBlurAmount, flipHorizontal) {
    if (maskOpacity === void 0) { maskOpacity = 0.7; }
    if (maskBlurAmount === void 0) { maskBlurAmount = 0; }
    if (flipHorizontal === void 0) { flipHorizontal = false; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, height, width, ctx, mask, blurredMask;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getInputSize(image), height = _a[0], width = _a[1];
                    canvas.width = width;
                    canvas.height = height;
                    ctx = canvas.getContext('2d');
                    ctx.save();
                    if (flipHorizontal) {
                        flipCanvasHorizontal(canvas);
                    }
                    return [4 /*yield*/, drawImage(ctx, image, 0, 0)];
                case 1:
                    _b.sent();
                    ctx.globalAlpha = maskOpacity;
                    if (!maskImage) return [3 /*break*/, 3];
                    assertSameDimensions({ width: width, height: height }, maskImage, 'image', 'mask');
                    mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
                    return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask)];
                case 2:
                    blurredMask = _b.sent();
                    ctx.drawImage(blurredMask, 0, 0, width, height);
                    _b.label = 3;
                case 3:
                    ctx.restore();
                    return [2 /*return*/];
            }
        });
    });
}
exports.drawMask = drawMask;
/**
 * Given an image and a maskImage of type ImageData, draws the image with the
 * pixelated mask on top of it onto a canvas.
 *
 * @param canvas The canvas to be drawn onto.
 *
 * @param image The original image to apply the mask to.
 *
 * @param maskImage An ImageData containing the mask.  Ideally this should be
 * generated by toColoredmask.
 *
 * @param maskOpacity The opacity of the mask when drawing it on top of the
 * image. Defaults to 0.7. Should be a float between 0 and 1.
 *
 * @param maskBlurAmount How many pixels to blur the mask by. Defaults to 0.
 * Should be an integer between 0 and 20.
 *
 * @param flipHorizontal If the result should be flipped horizontally.  Defaults
 * to false.
 *
 * @param pixelCellWidth The width of each pixel cell. Default to 10 px.
 */
function drawPixelatedMask(canvas, image, maskImage, maskOpacity, maskBlurAmount, flipHorizontal, pixelCellWidth) {
    if (maskOpacity === void 0) { maskOpacity = 0.7; }
    if (maskBlurAmount === void 0) { maskBlurAmount = 0; }
    if (flipHorizontal === void 0) { flipHorizontal = false; }
    if (pixelCellWidth === void 0) { pixelCellWidth = 10.0; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, height, width, mask, blurredMask, ctx, offscreenCanvas, offscreenCanvasCtx, i, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getInputSize(image), height = _a[0], width = _a[1];
                    assertSameDimensions({ width: width, height: height }, maskImage, 'image', 'mask');
                    mask = renderImageDataToOffScreenCanvas(maskImage, CANVAS_NAMES.mask);
                    return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(mask, maskBlurAmount, CANVAS_NAMES.blurredMask)];
                case 1:
                    blurredMask = _b.sent();
                    canvas.width = blurredMask.width;
                    canvas.height = blurredMask.height;
                    ctx = canvas.getContext('2d');
                    ctx.save();
                    if (flipHorizontal) {
                        flipCanvasHorizontal(canvas);
                    }
                    offscreenCanvas = ensureOffscreenCanvasCreated(CANVAS_NAMES.lowresPartMask);
                    offscreenCanvasCtx = offscreenCanvas.getContext('2d');
                    offscreenCanvas.width = blurredMask.width * (1.0 / pixelCellWidth);
                    offscreenCanvas.height = blurredMask.height * (1.0 / pixelCellWidth);
                    offscreenCanvasCtx.drawImage(blurredMask, 0, 0, blurredMask.width, blurredMask.height, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, 0, 0, canvas.width, canvas.height);
                    // Draws vertical grid lines that are `pixelCellWidth` apart from each other.
                    for (i = 0; i < offscreenCanvas.width; i++) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#ffffff';
                        ctx.moveTo(pixelCellWidth * i, 0);
                        ctx.lineTo(pixelCellWidth * i, canvas.height);
                        ctx.stroke();
                    }
                    // Draws horizontal grid lines that are `pixelCellWidth` apart from each
                    // other.
                    for (i = 0; i < offscreenCanvas.height; i++) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#ffffff';
                        ctx.moveTo(0, pixelCellWidth * i);
                        ctx.lineTo(canvas.width, pixelCellWidth * i);
                        ctx.stroke();
                    }
                    ctx.globalAlpha = 1.0 - maskOpacity;
                    return [4 /*yield*/, drawImage(ctx, image, 0, 0, blurredMask.width, blurredMask.height)];
                case 2:
                    _b.sent();
                    ctx.restore();
                    return [2 /*return*/];
            }
        });
    });
}
exports.drawPixelatedMask = drawPixelatedMask;
function createPersonMask(segmentation, foregroundThreshold, edgeBlurAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var backgroundMaskImage, backgroundMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, toBinaryMask(segmentation, { r: 0, g: 0, b: 0, a: 255 }, { r: 0, g: 0, b: 0, a: 0 }, false, foregroundThreshold)];
                case 1:
                    backgroundMaskImage = _a.sent();
                    backgroundMask = renderImageDataToOffScreenCanvas(backgroundMaskImage, CANVAS_NAMES.mask);
                    if (edgeBlurAmount === 0) {
                        return [2 /*return*/, backgroundMask];
                    }
                    else {
                        return [2 /*return*/, drawAndBlurImageOnOffScreenCanvas(backgroundMask, edgeBlurAmount, CANVAS_NAMES.blurredMask)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Given a segmentation or array of segmentations, and an image, draws the image
 * with its background blurred onto the canvas.
 *
 * @param canvas The canvas to draw the background-blurred image onto.
 *
 * @param image The image to blur the background of and draw.
 *
 * @param segmentation Single segmentation or array of segmentations.
 *
 * @param foregroundThreshold Default to 0.5. The minimum probability
 * to color a pixel as foreground rather than background. The alpha channel
 * integer values will be taken as the probabilities (for more information refer
 * to `Segmentation` type's documentation).
 *
 * @param backgroundBlurAmount How many pixels in the background blend into each
 * other.  Defaults to 3. Should be an integer between 1 and 20.
 *
 * @param edgeBlurAmount How many pixels to blur on the edge between the person
 * and the background by.  Defaults to 3. Should be an integer between 0 and 20.
 *
 * @param flipHorizontal If the output should be flipped horizontally.  Defaults
 * to false.
 */
function drawBokehEffect(canvas, image, segmentation, foregroundThreshold, backgroundBlurAmount, edgeBlurAmount, flipHorizontal) {
    if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
    if (backgroundBlurAmount === void 0) { backgroundBlurAmount = 3; }
    if (edgeBlurAmount === void 0) { edgeBlurAmount = 3; }
    if (flipHorizontal === void 0) { flipHorizontal = false; }
    return __awaiter(this, void 0, void 0, function () {
        var blurredImage, ctx, personMask, _a, height, width;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(image, backgroundBlurAmount, CANVAS_NAMES.blurred)];
                case 1:
                    blurredImage = _b.sent();
                    canvas.width = blurredImage.width;
                    canvas.height = blurredImage.height;
                    ctx = canvas.getContext('2d');
                    if (Array.isArray(segmentation) && segmentation.length === 0) {
                        ctx.drawImage(blurredImage, 0, 0);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, createPersonMask(segmentation, foregroundThreshold, edgeBlurAmount)];
                case 2:
                    personMask = _b.sent();
                    ctx.save();
                    if (flipHorizontal) {
                        flipCanvasHorizontal(canvas);
                    }
                    _a = getInputSize(image), height = _a[0], width = _a[1];
                    return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                case 3:
                    _b.sent();
                    // "destination-in" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // crop what's not the person using the mask from the original image
                    return [4 /*yield*/, drawWithCompositing(ctx, personMask, 'destination-in')];
                case 4:
                    // "destination-in" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // crop what's not the person using the mask from the original image
                    _b.sent();
                    // "destination-over" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // draw the blurred background on top of the original image where it doesn't
                    // overlap.
                    return [4 /*yield*/, drawWithCompositing(ctx, blurredImage, 'destination-over')];
                case 5:
                    // "destination-over" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // draw the blurred background on top of the original image where it doesn't
                    // overlap.
                    _b.sent();
                    ctx.restore();
                    return [2 /*return*/];
            }
        });
    });
}
exports.drawBokehEffect = drawBokehEffect;
function createBodyPartMask(segmentation, maskValuesToBlur, foregroundThreshold, edgeBlurAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var backgroundMaskImage, backgroundMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, toBinaryMask(segmentation, { r: 0, g: 0, b: 0, a: 0 }, { r: 0, g: 0, b: 0, a: 255 }, true, foregroundThreshold, maskValuesToBlur)];
                case 1:
                    backgroundMaskImage = _a.sent();
                    backgroundMask = renderImageDataToOffScreenCanvas(backgroundMaskImage, CANVAS_NAMES.mask);
                    if (edgeBlurAmount === 0) {
                        return [2 /*return*/, backgroundMask];
                    }
                    else {
                        return [2 /*return*/, drawAndBlurImageOnOffScreenCanvas(backgroundMask, edgeBlurAmount, CANVAS_NAMES.blurredMask)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Given a personSegmentation and an image, draws the image with its background
 * blurred onto the canvas.
 *
 * @param canvas The canvas to draw the background-blurred image onto.
 *
 * @param image The image to blur the background of and draw.
 *
 * @param segmentation Single segmentation or array of segmentations.
 *
 * @param maskValuesToBlur An array of red channel mask values to blur
 *     (representing different body parts, refer to `Segmentation` interface
 * docs for more details).
 *
 * @param foregroundThreshold Default to 0.5. The minimum probability
 * to color a pixel as foreground rather than background. The alpha channel
 * integer values will be taken as the probabilities (for more information refer
 * to `Segmentation` type's documentation).
 *
 * @param backgroundBlurAmount How many pixels in the background blend into each
 * other.  Defaults to 3. Should be an integer between 1 and 20.
 *
 * @param edgeBlurAmount How many pixels to blur on the edge between the person
 * and the background by.  Defaults to 3. Should be an integer between 0 and 20.
 *
 * @param flipHorizontal If the output should be flipped horizontally.  Defaults
 * to false.
 */
function blurBodyPart(canvas, image, segmentation, maskValuesToBlur, foregroundThreshold, backgroundBlurAmount, edgeBlurAmount, flipHorizontal) {
    if (foregroundThreshold === void 0) { foregroundThreshold = 0.5; }
    if (backgroundBlurAmount === void 0) { backgroundBlurAmount = 3; }
    if (edgeBlurAmount === void 0) { edgeBlurAmount = 3; }
    if (flipHorizontal === void 0) { flipHorizontal = false; }
    return __awaiter(this, void 0, void 0, function () {
        var blurredImage, ctx, bodyPartMask, _a, height, width;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, drawAndBlurImageOnOffScreenCanvas(image, backgroundBlurAmount, CANVAS_NAMES.blurred)];
                case 1:
                    blurredImage = _b.sent();
                    canvas.width = blurredImage.width;
                    canvas.height = blurredImage.height;
                    ctx = canvas.getContext('2d');
                    if (Array.isArray(segmentation) && segmentation.length === 0) {
                        ctx.drawImage(blurredImage, 0, 0);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, createBodyPartMask(segmentation, maskValuesToBlur, foregroundThreshold, edgeBlurAmount)];
                case 2:
                    bodyPartMask = _b.sent();
                    ctx.save();
                    if (flipHorizontal) {
                        flipCanvasHorizontal(canvas);
                    }
                    _a = getInputSize(image), height = _a[0], width = _a[1];
                    return [4 /*yield*/, drawImage(ctx, image, 0, 0, width, height)];
                case 3:
                    _b.sent();
                    // "destination-in" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // crop what's not the person using the mask from the original image
                    return [4 /*yield*/, drawWithCompositing(ctx, bodyPartMask, 'destination-in')];
                case 4:
                    // "destination-in" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // crop what's not the person using the mask from the original image
                    _b.sent();
                    // "destination-over" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // draw the blurred background on top of the original image where it doesn't
                    // overlap.
                    return [4 /*yield*/, drawWithCompositing(ctx, blurredImage, 'destination-over')];
                case 5:
                    // "destination-over" - "The existing canvas content is kept where both the
                    // new shape and existing canvas content overlap. Everything else is made
                    // transparent."
                    // draw the blurred background on top of the original image where it doesn't
                    // overlap.
                    _b.sent();
                    ctx.restore();
                    return [2 /*return*/];
            }
        });
    });
}
exports.blurBodyPart = blurBodyPart;
//# sourceMappingURL=render_util.js.map