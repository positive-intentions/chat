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
exports.landmarksRefinement = void 0;
function getNumberOfRefinedLandmarks(refinements) {
    // Gather all used indexes.
    var indices = [].concat.apply([], refinements.map(function (refinement) { return refinement.indexesMapping; }));
    if (indices.length === 0) {
        throw new Error('There should be at least one landmark in indexes mapping');
    }
    var minIndex = indices[0], maxIndex = indices[0];
    var uniqueIndices = new Set(indices);
    uniqueIndices.forEach(function (index) {
        minIndex = Math.min(minIndex, index);
        maxIndex = Math.max(maxIndex, index);
    });
    // Check that indxes start with 0 and there is no gaps between min and max
    // indexes.
    var numIndices = uniqueIndices.size;
    if (minIndex !== 0) {
        throw new Error("Indexes are expected to start with 0 instead of " + minIndex);
    }
    if (maxIndex + 1 !== numIndices) {
        throw new Error("Indexes should have no gaps but " + (maxIndex - numIndices + 1) + " indexes are missing");
    }
    return numIndices;
}
function refineXY(indexesMapping, landmarks, refinedLandmarks) {
    for (var i = 0; i < landmarks.length; ++i) {
        var landmark = landmarks[i];
        var refinedLandmark = refinedLandmarks[indexesMapping[i]];
        refinedLandmark.x = landmark.x;
        refinedLandmark.y = landmark.y;
    }
}
function getZAverage(landmarks, indexes) {
    var zSum = 0;
    for (var i = 0; i < indexes.length; ++i) {
        zSum += landmarks[indexes[i]].z;
    }
    return zSum / indexes.length;
}
function refineZ(indexesMapping, zRefinement, landmarks, refinedLandmarks) {
    if (typeof zRefinement === 'string') {
        switch (zRefinement) {
            case 'copy': {
                for (var i = 0; i < landmarks.length; ++i) {
                    refinedLandmarks[indexesMapping[i]].z = landmarks[i].z;
                }
                break;
            }
            case 'none':
            default: {
                // Do nothing and keep Z that is already in refined landmarks.
                break;
            }
        }
    }
    else {
        var zAverage = getZAverage(refinedLandmarks, zRefinement);
        for (var i = 0; i < indexesMapping.length; ++i) {
            refinedLandmarks[indexesMapping[i]].z = zAverage;
        }
    }
}
/**
 * Refine one set of landmarks with another.
 *
 * @param allLandmarks List of landmarks to use for refinement. They will be
 *     applied to the output in the provided order. Each list should be non
 *     empty and contain the same amount of landmarks as indexes in mapping.
 * @param refinements Refinement instructions for input landmarks.
 *
 * @returns A list of refined landmarks.
 */
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/util/landmarks_refinement_calculator.cc
function landmarksRefinement(allLandmarks, refinements) {
    // Initialize refined landmarks list.
    var numRefinedLandmarks = getNumberOfRefinedLandmarks(refinements);
    var refinedLandmarks = new Array(numRefinedLandmarks).fill(null).map(Object);
    // Apply input landmarks to output refined landmarks in provided order.
    for (var i = 0; i < allLandmarks.length; ++i) {
        var landmarks = allLandmarks[i];
        var refinement = refinements[i];
        if (landmarks.length !== refinement.indexesMapping.length) {
            // Check number of landmarks in mapping and stream are the same.
            throw new Error("There are " + landmarks.length + " refinement landmarks while mapping has " + refinement.indexesMapping.length);
        }
        // Refine X and Y.
        refineXY(refinement.indexesMapping, landmarks, refinedLandmarks);
        // Refine Z.
        refineZ(refinement.indexesMapping, refinement.zRefinement, landmarks, refinedLandmarks);
        // Visibility and presence are not currently refined and are left as `0`.
    }
    return refinedLandmarks;
}
exports.landmarksRefinement = landmarksRefinement;
//# sourceMappingURL=landmarks_refinement.js.map