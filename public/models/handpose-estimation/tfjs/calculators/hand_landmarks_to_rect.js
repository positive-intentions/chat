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
exports.handLandmarksToRect = void 0;
var image_utils_1 = require("../../shared/calculators/image_utils");
var WRIST_JOINT = 0;
var MIDDLE_FINGER_PIP_JOINT = 6;
var INDEX_FINGER_PIP_JOINT = 4;
var RING_FINGER_PIP_JOINT = 8;
function computeRotation(landmarks, imageSize) {
    var x0 = landmarks[WRIST_JOINT].x * imageSize.width;
    var y0 = landmarks[WRIST_JOINT].y * imageSize.height;
    var x1 = (landmarks[INDEX_FINGER_PIP_JOINT].x +
        landmarks[RING_FINGER_PIP_JOINT].x) /
        2;
    var y1 = (landmarks[INDEX_FINGER_PIP_JOINT].y +
        landmarks[RING_FINGER_PIP_JOINT].y) /
        2;
    x1 = (x1 + landmarks[MIDDLE_FINGER_PIP_JOINT].x) / 2 * imageSize.width;
    y1 = (y1 + landmarks[MIDDLE_FINGER_PIP_JOINT].y) / 2 * imageSize.height;
    var rotation = (0, image_utils_1.normalizeRadians)(Math.PI / 2 - Math.atan2(-(y1 - y0), x1 - x0));
    return rotation;
}
/**
 * @param landmarks List of normalized landmarks.
 *
 * @returns A `Rect`.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/hand_landmark/calculators/hand_landmarks_to_rect_calculator.cc;bpv=1
function handLandmarksToRect(landmarks, imageSize) {
    var rotation = computeRotation(landmarks, imageSize);
    var reverseAngle = (0, image_utils_1.normalizeRadians)(-rotation);
    var minX = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
    // Find boundaries of landmarks.
    for (var _i = 0, landmarks_1 = landmarks; _i < landmarks_1.length; _i++) {
        var landmark = landmarks_1[_i];
        var x = landmark.x;
        var y = landmark.y;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }
    var axisAlignedcenterX = (maxX + minX) / 2;
    var axisAlignedcenterY = (maxY + minY) / 2;
    minX = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY,
        minY = Number.POSITIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
    // Find boundaries of rotated landmarks.
    for (var _a = 0, landmarks_2 = landmarks; _a < landmarks_2.length; _a++) {
        var landmark = landmarks_2[_a];
        var originalX = (landmark.x - axisAlignedcenterX) * imageSize.width;
        var originalY = (landmark.y - axisAlignedcenterY) * imageSize.height;
        var projectedX = originalX * Math.cos(reverseAngle) - originalY * Math.sin(reverseAngle);
        var projectedY = originalX * Math.sin(reverseAngle) + originalY * Math.cos(reverseAngle);
        minX = Math.min(minX, projectedX);
        maxX = Math.max(maxX, projectedX);
        minY = Math.min(minY, projectedY);
        maxY = Math.max(maxY, projectedY);
    }
    var projectedCenterX = (maxX + minX) / 2;
    var projectedCenterY = (maxY + minY) / 2;
    var centerX = projectedCenterX * Math.cos(rotation) -
        projectedCenterY * Math.sin(rotation) +
        imageSize.width * axisAlignedcenterX;
    var centerY = projectedCenterX * Math.sin(rotation) +
        projectedCenterY * Math.cos(rotation) +
        imageSize.height * axisAlignedcenterY;
    var width = (maxX - minX) / imageSize.width;
    var height = (maxY - minY) / imageSize.height;
    return {
        xCenter: centerX / imageSize.width,
        yCenter: centerY / imageSize.height,
        width: width,
        height: height,
        rotation: rotation
    };
}
exports.handLandmarksToRect = handLandmarksToRect;
//# sourceMappingURL=hand_landmarks_to_rect.js.map