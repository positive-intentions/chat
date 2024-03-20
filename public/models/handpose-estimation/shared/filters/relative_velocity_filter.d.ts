import { VelocityFilterConfig } from '../calculators/interfaces/config_interfaces';
/**
 * This filter keeps track (on a window of specified size) of value changes
 * over time, which as result gives us velocity of how value changes over time.
 * With higher velocity it weights new values higher.
 *
 * Use `windowSize` and `velocityScale` to tweak this filter for your use case.
 */
export declare class RelativeVelocityFilter {
    private readonly config;
    private readonly window;
    private readonly lowPassFilter;
    private lastValue;
    private lastValueScale;
    private lastTimestamp;
    /**
     * Constructor of `RelativeVelocityFilter` class.
     * @param config
     *        `windowSize`:  Higher windowSize adds to lag and to stability.
     *        `velocityScale`: Lower velocityScale adds to lag and to stability.
     */
    constructor(config: VelocityFilterConfig);
    /**
     * Applies filter to the value.
     * @param value valueToFilter.
     * @param microSeconds timestamp associated with the value (for instance,
     *     timestamp of the frame where you got value from).
     * @param valueScale value scale (for instance, if your value is a distance
     *     detected on a frame, it can look same on different devices but have
     *     quite different absolute values due to different resolution, you
     *     should come up with an appropriate parameter for your particular use
     *     case).
     */
    apply(value: number, microSeconds: number, valueScale: number): number;
}
