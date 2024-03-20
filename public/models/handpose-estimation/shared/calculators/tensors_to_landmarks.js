"use strict";
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
exports.tensorsToLandmarks = void 0;
var sigmoid_1 = require("./sigmoid");
function applyActivation(activation, value) {
    return activation === 'none' ? value : (0, sigmoid_1.sigmoid)(value);
}
/**
 * A calculator for converting Tensors from regression models into landmarks.
 * Note that if the landmarks in the tensor has more than 5 dimensions, only the
 * first 5 dimensions will be converted to [x,y,z, visibility, presence]. The
 * latter two fields may also stay unset if such attributes are not supported in
 * the model.
 * @param landmarkTensor List of Tensors of type float32. Only the first tensor
 * will be used. The size of the values must be (num_dimension x num_landmarks).
 * @param flipHorizontally Optional. Whether to flip landmarks horizontally or
 * not. Overrides corresponding field in config.
 * @param flipVertically Optional. Whether to flip landmarks vertically or not.
 * Overrides corresponding field in config.
 *
 * @param config
 *
 * @returns Normalized landmarks.
 */
function tensorsToLandmarks(landmarkTensor, config, flipHorizontally, flipVertically) {
    return __awaiter(this, void 0, void 0, function () {
        var numValues, numDimensions, rawLandmarks, outputLandmarks, ld, offset, landmark, i, landmark;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flipHorizontally = flipHorizontally || config.flipHorizontally || false;
                    flipVertically = flipVertically || config.flipVertically || false;
                    numValues = landmarkTensor.size;
                    numDimensions = numValues / config.numLandmarks;
                    return [4 /*yield*/, landmarkTensor.data()];
                case 1:
                    rawLandmarks = _a.sent();
                    outputLandmarks = [];
                    for (ld = 0; ld < config.numLandmarks; ++ld) {
                        offset = ld * numDimensions;
                        landmark = { x: 0, y: 0 };
                        if (flipHorizontally) {
                            landmark.x = config.inputImageWidth - rawLandmarks[offset];
                        }
                        else {
                            landmark.x = rawLandmarks[offset];
                        }
                        if (numDimensions > 1) {
                            if (flipVertically) {
                                landmark.y = config.inputImageHeight - rawLandmarks[offset + 1];
                            }
                            else {
                                landmark.y = rawLandmarks[offset + 1];
                            }
                        }
                        if (numDimensions > 2) {
                            landmark.z = rawLandmarks[offset + 2];
                        }
                        if (numDimensions > 3) {
                            landmark.score = applyActivation(config.visibilityActivation, rawLandmarks[offset + 3]);
                        }
                        // presence is in rawLandmarks[offset + 4], we don't expose it.
                        outputLandmarks.push(landmark);
                    }
                    for (i = 0; i < outputLandmarks.length; ++i) {
                        landmark = outputLandmarks[i];
                        landmark.x = landmark.x / config.inputImageWidth;
                        landmark.y = landmark.y / config.inputImageHeight;
                        // Scale Z coordinate as X + allow additional uniform normalization.
                        landmark.z = landmark.z / config.inputImageWidth / (config.normalizeZ || 1);
                    }
                    return [2 /*return*/, outputLandmarks];
            }
        });
    });
}
exports.tensorsToLandmarks = tensorsToLandmarks;
//# sourceMappingURL=tensors_to_landmarks.js.map