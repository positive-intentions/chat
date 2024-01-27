import { randomString } from "../../cryptography/Cryptography";

export function encodeEmojisToUnicode(inputString = "") {
  return inputString.replace(
    /[\u007F-\uFFFF]/g,
    (match) => "\\u" + match.charCodeAt(0).toString(16).padStart(4, "0"),
  );
}

function decodeUnicodeToEmojis(encodedString = "") {
  return encodedString.replace(/\\u([\dA-Fa-f]{4})/g, (match, group1) =>
    String.fromCharCode(parseInt(group1, 16)),
  );
}

export const compiler = (block, propState) => {
  const state = Object.keys(propState).length
    ? propState
    : {
        id: "",
        users: [],
        name: "",
        avatar: "",
        messages: [],
      };
  if (!block) return state;
  const { type, payload, messageId, from, timestamp, sha } = block;

  switch (type) {
    case "addUser":
      state.users.push(payload);
      return state;
    case "removeUser":
      state.users = state.users.filter((u) => u !== payload);
      return state;
    case "setPodId":
      state.id = payload;
    case "setPodName":
      state.name = payload;
      return state;
    case "setClone":
      state.clone = payload;
      return state;
    case "setPodavatar":
      state.avatar = payload;
      return state;
    case "createMessage":
      const newMessage = {
        id: messageId,
        from: from,
        timestamp: { created: timestamp },
        reciept: { recievedBy: [], readBy: [] },
        votes: { upvotes: [], downvotes: [] },
        payload: {
          content: "",
          image: [],
          video: [],
          file: [],
          link: [],
          reply: [],
          location: [],
          audio: [],
        },
      };
      state.messages = [...state.messages, newMessage];
      return state;
    case "text":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? {
              ...m,
              payload: {
                ...m.payload,
                content: decodeUnicodeToEmojis(payload),
              },
            }
          : m,
      );
      return state;
    case "image":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? { ...m, payload: { ...m.payload, image: payload, sha } }
          : m,
      );
      return state;
    case "video":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? { ...m, payload: { ...m.payload, video: payload, sha } }
          : m,
      );
      return state;
    case "file":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? { ...m, payload: { ...m.payload, file: payload, sha } }
          : m,
      );
      return state;
    case "location":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? { ...m, payload: { ...m.payload, location: payload } }
          : m,
      );
      return state;
    case "audio":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? { ...m, payload: { ...m.payload, audio: payload } }
          : m,
      );
      return state;
    case "link":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? { ...m, payload: { ...m.payload, link: payload } }
          : m,
      );
      return state;
    case "reply":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? { ...m, payload: { ...m.payload, reply: payload } }
          : m,
      );
      return state;
    case "recieved":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? {
              ...m,
              reciept: {
                ...m.reciept,
                recievedBy: [
                  ...m.reciept.recievedBy,
                  { userId: from, timestamp: timestamp },
                ],
              },
            }
          : m,
      );
      return state;
    case "read":
      state.messages = state.messages.map((m) =>
        m.id === messageId
          ? {
              ...m,
              reciept: {
                ...m.reciept,
                readBy: [
                  ...m.reciept.readBy,
                  { userId: from, timestamp: timestamp },
                ],
              },
            }
          : m,
      );
      return state;
    case "delete":
      state.messages = state.messages.filter((m) => m.id !== messageId);
      return state;
    case "upvote":
      state.messages = state.messages.map((m) => {
        if (m.id === messageId) {
          return {
            ...m,
            votes: {
              ...m.votes,
              upvotes: [
                ...m.votes.upvotes,
                { userId: from, timestamp: timestamp },
              ],
              downvotes: m.votes.downvotes.filter((v) => v.userId !== from),
            },
          };
        } else {
          return m;
        }
      });
      return state;
    case "downvote":
      state.messages = state.messages.map((m) => {
        if (m.id === messageId) {
          if (payload) {
            return {
              ...m,
              votes: {
                ...m.votes,
                downvotes: [
                  ...m.votes.downvotes,
                  { userId: from, timestamp: timestamp },
                ],
                upvotes: m.votes.upvotes.filter((v) => v.userId !== from),
              },
            };
          } else {
            return {
              ...m,
              // votes: {
              //     ...m.votes,
              //     downvotes: m.votes.downvotes.filter((v) => v.userId !== from),
              // },
            };
          }
        } else {
          return m;
        }
      });
      return state;
    default:
      return state;
  }
};

export const blockBuilders = (salt = "") => ({
  addMember: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "addUser",
      payload: payload.userId,
    },
  ],
  setPodId: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "setPodId",
      payload: payload.id,
    },
  ],
  setPodName: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "setPodName",
      payload: payload.name,
    },
  ],
  sendMessage: (payload) => {
    const messageId = randomString(salt);
    const sendMessageBlocks = [
      {
        id: randomString(salt),
        from: payload.from,
        timestamp: Date.now(),
        type: "createMessage",
        messageId: messageId,
      },
    ];

    if (payload.content) {
      sendMessageBlocks.push({
        id: randomString(salt),
        from: payload.from,
        timestamp: Date.now() + sendMessageBlocks.length,
        type: "text",
        messageId: messageId,
        payload: encodeEmojisToUnicode(payload.content),
      });
    }
    if (payload.image) {
      sendMessageBlocks.push({
        id: randomString(salt),
        from: payload.from,
        timestamp: Date.now() + sendMessageBlocks.length,
        type: "image",
        messageId: messageId,
        payload: payload.image,
      });
    }
    if (payload.file) {
      sendMessageBlocks.push({
        id: randomString(salt),
        from: payload.from,
        timestamp: Date.now() + sendMessageBlocks.length,
        type: "file",
        messageId: messageId,
        payload: payload.file,
      });
    }
    if (payload.reply) {
      sendMessageBlocks.push({
        id: randomString(salt),
        from: payload.from,
        timestamp: Date.now() + sendMessageBlocks.length,
        type: "reply",
        messageId: messageId,
        payload: payload.reply.id,
      });
    }
    if (payload.location) {
      sendMessageBlocks.push({
        id: randomString(salt),
        from: payload.from,
        timestamp: Date.now() + sendMessageBlocks.length,
        type: "location",
        messageId: messageId,
        payload: payload.location,
      });
    }
    if (payload.audio) {
      sendMessageBlocks.push({
        id: randomString(salt),
        from: payload.from,
        timestamp: Date.now() + sendMessageBlocks.length,
        type: "audio",
        messageId: messageId,
        payload: payload.audio,
      });
    }
    // if (!!payload.upvote) {
    //     sendMessageBlocks.push({
    //         id: randomString(salt),
    //         from: payload.from,
    //         timestamp: Date.now() + sendMessageBlocks.length,
    //         type: 'upvote',
    //         messageId: messageId,
    //         payload: payload.upvote,
    //     })
    // }

    return sendMessageBlocks;
  },
  createPod: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "setPodId",
      payload: payload.id,
    },
    ...payload.members.map((userId) => ({
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "addUser",
      payload: userId,
    })),
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "setPodName",
      payload: payload.name,
    },
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "setClone",
      payload: !!payload.clone,
    },
  ],
  deleteMessage: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "delete",
      messageId: payload.id,
    },
  ],
  upvoteMessage: (payload) => [
    {
      id: randomString(salt),
      from: payload.from,
      timestamp: Date.now(),
      type: "upvote",
      messageId: payload.messageId,
    },
  ],
});
