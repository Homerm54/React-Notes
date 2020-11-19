import React, { useState, useEffect } from 'react';

import { ui } from 'redux/actions';
import { REGISTER } from 'constants/uiLocations';
import { useDispatch } from 'react-redux';

// Components
import LogIn from './login';
import SignUp from './signup';

// UI
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from 'assets/background-unsplash-dimmed.jpg';



const useStyles = makeStyles(theme => (
  {
    root: {
      backgroundAttachment: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'none',
      backgroundColor: 'grey',
      backgroundImage: `url(${backgroundImage})`,
      height: '100%',
    },
    container: {
      height: '100%',
      width: '100%',
      paddingTop: theme.spacing(10),
    },
    formContainer: {
      margin: 'auto',
      marginTop: theme.spacing(3),
    },
    form: {
      paddingLeft: '2rem',
      paddingRight: '2rem',
      paddingBottom: '1rem',
    },
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


export default function Page() {

  const classes = useStyles();
  const [currentFormValue, setCurrentFormValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentFormValue(newValue);
  }

  const dispatch = useDispatch();
  
  useEffect(() =>{
  
    dispatch(ui.changeUserLocation(REGISTER));
  }, [dispatch]);
  

  return (
    <main className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>

        <Typography
          variant='h6'
          component='h1'
          align='center'
          style={{color: 'whitesmoke',}}
        >
          Please, Sign Up or Register to make some awesome notes
        </Typography>

        <Paper
          elevation={3}
          variant="outlined"
          className={classes.formContainer}>
          <Tabs
            value={currentFormValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label='Sign In' id='login-form' />
            <Tab label='Sign Up' id='signup-form' />
          </Tabs>

          <LogIn
            value={currentFormValue}
            index={0}
            className={classes.form} />

          <SignUp
            value={currentFormValue}
            index={1}
            className={classes.form} />

        </Paper>
      </Container>
    </main>
  )
}