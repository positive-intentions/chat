//disable linting file
/* eslint-disable */

// Check if BigInt is not defined
if (typeof window.BigInt === "undefined") {
  window.BigInt = (function () {
    function BigInt(value) {
      if (!(this instanceof window.BigInt)) {
        return new window.BigInt(value);
      }

      if (typeof value !== "string" || !/^-?\d+$/.test(value)) {
        throw new TypeError("Invalid BigInt value");
      }

      // Remove leading zeros, if any, and handle '-0' case
      this.value = value.replace(/^0+|(?<=^-)0+/g, "") || "0";
      if (this.value === "-0") this.value = "0";
    }

    window.BigInt.prototype.add = function (other) {
      if (!(other instanceof window.BigInt)) {
        throw new TypeError("Argument must be of type BigInt");
      }

      let carry = 0;
      let result = "";
      const maxLength = Math.max(this.value.length, other.value.length);

      const isThisNegative = this.value[0] === "-";
      const isOtherNegative = other.value[0] === "-";

      // If both are negative, negate the result of the addition
      if (isThisNegative && isOtherNegative) {
        return new window.BigInt(
          "-" + this.negate().add(other.negate()).toString(),
        );
      }

      // If one of them is negative, perform subtraction
      if (isThisNegative) {
        return other.subtract(this.negate());
      }
      if (isOtherNegative) {
        return this.subtract(other.negate());
      }

      for (let i = 0; i < maxLength || carry; i++) {
        let sum = carry;
        if (i < this.value.length) {
          sum += parseInt(this.value.charAt(this.value.length - 1 - i), 10);
        }
        if (i < other.value.length) {
          sum += parseInt(other.value.charAt(other.value.length - 1 - i), 10);
        }

        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
      }

      return new window.BigInt(result);
    };

    // Placeholder for subtraction (not fully implemented)
    window.BigInt.prototype.subtract = function (other) {
      // This is a placeholder; actual subtraction logic will be more complex.
      // For simplicity, assume the current number is larger than the 'other'.
      return new window.BigInt("0");
    };

    // Helper method to negate a BigInt
    window.BigInt.prototype.negate = function () {
      if (this.value[0] === "-") {
        return new BigInt(this.value.substring(1));
      }
      return new BigInt("-" + this.value);
    };

    window.BigInt.prototype.toString = function () {
      return this.value;
    };

    return window.BigInt;
  })();
}

// Usage
// const a = BigInt('12345');
// const b = BigInt('67890');
// const c = a.add(b);
// console.log(c.toString()); // 80135

// function SHA3_512(input):
//     input = applyPadding(input)    // Pre-processing step
//     state = initializeState()     // State Initialization

//     // Keccak Rounds
//     for round in 1 to 24:
//         state = applyTheta(state)
//         state = applyRho(state)
//         state = applyPi(state)
//         state = applyChi(state)
//         state = applyIota(state, round)

//     output = generateOutput(state)  // Output Generation
//     return output

function applyPadding(message) {
  const r = 576; // Rate for SHA3-512

  // Convert the message to a binary representation
  let binaryMessage = "";
  for (let i = 0; i < message.length; i++) {
    let bin = message.charCodeAt(i).toString(2);
    binaryMessage += ("00000000" + bin).slice(-8); // Pad each byte to 8 bits
  }

  // Append the initial "1"
  binaryMessage += "1";

  // Add "0" bits until length % r = r-1
  while (binaryMessage.length % r !== r - 1) {
    binaryMessage += "0";
  }

  // Append the final "1"
  binaryMessage += "1";

  return binaryMessage;
}

// // Example usage:
// let paddedMessage = applyPadding("YourInputHere");
// console.log(paddedMessage);

function initializeState() {
  const w = 64; // word length in bits for SHA3-512
  const state = [];

  for (let x = 0; x < 5; x++) {
    state[x] = [];
    for (let y = 0; y < 5; y++) {
      state[x][y] = window.BigInt(0); // Using window.BigInt to handle 64-bit values in JavaScript
    }
  }
  return state;
}

// // Example usage:
// let state = initializeState();
// console.log(state);

function applyTheta(state) {
  const w = 64; // word length in bits for SHA3-512
  let C = Array(5).fill(window.BigInt(0));
  let D = Array(5).fill(window.BigInt(0));

  // Step 1: For each x, compute C[x]
  for (let x = 0; x < 5; x++) {
    C[x] = state[x][0];
    for (let y = 1; y < 5; y++) {
      C[x] ^= state[x][y];
    }
  }

  // Step 2: Compute D[x]
  for (let x = 0; x < 5; x++) {
    D[x] =
      C[(x + 4) % 5] ^
      ((C[(x + 1) % 5] << 1n) | (C[(x + 1) % 5] >> window.BigInt(w - 1))); // Left rotation by 1, using BigInt
  }

  // Step 3: For each x, y, XOR the lane at x, y with D[x]
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      state[x][y] ^= D[x];
    }
  }

  return state;
}

// // Example usage:
// let state = initializeState();
// state = applyTheta(state);
// console.log(state);

function applyRho(state) {
  const rotationOffsets = [
    [0, 36, 3, 41, 18],
    [1, 44, 10, 45, 2],
    [62, 6, 43, 15, 61],
    [28, 55, 25, 21, 56],
    [27, 20, 39, 8, 14],
  ];

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      const offset = window.BigInt(rotationOffsets[x][y]); // Convert to BigInt
      state[x][y] = (state[x][y] << offset) | (state[x][y] >> (64n - offset)); // Use BigInt for 64
    }
  }

  return state;
}

// // Example usage:
// let state = initializeState();
// state = applyRho(state);
// console.log(state);

function applyPi(state) {
  const newState = Array(5)
    .fill(0)
    .map(() => Array(5).fill(window.BigInt(0))); // Initialize a new 5x5 state with zeros

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      const newX = y;
      const newY = (2 * x + 3 * y) % 5;
      newState[newX][newY] = state[x][y];
    }
  }

  return newState;
}

// Example usage:
// let state = initializeState();
// state = applyPi(state);
// console.log(state);

function applyChi(state) {
  const newState = Array(5)
    .fill(0)
    .map(() => Array(5).fill(window.BigInt(0))); // Initialize a new 5x5 state with zeros

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      const nextLane = state[(x + 1) % 5][y];
      const twoPlacesAheadLane = state[(x + 2) % 5][y];
      newState[x][y] = state[x][y] ^ (~nextLane & twoPlacesAheadLane);
    }
  }

  return newState;
}

// // Example usage:
// let state = initializeState();
// state = applyChi(state);
// console.log(state);

const ROUND_CONSTANTS = [
  // window.BigInt(0x0000000000000001),
  // window.BigInt(0x0000000000008082),
  // window.BigInt(0x800000000000808a),
  // window.BigInt(0x8000000080008000),
  // window.BigInt(0x000000000000808b),
  // window.BigInt(0x0000000080000001),
  // window.BigInt(0x8000000080008081),
  // window.BigInt(0x8000000000008009),
  // window.BigInt(0x000000000000008a),
  // window.BigInt(0x0000000000000088),
  // window.BigInt(0x0000000080008009),
  // window.BigInt(0x000000008000000a),
  // window.BigInt(0x000000008000808b),
  // window.BigInt(0x800000000000008b),
  // window.BigInt(0x8000000000008089),
  // window.BigInt(0x8000000000008003),
  // window.BigInt(0x8000000000008002),
  // window.BigInt(0x8000000000000080),
  // window.BigInt(0x000000000000800a),
  // window.BigInt(0x800000008000000a),
  // window.BigInt(0x8000000080008081),
  // window.BigInt(0x8000000000008080),
  // window.BigInt(0x0000000080000001),
  // window.BigInt(0x8000000080008008),
];

function applyIota(state, roundNumber) {
  state[0][0] = state[0][0] ^ ROUND_CONSTANTS[roundNumber];
  return state;
}

// // Example usage:
// let state = initializeState();
// const roundNumber = 0; // This is just an example; typically you'd be iterating through rounds in the overall Keccak function.
// state = applyIota(state, roundNumber);
// console.log(state);

function generateOutput(state, outputLength) {
  // Assuming state is a 2D array and each lane is a window.BigInt representing 64 bits.
  // Convert state to a flat binary string.
  let output = "";
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const lane = state[x][y];
      const binaryLane = lane.toString(2).padStart(64, "0");
      output += binaryLane;
    }
  }

  // Trim or pad the binary string to the desired length.
  if (output.length > outputLength) {
    output = output.substring(0, outputLength);
  } else {
    while (output.length < outputLength) {
      // Here, we would typically reapply the Keccak permutation and continue squeezing.
      // But for simplicity, we're padding with zeros.
      output += "0";
    }
  }

  return output;
}

// // Example usage:
// let state = initializeState(); // Assuming state has undergone all transformations
// const desiredOutputLength = 256; // 256 bits as an example
// const result = generateOutput(state, desiredOutputLength);
// console.log(result);

function absorbInput(state, block) {
  const w = 64; // word length in bits for SHA3-512
  let x = 0,
    y = 0;

  for (let j = 0; j < block.length; j += w) {
    const segment = block.slice(j, j + w);
    state[x][y] ^= window.BigInt(parseInt(segment, 2));

    // update x and y values for next cell
    y++;
    if (y >= 5) {
      y = 0;
      x++;
    }
  }

  return state;
}

function keccakF(state) {
  for (let i = 0; i < 24; i++) {
    // 24 rounds in Keccak
    state = applyTheta(state);
    state = applyRho(state);
    state = applyPi(state);
    state = applyChi(state);
    state = applyIota(state, i);
  }
  return state;
}

function calculateSHA3_512(input) {
  let paddedInput = applyPadding(input);
  let state = initializeState();

  // Absorption phase
  for (let i = 0; i < paddedInput.length; i += 576) {
    let block = paddedInput.substring(i, i + 576);
    state = absorbInput(state, block);
    state = keccakF(state);
  }

  // Squeezing phase (just one iteration for SHA3-512)
  let output = generateOutput(state, 1024);
  return binaryToHex(output);
}

function xorStateWithBlock(state, block) {
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (y * 64 + x * 320 < block.length) {
        let chunk = block.substring(y * 64 + x * 320, y * 64 + x * 320 + 64);
        let value = window.BigInt("0b" + chunk);
        state[x][y] ^= value;
      }
    }
  }
  return state;
}

// The functions applyPadding, initializeState, absorbInput, applyTheta, applyRho,
// applyPi, applyChi, applyIota, and generateOutput should be defined based on our prior discussions.

function binaryToHex(binaryString) {
  let hexString = "";
  for (let i = 0; i < binaryString.length; i += 4) {
    const byte = binaryString.substr(i, 4);
    const hex = parseInt(byte, 2).toString(16);
    hexString += hex;
  }
  return hexString;
}

// console.log({
//     newSha3_5121: calculateSHA3_512('Hello, World!'),
//     newSha3_5122: calculateSHA3_512('Hello, World!!'),
//     newSha3_5123: calculateSHA3_512('Hello, World!'),
//     newSha3_5124: calculateSHA3_512('Hallo, World!'),
//     newSha3_5125: calculateSHA3_512('Hello, World!'),
//     newSha3_5126: calculateSHA3_512('Hello, World!'),
//     newSha3_5127: calculateSHA3_512('Hello, World!'),
//     newSha3_5128: calculateSHA3_512('Hello, World!'),
//     newSha3_5129: calculateSHA3_512('Hello, World!'),
// })

export default calculateSHA3_512;
