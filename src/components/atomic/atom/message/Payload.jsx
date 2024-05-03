// use selector to get attachment data by the sha. you can use the router podId to get the attachment by pod from the redux store.

import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { formatDate } from "../../molecules/conversation/Conversation";
import Message from "./Message";
import Location from "./Location";

// random image
export default ({ payload, attachmentSha }) => {
  // if (typeof payload !== 'string') return null;
  const navigate = useNavigate();

  const { podId } = useParams();
  // const attachment = useSelector(state => state.storage[podId]?.find(item => item?.sha === sha));
  // console.log({ attachment, podId, sha })
  // return (!!data || attachment) && (
  //     <Button onClick={() => navigate(`/pod/${podId}/file/${attachment?.sha}`)}>
  //         <img style={{ maxHeight: 300, maxWidth: 300 }} src={data ?? attachment?.data} alt="random"/>
  //     </Button>
  // );

  return (
    <>
      {payload.image?.data && (
        <Button onClick={() => navigate(`/pod/${podId}/file/${attachmentSha}`)}>
          <img
            style={{ maxHeight: 300, maxWidth: 300 }}
            src={payload.image.data}
            alt="random"
          />
        </Button>
      )}
      {payload.audio?.data && (
        <audio src={payload.audio?.data} controls style={{ width: "100%" }} />
      )}
      {!!payload.file?.name && (
        <Button onClick={() => navigate(`/pod/${podId}/file/${attachmentSha}`)}>
          {`${payload.file.name}`}
        </Button>
      )}
      {!!payload.location.latitude && !payload.reply?.id && (
        <Location position={payload.location} />
      )}
      {!!payload.reply?.id && (
        <Button
          onClick={() => {
            const element = document.getElementById(payload.reply.id);

            if (element) {
              // Scroll to the element
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Go to replied message
        </Button>
      )}
      {(!!payload.file?.name ||
        !!payload.image?.data ||
        !!payload.reply?.id) && <br />}
      {payload.content ?? ""}
    </>
  );
};
