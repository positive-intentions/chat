"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keypointsToNormalizedKeypoints = void 0;
function keypointsToNormalizedKeypoints(keypoints, imageSize) {
    return keypoints.map(function (keypoint) {
        var normalizedKeypoint = __assign(__assign({}, keypoint), { x: keypoint.x / imageSize.width, y: keypoint.y / imageSize.height });
        if (keypoint.z != null) {
            // Scale z the same way as x (using image width).
            keypoint.z = keypoint.z / imageSize.width;
        }
        return normalizedKeypoint;
    });
}
exports.keypointsToNormalizedKeypoints = keypointsToNormalizedKeypoints;
//# sourceMappingURL=keypoints_to_normalized_keypoints.js.map