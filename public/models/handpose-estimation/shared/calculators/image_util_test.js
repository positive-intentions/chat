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
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var image_utils_1 = require("./image_utils");
function expectRotatedRectEq(rect, width, height, xCenter, yCenter, rotation) {
    expect(rect.xCenter).toBe(xCenter);
    expect(rect.yCenter).toBe(yCenter);
    expect(rect.width).toBe(width);
    expect(rect.height).toBe(height);
    expect(rect.rotation).toBe(rotation);
}
describe('GetRoi', function () {
    it('no norm rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expectRotatedRectEq((0, image_utils_1.getRoi)({ width: 4, height: 4 }), 4, 4, 2, 2, 0);
            expectRotatedRectEq((0, image_utils_1.getRoi)({ width: 25, height: 15 }), 25, 15, 12.5, 7.5, 0);
            return [2 /*return*/];
        });
    }); });
    it('whole image norm rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var normRect;
        return __generator(this, function (_a) {
            normRect = { width: 1, height: 1, xCenter: 0.5, yCenter: 0.5, rotation: 0 };
            expectRotatedRectEq((0, image_utils_1.getRoi)({ width: 4, height: 4 }, normRect), 4, 4, 2, 2, 0);
            expectRotatedRectEq((0, image_utils_1.getRoi)({ width: 25, height: 15 }, normRect), 25, 15, 12.5, 7.5, 0);
            return [2 /*return*/];
        });
    }); });
    it('expanded norm rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var normRect;
        return __generator(this, function (_a) {
            normRect = { width: 4, height: 2, xCenter: 0.5, yCenter: 1, rotation: 3 };
            expectRotatedRectEq((0, image_utils_1.getRoi)({ width: 4, height: 4 }, normRect), 16, 8, 2, 4, 3);
            expectRotatedRectEq((0, image_utils_1.getRoi)({ width: 25, height: 15 }, normRect), 100, 30, 12.5, 15, 3);
            return [2 /*return*/];
        });
    }); });
});
var EPS = 1e-6;
function expectPaddingClose(padding, top, bottom, left, right) {
    (0, test_util_1.expectNumbersClose)(padding.top, top, EPS);
    (0, test_util_1.expectNumbersClose)(padding.bottom, bottom, EPS);
    (0, test_util_1.expectNumbersClose)(padding.left, left, EPS);
    (0, test_util_1.expectNumbersClose)(padding.right, right, EPS);
}
describe('PadRoi', function () {
    it('no padding.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var roi;
        return __generator(this, function (_a) {
            roi = { xCenter: 20, yCenter: 10, width: 100, height: 200, rotation: 5 };
            expectPaddingClose((0, image_utils_1.padRoi)(roi, { width: 10, height: 10 }, false), 0, 0, 0, 0);
            expectRotatedRectEq(roi, 100, 200, 20, 10, 5);
            return [2 /*return*/];
        });
    }); });
    it('horizontal padding.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var roi;
        return __generator(this, function (_a) {
            roi = { xCenter: 20, yCenter: 10, width: 100, height: 200, rotation: 5 };
            expectPaddingClose((0, image_utils_1.padRoi)(roi, { width: 10, height: 10 }, true), 0, 0, 0.25, 0.25);
            expectRotatedRectEq(roi, 200, 200, 20, 10, 5);
            return [2 /*return*/];
        });
    }); });
    it('vertical padding.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var roi, expectedHorizontalPadding;
        return __generator(this, function (_a) {
            roi = { xCenter: 1, yCenter: 2, width: 21, height: 19, rotation: 3 };
            expectedHorizontalPadding = (21 - 19) / 2.0 / 21;
            expectPaddingClose((0, image_utils_1.padRoi)(roi, { width: 10, height: 10 }, true), expectedHorizontalPadding, expectedHorizontalPadding, 0, 0);
            expectRotatedRectEq(roi, 21, 21, 1, 2, 3);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=image_util_test.js.map