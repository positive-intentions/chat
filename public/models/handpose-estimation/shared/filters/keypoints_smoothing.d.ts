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
import { ImageSize, Keypoint } from '../calculators/interfaces/common_interfaces';
import { KeypointsSmoothingConfig } from '../calculators/interfaces/config_interfaces';
import { Rect } from '../calculators/interfaces/shape_interfaces';
/**
 * A Calculator to smooth keypoints over time.
 */
export declare class KeypointsSmoothingFilter {
    private readonly keypointsFilter;
    constructor(config: KeypointsSmoothingConfig);
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
    apply(keypoints: Keypoint[], timestamp: number, imageSize?: ImageSize, normalized?: boolean, objectScaleROI?: Rect): Keypoint[];
}
