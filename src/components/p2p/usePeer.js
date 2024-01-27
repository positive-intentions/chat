// create a react hook that uses the peer context
// it can take a peerId and provides helper methods to send and receive messages
// it can also take a group and provides helper methods to send and receive messages to all users in the group

import { useContext, useEffect, useMemo } from "react";
import { PeerContext } from "./PeerProvider";

export default function usePeer(peersToConnect) {
  const context = useContext(PeerContext);
  // check to see if peer is connected else connect to them
  const activeConnections = context.activeConnections;

  const connectedPeers = useMemo(() => activeConnections, [activeConnections]);
  const filteredPeersToConnect = Array.isArray(peersToConnect)
    ? peersToConnect
        .filter((peerId) => peerId !== context.peer?.id)
        .filter((peerId) => !!peerId && !connectedPeers.includes(peerId))
    : [peersToConnect];

  filteredPeersToConnect.forEach((peerId) => {
    if (peerId) {
      context.connectToPeer(peerId);
    }
  });

  // a method to send a message to a peer or group depending on if peerId or group is passed in
  const sendMessage = async ({
    type,
    recipients,
    payload,
    callback = true,
  }) => {
    const responses = await Promise.all(
      (recipients || peersToConnect)
        .filter((peerId) => peerId && context.connections[peerId])
        .map((peerId) => {
          if (!callback) {
            return context.sendMessage(peerId, { type, payload });
          }
          return context.sendMessageWithCallback(peerId, { type, payload });
        }),
    );

    return responses;
  };

  const makeCall = async ({ recipients, ...rest } = {}) => {
    (recipients || peersToConnect)
      .filter((peerId) => peerId !== context.peer?.id)
      .forEach(async (peerId) => {
        if (!context.calls.find((call) => call.peer === peerId)) {
          await context.makeCall({ peerId, ...rest });
        }
      });
  };

  const endCall = ({ recipients } = {}) => {
    (recipients || peersToConnect)
      .filter((peerId) => peerId !== context.peer?.id)
      .forEach(async (peerId) => {
        context.endCall(peerId);
      });
  };

  // a method to make a call to a peer or a group depending on if peerId or group is passed in
  // const makeCall = () => {
  //     if (peerId) {
  //         context.makeCall({peerId});
  //     } else if (groupId) {
  //         const group = context.groups.find((group) => group.id === groupId);
  //         context.makeCall({groupId: group.id});
  //     }
  // };

  // a method to end a call
  // const endCall = () => {
  //     if (peerId) {
  //         context.endCall(peerId);
  //     } else if (groupId) {
  //         const group = context.groups.find((group) => group.id === groupId);
  //         group.users.forEach((user) => {
  //             context.endCall(user.id);
  //         });
  //     }
  // };

  // // for the peer or group specified, automatically handle incoming messages with the handler.
  // // the handler is an array of functions like middleware function in expressjs
  // useEffect(() => {
  //     if (handlers) {

  //     }
  //     if (peerId) {
  //         context.connections[peerId].on('data', (data) => {
  //             handlers.forEach((handler) => {
  //                 handler(data);
  //             });
  //         });
  //     } else if (groupId) {
  //         const group = context.groups.find((group) => group.id === groupId);
  //         group.users.forEach((user) => {
  //             context.connections[user.id].on('data', (data) => {
  //                 handlers.forEach((handler) => {
  //                     handler(data);
  //                 });
  //             });
  //         });
  //     }
  // }, [peerId, groupId, handlers]);

  return {
    sendMessage,
    makeCall,
    endCall,
    activeConnections: context.activeConnections,
    connections: context.connections,
    connectToPeer: context.connectToPeer,
    calls: context.calls,
    // streams: context.calls.length > 0 ? context.calls.map(call => call._remoteStream) : [],
    callsLength: context.callsLength,
  };
}
