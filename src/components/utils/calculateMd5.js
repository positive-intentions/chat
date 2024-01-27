function calculateMD5(str) {
  let rotateLeft = (value, shift) => {
    return (value << shift) | (value >>> (32 - shift));
  };

  let addUnsigned = (x, y) => {
    let carry = 0;
    let sum = 0;
    let xWord = x & 0x7fffffff;
    let yWord = y & 0x7fffffff;

    for (let i = 0; i < 32; i++) {
      let bitX = (xWord >> i) & 1;
      let bitY = (yWord >> i) & 1;
      let sumBits = bitX + bitY + carry;
      let bitSum = sumBits & 1;
      carry = sumBits >= 2 ? 1 : 0;
      sum |= bitSum << i;
    }

    return sum;
  };

  let toHex = (value) => {
    let hex = "";
    let charSet = "0123456789abcdef";

    for (let i = 0; i < 8; i++) {
      let byte = (value >>> (i * 4)) & 0x0f;
      hex += charSet.charAt(byte);
    }

    return hex;
  };

  let utf8Encode = (str) => {
    let utf8Text = "";

    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);

      if (charCode < 0x80) {
        utf8Text += String.fromCharCode(charCode);
      } else if (charCode < 0x800) {
        utf8Text += String.fromCharCode(0xc0 | (charCode >> 6));
        utf8Text += String.fromCharCode(0x80 | (charCode & 0x3f));
      } else if (charCode < 0x10000) {
        utf8Text += String.fromCharCode(0xe0 | (charCode >> 12));
        utf8Text += String.fromCharCode(0x80 | ((charCode >> 6) & 0x3f));
        utf8Text += String.fromCharCode(0x80 | (charCode & 0x3f));
      } else {
        utf8Text += String.fromCharCode(0xf0 | (charCode >> 18));
        utf8Text += String.fromCharCode(0x80 | ((charCode >> 12) & 0x3f));
        utf8Text += String.fromCharCode(0x80 | ((charCode >> 6) & 0x3f));
        utf8Text += String.fromCharCode(0x80 | (charCode & 0x3f));
      }
    }

    return utf8Text;
  };

  let strToWords = (str) => {
    let wordCount = ((str.length + 8) >> 6) + 1;
    let words = new Array(wordCount * 16).fill(0);
    let strLength = str.length;
    let i;

    for (i = 0; i < strLength; i++) {
      words[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    }

    words[i >> 2] |= 0x80 << ((i % 4) * 8);
    words[wordCount * 16 - 2] = strLength * 8;

    return words;
  };

  let md5Calc = (input) => {
    let constants = [];
    for (let i = 0; i < 64; i++) {
      constants[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000);
    }

    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    let words = strToWords(input);
    let wordCount = words.length;

    for (let i = 0; i < wordCount; i += 16) {
      let aa = a;
      let bb = b;
      let cc = c;
      let dd = d;

      for (let j = 0; j < 64; j++) {
        let f, g;

        if (j < 16) {
          f = (b & c) | (~b & d);
          g = j;
        } else if (j < 32) {
          f = (d & b) | (~d & c);
          g = (5 * j + 1) % 16;
        } else if (j < 48) {
          f = b ^ c ^ d;
          g = (3 * j + 5) % 16;
        } else {
          f = c ^ (b | ~d);
          g = (7 * j) % 16;
        }

        let temp = d;
        d = c;
        c = b;
        b = addUnsigned(
          b,
          rotateLeft(
            a + f + constants[j] + words[i + g],
            [7, 12, 17, 22][j % 4],
          ),
        );
        a = temp;
      }

      a = addUnsigned(a, aa);
      b = addUnsigned(b, bb);
      c = addUnsigned(c, cc);
      d = addUnsigned(d, dd);
    }

    return [a, b, c, d];
  };

  let hashWords = md5Calc(utf8Encode(str));
  let hashHex = "";

  for (let i = 0; i < 4; i++) {
    hashHex += toHex(hashWords[i]);
  }

  return hashHex;
}

//   const inputString = 'Hello, World!';
//   const md5Hash = calculateMD5(inputString);
//   console.log('MD5:', md5Hash);

export default calculateMD5;
