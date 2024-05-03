import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  container: {
    borderLeft: `5px solid ${theme.palette.mode === "dark" ? "#99CCFF" : theme.palette.primary.main}`,
    // marginRight: -16,
  },
  avatar: {
    backgroundColor: red[500],
    marginRight: 10,
  },
}));

const CustomAccordion = ({
  title,
  avatar,
  children,
  expanded,
  onChange,
  customButtons,
  showExpandIcon = true,
}) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (expanded !== undefined) {
      setIsExpanded(expanded);
    }
  }, [expanded]);

  const handleChange = () => {
    if (expanded === undefined) {
      setIsExpanded(!isExpanded);
    } else {
      onChange();
    }
  };

  return (
    <Accordion
      className={avatar ? classes.container : undefined}
      expanded={expanded !== undefined ? expanded : isExpanded}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={showExpandIcon && <ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {avatar ? (
          <Avatar className={classes.avatar} aria-label="recipe">
            {avatar}
          </Avatar>
        ) : (
          <CommentIcon style={{ marginRight: 5 }} />
        )}
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        {customButtons}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
