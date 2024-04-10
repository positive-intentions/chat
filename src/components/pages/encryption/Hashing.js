import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Typography from "@mui/material/Typography";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import QRReader from "react-qr-scanner";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HashInputs from "./HashInputs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: 10,
  },
}));

const QRText = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
    
  return (
    <div>
      <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="MD5" {...a11yProps(0)} />
          <Tab label="SHA-256" {...a11yProps(1)} />
          <Tab label="SHA-512" {...a11yProps(2)} />
          <Tab label="SHA3-512" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <HashInputs />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <HashInputs />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <HashInputs />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <HashInputs />
        </TabPanel>
      </SwipeableViews>
    </Box>
    </div>
  );
}

export default QRText;