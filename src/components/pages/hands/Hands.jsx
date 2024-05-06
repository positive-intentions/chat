import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
// import './handpose-estimation'
import './style.css'

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

export default function Maintainance() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  // mount handpose after component is mounted
  useEffect(() => {
    import('./handpose-estimation')
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <PageContainer
      headerProps={{
        title: "Hand",
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
                <div id="main">
                  <div class="container">
                    <div class="canvas-wrapper">
                      <canvas id="output"></canvas>
                      <video id="video" playsinline>
                      </video>
                    </div>
                    <div id="stats"></div>
                    <div class="scatter-container">
                      <div id="scatter-gl-container-left"></div>
                      <div id="scatter-gl-container-right"></div>
                    </div>
                  </div>
                </div>
      </div>
    </PageContainer>
  );
}
