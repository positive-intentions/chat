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
    window.BigInt.prototype.subtract = function () {
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

// Sample Usage
// const a = BigInt('12345');
// const b = BigInt('67890');
// const c = a.add(b);
// console.log(c.toString()); // 80135
