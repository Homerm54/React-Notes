import React from "react";

import { Link, useHistory } from "react-router-dom";
import { ui, note } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as uiLocations from 'constants/uiLocations';
import { NOTE, DASHBOARD } from 'constants/routes';
import PropTypes from "prop-types";


// UI
import { drawerWidth, drawerSpacing } from 'constants/ui';

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

// Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveIcon from '@material-ui/icons/Save';

import backgroundImage from 'assets/background-unsplash-dimmed.jpg';



const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerBackground: {
    color: 'whitesmoke',
    backgroundColor: 'grey',
    backgroundImage: `url(${backgroundImage})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'none',
  },
  white: {
    color: 'whitesmoke',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0, // Do not show the drawer
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(drawerSpacing) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));


const noteRegex = /\[Note\]*.*/;



export default function ToolBox({ open, handleDrawerClose, handleLogout }) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useSelector(state => state.ui.location);
  const isLoading = useSelector(state => state.ui.loading);
  const history = useHistory();



  // Handle Action Section
  function editMode() {
    dispatch(ui.changeUserLocation(uiLocations.NOTE_EDIT));
    handleDrawerClose();
  }

  function readMode() {
    dispatch(ui.changeUserLocation(uiLocations.NOTE_READ));
    handleDrawerClose();
  }

  function deleteNote() {
    history.push(DASHBOARD);
    dispatch(note.deleteNote());
    handleDrawerClose();
  }

  function createNewNote() {
    dispatch(note.createNewNote()) // Dispatch here
    handleDrawerClose();
    history.push(NOTE);
  }

  function saveNote() {
    dispatch(note.updateNote());
    handleDrawerClose();
  }



  return (
    <Drawer
      onClick={handleDrawerClose}
      variant="permanent"
      anchor='left'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open, [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawerBackground, {
          [classes.drawerOpen]: open, [classes.drawerClose]: !open,
        }),
      }}
      component='nav'
    >

      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon className={classes.white} />
        </IconButton>
      </div>

      <Divider />

      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon className={classes.white} />
          </ListItemIcon>
          <ListItemText primary={'Sign Out'} />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem component={Link} to={DASHBOARD}>
          <ListItemIcon>
            <DashboardIcon className={classes.white} />
            </ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
      </List>

      <Divider />

      {noteRegex.test(location) ?
        // Check if the user is using a note to display this tools
        <List>

          { // Button Genereator
            [
              ["Read Mode", <VisibilityIcon className={classes.white} />, readMode],
              ["Edit Note", <CreateIcon className={classes.white} />, editMode],
              ["Delete Note", <DeleteIcon className={classes.white} />, deleteNote],

              location === uiLocations.NOTE_EDIT ?
                ['Save Note', <SaveIcon className={classes.white} />, saveNote]
                :
                ['New Note', <AddBoxIcon className={classes.white} />, createNewNote],

            ].map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={item[2]}
                disabled={isLoading}
              >
                <ListItemIcon>{item[1]}</ListItemIcon>
                <ListItemText primary={item[0]} />
              </ListItem>
            ))
          }

        </List>
        : // User is not in a note section, display only this button
        <ListItem button onClick={createNewNote} disabled={isLoading}>
          <ListItemIcon><AddBoxIcon className={classes.white} /></ListItemIcon>
          <ListItemText primary={'New Note'} />
        </ListItem>
      }

    </Drawer>
  )
}


ToolBox.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
}