import { Detection } from './interfaces/shape_interfaces';
export declare function nonMaxSuppression(detections: Detection[], maxDetections: number, iouThreshold: number, overlapType: 'intersection-over-union'): Promise<Detection[]>;
