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
import * as tf from '@tensorflow/tfjs-core';
import { Matrix4x4 } from './calculate_inverse_matrix';
import { ImageSize, InputResolution, Padding, PixelInput, ValueTransform } from './interfaces/common_interfaces';
import { Rect } from './interfaces/shape_interfaces';
export declare function getImageSize(input: PixelInput): ImageSize;
/**
 * Normalizes the provided angle to the range -pi to pi.
 * @param angle The angle in radians to be normalized.
 */
export declare function normalizeRadians(angle: number): number;
/**
 * Transform value ranges.
 * @param fromMin Min of original value range.
 * @param fromMax Max of original value range.
 * @param toMin New min of transformed value range.
 * @param toMax New max of transformed value range.
 */
export declare function transformValueRange(fromMin: number, fromMax: number, toMin: number, toMax: number): ValueTransform;
/**
 * Convert an image to an image tensor representation.
 *
 * The image tensor has a shape [1, height, width, colorChannel].
 *
 * @param input An image, video frame, or image tensor.
 */
export declare function toImageTensor(input: PixelInput): tf.Tensor3D;
/**
 * Padding ratio of left, top, right, bottom, based on the output dimensions.
 *
 * The padding values are non-zero only when the "keep_aspect_ratio" is true.
 *
 * For instance, when the input image is 10x10 (width x height) and the
 * output dimensions is 20x40 and "keep_aspect_ratio" is true, we should scale
 * the input image to 20x20 and places it in the middle of the output image with
 * an equal padding of 10 pixels at the top and the bottom. The result is
 * therefore {left: 0, top: 0.25, right: 0, bottom: 0.25} (10/40 = 0.25f).
 * @param roi The original rectangle to pad.
 * @param targetSize The target width and height of the result rectangle.
 * @param keepAspectRatio Whether keep aspect ratio. Default to false.
 */
export declare function padRoi(roi: Rect, targetSize: InputResolution, keepAspectRatio?: boolean): Padding;
/**
 * Get the rectangle information of an image, including xCenter, yCenter, width,
 * height and rotation.
 *
 * @param imageSize imageSize is used to calculate the rectangle.
 * @param normRect Optional. If normRect is not null, it will be used to get
 *     a subarea rectangle information in the image. `imageSize` is used to
 *     calculate the actual non-normalized coordinates.
 */
export declare function getRoi(imageSize: ImageSize, normRect?: Rect): Rect;
/**
 * Generate the projective transformation matrix to be used for `tf.transform`.
 *
 * See more documentation in `tf.transform`.
 *
 * @param matrix The transformation matrix mapping subRect to rect, can be
 *     computed using `getRotatedSubRectToRectTransformMatrix` calculator.
 * @param imageSize The original image height and width.
 * @param inputResolution The target height and width.
 */
export declare function getProjectiveTransformMatrix(matrix: Matrix4x4, imageSize: ImageSize, inputResolution: InputResolution): [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
