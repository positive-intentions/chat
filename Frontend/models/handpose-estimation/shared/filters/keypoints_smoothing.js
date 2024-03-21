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
exports.KeypointsSmoothingFilter = void 0;
var get_object_scale_1 = require("../calculators/get_object_scale");
var keypoints_to_normalized_keypoints_1 = require("../calculators/keypoints_to_normalized_keypoints");
var normalized_keypoints_to_keypoints_1 = require("../calculators/normalized_keypoints_to_keypoints");
var keypoints_one_euro_filter_1 = require("./keypoints_one_euro_filter");
var keypoints_velocity_filter_1 = require("./keypoints_velocity_filter");
/**
 * A Calculator to smooth keypoints over time.
 */
var KeypointsSmoothingFilter = /** @class */ (function () {
    function KeypointsSmoothingFilter(config) {
        if (config.velocityFilter != null) {
            this.keypointsFilter = new keypoints_velocity_filter_1.KeypointsVelocityFilter(config.velocityFilter);
        }
        else if (config.oneEuroFilter != null) {
            this.keypointsFilter = new keypoints_one_euro_filter_1.KeypointsOneEuroFilter(config.oneEuroFilter);
        }
        else {
            throw new Error('Either configure velocityFilter or oneEuroFilter, but got ' +
                (config + "."));
        }
    }
    /**
     * Apply one of the stateful `KeypointsFilter` to keypoints.
     *
     * Currently supports `OneEuroFilter` and `VelocityFilter`.
     * @param keypoints A list of 2D or 3D keypoints, can be normalized or
     *     non-normalized.
     * @param timestamp The timestamp of the video frame.
     * @param imageSize Optional. The imageSize is useful when keypoints are
     *     normalized.
     * @param normalized Optional. Whether the keypoints are normalized. Default
     *     to false.
     * @param objectScaleROI Optional. The auxiliary ROI to calculate object
     *     scale. If not set, objectScale defaults to 1.
     */
    KeypointsSmoothingFilter.prototype.apply = function (keypoints, timestamp, imageSize, normalized, objectScaleROI) {
        if (normalized === void 0) { normalized = false; }
        if (keypoints == null) {
            this.keypointsFilter.reset();
            return null;
        }
        var objectScale = objectScaleROI != null ? (0, get_object_scale_1.getObjectScale)(objectScaleROI, imageSize) : 1;
        var scaledKeypoints = normalized ?
            (0, normalized_keypoints_to_keypoints_1.normalizedKeypointsToKeypoints)(keypoints, imageSize) :
            keypoints;
        var scaledKeypointsFiltered = this.keypointsFilter.apply(scaledKeypoints, timestamp, objectScale);
        return normalized ?
            (0, keypoints_to_normalized_keypoints_1.keypointsToNormalizedKeypoints)(scaledKeypointsFiltered, imageSize) :
            scaledKeypointsFiltered;
    };
    return KeypointsSmoothingFilter;
}());
exports.KeypointsSmoothingFilter = KeypointsSmoothingFilter;
//# sourceMappingURL=keypoints_smoothing.js.map