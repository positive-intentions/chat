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
var detection_to_rect_1 = require("./detection_to_rect");
function detectionWithLocationData(xMin, yMin, width, height) {
    var detection = {
        locationData: {
            boundingBox: { xMin: xMin, yMin: yMin, width: width, height: height, xMax: xMin + width, yMax: yMin + height }
        }
    };
    return detection;
}
function detectionWithKeyPoints(keypoints) {
    var detection = {
        locationData: {
            relativeKeypoints: keypoints.map(function (keypoint) { return ({ x: keypoint[0], y: keypoint[1] }); })
        }
    };
    return detection;
}
function detectionWithRelativeLocationData(xMin, yMin, width, height) {
    var detection = {
        locationData: {
            relativeBoundingBox: { xMin: xMin, yMin: yMin, width: width, height: height, xMax: xMin + width, yMax: yMin + height }
        }
    };
    return detection;
}
function expectRectEq(rect, xCenter, yCenter, width, height) {
    expect(rect.xCenter).toBe(xCenter);
    expect(rect.yCenter).toBe(yCenter);
    expect(rect.width).toBe(width);
    expect(rect.height).toBe(height);
}
describe('DetectionsToRects', function () {
    it('detection to rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rects;
        return __generator(this, function (_a) {
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithLocationData(100, 200, 300, 400), 'boundingbox', 'rect');
            expectRectEq(rects, 250, 400, 300, 400);
            return [2 /*return*/];
        });
    }); });
    it('detection keypoints to rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rects;
        return __generator(this, function (_a) {
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0, 0], [1, 1]]), 'keypoints', 'rect', { width: 640, height: 480 });
            expectRectEq(rects, 320, 240, 640, 480);
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0.25, 0.25], [0.75, 0.75]]), 'keypoints', 'rect', { width: 640, height: 480 });
            expectRectEq(rects, 320, 240, 320, 240);
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0, 0], [0.5, 0.5]]), 'keypoints', 'rect', { width: 640, height: 480 });
            expectRectEq(rects, 160, 120, 320, 240);
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0.5, 0.5], [1, 1]]), 'keypoints', 'rect', { width: 640, height: 480 });
            expectRectEq(rects, 480, 360, 320, 240);
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0.25, 0.25], [0.75, 0.75]]), 'keypoints', 'rect', { width: 0, height: 0 });
            expectRectEq(rects, 0, 0, 0, 0);
            return [2 /*return*/];
        });
    }); });
    it('detection to normalized rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rects;
        return __generator(this, function (_a) {
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithRelativeLocationData(0.1, 0.2, 0.3, 0.4), 'boundingbox', 'normRect');
            expectRectEq(rects, 0.25, 0.4, 0.3, 0.4);
            return [2 /*return*/];
        });
    }); });
    it('detection keypoints to normalized rect.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var rects;
        return __generator(this, function (_a) {
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0, 0], [0.5, 0.5], [1, 1]]), 'keypoints', 'normRect');
            expectRectEq(rects, 0.5, 0.5, 1, 1);
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0.25, 0.25], [0.75, 0.25], [0.75, 0.75]]), 'keypoints', 'normRect');
            expectRectEq(rects, 0.5, 0.5, 0.5, 0.5);
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0, 0], [0.5, 0.5]]), 'keypoints', 'normRect');
            expectRectEq(rects, 0.25, 0.25, 0.5, 0.5);
            rects = (0, detection_to_rect_1.calculateDetectionsToRects)(detectionWithKeyPoints([[0.5, 0.5], [1, 1]]), 'keypoints', 'normRect');
            expectRectEq(rects, 0.75, 0.75, 0.5, 0.5);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=detection_to_rect_test.js.map