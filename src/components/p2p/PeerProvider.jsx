import React, { useState, useEffect, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePeerId,
  addToBlockchain,
} from "../redux/slices/userProfileSlice";
import Blockchain, { useBlockchain } from "../blockchain/Blockchain";
import {
  compiler as profileCompiler,
  blockBuilders,
} from "../blockchain/chains/profileChain";
import {
  decrypt,
  encrypt,
  encryptWithSymmetricKey,
  decryptWithSymmetricKey,
} from "../encryption/Encryption";
import Peer from "peerjs";
import Chance from "chance";
import { randomString } from "../cryptography/Cryptography";
const chance = new Chance();

export const PeerContext = createContext();

let peer = null;
const setPeer = (newState) => (peer = newState);

let pendingCallbacks = [];
const setPendingCallbacks = (newState) => (pendingCallbacks = newState);

let connections = {};
const setConnections = (newState) => (connections = newState);

let calls = [];
const setCalls = (newState) => (calls = newState);

let streams = [];
const setStreams = (newState) => (streams = newState);

function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
  this.push = () => {};
}

export default function PeerProvider({
  children,
  appiSchema,
  onConnection,
  managedState,
}) {
  // const [peer, setPeer] = useState(null);
  const [peerHash, setPeerHash] = useState(chance.hash());
  const [activeConnections, setActiveConnections] = useState([]);
  const [peerEncryptionKeys, setPeerEncryptionKeys] = useState([]);
  // const [connections, setConnections] = useState({});
  // const [calls, setCalls] = useState([]);
  const [callsHash, setCallsHash] = useState(chance.hash());
  // const [streams, setStreams] = useState([]);

  const storedBlockchain = useSelector((state) => state.userProfile.blockchain);
  const dispatch = useDispatch();
  const addToBlockchainDispatch = (podId, blocks, block, storage) =>
    dispatch(addToBlockchain({ podId, blocks, block, storage, append: true }));
  const { compiledBlockchain: compiledProfile, addBlocks: addBlocksToProfile } =
    useBlockchain({
      compiler: profileCompiler,
      blockchain: storedBlockchain,
      dispatch: addToBlockchainDispatch,
    });
  const storedPeerId = compiledProfile.connectionId;
  const agreedToTerms = compiledProfile.agreedToTerms?.length;

  // const storedPeerId = useSelector((state) => state.userProfile.connectionId);
  // const agreedToTerms = useSelector((state) => state.userProfile.agreedToTerms?.length);
  // const dispatch = useDispatch();
  // const setPeerId = (peerId) => console.log('setPeerId', peerId) && dispatch(updatePeerId(peerId));

  const setPeerId = (peerId) => {
    const newBlocks = [
      ...blockBuilders().updateConnectionId({
        from: storedPeerId,
        connectionId: peerId,
      }),
    ];

    // setPeerHash(chance.hash());
    // setTimeout(() => setPeerHash(chance.hash()), 1000);
    addBlocksToProfile(newBlocks);
  };
  const encryptionKeys = useSelector((state) => state.encryption);

  const peerOnDataHandler = (data, connection) =>
    handleConnectionDataWithManagedState(connection, managedState, data);

  const peerConnectionHandler = (connection) => {
    // const newListener = data => peerOnDataHandler(data, connection);
    // const newListener = (data) => new EE(data => peerOnDataHandler(data, connection))
    try {
      connection.off("data");
    } catch (err) {
      console.log("error removing data listener", err);
    }
    connection.on("data", (data) => peerOnDataHandler(data, connection));

    if (peer) {
      try {
        peer.off("connection");
      } catch (err) {
        console.log("error peer connection data listener", err);
      }

      try {
        peer.off("call");
      } catch (err) {
        console.log("error peer connection call listener", err);
      }

      peer.on("connection", (connection) => {
        console.log("new connection");

        connection.on("close", (connection) => {
          console.log("peer closed", connection);

          setConnections((connections) => {
            const newConnections = { ...connections };
            delete newConnections[connection?.peer];
            return newConnections;
          });
          setActiveConnections(
            Object.keys(connections).filter((c) => c !== connection?.peer),
          );

          const remoteStreamId = calls.find(
            (call) => call.peer !== connection?.peer,
          )?._remoteStream?.id;

          setCalls(calls.filter((call) => call.peer !== connection?.peer));
          setCallsHash(chance.hash());
          // setPeerHash(chance.hash());
        });

        onConnection(
          connection,
          sendMessageWithCallback,
          managedState,
          Object.keys(connections).filter((c) => c !== connection?.peer),
        );
        setConnections({
          ...connections,
          [connection.peer]: connection,
        });
        setActiveConnections([...Object.keys(connections), connection.peer]);
        // setPeerHash(chance.hash());
      });

      peer.on("call", async (call) => {
        console.log("call received", call);

        call.on("stream", (stream) => {
          console.log("stream received from remote", stream);
          // setStreams((streams) => {
          //     // do not add stream if it is already set
          //     if (streams.find((s) => s.id === stream.id)) {
          //         return streams;
          //     }
          //     return [...streams, stream];
          // });
        });
        call.on("close", () => {
          endCall(call.peer);
        });

        setCalls([...calls, call]);
        setCallsHash(chance.hash());
      });
    }
  };

  useEffect(() => {
    const activeConnectionsToManage = activeConnections.map(
      (c) => connections[c],
    );

    activeConnectionsToManage.forEach((connection) => {
      // const newListener = new EE(data => peerOnDataHandler(data, connection))
      // connection.close();
      // connectToPeer(connection.peer)
      // debugger;
      // console.log('>>>>>> setting data handler')
      // connection.off('data', data => peerOnDataHandler(data, connection));
      // connection.on('data', data => peerOnDataHandler(data, connection));
      // if (connection._events) {
      //     connection._events.data = newListener;
      // }

      // const newListener = data => peerOnDataHandler(data, connection);
      // connection.off('data', newListener);
      // connection.on('data', newListener);
      peerConnectionHandler(connection);
    });
    // // activeConnections.forEach(peerId => connectToPeer(peerId))
  }, [managedState, activeConnections, callsHash, peerHash]);

  useEffect(() => {
    const deserializedEncryptionKeys = async () => {
      const keyPairs = await Promise.all(
        Object.keys(encryptionKeys).map(async (userId) => {
          const { privateKey, remotePublicKey, symmetricKey, established } =
            encryptionKeys[userId];
          const deserializedPrivateKey =
            privateKey &&
            (await window.crypto.subtle.importKey(
              "jwk",
              {
                ...privateKey,
                kty: "RSA",
              },
              {
                name: "RSA-OAEP",
                hash: "SHA-256",
              },
              true,
              ["decrypt"],
            ));
          const deserializedRemotePublicKey =
            remotePublicKey &&
            (await window.crypto.subtle.importKey(
              "jwk",
              {
                ...remotePublicKey,
                kty: "RSA",
              },
              {
                name: "RSA-OAEP",
                hash: "SHA-256",
              },
              true,
              ["encrypt"],
            ));
          const deserializedSymmetricKey =
            symmetricKey &&
            (await window.crypto.subtle.importKey(
              "jwk",

              {
                ...symmetricKey,
                kty: "oct",
              },
              {
                name: "AES-GCM",
                length: 256,
              },
              true,
              ["encrypt", "decrypt"],
            ));

          function setClassPropsFromJson(json, instance) {
            for (let prop in json) {
              if (json.hasOwnProperty(prop)) {
                instance[prop] = json[prop];
              }
            }
            return instance;
          }

          return {
            userId,
            privateKey: setClassPropsFromJson(
              privateKey,
              deserializedPrivateKey,
            ), // {...deserializedPrivateKey, ...privateKey},
            remotePublicKey: setClassPropsFromJson(
              remotePublicKey,
              deserializedRemotePublicKey,
            ), // {...deserializedRemotePublicKey, ...remotePublicKey},
            symmetricKey: setClassPropsFromJson(
              symmetricKey,
              deserializedSymmetricKey,
            ), // {...deserializedSymmetricKey, ...symmetricKey},
            established,
          };
        }),
      );

      setPeerEncryptionKeys(keyPairs);
    };
    deserializedEncryptionKeys();
  }, [encryptionKeys]);

  const handleConnectionData = async (connection, managedState, rawData) => {
    const state = managedState;
    const { privateKey, remotePublicKey, established, symmetricKey } =
      peerEncryptionKeys.find(
        (keyPair) => keyPair.userId === connection.peer,
      ) ?? {};
    let data = rawData;
    if (symmetricKey) {
      // debugger;
      // const encrypted = (await encryptWithSymmetricKey(JSON.stringify(rawData), symmetricKey));
      // console.log('encrypted symmetric', encrypted);

      try {
        data = JSON.parse(await decryptWithSymmetricKey(rawData, symmetricKey));
        console.log("decrypted symmetric", data);
      } catch (err) {
        console.log("error decrypting symmetric", err, rawData);
        data = rawData;
      }
    }
    if (data.callback) {
      const callback = pendingCallbacks.find((cb) => cb.id === data.callback);
      if (callback) {
        callback.recieved(data.payload);
        setPendingCallbacks(
          pendingCallbacks.filter((cb) => cb.id !== data.callback),
        );
        return;
      }
    }

    if (
      data.type &&
      appiSchema[data.type] &&
      appiSchema[data.type](state).length
    ) {
      const request = {
        payload: data.payload,
        // get sender from contacts by connectionId
        sender: managedState.contacts.find(
          (contact) => contact.connectionId === connection.peer,
        )?.id,
      };
      const response = {
        send: async (payload) => {
          let payloadToSend = {
            payload,
            callback: data.callback,
          };

          if (symmetricKey) {
            payloadToSend = await encryptWithSymmetricKey(
              JSON.stringify({
                payload,
                callback: data.callback,
              }),
              symmetricKey,
            ).catch((err) => {
              console.log("error encrypting", err);
            });
          }

          connection.send(payloadToSend);
        },
      };
      const next = (index) => {
        if (index < appiSchema[data.type](state).length) {
          appiSchema[data.type](state)[index](request, response, () => {
            next(index + 1);
          });
        }
      };
      next(0);
    }
  };

  const handleConnectionDataWithManagedState = (
    connection,
    managedState,
    data,
  ) => {
    return handleConnectionData(connection, managedState, data);
  };

  const disconnectFromPeer = (peerId) => {
    if (connections[peerId]) {
      connections[peerId].close();
      setConnections({ ...connections, [peerId]: null });
      setActiveConnections(
        Object.keys(connections).filter((c) => c !== peerId),
      );
    }
  };

  const connectToAllContacts = (peer) => {
    // filter connected contacts and connect to the ones not connected.
    const connectedContacts = Object.keys(connections).filter(
      (contact) =>
        connections[contact]?.peerConnection?.iceConnectionState ===
        "connected",
    );
    const contactsToConnect = managedState.contacts.filter(
      (contact) => !connectedContacts.includes(contact.connectionId),
    );
    contactsToConnect.forEach((contact) =>
      connectToPeer(contact.connectionId, peer),
    );

    // filter connected contacts and disconnect from the ones not in the contacts list.
    const contactsToDisconnect = connectedContacts
      .filter(
        (contact) =>
          !managedState.contacts.find((c) => c.connectionId === contact),
      )
      .map((contact) => contact.connectionId);
    const disconnectedContacts = Object.keys(connections).filter(
      (contact) =>
        connections[contact]?.peerConnection?.iceConnectionState ===
        "disconnected",
    );
    [...contactsToDisconnect, ...disconnectedContacts].forEach((contact) =>
      disconnectFromPeer(contact),
    );
  };

  const handlePeerInitialisation = (newPeer) => {
    try {
      newPeer.off("open");
    } catch (err) {
      console.log("error removing open listener", err);
    }
    try {
      newPeer.off("disconnected");
    } catch (err) {
      console.log("error removing open listener", err);
    }
    try {
      newPeer.off("close");
    } catch (err) {
      console.log("error removing open listener", err);
    }

    newPeer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      // setPeerId(id);
      setPeer(newPeer);
      setPeerHash(chance.hash());

      // setInterval(() => {
      //     connectToAllContacts(newPeer)
      // }, 5000);
      connectToAllContacts(newPeer);
    });

    newPeer.on("disconnected", (...rest) => {
      console.log("peer disconnected", ...rest);

      newPeer.reconnect();
      setPeer(null);
      setPeerHash(chance.hash());
    });

    newPeer.on("close", (connection) => {
      console.log("peer closed", connection);
      setPeer(null);
      setPeerHash(chance.hash());
    });
  };

  useEffect(() => {
    if (!peer && !!storedPeerId && !!agreedToTerms) {
      const newPeer = new Peer(storedPeerId, {
        host: compiledProfile?.peerjsServer || "0.peerjs.com",
      });
      console.log("peer created");

      handlePeerInitialisation(newPeer);
    } else {
      if (!storedPeerId) {
        if (peer) {
          peer.destroy();
        }
        // generate a long random string
        const newPeerId = chance.hash();
        setPeerId(newPeerId);
        setPeer(null);
        setPeerHash(chance.hash());
      }
    }
  }, [storedPeerId, agreedToTerms]);

  useEffect(() => {
    const newActiveConnections = Object.keys(connections).filter(
      (c) => connections[c]?.peerConnection?.iceConnectionState === "connected",
    );
    if (
      newActiveConnections.length !== activeConnections.length ||
      !newActiveConnections.every((c) => activeConnections.includes(c))
    ) {
      console.log({ newActiveConnections, activeConnections });
      setActiveConnections(newActiveConnections);
      setPeerHash(chance.hash());
    }

    // setTimeout(() => setPeerHash(chance.hash()), 5000);
  }, [peerHash]);

  useEffect(() => {
    if (peer) {
      // peer.off('connection');
      peer.on("connection", (connection) => {
        console.log("new connection");
        // initConnectionListender();
        // connection.on('data', (data) => handleConnectionDataWithManagedState(connection, managedState, data));

        // setInterval(() => {
        // const newListener = data => peerOnDataHandler(data, connection);
        // connection.off('data', newListener);
        // connection.on('data', newListener);
        // }, 1000);

        connection.on("close", (connection) => {
          console.log("peer closed", connection);

          // setConnections({ ...connections, [connection?.peer]: null });
          // useSetConnections to remove the key wuth the connection id from the connections object
          setConnections((connections) => {
            const newConnections = { ...connections };
            delete newConnections[connection?.peer];
            return newConnections;
          });
          setActiveConnections(
            Object.keys(connections).filter((c) => c !== connection?.peer),
          );

          const remoteStreamId = calls.find(
            (call) => call.peer !== connection?.peer,
          )?._remoteStream?.id;

          // const newStreams = streams.filter((stream) => stream.id !== remoteStreamId);

          setCalls(calls.filter((call) => call.peer !== connection?.peer));
          setCallsHash(chance.hash());

          // setStreams(newStreams);
        });

        onConnection(
          connection,
          sendMessageWithCallback,
          managedState,
          Object.keys(connections).filter((c) => c !== connection?.peer),
        );
        setConnections({
          ...connections,
          [connection.peer]: connection,
        });
        setActiveConnections([...Object.keys(connections), connection.peer]);
      });

      peer.on("call", async (call) => {
        console.log("call received", call);

        call.on("stream", (stream) => {
          console.log("stream received from remote", stream);
          // setStreams((streams) => {
          //     // do not add stream if it is already set
          //     if (streams.find((s) => s.id === stream.id)) {
          //         return streams;
          //     }
          //     return [...streams, stream];
          // });
        });
        call.on("close", () => {
          endCall(call.peer);
        });

        setCalls([...calls, call]);
        setCallsHash(chance.hash());
      });
    }
  }, [peerHash, managedState, callsHash]);

  const getManagedState = () => {
    return managedState;
  };

  const connectToPeer = (peerId, peerOverride) => {
    const connection = (peerOverride ?? peer)?.connect(peerId);
    if (connection) {
      connection.on("open", () => {
        console.log("connection opened");
        peerConnectionHandler(connection);
        // connection.on('data', (data) => handleConnectionDataWithManagedState(connection, managedState, data));

        // setInterval(() => {
        // const newListener = data => peerOnDataHandler(data, connection);
        // connection.off('data', newListener);
        // connection.on('data', newListener);
        // }, 1000);

        setConnections({
          ...connections,
          [connection.peer]: connection,
        });
        setActiveConnections([...Object.keys(connections), connection.peer]);

        onConnection(connection, sendMessageWithCallback, managedState, [
          ...Object.keys(connections),
          connection.peer,
        ]);
      });
    }
  };

  const sendMessageWithCallback = async (peerId, message, connection) => {
    const id = Math.random().toString(36).substr(2, 9);

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("timeout for message:" + JSON.stringify({ message })));
      }, 60000);

      setPendingCallbacks([
        ...pendingCallbacks,
        {
          id,
          recieved: (response) => {
            clearTimeout(timeout);
            console.log("callback recieved!");
            resolve(response);
          },
        },
      ]);

      sendMessage(
        peerId,
        {
          ...message,
          callback: id,
        },
        connection,
      );
    });
  };

  const sendMessage = async (peerId, message, connectionOverride) => {
    const connection = connectionOverride ?? connections[peerId];
    const { remotePublicKey, established } =
      peerEncryptionKeys.find((keyPair) => keyPair.userId === peerId) ?? {};

    if (connection) {
      let payloadToSend = { ...message };

      if (remotePublicKey && established) {
        payloadToSend = await encrypt(JSON.stringify(message), remotePublicKey);
      }
      connection.send(payloadToSend);
    }
  };

  const makeCall = async ({ peerId, video, audio, screen, cast }) => {
    if (peerId) {
      const stream = await navigator.mediaDevices[
        screen ? "getDisplayMedia" : "getUserMedia"
      ]({
        video: cast ? { facingMode: "environment" } : !!video,
        audio: audio ? true : false
      });

      const call = peer.call(peerId, stream, { metadata: { cast } });
      call.on("stream", function (stream) {
        // B
        // window.remoteAudio.srcObject = stream; // C
        // window.remoteAudio.autoplay = true; // D
        // window.peerStream = stream; //E
        // showConnectedContent(); //F    });
        console.log("stream received", stream);
        // setStreams((streams) => {
        //     // do not add stream if it is already set
        //     if (streams.find((s) => s.id === stream.id)) {
        //         return streams;
        //     }
        //     return [...streams, stream];
        // });
      });

      setCalls([...calls, call]);
      setCallsHash(chance.hash());
    }
  };

  const endCall = (peerId) => {
    const call = calls.find((call) => call.peer === peerId);
    call.close();
    setCalls(calls.filter((call) => call.peer !== peerId));
    setCallsHash(chance.hash());
  };

  return (
    <PeerContext.Provider
      value={{
        peer,
        activeConnections,
        connections,
        connectToPeer,
        sendMessage,
        sendMessageWithCallback,
        calls,
        streams,
        callsLength: calls.length,
        makeCall,
        endCall,
        peerHash,
        callsHash,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
}
