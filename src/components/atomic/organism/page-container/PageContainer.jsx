import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import AppHeader from "../../molecules/app-header/AppHeader";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles, useTheme } from "@mui/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const presetIcons = {
  add: <AddIcon />,
};

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  // root: {
  //     flexGrow: 1,
  //     // height: "100vh",
  //     // overflow: 'auto',
  //     paddingTop: `${theme.spacing(8)}`
  // },
  // appBar: {
  //     height: theme.spacing(8),
  // },
  // form: {
  //     padding: theme.spacing(3),
  // },
  // title: {
  //     fontWeight: "bold",
  //     textAlign: "left",
  //     display: "flex",
  //     alignItems: "center",
  //     height: "100%",
  //     padding: `0 ${theme.spacing(3)}`,
  // },
  fab: {
    position: "fixed !important",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const defaultLightBackgroundImage = "/backgrounds/light-random.png";
const defaultDarkBackgroundImage = "/backgrounds/dark-random.png";

export default function PageContainer(props) {
  const {
    children,
    headerProps = {},
    fabProps = {},
    speedDialProps = {},
    backgroundImage,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const defaultBackgroundImage =
    theme.palette.mode === "dark"
      ? defaultDarkBackgroundImage
      : defaultLightBackgroundImage;

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <HideOnScroll {...props}> */}
      <AppHeader {...headerProps} />
      {/* <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              Scroll to hide App bar
            </Typography>
          </Toolbar>
        </AppBar> */}
      {/* </HideOnScroll> */}
      <Toolbar />
      {backgroundImage !== "" && (
        <Box
          sx={{
            flexGrow: 1,
            backgroundImage: `url(${backgroundImage ?? defaultBackgroundImage})`,
            position: "fixed",
            height: "100%",
            width: "100%",
            opacity: 0.05,
            zIndex: 0,
          }}
        ></Box>
      )}
      <Container
        disableGutters
        className="page-container"
        style={{ flexGrow: 1, marginTop: 20 }}
      >
        {children}
      </Container>

      {Object.keys(fabProps).length > 0 && (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={fabProps?.onClick}
        >
          {presetIcons[fabProps?.icon]}
        </Fab>
      )}

      {Object.keys(speedDialProps).length > 0 && (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={speedDialProps.icon ?? <SpeedDialIcon />}
        >
          {speedDialProps.actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      )}
    </React.Fragment>
  );
}
