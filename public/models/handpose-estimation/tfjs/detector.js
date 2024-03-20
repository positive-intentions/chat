"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
var tfconv = require("@tensorflow/tfjs-converter");
var tf = require("@tensorflow/tfjs-core");
var constants_1 = require("../constants");
var association_norm_rect_1 = require("../shared/calculators/association_norm_rect");
var calculate_landmark_projection_1 = require("../shared/calculators/calculate_landmark_projection");
var calculate_world_landmark_projection_1 = require("../shared/calculators/calculate_world_landmark_projection");
var convert_image_to_tensor_1 = require("../shared/calculators/convert_image_to_tensor");
var create_ssd_anchors_1 = require("../shared/calculators/create_ssd_anchors");
var detection_to_rect_1 = require("../shared/calculators/detection_to_rect");
var detector_result_1 = require("../shared/calculators/detector_result");
var image_utils_1 = require("../shared/calculators/image_utils");
var non_max_suppression_1 = require("../shared/calculators/non_max_suppression");
var normalized_keypoints_to_keypoints_1 = require("../shared/calculators/normalized_keypoints_to_keypoints");
var remove_detection_letterbox_1 = require("../shared/calculators/remove_detection_letterbox");
var remove_landmark_letterbox_1 = require("../shared/calculators/remove_landmark_letterbox");
var tensors_to_detections_1 = require("../shared/calculators/tensors_to_detections");
var tensors_to_landmarks_1 = require("../shared/calculators/tensors_to_landmarks");
var transform_rect_1 = require("../shared/calculators/transform_rect");
var hand_landmarks_to_rect_1 = require("./calculators/hand_landmarks_to_rect");
var constants = require("./constants");
var detector_utils_1 = require("./detector_utils");
/**
 * MediaPipeHands detector class.
 */
var MediaPipeHandsTfjsDetector = /** @class */ (function () {
    function MediaPipeHandsTfjsDetector(detectorModel, landmarkModel, maxHands) {
        this.detectorModel = detectorModel;
        this.landmarkModel = landmarkModel;
        this.maxHands = maxHands;
        // Store global states.
        this.prevHandRectsFromLandmarks = null;
        this.anchors =
            (0, create_ssd_anchors_1.createSsdAnchors)(constants.MPHANDS_DETECTOR_ANCHOR_CONFIGURATION);
        var anchorW = tf.tensor1d(this.anchors.map(function (a) { return a.width; }));
        var anchorH = tf.tensor1d(this.anchors.map(function (a) { return a.height; }));
        var anchorX = tf.tensor1d(this.anchors.map(function (a) { return a.xCenter; }));
        var anchorY = tf.tensor1d(this.anchors.map(function (a) { return a.yCenter; }));
        this.anchorTensor = { x: anchorX, y: anchorY, w: anchorW, h: anchorH };
    }
    /**
     * Estimates hands for an image or video frame.
     *
     * It returns a single hand or multiple hands based on the maxHands
     * parameter from the `config`.
     *
     * @param image
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param estimationConfig Optional. See `MediaPipeHandsTfjsEstimationConfig`
     *       documentation for detail.
     *
     * @return An array of `Hand`s.
     */
    // TF.js implementation of the mediapipe hand detection pipeline.
    // ref graph:
    // https://github.com/google/mediapipe/blob/master/mediapipe/mediapipe/modules/hand_landmark/hand_landmark_tracking_cpu.pbtxt
    MediaPipeHandsTfjsDetector.prototype.estimateHands = function (image, estimationConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, imageSize, image3d, prevHandRectsFromLandmarks, handRects, allPalmDetections, palmDetections, handRectsFromPalmDetections, handResults, hands, _i, handResults_1, handResult, landmarks, worldLandmarks, score, handedness, keypoints, keypoints3D;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = (0, detector_utils_1.validateEstimationConfig)(estimationConfig);
                        if (image == null) {
                            this.reset();
                            return [2 /*return*/, []];
                        }
                        imageSize = (0, image_utils_1.getImageSize)(image);
                        image3d = tf.tidy(function () {
                            var imageTensor = tf.cast((0, image_utils_1.toImageTensor)(image), 'float32');
                            if (config.flipHorizontal) {
                                var batchAxis = 0;
                                imageTensor = tf.squeeze(tf.image.flipLeftRight(
                                // tslint:disable-next-line: no-unnecessary-type-assertion
                                tf.expandDims(imageTensor, batchAxis)), [batchAxis]);
                            }
                            return imageTensor;
                        });
                        prevHandRectsFromLandmarks = this.prevHandRectsFromLandmarks;
                        if (!(config.staticImageMode || prevHandRectsFromLandmarks == null ||
                            prevHandRectsFromLandmarks.length < this.maxHands)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.detectPalm(image3d)];
                    case 1:
                        allPalmDetections = _a.sent();
                        if (allPalmDetections.length === 0) {
                            this.reset();
                            image3d.dispose();
                            return [2 /*return*/, []];
                        }
                        palmDetections = allPalmDetections;
                        handRectsFromPalmDetections = palmDetections.map(function (detection) { return _this.palmDetectionToRoi(detection, imageSize); });
                        handRects = handRectsFromPalmDetections;
                        return [3 /*break*/, 3];
                    case 2:
                        handRects = prevHandRectsFromLandmarks;
                        _a.label = 3;
                    case 3:
                        // HandLandmarkTrackingCpu: AssociationNormRectCalculator
                        // This calculator ensures that the output handRects array
                        // doesn't contain overlapping regions based on the specified
                        // minSimilarityThreshold. Note that our implementation does not perform
                        // association between rects from previous image and rects based
                        // on palm detections from the current image due to not having tracking
                        // IDs in our API, so we don't call it with two inputs like MediaPipe
                        // (previous and new rects). The call is nonetheless still necessary
                        // since rects from previous image could overlap.
                        handRects = (0, association_norm_rect_1.calculateAssociationNormRect)([handRects], constants.MPHANDS_MIN_SIMILARITY_THRESHOLD);
                        return [4 /*yield*/, Promise.all(handRects.map(function (handRect) { return _this.handLandmarks(handRect, image3d); }))];
                    case 4:
                        handResults = _a.sent();
                        hands = [];
                        this.prevHandRectsFromLandmarks = [];
                        for (_i = 0, handResults_1 = handResults; _i < handResults_1.length; _i++) {
                            handResult = handResults_1[_i];
                            if (handResult == null) {
                                continue;
                            }
                            landmarks = handResult.landmarks, worldLandmarks = handResult.worldLandmarks, score = handResult.handScore, handedness = handResult.handedness;
                            // HandLandmarkTrackingCpu: HandLandmarkLandmarksToRoi
                            // Calculate region of interest (ROI) based on detected hand landmarks to
                            // reuse on the subsequent runs of the graph.
                            this.prevHandRectsFromLandmarks.push(this.handLandmarksToRoi(landmarks, imageSize));
                            keypoints = (0, normalized_keypoints_to_keypoints_1.normalizedKeypointsToKeypoints)(landmarks, imageSize);
                            // Add keypoint name.
                            if (keypoints != null) {
                                keypoints.forEach(function (keypoint, i) {
                                    delete keypoint.z;
                                    keypoint.name = constants_1.MEDIAPIPE_KEYPOINTS[i];
                                });
                            }
                            keypoints3D = worldLandmarks;
                            // Add keypoint name.
                            if (keypoints3D != null) {
                                keypoints3D.forEach(function (keypoint3D, i) {
                                    keypoint3D.name = constants_1.MEDIAPIPE_KEYPOINTS[i];
                                });
                            }
                            hands.push({ keypoints: keypoints, keypoints3D: keypoints3D, handedness: handedness, score: score });
                        }
                        image3d.dispose();
                        return [2 /*return*/, hands];
                }
            });
        });
    };
    MediaPipeHandsTfjsDetector.prototype.dispose = function () {
        this.detectorModel.dispose();
        this.landmarkModel.dispose();
        tf.dispose([
            this.anchorTensor.x, this.anchorTensor.y, this.anchorTensor.w,
            this.anchorTensor.h
        ]);
    };
    MediaPipeHandsTfjsDetector.prototype.reset = function () {
        this.prevHandRectsFromLandmarks = null;
    };
    // Detects palms.
    // Subgraph: PalmDetectionCpu.
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/palm_detection/palm_detection_cpu.pbtxt
    MediaPipeHandsTfjsDetector.prototype.detectPalm = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, imageValueShifted, padding, detectionResult, _b, boxes, logits, detections, selectedDetections, newDetections;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = (0, convert_image_to_tensor_1.convertImageToTensor)(image, constants.MPHANDS_DETECTOR_IMAGE_TO_TENSOR_CONFIG), imageValueShifted = _a.imageTensor, padding = _a.padding;
                        detectionResult = this.detectorModel.predict(imageValueShifted);
                        _b = (0, detector_result_1.detectorResult)(detectionResult), boxes = _b.boxes, logits = _b.logits;
                        return [4 /*yield*/, (0, tensors_to_detections_1.tensorsToDetections)([logits, boxes], this.anchorTensor, constants.MPHANDS_TENSORS_TO_DETECTION_CONFIGURATION)];
                    case 1:
                        detections = _c.sent();
                        if (detections.length === 0) {
                            tf.dispose([imageValueShifted, detectionResult, logits, boxes]);
                            return [2 /*return*/, detections];
                        }
                        return [4 /*yield*/, (0, non_max_suppression_1.nonMaxSuppression)(detections, this.maxHands, constants.MPHANDS_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION
                                .minSuppressionThreshold, constants.MPHANDS_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION
                                .overlapType)];
                    case 2:
                        selectedDetections = _c.sent();
                        newDetections = (0, remove_detection_letterbox_1.removeDetectionLetterbox)(selectedDetections, padding);
                        tf.dispose([imageValueShifted, detectionResult, logits, boxes]);
                        return [2 /*return*/, newDetections];
                }
            });
        });
    };
    // calculates hand ROI from palm detection.
    // Subgraph: PalmDetectionDetectionToRoi.
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/hand_landmark/palm_detection_detection_to_roi.pbtxt
    MediaPipeHandsTfjsDetector.prototype.palmDetectionToRoi = function (detection, imageSize) {
        // Converts results of palm detection into a rectangle (normalized by image
        // size) that encloses the palm and is rotated such that the line connecting
        // center of the wrist and MCP of the middle finger is aligned with the
        // Y-axis of the rectangle.
        // PalmDetectionDetectionToRoi: DetectionsToRectsCalculator.
        var rawRoi = (0, detection_to_rect_1.calculateDetectionsToRects)(detection, 'boundingbox', 'normRect', imageSize, {
            rotationVectorStartKeypointIndex: 0,
            rotationVectorEndKeypointIndex: 2,
            rotationVectorTargetAngleDegree: 90
        });
        // Expands and shifts the rectangle that contains the palm so that it's
        // likely to cover the entire hand.
        // PalmDetectionDetectionToRoi: RectTransformationCalculation.
        var roi = (0, transform_rect_1.transformNormalizedRect)(rawRoi, imageSize, constants.MPHANDS_DETECTOR_RECT_TRANSFORMATION_CONFIG);
        return roi;
    };
    // Predict hand landmarks.
    // subgraph: HandLandmarkCpu
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/hand_landmark/hand_landmark_cpu.pbtxt
    MediaPipeHandsTfjsDetector.prototype.handLandmarks = function (handRect, image) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, imageValueShifted, padding, landmarkResult, landmarkTensor, handFlagTensor, handednessTensor, worldLandmarkTensor, handScore, handednessScore, handedness, landmarks, worldLandmarks, adjustedLandmarks, landmarksProjected, worldLandmarksProjected;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (0, convert_image_to_tensor_1.convertImageToTensor)(image, constants.MPHANDS_LANDMARK_IMAGE_TO_TENSOR_CONFIG, handRect), imageValueShifted = _a.imageTensor, padding = _a.padding;
                        landmarkResult = this.landmarkModel.execute(imageValueShifted, [
                            'Identity_2:0', 'Identity_1:0', 'Identity:0', 'Identity_3:0'
                        ]);
                        landmarkTensor = landmarkResult[0], handFlagTensor = landmarkResult[1], handednessTensor = landmarkResult[2], worldLandmarkTensor = landmarkResult[3];
                        return [4 /*yield*/, handFlagTensor.data()];
                    case 1:
                        handScore = (_b.sent())[0];
                        // Applies a threshold to the confidence score to determine whether a hand
                        // is present.
                        if (handScore < constants.MPHANDS_HAND_PRESENCE_SCORE) {
                            tf.dispose(landmarkResult);
                            tf.dispose(imageValueShifted);
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, handednessTensor.data()];
                    case 2:
                        handednessScore = (_b.sent())[0];
                        handedness = handednessScore >= 0.5 ? 'Left' : 'Right';
                        return [4 /*yield*/, (0, tensors_to_landmarks_1.tensorsToLandmarks)(landmarkTensor, constants.MPHANDS_TENSORS_TO_LANDMARKS_CONFIG)];
                    case 3:
                        landmarks = _b.sent();
                        return [4 /*yield*/, (0, tensors_to_landmarks_1.tensorsToLandmarks)(worldLandmarkTensor, constants.MPHANDS_TENSORS_TO_WORLD_LANDMARKS_CONFIG)];
                    case 4:
                        worldLandmarks = _b.sent();
                        adjustedLandmarks = (0, remove_landmark_letterbox_1.removeLandmarkLetterbox)(landmarks, padding);
                        landmarksProjected = (0, calculate_landmark_projection_1.calculateLandmarkProjection)(adjustedLandmarks, handRect);
                        worldLandmarksProjected = (0, calculate_world_landmark_projection_1.calculateWorldLandmarkProjection)(worldLandmarks, handRect);
                        tf.dispose(landmarkResult);
                        tf.dispose(imageValueShifted);
                        return [2 /*return*/, {
                                landmarks: landmarksProjected,
                                worldLandmarks: worldLandmarksProjected,
                                handScore: handScore,
                                handedness: handedness
                            }];
                }
            });
        });
    };
    // Calculate hand region of interest (ROI) from landmarks.
    // Subgraph: HandLandmarkLandmarksToRoi
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/modules/hand_landmark/hand_landmark_landmarks_to_roi.pbtxt
    // When landmarks is not null, imageSize should not be null either.
    MediaPipeHandsTfjsDetector.prototype.handLandmarksToRoi = function (landmarks, imageSize) {
        // Extracts a subset of the hand landmarks that are relatively more stable
        // across frames (e.g. comparing to finger tips) for computing the bounding
        // box. The box will later be expanded to contain the entire hand. In this
        // approach, it is more robust to drastically changing hand size. The
        // landmarks extracted are: wrist, MCP/PIP of five fingers.
        // HandLandmarkLandmarksToRoi: SplitNormalizedLandmarkListCalculator.
        var partialLandmarks = [].concat(landmarks.slice(0, 4), landmarks.slice(5, 7), landmarks.slice(9, 11), landmarks.slice(13, 15), landmarks.slice(17, 19));
        // Converts the hand landmarks into a rectangle (normalized by image size)
        // that encloses the hand. The calculator uses a subset of all hand
        // landmarks extracted from the concat + slice above to
        // calculate the bounding box and the rotation of the output rectangle.
        // HandLandmarkLandmarksToRoi: HandLandmarksToRectCalculator.
        var rawRoi = (0, hand_landmarks_to_rect_1.handLandmarksToRect)(partialLandmarks, imageSize);
        // Expands pose rect with marging used during training.
        // PoseLandmarksToRoi: RectTransformationCalculator.
        var roi = (0, transform_rect_1.transformNormalizedRect)(rawRoi, imageSize, constants.MPHANDS_LANDMARK_RECT_TRANSFORMATION_CONFIG);
        return roi;
    };
    return MediaPipeHandsTfjsDetector;
}());
/**
 * Loads the MediaPipeHands model.
 *
 * @param modelConfig ModelConfig object that contains parameters for
 * the MediaPipeHands loading process. Please find more details of each
 * parameters in the documentation of the `MediaPipeHandsTfjsModelConfig`
 * interface.
 */
function load(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, detectorFromTFHub, landmarkFromTFHub, _a, detectorModel, landmarkModel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = (0, detector_utils_1.validateModelConfig)(modelConfig);
                    detectorFromTFHub = (config.detectorModelUrl.indexOf('https://tfhub.dev') > -1);
                    landmarkFromTFHub = (config.landmarkModelUrl.indexOf('https://tfhub.dev') > -1);
                    return [4 /*yield*/, Promise.all([
                            tfconv.loadGraphModel(config.detectorModelUrl, { fromTFHub: detectorFromTFHub }),
                            tfconv.loadGraphModel(config.landmarkModelUrl, { fromTFHub: landmarkFromTFHub })
                        ])];
                case 1:
                    _a = _b.sent(), detectorModel = _a[0], landmarkModel = _a[1];
                    return [2 /*return*/, new MediaPipeHandsTfjsDetector(detectorModel, landmarkModel, config.maxHands)];
            }
        });
    });
}
exports.load = load;
//# sourceMappingURL=detector.js.map