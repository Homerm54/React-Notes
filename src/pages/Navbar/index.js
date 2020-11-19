import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth } from 'redux/actions';
import * as uiLocation from 'constants/uiLocations';

import ToolBox from './drawer'; // Like tool box

// UI
import { drawerWidth } from 'constants/ui';

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";




const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));



export default function Navbar() {

  const classes = useStyles();

  const [open, setOpen] = useState(false); // Display tool box?
  const dispatch = useDispatch();

  const name = useSelector(state => {
    if (state?.auth.uid) return state.auth.name;
    return false;
  });


  const userLocation = useSelector(state => {
    const { location } = state.ui;

    switch (location) {
      case uiLocation.DASHBOARD:
        return 'Dashboard';
      case uiLocation.NOTE_READ:
        return 'Read Mode';
      case uiLocation.NOTE_EDIT:
        return 'Edit Mode'
      default: // Like not authenticated
        return false;
    }
  })


  // Action Handler Section
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleLogout() {

    dispatch(auth.startLogout())
  }




  if (!userLocation) return false;


  return (
    <>
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar>

          {!open &&
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          }

          <Typography variant="h6" className={classes.title}>
            {name ? `${name} - ${userLocation}` : 'React - Note'}
          </Typography>


        </Toolbar>
      </AppBar>

      <ToolBox // Displayed aside
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleLogout={handleLogout}
      />

    </>
  );
}
