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
var remove_detection_letterbox_1 = require("./remove_detection_letterbox");
var EPS = 1e-5;
function createRelativeLocationData(xMin, yMin, width, height) {
    return {
        relativeBoundingBox: { xMin: xMin, yMin: yMin, width: width, height: height, xMax: xMin + width, yMax: yMin + height }
    };
}
function createDetection(labels, labelIds, scores, locationData) {
    var detection = { label: labels, score: scores, labelId: labelIds, locationData: locationData };
    return detection;
}
describe('DetectionLetterboxRemovalCalculator', function () {
    var locationData = createRelativeLocationData(0.25, 0.25, 0.25, 0.25);
    var label = 'detected_object';
    var detections = [createDetection([label], [], [0.3], locationData)];
    var keys = ['xMin', 'yMin', 'width', 'height', 'xMax', 'yMax'];
    it('padding left right.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var locationData, label, detections, padding, outputDetections, outputDetection, expectedLocationData, _i, _a, key;
        return __generator(this, function (_b) {
            locationData = createRelativeLocationData(0.25, 0.25, 0.25, 0.25);
            label = 'detected_object';
            detections = [createDetection([label], [], [0.3], locationData)];
            padding = { left: 0.2, top: 0, right: 0.3, bottom: 0 };
            outputDetections = (0, remove_detection_letterbox_1.removeDetectionLetterbox)(detections, padding);
            expect(outputDetections.length).toBe(1);
            outputDetection = outputDetections[0];
            expect(outputDetection.label.length).toBe(1);
            expect(outputDetection.label[0]).toBe(label);
            expect(outputDetection.labelId.length).toBe(0);
            expect(outputDetection.score.length).toBe(1);
            expect(outputDetection.score[0]).toBe(0.3);
            expectedLocationData = {
                relativeBoundingBox: {
                    xMin: 0.1,
                    yMin: 0.25,
                    width: 0.5,
                    height: 0.25,
                    xMax: 0.6,
                    yMax: 0.5
                }
            };
            for (_i = 0, _a = ['xMin', 'yMin', 'width', 'height', 'xMax', 'yMax']; _i < _a.length; _i++) {
                key = _a[_i];
                (0, test_util_1.expectNumbersClose)(outputDetection.locationData.relativeBoundingBox[key], expectedLocationData.relativeBoundingBox[key], EPS);
            }
            return [2 /*return*/];
        });
    }); });
    it('padding top bottom.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var padding, outputDetections, outputDetection, expectedLocationData, _i, keys_1, key;
        return __generator(this, function (_a) {
            padding = { left: 0, top: 0.2, right: 0, bottom: 0.3 };
            outputDetections = (0, remove_detection_letterbox_1.removeDetectionLetterbox)(detections, padding);
            expect(outputDetections.length).toBe(1);
            outputDetection = outputDetections[0];
            expect(outputDetection.label.length).toBe(1);
            expect(outputDetection.label[0]).toBe(label);
            expect(outputDetection.labelId.length).toBe(0);
            expect(outputDetection.score.length).toBe(1);
            expect(outputDetection.score[0]).toBe(0.3);
            expectedLocationData = {
                relativeBoundingBox: {
                    xMin: 0.25,
                    yMin: 0.1,
                    width: 0.25,
                    height: 0.5,
                    xMax: 0.5,
                    yMax: 0.6
                }
            };
            for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                key = keys_1[_i];
                (0, test_util_1.expectNumbersClose)(outputDetection.locationData.relativeBoundingBox[key], expectedLocationData.relativeBoundingBox[key], EPS);
            }
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=remove_detection_letterbox_test.js.map