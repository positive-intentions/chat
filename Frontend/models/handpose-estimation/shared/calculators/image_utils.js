"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectiveTransformMatrix = exports.getRoi = exports.padRoi = exports.toImageTensor = exports.transformValueRange = exports.normalizeRadians = exports.getImageSize = void 0;
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
function getImageSize(input) {
    if (input instanceof tf.Tensor) {
        return { height: input.shape[0], width: input.shape[1] };
    }
    else {
        return { height: input.height, width: input.width };
    }
}
exports.getImageSize = getImageSize;
/**
 * Normalizes the provided angle to the range -pi to pi.
 * @param angle The angle in radians to be normalized.
 */
function normalizeRadians(angle) {
    return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI));
}
exports.normalizeRadians = normalizeRadians;
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
exports.transformValueRange = transformValueRange;
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
exports.toImageTensor = toImageTensor;
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
exports.padRoi = padRoi;
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
exports.getRoi = getRoi;
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
exports.getProjectiveTransformMatrix = getProjectiveTransformMatrix;
function validateSize(size, name) {
    tf.util.assert(size.width !== 0, function () { return name + " width cannot be 0."; });
    tf.util.assert(size.height !== 0, function () { return name + " height cannot be 0."; });
}
//# sourceMappingURL=image_utils.js.map