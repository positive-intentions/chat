import { useEffect, useRef, useMemo, useState } from "react";
import { Engine, Scene } from "@babylonjs/core";
import { useTheme } from "@mui/styles";
import usePeer from "../../p2p/usePeer";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToBlockchain } from "../../redux/slices/podsSlice";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import {
  compiler as podCompiler,
  blockBuilders,
} from "../../blockchain/chains/podChain";
import { compiler as profileCompiler } from "../../blockchain/chains/profileChain";

import { debounce, throttle } from "lodash";

// detect if mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  onRender,
  onSceneReady,
  ...rest
}) => {
  const reactCanvas = useRef(null);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const [engine, setEngine] = useState(null);
  const [scene, setScene] = useState(null);

  const { podId } = useParams();
  const dispatch = useDispatch();

  const userProfileBlockchain = useSelector(
    (state) => state.userProfile.blockchain,
  );
  //   const addToBlockchainDispatch = ({block, blocks, storage}) => dispatch(addToBlockchain({ podId, block,blocks, storage }));
  const {
    compiledBlockchain: userProfile,
    //   addBlocks: addBlocksToProfile,
  } = useBlockchain({
    compiler: profileCompiler,
    blockchain: userProfileBlockchain,
    //   dispatch: addToBlockchainDispatch,
  });
  const storedConnectionId = userProfile.connectionId;

  const storedPods = useSelector((state) => state.pods);

  const addToBlockchainDispatch = ({ block, blocks, storage }) =>
    dispatch(addToBlockchain({ podId, block, blocks, storage }));
  const conversation = storedPods.find((pod) => pod.id === podId);
  const { compiledBlockchain: podBlockchain, addBlocks: addBlocksToPod } =
    useBlockchain({
      compiler: podCompiler,
      blockchain: conversation?.blockchain,
      dispatch: addToBlockchainDispatch,
    });
  const {
    sendMessage,
    makeCall,
    endCall,
    calls,
    callsHash,
    activeConnections,
  } = usePeer(podBlockchain?.users || []);
  const { ephemeralStorage } =
    useSelector((state) => state.pods.find((pod) => pod.id === podId)) || {};

  const [mediaStream, setMediaStream] = useState(null);
  const [calledContacts, setCalledContacts] = useState(false);

  // useEffect(() => {
  //     podBlockchain.users
  //         .filter(user => activeConnections)
  //         .forEach((user) => {
  //         // if (!calls.includes(c => c.peer === user) && activeConnections.includes(user)) {
  //         //     makeCall({ video: true, audio: true });
  //         // }

  //         // callsUnanswered.forEach((call) => {
  //             //     makeCall({ video: true, audio: true });
  //             //     setCalledContacts([...calledContacts, user]);
  //             // });

  //         // const callUnanswered = calls.filter((call) => !call._remoteStream && call.peer === user);
  //         // console.log({ callUnanswered, calls, user })
  //         // setCalledContacts([...calledContacts, user]);

  //             makeCall({ video: true, audio: true });
  //             setCalledContacts(true);
  //     });
  //     // if (calledContacts === false){
  //     // }
  // }, [calledContacts])

  const handleAnswerCall = async (call) => {
    const hasVideo = call._remoteStream?.getVideoTracks().length > 0;
    const newMediaStream = await navigator.mediaDevices.getUserMedia({
      video: hasVideo ? true : true,
      audio: true,
    });
    call.answer(newMediaStream);
    // setMediaStream(newMediaStream)
  };

  useEffect(() => {
    console.log({ calls });
    calls.forEach((call) => {
      // is this a new call?
      if (!call._remoteStream) {
        handleAnswerCall(call);
      }
    });
  }, [calls]);

  // console.log(">>>> isDarkTheme: ", isDarkTheme, theme.palette, calls, ephemeralStorage, ephemeralStorage?.verse?.position)

  const onMove = (position) => {
    console.log("sending position: ", { position });
    sendMessage({
      type: "updateEphemeralStorage",
      callback: false,
      payload: {
        podId,
        ephemeralStorage: {
          verse: {
            position,
          },
        },
      },
    });
  };

  const storedContacts = useSelector((state) => state.contacts);
  const onlineUsersFromPod = (podBlockchain?.users || [])
    .filter((user) => activeConnections.includes(user))
    .map((user) => {
      const contact = storedContacts.find((contact) => {
        return contact.connectionId === user;
      });
      return contact;
    });
  const peerAvatar = onlineUsersFromPod?.[0]?.avatar;

  const debouncedOnMove = debounce(onMove, 1000);
  const throttledOnMove = throttle(onMove, 5);

  const onReduxConnectedRender = useMemo(
    () =>
      onRender({
        calls,
        ephemeralStorage,
        onMove: throttledOnMove,
      }),
    [calls, ephemeralStorage, peerAvatar],
  );

  // set up basic engine and scene
  useEffect(() => {
    const resize = () => {
      scene.getEngine().resize();
    };

    const initCanvas = () => {
      const { current: canvas } = reactCanvas;

      if (!canvas) return;

      const engine = new Engine(
        canvas,
        antialias,
        engineOptions,
        adaptToDeviceRatio,
      );
      setEngine(engine);
      let scene = new Scene(engine, sceneOptions);
      setScene(scene);
      // const xr = scene.createDefaultXRExperienceAsync({
      //     // ask for an ar-session
      //     uiOptions: {
      //       sessionMode: "immersive-ar",
      //     },
      //   });

      if (scene.isReady()) {
        onSceneReady(scene, {
          isDarkTheme,
          calls,
          isInPod: !!podId,
          peerAvatar,
        });
      } else {
        scene.onReadyObservable.addOnce((scene) =>
          onSceneReady(scene, {
            isDarkTheme,
            calls,
            isInPod: !!podId,
            peerAvatar,
          }),
        );
      }

      engine.runRenderLoop(() => {
        if (typeof onReduxConnectedRender === "function")
          onReduxConnectedRender(scene);
        scene.render();
      });

      if (window) {
        window.addEventListener("resize", resize);
      }
    };

    initCanvas();

    return () => {
      scene?.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    isDarkTheme,
  ]);

  const throttledEngineReset = throttle(() => {
    if (engine) {
      engine.stopRenderLoop();
      engine.runRenderLoop(() => {
        if (typeof onReduxConnectedRender === "function")
          onReduxConnectedRender(scene);
        scene && scene.render();
      });
    }
  }, 5);

  useEffect(() => {
    throttledEngineReset();
  }, [onReduxConnectedRender]);

  return (
    <>
      <canvas ref={reactCanvas} {...rest} />;
      {calls.length > 0 &&
        calls.map((call) => {
          return (
            <video
              key={call.peer}
              src={call._remoteStream}
              autoPlay={true}
              playsInline={true}
              // hidden from view
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                zIndex: -1,
              }}
            />
          );
        })}
    </>
  );
};
