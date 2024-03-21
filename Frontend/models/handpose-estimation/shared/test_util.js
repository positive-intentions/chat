"use strict";
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
exports.getXYPerFrame = exports.loadVideo = exports.segmentationIOU = exports.imageToBooleanMask = exports.loadImage = exports.KARMA_SERVER = void 0;
/** Karma server directory serving local files. */
exports.KARMA_SERVER = './base/test_data';
function loadImage(imagePath, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var img, promise;
        return __generator(this, function (_a) {
            img = new Image(width, height);
            promise = new Promise(function (resolve, reject) {
                img.crossOrigin = '';
                img.onload = function () {
                    resolve(img);
                };
            });
            img.src = exports.KARMA_SERVER + "/" + imagePath;
            return [2 /*return*/, promise];
        });
    });
}
exports.loadImage = loadImage;
/**
 * Converts an RGBA image to a binary foreground mask based on an RGBA
 * threshold.
 *
 * @param image Input image to convert.
 *
 * @param r Minimum red value that denotes a foreground mask.
 * @param g Minimum green value that denotes a foreground mask.
 * @param b Minimum blue value that denotes a foreground mask.
 *
 * @return A boolean array of size number of pixels.
 */
function imageToBooleanMask(rgbaData, r, g, b) {
    var mask = [];
    for (var i = 0; i < rgbaData.length; i += 4) {
        mask.push(rgbaData[i] >= r && rgbaData[i + 1] >= g && rgbaData[i + 2] >= b);
    }
    return mask;
}
exports.imageToBooleanMask = imageToBooleanMask;
/**
 * Given two boolean masks, calculates the IOU percentage.
 *
 * @param image Input image to convert.
 *
 * @param expectedMask Expected mask values.
 * @param actualMask Actual mask values.
 *
 * @return A number denoting the IOU.
 */
function segmentationIOU(expectedMask, actualMask) {
    expect(expectedMask.length === actualMask.length);
    var sum = function (mask) { return mask.reduce(function (a, b) { return a + +b; }, 0); };
    var intersectionMask = expectedMask.map(function (value, index) { return value && actualMask[index]; });
    var iou = sum(intersectionMask) /
        (sum(expectedMask) + sum(actualMask) - sum(intersectionMask) +
            Number.EPSILON);
    return iou;
}
exports.segmentationIOU = segmentationIOU;
function loadVideo(videoPath, videoFPS, callback, expected, skeletonAdjacentPairs, simulatedInterval) {
    return __awaiter(this, void 0, void 0, function () {
        var simulatedTimestamp, idx, actualInterval, video, source, canvas, ctx, promise;
        var _this = this;
        return __generator(this, function (_a) {
            actualInterval = 1 / videoFPS;
            video = document.createElement('video');
            // Hide video, and use canvas to render the video, so that we can also
            // overlay keypoints.
            video.style.visibility = 'hidden';
            source = document.createElement('source');
            source.src = exports.KARMA_SERVER + "/" + videoPath;
            source.type = 'video/mp4';
            video.appendChild(source);
            document.body.appendChild(video);
            canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.left = '0';
            canvas.style.top = '0';
            document.body.appendChild(canvas);
            ctx = canvas.getContext('2d');
            promise = new Promise(function (resolve, reject) {
                video.onseeked = function () { return __awaiter(_this, void 0, void 0, function () {
                    var keypoints, expectedKeypoints, nextTime;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, callback(video, simulatedTimestamp)];
                            case 1:
                                keypoints = _a.sent();
                                expectedKeypoints = expected[idx].map(function (_a) {
                                    var x = _a[0], y = _a[1];
                                    return { x: x, y: y };
                                });
                                ctx.drawImage(video, 0, 0);
                                draw(expectedKeypoints, ctx, skeletonAdjacentPairs, 'Green');
                                draw(keypoints, ctx, skeletonAdjacentPairs, 'Red');
                                nextTime = video.currentTime + actualInterval;
                                if (nextTime < video.duration) {
                                    video.currentTime = nextTime;
                                    simulatedTimestamp += simulatedInterval;
                                    idx++;
                                }
                                else {
                                    resolve(video);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
            });
            video.onloadedmetadata = function () {
                video.currentTime = 0.001;
                simulatedTimestamp = 0;
                idx = 0;
                var videoWidth = video.videoWidth;
                var videoHeight = video.videoHeight;
                // Must set below two lines, otherwise video width and height are 0.
                video.width = videoWidth;
                video.height = videoHeight;
                // Must set below two lines, otherwise canvas has a different size.
                canvas.width = videoWidth;
                canvas.height = videoHeight;
            };
            return [2 /*return*/, promise];
        });
    });
}
exports.loadVideo = loadVideo;
function getXYPerFrame(result) {
    return result.map(function (frameResult) {
        return frameResult.map(function (keypoint) { return [keypoint[0], keypoint[1]]; });
    });
}
exports.getXYPerFrame = getXYPerFrame;
function drawKeypoint(keypoint, ctx) {
    var circle = new Path2D();
    circle.arc(keypoint.x, keypoint.y, 4 /* radius */, 0 /* startAngle */, 2 * Math.PI);
    ctx.fill(circle);
    ctx.stroke(circle);
}
function drawSkeleton(keypoints, skeletonAdjacentPairs, ctx, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (var _i = 0, skeletonAdjacentPairs_1 = skeletonAdjacentPairs; _i < skeletonAdjacentPairs_1.length; _i++) {
        var pair = skeletonAdjacentPairs_1[_i];
        var i = pair[0], j = pair[1];
        var kp1 = keypoints[i];
        var kp2 = keypoints[j];
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
    }
}
function draw(keypoints, ctx, skeletonAdjacentPairs, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    for (var _i = 0, keypoints_1 = keypoints; _i < keypoints_1.length; _i++) {
        var keypoint = keypoints_1[_i];
        drawKeypoint(keypoint, ctx);
    }
    drawSkeleton(keypoints, skeletonAdjacentPairs, ctx, color);
}
//# sourceMappingURL=test_util.js.map