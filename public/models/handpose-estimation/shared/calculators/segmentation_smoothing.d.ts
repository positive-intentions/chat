import * as tf from '@tensorflow/tfjs-core';
import { SegmentationSmoothingConfig } from './interfaces/config_interfaces';
/**
 * A calculator for mixing two segmentation masks together, based on an
 * uncertantity probability estimate.
 * @param prevMaks Segmentation mask from previous image.
 * @param newMask Segmentation mask of current image.
 * @param config Contains ratio of amount of previous mask to blend with
 *     current.
 *
 * @returns Image mask.
 */
export declare function smoothSegmentation(prevMask: tf.Tensor2D, newMask: tf.Tensor2D, config: SegmentationSmoothingConfig): tf.Tensor2D;
