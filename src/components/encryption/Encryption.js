// public key encryption
export const generateKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  );

  return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
};

function setClassPropsFromJson(json, instance) {
  for (let prop in json) {
    if (json.hasOwnProperty(prop)) {
      instance[prop] = json[prop];
    }
  }
  return instance;
}

export const deserializePublicKey = async (key) => {
  const deSerializedublicKey = await window.crypto.subtle.importKey(
    "jwk",
    {
      ...key,
      kty: "RSA",
    },
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"],
  );

  return setClassPropsFromJson(key, deSerializedublicKey);
};

export const deserializePrivateKey = async (key) => {
  const deSerializedPrivateKey = await window.crypto.subtle.importKey(
    "jwk",
    {
      ...key,
      kty: "RSA",
    },
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"],
  );

  return setClassPropsFromJson(key, deSerializedPrivateKey);
};

export const encrypt = async (message, publicKey) => {
  const encodedMessage = new TextEncoder().encode(message);
  const encrypted = await window.crypto.subtle
    .encrypt(
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      publicKey,
      encodedMessage,
    )
    .catch((error) => {
      console.log("error", error);
    });

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};

export const decrypt = async (encryptedMessage, privateKey, passphrase) => {
  const buffer = Uint8Array.from(atob(encryptedMessage), (c) =>
    c.charCodeAt(0),
  );
  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      privateKey,
      buffer,
    );
    const message = new TextDecoder().decode(decrypted);
    return message;
  } catch (error) {
    console.log("error", error);
    throw new Error("Unable to decrypt message. Incorrect passphrase.", error);
  }
};

const getEncryptionMethods = async (userId, salt) => {
  const keyPair = await generateKeyPair(userId, salt);

  return {
    encrypt: async (message) => {
      return await encrypt(message, keyPair.publicKey);
    },
    decrypt: async (encryptedMessage) => {
      return await decrypt(encryptedMessage, keyPair.privateKey, salt);
    },
  };
};

// Symmetric key encryption

export const generateSymmetricKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256, // can be  128, 192, or 256
    },
    true, // whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"],
  );

  return key;
};

export const deserializeSymmetricKey = async (key) => {
  const deSerializedSymmetricKey = await window.crypto.subtle.importKey(
    "jwk",
    {
      ...key,
      kty: "oct",
    },
    {
      name: "AES-GCM",
    },
    true,
    ["encrypt", "decrypt"],
  );

  return setClassPropsFromJson(key, deSerializedSymmetricKey);
};

export const encryptWithSymmetricKey = async (message, key) => {
  const encodedMessage = new TextEncoder().encode(message);
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // must be 12 bytes

  const encrypted = await window.crypto.subtle
    .encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedMessage,
    )
    .catch((error) => {
      console.log("error", error);
    });

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...new Uint8Array(iv))),
  };
};

export const decryptWithSymmetricKey = async (encryptedData, key) => {
  const { ciphertext, iv } = encryptedData;
  const buffer = Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0));
  const ivBuffer = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));

  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBuffer,
      },
      key,
      buffer,
    );
    const message = new TextDecoder().decode(decrypted);
    return message;
  } catch (error) {
    throw new Error("Unable to decrypt message. Incorrect key.");
  }
};

const getSymmetricKeyEncryptionMethods = async () => {
  const key = await generateSymmetricKey();

  return {
    encrypt: async (message) => {
      return await encryptWithSymmetricKey(message, key);
    },
    decrypt: async (encryptedMessage) => {
      return await decryptWithSymmetricKey(encryptedMessage, key);
    },
  };
};

export { getEncryptionMethods, getSymmetricKeyEncryptionMethods };
