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
var association_norm_rect_1 = require("./association_norm_rect");
//  0.4                                         ================
//                                              |    |    |    |
//  0.3 =====================                   |   NR2   |    |
//      |    |    |   NR1   |                   |    |    NR4  |
//  0.2 |   NR0   |    ===========              ================
//      |    |    |    |    |    |
//  0.1 =====|===============    |
//           |    NR3  |    |    |
//  0.0      ================    |
//                     |   NR5   |
// -0.1                ===========
//     0.1  0.2  0.3  0.4  0.5  0.6  0.7  0.8  0.9  1.0  1.1  1.2
// NormalizedRect nr0.
var nr0 = {
    xCenter: 0.2,
    yCenter: 0.2,
    width: 0.2,
    height: 0.2
};
// NormalizedRect nr1.
var nr1 = {
    xCenter: 0.4,
    yCenter: 0.2,
    width: 0.2,
    height: 0.2
};
// NormalizedRect nr2.
var nr2 = {
    xCenter: 1.0,
    yCenter: 0.3,
    width: 0.2,
    height: 0.2
};
// NormalizedRect nr3.
var nr3 = {
    xCenter: 0.35,
    yCenter: 0.15,
    width: 0.3,
    height: 0.3
};
// NormalizedRect nr4.
var nr4 = {
    xCenter: 1.1,
    yCenter: 0.3,
    width: 0.2,
    height: 0.2
};
// NormalizedRect nr5.
var nr5 = {
    xCenter: 0.45,
    yCenter: 0.05,
    width: 0.3,
    height: 0.3
};
describe('calculateAssociationNormRect', function () {
    it('3 inputs.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var minSimilarityThreshold, inputList0, inputList1, inputList2, result;
        return __generator(this, function (_a) {
            minSimilarityThreshold = 0.1;
            inputList0 = [nr0, nr1, nr2];
            inputList1 = [nr3, nr4];
            inputList2 = [nr5];
            result = (0, association_norm_rect_1.calculateAssociationNormRect)([inputList0, inputList1, inputList2], minSimilarityThreshold);
            // nr3 overlaps with nr0, nr1 and nr5 overlaps with nr3. Since nr5 is
            // in the highest priority, we remove other rects.
            // nr4 overlaps with nr2, and nr4 is higher priority, so we keep it.
            // The final output therefore contains 2 elements.
            expect(result.length).toBe(2);
            // Outputs are in order of inputs, so nr4 is before nr5 in output vector.
            // det_4 overlaps with det_2.
            expect(result[0]).toBe(nr4);
            // det_3 overlaps with det_0.
            // det_3 overlaps with det_1.
            // det_5 overlaps with det_3.
            expect(result[1]).toBe(nr5);
            return [2 /*return*/];
        });
    }); });
    it('3 inputs reverse.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var minSimilarityThreshold, inputList0, inputList1, inputList2, result;
        return __generator(this, function (_a) {
            minSimilarityThreshold = 0.1;
            inputList0 = [nr5];
            inputList1 = [nr3, nr4];
            inputList2 = [nr0, nr1, nr2];
            result = (0, association_norm_rect_1.calculateAssociationNormRect)([inputList0, inputList1, inputList2], minSimilarityThreshold);
            // nr3 overlaps with nr5, so nr5 is removed. nr0 overlaps with nr3, so
            // nr3 is removed as nr0 is in higher priority for keeping. nr2 overlaps
            // with nr4 so nr4 is removed as nr2 is higher priority for keeping.
            // The final output therefore contains 3 elements.
            expect(result.length).toBe(3);
            // Outputs are in order of inputs, so nr4 is before nr5 in output vector.
            // Outputs are in same order as inputs.
            expect(result[0]).toBe(nr0);
            expect(result[1]).toBe(nr1);
            expect(result[2]).toBe(nr2);
            return [2 /*return*/];
        });
    }); });
    it('single input.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var minSimilarityThreshold, inputList0, result;
        return __generator(this, function (_a) {
            minSimilarityThreshold = 0.1;
            inputList0 = [nr3, nr5];
            result = (0, association_norm_rect_1.calculateAssociationNormRect)([inputList0], minSimilarityThreshold);
            // nr5 overlaps with nr3. Since nr5 is after nr3 in the same input
            // stream we remove nr3 and keep nr5. The final output therefore contains
            // 1 elements.
            expect(result.length).toBe(1);
            expect(result[0]).toBe(nr5);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=association_norm_rect_test.js.map