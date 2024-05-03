import React, { useRef, useEffect, useState } from "react";
import { useTheme, makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative", // Add this to position the delete icon
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    height: 200,
  },
  canvas: {
    width: "100%",
  },
  deleteIcon: {
    position: "absolute",
    top: "10px", // Adjust top and right for positioning
    right: "10px",
    cursor: "pointer",
  },
}));

const SignatureCanvas = ({ heading, onChange, defaultValue }) => {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [hasContent, setHasContent] = useState(false);
  const theme = useTheme();
  const classes = useStyles();

  useEffect(() => {
    // Set the canvas size based on its container's dimensions
    const canvasContainer = canvasContainerRef.current;
    canvasRef.current.width = canvasContainer.clientWidth;
    canvasRef.current.height = canvasContainer.clientHeight;

    // Get the canvas context after setting its size
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);

    // Set pen color based on the theme
    ctx.strokeStyle = theme.palette.mode === "dark" ? "#90caf9" : "#1565c0";
    ctx.fillStyle = theme.palette.mode === "dark" ? "#90caf9" : "#1565c0";

    // Ensure that the correct stroke and fill colors are used
    ctx.lineWidth = 2; // Adjust the line width as needed

    // Clear the canvas before applying the color
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load the initial value if provided
    if (defaultValue) {
      const img = new Image();
      img.src = defaultValue;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setHasContent(true);
      };
    }
  }, [theme, defaultValue]);

  useEffect(() => {
    // Prevent scrolling on touch devices while drawing
    const preventScroll = (e) => {
      if (isDrawing) {
        e.preventDefault();
      }
    };

    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isDrawing]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getRelativeCoordinates(e);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    // Prevent scrolling on touch devices
    e.preventDefault();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getRelativeCoordinates(e);
    context.lineTo(offsetX, offsetY);
    context.stroke();
    // Prevent scrolling on touch devices
    e.preventDefault();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);

    // Convert canvas content to base64 and call the onChange function
    const canvas = canvasRef.current;
    const canvasDataUrl = canvas.toDataURL("image/png"); // Change format as needed

    // Call the onChange function with the canvas data URL
    onChange(canvasDataUrl);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
  };

  const getRelativeCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let offsetX, offsetY;

    if (e.type === "touchstart" || e.type === "touchmove") {
      const touch = e.touches[0];
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
    } else {
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    }

    return { offsetX, offsetY };
  };

  return (
    <Paper className={classes.canvasContainer} ref={canvasContainerRef}>
      <Typography
        sx={{
          flexShrink: 0,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        }}
      >
        {heading}
      </Typography>
      <ClearIcon className={classes.deleteIcon} onClick={clearCanvas} />
      <canvas
        ref={canvasRef}
        className={classes.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </Paper>
  );
};

export default SignatureCanvas;
