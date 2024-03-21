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
exports.calculateWorldLandmarkProjection = void 0;
/**
 * Projects world landmarks from the rectangle to original coordinates.
 *
 * World landmarks are predicted in meters rather than in pixels of the image
 * and have origin in the middle of the hips rather than in the corner of the
 * pose image (cropped with given rectangle). Thus only rotation (but not scale
 * and translation) is applied to the landmarks to transform them back to
 * original coordinates.
 * @param worldLandmarks A Landmark list representing world landmarks in the
 *     rectangle.
 * @param inputRect A normalized rectangle.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
function calculateWorldLandmarkProjection(worldLandmarks, inputRect) {
    var outputLandmarks = [];
    for (var _i = 0, worldLandmarks_1 = worldLandmarks; _i < worldLandmarks_1.length; _i++) {
        var worldLandmark = worldLandmarks_1[_i];
        var x = worldLandmark.x;
        var y = worldLandmark.y;
        var angle = inputRect.rotation;
        var newX = Math.cos(angle) * x - Math.sin(angle) * y;
        var newY = Math.sin(angle) * x + Math.cos(angle) * y;
        var newLandmark = __assign({}, worldLandmark);
        newLandmark.x = newX;
        newLandmark.y = newY;
        outputLandmarks.push(newLandmark);
    }
    return outputLandmarks;
}
exports.calculateWorldLandmarkProjection = calculateWorldLandmarkProjection;
//# sourceMappingURL=calculate_world_landmark_projection.js.map