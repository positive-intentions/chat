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
exports.calculateScoreCopy = void 0;
/**
 * A calculator to copy score between landmarks.
 *
 * Landmarks to copy from and to copy to can be of different type (normalized or
 * non-normalized), but landmarks to copy to and output landmarks should be of
 * the same type.
 * @param landmarksFrom  A list of landmarks.
 *     to copy from.
 * @param landmarksTo  A list of landmarks.
 *     to copy to.
 * @param copyScore Copy the score from the `landmarksFrom` parameter.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/visibility_copy_calculator.cc
function calculateScoreCopy(landmarksFrom, landmarksTo, copyScore) {
    if (copyScore === void 0) { copyScore = true; }
    var outputLandmarks = [];
    for (var i = 0; i < landmarksFrom.length; i++) {
        // Create output landmark and copy all fields from the `to` landmarks
        var newLandmark = __assign({}, landmarksTo[i]);
        // Copy score from the `from` landmark.
        if (copyScore) {
            newLandmark.score = landmarksFrom[i].score;
        }
        outputLandmarks.push(newLandmark);
    }
    return outputLandmarks;
}
exports.calculateScoreCopy = calculateScoreCopy;
//# sourceMappingURL=calculate_score_copy.js.map