import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { createRestAPIClient } from "masto";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../atomic/organism/page-container/PageContainer";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

export default function Meshtastic() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  const [instance, setInstance] = useState("https://infosec.exchange");
  const [accessToken, setAccessToken] = useState(null);
  const [masto, setMasto] = useState(null);

  useEffect(() => {
    if (instance && accessToken) {
      setMasto(createRestAPIClient({ url: instance, accessToken }));
    }
  }, [instance, accessToken]);

  const handleUpdateStatus = async () => {
    const status = await masto.v1.statuses.create({
      status: "Hello from #mastojs!",
    });

    console.log(status.url);
  };

  return (
    <PageContainer
      headerProps={{
        title: "Mastodon",
        backButton: true,
        menuProps: {
          icon: "more",
          items: [
            {
              text: "Profile",
              icon: "account",
              onClick: () => navigate("/profile"),
            },
          ],
        },
      }}
    >
      <div style={{ textAlign: "center", padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Instance
        </Typography>

        <input
          type="text"
          value={instance}
          onChange={(e) => setInstance(e.target.value)}
        />

        <Typography variant="h5" gutterBottom>
          Access token
        </Typography>
        <input
          type="text"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />

        <br />
        <br />
        <button onClick={handleUpdateStatus}>Update Status</button>
      </div>
    </PageContainer>
  );
}
