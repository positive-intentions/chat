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
import { Keypoint } from './interfaces/common_interfaces';
import { RefineLandmarksFromHeatmapConfig } from './interfaces/config_interfaces';
/**
 * A calculator that refines landmarks using corresponding heatmap area.
 *
 * High level algorithm
 * For each landmark, we replace original value with a value calculated from the
 * area in heatmap close to original landmark position (the area is defined by
 * config.kernelSize). To calculate new coordinate from heatmap we calculate an
 * weighted average inside the kernel. We update the landmark if heatmap is
 * confident in it's prediction i.e. max(heatmap) in kernel is at least bigger
 * than config.minConfidenceToRefine.
 * @param landmarks List of lardmarks to refine.
 * @param heatmapTensor The heatmap for the landmarks with shape
 *     [height, width, channel]. The channel dimension has to be the same as
 *     the number of landmarks.
 * @param config The config for refineLandmarksFromHeap,
 *     see `RefineLandmarksFromHeatmapConfig` for detail.
 *
 * @returns Normalized landmarks.
 */
export declare function refineLandmarksFromHeatmap(landmarks: Keypoint[], heatmapTensor: tf.Tensor4D, config: RefineLandmarksFromHeatmapConfig): Promise<Keypoint[]>;
