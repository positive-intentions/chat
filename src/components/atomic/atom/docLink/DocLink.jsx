import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      minHeight: '70vh',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    "iframe": {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        // flex-grow: 1; border: none; margin: 0; padding: 0;
        flexGrow: 1,
        border: 'none',
        margin: 0,
    }
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default ({
    size = 'large',
    docLink = 'https://positive-intentions.com/docs/basics/getting-started/'
}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    return (
        <>
            <IconButton
                size={size}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpen}
            >
                <QuestionMarkIcon />
            </IconButton>

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
            Docs
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
            <iframe
                src={docLink}
                width="80vw"
                height="100%"
                frameBorder="0"
                title="Docs"
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              close
            </Button>
          </DialogActions>
        </BootstrapDialog>
        </>
    );
}