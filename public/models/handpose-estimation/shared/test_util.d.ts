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
import { Keypoint } from './calculators/interfaces/common_interfaces';
/** Karma server directory serving local files. */
export declare const KARMA_SERVER = "./base/test_data";
export declare function loadImage(imagePath: string, width: number, height: number): Promise<HTMLImageElement>;
/**
 * Converts an RGBA image to a binary foreground mask based on an RGBA
 * threshold.
 *
 * @param image Input image to convert.
 *
 * @param r Minimum red value that denotes a foreground mask.
 * @param g Minimum green value that denotes a foreground mask.
 * @param b Minimum blue value that denotes a foreground mask.
 *
 * @return A boolean array of size number of pixels.
 */
export declare function imageToBooleanMask(rgbaData: Uint8ClampedArray, r: number, g: number, b: number): boolean[];
/**
 * Given two boolean masks, calculates the IOU percentage.
 *
 * @param image Input image to convert.
 *
 * @param expectedMask Expected mask values.
 * @param actualMask Actual mask values.
 *
 * @return A number denoting the IOU.
 */
export declare function segmentationIOU(expectedMask: boolean[], actualMask: boolean[]): number;
export declare function loadVideo(videoPath: string, videoFPS: number, callback: (video: HTMLVideoElement, timestamp: number) => Promise<Keypoint[]>, expected: number[][][], skeletonAdjacentPairs: number[][], simulatedInterval: number): Promise<HTMLVideoElement>;
export declare function getXYPerFrame(result: number[][][]): number[][][];
