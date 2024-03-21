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
import { AnchorConfig, ImageToTensorConfig, RectTransformationConfig, TensorsToDetectionsConfig, TensorsToLandmarksConfig } from '../shared/calculators/interfaces/config_interfaces';
import { MediaPipeHandsTfjsEstimationConfig, MediaPipeHandsTfjsModelConfig } from './types';
export declare const DEFAULT_MPHANDS_DETECTOR_MODEL_URL_LITE = "https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/lite/1";
export declare const DEFAULT_MPHANDS_DETECTOR_MODEL_URL_FULL = "https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/full/1";
export declare const DEFAULT_MPHANDS_LANDMARK_MODEL_URL_LITE = "https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/lite/1";
export declare const DEFAULT_MPHANDS_LANDMARK_MODEL_URL_FULL = "https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/full/1";
export declare const MPHANDS_DETECTOR_ANCHOR_CONFIGURATION: AnchorConfig;
export declare const DEFAULT_MPHANDS_MODEL_CONFIG: MediaPipeHandsTfjsModelConfig;
export declare const DEFAULT_MPHANDS_ESTIMATION_CONFIG: MediaPipeHandsTfjsEstimationConfig;
export declare const MPHANDS_TENSORS_TO_DETECTION_CONFIGURATION: TensorsToDetectionsConfig;
export declare const MPHANDS_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION: {
    minSuppressionThreshold: number;
    overlapType: "intersection-over-union";
};
export declare const MPHANDS_DETECTOR_RECT_TRANSFORMATION_CONFIG: RectTransformationConfig;
export declare const MPHANDS_LANDMARK_RECT_TRANSFORMATION_CONFIG: RectTransformationConfig;
export declare const MPHANDS_DETECTOR_IMAGE_TO_TENSOR_CONFIG: ImageToTensorConfig;
export declare const MPHANDS_LANDMARK_IMAGE_TO_TENSOR_CONFIG: ImageToTensorConfig;
export declare const MPHANDS_HAND_PRESENCE_SCORE = 0.5;
export declare const MPHANDS_MIN_SIMILARITY_THRESHOLD = 0.5;
export declare const MPHANDS_TENSORS_TO_LANDMARKS_CONFIG: TensorsToLandmarksConfig;
export declare const MPHANDS_TENSORS_TO_WORLD_LANDMARKS_CONFIG: TensorsToLandmarksConfig;
