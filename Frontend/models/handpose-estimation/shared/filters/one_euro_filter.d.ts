import { OneEuroFilterConfig } from '../calculators/interfaces/config_interfaces';
/**
 * OneEuroFilter.
 */
export declare class OneEuroFilter {
    private readonly minCutOff;
    private readonly beta;
    private readonly derivateCutOff;
    private readonly x;
    private readonly dx;
    private readonly thresholdCutOff;
    private readonly thresholdBeta;
    private frequency;
    private lastTimestamp;
    /**
     * Constructor of `OneEuroFilter` class.
     * @param config See documentation of `OneEuroFilterConfig`.
     */
    constructor(config: OneEuroFilterConfig);
    /**
     * Applies filter to the value.
     * @param value valueToFilter.
     * @param microSeconds timestamp associated with the value (for instance,
     *     timestamp of the frame where you got value from).
     */
    apply(value: number, microSeconds: number, valueScale: number): number;
    private getAlpha;
}
