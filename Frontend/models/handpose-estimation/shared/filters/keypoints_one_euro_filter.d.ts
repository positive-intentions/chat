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
import { Keypoint, KeypointsFilter } from '../calculators/interfaces/common_interfaces';
import { OneEuroFilterConfig } from '../calculators/interfaces/config_interfaces';
/**
 * A stateful filter that smoothes keypoints values overtime.
 *
 * More specifically, it uses `OneEuroFilter` to smooth every x, y, z
 * coordinates over time, which as result gives us velocity of how these values
 * change over time. With higher velocity it weights new values higher.
 */
export declare class KeypointsOneEuroFilter implements KeypointsFilter {
    private readonly config;
    private xFilters;
    private yFilters;
    private zFilters;
    constructor(config: OneEuroFilterConfig);
    apply(keypoints: Keypoint[], microSeconds: number, objectScale: number): Keypoint[];
    reset(): void;
    private initializeFiltersIfEmpty;
}
