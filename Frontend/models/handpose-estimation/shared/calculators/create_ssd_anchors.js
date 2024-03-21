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
exports.createSsdAnchors = void 0;
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
exports.createSsdAnchors = createSsdAnchors;
function calculateScale(minScale, maxScale, strideIndex, numStrides) {
    if (numStrides === 1) {
        return (minScale + maxScale) * 0.5;
    }
    else {
        return minScale + (maxScale - minScale) * strideIndex / (numStrides - 1);
    }
}
//# sourceMappingURL=create_ssd_anchors.js.map