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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLandmarkProjection = void 0;
/**
 * Projects normalized landmarks in a rectangle to its original coordinates. The
 * rectangle must also be in normalized coordinates.
 * @param landmarks A normalized Landmark list representing landmarks in a
 *     normalized rectangle.
 * @param inputRect A normalized rectangle.
 * @param config Config object has one field ignoreRotation, default to false.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
function calculateLandmarkProjection(landmarks, inputRect, config) {
    if (config === void 0) { config = {
        ignoreRotation: false
    }; }
    var outputLandmarks = [];
    for (var _i = 0, landmarks_1 = landmarks; _i < landmarks_1.length; _i++) {
        var landmark = landmarks_1[_i];
        var x = landmark.x - 0.5;
        var y = landmark.y - 0.5;
        var angle = config.ignoreRotation ? 0 : inputRect.rotation;
        var newX = Math.cos(angle) * x - Math.sin(angle) * y;
        var newY = Math.sin(angle) * x + Math.cos(angle) * y;
        newX = newX * inputRect.width + inputRect.xCenter;
        newY = newY * inputRect.height + inputRect.yCenter;
        var newZ = landmark.z * inputRect.width; // Scale Z coordinate as x.
        var newLandmark = __assign({}, landmark);
        newLandmark.x = newX;
        newLandmark.y = newY;
        newLandmark.z = newZ;
        outputLandmarks.push(newLandmark);
    }
    return outputLandmarks;
}
exports.calculateLandmarkProjection = calculateLandmarkProjection;
//# sourceMappingURL=calculate_landmark_projection.js.map