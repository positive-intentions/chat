const { getEncryptionMethods } = require("./Encryption");
import { Crypto } from "@peculiar/webcrypto";
import { TextEncoder, TextDecoder } from "text-encoding";

describe("getEncryptionMethods", () => {
  let userId, salt, message;

  beforeAll(() => {
    window.crypto = new Crypto();
    window.TextEncoder = TextEncoder;
    window.TextDecoder = TextDecoder;
  });

  afterAll(() => {
    // Clean up the JSDOM environment
    delete global.window;
  });

  beforeEach(() => {
    userId = "testUser";
    salt = "testSalt";
    message = "testMessage";
  });

  it("should generate a key pair for a user", async () => {
    const encryptionMethods = await getEncryptionMethods(userId, salt);
    expect(encryptionMethods).toBeDefined();
  });

  it("should encrypt and decrypt a message", async () => {
    const encryptionMethods = await getEncryptionMethods(userId, salt);
    const encrypted = await encryptionMethods.encrypt(message);
    const decrypted = await encryptionMethods.decrypt(encrypted);
    expect(decrypted).toEqual(message);
  });

  it("should throw an error when decrypting with an incorrect passphrase", async () => {
    const encryptionMethods = await getEncryptionMethods(userId, salt);
    const encrypted = encryptionMethods.encrypt(message);
    expect(() =>
      encryptionMethods.decrypt(encrypted, "wrongpassphrase"),
    ).toThrow();
  });

  it("should use the same key pair for a user on subsequent calls", async () => {
    const encryptionMethods1 = await getEncryptionMethods(userId, salt);
    const encryptionMethods2 = await getEncryptionMethods(userId, salt);
    expect(encryptionMethods1).toEqual(encryptionMethods2);
  });
});
