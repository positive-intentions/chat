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
exports.removeLandmarkLetterbox = void 0;
/**
 * Adjusts landmark locations on a letterboxed image to the corresponding
 * locations on the same image with the letterbox removed.
 * @param rawLandmark A NormalizedLandmarkList representing landmarks on an
 * letterboxed image.
 * @param padding A `padding` representing the letterbox padding from the 4
 *     sides, left, top, right, bottom, of the letterboxed image, normalized by
 *     the letterboxed image dimensions.
 * @returns Normalized landmarks.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_letterbox_removal_calculator.cc
function removeLandmarkLetterbox(rawLandmark, padding) {
    var left = padding.left;
    var top = padding.top;
    var leftAndRight = padding.left + padding.right;
    var topAndBottom = padding.top + padding.bottom;
    var outLandmarks = rawLandmark.map(function (landmark) {
        return __assign(__assign({}, landmark), { x: (landmark.x - left) / (1 - leftAndRight), y: (landmark.y - top) / (1 - topAndBottom), z: landmark.z / (1 - leftAndRight) // Scale Z coordinate as X.
         });
    });
    return outLandmarks;
}
exports.removeLandmarkLetterbox = removeLandmarkLetterbox;
//# sourceMappingURL=remove_landmark_letterbox.js.map