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
import { Matrix4x4 } from './calculate_inverse_matrix';
import { Detection } from './interfaces/shape_interfaces';
/**
 * Projects detections to a different coordinate system using a provided
 * projection matrix.
 *
 * @param detections A list of detections to project using the provided
 *     projection matrix.
 * @param projectionMatrix Maps data from one coordinate system to     another.
 * @returns detections: A list of projected detections
 */
export declare function detectionProjection(detections: Detection[], projectionMatrix: Matrix4x4): Detection[];
