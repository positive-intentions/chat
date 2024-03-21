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
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeNewRotation = exports.transformNormalizedRect = void 0;
var image_utils_1 = require("./image_utils");
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
exports.transformNormalizedRect = transformNormalizedRect;
function computeNewRotation(rotation, config) {
    if (config.rotation != null) {
        rotation += config.rotation;
    }
    else if (config.rotationDegree != null) {
        rotation += Math.PI * config.rotationDegree / 180;
    }
    return (0, image_utils_1.normalizeRadians)(rotation);
}
exports.computeNewRotation = computeNewRotation;
//# sourceMappingURL=transform_rect.js.map