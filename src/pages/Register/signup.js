import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'redux/actions';
import validator from 'validator';
import useForm from 'hooks/useForm';
import TabPanel from './TabPanel';

// UI
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AccountBoxOutlined from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import googleLogo from 'assets/google-icon.svg';




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
    },
    dividerContainer: {
      marginTop: '1rem',
      marginBottom: "0.8rem",
    },
    divider: {
      marginTop: "0.8rem",
    },
    text: {
      color: 'grey',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
      textAlign: 'center',
    },
    googleLogo: {
      width: '25px'
    }
  }
));



export default function SignUpForm(props) {

  const classes = useStyles();

  const [formValues, handleInputChange] = useForm({
    email: '',
    name: '',
    password: '',
    password2: '',
  })

  const [error, setError] = useState({
    email: false,
    name: false,
    password: false,
    password2: false,
  })

  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);


  function isFormValid() {

    let errorObject = {};

    if (!validator.isAlpha(formValues.name.trim())) {
      errorObject.name = 'Name must containt only characters';
    }

    if (!validator.isEmail(formValues.email)) {
      errorObject.email = 'Invalid Email Address';
    }

    if (!validator.isLength(formValues.password, { min: 5, max: 12 })) {
      errorObject.password = 'Password Lenght Invalid';
    } else if (!validator.equals(formValues.password, formValues.password2)) {
      errorObject.password2 = 'Passwords are not the same';
      console.log('Pass2 error');
    }

    // Check if any error happened
    if (Object.keys(errorObject).length) {
      setError(errorObject);
      return false;
    };


    setError({
      email: false,
      name: false,
      password: false,
      password2: false,
    });

    return true;
  }


  function handleNormalSignUp(e) {

    e.preventDefault();

    if (isFormValid()) {
      dispatch(auth.initSignUpWithEmail(
        formValues.email,
        formValues.password,
        formValues.name
      ))
    }

  }

  function handleGoogleSignUp() {

    dispatch(auth.initGoogleLogIn());
  }


  return (
    <TabPanel {...props} onSubmit={handleNormalSignUp}>

      <TextField
        error={error.email? true: false}
        helperText={error.email}
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
        error={error.name? true: false}
        helperText={error.name}
        className={classes.inputFields}
        id='name'
        name='name'
        type='text'
        label="Name and Last Name"
        onChange={handleInputChange}
        value={formValues.name}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <AccountBoxOutlined />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        error={error.password? true: false}
        helperText={error.password || 'Between 5 and 12 characters long'}
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

      <TextField
        error={error.password2? true: false}
        helperText={error.password2}
        className={classes.inputFields}
        id='password2'
        name='password2'
        type='password'
        label="Repeate Password"
        onChange={handleInputChange}
        value={formValues.password2}
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
          disabled={loading}
          variant="contained"
          color="primary"
          type='submit'
          className={classes.button}
          endIcon={!loading ?
            <ArrowForwardRoundedIcon /> : <HourglassFullIcon />
          }>
          Sign Up
        </Button>

      </Grid>


      <Grid container className={classes.dividerContainer}>
        <Grid item xs className={classes.divider}><Divider /></Grid>
        <Grid item xs={1} className={classes.text}>
          <Typography> or </Typography>
        </Grid>
        <Grid item xs className={classes.divider}><Divider /></Grid>
      </Grid>


      <Grid container justify='center'>
        <Grid item>
          <Button
            disabled={loading}
            variant='outlined'
            startIcon={<img src={googleLogo} alt='google-logo' className={classes.googleLogo} />}
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google </Button>
        </Grid>
      </Grid>

    </TabPanel>
  )
}