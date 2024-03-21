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
exports.normalizedKeypointsToKeypoints = void 0;
function normalizedKeypointsToKeypoints(normalizedKeypoints, imageSize) {
    return normalizedKeypoints.map(function (normalizedKeypoint) {
        var keypoint = __assign(__assign({}, normalizedKeypoint), { x: normalizedKeypoint.x * imageSize.width, y: normalizedKeypoint.y * imageSize.height });
        if (normalizedKeypoint.z != null) {
            // Scale z the same way as x (using image width).
            keypoint.z = normalizedKeypoint.z * imageSize.width;
        }
        return keypoint;
    });
}
exports.normalizedKeypointsToKeypoints = normalizedKeypointsToKeypoints;
//# sourceMappingURL=normalized_keypoints_to_keypoints.js.map