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
import { Rect } from './interfaces/shape_interfaces';
/**
 * Generates a 4x4 projective transform matrix M, so that for any point in the
 * subRect image p(x, y), we can use the matrix to calculate the projected point
 * in the original image p' (x', y'): p' = p * M;
 *
 * @param subRect Rotated sub rect in absolute coordinates.
 * @param rectWidth
 * @param rectHeight
 * @param flipHorizontaly Whether to flip the image horizontally.
 */
export declare function getRotatedSubRectToRectTransformMatrix(subRect: Rect, rectWidth: number, rectHeight: number, flipHorizontally: boolean): Matrix4x4;
