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
import { Keypoint } from './interfaces/common_interfaces';
import { LandmarksRefinementConfig } from './interfaces/config_interfaces';
/**
 * Refine one set of landmarks with another.
 *
 * @param allLandmarks List of landmarks to use for refinement. They will be
 *     applied to the output in the provided order. Each list should be non
 *     empty and contain the same amount of landmarks as indexes in mapping.
 * @param refinements Refinement instructions for input landmarks.
 *
 * @returns A list of refined landmarks.
 */
export declare function landmarksRefinement(allLandmarks: Keypoint[][], refinements: LandmarksRefinementConfig[]): Keypoint[];
