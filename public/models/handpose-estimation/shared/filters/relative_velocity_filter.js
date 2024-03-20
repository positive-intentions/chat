"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelativeVelocityFilter = void 0;
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
var constants_1 = require("../calculators/constants");
var low_pass_filter_1 = require("./low_pass_filter");
/**
 * This filter keeps track (on a window of specified size) of value changes
 * over time, which as result gives us velocity of how value changes over time.
 * With higher velocity it weights new values higher.
 *
 * Use `windowSize` and `velocityScale` to tweak this filter for your use case.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/util/filtering/relative_velocity_filter.cc
var RelativeVelocityFilter = /** @class */ (function () {
    /**
     * Constructor of `RelativeVelocityFilter` class.
     * @param config
     *        `windowSize`:  Higher windowSize adds to lag and to stability.
     *        `velocityScale`: Lower velocityScale adds to lag and to stability.
     */
    function RelativeVelocityFilter(config) {
        this.config = config;
        this.window = [];
        this.lowPassFilter = new low_pass_filter_1.LowPassFilter(1.0);
        this.lastValue = 0;
        this.lastValueScale = 1;
        this.lastTimestamp = -1;
    }
    /**
     * Applies filter to the value.
     * @param value valueToFilter.
     * @param microSeconds timestamp associated with the value (for instance,
     *     timestamp of the frame where you got value from).
     * @param valueScale value scale (for instance, if your value is a distance
     *     detected on a frame, it can look same on different devices but have
     *     quite different absolute values due to different resolution, you
     *     should come up with an appropriate parameter for your particular use
     *     case).
     */
    RelativeVelocityFilter.prototype.apply = function (value, microSeconds, valueScale) {
        if (value == null) {
            return value;
        }
        var $microSeconds = Math.trunc(microSeconds);
        if (this.lastTimestamp >= $microSeconds) {
            // Results are unpreditable in this case, so nothing to do but return
            // same value.
            return value;
        }
        var alpha;
        if (this.lastTimestamp === -1) {
            alpha = 1;
        }
        else {
            // Implement the DistanceEstimationMode.kLegacyTransition.
            // TODO(lina128): Change to kForceCurrentScale or at least add an option
            // that can be tweaked with parameter.
            var distance = value * valueScale - this.lastValue * this.lastValueScale;
            var duration = $microSeconds - this.lastTimestamp;
            var cumulativeDistance = distance;
            var cumulativeDuration = duration;
            // Define max cumulative duration assuming 30 frames per second is a good
            // frame rate, so assuming 30 values per second or 1 / 30 of a second is
            // a good duration per window element.
            var assumedMaxDuration = constants_1.SECOND_TO_MICRO_SECONDS / 30;
            var maxCumulativeDuration = (1 + this.window.length) * assumedMaxDuration;
            for (var _i = 0, _a = this.window; _i < _a.length; _i++) {
                var el = _a[_i];
                if (cumulativeDuration + el.duration > maxCumulativeDuration) {
                    // This helps in cases when durations are large and outdated
                    // window elements have bad impact on filtering results.
                    break;
                }
                cumulativeDistance += el.distance;
                cumulativeDuration += el.duration;
            }
            var velocity = cumulativeDistance / (cumulativeDuration * constants_1.MICRO_SECONDS_TO_SECOND);
            alpha = 1 - 1 / (1 + this.config.velocityScale * Math.abs(velocity));
            this.window.unshift({ distance: distance, duration: duration });
            if (this.window.length > this.config.windowSize) {
                this.window.pop();
            }
        }
        this.lastValue = value;
        this.lastValueScale = valueScale;
        this.lastTimestamp = $microSeconds;
        return this.lowPassFilter.applyWithAlpha(value, alpha);
    };
    return RelativeVelocityFilter;
}());
exports.RelativeVelocityFilter = RelativeVelocityFilter;
//# sourceMappingURL=relative_velocity_filter.js.map