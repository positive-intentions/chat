import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import PageContainer from "../../atomic/organism/page-container/PageContainer";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

export default function Maintainance() {
  const classes = useStyles();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts) || [];

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <PageContainer
      backgroundImage=""
      headerProps={{
        title: "BLE",
        backButton: true,
        menuProps: {
          icon: "more",
          items: [
            {
              text: "Meshtastic",
              icon: "copyright",
              onClick: () => handleOpen(),
            },
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
        <iframe src="/meshtastic/index.html" style={{ height: "85vh", width: '100%', border: 'none' }} />
      </div>

      <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          TransitionComponent={Transition}
          disablePortal
          fullWidth
          fullHeight
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Meshtastic
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography variant="p">
              Meshtastic® is a registered trademark of Meshtastic LLC. Meshtastic software components are released under various licenses, see GitHub for details. No warranty is provided - use at your own risk.
            </Typography>
            <Button
              onClick={() =>
                window.open("https://github.com/meshtastic/web", "_blank")
              }
            >
              Meshtastic web github
            </Button>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              close
            </Button>
          </DialogActions>
        </BootstrapDialog>
    </PageContainer>
  );
}
