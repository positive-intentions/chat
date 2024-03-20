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
exports.calculateAssociationNormRect = exports.getBoundingBox = void 0;
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
exports.getBoundingBox = getBoundingBox;
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
exports.calculateAssociationNormRect = calculateAssociationNormRect;
//# sourceMappingURL=association_norm_rect.js.map