/// <reference types="@webgpu/types/dist" />
/// <reference types="offscreencanvas" />
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
/**
 * Converts input image to an HTMLCanvasElement. Note that converting
 * back from the output of this function to imageData or a Tensor will be lossy
 * due to premultiplied alpha color values. For more details please reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
 * @param image Input image.
 *
 * @returns Converted HTMLCanvasElement.
 */
export declare function toHTMLCanvasElementLossy(image: ImageData | tf.Tensor2D | tf.Tensor3D | SVGImageElement | OffscreenCanvas): Promise<HTMLCanvasElement>;
/**
 * Converts input image to ImageData. Note that converting
 * from a CanvasImageSource will be lossy due to premultiplied alpha color
 * values. For more details please reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
 * @param image Input image.
 *
 * @returns Converted ImageData.
 */
export declare function toImageDataLossy(image: CanvasImageSource | tf.Tensor3D): Promise<ImageData>;
/**
 * Converts input image to Tensor. Note that converting
 * from a CanvasImageSource will be lossy due to premultiplied alpha color
 * values. For more details please reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData#data_loss_due_to_browser_optimization
 * @param image Input image.
 *
 * @returns Converted Tensor.
 */
export declare function toTensorLossy(image: CanvasImageSource | ImageData): Promise<tf.Tensor3D>;
export declare function assertMaskValue(maskValue: number): void;
