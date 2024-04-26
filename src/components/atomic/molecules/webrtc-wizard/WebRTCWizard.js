import React, { useState, useEffect } from "react";
import QRInput from "../../atom/qrInput/QRInput";
import Button from "@mui/material/Button";
import usePeer from "../../../p2p/usePeer";
import { useCryptography } from "cryptography/Cryptography";

// steps:
// 1. select to create or scan offer
// 2. scan answer
// 3. scan ice candidate 1
// 4. scan ice candidate 2

export default ({
    onConnect,
    onReceive,
}) => {

    const {
        generateKeyPair,
        deserializePublicKey,
        encrypt,
        decrypt,
        generateSymmetricKey,
        deserializeSymmetricKey,
        encryptWithSymmetricKey,
        decryptWithSymmetricKey
    } = useCryptography();
    const [mode, setMode] = useState("");
    const { peer } = usePeer();

    const [rtc, setRtc] = useState(null);
    const [dc, setDc] = useState(null);
    const [rtcIceCandidate, setRtcIceCandidate] = useState(null);
    const [rtcRemoteIceCandidate, setRtcRemoteIceCandidate] = useState(null);
    const [rtcOffer, setRtcOffer] = useState(null);
    const [rtcRemoteOffer, setRtcRemoteOffer] = useState(null);
    const [rtcAnswer, setRtcAnswer] = useState(null);
    const [rtcRemoteAnswer, setRtcRemoteAnswer] = useState(null);

    const [publicKey, setPublicKey] = useState(null);
    const [serializedPublicKey, setSerializedPublicKey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);
    const [remotePublicKey, setRemotePublicKey] = useState(null);
    const [symmetricKey, setSymmetricKey] = useState(null);

    const [contactDetails, setContactDetails] = useState(null);

    useEffect(() => {
        const generateKeys = async () => {
            const keyPair = await generateKeyPair();
            setPublicKey(keyPair.publicKey);
            setPrivateKey(keyPair.privateKey);

            const serializedPublicKey = await window.crypto.subtle.exportKey(
                "jwk",
                keyPair.publicKey,
              );
            setSerializedPublicKey(serializedPublicKey);
        }
        generateKeys();
    }, []);

    useEffect(() => {
        if (peer) {
          setRtc(peer.connect().peerConnection);
        }
      }, [peer]);

      useEffect(() => {
        if (rtc) {
          rtc.onicecandidate = function (event) {
            if (event.candidate) {
              const serialisedIceCandidate = JSON.stringify(event.candidate);
              setRtcIceCandidate(serialisedIceCandidate);
            }
          };
    
          rtc.ondatachannel = function (event) {
            event.channel.onopen = function () {

                event.channel.send({
                    type: "publicKey",
                    publicKey
                });

                event.channel.send({
                    type: "symmetricKey",
                    symmetricKey
                });
            };
            event.channel.onmessage = function (event) {
              console.info("rtc1: received message:", event.data);
              const parsedData = JSON.parse(event.data);

              switch (event.data.type) {
                case "publicKey":
                    setRemotePublicKey(parsedData.publicKey);
                    break;
                case "symmetricKey":
                    setSymmetricKey(parsedData.symmetricKey);
                    break;
                default:
                    break;
              }
            };
          };
    
          const dc = rtc.createDataChannel("channel1");
          dc.onopen = function () {
            dc.send({
                type: "publicKey",
                publicKey
            });

            dc.send({
                type: "symmetricKey",
                symmetricKey
            });
          };
          dc.onmessage = function (event) {
            console.info("rtc2: received message:", event.data);

            const parsedData = JSON.parse(event.data);

            switch (event.data.type) {
                case "publicKey":
                    setRemotePublicKey(parsedData.publicKey);
                    break;
                case "symmetricKey":
                    setSymmetricKey(parsedData.symmetricKey);
                    break;
                default:
                    break;
              }

          };
          setDc(dc);
        }
      }, [rtc]);
    
      const handleCreateOffer = async () => {
        const offer = await rtc.createOffer();
        await rtc.setLocalDescription(offer);
        setRtcOffer(JSON.stringify(offer));
        console.log("rtc1: offer", offer);
      };
    
      const handleRemoteOffer = async (rtcRemoteOffer) => {
        const offer = JSON.parse(rtcRemoteOffer.replace(/(\r\n|\n|\r)/gm, ""));
        // RTCSessionDescriptionInit
        const offerDescption = new RTCSessionDescription(offer);
        await rtc.setRemoteDescription(offerDescption).catch((e) => {
          console.error("rtc1: setRemoteDescription", e);
        });
    
        await handleAnswer();
      };
    
      useEffect(() => {
        if (rtcRemoteOffer) {
          handleRemoteOffer(rtcRemoteOffer);
        }
      }, [rtcRemoteOffer]);
    
      const handleAnswer = async () => {
        const answer = await rtc.createAnswer();
        await rtc.setLocalDescription(answer);
        setRtcAnswer(JSON.stringify(answer));
      };
    
      const handleRemoteAnswer = async (rtcRemoteAnswer) => {
        const answer = JSON.parse(rtcRemoteAnswer.replace(/(\r\n|\n|\r)/gm, ""));
        // RTCSessionDescriptionInit
        const answerDescption = new RTCSessionDescription(answer);
        await rtc.setRemoteDescription(answerDescption);
    
        // // send message from dc2
        // dc.send("hello from rtc2");
      };
    
      useEffect(() => {
        if (rtcRemoteAnswer) {
          handleRemoteAnswer(rtcRemoteAnswer);
        }
      }, [rtcRemoteAnswer]);
    
      const handleIceCandidate = async (rtcIceCandidate) => {
        const iceCandidate = JSON.parse(
          rtcIceCandidate.replace(/(\r\n|\n|\r)/gm, "")
        );
        await rtc.addIceCandidate(iceCandidate);
      };
    
      useEffect(() => {
        if (rtcRemoteIceCandidate) {
          handleIceCandidate(rtcRemoteIceCandidate);
        }
      }, [rtcRemoteIceCandidate]);

      console.log({
        publicKey,
        privateKey,
        remotePublicKey,
        symmetricKey,
      })

    return (
        <div>
            {!mode && (
                <>
                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        setMode("createOffer")
                        handleCreateOffer()
                    }}
                    >
                    create offer
                    </Button>
                    <br />
                    <br />

                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={() => setMode("scanOffer")}
                    >
                    scan offer
                    </Button>
                </>
            )}

            {/* step 1 */}

            {mode === "createOffer" && (
                <QRInput
                    value={(JSON.stringify({rtcOffer, rtcIceCandidate}))}
                    qr
                    back={() => setMode('')}
                    next={() => setMode('scanAnswer')}
                />
            )}

            {mode === "scanOffer" && (
                <QRInput
                scan
                onScan={(data) => {
                    const {rtcIceCandidate, rtcOffer} = JSON.parse(data)
                    setRtcRemoteOffer(rtcOffer)
                    setRtcRemoteIceCandidate(rtcIceCandidate)
                    setMode('createAnswer')
                }}
                back={() => setMode('')}
                />
            )}

            {/* step 2 */}

            {mode === "scanAnswer" && (
                <QRInput
                    scan
                    onScan={(data) => {
                        const {rtcAnswer, rtcIceCandidate} = JSON.parse(data)
                        setRtcRemoteAnswer(rtcAnswer)
                        setRtcRemoteIceCandidate(rtcIceCandidate)
                        setMode('sharePublicKey')
                    }}
                    back={() => setMode('createOffer')}
                />
            )}
            
            {mode === "createAnswer" && (
                <QRInput
                    value={JSON.stringify({rtcAnswer, rtcIceCandidate})}
                    qr
                    back={() => setMode('scanOffer')}
                    next={() => setMode('scanPublicKey')}
                />
            )}

            {/* step 3 */}

            {mode === "sharePublicKey" && (
                <QRInput
                    value={serializedPublicKey}
                    qr
                    back={() => setMode('scanAnswer')}
                    next={() => setMode('scanRemotePublicKey')}
                />
            )}

            {mode === "scanPublicKey" && (
                <QRInput
                    scan
                    onScan={(data) => {
                        setRemotePublicKey(data)
                        setMode('sharePublicKeyAndSymmetricKey')
                    }}
                    back={() => setMode('createAnswer')}
                />
            )}

            {/* step 4 */}

            {mode === "scanRemotePublicKeyAndSymmetricKey" && (
                <QRInput
                    scan
                    onScan={(data) => {
                        const {remotePublicKey, symmetricKey} = JSON.parse(data)
                        setRemotePublicKey(remotePublicKey)
                        setSymmetricKey(symmetricKey)
                        setMode('connected')
                    }}
                    back={() => setMode('scanPublicKey')}
                />
            )}

            {mode === "sharePublicKeyAndSymmetricKey" && (
                <QRInput
                    value={JSON.stringify({publicKey, symmetricKey})}
                    qr
                    back={() => setMode('scanPublicKey')}
                    next={() => setMode('connected')}
                />
            )}

        </div>
    );
}