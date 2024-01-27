import handshakeEndpoints from "./handshakeEndpoints";
import pingPingEndpoints from "./pingPingEndpoints";
import podEndpoints from "./podEndpoints";

const appiSchema = (
  {
    addContactDispatch,
    updateContactDispatch,
    createNewPodDispatch,
    addUserToPodDispatch,
    setShouldHangupDispatch,
    updatePodUnreadCountDispatch,
    addMessageToConversationDispatch,
    addEncryptionKeysDispatch,
    updateEncryptionKeysDispatch,
    setPeerIsTypingDispatch,
    setEphemeralStoreDispatch,
    addStorageItemDispatch,
    addToBlockchainDispatch,
    encryptionKeys,
  },
  sendNotification,
) => ({
  ...pingPingEndpoints(),
  ...handshakeEndpoints(
    {
      addContactDispatch,
      updateContactDispatch,
      addEncryptionKeysDispatch,
      updateEncryptionKeysDispatch,
      encryptionKeys,
    },
    sendNotification,
  ),
  ...podEndpoints(
    {
      createNewPodDispatch,
      addUserToPodDispatch,
      addMessageToConversationDispatch,
      encryptionKeys,
      updatePodUnreadCountDispatch,
      setShouldHangupDispatch,
      setPeerIsTypingDispatch,
      setEphemeralStoreDispatch,
      addStorageItemDispatch,
      addToBlockchainDispatch,
    },
    sendNotification,
  ),
});

export default appiSchema;
