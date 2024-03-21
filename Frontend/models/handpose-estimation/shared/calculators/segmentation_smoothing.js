"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smoothSegmentation = void 0;
var tf = require("@tensorflow/tfjs-core");
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
// ref:
// https://github.com/google/mediapipe/blob/master/mediapipe/calculators/image/segmentation_smoothing_calculator.cc
function smoothSegmentation(prevMask, newMask, config) {
    if (tf.getBackend() === 'webgl') {
        // Same as implementation in the else case but reduces number of shader
        // calls to 1 instead of 17.
        return smoothSegmentationWebGL(prevMask, newMask, config);
    }
    return tf.tidy(function () {
        /*
         * Assume p := newMaskValue
         * H(p) := 1 + (p * log(p) + (1-p) * log(1-p)) / log(2)
         * uncertainty alpha(p) =
         *   Clamp(1 - (1 - H(p)) * (1 - H(p)), 0, 1) [squaring the
         * uncertainty]
         *
         * The following polynomial approximates uncertainty alpha as a
         * function of (p + 0.5):
         */
        var c1 = 5.68842;
        var c2 = -0.748699;
        var c3 = -57.8051;
        var c4 = 291.309;
        var c5 = -624.717;
        var t = tf.sub(newMask, 0.5);
        var x = tf.square(t);
        // Per element calculation is: 1.0 - Math.min(1.0, x * (c1 + x * (c2 + x
        // * (c3 + x * (c4 + x * c5))))).
        var uncertainty = tf.sub(1, tf.minimum(1, tf.mul(x, tf.add(c1, tf.mul(x, tf.add(c2, tf.mul(x, tf.add(c3, tf.mul(x, tf.add(c4, tf.mul(x, c5)))))))))));
        // Per element calculation is: newMaskValue + (prevMaskValue -
        // newMaskValue) * (uncertainty * combineWithPreviousRatio).
        return tf.add(newMask, tf.mul(tf.sub(prevMask, newMask), tf.mul(uncertainty, config.combineWithPreviousRatio)));
    });
}
exports.smoothSegmentation = smoothSegmentation;
function smoothSegmentationWebGL(prevMask, newMask, config) {
    var ratio = config.combineWithPreviousRatio.toFixed(2);
    var program = {
        variableNames: ['prevMask', 'newMask'],
        outputShape: prevMask.shape,
        userCode: "\n  void main() {\n      ivec2 coords = getOutputCoords();\n      int height = coords[0];\n      int width = coords[1];\n\n      float prevMaskValue = getPrevMask(height, width);\n      float newMaskValue = getNewMask(height, width);\n\n      /*\n      * Assume p := newMaskValue\n      * H(p) := 1 + (p * log(p) + (1-p) * log(1-p)) / log(2)\n      * uncertainty alpha(p) =\n      *   Clamp(1 - (1 - H(p)) * (1 - H(p)), 0, 1) [squaring the\n      * uncertainty]\n      *\n      * The following polynomial approximates uncertainty alpha as a\n      * function of (p + 0.5):\n      */\n      const float c1 = 5.68842;\n      const float c2 = -0.748699;\n      const float c3 = -57.8051;\n      const float c4 = 291.309;\n      const float c5 = -624.717;\n      float t = newMaskValue - 0.5;\n      float x = t * t;\n\n      float uncertainty =\n        1.0 - min(1.0, x * (c1 + x * (c2 + x * (c3 + x * (c4 + x * c5)))));\n\n      float outputValue = newMaskValue + (prevMaskValue - newMaskValue) *\n                             (uncertainty * " + ratio + ");\n\n      setOutput(outputValue);\n    }\n"
    };
    var webglBackend = tf.backend();
    return tf.tidy(function () {
        var outputTensorInfo = webglBackend.compileAndRun(program, [prevMask, newMask]);
        return tf.engine().makeTensorFromDataId(outputTensorInfo.dataId, outputTensorInfo.shape, outputTensorInfo.dtype);
    });
}
//# sourceMappingURL=segmentation_smoothing.js.map