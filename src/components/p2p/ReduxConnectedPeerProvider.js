import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addContact, updateContact } from "../redux/slices/contactsSlice";
import {
  addMessage,
  createNewPod,
  addUserToPod,
  updatePodUnreadCount,
  setShouldHangup,
  setPeerIsTyping,
  addToBlockchain,
  setEphemeralStorage,
} from "../redux/slices/podsSlice";
import { addStorageItem } from "../redux/slices/storageSlice";
import {
  addEncryptionKeys,
  updateEncryptionKeys,
} from "../redux/slices/encryptionSlice";
import PeerProvider from "./PeerProvider";
import createAppiSchema from "./appi/appiSchema";
import Blockchain, { useBlockchain } from "../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../blockchain/chains/profileChain";
import { useNotification } from "../notifications/notificationManager";
import { compiler as podCompiler } from "../blockchain/chains/podChain";
import {
  generateKeyPair,
  encrypt,
  deserializePublicKey,
  decrypt,
  deserializePrivateKey,
} from "../encryption/Encryption";
import { useCryptography } from "../cryptography/Cryptography";

export default ({ children }) => {
  const { randomString } = useCryptography();
  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  const addToBlockchainDispatch = (podId, blocks, block, storage) =>
    dispatch(addToBlockchain({ podId, blocks, block, storage, append: true }));
  const { compiledBlockchain: userProfile, addBlocks: addBlocksToProfile } =
    useBlockchain({
      compiler: profileCompiler,
      blockchain: userProfileBlockchain,
      dispatch: addToBlockchainDispatch,
    });
  const contacts = useSelector((state) => state.contacts);
  const pods = useSelector((state) => state.pods);
  const encryptionKeys = useSelector((state) => state.encryption);
  const dispatch = useDispatch();
  const addContactDispatch = (contact) => dispatch(addContact(contact));
  const updateContactDispatch = (contact) => dispatch(updateContact(contact));
  const addMessageToConversationDispatch = (message) =>
    dispatch(addMessage(message));
  const createNewPodDispatch = (pod) => dispatch(createNewPod(pod));
  const addEncryptionKeysDispatch = (keys) => dispatch(addEncryptionKeys(keys));
  const updateEncryptionKeysDispatch = (keys) =>
    dispatch(updateEncryptionKeys(keys));
  const addUserToPodDispatch = (podId, userId) =>
    dispatch(addUserToPod({ podId, userId }));
  const updatePodUnreadCountDispatch = (podId, unreadCount) =>
    dispatch(updatePodUnreadCount({ podId, unreadCount }));
  const setShouldHangupDispatch = (podId, shouldHangup) =>
    dispatch(setShouldHangup({ podId, shouldHangup }));
  const setPeerIsTypingDispatch = (podId, peerDisplayName, isTyping) =>
    dispatch(setPeerIsTyping({ podId, peerDisplayName, isTyping }));
  const setEphemeralStoreDispatch = (podId, ephemeralStorage) =>
    dispatch(setEphemeralStorage({ podId, ephemeralStorage }));
  const addStorageItemDispatch = (podId, item) =>
    dispatch(addStorageItem({ podId, item }));
  const sendNotification = useNotification();

  const appiSchema = createAppiSchema(
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
  );

  const onConnection = async (
    connection,
    sendMessage,
    managedState,
    activeConnections,
  ) => {
    if (!!true || !activeConnections.includes(connection.peer)) {
      const contactDetails = managedState.contacts.find(
        (contact) => contact.connectionId === connection.peer,
      );

      if (contactDetails) {
        const publicKey = encryptionKeys[contactDetails.id]?.remotePublicKey;
        const privateKey = encryptionKeys[contactDetails.id]?.privateKey;
        const randomHash = randomString();
        const encryptedRandomHash = await encrypt(
          randomHash,
          await deserializePublicKey(publicKey),
        );
        const response = await sendMessage(
          connection.peer,
          { type: "validateIdentity", payload: encryptedRandomHash },
          connection,
        );
        if (
          randomHash ===
          (await decrypt(
            response.data,
            await deserializePrivateKey(privateKey),
          ))
        ) {
          const message = `✅ ${contactDetails.displayName} connected`;
          sendNotification(message, { variant: "success" });

          const peerPods = await sendMessage(
            connection.peer,
            { type: "syncPodBlockchains" },
            connection,
          );

          peerPods?.pods
            ?.filter(
              (ppod) => !managedState.pods.find((pod) => pod.id === ppod.id),
            )
            .forEach(async (ppod) => {
              const {
                id,
                name,
                members,
                unreadCount,
                shouldHangup,
                peerIsTyping,
                blockchain,
                storage,
              } = ppod;
              const newPod = {
                id,
                pendingBlocks: blockchain.chain,
                pendingStorage: blockchain.storage,
              };
              createNewPodDispatch(newPod);
            });
        } else {
          connection.close();
        }
      } else if (!contactDetails) {
        const myUserDetails = {
          connectionId: managedState.userProfile.connectionId,
          id: managedState.userProfile.id,
          displayName: managedState.userProfile.displayName,
          avatar: managedState.userProfile.avatar,
        };

        const connectingMessage = `⌛ Connecting to peer`;
        sendNotification(connectingMessage, { variant: "info" });

        const userDetails = await sendMessage(
          connection.peer,
          { type: "requestUserDetails", payload: myUserDetails },
          connection,
        );

        if (userDetails) {
          const { id } = userDetails;
          const storedContact = managedState.contacts.find(
            (contact) => contact.id === id,
          );

          if (storedContact) {
            const publicKey =
              encryptionKeys[storedContact.connectionId]?.publicKey;
            const randomHash = randomString();
            const encryptedRandomHash = await encrypt(
              randomHash,
              await deserializePublicKey(publicKey),
            );
            const response = await sendMessage(
              connection.peer,
              { type: "validateIdentity", payload: encryptedRandomHash },
              connection,
            );
            if (response.data === randomHash) {
              updateContactDispatch(userDetails);
              const connectedMessage = `✅ ${userDetails.displayName} connection ID updated`;
              sendNotification(connectedMessage, { variant: "success" });

              const peerPods = await sendMessage(
                connection.peer,
                { type: "syncPodBlockchains" },
                connection,
              );
              const pods = peerPods.pods.map((pod) => {
                const blockchainInstance = new Blockchain({
                  compiler: podCompiler,
                  chain: pod.blockchain?.chain ?? [],
                  storage: pod.blockchain?.storage ?? {},
                });
                const compiledBlockchain = blockchainInstance?.compile?.();
                return compiledBlockchain;
              });
            } else {
              connection.close();
            }
          } else {
            addContactDispatch({
              connectionId: connection.peer,
              ...userDetails,
            });
            const { publicKey, privateKey } = await generateKeyPair();
            const serializedPublicKey = await window.crypto.subtle.exportKey(
              "jwk",
              publicKey,
            );
            const serializedPrivateKey = await window.crypto.subtle.exportKey(
              "jwk",
              privateKey,
            );

            const response = await sendMessage(
              connection.peer,
              {
                type: "createEncryption",
                payload: { publicKey: serializedPublicKey },
              },
              connection,
            );
            if (response) {
              addEncryptionKeysDispatch({
                userId: id,
                publicKey: serializedPublicKey,
                privateKey: serializedPrivateKey,
                remotePublicKey: response.publicKey,
                symmetricKey: response.symmetricKey,
                established: true,
              });

              const connectedMessage = `✅ ${userDetails.displayName} added to contacts`;
              sendNotification(connectedMessage, { variant: "success" });

              const peerPods = await sendMessage(
                connection.peer,
                { type: "syncPodBlockchains" },
                connection,
              );
            }
          }
        }
      }
    }
  };

  const managedState = useMemo(
    () => ({
      userProfile,
      contacts,
      pods,
    }),
    [userProfile, contacts, pods],
  );

  return (
    <PeerProvider
      appiSchema={appiSchema}
      managedState={{ ...managedState }}
      onConnection={onConnection}
    >
      {children}
    </PeerProvider>
  );
};
