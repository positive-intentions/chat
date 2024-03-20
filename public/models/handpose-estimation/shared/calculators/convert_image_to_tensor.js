"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImageToTensor = void 0;
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
var get_rotated_sub_rect_to_rect_transformation_matrix_1 = require("./get_rotated_sub_rect_to_rect_transformation_matrix");
var image_utils_1 = require("./image_utils");
var shift_image_value_1 = require("./shift_image_value");
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
    var imageSize = (0, image_utils_1.getImageSize)(image);
    var roi = (0, image_utils_1.getRoi)(imageSize, normRect);
    var padding = (0, image_utils_1.padRoi)(roi, outputTensorSize, keepAspectRatio);
    var transformationMatrix = (0, get_rotated_sub_rect_to_rect_transformation_matrix_1.getRotatedSubRectToRectTransformMatrix)(roi, imageSize.width, imageSize.height, false);
    var imageTensor = tf.tidy(function () {
        var $image = (0, image_utils_1.toImageTensor)(image);
        var transformMatrix = tf.tensor2d((0, image_utils_1.getProjectiveTransformMatrix)(transformationMatrix, imageSize, outputTensorSize), [1, 8]);
        var fillMode = borderMode === 'zero' ? 'constant' : 'nearest';
        var imageTransformed = tf.image.transform(
        // tslint:disable-next-line: no-unnecessary-type-assertion
        tf.expandDims(tf.cast($image, 'float32')), transformMatrix, 'bilinear', fillMode, 0, [outputTensorSize.height, outputTensorSize.width]);
        var imageShifted = outputTensorFloatRange != null ?
            (0, shift_image_value_1.shiftImageValue)(imageTransformed, outputTensorFloatRange) :
            imageTransformed;
        return imageShifted;
    });
    return { imageTensor: imageTensor, padding: padding, transformationMatrix: transformationMatrix };
}
exports.convertImageToTensor = convertImageToTensor;
//# sourceMappingURL=convert_image_to_tensor.js.map