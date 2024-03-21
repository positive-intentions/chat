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
import { Tensor3D } from '@tensorflow/tfjs-core';
export declare type PixelInput = Tensor3D | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap;
export interface InputResolution {
    width: number;
    height: number;
}
/**
 * A keypoint that contains coordinate information.
 */
export interface Keypoint {
    x: number;
    y: number;
    z?: number;
    score?: number;
    name?: string;
}
export interface ImageSize {
    height: number;
    width: number;
}
export interface Padding {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export declare type ValueTransform = {
    scale: number;
    offset: number;
};
export interface WindowElement {
    distance: number;
    duration: number;
}
export interface KeypointsFilter {
    apply(landmarks: Keypoint[], microSeconds: number, objectScale: number): Keypoint[];
    reset(): void;
}
export interface Mask {
    toCanvasImageSource(): Promise<CanvasImageSource>;
    toImageData(): Promise<ImageData>;
    toTensor(): Promise<Tensor3D>;
    getUnderlyingType(): 'canvasimagesource' | 'imagedata' | 'tensor';
}
export interface Segmentation {
    maskValueToLabel: (maskValue: number) => string;
    mask: Mask;
}
export declare type Color = {
    r: number;
    g: number;
    b: number;
    a: number;
};
