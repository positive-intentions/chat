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
// tslint:disable-next-line: no-imports-from-dist
var test_util_1 = require("@tensorflow/tfjs-core/dist/test_util");
var test_util_2 = require("../test_util");
var create_ssd_anchors_1 = require("./create_ssd_anchors");
var EPS = 1e-5;
function compareAnchors(actual, expected) {
    expect(actual.length).toBe(expected.length);
    for (var i = 0; i < actual.length; ++i) {
        var actualAnchor = actual[i];
        var expectedAnchor = expected[i];
        for (var _i = 0, _a = ['xCenter', 'yCenter', 'width', 'height']; _i < _a.length; _i++) {
            var key = _a[_i];
            var actualValue = actualAnchor[key];
            var expectedValue = expectedAnchor[key];
            (0, test_util_1.expectNumbersClose)(actualValue, expectedValue, EPS);
        }
    }
}
function parseAnchors(anchorsValues) {
    return anchorsValues.map(function (anchorValues) { return ({
        xCenter: anchorValues[0],
        yCenter: anchorValues[1],
        width: anchorValues[2],
        height: anchorValues[3]
    }); });
}
describe('createSsdAnchors', function () {
    it('face detection config.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedAnchors, _a, config, actualAnchors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = parseAnchors;
                    return [4 /*yield*/, fetch(test_util_2.KARMA_SERVER + "/shared/anchor_golden_file_0.json")
                            .then(function (response) { return response.json(); })];
                case 1:
                    expectedAnchors = _a.apply(void 0, [_b.sent()]);
                    config = {
                        featureMapHeight: [],
                        featureMapWidth: [],
                        numLayers: 5,
                        minScale: 0.1171875,
                        maxScale: 0.75,
                        inputSizeHeight: 256,
                        inputSizeWidth: 256,
                        anchorOffsetX: 0.5,
                        anchorOffsetY: 0.5,
                        strides: [8, 16, 32, 32, 32],
                        aspectRatios: [1.0],
                        fixedAnchorSize: true
                    };
                    actualAnchors = (0, create_ssd_anchors_1.createSsdAnchors)(config);
                    compareAnchors(actualAnchors, expectedAnchors);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3 inputs reverse.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedAnchors, _a, config, actualAnchors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = parseAnchors;
                    return [4 /*yield*/, fetch(test_util_2.KARMA_SERVER + "/shared/anchor_golden_file_1.json")
                            .then(function (response) { return response.json(); })];
                case 1:
                    expectedAnchors = _a.apply(void 0, [_b.sent()]);
                    config = {
                        featureMapHeight: [],
                        featureMapWidth: [],
                        numLayers: 6,
                        minScale: 0.2,
                        maxScale: 0.95,
                        inputSizeHeight: 300,
                        inputSizeWidth: 300,
                        anchorOffsetX: 0.5,
                        anchorOffsetY: 0.5,
                        strides: [16, 32, 64, 128, 256, 512],
                        aspectRatios: [1.0, 2.0, 0.5, 3.0, 0.3333],
                        reduceBoxesInLowestLayer: true
                    };
                    actualAnchors = (0, create_ssd_anchors_1.createSsdAnchors)(config);
                    compareAnchors(actualAnchors, expectedAnchors);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=create_ssd_anchors_test.js.map