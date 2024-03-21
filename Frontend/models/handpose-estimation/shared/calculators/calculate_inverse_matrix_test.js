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
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var calculate_inverse_matrix_1 = require("./calculate_inverse_matrix");
describe('calculateInverseMatrix', function () {
    var identity = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    it('identity matrix.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var inverse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    inverse = (0, calculate_inverse_matrix_1.calculateInverseMatrix)(identity);
                    (0, test_util_1.expectArraysClose)((0, calculate_inverse_matrix_1.matrix4x4ToArray)(inverse), (0, calculate_inverse_matrix_1.matrix4x4ToArray)(identity));
                    return [2 /*return*/];
            }
        });
    }); });
    it('translation.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var matrix, inverse, expectedInverse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    matrix = [
                        [1.0, 0.0, 0.0, 2.0],
                        [0.0, 1.0, 0.0, -5.0],
                        [0.0, 0.0, 1.0, 0.0],
                        [0.0, 0.0, 0.0, 1.0],
                    ];
                    inverse = (0, calculate_inverse_matrix_1.calculateInverseMatrix)(matrix);
                    expectedInverse = [
                        [1.0, 0.0, 0.0, -2.0],
                        [0.0, 1.0, 0.0, 5.0],
                        [0.0, 0.0, 1.0, 0.0],
                        [0.0, 0.0, 0.0, 1.0],
                    ];
                    (0, test_util_1.expectArraysClose)((0, calculate_inverse_matrix_1.matrix4x4ToArray)(inverse), (0, calculate_inverse_matrix_1.matrix4x4ToArray)(expectedInverse));
                    return [2 /*return*/];
            }
        });
    }); });
    it('scale.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var matrix, inverse, expectedInverse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    matrix = [
                        [5.0, 0.0, 0.0, 0.0],
                        [0.0, 2.0, 0.0, 0.0],
                        [0.0, 0.0, 1.0, 0.0],
                        [0.0, 0.0, 0.0, 1.0],
                    ];
                    inverse = (0, calculate_inverse_matrix_1.calculateInverseMatrix)(matrix);
                    expectedInverse = [
                        [0.2, 0.0, 0.0, 0.0],
                        [0.0, 0.5, 0.0, 0.0],
                        [0.0, 0.0, 1.0, 0.0],
                        [0.0, 0.0, 0.0, 1.0],
                    ];
                    (0, test_util_1.expectArraysClose)((0, calculate_inverse_matrix_1.matrix4x4ToArray)(inverse), (0, calculate_inverse_matrix_1.matrix4x4ToArray)(expectedInverse));
                    return [2 /*return*/];
            }
        });
    }); });
    it('rotation90.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var matrix, inverse, expectedInverse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    matrix = [
                        [0.0, -1.0, 0.0, 0.0],
                        [1.0, 0.0, 0.0, 0.0],
                        [0.0, 0.0, 1.0, 0.0],
                        [0.0, 0.0, 0.0, 1.0],
                    ];
                    inverse = (0, calculate_inverse_matrix_1.calculateInverseMatrix)(matrix);
                    expectedInverse = [
                        [0.0, 1.0, 0.0, 0.0],
                        [-1.0, 0.0, 0.0, 0.0],
                        [0.0, 0.0, 1.0, 0.0],
                        [0.0, 0.0, 0.0, 1.0],
                    ];
                    (0, test_util_1.expectArraysClose)((0, calculate_inverse_matrix_1.matrix4x4ToArray)(inverse), (0, calculate_inverse_matrix_1.matrix4x4ToArray)(expectedInverse));
                    return [2 /*return*/];
            }
        });
    }); });
    it('precision.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var matrix, inverse, expectedInverse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    matrix = [
                        [0.00001, 0.0, 0.0, 0.0], [0.0, 0.00001, 0.0, 0.0], [0.0, 0.0, 1.0, 0.0],
                        [0.0, 0.0, 0.0, 1.0]
                    ];
                    inverse = (0, calculate_inverse_matrix_1.calculateInverseMatrix)(matrix);
                    expectedInverse = [
                        [100000.0, 0.0, 0.0, 0.0], [0.0, 100000.0, 0.0, 0.0],
                        [0.0, 0.0, 1.0, 0.0], [0.0, 0.0, 0.0, 1.0]
                    ];
                    (0, test_util_1.expectArraysClose)((0, calculate_inverse_matrix_1.matrix4x4ToArray)(inverse), (0, calculate_inverse_matrix_1.matrix4x4ToArray)(expectedInverse));
                    return [2 /*return*/];
            }
        });
    }); });
    it('random matrix.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var seed, matrix, inverse, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    seed = 1;
                    _a.label = 1;
                case 1:
                    if (!(seed <= 5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, tf.ready()];
                case 2:
                    _a.sent();
                    matrix = tf.randomUniform([4, 4], 0, 10, 'float32', seed);
                    inverse = (0, calculate_inverse_matrix_1.calculateInverseMatrix)((0, calculate_inverse_matrix_1.arrayToMatrix4x4)(matrix.dataSync()));
                    product = tf.matMul(matrix, inverse);
                    (0, test_util_1.expectArraysClose)(product.dataSync(), (0, calculate_inverse_matrix_1.matrix4x4ToArray)(identity));
                    _a.label = 3;
                case 3:
                    ++seed;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=calculate_inverse_matrix_test.js.map