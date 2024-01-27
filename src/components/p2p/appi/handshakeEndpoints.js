import {
  generateKeyPair,
  generateSymmetricKey,
  deserializePrivateKey,
  decrypt,
  encrypt,
  deserializePublicKey,
  decryptWithSymmetricKey,
  deserializeSymmetricKey,
} from "../../encryption/Encryption";
import createEncryptionMiddleware from "./encryptionMiddleware";

// const createEncryptionMiddleware = (encryptionKeys) => async (req,res, next) => {
//     const { privateKey, remotePublicKey } = encryptionKeys[req.sender];
//     const deserializedPrivateKey = await window.crypto.subtle.importKey(
//         'jwk',
//         privateKey,
//         {
//             name: 'RSA-OAEP',
//             hash: 'SHA-256',
//         },
//         true,
//         ['decrypt']
//     );
//     const deserializedRemotePublicKey = await window.crypto.subtle.importKey(
//         'jwk',
//         remotePublicKey,
//         {
//             name: 'RSA-OAEP',
//             hash: 'SHA-256',
//         },
//         true,
//         ['encrypt']
//     );

//     console.log({ deserializedPrivateKey, deserializedRemotePublicKey })

//     let decryptedMessage = null
//     if(req.payload) {
//         decryptedMessage = await decrypt(req.payload, deserializedPrivateKey);
//     }
//     req.payload = JSON.parse(decryptedMessage);
//     res.sendEncrypted = async (type, payload) => {
//         let encryptedPayload = payload
//         if (payload) {
//             encryptedPayload = await encrypt(JSON.stringify(payload), deserializedRemotePublicKey);
//         }
//         res.send(type, encryptedPayload);
//     }

//     next();
// }

const handshakeEndpoints = (
  {
    addContactDispatch,
    updateContactDispatch,
    addEncryptionKeysDispatch,
    updateEncryptionKeysDispatch,
    encryptionKeys,
  },
  sendNotification,
) => {
  const encryptionMiddleware = createEncryptionMiddleware(encryptionKeys);
  return {
    requestUserDetails: (state) => [
      // encryptionMiddleware,
      (request, response, next) => {
        if (!state.contacts.find((contact) => contact.id === request.sender)) {
          addContactDispatch({ ...request.payload });
          const message = `${request.payload.displayName} added to contacts`;
          sendNotification(message, { variant: "success" });
        } else {
          updateContactDispatch({ ...request.payload, id: request.sender });
        }

        response.send({ ...state.userProfile });
      },
    ],
    validateIdentity: (state) => [
      // encryptionMiddleware,
      async (request, response, next) => {
        const { privateKey, remotePublicKey } = encryptionKeys[request.sender];

        const decryptedrsaMessage = await decrypt(
          request.payload,
          await deserializePrivateKey(privateKey),
        );

        const encryptedMessage = await encrypt(
          decryptedrsaMessage,
          await deserializePublicKey(remotePublicKey),
        );

        response.send({ data: encryptedMessage });
      },
    ],
    createEncryption: (state) => [
      async (request, response, next) => {
        const { publicKey, privateKey } = await generateKeyPair();
        const symmetricKey = await generateSymmetricKey();
        const serializedPublicKey = await window.crypto.subtle.exportKey(
          "jwk",
          publicKey,
        );
        // serializedPublicKey.key_ops = ['encrypt'];
        const serializedPrivateKey = await window.crypto.subtle.exportKey(
          "jwk",
          privateKey,
        );
        // serializedPrivateKey.key_ops = ['decrypt'];
        const serializedSymmetricKey = await window.crypto.subtle.exportKey(
          "jwk",
          symmetricKey,
        );
        addEncryptionKeysDispatch({
          userId: request.sender,
          publicKey: serializedPublicKey,
          privateKey: serializedPrivateKey,
          remotePublicKey: request.payload.publicKey,
          symmetricKey: serializedSymmetricKey,
          established: true,
        });
        response.send({
          publicKey: serializedPublicKey,
          symmetricKey: serializedSymmetricKey,
        });
      },
    ],
  };
};

export default handshakeEndpoints;
