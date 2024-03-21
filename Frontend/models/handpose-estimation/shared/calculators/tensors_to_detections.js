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
exports.convertToDetections = exports.tensorsToDetections = void 0;
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
 * Convert result Tensors from object detection models into Detection boxes.
 *
 * @param detectionTensors List of Tensors of type Float32. The list of tensors
 *     can have 2 or 3 tensors. First tensor is the predicted raw
 *     boxes/keypoints. The size of the values must be
 *     (num_boxes * num_predicted_values). Second tensor is the score tensor.
 *     The size of the valuse must be (num_boxes * num_classes). It's optional
 *     to pass in a third tensor for anchors (e.g. for SSD models) depend on the
 *     outputs of the detection model. The size of anchor tensor must be
 *     (num_boxes * 4).
 * @param anchor A tensor for anchors. The size of anchor tensor must be
 *     (num_boxes * 4).
 * @param config
 */
function tensorsToDetections(detectionTensors, anchor, config) {
    return __awaiter(this, void 0, void 0, function () {
        var rawScoreTensor, rawBoxTensor, boxes, normalizedScore, outputDetections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rawScoreTensor = detectionTensors[0];
                    rawBoxTensor = detectionTensors[1];
                    boxes = decodeBoxes(rawBoxTensor, anchor, config);
                    normalizedScore = tf.tidy(function () {
                        var normalizedScore = rawScoreTensor;
                        if (config.sigmoidScore) {
                            if (config.scoreClippingThresh != null) {
                                normalizedScore = tf.clipByValue(rawScoreTensor, -config.scoreClippingThresh, config.scoreClippingThresh);
                            }
                            normalizedScore = tf.sigmoid(normalizedScore);
                            return normalizedScore;
                        }
                        return normalizedScore;
                    });
                    return [4 /*yield*/, convertToDetections(boxes, normalizedScore, config)];
                case 1:
                    outputDetections = _a.sent();
                    tf.dispose([boxes, normalizedScore]);
                    return [2 /*return*/, outputDetections];
            }
        });
    });
}
exports.tensorsToDetections = tensorsToDetections;
function convertToDetections(detectionBoxes, detectionScore, config) {
    return __awaiter(this, void 0, void 0, function () {
        var outputDetections, detectionBoxesData, detectionScoresData, i, boxOffset, detection, bbox, locationData, totalIdx, kpId, keypointIndex, keypoint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputDetections = [];
                    return [4 /*yield*/, detectionBoxes.data()];
                case 1:
                    detectionBoxesData = _a.sent();
                    return [4 /*yield*/, detectionScore.data()];
                case 2:
                    detectionScoresData = _a.sent();
                    for (i = 0; i < config.numBoxes; ++i) {
                        if (config.minScoreThresh != null &&
                            detectionScoresData[i] < config.minScoreThresh) {
                            continue;
                        }
                        boxOffset = i * config.numCoords;
                        detection = convertToDetection(detectionBoxesData[boxOffset + 0] /* boxYMin */, detectionBoxesData[boxOffset + 1] /* boxXMin */, detectionBoxesData[boxOffset + 2] /* boxYMax */, detectionBoxesData[boxOffset + 3] /* boxXMax */, detectionScoresData[i], config.flipVertically, i);
                        bbox = detection.locationData.relativeBoundingBox;
                        if (bbox.width < 0 || bbox.height < 0) {
                            // Decoded detection boxes could have negative values for width/height
                            // due to model prediction. Filter out those boxes since some
                            // downstream calculators may assume non-negative values.
                            continue;
                        }
                        // Add keypoints.
                        if (config.numKeypoints > 0) {
                            locationData = detection.locationData;
                            locationData.relativeKeypoints = [];
                            totalIdx = config.numKeypoints * config.numValuesPerKeypoint;
                            for (kpId = 0; kpId < totalIdx; kpId += config.numValuesPerKeypoint) {
                                keypointIndex = boxOffset + config.keypointCoordOffset + kpId;
                                keypoint = {
                                    x: detectionBoxesData[keypointIndex + 0],
                                    y: config.flipVertically ? 1 - detectionBoxesData[keypointIndex + 1] :
                                        detectionBoxesData[keypointIndex + 1]
                                };
                                locationData.relativeKeypoints.push(keypoint);
                            }
                        }
                        outputDetections.push(detection);
                    }
                    return [2 /*return*/, outputDetections];
            }
        });
    });
}
exports.convertToDetections = convertToDetections;
function convertToDetection(boxYMin, boxXMin, boxYMax, boxXMax, score, flipVertically, i) {
    return {
        score: [score],
        ind: i,
        locationData: {
            relativeBoundingBox: {
                xMin: boxXMin,
                yMin: flipVertically ? 1 - boxYMax : boxYMin,
                xMax: boxXMax,
                yMax: flipVertically ? 1 - boxYMin : boxYMax,
                width: boxXMax - boxXMin,
                height: boxYMax - boxYMin
            }
        }
    };
}
//[xCenter, yCenter, w, h, kp1, kp2, kp3, kp4]
//[yMin, xMin, yMax, xMax, kpX, kpY, kpX, kpY]
function decodeBoxes(rawBoxes, anchor, config) {
    return tf.tidy(function () {
        var yCenter;
        var xCenter;
        var h;
        var w;
        if (config.reverseOutputOrder) {
            // Shape [numOfBoxes, 1].
            xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
            yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
            w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
            h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
        }
        else {
            yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
            xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
            h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
            w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
        }
        xCenter =
            tf.add(tf.mul(tf.div(xCenter, config.xScale), anchor.w), anchor.x);
        yCenter =
            tf.add(tf.mul(tf.div(yCenter, config.yScale), anchor.h), anchor.y);
        if (config.applyExponentialOnBoxSize) {
            h = tf.mul(tf.exp(tf.div(h, config.hScale)), anchor.h);
            w = tf.mul(tf.exp(tf.div(w, config.wScale)), anchor.w);
        }
        else {
            h = tf.mul(tf.div(h, config.hScale), anchor.h);
            w = tf.mul(tf.div(w, config.wScale), anchor.h);
        }
        var yMin = tf.sub(yCenter, tf.div(h, 2));
        var xMin = tf.sub(xCenter, tf.div(w, 2));
        var yMax = tf.add(yCenter, tf.div(h, 2));
        var xMax = tf.add(xCenter, tf.div(w, 2));
        // Shape [numOfBoxes, 4].
        var boxes = tf.concat([
            tf.reshape(yMin, [config.numBoxes, 1]),
            tf.reshape(xMin, [config.numBoxes, 1]),
            tf.reshape(yMax, [config.numBoxes, 1]),
            tf.reshape(xMax, [config.numBoxes, 1])
        ], 1);
        if (config.numKeypoints) {
            for (var k = 0; k < config.numKeypoints; ++k) {
                var keypointOffset = config.keypointCoordOffset + k * config.numValuesPerKeypoint;
                var keypointX = void 0;
                var keypointY = void 0;
                if (config.reverseOutputOrder) {
                    keypointX =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                    keypointY =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                }
                else {
                    keypointY =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                    keypointX =
                        tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                }
                var keypointXNormalized = tf.add(tf.mul(tf.div(keypointX, config.xScale), anchor.w), anchor.x);
                var keypointYNormalized = tf.add(tf.mul(tf.div(keypointY, config.yScale), anchor.h), anchor.y);
                boxes = tf.concat([
                    boxes, tf.reshape(keypointXNormalized, [config.numBoxes, 1]),
                    tf.reshape(keypointYNormalized, [config.numBoxes, 1])
                ], 1);
            }
        }
        // Shape [numOfBoxes, 4] || [numOfBoxes, 12].
        return boxes;
    });
}
//# sourceMappingURL=tensors_to_detections.js.map