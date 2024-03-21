/**
    * @license
    * Copyright 2024 Google LLC. All Rights Reserved.
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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@mediapipe/hands'), require('@tensorflow/tfjs-core'), require('@tensorflow/tfjs-converter')) :
    typeof define === 'function' && define.amd ? define(['exports', '@mediapipe/hands', '@tensorflow/tfjs-core', '@tensorflow/tfjs-converter'], factory) :
    (global = global || self, factory(global.handPoseDetection = {}, global.globalThis, global.tf, global.tf));
}(this, (function (exports, hands, tf, tfconv) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
    }

    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

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
    var MEDIAPIPE_KEYPOINTS = [
        'wrist',
        'thumb_cmc',
        'thumb_mcp',
        'thumb_ip',
        'thumb_tip',
        'index_finger_mcp',
        'index_finger_pip',
        'index_finger_dip',
        'index_finger_tip',
        'middle_finger_mcp',
        'middle_finger_pip',
        'middle_finger_dip',
        'middle_finger_tip',
        'ring_finger_mcp',
        'ring_finger_pip',
        'ring_finger_dip',
        'ring_finger_tip',
        'pinky_finger_mcp',
        'pinky_finger_pip',
        'pinky_finger_dip',
        'pinky_finger_tip',
    ];

    var DEFAULT_MPHANDS_MODEL_CONFIG = {
        runtime: 'mediapipe',
        maxHands: 2,
        modelType: 'full'
    };

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
    function validateModelConfig(modelConfig) {
        if (modelConfig == null) {
            return __assign({}, DEFAULT_MPHANDS_MODEL_CONFIG);
        }
        var config = __assign({}, modelConfig);
        config.runtime = 'mediapipe';
        if (config.maxHands == null) {
            config.maxHands = DEFAULT_MPHANDS_MODEL_CONFIG.maxHands;
        }
        if (config.modelType == null) {
            config.modelType = DEFAULT_MPHANDS_MODEL_CONFIG.modelType;
        }
        return config;
    }

    /**
     * MediaPipe detector class.
     */
    var MediaPipeHandsMediaPipeDetector = /** @class */ (function () {
        // Should not be called outside.
        function MediaPipeHandsMediaPipeDetector(config) {
            var _this = this;
            // This will be filled out by asynchronous calls to onResults. They will be
            // stable after `await send` is called on the hands solution.
            this.width = 0;
            this.height = 0;
            this.selfieMode = false;
            this.handsSolution = new hands.Hands({
                locateFile: function (path, base) {
                    if (config.solutionPath) {
                        var solutionPath = config.solutionPath.replace(/\/+$/, '');
                        return solutionPath + "/" + path;
                    }
                    return base + "/" + path;
                }
            });
            var modelComplexity;
            switch (config.modelType) {
                case 'lite':
                    modelComplexity = 0;
                    break;
                case 'full':
                default:
                    modelComplexity = 1;
                    break;
            }
            this.handsSolution.setOptions({
                modelComplexity: modelComplexity,
                selfieMode: this.selfieMode,
                maxNumHands: config.maxHands,
            });
            this.handsSolution.onResults(function (results) {
                _this.height = results.image.height;
                _this.width = results.image.width;
                _this.hands = [];
                if (results.multiHandLandmarks !== null) {
                    var handednessList = results.multiHandedness;
                    var landmarksList = results.multiHandLandmarks;
                    var worldLandmarksList = results.multiHandWorldLandmarks;
                    for (var i = 0; i < handednessList.length; i++) {
                        _this.hands.push(__assign(__assign({}, _this.translateOutput(landmarksList[i], worldLandmarksList[i])), { score: handednessList[i].score, handedness: handednessList[i].label }));
                    }
                }
            });
        }
        MediaPipeHandsMediaPipeDetector.prototype.translateOutput = function (landmarks, worldLandmarks) {
            var _this = this;
            var keypoints = landmarks.map(function (landmark, i) { return ({
                x: landmark.x * _this.width,
                y: landmark.y * _this.height,
                score: landmark.visibility,
                name: MEDIAPIPE_KEYPOINTS[i],
            }); });
            var keypoints3D = worldLandmarks.map(function (landmark, i) { return ({
                x: landmark.x,
                y: landmark.y,
                z: landmark.z,
                score: landmark.visibility,
                name: MEDIAPIPE_KEYPOINTS[i]
            }); });
            return { keypoints: keypoints, keypoints3D: keypoints3D };
        };
        /**
         * Estimates hand poses for an image or video frame.
         *
         * It returns a single hand or multiple hands based on the maxHands
         * parameter passed to the constructor of the class.
         *
         * @param input
         * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
         * image to feed through the network.
         *
         * @param config Optional.
         *       flipHorizontal: Optional. Default to false. When image data comes
         *       from camera, the result has to flip horizontally.
         *
         *       staticImageMode: Optional. Defaults to false. Currently unused in
         * this implementation. Image input types are assumed to be static images, and
         * video inputs are assumed to be non static images.
         *
         * @return An array of `Hand`s.
         */
        MediaPipeHandsMediaPipeDetector.prototype.estimateHands = function (input, estimationConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (estimationConfig && estimationConfig.flipHorizontal &&
                                (estimationConfig.flipHorizontal !== this.selfieMode)) {
                                this.selfieMode = estimationConfig.flipHorizontal;
                                this.handsSolution.setOptions({
                                    selfieMode: this.selfieMode,
                                });
                            }
                            if (!(input instanceof tf.Tensor)) return [3 /*break*/, 2];
                            _b = ImageData.bind;
                            return [4 /*yield*/, tf.browser.toPixels(input)];
                        case 1:
                            _a = new (_b.apply(ImageData, [void 0, _c.sent(), input.shape[1], input.shape[0]]))();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = input;
                            _c.label = 3;
                        case 3:
                            // Cast to GL TexImageSource types.
                            input = _a;
                            return [4 /*yield*/, this.handsSolution.send({ image: input })];
                        case 4:
                            _c.sent();
                            return [2 /*return*/, this.hands];
                    }
                });
            });
        };
        MediaPipeHandsMediaPipeDetector.prototype.dispose = function () {
            this.handsSolution.close();
        };
        MediaPipeHandsMediaPipeDetector.prototype.reset = function () {
            this.handsSolution.reset();
            this.width = 0;
            this.height = 0;
            this.hands = null;
            this.selfieMode = false;
        };
        MediaPipeHandsMediaPipeDetector.prototype.initialize = function () {
            return this.handsSolution.initialize();
        };
        return MediaPipeHandsMediaPipeDetector;
    }());
    /**
     * Loads the MediaPipe solution.
     *
     * @param modelConfig An object that contains parameters for
     * the MediaPipeHands loading process. Please find more details of each
     * parameters in the documentation of the `MediaPipeHandsMediaPipeModelConfig`
     * interface.
     */
    function load(modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, detector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = validateModelConfig(modelConfig);
                        detector = new MediaPipeHandsMediaPipeDetector(config);
                        return [4 /*yield*/, detector.initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, detector];
                }
            });
        });
    }

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
    function area(rect) {
        return rect.width * rect.height;
    }
    function intersects(rect1, rect2) {
        return !(rect1.xMax < rect2.xMin || rect2.xMax < rect1.xMin ||
            rect1.yMax < rect2.yMin || rect2.yMax < rect1.yMin);
    }
    function intersect(rect1, rect2) {
        var xMin = Math.max(rect1.xMin, rect2.xMin);
        var xMax = Math.min(rect1.xMax, rect2.xMax);
        var yMin = Math.max(rect1.yMin, rect2.yMin);
        var yMax = Math.min(rect1.yMax, rect2.yMax);
        var width = Math.max(xMax - xMin, 0);
        var height = Math.max(yMax - yMin, 0);
        return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: width, height: height };
    }
    function getBoundingBox(rect) {
        var xMin = rect.xCenter - rect.width / 2;
        var xMax = xMin + rect.width;
        var yMin = rect.yCenter - rect.height / 2;
        var yMax = yMin + rect.height;
        return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, width: rect.width, height: rect.height };
    }
    function overlapSimilarity(rect1, rect2) {
        var bbox1 = getBoundingBox(rect1);
        var bbox2 = getBoundingBox(rect2);
        if (!intersects(bbox1, bbox2)) {
            return 0;
        }
        var intersectionArea = area(intersect(bbox1, bbox2));
        var normalization = area(bbox1) + area(bbox2) - intersectionArea;
        return normalization > 0 ? intersectionArea / normalization : 0;
    }
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/association_norm_rect_calculator.cc
    // Propgating ids from previous to current is not performed by this code.
    function calculateAssociationNormRect(rectsArray, minSimilarityThreshold) {
        var result = [];
        // rectsArray elements are interpreted to be sorted in reverse priority order,
        // so later elements are higher in priority. This means that if there's a
        // large overlap, the later rect will be added and the older rect will be
        // removed.
        rectsArray.forEach(function (rects) { return rects.forEach(function (curRect) {
            result = result.filter(function (prevRect) {
                return overlapSimilarity(curRect, prevRect) <= minSimilarityThreshold;
            });
            result.push(curRect);
        }); });
        return result;
    }

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
    /**
     * Projects normalized landmarks in a rectangle to its original coordinates. The
     * rectangle must also be in normalized coordinates.
     * @param landmarks A normalized Landmark list representing landmarks in a
     *     normalized rectangle.
     * @param inputRect A normalized rectangle.
     * @param config Config object has one field ignoreRotation, default to false.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
    function calculateLandmarkProjection(landmarks, inputRect, config) {
        if (config === void 0) { config = {
            ignoreRotation: false
        }; }
        var outputLandmarks = [];
        for (var _i = 0, landmarks_1 = landmarks; _i < landmarks_1.length; _i++) {
            var landmark = landmarks_1[_i];
            var x = landmark.x - 0.5;
            var y = landmark.y - 0.5;
            var angle = config.ignoreRotation ? 0 : inputRect.rotation;
            var newX = Math.cos(angle) * x - Math.sin(angle) * y;
            var newY = Math.sin(angle) * x + Math.cos(angle) * y;
            newX = newX * inputRect.width + inputRect.xCenter;
            newY = newY * inputRect.height + inputRect.yCenter;
            var newZ = landmark.z * inputRect.width; // Scale Z coordinate as x.
            var newLandmark = __assign({}, landmark);
            newLandmark.x = newX;
            newLandmark.y = newY;
            newLandmark.z = newZ;
            outputLandmarks.push(newLandmark);
        }
        return outputLandmarks;
    }

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
    /**
     * Projects world landmarks from the rectangle to original coordinates.
     *
     * World landmarks are predicted in meters rather than in pixels of the image
     * and have origin in the middle of the hips rather than in the corner of the
     * pose image (cropped with given rectangle). Thus only rotation (but not scale
     * and translation) is applied to the landmarks to transform them back to
     * original coordinates.
     * @param worldLandmarks A Landmark list representing world landmarks in the
     *     rectangle.
     * @param inputRect A normalized rectangle.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_projection_calculator.cc
    function calculateWorldLandmarkProjection(worldLandmarks, inputRect) {
        var outputLandmarks = [];
        for (var _i = 0, worldLandmarks_1 = worldLandmarks; _i < worldLandmarks_1.length; _i++) {
            var worldLandmark = worldLandmarks_1[_i];
            var x = worldLandmark.x;
            var y = worldLandmark.y;
            var angle = inputRect.rotation;
            var newX = Math.cos(angle) * x - Math.sin(angle) * y;
            var newY = Math.sin(angle) * x + Math.cos(angle) * y;
            var newLandmark = __assign({}, worldLandmark);
            newLandmark.x = newX;
            newLandmark.y = newY;
            outputLandmarks.push(newLandmark);
        }
        return outputLandmarks;
    }

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
    function arrayToMatrix4x4(array) {
        if (array.length !== 16) {
            throw new Error("Array length must be 16 but got " + array.length);
        }
        return [
            [array[0], array[1], array[2], array[3]],
            [array[4], array[5], array[6], array[7]],
            [array[8], array[9], array[10], array[11]],
            [array[12], array[13], array[14], array[15]],
        ];
    }

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
    // Ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_utils.h
    function getRotatedSubRectToRectTransformMatrix(subRect, rectWidth, rectHeight, flipHorizontally) {
        // The resulting matrix is multiplication of below commented out matrices:
        //   postScaleMatrix
        //     * translateMatrix
        //     * rotateMatrix
        //     * flipMatrix
        //     * scaleMatrix
        //     * initialTranslateMatrix
        // For any point in the transformed image p, we can use the above matrix to
        // calculate the projected point in the original image p'. So that:
        // p' = p * M;
        // Note: The transform matrix below assumes image coordinates is normalized
        // to [0, 1] range.
        // Matrix to convert X,Y to [-0.5, 0.5] range "initialTranslateMatrix"
        // [ 1.0,  0.0, 0.0, -0.5]
        // [ 0.0,  1.0, 0.0, -0.5]
        // [ 0.0,  0.0, 1.0,  0.0]
        // [ 0.0,  0.0, 0.0,  1.0]
        var a = subRect.width;
        var b = subRect.height;
        // Matrix to scale X,Y,Z to sub rect "scaleMatrix"
        // Z has the same scale as X.
        // [   a, 0.0, 0.0, 0.0]
        // [0.0,    b, 0.0, 0.0]
        // [0.0, 0.0,    a, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var flip = flipHorizontally ? -1 : 1;
        // Matrix for optional horizontal flip around middle of output image.
        // [ fl  , 0.0, 0.0, 0.0]
        // [ 0.0, 1.0, 0.0, 0.0]
        // [ 0.0, 0.0, 1.0, 0.0]
        // [ 0.0, 0.0, 0.0, 1.0]
        var c = Math.cos(subRect.rotation);
        var d = Math.sin(subRect.rotation);
        // Matrix to do rotation around Z axis "rotateMatrix"
        // [    c,   -d, 0.0, 0.0]
        // [    d,    c, 0.0, 0.0]
        // [ 0.0, 0.0, 1.0, 0.0]
        // [ 0.0, 0.0, 0.0, 1.0]
        var e = subRect.xCenter;
        var f = subRect.yCenter;
        // Matrix to do X,Y translation of sub rect within parent rect
        // "translateMatrix"
        // [1.0, 0.0, 0.0, e   ]
        // [0.0, 1.0, 0.0, f   ]
        // [0.0, 0.0, 1.0, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var g = 1.0 / rectWidth;
        var h = 1.0 / rectHeight;
        // Matrix to scale X,Y,Z to [0.0, 1.0] range "postScaleMatrix"
        // [g,    0.0, 0.0, 0.0]
        // [0.0, h,    0.0, 0.0]
        // [0.0, 0.0,    g, 0.0]
        // [0.0, 0.0, 0.0, 1.0]
        var matrix = new Array(16);
        // row 1
        matrix[0] = a * c * flip * g;
        matrix[1] = -b * d * g;
        matrix[2] = 0.0;
        matrix[3] = (-0.5 * a * c * flip + 0.5 * b * d + e) * g;
        // row 2
        matrix[4] = a * d * flip * h;
        matrix[5] = b * c * h;
        matrix[6] = 0.0;
        matrix[7] = (-0.5 * b * c - 0.5 * a * d * flip + f) * h;
        // row 3
        matrix[8] = 0.0;
        matrix[9] = 0.0;
        matrix[10] = a * g;
        matrix[11] = 0.0;
        // row 4
        matrix[12] = 0.0;
        matrix[13] = 0.0;
        matrix[14] = 0.0;
        matrix[15] = 1.0;
        return arrayToMatrix4x4(matrix);
    }

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
    function getImageSize(input) {
        if (input instanceof tf.Tensor) {
            return { height: input.shape[0], width: input.shape[1] };
        }
        else {
            return { height: input.height, width: input.width };
        }
    }
    /**
     * Normalizes the provided angle to the range -pi to pi.
     * @param angle The angle in radians to be normalized.
     */
    function normalizeRadians(angle) {
        return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI));
    }
    /**
     * Transform value ranges.
     * @param fromMin Min of original value range.
     * @param fromMax Max of original value range.
     * @param toMin New min of transformed value range.
     * @param toMax New max of transformed value range.
     */
    function transformValueRange(fromMin, fromMax, toMin, toMax) {
        var fromRange = fromMax - fromMin;
        var toRange = toMax - toMin;
        if (fromRange === 0) {
            throw new Error("Original min and max are both " + fromMin + ", range cannot be 0.");
        }
        var scale = toRange / fromRange;
        var offset = toMin - fromMin * scale;
        return { scale: scale, offset: offset };
    }
    /**
     * Convert an image to an image tensor representation.
     *
     * The image tensor has a shape [1, height, width, colorChannel].
     *
     * @param input An image, video frame, or image tensor.
     */
    function toImageTensor(input) {
        return input instanceof tf.Tensor ? input : tf.browser.fromPixels(input);
    }
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
    function padRoi(roi, targetSize, keepAspectRatio) {
        if (keepAspectRatio === void 0) { keepAspectRatio = false; }
        if (!keepAspectRatio) {
            return { top: 0, left: 0, right: 0, bottom: 0 };
        }
        var targetH = targetSize.height;
        var targetW = targetSize.width;
        validateSize(targetSize, 'targetSize');
        validateSize(roi, 'roi');
        var tensorAspectRatio = targetH / targetW;
        var roiAspectRatio = roi.height / roi.width;
        var newWidth;
        var newHeight;
        var horizontalPadding = 0;
        var verticalPadding = 0;
        if (tensorAspectRatio > roiAspectRatio) {
            // pad height;
            newWidth = roi.width;
            newHeight = roi.width * tensorAspectRatio;
            verticalPadding = (1 - roiAspectRatio / tensorAspectRatio) / 2;
        }
        else {
            // pad width.
            newWidth = roi.height / tensorAspectRatio;
            newHeight = roi.height;
            horizontalPadding = (1 - tensorAspectRatio / roiAspectRatio) / 2;
        }
        roi.width = newWidth;
        roi.height = newHeight;
        return {
            top: verticalPadding,
            left: horizontalPadding,
            right: horizontalPadding,
            bottom: verticalPadding
        };
    }
    /**
     * Get the rectangle information of an image, including xCenter, yCenter, width,
     * height and rotation.
     *
     * @param imageSize imageSize is used to calculate the rectangle.
     * @param normRect Optional. If normRect is not null, it will be used to get
     *     a subarea rectangle information in the image. `imageSize` is used to
     *     calculate the actual non-normalized coordinates.
     */
    function getRoi(imageSize, normRect) {
        if (normRect) {
            return {
                xCenter: normRect.xCenter * imageSize.width,
                yCenter: normRect.yCenter * imageSize.height,
                width: normRect.width * imageSize.width,
                height: normRect.height * imageSize.height,
                rotation: normRect.rotation
            };
        }
        else {
            return {
                xCenter: 0.5 * imageSize.width,
                yCenter: 0.5 * imageSize.height,
                width: imageSize.width,
                height: imageSize.height,
                rotation: 0
            };
        }
    }
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
    function getProjectiveTransformMatrix(matrix, imageSize, inputResolution) {
        validateSize(inputResolution, 'inputResolution');
        // To use M with regular x, y coordinates, we need to normalize them first.
        // Because x' = a0 * x + a1 * y + a2, y' = b0 * x + b1 * y + b2,
        // we need to use factor (1/inputResolution.width) to normalize x for a0 and
        // b0, similarly we need to use factor (1/inputResolution.height) to normalize
        // y for a1 and b1.
        // Also at the end, we need to de-normalize x' and y' to regular coordinates.
        // So we need to use factor imageSize.width for a0, a1 and a2, similarly
        // we need to use factor imageSize.height for b0, b1 and b2.
        var a0 = (1 / inputResolution.width) * matrix[0][0] * imageSize.width;
        var a1 = (1 / inputResolution.height) * matrix[0][1] * imageSize.width;
        var a2 = matrix[0][3] * imageSize.width;
        var b0 = (1 / inputResolution.width) * matrix[1][0] * imageSize.height;
        var b1 = (1 / inputResolution.height) * matrix[1][1] * imageSize.height;
        var b2 = matrix[1][3] * imageSize.height;
        return [a0, a1, a2, b0, b1, b2, 0, 0];
    }
    function validateSize(size, name) {
        tf.util.assert(size.width !== 0, function () { return name + " width cannot be 0."; });
        tf.util.assert(size.height !== 0, function () { return name + " height cannot be 0."; });
    }

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
    function shiftImageValue(image, outputFloatRange) {
        // Calculate the scale and offset to shift from [0, 255] to [-1, 1].
        var valueRange = transformValueRange(0, 255, outputFloatRange[0] /* min */, outputFloatRange[1] /* max */);
        // Shift value range.
        return tf.tidy(function () { return tf.add(tf.mul(image, valueRange.scale), valueRange.offset); });
    }

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
    /**
     * Convert an image or part of it to an image tensor.
     *
     * @param image An image, video frame or image tensor.
     * @param config
     *      inputResolution: The target height and width.
     *      keepAspectRatio?: Whether target tensor should keep aspect ratio.
     * @param normRect A normalized rectangle, representing the subarea to crop from
     *      the image. If normRect is provided, the returned image tensor represents
     *      the subarea.
     * @returns A map with the following properties:
     *     - imageTensor
     *     - padding: Padding ratio of left, top, right, bottom, based on the output
     * dimensions.
     *     - transformationMatrix: Projective transform matrix used to transform
     * input image to transformed image.
     */
    function convertImageToTensor(image, config, normRect) {
        var outputTensorSize = config.outputTensorSize, keepAspectRatio = config.keepAspectRatio, borderMode = config.borderMode, outputTensorFloatRange = config.outputTensorFloatRange;
        // Ref:
        // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/tensor/image_to_tensor_calculator.cc
        var imageSize = getImageSize(image);
        var roi = getRoi(imageSize, normRect);
        var padding = padRoi(roi, outputTensorSize, keepAspectRatio);
        var transformationMatrix = getRotatedSubRectToRectTransformMatrix(roi, imageSize.width, imageSize.height, false);
        var imageTensor = tf.tidy(function () {
            var $image = toImageTensor(image);
            var transformMatrix = tf.tensor2d(getProjectiveTransformMatrix(transformationMatrix, imageSize, outputTensorSize), [1, 8]);
            var fillMode = borderMode === 'zero' ? 'constant' : 'nearest';
            var imageTransformed = tf.image.transform(
            // tslint:disable-next-line: no-unnecessary-type-assertion
            tf.expandDims(tf.cast($image, 'float32')), transformMatrix, 'bilinear', fillMode, 0, [outputTensorSize.height, outputTensorSize.width]);
            var imageShifted = outputTensorFloatRange != null ?
                shiftImageValue(imageTransformed, outputTensorFloatRange) :
                imageTransformed;
            return imageShifted;
        });
        return { imageTensor: imageTensor, padding: padding, transformationMatrix: transformationMatrix };
    }

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
    // ref:
    // https://github.com/google/mediapipe/blob/350fbb2100ad531bc110b93aaea23d96af5a5064/mediapipe/calculators/tflite/ssd_anchors_calculator.cc
    function createSsdAnchors(config) {
        // Set defaults.
        if (config.reduceBoxesInLowestLayer == null) {
            config.reduceBoxesInLowestLayer = false;
        }
        if (config.interpolatedScaleAspectRatio == null) {
            config.interpolatedScaleAspectRatio = 1.0;
        }
        if (config.fixedAnchorSize == null) {
            config.fixedAnchorSize = false;
        }
        var anchors = [];
        var layerId = 0;
        while (layerId < config.numLayers) {
            var anchorHeight = [];
            var anchorWidth = [];
            var aspectRatios = [];
            var scales = [];
            // For same strides, we merge the anchors in the same order.
            var lastSameStrideLayer = layerId;
            while (lastSameStrideLayer < config.strides.length &&
                config.strides[lastSameStrideLayer] === config.strides[layerId]) {
                var scale = calculateScale(config.minScale, config.maxScale, lastSameStrideLayer, config.strides.length);
                if (lastSameStrideLayer === 0 && config.reduceBoxesInLowestLayer) {
                    // For first layer, it can be specified to use predefined anchors.
                    aspectRatios.push(1);
                    aspectRatios.push(2);
                    aspectRatios.push(0.5);
                    scales.push(0.1);
                    scales.push(scale);
                    scales.push(scale);
                }
                else {
                    for (var aspectRatioId = 0; aspectRatioId < config.aspectRatios.length; ++aspectRatioId) {
                        aspectRatios.push(config.aspectRatios[aspectRatioId]);
                        scales.push(scale);
                    }
                    if (config.interpolatedScaleAspectRatio > 0.0) {
                        var scaleNext = lastSameStrideLayer === config.strides.length - 1 ?
                            1.0 :
                            calculateScale(config.minScale, config.maxScale, lastSameStrideLayer + 1, config.strides.length);
                        scales.push(Math.sqrt(scale * scaleNext));
                        aspectRatios.push(config.interpolatedScaleAspectRatio);
                    }
                }
                lastSameStrideLayer++;
            }
            for (var i = 0; i < aspectRatios.length; ++i) {
                var ratioSqrts = Math.sqrt(aspectRatios[i]);
                anchorHeight.push(scales[i] / ratioSqrts);
                anchorWidth.push(scales[i] * ratioSqrts);
            }
            var featureMapHeight = 0;
            var featureMapWidth = 0;
            if (config.featureMapHeight.length > 0) {
                featureMapHeight = config.featureMapHeight[layerId];
                featureMapWidth = config.featureMapWidth[layerId];
            }
            else {
                var stride = config.strides[layerId];
                featureMapHeight = Math.ceil(config.inputSizeHeight / stride);
                featureMapWidth = Math.ceil(config.inputSizeWidth / stride);
            }
            for (var y = 0; y < featureMapHeight; ++y) {
                for (var x = 0; x < featureMapWidth; ++x) {
                    for (var anchorId = 0; anchorId < anchorHeight.length; ++anchorId) {
                        var xCenter = (x + config.anchorOffsetX) / featureMapWidth;
                        var yCenter = (y + config.anchorOffsetY) / featureMapHeight;
                        var newAnchor = { xCenter: xCenter, yCenter: yCenter, width: 0, height: 0 };
                        if (config.fixedAnchorSize) {
                            newAnchor.width = 1.0;
                            newAnchor.height = 1.0;
                        }
                        else {
                            newAnchor.width = anchorWidth[anchorId];
                            newAnchor.height = anchorHeight[anchorId];
                        }
                        anchors.push(newAnchor);
                    }
                }
            }
            layerId = lastSameStrideLayer;
        }
        return anchors;
    }
    function calculateScale(minScale, maxScale, strideIndex, numStrides) {
        if (numStrides === 1) {
            return (minScale + maxScale) * 0.5;
        }
        else {
            return minScale + (maxScale - minScale) * strideIndex / (numStrides - 1);
        }
    }

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
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detections_to_rects_calculator.cc
    function computeRotation(detection, imageSize, config) {
        var locationData = detection.locationData;
        var startKeypoint = config.rotationVectorStartKeypointIndex;
        var endKeypoint = config.rotationVectorEndKeypointIndex;
        var targetAngle;
        if (config.rotationVectorTargetAngle) {
            targetAngle = config.rotationVectorTargetAngle;
        }
        else {
            targetAngle = Math.PI * config.rotationVectorTargetAngleDegree / 180;
        }
        var x0 = locationData.relativeKeypoints[startKeypoint].x * imageSize.width;
        var y0 = locationData.relativeKeypoints[startKeypoint].y * imageSize.height;
        var x1 = locationData.relativeKeypoints[endKeypoint].x * imageSize.width;
        var y1 = locationData.relativeKeypoints[endKeypoint].y * imageSize.height;
        var rotation = normalizeRadians(targetAngle - Math.atan2(-(y1 - y0), x1 - x0));
        return rotation;
    }
    function rectFromBox(box) {
        return {
            xCenter: box.xMin + box.width / 2,
            yCenter: box.yMin + box.height / 2,
            width: box.width,
            height: box.height,
        };
    }
    function normRectFromKeypoints(locationData) {
        var keypoints = locationData.relativeKeypoints;
        if (keypoints.length <= 1) {
            throw new Error('2 or more keypoints required to calculate a rect.');
        }
        var xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE;
        keypoints.forEach(function (keypoint) {
            xMin = Math.min(xMin, keypoint.x);
            xMax = Math.max(xMax, keypoint.x);
            yMin = Math.min(yMin, keypoint.y);
            yMax = Math.max(yMax, keypoint.y);
        });
        return {
            xCenter: (xMin + xMax) / 2,
            yCenter: (yMin + yMax) / 2,
            width: xMax - xMin,
            height: yMax - yMin
        };
    }
    function detectionToNormalizedRect(detection, conversionMode) {
        var locationData = detection.locationData;
        return conversionMode === 'boundingbox' ?
            rectFromBox(locationData.relativeBoundingBox) :
            normRectFromKeypoints(locationData);
    }
    function detectionToRect(detection, conversionMode, imageSize) {
        var locationData = detection.locationData;
        var rect;
        if (conversionMode === 'boundingbox') {
            rect = rectFromBox(locationData.boundingBox);
        }
        else {
            rect = normRectFromKeypoints(locationData);
            var width = imageSize.width, height = imageSize.height;
            rect.xCenter = Math.round(rect.xCenter * width);
            rect.yCenter = Math.round(rect.yCenter * height);
            rect.width = Math.round(rect.width * width);
            rect.height = Math.round(rect.height * height);
        }
        return rect;
    }
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detections_to_rects_calculator.cc
    function calculateDetectionsToRects(detection, conversionMode, outputType, imageSize, rotationConfig) {
        var rect = outputType === 'rect' ?
            detectionToRect(detection, conversionMode, imageSize) :
            detectionToNormalizedRect(detection, conversionMode);
        if (rotationConfig) {
            rect.rotation = computeRotation(detection, imageSize, rotationConfig);
        }
        return rect;
    }

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
    function splitDetectionResult(detectionResult) {
        return tf.tidy(function () {
            // logit is stored in the first element in each anchor data.
            var logits = tf.slice(detectionResult, [0, 0, 0], [1, -1, 1]);
            // Bounding box coords are stored in the next four elements for each anchor
            // point.
            var rawBoxes = tf.slice(detectionResult, [0, 0, 1], [1, -1, -1]);
            return [logits, rawBoxes];
        });
    }

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
    function detectorResult(detectionResult) {
        return tf.tidy(function () {
            var _a = splitDetectionResult(detectionResult), logits = _a[0], rawBoxes = _a[1];
            // Shape [896, 12]
            var rawBoxes2d = tf.squeeze(rawBoxes);
            // Shape [896]
            var logits1d = tf.squeeze(logits);
            return { boxes: rawBoxes2d, logits: logits1d };
        });
    }

    function nonMaxSuppression(detections, maxDetections, iouThreshold, 
    // Currently only IOU overap is supported.
    overlapType) {
        return __awaiter(this, void 0, void 0, function () {
            var detectionsTensor, scoresTensor, selectedIdsTensor, selectedIds, selectedDetections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Sort to match NonMaxSuppresion calculator's decreasing detection score
                        // traversal.
                        // NonMaxSuppresionCalculator: RetainMaxScoringLabelOnly
                        detections.sort(function (detectionA, detectionB) {
                            return Math.max.apply(Math, detectionB.score) - Math.max.apply(Math, detectionA.score);
                        });
                        detectionsTensor = tf.tensor2d(detections.map(function (d) {
                            return [d.locationData.relativeBoundingBox.yMin,
                                d.locationData.relativeBoundingBox.xMin,
                                d.locationData.relativeBoundingBox.yMax,
                                d.locationData.relativeBoundingBox.xMax];
                        }));
                        scoresTensor = tf.tensor1d(detections.map(function (d) { return d.score[0]; }));
                        return [4 /*yield*/, tf.image.nonMaxSuppressionAsync(detectionsTensor, scoresTensor, maxDetections, iouThreshold)];
                    case 1:
                        selectedIdsTensor = _a.sent();
                        return [4 /*yield*/, selectedIdsTensor.array()];
                    case 2:
                        selectedIds = _a.sent();
                        selectedDetections = detections.filter(function (_, i) { return (selectedIds.indexOf(i) > -1); });
                        tf.dispose([detectionsTensor, scoresTensor, selectedIdsTensor]);
                        return [2 /*return*/, selectedDetections];
                }
            });
        });
    }

    function normalizedKeypointsToKeypoints(normalizedKeypoints, imageSize) {
        return normalizedKeypoints.map(function (normalizedKeypoint) {
            var keypoint = __assign(__assign({}, normalizedKeypoint), { x: normalizedKeypoint.x * imageSize.width, y: normalizedKeypoint.y * imageSize.height });
            if (normalizedKeypoint.z != null) {
                // Scale z the same way as x (using image width).
                keypoint.z = normalizedKeypoint.z * imageSize.width;
            }
            return keypoint;
        });
    }

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
    /**
     * Adjusts detection locations on the letterboxed image to the corresponding
     * locations on the same image with the letterbox removed (the input image to
     * the graph before image transformation).
     *
     * @param detections A list of detection boxes on an letterboxed image.
     * @param letterboxPadding A `padding` object representing the letterbox padding
     *     from the 4 sides: left, top, right, bottom, of the letterboxed image,
     *     normalized by the letterboxed image dimensions.
     * @returns detections: A list of detection boxes representing detections with
     *     their locations adjusted to the letterbox-removed (non-padded) image.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/detection_letterbox_removal_calculator.cc
    function removeDetectionLetterbox(detections, letterboxPadding) {
        if (detections === void 0) { detections = []; }
        var left = letterboxPadding.left;
        var top = letterboxPadding.top;
        var leftAndRight = letterboxPadding.left + letterboxPadding.right;
        var topAndBottom = letterboxPadding.top + letterboxPadding.bottom;
        for (var i = 0; i < detections.length; i++) {
            var detection = detections[i];
            var relativeBoundingBox = detection.locationData.relativeBoundingBox;
            var xMin = (relativeBoundingBox.xMin - left) / (1 - leftAndRight);
            var yMin = (relativeBoundingBox.yMin - top) / (1 - topAndBottom);
            var width = relativeBoundingBox.width / (1 - leftAndRight);
            var height = relativeBoundingBox.height / (1 - topAndBottom);
            relativeBoundingBox.xMin = xMin;
            relativeBoundingBox.yMin = yMin;
            relativeBoundingBox.width = width;
            relativeBoundingBox.height = height;
            relativeBoundingBox.xMax = xMin + width;
            relativeBoundingBox.yMax = yMin + height;
            var relativeKeypoints = detection.locationData.relativeKeypoints;
            if (relativeKeypoints) {
                relativeKeypoints.forEach(function (keypoint) {
                    var newX = (keypoint.x - left) / (1 - leftAndRight);
                    var newY = (keypoint.y - top) / (1 - topAndBottom);
                    keypoint.x = newX;
                    keypoint.y = newY;
                });
            }
        }
        return detections;
    }

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
    /**
     * Adjusts landmark locations on a letterboxed image to the corresponding
     * locations on the same image with the letterbox removed.
     * @param rawLandmark A NormalizedLandmarkList representing landmarks on an
     * letterboxed image.
     * @param padding A `padding` representing the letterbox padding from the 4
     *     sides, left, top, right, bottom, of the letterboxed image, normalized by
     *     the letterboxed image dimensions.
     * @returns Normalized landmarks.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmark_letterbox_removal_calculator.cc
    function removeLandmarkLetterbox(rawLandmark, padding) {
        var left = padding.left;
        var top = padding.top;
        var leftAndRight = padding.left + padding.right;
        var topAndBottom = padding.top + padding.bottom;
        var outLandmarks = rawLandmark.map(function (landmark) {
            return __assign(__assign({}, landmark), { x: (landmark.x - left) / (1 - leftAndRight), y: (landmark.y - top) / (1 - topAndBottom), z: landmark.z / (1 - leftAndRight) // Scale Z coordinate as X.
             });
        });
        return outLandmarks;
    }

    /**
     * Convert result Tensors from object detection models into Detection boxes.
     *
     * @param detectionTensors List of Tensors of type Float32. The list of tensors
     *     can have 2 or 3 tensors. First tensor is the predicted raw
     *     boxes/keypoints. The size of the values must be
     *     (num_boxes * num_predicted_values). Second tensor is the score tensor.
     *     The size of the valuse must be (num_boxes * num_classes). It's optional
     *     to pass in a third tensor for anchors (e.g. for SSD models) depend on the
     *     outputs of the detection model. The size of anchor tensor must be
     *     (num_boxes * 4).
     * @param anchor A tensor for anchors. The size of anchor tensor must be
     *     (num_boxes * 4).
     * @param config
     */
    function tensorsToDetections(detectionTensors, anchor, config) {
        return __awaiter(this, void 0, void 0, function () {
            var rawScoreTensor, rawBoxTensor, boxes, normalizedScore, outputDetections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawScoreTensor = detectionTensors[0];
                        rawBoxTensor = detectionTensors[1];
                        boxes = decodeBoxes(rawBoxTensor, anchor, config);
                        normalizedScore = tf.tidy(function () {
                            var normalizedScore = rawScoreTensor;
                            if (config.sigmoidScore) {
                                if (config.scoreClippingThresh != null) {
                                    normalizedScore = tf.clipByValue(rawScoreTensor, -config.scoreClippingThresh, config.scoreClippingThresh);
                                }
                                normalizedScore = tf.sigmoid(normalizedScore);
                                return normalizedScore;
                            }
                            return normalizedScore;
                        });
                        return [4 /*yield*/, convertToDetections(boxes, normalizedScore, config)];
                    case 1:
                        outputDetections = _a.sent();
                        tf.dispose([boxes, normalizedScore]);
                        return [2 /*return*/, outputDetections];
                }
            });
        });
    }
    function convertToDetections(detectionBoxes, detectionScore, config) {
        return __awaiter(this, void 0, void 0, function () {
            var outputDetections, detectionBoxesData, detectionScoresData, i, boxOffset, detection, bbox, locationData, totalIdx, kpId, keypointIndex, keypoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputDetections = [];
                        return [4 /*yield*/, detectionBoxes.data()];
                    case 1:
                        detectionBoxesData = _a.sent();
                        return [4 /*yield*/, detectionScore.data()];
                    case 2:
                        detectionScoresData = _a.sent();
                        for (i = 0; i < config.numBoxes; ++i) {
                            if (config.minScoreThresh != null &&
                                detectionScoresData[i] < config.minScoreThresh) {
                                continue;
                            }
                            boxOffset = i * config.numCoords;
                            detection = convertToDetection(detectionBoxesData[boxOffset + 0] /* boxYMin */, detectionBoxesData[boxOffset + 1] /* boxXMin */, detectionBoxesData[boxOffset + 2] /* boxYMax */, detectionBoxesData[boxOffset + 3] /* boxXMax */, detectionScoresData[i], config.flipVertically, i);
                            bbox = detection.locationData.relativeBoundingBox;
                            if (bbox.width < 0 || bbox.height < 0) {
                                // Decoded detection boxes could have negative values for width/height
                                // due to model prediction. Filter out those boxes since some
                                // downstream calculators may assume non-negative values.
                                continue;
                            }
                            // Add keypoints.
                            if (config.numKeypoints > 0) {
                                locationData = detection.locationData;
                                locationData.relativeKeypoints = [];
                                totalIdx = config.numKeypoints * config.numValuesPerKeypoint;
                                for (kpId = 0; kpId < totalIdx; kpId += config.numValuesPerKeypoint) {
                                    keypointIndex = boxOffset + config.keypointCoordOffset + kpId;
                                    keypoint = {
                                        x: detectionBoxesData[keypointIndex + 0],
                                        y: config.flipVertically ? 1 - detectionBoxesData[keypointIndex + 1] :
                                            detectionBoxesData[keypointIndex + 1]
                                    };
                                    locationData.relativeKeypoints.push(keypoint);
                                }
                            }
                            outputDetections.push(detection);
                        }
                        return [2 /*return*/, outputDetections];
                }
            });
        });
    }
    function convertToDetection(boxYMin, boxXMin, boxYMax, boxXMax, score, flipVertically, i) {
        return {
            score: [score],
            ind: i,
            locationData: {
                relativeBoundingBox: {
                    xMin: boxXMin,
                    yMin: flipVertically ? 1 - boxYMax : boxYMin,
                    xMax: boxXMax,
                    yMax: flipVertically ? 1 - boxYMin : boxYMax,
                    width: boxXMax - boxXMin,
                    height: boxYMax - boxYMin
                }
            }
        };
    }
    //[xCenter, yCenter, w, h, kp1, kp2, kp3, kp4]
    //[yMin, xMin, yMax, xMax, kpX, kpY, kpX, kpY]
    function decodeBoxes(rawBoxes, anchor, config) {
        return tf.tidy(function () {
            var yCenter;
            var xCenter;
            var h;
            var w;
            if (config.reverseOutputOrder) {
                // Shape [numOfBoxes, 1].
                xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
                yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
                w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
                h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
            }
            else {
                yCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 0], [-1, 1]));
                xCenter = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 1], [-1, 1]));
                h = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 2], [-1, 1]));
                w = tf.squeeze(tf.slice(rawBoxes, [0, config.boxCoordOffset + 3], [-1, 1]));
            }
            xCenter =
                tf.add(tf.mul(tf.div(xCenter, config.xScale), anchor.w), anchor.x);
            yCenter =
                tf.add(tf.mul(tf.div(yCenter, config.yScale), anchor.h), anchor.y);
            if (config.applyExponentialOnBoxSize) {
                h = tf.mul(tf.exp(tf.div(h, config.hScale)), anchor.h);
                w = tf.mul(tf.exp(tf.div(w, config.wScale)), anchor.w);
            }
            else {
                h = tf.mul(tf.div(h, config.hScale), anchor.h);
                w = tf.mul(tf.div(w, config.wScale), anchor.h);
            }
            var yMin = tf.sub(yCenter, tf.div(h, 2));
            var xMin = tf.sub(xCenter, tf.div(w, 2));
            var yMax = tf.add(yCenter, tf.div(h, 2));
            var xMax = tf.add(xCenter, tf.div(w, 2));
            // Shape [numOfBoxes, 4].
            var boxes = tf.concat([
                tf.reshape(yMin, [config.numBoxes, 1]),
                tf.reshape(xMin, [config.numBoxes, 1]),
                tf.reshape(yMax, [config.numBoxes, 1]),
                tf.reshape(xMax, [config.numBoxes, 1])
            ], 1);
            if (config.numKeypoints) {
                for (var k = 0; k < config.numKeypoints; ++k) {
                    var keypointOffset = config.keypointCoordOffset + k * config.numValuesPerKeypoint;
                    var keypointX = void 0;
                    var keypointY = void 0;
                    if (config.reverseOutputOrder) {
                        keypointX =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                        keypointY =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                    }
                    else {
                        keypointY =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset], [-1, 1]));
                        keypointX =
                            tf.squeeze(tf.slice(rawBoxes, [0, keypointOffset + 1], [-1, 1]));
                    }
                    var keypointXNormalized = tf.add(tf.mul(tf.div(keypointX, config.xScale), anchor.w), anchor.x);
                    var keypointYNormalized = tf.add(tf.mul(tf.div(keypointY, config.yScale), anchor.h), anchor.y);
                    boxes = tf.concat([
                        boxes, tf.reshape(keypointXNormalized, [config.numBoxes, 1]),
                        tf.reshape(keypointYNormalized, [config.numBoxes, 1])
                    ], 1);
                }
            }
            // Shape [numOfBoxes, 4] || [numOfBoxes, 12].
            return boxes;
        });
    }

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
    function sigmoid(value) {
        return 1 / (1 + Math.exp(-value));
    }

    function applyActivation(activation, value) {
        return activation === 'none' ? value : sigmoid(value);
    }
    /**
     * A calculator for converting Tensors from regression models into landmarks.
     * Note that if the landmarks in the tensor has more than 5 dimensions, only the
     * first 5 dimensions will be converted to [x,y,z, visibility, presence]. The
     * latter two fields may also stay unset if such attributes are not supported in
     * the model.
     * @param landmarkTensor List of Tensors of type float32. Only the first tensor
     * will be used. The size of the values must be (num_dimension x num_landmarks).
     * @param flipHorizontally Optional. Whether to flip landmarks horizontally or
     * not. Overrides corresponding field in config.
     * @param flipVertically Optional. Whether to flip landmarks vertically or not.
     * Overrides corresponding field in config.
     *
     * @param config
     *
     * @returns Normalized landmarks.
     */
    function tensorsToLandmarks(landmarkTensor, config, flipHorizontally, flipVertically) {
        return __awaiter(this, void 0, void 0, function () {
            var numValues, numDimensions, rawLandmarks, outputLandmarks, ld, offset, landmark, i, landmark;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        flipHorizontally = flipHorizontally || config.flipHorizontally || false;
                        flipVertically = flipVertically || config.flipVertically || false;
                        numValues = landmarkTensor.size;
                        numDimensions = numValues / config.numLandmarks;
                        return [4 /*yield*/, landmarkTensor.data()];
                    case 1:
                        rawLandmarks = _a.sent();
                        outputLandmarks = [];
                        for (ld = 0; ld < config.numLandmarks; ++ld) {
                            offset = ld * numDimensions;
                            landmark = { x: 0, y: 0 };
                            if (flipHorizontally) {
                                landmark.x = config.inputImageWidth - rawLandmarks[offset];
                            }
                            else {
                                landmark.x = rawLandmarks[offset];
                            }
                            if (numDimensions > 1) {
                                if (flipVertically) {
                                    landmark.y = config.inputImageHeight - rawLandmarks[offset + 1];
                                }
                                else {
                                    landmark.y = rawLandmarks[offset + 1];
                                }
                            }
                            if (numDimensions > 2) {
                                landmark.z = rawLandmarks[offset + 2];
                            }
                            if (numDimensions > 3) {
                                landmark.score = applyActivation(config.visibilityActivation, rawLandmarks[offset + 3]);
                            }
                            // presence is in rawLandmarks[offset + 4], we don't expose it.
                            outputLandmarks.push(landmark);
                        }
                        for (i = 0; i < outputLandmarks.length; ++i) {
                            landmark = outputLandmarks[i];
                            landmark.x = landmark.x / config.inputImageWidth;
                            landmark.y = landmark.y / config.inputImageHeight;
                            // Scale Z coordinate as X + allow additional uniform normalization.
                            landmark.z = landmark.z / config.inputImageWidth / (config.normalizeZ || 1);
                        }
                        return [2 /*return*/, outputLandmarks];
                }
            });
        });
    }

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
    /**
     * Performs geometric transformation to the input normalized rectangle,
     * correpsonding to input normalized rectangle respectively.
     * @param rect The normalized rectangle.
     * @param imageSize The original imageSize.
     * @param config See documentation in `RectTransformationConfig`.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/rect_transformation_calculator.cc
    function transformNormalizedRect(rect, imageSize, config) {
        var width = rect.width;
        var height = rect.height;
        var rotation = rect.rotation;
        if (config.rotation != null || config.rotationDegree != null) {
            rotation = computeNewRotation(rotation, config);
        }
        if (rotation === 0) {
            rect.xCenter = rect.xCenter + width * config.shiftX;
            rect.yCenter = rect.yCenter + height * config.shiftY;
        }
        else {
            var xShift = (imageSize.width * width * config.shiftX * Math.cos(rotation) -
                imageSize.height * height * config.shiftY * Math.sin(rotation)) /
                imageSize.width;
            var yShift = (imageSize.width * width * config.shiftX * Math.sin(rotation) +
                imageSize.height * height * config.shiftY * Math.cos(rotation)) /
                imageSize.height;
            rect.xCenter = rect.xCenter + xShift;
            rect.yCenter = rect.yCenter + yShift;
        }
        if (config.squareLong) {
            var longSide = Math.max(width * imageSize.width, height * imageSize.height);
            width = longSide / imageSize.width;
            height = longSide / imageSize.height;
        }
        else if (config.squareShort) {
            var shortSide = Math.min(width * imageSize.width, height * imageSize.height);
            width = shortSide / imageSize.width;
            height = shortSide / imageSize.height;
        }
        rect.width = width * config.scaleX;
        rect.height = height * config.scaleY;
        return rect;
    }
    function computeNewRotation(rotation, config) {
        if (config.rotation != null) {
            rotation += config.rotation;
        }
        else if (config.rotationDegree != null) {
            rotation += Math.PI * config.rotationDegree / 180;
        }
        return normalizeRadians(rotation);
    }

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
    var WRIST_JOINT = 0;
    var MIDDLE_FINGER_PIP_JOINT = 6;
    var INDEX_FINGER_PIP_JOINT = 4;
    var RING_FINGER_PIP_JOINT = 8;
    function computeRotation$1(landmarks, imageSize) {
        var x0 = landmarks[WRIST_JOINT].x * imageSize.width;
        var y0 = landmarks[WRIST_JOINT].y * imageSize.height;
        var x1 = (landmarks[INDEX_FINGER_PIP_JOINT].x +
            landmarks[RING_FINGER_PIP_JOINT].x) /
            2;
        var y1 = (landmarks[INDEX_FINGER_PIP_JOINT].y +
            landmarks[RING_FINGER_PIP_JOINT].y) /
            2;
        x1 = (x1 + landmarks[MIDDLE_FINGER_PIP_JOINT].x) / 2 * imageSize.width;
        y1 = (y1 + landmarks[MIDDLE_FINGER_PIP_JOINT].y) / 2 * imageSize.height;
        var rotation = normalizeRadians(Math.PI / 2 - Math.atan2(-(y1 - y0), x1 - x0));
        return rotation;
    }
    /**
     * @param landmarks List of normalized landmarks.
     *
     * @returns A `Rect`.
     */
    // ref:
    // https://github.com/google/mediapipe/blob/master/mediapipe/hand_landmark/calculators/hand_landmarks_to_rect_calculator.cc;bpv=1
    function handLandmarksToRect(landmarks, imageSize) {
        var rotation = computeRotation$1(landmarks, imageSize);
        var reverseAngle = normalizeRadians(-rotation);
        var minX = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
        // Find boundaries of landmarks.
        for (var _i = 0, landmarks_1 = landmarks; _i < landmarks_1.length; _i++) {
            var landmark = landmarks_1[_i];
            var x = landmark.x;
            var y = landmark.y;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        var axisAlignedcenterX = (maxX + minX) / 2;
        var axisAlignedcenterY = (maxY + minY) / 2;
        minX = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY,
            minY = Number.POSITIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
        // Find boundaries of rotated landmarks.
        for (var _a = 0, landmarks_2 = landmarks; _a < landmarks_2.length; _a++) {
            var landmark = landmarks_2[_a];
            var originalX = (landmark.x - axisAlignedcenterX) * imageSize.width;
            var originalY = (landmark.y - axisAlignedcenterY) * imageSize.height;
            var projectedX = originalX * Math.cos(reverseAngle) - originalY * Math.sin(reverseAngle);
            var projectedY = originalX * Math.sin(reverseAngle) + originalY * Math.cos(reverseAngle);
            minX = Math.min(minX, projectedX);
            maxX = Math.max(maxX, projectedX);
            minY = Math.min(minY, projectedY);
            maxY = Math.max(maxY, projectedY);
        }
        var projectedCenterX = (maxX + minX) / 2;
        var projectedCenterY = (maxY + minY) / 2;
        var centerX = projectedCenterX * Math.cos(rotation) -
            projectedCenterY * Math.sin(rotation) +
            imageSize.width * axisAlignedcenterX;
        var centerY = projectedCenterX * Math.sin(rotation) +
            projectedCenterY * Math.cos(rotation) +
            imageSize.height * axisAlignedcenterY;
        var width = (maxX - minX) / imageSize.width;
        var height = (maxY - minY) / imageSize.height;
        return {
            xCenter: centerX / imageSize.width,
            yCenter: centerY / imageSize.height,
            width: width,
            height: height,
            rotation: rotation
        };
    }

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
    var DEFAULT_MPHANDS_DETECTOR_MODEL_URL_LITE = 'https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/lite/1';
    var DEFAULT_MPHANDS_DETECTOR_MODEL_URL_FULL = 'https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/full/1';
    var DEFAULT_MPHANDS_LANDMARK_MODEL_URL_LITE = 'https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/lite/1';
    var DEFAULT_MPHANDS_LANDMARK_MODEL_URL_FULL = 'https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/full/1';
    var MPHANDS_DETECTOR_ANCHOR_CONFIGURATION = {
        reduceBoxesInLowestLayer: false,
        interpolatedScaleAspectRatio: 1.0,
        featureMapHeight: [],
        featureMapWidth: [],
        numLayers: 4,
        minScale: 0.1484375,
        maxScale: 0.75,
        inputSizeHeight: 192,
        inputSizeWidth: 192,
        anchorOffsetX: 0.5,
        anchorOffsetY: 0.5,
        strides: [8, 16, 16, 16],
        aspectRatios: [1.0],
        fixedAnchorSize: true
    };
    var DEFAULT_MPHANDS_MODEL_CONFIG$1 = {
        runtime: 'tfjs',
        modelType: 'full',
        maxHands: 2,
        detectorModelUrl: DEFAULT_MPHANDS_DETECTOR_MODEL_URL_FULL,
        landmarkModelUrl: DEFAULT_MPHANDS_LANDMARK_MODEL_URL_FULL
    };
    var DEFAULT_MPHANDS_ESTIMATION_CONFIG = {
        flipHorizontal: false,
        staticImageMode: false
    };
    var MPHANDS_TENSORS_TO_DETECTION_CONFIGURATION = {
        applyExponentialOnBoxSize: false,
        flipVertically: false,
        ignoreClasses: [],
        numClasses: 1,
        numBoxes: 2016,
        numCoords: 18,
        boxCoordOffset: 0,
        keypointCoordOffset: 4,
        numKeypoints: 7,
        numValuesPerKeypoint: 2,
        sigmoidScore: true,
        scoreClippingThresh: 100.0,
        reverseOutputOrder: true,
        xScale: 192.0,
        yScale: 192.0,
        hScale: 192.0,
        wScale: 192.0,
        minScoreThresh: 0.5
    };
    var MPHANDS_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION = {
        minSuppressionThreshold: 0.3,
        overlapType: 'intersection-over-union'
    };
    var MPHANDS_DETECTOR_RECT_TRANSFORMATION_CONFIG = {
        shiftX: 0,
        shiftY: -0.5,
        scaleX: 2.6,
        scaleY: 2.6,
        squareLong: true
    };
    var MPHANDS_LANDMARK_RECT_TRANSFORMATION_CONFIG = {
        shiftX: 0,
        shiftY: -0.1,
        scaleX: 2.0,
        scaleY: 2.0,
        squareLong: true
    };
    var MPHANDS_DETECTOR_IMAGE_TO_TENSOR_CONFIG = {
        outputTensorSize: { width: 192, height: 192 },
        keepAspectRatio: true,
        outputTensorFloatRange: [0, 1],
        borderMode: 'zero'
    };
    var MPHANDS_LANDMARK_IMAGE_TO_TENSOR_CONFIG = {
        outputTensorSize: { width: 224, height: 224 },
        keepAspectRatio: true,
        outputTensorFloatRange: [0, 1],
        borderMode: 'zero'
    };
    var MPHANDS_HAND_PRESENCE_SCORE = 0.5;
    var MPHANDS_MIN_SIMILARITY_THRESHOLD = 0.5;
    var MPHANDS_TENSORS_TO_LANDMARKS_CONFIG = {
        numLandmarks: 21,
        inputImageWidth: 224,
        inputImageHeight: 224,
        normalizeZ: 0.4,
        visibilityActivation: 'none',
        flipHorizontally: false,
        flipVertically: false
    };
    var MPHANDS_TENSORS_TO_WORLD_LANDMARKS_CONFIG = {
        numLandmarks: 21,
        inputImageWidth: 1,
        inputImageHeight: 1,
        visibilityActivation: 'none',
        flipHorizontally: false,
        flipVertically: false
    };

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
    function validateModelConfig$1(modelConfig) {
        if (modelConfig == null) {
            return __assign({}, DEFAULT_MPHANDS_MODEL_CONFIG$1);
        }
        var config = __assign({}, modelConfig);
        config.runtime = 'tfjs';
        if (config.maxHands == null) {
            config.maxHands = DEFAULT_MPHANDS_MODEL_CONFIG$1.maxHands;
        }
        if (config.modelType == null) {
            config.modelType = DEFAULT_MPHANDS_MODEL_CONFIG$1.modelType;
        }
        if (config.modelType !== 'lite' && config.modelType !== 'full') {
            throw new Error("Model type must be one of lite or full, but got " + config.modelType);
        }
        if (config.detectorModelUrl == null) {
            switch (config.modelType) {
                case 'lite':
                    config.detectorModelUrl = DEFAULT_MPHANDS_DETECTOR_MODEL_URL_LITE;
                    break;
                case 'full':
                default:
                    config.detectorModelUrl = DEFAULT_MPHANDS_DETECTOR_MODEL_URL_FULL;
                    break;
            }
        }
        if (config.landmarkModelUrl == null) {
            switch (config.modelType) {
                case 'lite':
                    config.landmarkModelUrl = DEFAULT_MPHANDS_LANDMARK_MODEL_URL_LITE;
                    break;
                case 'full':
                default:
                    config.landmarkModelUrl = DEFAULT_MPHANDS_LANDMARK_MODEL_URL_FULL;
                    break;
            }
        }
        return config;
    }
    function validateEstimationConfig(estimationConfig) {
        if (estimationConfig == null) {
            return __assign({}, DEFAULT_MPHANDS_ESTIMATION_CONFIG);
        }
        var config = __assign({}, estimationConfig);
        if (config.flipHorizontal == null) {
            config.flipHorizontal = DEFAULT_MPHANDS_ESTIMATION_CONFIG.flipHorizontal;
        }
        if (config.staticImageMode == null) {
            config.staticImageMode = DEFAULT_MPHANDS_ESTIMATION_CONFIG.staticImageMode;
        }
        return config;
    }

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
                createSsdAnchors(MPHANDS_DETECTOR_ANCHOR_CONFIGURATION);
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
                            config = validateEstimationConfig(estimationConfig);
                            if (image == null) {
                                this.reset();
                                return [2 /*return*/, []];
                            }
                            imageSize = getImageSize(image);
                            image3d = tf.tidy(function () {
                                var imageTensor = tf.cast(toImageTensor(image), 'float32');
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
                            handRects = calculateAssociationNormRect([handRects], MPHANDS_MIN_SIMILARITY_THRESHOLD);
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
                                keypoints = normalizedKeypointsToKeypoints(landmarks, imageSize);
                                // Add keypoint name.
                                if (keypoints != null) {
                                    keypoints.forEach(function (keypoint, i) {
                                        delete keypoint.z;
                                        keypoint.name = MEDIAPIPE_KEYPOINTS[i];
                                    });
                                }
                                keypoints3D = worldLandmarks;
                                // Add keypoint name.
                                if (keypoints3D != null) {
                                    keypoints3D.forEach(function (keypoint3D, i) {
                                        keypoint3D.name = MEDIAPIPE_KEYPOINTS[i];
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
                            _a = convertImageToTensor(image, MPHANDS_DETECTOR_IMAGE_TO_TENSOR_CONFIG), imageValueShifted = _a.imageTensor, padding = _a.padding;
                            detectionResult = this.detectorModel.predict(imageValueShifted);
                            _b = detectorResult(detectionResult), boxes = _b.boxes, logits = _b.logits;
                            return [4 /*yield*/, tensorsToDetections([logits, boxes], this.anchorTensor, MPHANDS_TENSORS_TO_DETECTION_CONFIGURATION)];
                        case 1:
                            detections = _c.sent();
                            if (detections.length === 0) {
                                tf.dispose([imageValueShifted, detectionResult, logits, boxes]);
                                return [2 /*return*/, detections];
                            }
                            return [4 /*yield*/, nonMaxSuppression(detections, this.maxHands, MPHANDS_DETECTOR_NON_MAX_SUPPRESSION_CONFIGURATION
                                    .minSuppressionThreshold)];
                        case 2:
                            selectedDetections = _c.sent();
                            newDetections = removeDetectionLetterbox(selectedDetections, padding);
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
            var rawRoi = calculateDetectionsToRects(detection, 'boundingbox', 'normRect', imageSize, {
                rotationVectorStartKeypointIndex: 0,
                rotationVectorEndKeypointIndex: 2,
                rotationVectorTargetAngleDegree: 90
            });
            // Expands and shifts the rectangle that contains the palm so that it's
            // likely to cover the entire hand.
            // PalmDetectionDetectionToRoi: RectTransformationCalculation.
            var roi = transformNormalizedRect(rawRoi, imageSize, MPHANDS_DETECTOR_RECT_TRANSFORMATION_CONFIG);
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
                            _a = convertImageToTensor(image, MPHANDS_LANDMARK_IMAGE_TO_TENSOR_CONFIG, handRect), imageValueShifted = _a.imageTensor, padding = _a.padding;
                            landmarkResult = this.landmarkModel.execute(imageValueShifted, [
                                'Identity_2:0', 'Identity_1:0', 'Identity:0', 'Identity_3:0'
                            ]);
                            landmarkTensor = landmarkResult[0], handFlagTensor = landmarkResult[1], handednessTensor = landmarkResult[2], worldLandmarkTensor = landmarkResult[3];
                            return [4 /*yield*/, handFlagTensor.data()];
                        case 1:
                            handScore = (_b.sent())[0];
                            // Applies a threshold to the confidence score to determine whether a hand
                            // is present.
                            if (handScore < MPHANDS_HAND_PRESENCE_SCORE) {
                                tf.dispose(landmarkResult);
                                tf.dispose(imageValueShifted);
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, handednessTensor.data()];
                        case 2:
                            handednessScore = (_b.sent())[0];
                            handedness = handednessScore >= 0.5 ? 'Left' : 'Right';
                            return [4 /*yield*/, tensorsToLandmarks(landmarkTensor, MPHANDS_TENSORS_TO_LANDMARKS_CONFIG)];
                        case 3:
                            landmarks = _b.sent();
                            return [4 /*yield*/, tensorsToLandmarks(worldLandmarkTensor, MPHANDS_TENSORS_TO_WORLD_LANDMARKS_CONFIG)];
                        case 4:
                            worldLandmarks = _b.sent();
                            adjustedLandmarks = removeLandmarkLetterbox(landmarks, padding);
                            landmarksProjected = calculateLandmarkProjection(adjustedLandmarks, handRect);
                            worldLandmarksProjected = calculateWorldLandmarkProjection(worldLandmarks, handRect);
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
            var rawRoi = handLandmarksToRect(partialLandmarks, imageSize);
            // Expands pose rect with marging used during training.
            // PoseLandmarksToRoi: RectTransformationCalculator.
            var roi = transformNormalizedRect(rawRoi, imageSize, MPHANDS_LANDMARK_RECT_TRANSFORMATION_CONFIG);
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
    function load$1(modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, detectorFromTFHub, landmarkFromTFHub, _a, detectorModel, landmarkModel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = validateModelConfig$1(modelConfig);
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

    (function (SupportedModels) {
        SupportedModels["MediaPipeHands"] = "MediaPipeHands";
    })(exports.SupportedModels || (exports.SupportedModels = {}));

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
    /**
     * Create a hand detector instance.
     *
     * @param model The name of the pipeline to load.
     * @param modelConfig The configuration for the pipeline to load.
     */
    function createDetector(model, modelConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var config, runtime;
            return __generator(this, function (_a) {
                switch (model) {
                    case exports.SupportedModels.MediaPipeHands:
                        config = modelConfig;
                        runtime = void 0;
                        if (config != null) {
                            if (config.runtime === 'tfjs') {
                                return [2 /*return*/, load$1(config)];
                            }
                            if (config.runtime === 'mediapipe') {
                                return [2 /*return*/, load(config)];
                            }
                            runtime = config.runtime;
                        }
                        throw new Error("Expect modelConfig.runtime to be either 'tfjs' " +
                            ("or 'mediapipe', but got " + runtime));
                    default:
                        throw new Error(model + " is not a supported model name.");
                }
            });
        });
    }

    exports.createDetector = createDetector;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
