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
import { InputResolution } from './common_interfaces';
export interface ImageToTensorConfig {
    outputTensorSize: InputResolution;
    keepAspectRatio?: boolean;
    outputTensorFloatRange?: [number, number];
    borderMode: 'zero' | 'replicate';
}
export interface VelocityFilterConfig {
    windowSize?: number;
    velocityScale?: number;
    minAllowedObjectScale?: number;
    disableValueScaling?: boolean;
}
export interface OneEuroFilterConfig {
    frequency?: number;
    minCutOff?: number;
    beta?: number;
    derivateCutOff?: number;
    thresholdCutOff?: number;
    thresholdBeta?: number;
    minAllowedObjectScale?: number;
    disableValueScaling?: boolean;
}
export interface KeypointsSmoothingConfig {
    velocityFilter?: VelocityFilterConfig;
    oneEuroFilter?: OneEuroFilterConfig;
}
export interface AnchorConfig {
    numLayers: number;
    minScale: number;
    maxScale: number;
    inputSizeHeight: number;
    inputSizeWidth: number;
    anchorOffsetX: number;
    anchorOffsetY: number;
    featureMapWidth: number[];
    featureMapHeight: number[];
    strides: number[];
    aspectRatios: number[];
    fixedAnchorSize?: boolean;
    reduceBoxesInLowestLayer?: boolean;
    interpolatedScaleAspectRatio?: number;
}
export interface TensorsToDetectionsConfig {
    numClasses: number;
    numBoxes: number;
    numCoords: number;
    keypointCoordOffset?: number;
    numKeypoints?: number;
    numValuesPerKeypoint?: number;
    boxCoordOffset?: number;
    xScale?: number;
    yScale?: number;
    wScale?: number;
    hScale?: number;
    applyExponentialOnBoxSize?: boolean;
    reverseOutputOrder?: boolean;
    ignoreClasses?: number[];
    sigmoidScore?: boolean;
    scoreClippingThresh?: number;
    flipVertically?: boolean;
    minScoreThresh?: number;
}
export interface DetectionToRectConfig {
    rotationVectorStartKeypointIndex: number;
    rotationVectorEndKeypointIndex: number;
    rotationVectorTargetAngleDegree?: number;
    rotationVectorTargetAngle?: number;
}
export interface RectTransformationConfig {
    scaleX?: number;
    scaleY?: number;
    rotation?: number;
    rotationDegree?: number;
    shiftX?: number;
    shiftY?: number;
    squareLong?: boolean;
    squareShort?: boolean;
}
export interface TensorsToLandmarksConfig {
    numLandmarks: number;
    inputImageWidth: number;
    inputImageHeight: number;
    visibilityActivation: 'none' | 'sigmoid';
    flipHorizontally?: boolean;
    flipVertically?: boolean;
    normalizeZ?: number;
}
export interface TensorsToSegmentationConfig {
    activation: 'none' | 'sigmoid' | 'softmax';
}
export interface SegmentationSmoothingConfig {
    combineWithPreviousRatio: number;
}
export interface RefineLandmarksFromHeatmapConfig {
    kernelSize?: number;
    minConfidenceToRefine: number;
}
export interface VisibilitySmoothingConfig {
    alpha: number;
}
declare type AssignAverage = number[];
export interface LandmarksRefinementConfig {
    indexesMapping: number[];
    zRefinement: 'none' | 'copy' | AssignAverage;
}
export {};
