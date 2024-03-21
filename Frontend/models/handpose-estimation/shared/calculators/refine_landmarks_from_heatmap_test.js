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
var refine_landmarks_from_heatmap_1 = require("./refine_landmarks_from_heatmap");
function chwToHWC(chw, height, width, depth) {
    var idx = 0;
    var hwc = [];
    for (var c = 0; c < depth; ++c) {
        for (var row = 0; row < height; ++row) {
            for (var col = 0; col < width; ++col) {
                var destIdx = width * depth * row + depth * col + c;
                hwc[destIdx] = chw[idx];
                idx++;
            }
        }
    }
    return hwc;
}
describe('refineLandmarksFromHeatmap ', function () {
    var z = -10000000000000000;
    it('smoke.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var landmarks, heatmapTensor, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    landmarks = [{ x: 0.5, y: 0.5 }];
                    heatmapTensor = tf.sigmoid(tf.tensor4d([z, z, z, 1, z, z, z, z, z], [1, 3, 3, 1]));
                    return [4 /*yield*/, (0, refine_landmarks_from_heatmap_1.refineLandmarksFromHeatmap)(landmarks, heatmapTensor, { kernelSize: 3, minConfidenceToRefine: 0.1 })];
                case 1:
                    result = _a.sent();
                    expect(result[0].x).toBe(0);
                    expect(result[0].y).toBe(1 / 3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('multi-layer.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var landmarks, heatmapTensor, result, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    landmarks = [{ x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }];
                    heatmapTensor = tf.sigmoid(tf.tensor4d(chwToHWC([
                        z, z, z, 1, z, z, z, z, z, z, z, z, 1, z,
                        z, z, z, z, z, z, z, 1, z, z, z, z, z
                    ], 3, 3, 3), [1, 3, 3, 3]));
                    return [4 /*yield*/, (0, refine_landmarks_from_heatmap_1.refineLandmarksFromHeatmap)(landmarks, heatmapTensor, { kernelSize: 3, minConfidenceToRefine: 0.1 })];
                case 1:
                    result = _a.sent();
                    for (i = 0; i < 3; i++) {
                        expect(result[i].x).toBe(0);
                        expect(result[i].y).toBe(1 / 3);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('keep if not sure.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var landmarks, heatmapTensor, result, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    landmarks = [{ x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 }];
                    heatmapTensor = tf.sigmoid(tf.tensor4d(chwToHWC([
                        z, z, z, 0, z, z, z, z, z, z, z, z, 0, z,
                        z, z, z, z, z, z, z, 0, z, z, z, z, z
                    ], 3, 3, 3), [1, 3, 3, 3]));
                    return [4 /*yield*/, (0, refine_landmarks_from_heatmap_1.refineLandmarksFromHeatmap)(landmarks, heatmapTensor, { kernelSize: 3, minConfidenceToRefine: 0.6 })];
                case 1:
                    result = _a.sent();
                    for (i = 0; i < 3; i++) {
                        expect(result[i].x).toBe(0.5);
                        expect(result[i].y).toBe(0.5);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('border.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var landmarks, heatmapTensor, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    landmarks = [{ x: 0, y: 0 }, { x: 0.9, y: 0.9 }];
                    heatmapTensor = tf.sigmoid(tf.tensor4d(chwToHWC([z, z, z, 0, z, 0, z, z, z, z, z, z, 0, z, 0, z, z, 0], 3, 3, 2), [1, 3, 3, 2]));
                    return [4 /*yield*/, (0, refine_landmarks_from_heatmap_1.refineLandmarksFromHeatmap)(landmarks, heatmapTensor, { kernelSize: 3, minConfidenceToRefine: 0.1 })];
                case 1:
                    result = _a.sent();
                    expect(result[0].x).toBe(0);
                    expect(result[0].y).toBe(1 / 3);
                    expect(result[1].x).toBe(2 / 3);
                    expect(result[1].y).toBe(1 / 6 + 2 / 6);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=refine_landmarks_from_heatmap_test.js.map