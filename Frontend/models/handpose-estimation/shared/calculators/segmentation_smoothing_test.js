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
// tslint:disable-next-line: no-imports-from-dist
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
// tslint:disable-next-line: no-imports-from-dist
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var calculate_inverse_matrix_1 = require("./calculate_inverse_matrix");
var segmentation_smoothing_1 = require("./segmentation_smoothing");
function runTest(useWebGL, mixRatio) {
    var prevMask = (0, calculate_inverse_matrix_1.arrayToMatrix4x4)(new Array(16).fill(111 / 255));
    var curMask = (0, calculate_inverse_matrix_1.arrayToMatrix4x4)([
        0.00, 0.00, 0.00, 0.00,
        0.00, 0.98, 0.98, 0.00,
        0.00, 0.98, 0.98, 0.00,
        0.00, 0.00, 0.00, 0.00
    ]);
    tf.setBackend(useWebGL ? 'webgl' : 'cpu');
    var resultMask = (0, segmentation_smoothing_1.smoothSegmentation)(tf.tensor2d(prevMask), tf.tensor2d(curMask), { combineWithPreviousRatio: mixRatio });
    expect(resultMask.shape[0]).toBe(curMask.length);
    expect(resultMask.shape[1]).toBe(curMask[0].length);
    var result = resultMask.arraySync();
    if (mixRatio === 1.0) {
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                var input = curMask[i][j];
                var output = result[i][j];
                // Since the input has high value (250), it has low uncertainty.
                // So the output should have changed lower (towards prev),
                // but not too much.
                if (input > 0) {
                    expect(input).not.toBeCloseTo(output);
                }
                (0, test_util_1.expectNumbersClose)(input, output, 3.0 / 255.0);
            }
        }
    }
    else if (mixRatio === 0.0) {
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                var input = curMask[i][j];
                var output = result[i][j];
                (0, test_util_1.expectNumbersClose)(input, output, 1e-7); // Output should match current.
            }
        }
    }
    else {
        throw new Error("Invalid mixRatio: " + mixRatio);
    }
    return result;
}
(0, jasmine_util_1.describeWithFlags)('smoothSegmentation ', jasmine_util_1.BROWSER_ENVS, function () {
    it('test smoothing.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cpuResult, glResult, i, j;
        return __generator(this, function (_a) {
            runTest(false, 0.0);
            cpuResult = runTest(false, 1.0);
            glResult = runTest(true, 1.0);
            // CPU & webGL should match.
            for (i = 0; i < 4; ++i) {
                for (j = 0; j < 4; ++j) {
                    (0, test_util_1.expectNumbersClose)(cpuResult[i][j], glResult[i][j], 1e-7);
                }
            }
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=segmentation_smoothing_test.js.map