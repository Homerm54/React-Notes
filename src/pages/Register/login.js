import React from 'react';
import useForm from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import { FIX_ACCOUNT } from '../../constants/routes';

import { useDispatch } from 'react-redux';
import { auth } from '../../redux/actions';

import TabPanel from './TabPanel';

// UI
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AccountBoxOutlined from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';


const useStyles = makeStyles(theme => (
  {
    inputFields: {
      width: "100%",
      marginTop: '1.5rem'
    },
    buttonContainer: {
      marginTop: '1rem',
    },
    button: {
      marginLeft: 'auto'
    }
  }
));



export default function LogInForm(props) {

  const classes = useStyles();
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  })

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      auth.startLoginEmailPassword(
        formValues.email, formValues.password
      ));
  }

  return (
    <TabPanel {...props} onSubmit={handleSubmit}>
      <TextField
        className={classes.inputFields}
        id='email'
        name='email'
        type='email'
        label="Email"
        onChange={handleInputChange}
        value={formValues.email}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <AccountBoxOutlined />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        className={classes.inputFields}
        id='password'
        name='password'
        type='password'
        label="Password"
        onChange={handleInputChange}
        value={formValues.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <VpnKeyIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container className={classes.buttonContainer}>

        <Button
          component={Link}
          to={FIX_ACCOUNT}
          color="primary"
          size="small">
          Restor Password
        </Button>

        <Button
          variant="contained"
          color="primary"
          type='submit'
          className={classes.button}
          endIcon={<ArrowForwardRoundedIcon />} >
          Log In
        </Button>
      </Grid>
    </TabPanel>
  )
}