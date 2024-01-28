import React, {} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import PageContainer from "../../atomic/organism/page-container/PageContainer";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

export default function Maintainance() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  return (
    <PageContainer
      headerProps={{
        title: "Temporaily Unavailable",
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
          Temporaily Unavailable
        </Typography>
        <Typography variant="body1" gutterBottom>
          This app is temporaily unavailable. Apologies for any inconvienience.
        </Typography>
      </div>
    </PageContainer>
  );
}
