/* eslint-disable */

function calculateSHA256(str) {
  const charToCode = (char) => char.charCodeAt(0);
  const leftRotate = (value, shift) =>
    (value >>> shift) | (value << (32 - shift));
  const rightRotate = (value, shift) =>
    (value << shift) | (value >>> (32 - shift));
  const toHex = (value) => value.toString(16).padStart(8, "0");

  const addUnsigned = (x, y) => {
    const MAX_UINT32 = Math.pow(2, 32) - 1;
    return (x & MAX_UINT32) + (y & MAX_UINT32);
  };

  const wordsToBlocks = (words) => {
    const blocks = [];
    for (let i = 0; i < words.length; i += 16) {
      blocks.push(words.slice(i, i + 16));
    }
    return blocks;
  };

  const preprocessMessage = (message) => {
    const bitLength = message.length * 8;
    const paddingLength =
      message.length % 64 < 56
        ? 56 - (message.length % 64)
        : 120 - (message.length % 64);

    const paddedMessage = new Uint8Array(message.length + paddingLength + 8);
    paddedMessage.set(message);
    paddedMessage[message.length] = 0x80;
    paddedMessage.set(
      new Uint8Array(bitLengthToArray(bitLength)),
      paddedMessage.length - 8,
    );

    return paddedMessage;
  };

  const bitLengthToArray = (bitLength) => {
    const arr = new Uint8Array(8);
    for (let i = 7; i >= 0; i--) {
      arr[i] = bitLength & 0xff;
      bitLength >>>= 8;
    }
    return arr;
  };

  const computeSHA256 = (message) => {
    const K = new Uint32Array([
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ]);

    const blocks = wordsToBlocks(new Uint32Array(message.buffer));
    const hash = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]);

    for (const block of blocks) {
      const schedule = new Uint32Array(64);
      schedule.set(block);

      for (let t = 16; t < 64; t++) {
        const s0 =
          rightRotate(schedule[t - 15], 7) ^
          rightRotate(schedule[t - 15], 18) ^
          (schedule[t - 15] >>> 3);
        const s1 =
          rightRotate(schedule[t - 2], 17) ^
          rightRotate(schedule[t - 2], 19) ^
          (schedule[t - 2] >>> 10);
        schedule[t] = addUnsigned(
          addUnsigned(addUnsigned(schedule[t - 16], s0), schedule[t - 7]),
          s1,
        );
      }

      let a = hash[0];
      let b = hash[1];
      let c = hash[2];
      let d = hash[3];
      let e = hash[4];
      let f = hash[5];
      let g = hash[6];
      let h = hash[7];

      for (let t = 0; t < 64; t++) {
        const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
        const ch = (e & f) ^ (~e & g);
        const temp1 = addUnsigned(
          addUnsigned(addUnsigned(addUnsigned(h, S1), ch), K[t]),
          schedule[t],
        );
        const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const temp2 = addUnsigned(S0, maj);

        h = g;
        g = f;
        f = e;
        e = addUnsigned(d, temp1);
        d = c;
        c = b;
        b = a;
        a = addUnsigned(temp1, temp2);
      }

      hash[0] = addUnsigned(hash[0], a);
      hash[1] = addUnsigned(hash[1], b);
      hash[2] = addUnsigned(hash[2], c);
      hash[3] = addUnsigned(hash[3], d);
      hash[4] = addUnsigned(hash[4], e);
      hash[5] = addUnsigned(hash[5], f);
      hash[6] = addUnsigned(hash[6], g);
      hash[7] = addUnsigned(hash[7], h);
    }

    const hashArray = new Uint8Array(hash.buffer);
    const hashHex = Array.from(hashArray, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    return hashHex;
  };

  const messageBytes = new TextEncoder().encode(str);
  const paddedMessage = preprocessMessage(messageBytes);
  const sha256Hash = computeSHA256(paddedMessage);

  return sha256Hash;
}

// const inputString = 'Hello, World!';
// const sha256Hash = calculateSHA256(inputString);
// console.log('SHA-256:', sha256Hash);

export default calculateSHA256;
