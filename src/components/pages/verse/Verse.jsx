import React, { useState, useEffect, useRef, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { makeStyles, useTheme } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername } from "../../redux/slices/userProfileSlice";
import { json, useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Thread, { formatDate } from "../../atomic/molecules/thread/Thread";
import Message from "../../atomic/atom/message/Message";
import {
  addMessage,
  updatePodUnreadCount,
  setShouldHangup,
  addToBlockchain,
} from "../../redux/slices/podsSlice";
import ImageIcon from "@mui/icons-material/Image";
import usePeer from "../../p2p/usePeer";
import calculateMD5 from "../../utils/calculateMd5";
import { addStorageItem } from "../../redux/slices/storageSlice";
import { Badge } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Blockchain, { useBlockchain } from "../../blockchain/Blockchain";
import { compiler as profileCompiler } from "../../blockchain/chains/profileChain";
import {
  compiler as podCompiler,
  blockBuilders,
  encodeEmojisToUnicode,
} from "../../blockchain/chains/podChain";
import { useTranslation } from "react-i18next";
import { logToNLevelAnalytics } from "../../utils/analytics";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";

import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Color3,
  StandardMaterial,
  Texture,
  VideoTexture,
  Tools,
  TransformNode,
  BackgroundMaterial,
  Mesh,
  VirtualJoysticksCamera,
  SceneLoader,
  PhysicsImpostor,
  Quaternion
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent.jsx"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// import "./App.css";

const lightBackground = "/backgrounds/light-leaves.png";
const darkBackground = "/backgrounds/dark-leaves.png";

let box;
let box2;
let box3;
let box4;
let box5;
let box6;
let box7;
let box8;
let box9;
let cameraPosition = { x: 0, y: 0, z: 0 };
let cameraRotation = { x: 0, y: 0, z: 0 };
let mirror;
let peerPlane;
let peerAvatar;
let xr;
let VJC;
let skydome = null;
let catModel;
const catModelPath = "/models/cat.glb";
let handModel;
const handModelPath = "/models/l_hand_rhs.glb";

// detect if mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const onSceneReady = async (
  scene,
  { isDarkTheme, calls, isInPod, peerAvatar: peerAvatarBase64 },
) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 2, -6), scene);

  // This targets the camera to scene origin
  // camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  canvas.style.cursor = "none";

  // This attaches the camera to the canvas with slower movement speed.
  // camera.attachControl(canvas, true);
  camera.speed = 0.1;
  camera.angularSensibility = 3000;
  camera.attachControl(canvas, true);

  // wasd controls and up/down with spacebar and shift
  camera.keysUp.push(87); // W
  camera.keysDown.push(83); // S
  camera.keysLeft.push(65); // A
  camera.keysRight.push(68); // D
  camera.keysUpward.push(32); // Spacebar
  camera.keysDownward.push(16); // Shift

  //in-game changed variables
  var target = new TransformNode();
  var currentState = "idle";
  var speed = 0;
  var rotation = 0;
  var mouseSpeed = 1.0;
  var mouseX = 0,
    mouseY = 0;
  var lmx = 0,
    lmy = 0;

  scene.onPointerMove = function (evt) {
    var mx = evt.clientX;
    var my = evt.clientY;

    mouseX += (mx - lmx) * mouseSpeed;
    mouseY += (my - lmy) * mouseSpeed;
    mouseY = clamp(mouseY, -35, 45);

    lmx = mx;
    lmy = my;

    target.rotation = new Vector3(
      Tools.ToRadians(mouseY) % 360,
      Tools.ToRadians(mouseX) % 360,
      0,
    );
  };
  //mouse lock
  canvas.onclick = function () {
    canvas.requestPointerLock();
  };

  function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape. make it light blue #1565c0
  box = MeshBuilder.CreateBox("box", { size: 0.5 }, scene);
  const material = new StandardMaterial("material", scene);
  material.diffuseTexture = new Texture("/avatars/1.jpg", scene);
  box.material = material;
  // Move the box upward 1/2 its height
  box.position.y = 1;
  box.position.z = -3;

  // create another box above with different colored sides
  box2 = MeshBuilder.CreateBox("box2", { size: 0.5 }, scene);
  box2.position.y = 1.7;
  box2.position.z = -3;
  const material2 = new StandardMaterial("material2", scene);
  material2.diffuseTexture = new Texture("/avatars/2.jpg", scene);
  material2.diffuseColor = new Color3(0.212, 0.596, 0.941);
  box2.material = material2;

  // create another box above with different colored sides
  box3 = MeshBuilder.CreateBox("box3", { size: 0.5 }, scene);
  box3.position.y = 2.4;
  box3.position.z = -3;
  const material3 = new StandardMaterial("material3", scene);
  material3.diffuseTexture = new Texture("/avatars/3.jpg", scene);
  box3.material = material3;

  // create another box above with different colored sides
  box4 = MeshBuilder.CreateBox("box4", { size: 0.5 }, scene);
  box4.position.y = 1;
  box4.position.x = 0.9;
  box4.position.z = -3;
  const material4 = new StandardMaterial("material4", scene);
  material4.diffuseTexture = new Texture("/avatars/4.jpg", scene);
  material4.diffuseColor = new Color3(0.212, 0.596, 0.941);
  box4.material = material4;

  // create another box above with different colored sides
  box5 = MeshBuilder.CreateBox("box5", { size: 0.5 }, scene);
  box5.position.y = 1.7;
  box5.position.x = 0.9;
  box5.position.z = -3;
  const material5 = new StandardMaterial("material5", scene);
  material5.diffuseTexture = new Texture("/avatars/5.jpg", scene);
  box5.material = material5;

  // create another box above with different colored sides
  box6 = MeshBuilder.CreateBox("box6", { size: 0.5 }, scene);
  box6.position.y = 2.4;
  box6.position.x = 0.9;
  box6.position.z = -3;
  const material6 = new StandardMaterial("material6", scene);
  material6.diffuseTexture = new Texture("/avatars/6.jpg", scene);
  material6.diffuseColor = new Color3(0.212, 0.596, 0.941);
  box6.material = material6;

  // create another box above with different colored sides
  box7 = MeshBuilder.CreateBox("box7", { size: 0.5 }, scene);
  box7.position.y = 1;
  box7.position.x = -0.9;
  box7.position.z = -3;
  const material7 = new StandardMaterial("material7", scene);
  material7.diffuseTexture = new Texture("/avatars/7.jpg", scene);
  material7.diffuseColor = new Color3(0.212, 0.596, 0.941);
  box7.material = material7;

  // create another box above with different colored sides
  box8 = MeshBuilder.CreateBox("box8", { size: 0.5 }, scene);
  box8.position.y = 1.7;
  box8.position.x = -0.9;
  box8.position.z = -3;
  const material8 = new StandardMaterial("material8", scene);
  material8.diffuseTexture = new Texture("/avatars/8.jpg", scene);
  box8.material = material8;

  // create another box above with different colored sides
  box9 = MeshBuilder.CreateBox("box9", { size: 0.5 }, scene);
  box9.position.y = 2.4;
  box9.position.x = -0.9;
  box9.position.z = -3;
  const material9 = new StandardMaterial("material9", scene);
  material9.diffuseTexture = new Texture("/avatars/9.jpg", scene);
  material9.diffuseColor = new Color3(0.212, 0.596, 0.941);
  box9.material = material9;

  // // the cat model
  const result = await SceneLoader.ImportMeshAsync(
    null,
    catModelPath,
    "",
    scene,
  );

  const catModel = result.meshes[1]; // scene.getMeshByName('cat');
  catModel.position.y = 1;
  catModel.position.z = 0;
  catModel.position.x = 0;
  catModel.rotate(new Vector3(1, 0, 0), Math.PI / 2);
  catModel.rotate(new Vector3(0, 0, 1), Math.PI);
  catModel.rotate(new Vector3(0, 1, 0), Math.PI);

  // add video texture to plane
  // const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });

  VideoTexture.CreateFromWebCam(
    scene,
    function (videoTexture) {
      // const videoTexture = new VideoTexture("video", videoStream, scene, true);
      mirror = MeshBuilder.CreateBox("mirror", { width: 1, height: 1 }, scene);
      mirror.position.y = 1;
      mirror.position.z = 3;
      // turn upside down
      mirror.rotation.z = Math.PI;
      const materialPlane = new StandardMaterial("materialPlane", scene);
      materialPlane.diffuseTexture = videoTexture;
      mirror.material = materialPlane;
    },
    { maxWidth: 256, maxHeight: 256 },
  );

  // if (calls.length > 0) {
  //   // add video texture to plane
  //   const videoStream = calls[0]._remoteStream;
  //   const videoTexture = new VideoTexture("video", videoStream, scene, true);
  //   const plane = MeshBuilder.CreatePlane("plane", { width: 1, height: 1 }, scene);
  //   plane.position.y = 2;
  //   plane.position.z = 3;
  //   plane.rotation.z = Math.PI;
  //   const materialPlane = new StandardMaterial("materialPlane", scene);
  //   materialPlane.diffuseTexture = videoTexture;
  //   plane.material = materialPlane;
  // }

  peerAvatar = MeshBuilder.CreateBox("peerAvatar", { size: 0.3 }, scene);
  peerAvatar.position.y = 1;
  peerAvatar.position.z = 3;
  peerAvatar.position.x = 0;
  const materialPeerAvatar = new StandardMaterial("materialPeerAvatar", scene);
  const peerAvatarBase64String = peerAvatarBase64 || "/avatars/1.jpg";
  materialPeerAvatar.diffuseTexture = new Texture(
    peerAvatarBase64String,
    scene,
  );
  peerAvatar.material = materialPeerAvatar;
  // green
  peerAvatar.material.diffuseColor = new Color3(0.212, 0.941, 0.596);
  peerAvatar.rotation = camera.rotation;

  if (calls.length > 0) {
    VideoTexture.CreateFromStreamAsync(
      scene,
      calls[0]._remoteStream,
      true,
    ).then((videoTexture) => {
      peerPlane = MeshBuilder.CreatePlane(
        "plane",
        { width: 1, height: 1 },
        scene,
      );
      peerPlane.position.y = 2;
      peerPlane.position.z = 3;
      peerPlane.rotation.z = Math.PI;
      const materialPlane = new StandardMaterial("materialPlane", scene);
      materialPlane.diffuseTexture = videoTexture;
      // white
      peerAvatar.material.diffuseColor = new Color3(0.941, 0.941, 0.941);
      peerPlane.material = materialPlane;
      peerPlane.lookAt(camera.position);
      // peerAvatar text ture to video texture
      materialPeerAvatar.diffuseTexture = videoTexture;
    });
  }

  // Our built-in 'ground' shape.
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene,
  );
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = new Texture(
    !isDarkTheme ? darkBackground : lightBackground,
    scene,
  );
  ground.material = groundMaterial;
  ground.position.y = 0.01;

  //hand
  const handModelUrl = handModelPath;

  // Load the hand model
  SceneLoader.ImportMeshAsync("", handModelUrl, "", scene).then((result) => {

    const handMesh = result.meshes[0];
    handMesh.position = new Vector3(0, 2, 0); // Adjust position as needed
    handMesh.scaling.scaleInPlace(4); // Scale if necessary

    // const skeleton = result.skeletons[0];
    // console.log(skeleton.bones);
    // const thumbMetacarpal = skeleton.bones.find(bone => bone.name.includes("thumb_metacarpal"));
    // const thumbProximal = skeleton.bones.find(bone => bone.name.includes("thumb-phalanx-proximal"));
    // const thumbDistal = skeleton.bones.find(bone => bone.name.includes("thumb-phalanx-distal"));

    // if (thumbMetacarpal && thumbProximal && thumbDistal) {
    //   thumbMetacarpal.setRotationQuaternion(Quaternion.FromEulerAngles(0, 0, Math.PI / 4));
    //   thumbProximal.setRotationQuaternion(Quaternion.FromEulerAngles(0, 0, Math.PI / 8));
    //   thumbDistal.setRotationQuaternion(Quaternion.FromEulerAngles(0, 0, Math.PI / 8));
    // }


    // Optionally set the orientation of the hand
    handMesh.rotation = new Vector3(0, Tools.ToRadians(180), 0);

    handModel = handMesh;
  });

  const isInXr = await xr?.then((xr) => xr.baseExperience.state.inXR);
  if (!isInXr) {
    skydome = MeshBuilder.CreateBox(
      "sky",
      { size: 1000, sideOrientation: Mesh.BACKSIDE },
      scene,
    );
    skydome.position.y = 500;
    skydome.isPickable = false;
    skydome.receiveShadows = true;
  }

  // const sky = new BackgroundMaterial("skyMaterial", scene);
  //   sky.reflectionTexture = scene.environmentTexture.clone();
  //   sky.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  //   sky.enableGroundProjection = true;
  //   sky.projectedGroundRadius = 20;
  //   sky.projectedGroundHeight = 3;
  //   skydome.material = sky;

  // backgroud color is black or whit ebased on theme
  if (isDarkTheme) {
    scene.clearColor = new Color3(0, 0, 0);
  } else {
    scene.clearColor = new Color3(1, 1, 1);
  }

  if (!isInPod) {
    xr = scene.createDefaultXRExperienceAsync({
      // ask for an ar-session
      uiOptions: {
        sessionMode: "immersive-ar",
      },
      optionalFeatures: true,
    });
  } else if (isMobile) {
    VJC = new VirtualJoysticksCamera("VJC", scene.activeCamera.position, scene);
    VJC.rotation = scene.activeCamera.rotation;
    VJC.checkCollisions = scene.activeCamera.checkCollisions;
    VJC.applyGravity = scene.activeCamera.applyGravity;
    // speed
    VJC.speed = 0.5;
    VJC.angularSensibility = 20;
    VJC.inertia = 0.5;

    scene.executeWhenReady(function () {
      scene.activeCamera = VJC;
      scene.activeCamera.attachControl(canvas);
    });
  }
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender =
  ({ calls, ephemeralStorage, onMove }) =>
  async (scene) => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box2 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box2.rotation.y -= (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box3 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box3.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box4 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box4.rotation.y -= (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box5 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box5.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box6 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box6.rotation.y -= (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box7 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box7.rotation.y -= (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box8 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box8.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    if (box9 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 10;
      box9.rotation.y -= (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }

    // the camera position is different position, log the xyz position
    const { _x: x, _y: y, _z: z } = scene.activeCamera.position;
    const newCameraPosition = { x, y, z };
    if (
      x !== cameraPosition.x ||
      y !== cameraPosition.y ||
      z !== cameraPosition.z
    ) {
      cameraPosition = newCameraPosition;
      const xrCamera = xr?.then((xr) => xr.baseExperience.camera);
      if (xrCamera) {
        const xrCameraPosition = await xrCamera.then(
          (xrCamera) => xrCamera.position,
        );
        console.log({ xrCameraPosition });
        const isInXr = await xr.then((xr) => xr.baseExperience.state.inXR);
        onMove(isInXr ? xrCameraPosition : cameraPosition);

        // /remove skydome
        if (skydome) {
          skydome.dispose();
          skydome = null;
        }
      } else {
        onMove(cameraPosition);
      }
    }
    // console.log({ cameraPosition, newCameraPosition });
    const camera = scene.activeCamera;

    if (peerPlane) {
      // add video texture to plane
      // calls.forEach((call, i) => {
      //   // const videoStream = call._remoteStream;
      //   // const videoTexture = new VideoTexture("video", videoStream, scene, true);
      //   // const plane = MeshBuilder.CreatePlane("plane", { width: 1, height: 1 }, scene);
      //   // const {
      //   //   x,
      //   //   y,
      //   //   z
      //   // } = ephemeralStorage?.verse?.position || {};
      //   // plane.position.x = x || 0;
      //   // plane.position.y = y || 2;
      //   // plane.position.z = z || 3;
      //   // const materialPlane = new StandardMaterial("materialPlane", scene);
      //   // materialPlane.diffuseTexture = videoTexture;
      //   // plane.material = materialPlane;
      //   // VideoTexture.CreateFromStreamAsync(scene, call._remoteStream, true).then((videoTexture) => {
      //   //   const plane = MeshBuilder.CreatePlane("plane", { width: 1, height: 1 }, scene);

      //   //   plane.position.x = x || 0;
      //   //   plane.position.y = y || 2;
      //   //   plane.rotation.z = Math.PI;
      //   //   const materialPlane = new StandardMaterial("materialPlane", scene);
      //   //   materialPlane.diffuseTexture = videoTexture;
      //   //   plane.material = materialPlane;
      //   // });

      // });
      const { x, y, z } = ephemeralStorage?.verse?.position || {};
      // console.log({ x, y, z });
      peerPlane.position.x = x || 0;
      peerPlane.position.y = y || 2;
      peerPlane.position.z = z || 3;
      peerPlane.rotation.z = Math.PI;
      peerPlane.lookAt(camera.position);
    }

    if (peerAvatar) {
      const { x, y, z } = ephemeralStorage?.verse?.position || {};
      peerAvatar.position.x = x || 0;
      peerAvatar.position.y = y || 1;
      peerAvatar.position.z = z || 3;
      peerAvatar.rotation = camera.rotation;
    }

    // position the hand infront of the camera facing

    // if (handModel) {
    //   const newPosition = {
    //     x: camera.position.x,
    //     y: camera.position.y,
    //     z: camera.position.z + camera.getFrontPosition(4).z,
    //   };
    //   handModel.position = newPosition;
    //   handModel.rotation = camera.rotation;
    // }
  };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(8),
  },
  appBar: {
    height: theme.spacing(8),
  },
  title: {
    fontWeight: "bold",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: `0 ${theme.spacing(3)}`,
  },
}));

export default function Verse() {
  const theme = useTheme();
  const classes = useStyles();
  const pageTitle = "Verse";
  const verseRef = useRef(null);

  // useEffect(() => {
  //   const createScene = async () => {
  //     // initialize babylon scene and engine
  //     // var engine = new Engine(canvas, true);
  //     // var scene = new Scene(engine);

  //     var engine = new Engine(verseRef.current, true);
  //     const createScene = async () => {

  //       var scene = new Scene(engine);

  //       var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  //       camera.setTarget(Vector3.Zero());
  //       camera.attachControl(verseRef.current, true);
  //       var light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
  //       var sphere = MeshBuilder.CreateSphere("sphere1", 16, 2, scene);
  //       sphere.position.y = 2;
  //       sphere.position.z = 5;

  //       // hide/show the Inspector
  //       window.addEventListener("keydown", (ev) => {
  //           // Shift+Ctrl+Alt+I
  //           if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
  //               if (scene.debugLayer.isVisible()) {
  //                   scene.debugLayer.hide();
  //               } else {
  //                   scene.debugLayer.show();
  //               }
  //           }
  //       });

  //       const xr = await scene.createDefaultXRExperienceAsync({
  //         // ask for an ar-session
  //         uiOptions: {
  //           sessionMode: "immersive-ar",
  //         },
  //       });

  //       return scene;
  //     }

  //     const scene = await createScene();

  //     // run the main render loop
  //     engine.runRenderLoop(() => {
  //         scene.render();
  //     });
  //   }
  //   createScene();
  // }, []);

  return (
    <PageContainer
      backgroundImage=""
      headerProps={{
        // title: pageTitle,
        title: (
          <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {pageTitle}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
          </div>
        ),
        backButton: true,
        // avatarProps: {
        //   src: isGroup ? conversation?.avatarUrl : contactDetails?.avatar,
        //   alt: pageTitle[0],
        //   isOnline,
        //   isSomeOnline
        // },
        menuProps: {
          icon: "more",
          // items: headerActions
        },
        // customButtons: (isOnline && !activeCalls.length) ? [
        //   !isGroup && !isMobile && { icon: 'screen', onClick: () => makeCall({ screen: true, video: true, audio: true }) },
        //   !isGroup && { icon: 'camera', onClick: () => makeCall({ video: true, audio: true }) },
        //   !isGroup && { icon: 'call', onClick: () => makeCall({ audio: true }) },
        // ].filter(i => !!i) : undefined
      }}
      className={classes.conversation}
    >
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
        style={{ height: "100%", width: "100%" }}
      />
    </PageContainer>
  );
}
