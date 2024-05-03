// use selector to get attachment data by the sha. you can use the router podId to get the attachment by pod from the redux store.

import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

// random image
export default ({ sha, data }) => {
  if (typeof sha !== "string") return null;
  const navigate = useNavigate();

  const { podId } = useParams();
  const attachment = useSelector((state) =>
    state.storage[podId]?.find((item) => item?.sha === sha),
  );
  return (
    (!!data || attachment) && (
      <Button onClick={() => navigate(`/pod/${podId}/file/${attachment?.sha}`)}>
        <img
          style={{ maxHeight: 300, maxWidth: 300 }}
          src={data ?? attachment?.data}
          alt="random"
        />
      </Button>
    )
  );
};
