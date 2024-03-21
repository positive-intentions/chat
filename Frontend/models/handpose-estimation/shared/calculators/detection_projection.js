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
exports.detectionProjection = void 0;
var calculate_inverse_matrix_1 = require("./calculate_inverse_matrix");
function project(projectionMatrix, _a) {
    var x = _a[0], y = _a[1];
    return [
        x * projectionMatrix[0] + y * projectionMatrix[1] + projectionMatrix[3],
        x * projectionMatrix[4] + y * projectionMatrix[5] + projectionMatrix[7]
    ];
}
/**
 * Projects detections to a different coordinate system using a provided
 * projection matrix.
 *
 * @param detections A list of detections to project using the provided
 *     projection matrix.
 * @param projectionMatrix Maps data from one coordinate system to     another.
 * @returns detections: A list of projected detections
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detection_projection_calculator.cc
function detectionProjection(detections, projectionMatrix) {
    if (detections === void 0) { detections = []; }
    var flatProjectionMatrix = (0, calculate_inverse_matrix_1.matrix4x4ToArray)(projectionMatrix);
    detections.forEach(function (detection) {
        var locationData = detection.locationData;
        // Project keypoints.
        locationData.relativeKeypoints.forEach(function (keypoint) {
            var _a = project(flatProjectionMatrix, [keypoint.x, keypoint.y]), x = _a[0], y = _a[1];
            keypoint.x = x;
            keypoint.y = y;
        });
        // Project bounding box.
        var box = locationData.relativeBoundingBox;
        var xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE;
        [[box.xMin, box.yMin], [box.xMin + box.width, box.yMin],
            [box.xMin + box.width, box.yMin + box.height],
            [box.xMin, box.yMin + box.height]]
            .forEach(function (coordinate) {
            // a) Define and project box points.
            var _a = project(flatProjectionMatrix, coordinate), x = _a[0], y = _a[1];
            // b) Find new left top and right bottom points for a box which
            // encompases
            //    non-projected (rotated) box.
            xMin = Math.min(xMin, x);
            xMax = Math.max(xMax, x);
            yMin = Math.min(yMin, y);
            yMax = Math.max(yMax, y);
        });
        locationData.relativeBoundingBox =
            { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: xMax - xMin, height: yMax - yMin };
    });
    return detections;
}
exports.detectionProjection = detectionProjection;
//# sourceMappingURL=detection_projection.js.map