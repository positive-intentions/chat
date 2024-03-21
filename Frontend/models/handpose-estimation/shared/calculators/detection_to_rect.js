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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDetectionsToRects = exports.computeRotation = void 0;
var image_utils_1 = require("./image_utils");
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detections_to_rects_calculator.cc
function computeRotation(detection, imageSize, config) {
    var locationData = detection.locationData;
    var startKeypoint = config.rotationVectorStartKeypointIndex;
    var endKeypoint = config.rotationVectorEndKeypointIndex;
    var targetAngle;
    if (config.rotationVectorTargetAngle) {
        targetAngle = config.rotationVectorTargetAngle;
    }
    else {
        targetAngle = Math.PI * config.rotationVectorTargetAngleDegree / 180;
    }
    var x0 = locationData.relativeKeypoints[startKeypoint].x * imageSize.width;
    var y0 = locationData.relativeKeypoints[startKeypoint].y * imageSize.height;
    var x1 = locationData.relativeKeypoints[endKeypoint].x * imageSize.width;
    var y1 = locationData.relativeKeypoints[endKeypoint].y * imageSize.height;
    var rotation = (0, image_utils_1.normalizeRadians)(targetAngle - Math.atan2(-(y1 - y0), x1 - x0));
    return rotation;
}
exports.computeRotation = computeRotation;
function rectFromBox(box) {
    return {
        xCenter: box.xMin + box.width / 2,
        yCenter: box.yMin + box.height / 2,
        width: box.width,
        height: box.height,
    };
}
function normRectFromKeypoints(locationData) {
    var keypoints = locationData.relativeKeypoints;
    if (keypoints.length <= 1) {
        throw new Error('2 or more keypoints required to calculate a rect.');
    }
    var xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE;
    keypoints.forEach(function (keypoint) {
        xMin = Math.min(xMin, keypoint.x);
        xMax = Math.max(xMax, keypoint.x);
        yMin = Math.min(yMin, keypoint.y);
        yMax = Math.max(yMax, keypoint.y);
    });
    return {
        xCenter: (xMin + xMax) / 2,
        yCenter: (yMin + yMax) / 2,
        width: xMax - xMin,
        height: yMax - yMin
    };
}
function detectionToNormalizedRect(detection, conversionMode) {
    var locationData = detection.locationData;
    return conversionMode === 'boundingbox' ?
        rectFromBox(locationData.relativeBoundingBox) :
        normRectFromKeypoints(locationData);
}
function detectionToRect(detection, conversionMode, imageSize) {
    var locationData = detection.locationData;
    var rect;
    if (conversionMode === 'boundingbox') {
        rect = rectFromBox(locationData.boundingBox);
    }
    else {
        rect = normRectFromKeypoints(locationData);
        var width = imageSize.width, height = imageSize.height;
        rect.xCenter = Math.round(rect.xCenter * width);
        rect.yCenter = Math.round(rect.yCenter * height);
        rect.width = Math.round(rect.width * width);
        rect.height = Math.round(rect.height * height);
    }
    return rect;
}
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detections_to_rects_calculator.cc
function calculateDetectionsToRects(detection, conversionMode, outputType, imageSize, rotationConfig) {
    var rect = outputType === 'rect' ?
        detectionToRect(detection, conversionMode, imageSize) :
        detectionToNormalizedRect(detection, conversionMode);
    if (rotationConfig) {
        rect.rotation = computeRotation(detection, imageSize, rotationConfig);
    }
    return rect;
}
exports.calculateDetectionsToRects = calculateDetectionsToRects;
//# sourceMappingURL=detection_to_rect.js.map