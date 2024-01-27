import { decrypt, encrypt } from "../../encryption/Encryption";

const createEncryptionMiddleware =
  (encryptionKeys) => async (req, res, next) => {
    const { privateKey, remotePublicKey } = encryptionKeys[req.sender];
    const deserializedPrivateKey = await window.crypto.subtle.importKey(
      "jwk",
      privateKey,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["decrypt"],
    );
    const deserializedRemotePublicKey = await window.crypto.subtle.importKey(
      "jwk",
      remotePublicKey,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"],
    );

    let decryptedMessage = null;
    if (req.payload) {
      decryptedMessage = await decrypt(req.payload, deserializedPrivateKey);
    }
    req.payload = JSON.parse(decryptedMessage);
    res.sendEncrypted = async (type, payload) => {
      let encryptedPayload = payload;
      if (payload) {
        encryptedPayload = await encrypt(
          JSON.stringify(payload),
          deserializedRemotePublicKey,
        );
      }
      res.send(type, encryptedPayload);
    };

    next();
  };

export default createEncryptionMiddleware;
