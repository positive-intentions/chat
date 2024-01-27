import createEncryptionMiddleware from "./encryptionMiddleware";
import { compiler as podCompiler } from "../../blockchain/chains/podChain";
import Blockchain from "../../blockchain/Blockchain";
import FileSaver from "file-saver";
import { logToNLevelAnalytics } from "../../utils/analytics";

const podEndpoints = (
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
) => {
  const encryptionMiddleware = createEncryptionMiddleware(encryptionKeys);
  return {
    requestPodDetails: (state) => [
      // encryptionMiddleware,
      (request, response, next) => {
        console.log("recieving requestPodDetails", request.payload);

        // response.send('requestUserDetails');
        const pod = state.pods.find((pod) => pod.id === request.payload.id);
        response.send("recievePodDetails", { ...pod, messages: [] });
      },
    ],
    recievePodDetails: (state) => [
      // encryptionMiddleware,
      (request, response, next) => {
        console.log("recieving recievePodDetails", request.payload);
        if (!state.pods.find((pod) => pod.id === request.payload.id)) {
          console.log("recievePodDetails", request.payload);
          createNewPodDispatch(request.payload);
        }
      },
    ],
    addUserToPod: (state) => [
      // encryptionMiddleware,
      (request, response, next) => {
        console.log("recieving addNewPod", request.payload);
        addUserToPodDispatch(request.payload.podId, request.payload.userId);
        response.send();
      },
    ],
    addNewPod: (state) => [
      // encryptionMiddleware,
      (request, response, next) => {
        console.log("recieving addNewPod", request.payload);
        if (!state.pods.find((pod) => pod.id === request.payload.id)) {
          console.log("addNewPod", request.payload);

          // const blockchainInstance = new Blockchain({
          //     compiler: podCompiler,
          //     chain: pod.blockchain?.chain ?? [],
          //     storage: pod.blockchain?.storage ?? {},
          // });
          // const compiledBlockchain = blockchainInstance?.compile?.();

          // const payLoadContainsClone = request.payload.pendingBlocks.find((block) => block.type === 'setClone');
          // const cloneAlreadyExists = state.pods.find((pod) => !!pod.clone);

          // find the value of "cloneAlreadyExists" and "payLoadContainsClone" in the console log below
          // you will have to get the compiles result from the blockchain
          const blockchainInstance = new Blockchain({
            compiler: podCompiler,
            chain: request.payload.pendingBlocks,
            storage: request.payload.pendingStorage,
          });
          const compiledBlockchain = blockchainInstance?.compile?.();
          const payLoadContainsClone = compiledBlockchain?.clone;

          const cloneAlreadyExists = !!state.pods.find((pod) => {
            const blockchainInstance = new Blockchain({
              compiler: podCompiler,
              chain: pod.blockchain?.chain ?? [],
              storage: pod.blockchain?.storage ?? {},
            });
            const compiledBlockchain = blockchainInstance?.compile?.();
            return compiledBlockchain?.clone;
          });

          console.log({
            payLoadContainsClone,
            cloneAlreadyExists,
            payload: request.payload,
            state,
          });

          if (payLoadContainsClone && cloneAlreadyExists) {
            console.log("clone already exists");
            return response.send({ canCreateClone: false });
          }

          // cloning is only allowed when there are no existing pods
          if (state.pods.length !== 0 && payLoadContainsClone) {
            console.log(
              "cloning is only allowed when there are no existing pods",
            );
            return response.send({ canCreateClone: false });
          }

          createNewPodDispatch(request.payload);
        } else {
          const newMember =
            request.payload.members[request.payload.members.length - 1];
          addUserToPodDispatch(request.payload.id, newMember);
        }
        response.send();
      },
    ],
    message: (state) => [
      // encryptionMiddleware,
      (request, response, next) => {
        const isNotOnPodPage =
          window.location.pathname !== `/pod/${request.payload.podId}`;
        const isNotOnPodsOverViewPage = window.location.pathname !== `/pods`;
        console.log("in message handler");
        logToNLevelAnalytics("RecievingMessageSuccess");

        if (isNotOnPodPage || document.hidden) {
          // create messahe for notification. something like:
          // "james: hello world"
          const contactName = state.contacts.find(
            (contact) => contact.connectionId === request.payload.message.from,
          ).displayName;
          const content = request.payload.message.content;
          const message = `💬 ${contactName}: ${content}`;
          sendNotification(message, { variant: "success" });
          const storedUnreadCount =
            state.pods.find((pod) => pod.id === request.payload.podId)
              ?.unreadCount || 0;
          const newUnreadCount = storedUnreadCount ? storedUnreadCount + 1 : 1;
          updatePodUnreadCountDispatch(request.payload.podId, newUnreadCount);
          // updatePodUnreadCountDispatch( request.payload.podId, 1);
        }

        if (!state.pods.find((pod) => pod.id === request.payload.id)) {
          createNewPodDispatch(request.payload.podDetails);
        }

        addToBlockchainDispatch(
          request.payload.podId,
          request.payload.blocks,
          request.payload.block,
          request.payload.storage,
        );
        addMessageToConversationDispatch({
          podId: request.payload.podId,
          message: {
            ...request.payload.message,
            attachment: request.payload.message?.attachment?.sha,
          },
        });
        if (request.payload.message.attachment)
          addStorageItemDispatch(
            request.payload.podId,
            request.payload.message.attachment,
          );
        response.send();
      },
    ],
    largeFile: (state) => [
      // encryptionMiddleware,
      (request, response, next) => {
        console.log("recieving largeFile", request.payload);
        // download the base64encoded file inrequest.payload.data
        // and save it to the file system
        sendNotification("Downloading file", {
          variant: "success",
          insist: true,
        });
        // const file = request.payload.data;
        // const blob = new Blob([file], { type: "application/octet-stream" });
        // FileSaver.saveAs(blob, request.payload.name);

        const element = document.createElement("a");
        element.href = request.payload?.data; // URL.createObjectURL(file);
        element.download = request.payload?.name;
        document.body.appendChild(element);
        element.click();
        response.send();
      },
    ],
    setShouldHangup: (state) => [
      (request, response, next) => {
        console.log("recieving setShouldHangup", request.payload);
        setShouldHangupDispatch(
          request.payload.podId,
          request.payload.shouldHangup,
        );
        response.send();
      },
    ],
    setPeerIsTyping: (state) => [
      (request, response, next) => {
        console.log("recieving setPeerIsTyping", request.payload);
        setPeerIsTypingDispatch(
          request.payload.podId,
          request.payload.peerDisplayName,
          request.payload.isTyping,
        );
        response.send();
      },
    ],
    updateEphemeralStorage: (state) => [
      (request, response, next) => {
        console.log("recieving updateEphemeralStorage", request.payload);
        setEphemeralStoreDispatch(
          request.payload.podId,
          request.payload.ephemeralStorage,
        );
        response.send();
      },
    ],
    addToBlockchain: (state) => [
      (request, response, next) => {
        console.log("recieving addToBlockchain", request.payload);
        addToBlockchainDispatch(
          request.payload.id,
          request.payload.pendingBlocks,
          request.payload.block,
          request.payload.pendingStorage,
        );
        response.send();
      },
    ],
    syncPodBlockchains: (state) => [
      (request, response, next) => {
        const pods = state.pods.filter((pod) => {
          const blockchainInstance = new Blockchain({
            compiler: podCompiler,
            chain: pod.blockchain?.chain ?? [],
            storage: pod.blockchain?.storage ?? {},
          });
          const compiledBlockchain = blockchainInstance?.compile?.();
          console.log("sync blockchain compoled", {
            compiledBlockchain,
            request,
          });
          return compiledBlockchain?.users.includes(
            request?.payload?.userId ?? "",
          );
        });
        console.log({ pods });
        response.send({ pods });
      },
    ],
  };
};

export default podEndpoints;
