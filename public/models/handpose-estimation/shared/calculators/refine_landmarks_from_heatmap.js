"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.refineLandmarksFromHeatmap = void 0;
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
/**
 * A calculator that refines landmarks using corresponding heatmap area.
 *
 * High level algorithm
 * For each landmark, we replace original value with a value calculated from the
 * area in heatmap close to original landmark position (the area is defined by
 * config.kernelSize). To calculate new coordinate from heatmap we calculate an
 * weighted average inside the kernel. We update the landmark if heatmap is
 * confident in it's prediction i.e. max(heatmap) in kernel is at least bigger
 * than config.minConfidenceToRefine.
 * @param landmarks List of lardmarks to refine.
 * @param heatmapTensor The heatmap for the landmarks with shape
 *     [height, width, channel]. The channel dimension has to be the same as
 *     the number of landmarks.
 * @param config The config for refineLandmarksFromHeap,
 *     see `RefineLandmarksFromHeatmapConfig` for detail.
 *
 * @returns Normalized landmarks.
 */
function refineLandmarksFromHeatmap(landmarks, heatmapTensor, config) {
    return __awaiter(this, void 0, void 0, function () {
        var $heatmapTensor, _a, hmHeight, hmWidth, hmChannels, outLandmarks, heatmapBuf, i, landmark, outLandmark, centerCol, centerRow, offset, beginCol, endCol, beginRow, endRow, sum, weightedCol, weightedRow, maxValue, row, col, confidence;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $heatmapTensor = tf.squeeze(heatmapTensor, [0]);
                    _a = $heatmapTensor.shape, hmHeight = _a[0], hmWidth = _a[1], hmChannels = _a[2];
                    if (landmarks.length !== hmChannels) {
                        throw new Error('Expected heatmap to have same number of channels ' +
                            'as the number of landmarks. But got landmarks length: ' +
                            (landmarks.length + ", heatmap length: " + hmChannels));
                    }
                    outLandmarks = [];
                    return [4 /*yield*/, $heatmapTensor.buffer()];
                case 1:
                    heatmapBuf = _b.sent();
                    for (i = 0; i < landmarks.length; i++) {
                        landmark = landmarks[i];
                        outLandmark = __assign({}, landmark);
                        outLandmarks.push(outLandmark);
                        centerCol = Math.trunc(outLandmark.x * hmWidth);
                        centerRow = Math.trunc(outLandmark.y * hmHeight);
                        // Point is outside of the image let's keep it intact.
                        if (centerCol < 0 || centerCol >= hmWidth || centerRow < 0 ||
                            centerCol >= hmHeight) {
                            continue;
                        }
                        offset = Math.trunc((config.kernelSize - 1) / 2);
                        beginCol = Math.max(0, centerCol - offset);
                        endCol = Math.min(hmWidth, centerCol + offset + 1);
                        beginRow = Math.max(0, centerRow - offset);
                        endRow = Math.min(hmHeight, centerRow + offset + 1);
                        sum = 0;
                        weightedCol = 0;
                        weightedRow = 0;
                        maxValue = 0;
                        // Main loop. Go over kernel and calculate weighted sum of coordinates,
                        // sum of weights and max weights.
                        for (row = beginRow; row < endRow; ++row) {
                            for (col = beginCol; col < endCol; ++col) {
                                confidence = heatmapBuf.get(row, col, i);
                                sum += confidence;
                                maxValue = Math.max(maxValue, confidence);
                                weightedCol += col * confidence;
                                weightedRow += row * confidence;
                            }
                        }
                        if (maxValue >= config.minConfidenceToRefine && sum > 0) {
                            outLandmark.x = weightedCol / hmWidth / sum;
                            outLandmark.y = weightedRow / hmHeight / sum;
                        }
                    }
                    $heatmapTensor.dispose();
                    return [2 /*return*/, outLandmarks];
            }
        });
    });
}
exports.refineLandmarksFromHeatmap = refineLandmarksFromHeatmap;
//# sourceMappingURL=refine_landmarks_from_heatmap.js.map