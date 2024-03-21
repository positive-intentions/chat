"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectorResult = void 0;
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
var tf = require("@tensorflow/tfjs-core");
var split_detection_result_1 = require("./split_detection_result");
function detectorResult(detectionResult) {
    return tf.tidy(function () {
        var _a = (0, split_detection_result_1.splitDetectionResult)(detectionResult), logits = _a[0], rawBoxes = _a[1];
        // Shape [896, 12]
        var rawBoxes2d = tf.squeeze(rawBoxes);
        // Shape [896]
        var logits1d = tf.squeeze(logits);
        return { boxes: rawBoxes2d, logits: logits1d };
    });
}
exports.detectorResult = detectorResult;
//# sourceMappingURL=detector_result.js.map