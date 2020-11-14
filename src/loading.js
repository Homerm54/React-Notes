import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  }
}));


export default function Loading() {

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify='center'
      alignContent='center'
    >
      
      <Grid item>
        <CircularProgress />
      </Grid>

    </Grid>
  )
}