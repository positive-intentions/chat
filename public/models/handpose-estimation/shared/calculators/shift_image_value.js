"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftImageValue = void 0;
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
var image_utils_1 = require("./image_utils");
function shiftImageValue(image, outputFloatRange) {
    // Calculate the scale and offset to shift from [0, 255] to [-1, 1].
    var valueRange = (0, image_utils_1.transformValueRange)(0, 255, outputFloatRange[0] /* min */, outputFloatRange[1] /* max */);
    // Shift value range.
    return tf.tidy(function () { return tf.add(tf.mul(image, valueRange.scale), valueRange.offset); });
}
exports.shiftImageValue = shiftImageValue;
//# sourceMappingURL=shift_image_value.js.map