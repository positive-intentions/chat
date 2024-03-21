"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var relative_velocity_filter_1 = require("./relative_velocity_filter");
describe('Relative velocity filter ', function () {
    it('Smoke.', function () {
        var filter = new relative_velocity_filter_1.RelativeVelocityFilter({ windowSize: 1, velocityScale: 1 });
        var timestamp1 = 1;
        expect(filter.apply(95.5, timestamp1, 0.5)).toBe(95.5);
        expect(filter.apply(200.5, timestamp1, 0.5)).toBe(200.5);
        expect(filter.apply(1000.5, timestamp1, 0.5)).toBe(1000.5);
        expect(filter.apply(2000, timestamp1, 0.5)).toBe(2000);
    });
    it('Same value scale different velocity scales legacy.', function () {
        // More sensitive filter.
        var filter1 = new relative_velocity_filter_1.RelativeVelocityFilter({ windowSize: 5, velocityScale: 45 });
        // Less sensitive filter.
        var filter2 = new relative_velocity_filter_1.RelativeVelocityFilter({ windowSize: 5, velocityScale: 0.1 });
        var result1;
        var result2;
        var value;
        var valueScale = 1;
        value = 1;
        result1 = filter1.apply(value, 1000 /* 1ms */, valueScale);
        result2 = filter2.apply(value, 1000 /* 1ms */, valueScale);
        expect(result1).toEqual(result2);
        value = 10;
        result1 = filter1.apply(value, 2000 /* 2ms */, valueScale);
        result2 = filter2.apply(value, 2000 /* 2ms */, valueScale);
        expect(result1).toBeGreaterThan(result2);
        value = 2;
        result1 = filter1.apply(value, 3000 /* 3ms */, valueScale);
        result2 = filter2.apply(value, 3000 /* 3ms */, valueScale);
        expect(result1).toBeLessThan(result2);
        value = 20;
        result1 = filter1.apply(value, 4000 /* 4ms */, valueScale);
        result2 = filter2.apply(value, 4000 /* 4ms */, valueScale);
        expect(result1).toBeGreaterThan(result2);
        value = 10;
        result1 = filter1.apply(value, 5000 /* 5ms */, valueScale);
        result2 = filter2.apply(value, 5000 /* 5ms */, valueScale);
        expect(result1).toBeLessThan(result2);
        value = 50;
        result1 = filter1.apply(value, 6000 /* 6ms */, valueScale);
        result2 = filter2.apply(value, 6000 /* 6ms */, valueScale);
        expect(result1).toBeGreaterThan(result2);
        value = 30;
        result1 = filter1.apply(value, 7000 /* 7ms */, valueScale);
        result2 = filter2.apply(value, 7000 /* 7ms */, valueScale);
        expect(result1).toBeLessThan(result2);
    });
    it('Different constant value scales same velocity scale legacy.', function () {
        var sameVelocityScale = 1;
        var filter1 = new relative_velocity_filter_1.RelativeVelocityFilter({ windowSize: 3, velocityScale: sameVelocityScale });
        var filter2 = new relative_velocity_filter_1.RelativeVelocityFilter({ windowSize: 3, velocityScale: sameVelocityScale });
        var result1;
        var result2;
        var value;
        // smaller value scale will decrease cumulative speed and alpha so with
        // smaller scale and same other params filter will believe new values
        // a little bit less.
        var valueScale1 = 0.5;
        var valueScale2 = 1;
        value = 1;
        result1 = filter1.apply(value, 1000 /* 1ms */, valueScale1);
        result2 = filter2.apply(value, 1000 /* 1ms */, valueScale2);
        expect(result1).toEqual(result2);
        value = 10;
        result1 = filter1.apply(value, 2000 /* 2ms */, valueScale1);
        result2 = filter2.apply(value, 2000 /* 2ms */, valueScale2);
        expect(result1).toBeLessThan(result2);
        value = 2;
        result1 = filter1.apply(value, 3000 /* 3ms */, valueScale1);
        result2 = filter2.apply(value, 3000 /* 3ms */, valueScale2);
        expect(result1).toBeGreaterThan(result2);
        value = 20;
        result1 = filter1.apply(value, 4000 /* 4ms */, valueScale1);
        result2 = filter2.apply(value, 4000 /* 4ms */, valueScale2);
        expect(result1).toBeLessThan(result2);
    });
    it('Translation invariance.', function () {
        var originalDataPoints = [
            { value: 1, scale: 0.5 }, { value: 10, scale: 5 }, { value: 20, scale: 10 },
            { value: 30, scale: 15 }, { value: 40, scale: 0.5 }, { value: 50, scale: 0.5 },
            { value: 60, scale: 5 }, { value: 70, scale: 10 }, { value: 80, scale: 15 },
            { value: 90, scale: 5 }, { value: 70, scale: 10 }, { value: 50, scale: 15 },
            { value: 80, scale: 15 }
        ];
        // The amount by which the input values are uniformly translated.
        var valueOffset = 100;
        // The uniform time delta.
        var timeDelta = 1000; /* 1ms */
        // The filter parameters are the same between the two filters.
        var windowSize = 5;
        var velocityScale = 0.1;
        // Perform the translation.
        var translatedDataPoints = [];
        for (var _i = 0, originalDataPoints_1 = originalDataPoints; _i < originalDataPoints_1.length; _i++) {
            var dp = originalDataPoints_1[_i];
            translatedDataPoints.push({ value: dp.value + valueOffset, scale: dp.scale });
        }
        var originalPointsFilter = new relative_velocity_filter_1.RelativeVelocityFilter({ windowSize: windowSize, velocityScale: velocityScale });
        var translatedPointsFilter = new relative_velocity_filter_1.RelativeVelocityFilter({ windowSize: windowSize, velocityScale: velocityScale });
        // The minimal difference which is considered a divergence.
        var divergenceGap = 0.001;
        // The amount of the times this gap is achieved with legacy transition.
        // Note that on the first iteration the filters should output the unfiltered
        // input values, so no divergence should occur.
        // This amount obviously depends on the values in `originalDataPoints`, so
        // should be changed accordingly when they are updated.
        var divergenceTimes = 5;
        // The minimal difference which is considered a large divergence.
        var largeDivergenceGap = 10;
        // The amount of times it is achieved.
        // This amount obviously depends on the values in `originalDataPoints`, so
        // should be changed accordingly when they are updated.
        var largeDivergenceTimes = 1;
        var timesDiverged = 0;
        var timesLargelyDiverged = 0;
        var timestamp = 0;
        for (var iteration = 0; iteration < originalDataPoints.length; ++iteration, timestamp += timeDelta) {
            var originalDataPoint = originalDataPoints[iteration];
            var filteredOriginalValue = originalPointsFilter.apply(originalDataPoint.value, timestamp, originalDataPoint.scale);
            var translatedDataPoint = translatedDataPoints[iteration];
            var actualFilteredTranslatedValue = translatedPointsFilter.apply(translatedDataPoint.value, timestamp, translatedDataPoint.scale);
            var expectedFilteredTranslatedValue = filteredOriginalValue + valueOffset;
            var difference = Math.abs(actualFilteredTranslatedValue - expectedFilteredTranslatedValue);
            if (iteration === 0) {
                // On the first iteration, the unfiltered values are returned.
                expect(filteredOriginalValue).toEqual(originalDataPoint.value);
                expect(actualFilteredTranslatedValue)
                    .toEqual(translatedDataPoint.value);
                expect(difference).toEqual(0);
            }
            else {
                if (difference >= divergenceGap) {
                    ++timesDiverged;
                }
                if (difference >= largeDivergenceGap) {
                    ++timesLargelyDiverged;
                }
            }
        }
        expect(timesDiverged).toBeGreaterThanOrEqual(divergenceTimes);
        expect(timesLargelyDiverged).toBeGreaterThanOrEqual(largeDivergenceTimes);
    });
});
//# sourceMappingURL=relative_velocity_filter_test.js.map