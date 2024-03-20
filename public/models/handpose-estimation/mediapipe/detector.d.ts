import { HandDetector } from '../hand_detector';
import { MediaPipeHandsMediaPipeModelConfig } from './types';
/**
 * Loads the MediaPipe solution.
 *
 * @param modelConfig An object that contains parameters for
 * the MediaPipeHands loading process. Please find more details of each
 * parameters in the documentation of the `MediaPipeHandsMediaPipeModelConfig`
 * interface.
 */
export declare function load(modelConfig: MediaPipeHandsMediaPipeModelConfig): Promise<HandDetector>;
