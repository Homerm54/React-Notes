import React from 'react';

import { Link } from 'react-router-dom';
import { DASHBOARD } from 'constants/routes';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: '1rem',
  }
}));


export default function NotFound() {

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify='center'
      alignContent='center'
    >

      <Grid item xs={12}>
        <Typography align='center'>
          404 | The Page you Requested was not found.
        </Typography>
      </Grid>
      <Grid item className={classes.button}>
        <Button component={Link} to={DASHBOARD} variant='outlined'>
          Go to Dashboard
        </Button>
      </Grid>

    </Grid>
  )
}