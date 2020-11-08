import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AppBar from '@material-ui/core/AppBar';

import DeleteIcon from '@material-ui/icons/Delete';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const TempList = (
  <List aria-label="To Do Notes">
    <ListItem button>
      <ListItemText primary="Random Note" secondary='Jan 9, 2020' />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem button>
    <ListItemText primary="Random Note" secondary='Jan 9, 2020' />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem button>
      <ListItemText primary="Random Note" secondary='Jan 9, 2020' />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </List >
);

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    paddingLeft: theme.spacing(7) + 1, // Match the heigh of the navbar
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(9) + 1,
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  navBar: {
    paddingTop: "20%",
    [theme.breakpoints.up("md")]: {
      paddingTop: "7%",
    },
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main className={classes.root}>
      <AppBar position="static" color="default" className={classes.navBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="Note's Classification"
          centered
        >
          <Tab label='To Do' {...a11yProps(0)} />
          <Tab label="Work" {...a11yProps(1)} />
          <Tab label="Study" {...a11yProps(2)} />
          <Tab label="Reminders" {...a11yProps(3)} />
          <Tab label="Extra" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {TempList}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {TempList}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {TempList}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {TempList}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {TempList}
      </TabPanel>
    </main>
  );
}
