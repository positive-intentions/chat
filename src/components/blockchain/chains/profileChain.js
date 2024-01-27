import { randomString } from "../../cryptography/Cryptography";

// userProfile = {
//     id: 'abc',
//     connectionId: 'def',
//     pastConnections: ['def', 'ghi'],
//     displayName: 'jkl',
//     avatar: 'https://source.unsplash.com/random/400x200?avatar',
//     agreedToTerms: ['2.0.0'],
//     settings: {
//         inAppNotification: true,
//         browserNotification: false
//     }
// }

const mutations = {
  updateId: "UPDATE_ID",
  updateConnectionId: "UPDATE_CONNECTION_ID",
  updateDisplayName: "UPDATE_DISPLAY_NAME",
  updateAvatar: "image", // there is an explicit rule for this value to be fetched from storage as an object see blockchain.js
  updateAgreedToTerms: "UPDATE_AGREED_TO_TERMS",
  updateInAppNotification: "UPDATE_IN_APP_NOTIFICATION",
  updateBrowserNotification: "UPDATE_BROWSER_NOTIFICATION",
  updatePeerjsServer: "UPDATE_PEERJS_SERVER",
  updateEncryptionSignature: "UPDATE_ENCRYPTION_SIGNATURE",
};

export const compiler = (block, state) => {
  if (!block) return state;

  const { type, payload } = block;

  switch (type) {
    case mutations.updateId:
      return { ...state, id: payload };
    case mutations.updateConnectionId:
      return {
        ...state,
        connectionId: payload,
        pastConnections: state.connectionId
          ? [...(state.pastConnections ?? []), state.connectionId]
          : [],
      };
    case mutations.updateDisplayName:
      return { ...state, displayName: payload };
    case mutations.updateAvatar:
      return { ...state, avatar: payload };
    case mutations.updateAgreedToTerms:
      return {
        ...state,
        agreedToTerms: [...(state.agreedToTerms || []), payload],
      };
    case mutations.updateInAppNotification:
      return {
        ...state,
        settings: { ...state.settings, inAppNotification: payload },
      };
    case mutations.updateBrowserNotification:
      return {
        ...state,
        settings: { ...state.settings, browserNotification: payload },
      };
    case mutations.updatePeerjsServer:
      return { ...state, peerjsServer: payload };
    case mutations.updateEncryptionSignature:
      return { ...state, encryptionSignature: payload };
    default:
      return state;
  }
};

export const blockBuilders = (salt = "") => ({
  updateId: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_ID",
      payload: payload.id,
    },
  ],
  updateConnectionId: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_CONNECTION_ID",
      payload: payload.connectionId,
    },
  ],
  updateDisplayName: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_DISPLAY_NAME",
      payload: payload.displayName,
    },
  ],
  updateAvatar: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "image",
      payload: payload.avatar,
    },
  ],
  updateAgreedToTerms: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_AGREED_TO_TERMS",
      payload: payload.agreedToTerms,
    },
  ],
  updateInAppNotification: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_IN_APP_NOTIFICATION",
      payload: payload.inAppNotification,
    },
  ],
  updateBrowserNotification: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_BROWSER_NOTIFICATION",
      payload: payload.browserNotification,
    },
  ],
  updatePeerjsServer: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_PEERJS_SERVER",
      payload: payload.peerjsServer,
    },
  ],
  updateEncryptionSignature: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "UPDATE_ENCRYPTION_SIGNATURE",
      payload: payload.encryptionSignature,
    },
  ],
});
