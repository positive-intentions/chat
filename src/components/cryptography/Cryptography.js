// create me a Cryptography class for creatting things like rsa keys and methods for encrypting and decrypting messages.

// it should also have cryptogrphically random String generator for creating random strings for things like salt and iv

// it should also have a method for hashing a string with sha256 and sha512

/*
const entropy = 'some user input pf random string';
<CryptographgyProvider entropy={entropy}>
</CryptographyProvider>


// in some component

const { random, md5Hash, sha256Hash, sha3_512Hash, chance } = useCryptography('some salt');
const randomString = random('some more salt');
const md5Hash = md5Hash('some string'); 
const sha256Hash = sha256Hash('some string');
const sha3_512Hash = sha3_512Hash('some string');
*/

/* 

my methods for createing rsa keys and encrypting and decrypting messages

// public key encryption
export const generateKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
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
    'jwk',
    {
      ...key,
      kty: 'RSA'
    },
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt']
  );

  return setClassPropsFromJson(key, deSerializedublicKey)
}

export const deserializePrivateKey = async (key) => {
  const deSerializedPrivateKey = await window.crypto.subtle.importKey(
    'jwk',
    {

      ...key,
      kty: 'RSA'
    },
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt']
  );

  return setClassPropsFromJson(key, deSerializedPrivateKey)

}

export const encrypt = async (message, publicKey) => {
  const encodedMessage = new TextEncoder().encode(message);
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    publicKey,
    encodedMessage
  ).catch((error) => {
    console.log('error', error);
  });

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};

export const decrypt = async (encryptedMessage, privateKey, passphrase) => {
  const buffer = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      privateKey,
      buffer
    );
    const message = new TextDecoder().decode(decrypted);
    return message;
  } catch (error) {
    console.log('error', error);
    throw new Error('Unable to decrypt message. Incorrect passphrase.', error);
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
      name: 'AES-GCM',
      length: 256, // can be  128, 192, or 256
    },
    true, // whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt']
  );

  return key;
};

export const deserializeSymmetricKey = async (key) => {
  const deSerializedSymmetricKey = await window.crypto.subtle.importKey(
    'jwk',
    {
      ...key,
      kty: 'oct'
    },
    {
      name: 'AES-GCM',
    },
    true,
    ['encrypt', 'decrypt']
  );

  return setClassPropsFromJson(key, deSerializedSymmetricKey)
}

export const encryptWithSymmetricKey = async (message, key) => {
  const encodedMessage = new TextEncoder().encode(message);
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // must be 12 bytes

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encodedMessage
  ).catch((error) => {
    console.log('error', error);
  });

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...new Uint8Array(iv))),
  };
};

export const decryptWithSymmetricKey = async (encryptedData, key) => {
  const { ciphertext, iv } = encryptedData;
  const buffer = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
  const ivBuffer = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: ivBuffer,
      },
      key,
      buffer
    );
    const message = new TextDecoder().decode(decrypted);
    return message;
  } catch (error) {
    throw new Error('Unable to decrypt message. Incorrect key.');
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
to export an initialised instance of chance to get things like animal()





i want you to start by creating me the skeleton of the component and we will further define the further method definitions after.
the methods for the encryption should be able to take in serialized encryptions keys like you see in the way its created.
*/

import React, { createContext, useContext, useState, useEffect } from "react";
import { sha3_512 } from "js-sha3";
import Chance from "chance";

// Create Context
const CryptographyContext = createContext(null);

// Cryptographically Random String Generator
export const randomString = (additionalSalt = "") => {
  // Define the length of the random string
  const randomStringLength = 16; // You can change this value to generate a longer or shorter string

  // Generate a random array of uint8 values
  const randomValues = crypto.getRandomValues(
    new Uint8Array(randomStringLength),
  );

  // Convert random values to hexadecimal string
  const randomHex = Array.from(randomValues)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // If additional salt is provided, concatenate it with the random string
  const randomString = additionalSalt ? additionalSalt + randomHex : randomHex;

  return randomString;
};

// // Usage:
// const randomString = random('some more salt');
// console.log(randomString);

// CryptographyProvider Component
export const CryptographyProvider = ({ entropy = "", children }) => {
  const [salt, setSalt] = useState("");
  const [chance, setChance] = useState(new Chance(salt));

  useEffect(() => {
    const updateSates = async () => {
      const newSalt = await sha256Hash(entropy);
      setSalt(newSalt);
      setChance(new Chance(newSalt));
    };
    updateSates();
  }, [entropy]);

  const random = (additionalSalt = "") => randomString(additionalSalt + salt);

  // Hashing Methods
  const sha256Hash = async (input) => {
    // // Ensure the input is a string
    // if (typeof inputString !== 'string') throw new Error('Input must be a string');

    const inputString = JSON.stringify(input);

    // Convert the string to an ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);

    // Hash the data
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert the result to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  };

  // // Usage:
  // sha256Hash('some string')
  //     .then(hash => console.log(hash))
  //     .catch(error => console.error(error));

  const sha512Hash = async (input) => {
    // // Ensure the input is a string
    // if (typeof inputString !== 'string') throw new Error('Input must be a string');
    const inputString = JSON.stringify(input);

    // Convert the string to an ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);

    // Hash the data
    const hashBuffer = await crypto.subtle.digest("SHA-512", data);

    // Convert the result to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  };

  // // Usage:
  // sha512Hash('some string')
  //     .then(hash => console.log(hash))
  //     .catch(error => console.error(error));

  const sha3_512Hash = async (input) => {
    // // Ensure the input is a string
    // if (typeof inputString !== 'string') throw new Error('Input must be a string');
    const inputString = JSON.stringify(input);

    // Hash the data
    const hashHex = sha3_512(inputString);

    return hashHex;
  };

  // // Usage:
  // sha3_512Hash('some string')
  //     .then(hash => console.log(hash))
  //     .catch(error => console.error(error));

  // RSA Key Generation and Encryption/Decryption Methods
  const generateKeyPair = async () => {
    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 4096, // Can be 1024, 2048, or 4096
          publicExponent: new Uint8Array([1, 0, 1]), // 65537 in bytes
          hash: "SHA-256", // Can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        true, // Whether the key is extractable
        ["encrypt", "decrypt"], // Key usages
      );

      return {
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
      };
    } catch (error) {
      console.error("Error generating key pair:", error);
      throw error;
    }
  };

  // // Usage:
  // generateKeyPair('some salt')
  //     .then(keyPair => {
  //         console.log('Public Key:', keyPair.publicKey);
  //         console.log('Private Key:', keyPair.privateKey);
  //     })
  //     .catch(error => console.error(error));

  function setClassPropsFromJson(json, instance) {
    for (let prop in json) {
      if (json.hasOwnProperty(prop)) {
        instance[prop] = json[prop];
      }
    }
    return instance;
  }

  const deserializePublicKey = async (key) => {
    try {
      const publicKey = await crypto.subtle.importKey(
        "jwk", // Import format
        key, // The key in JWK format
        {
          name: "RSA-OAEP", // Algorithm name
          hash: "SHA-256", // Hash algorithm
        },
        true, // Extractable flag
        ["encrypt"], // Key usages
      );

      return setClassPropsFromJson(key, publicKey);
    } catch (error) {
      console.error("Error deserializing public key:", error);
      throw error;
    }
  };

  // // Usage:
  // const jwk = {
  //     kty: 'RSA',
  //     // ... other JWK properties
  // };

  // deserializePublicKey(jwk)
  //     .then(publicKey => console.log('Public Key:', publicKey))
  //     .catch(error => console.error(error));

  const deserializePrivateKey = async (key) => {
    try {
      const privateKey = await crypto.subtle.importKey(
        "jwk", // Import format
        key, // The key in JWK format
        {
          name: "RSA-OAEP", // Algorithm name
          hash: "SHA-256", // Hash algorithm
        },
        true, // Extractable flag
        ["decrypt"], // Key usages
      );

      return setClassPropsFromJson(key, privateKey);
    } catch (error) {
      console.error("Error deserializing private key:", error);
      throw error;
    }
  };

  // // Usage:
  // const jwk = {
  //     kty: 'RSA',
  //     // ... other JWK properties
  // };

  // deserializePrivateKey(jwk)
  //     .then(privateKey => console.log('Private Key:', privateKey))
  //     .catch(error => console.error(error));

  const encrypt = async (message, publicKey) => {
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

  //   const message = 'Hello, World!';
  //     const publicKey;  // Assume this is obtained from your key generation or deserialization functions

  //     encrypt(message, publicKey)
  //         .then(encryptedMessage => {
  //             console.log('Encrypted Message:', encryptedMessage);
  //         })
  //         .catch(error => {
  //             console.error('Encryption Error:', error);
  //     });

  const decrypt = async (encryptedMessage, privateKey, passphrase) => {
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
      throw new Error(
        "Unable to decrypt message. Incorrect passphrase.",
        error,
      );
    }
  };

  //       const encryptedMessage;  // Assume this is obtained from your encrypt function
  // const privateKey;  // Assume this is obtained from your key generation or deserialization functions

  // decrypt(encryptedMessage, privateKey)
  //     .then(decryptedMessage => {
  //         console.log('Decrypted Message:', decryptedMessage);
  //     })
  //     .catch(error => {
  //         console.error('Decryption Error:', error);
  //     });

  // Symmetric Key Generation and Encryption/Decryption Methods
  const generateSymmetricKey = async () => {
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

  const deserializeSymmetricKey = async (key) => {
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

  const encryptWithSymmetricKey = async (message, key) => {
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

  const decryptWithSymmetricKey = async (encryptedData, key) => {
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

  // Exported Methods Bundle
  const cryptographyMethods = {
    randomString,
    sha256Hash,
    sha512Hash,
    sha3_512Hash,
    generateKeyPair,
    deserializePublicKey,
    deserializePrivateKey,
    encrypt,
    decrypt,
    generateSymmetricKey,
    deserializeSymmetricKey,
    encryptWithSymmetricKey,
    decryptWithSymmetricKey,
    // Add more methods as needed
    chance,
  };

  return (
    <CryptographyContext.Provider value={cryptographyMethods}>
      {children}
    </CryptographyContext.Provider>
  );
};

// Custom Hook to use Cryptography
export const useCryptography = () => {
  return useContext(CryptographyContext);
};

// Usage in some component
/*
const { 
  random, 
  sha256Hash, 
  sha512Hash, 
  generateKeyPair,
  deserializePublicKey,
  deserializePrivateKey,
  encrypt,
  decrypt,
  generateSymmetricKey,
  deserializeSymmetricKey,
  encryptWithSymmetricKey,
  decryptWithSymmetricKey,
  chance
} = useCryptography();
*/
