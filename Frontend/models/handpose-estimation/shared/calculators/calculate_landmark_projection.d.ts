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
import { Rect } from './interfaces/shape_interfaces';
/**
 * Projects normalized landmarks in a rectangle to its original coordinates. The
 * rectangle must also be in normalized coordinates.
 * @param landmarks A normalized Landmark list representing landmarks in a
 *     normalized rectangle.
 * @param inputRect A normalized rectangle.
 * @param config Config object has one field ignoreRotation, default to false.
 */
export declare function calculateLandmarkProjection(landmarks: Keypoint[], inputRect: Rect, config?: {
    ignoreRotation: boolean;
}): Keypoint[];
