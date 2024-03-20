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
exports.LowPassVisibilityFilter = void 0;
var low_pass_filter_1 = require("./low_pass_filter");
/**
 * Smoothing visibility using a `LowPassFilter` for each landmark.
 */
var LowPassVisibilityFilter = /** @class */ (function () {
    function LowPassVisibilityFilter(config) {
        this.alpha = config.alpha;
    }
    LowPassVisibilityFilter.prototype.apply = function (landmarks) {
        var _this = this;
        if (landmarks == null) {
            // Reset filters.
            this.visibilityFilters = null;
            return null;
        }
        if (this.visibilityFilters == null ||
            (this.visibilityFilters.length !== landmarks.length)) {
            // Initialize new filters.
            this.visibilityFilters =
                landmarks.map(function (_) { return new low_pass_filter_1.LowPassFilter(_this.alpha); });
        }
        var outLandmarks = [];
        // Filter visibilities.
        for (var i = 0; i < landmarks.length; ++i) {
            var landmark = landmarks[i];
            var outLandmark = __assign({}, landmark);
            outLandmark.score = this.visibilityFilters[i].apply(landmark.score);
            outLandmarks.push(outLandmark);
        }
        return outLandmarks;
    };
    return LowPassVisibilityFilter;
}());
exports.LowPassVisibilityFilter = LowPassVisibilityFilter;
//# sourceMappingURL=visibility_smoothing.js.map