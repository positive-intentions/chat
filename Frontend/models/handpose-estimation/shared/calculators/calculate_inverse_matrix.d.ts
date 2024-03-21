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
export declare type Matrix4x4Row = [number, number, number, number];
export declare type Matrix4x4 = [
    Matrix4x4Row,
    Matrix4x4Row,
    Matrix4x4Row,
    Matrix4x4Row
];
export declare function matrix4x4ToArray(matrix: Matrix4x4): number[];
export declare function arrayToMatrix4x4(array: ArrayLike<number>): Matrix4x4;
/**
 * Calculates inverse of an invertible 4x4 matrix.
 * @param matrix 4x4 matrix to invert.
 */
export declare function calculateInverseMatrix(matrix: Matrix4x4): Matrix4x4;
