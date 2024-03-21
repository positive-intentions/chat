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
// tslint:disable-next-line: no-imports-from-dist
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
// tslint:disable-next-line: no-imports-from-dist
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var test_util_2 = require("../test_util");
var mask_util_1 = require("./mask_util");
var renderUtil = require("./render_util");
var ImageDataMask = /** @class */ (function () {
    function ImageDataMask(mask) {
        this.mask = mask;
    }
    ImageDataMask.prototype.toCanvasImageSource = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, mask_util_1.toHTMLCanvasElementLossy)(this.mask)];
            });
        });
    };
    ImageDataMask.prototype.toImageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mask];
            });
        });
    };
    ImageDataMask.prototype.toTensor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, mask_util_1.toTensorLossy)(this.mask)];
            });
        });
    };
    ImageDataMask.prototype.getUnderlyingType = function () {
        return 'imagedata';
    };
    return ImageDataMask;
}());
function getSegmentation(imageData) {
    return {
        maskValueToLabel: function (maskValue) { return "" + maskValue; },
        mask: new ImageDataMask(imageData),
    };
}
var WIDTH = 1049;
var HEIGHT = 861;
function getBinarySegmentation() {
    return __awaiter(this, void 0, void 0, function () {
        var image, imageData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_util_2.loadImage)('shared/three_people_binary_segmentation.png', WIDTH, HEIGHT)];
                case 1:
                    image = _a.sent();
                    return [4 /*yield*/, (0, mask_util_1.toImageDataLossy)(image)];
                case 2:
                    imageData = _a.sent();
                    return [2 /*return*/, [getSegmentation(imageData)]];
            }
        });
    });
}
function getBinaryMask() {
    return __awaiter(this, void 0, void 0, function () {
        var segmentation, binaryMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBinarySegmentation()];
                case 1:
                    segmentation = _a.sent();
                    return [4 /*yield*/, renderUtil.toBinaryMask(segmentation, { r: 255, g: 255, b: 255, a: 255 }, { r: 0, g: 0, b: 0, a: 255 })];
                case 2:
                    binaryMask = _a.sent();
                    return [2 /*return*/, binaryMask];
            }
        });
    });
}
function getColoredSegmentation() {
    return __awaiter(this, void 0, void 0, function () {
        var image, imageData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_util_2.loadImage)('shared/three_people_colored_segmentation.png', WIDTH, HEIGHT)];
                case 1:
                    image = _a.sent();
                    return [4 /*yield*/, (0, mask_util_1.toImageDataLossy)(image)];
                case 2:
                    imageData = _a.sent();
                    return [2 /*return*/, [getSegmentation(imageData)]];
            }
        });
    });
}
var RAINBOW_PART_COLORS = [
    [110, 64, 170], [143, 61, 178], [178, 60, 178], [210, 62, 167],
    [238, 67, 149], [255, 78, 125], [255, 94, 99], [255, 115, 75],
    [255, 140, 56], [239, 167, 47], [217, 194, 49], [194, 219, 64],
    [175, 240, 91], [135, 245, 87], [96, 247, 96], [64, 243, 115],
    [40, 234, 141], [28, 219, 169], [26, 199, 194], [33, 176, 213],
    [47, 150, 224], [65, 125, 224], [84, 101, 214], [99, 81, 195]
];
function maskValueToRainbowColor(maskValue) {
    var _a = RAINBOW_PART_COLORS[maskValue], r = _a[0], g = _a[1], b = _a[2];
    return { r: r, g: g, b: b, a: 255 };
}
function getColoredMask() {
    return __awaiter(this, void 0, void 0, function () {
        var segmentation, coloredMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getColoredSegmentation()];
                case 1:
                    segmentation = _a.sent();
                    return [4 /*yield*/, renderUtil.toColoredMask(segmentation, maskValueToRainbowColor, { r: 255, g: 255, b: 255, a: 255 })];
                case 2:
                    coloredMask = _a.sent();
                    return [2 /*return*/, coloredMask];
            }
        });
    });
}
function expectImage(actual, imageName) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (0, test_util_2.loadImage)(imageName, WIDTH, HEIGHT)
                .then(function (image) { return (0, mask_util_1.toImageDataLossy)(image); })
                .then(function (expectedImage) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (0, test_util_1.expectArraysClose)(actual.data, expectedImage.data)];
            }); }); });
            return [2 /*return*/];
        });
    });
}
(0, jasmine_util_1.describeWithFlags)('renderUtil', jasmine_util_1.BROWSER_ENVS, function () {
    var image;
    var timeout;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // 2mins
                    return [4 /*yield*/, (0, test_util_2.loadImage)('shared/three_people.jpg', WIDTH, HEIGHT)];
                case 1:
                    image = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });
    it('toBinaryMask.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var binaryMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBinaryMask()];
                case 1:
                    binaryMask = _a.sent();
                    return [4 /*yield*/, expectImage(binaryMask, 'shared/three_people_binary_mask.png')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('toColoredMask.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var coloredMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getColoredMask()];
                case 1:
                    coloredMask = _a.sent();
                    return [4 /*yield*/, expectImage(coloredMask, 'shared/three_people_colored_mask.png')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('drawMask.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var binaryMask, canvas, imageMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBinaryMask()];
                case 1:
                    binaryMask = _a.sent();
                    canvas = document.createElement('canvas');
                    return [4 /*yield*/, renderUtil.drawMask(canvas, image, binaryMask, 0.7, 3)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, mask_util_1.toImageDataLossy)(canvas)];
                case 3:
                    imageMask = _a.sent();
                    return [4 /*yield*/, expectImage(imageMask, 'shared/three_people_draw_mask.png')];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('drawPixelatedMask.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var coloredMask, canvas, imageMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getColoredMask()];
                case 1:
                    coloredMask = _a.sent();
                    canvas = document.createElement('canvas');
                    return [4 /*yield*/, renderUtil.drawPixelatedMask(canvas, image, coloredMask)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, mask_util_1.toImageDataLossy)(canvas)];
                case 3:
                    imageMask = _a.sent();
                    return [4 /*yield*/, expectImage(imageMask, 'shared/three_people_pixelated_mask.png')];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('drawBokehEffect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var binarySegmentation, canvas, imageMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBinarySegmentation()];
                case 1:
                    binarySegmentation = _a.sent();
                    canvas = document.createElement('canvas');
                    return [4 /*yield*/, renderUtil.drawBokehEffect(canvas, image, binarySegmentation)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, mask_util_1.toImageDataLossy)(canvas)];
                case 3:
                    imageMask = _a.sent();
                    return [4 /*yield*/, expectImage(imageMask, 'shared/three_people_bokeh_effect.png')];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('blurBodyPart.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var coloredSegmentation, canvas, imageMask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getColoredSegmentation()];
                case 1:
                    coloredSegmentation = _a.sent();
                    canvas = document.createElement('canvas');
                    return [4 /*yield*/, renderUtil.blurBodyPart(canvas, image, coloredSegmentation, [0, 1])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, mask_util_1.toImageDataLossy)(canvas)];
                case 3:
                    imageMask = _a.sent();
                    return [4 /*yield*/, expectImage(imageMask, 'shared/three_people_blur_body_parts.png')];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=render_util_test.js.map