import { createSlice, current } from "@reduxjs/toolkit";
import Blockchain from "../../blockchain/Blockchain";
import { blockBuilders } from "../../blockchain/chains/podChain";
import { merge } from "lodash";

const initialState = [];

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    createNewPod(state, action) {
      const {
        id,
        pendingBlocks: blocks,
        pendingStorage: storage,
      } = action.payload;
      let chats = current(state);
      let chat = chats.find((chat) => chat.id === id);

      if (!chat) {
        // const podBlockchain = new Blockchain({chain: action.payload.blockchain.chain});
        // podBlockchain.addBlocks([
        //     ...action.payload.members.map(member => blockBuilders().addMember({userId: member, from: action.payload.from})[0]),
        //     ...blockBuilders().setPodName({name: action.payload.name, from: action.payload.from})
        // ]);
        // const pendingUpdates = podBlockchain.getUpdate();
        const newChat = {
          ...{
            id: "",
            users: [],
            name: "",
            avatar: "",
            messages: [],
          }, // some required defaults for legacy
          ...action.payload,
          blockchain: {
            chain: [...blocks],
            storage: { ...storage },
          },
        };
        chats = [...chats, newChat];
        return chats;
      }

      return chats;
    },
    removePod(state, action) {
      // const index = state.findIndex(chat => chat.id === action.payload);
      // return state.splice(index, 1);
      const { podId } = action.payload;
      let chats = current(state);
      chats = chats.filter((chat) => chat.id !== podId);

      return chats;
    },
    // =====================================================================
    addUserToPod(state, action) {
      const { podId, userId } = action.payload;
      let chats = current(state);
      let chat = chats.find((chat) => chat.id === podId);
      // chat.messages = [...chat.messages, message];

      chats = chats.map((chat) =>
        chat.id != podId
          ? chat
          : {
              ...chat,
              members: [...chat.members.filter((m) => m !== userId), userId],
            },
      );
      return chats;
    },
    removeUserFromConversationFromAllPods(state, action) {
      const { userId } = action.payload;
      let chats = current(state);
      chats = chats.map((chat) => {
        chat.members = chats.filter((member) => member !== userId);
      });
      return chats;
    },
    removeUserFromConversation(state, action) {
      const { chatId, userId } = action.payload;
      let chat = state.find((chat) => chat.id === chatId);
      const index = chat.members.findIndex((member) => member === userId);
      chat = {
        ...chat,
        members: chat.members.filter((member) => member !== userId),
      };
      return state;
    },
    addMessage(state, action) {
      const { podId, message } = action.payload;
      let chats = current(state);
      // let chat = chats.find(chat => chat.id === podId);
      // chat.messages = [...chat.messages, message];

      // chats = chats
      //     .map(chat => chat.id !== podId ? chat : { ...chat, messages: [...chat.messages, message] });
      return chats;
    },
    // =====================================================================

    updatePodName(state, action) {
      const { podId, name } = action.payload;
      let chats = current(state);
      const chat = chats.find((chat) => chat.id === podId);

      chats = chats
        .filter((chat) => chat.id !== podId)
        .concat({ ...chat, name });

      return chats;
    },
    updatePodUnreadCount(state, action) {
      const { podId, unreadCount } = action.payload;
      let chats = current(state);
      // chats = chats.map(chat => chat.id !== podId ? chat : { ...chat, unreadCount: unreadCount === 0 ? 0 : chat.unreadCount + unreadCount });
      chats = chats.map((chat) =>
        chat.id !== podId ? chat : { ...chat, unreadCount },
      );
      return chats;
    },
    setShouldHangup(state, action) {
      const { podId, shouldHangup } = action.payload;
      let chats = current(state);
      chats = chats.map((chat) =>
        chat.id !== podId ? chat : { ...chat, shouldHangup },
      );
      return chats;
    },
    setPods(state, action) {
      return action.payload;
    },
    setPeerIsTyping(state, action) {
      const { podId, peerDisplayName, isTyping } = action.payload;
      let chats = current(state);
      chats = chats.map((chat) =>
        chat.id !== podId
          ? chat
          : {
              ...chat,
              peerIsTyping: {
                ...chat.peerIsTyping,
                [peerDisplayName]: isTyping,
              },
            },
      );
      return chats;
    },
    setEphemeralStorage(state, action) {
      const { podId, ephemeralStorage } = action.payload;
      let chats = current(state);
      console.log("setting ephemeralStorage", ephemeralStorage);
      chats = chats.map((chat) =>
        chat.id !== podId
          ? chat
          : { ...chat, ephemeralStorage: ephemeralStorage },
      );
      console.log({ "new ephemera update": chats, podId, ephemeralStorage });
      return chats;
    },
    addToBlockchain(state, action) {
      const {
        podId,
        blocks,
        block,
        storage = {},
        append = false,
      } = action.payload;
      let chats = current(state);

      let chat = chats.find((chat) => chat.id === podId) ?? {};
      // const podBlockchain = new Blockchain({chain: chat.blockchain.chain, storage: chat.blockchain.storage});
      // if (blocks?.length > 0) podBlockchain.addBlocks(blocks, append);
      // if (block) podBlockchain.addBlock(block, append);
      // const pendingUpdates = podBlockchain.getUpdate();

      chat = {
        ...chat,
        blockchain: {
          ...(chat?.blockchain || {}),
          chain: [...(chat?.blockchain?.chain || []), ...blocks],
          storage: {
            ...storage,
            ...chat?.blockchain?.storage,
          },
        },
      };

      chats = chats.map((c) => (c.id !== podId ? c : chat));
      return chats;
    },
    removeFileFromPod: (state, action) => {
      const { podId, fileId } = action.payload;
      let chats = current(state);
      let chat = chats.find((chat) => chat.id === podId) ?? {};
      chat = {
        ...chat,
        blockchain: {
          ...(chat?.blockchain || {}),
          storage: {
            ...chat?.blockchain?.storage,
            [fileId]: undefined,
          },
        },
      };
      chats = chats.map((c) => (c.id !== podId ? c : chat));
      return chats;
    },
  },
});

export const {
  createNewPod,
  removePod,
  addUserToPod,
  removeUserFromConversationFromAllPods,
  removeUserFromConversation,
  addMessage,
  updatePodName,
  updatePodUnreadCount,
  setPods,
  setShouldHangup,
  setPeerIsTyping,
  setEphemeralStorage,
  addToBlockchain,
  removeFileFromPod,
} = chatsSlice.actions;

export default chatsSlice.reducer;
