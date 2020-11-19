import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ui } from "redux/actions";
import { DASHBOARD } from "constants/uiLocations";

import CreateNoteList from './NoteListGenerator';
import TabPanel from './TabPanel';
import Loading from 'loading';

// UI
import { drawerSpacing } from 'constants/ui';
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(drawerSpacing) + 1,
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  navBar: {
    paddingTop: theme.spacing(1),
  },
}));



export default function Dashboard() {
  
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const notes = useSelector(state => state.notes.notes);
  const isLoading = useSelector(state => state.ui.loading);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {

    dispatch(ui.changeUserLocation(DASHBOARD));
  }, [dispatch]);



  if (isLoading) return <Loading />


  return (
    <main className={classes.root}>
      <AppBar position="sticky" color="default" className={classes.navBar}>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="Note's Classification"
        >

          <Tab label='To Do' id="tabpanel-todo"
            aria-controls="vertical-tabpanel-todo" />

          <Tab label='Work' id="tabpanel-work"
            aria-controls="vertical-tabpanel-work" />

          <Tab label='Study' id="tabpanel-study"
            aria-controls="vertical-tabpanel-todo" />

          <Tab label='Reminders' id="tabpanel-reminders"
            aria-controls="vertical-tabpanel-reminders" />

        </Tabs>

      </AppBar>

      <TabPanel value={value} index={0}>
        <CreateNoteList arialLabel='To Do' list={notes['To Do']} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <CreateNoteList arialLabel='Work' list={notes.Work} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <CreateNoteList arialLabel='Study' list={notes.Study} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <CreateNoteList arialLabel='Reminders' list={notes.Reminders} />
      </TabPanel>

    </main>
  );
}
