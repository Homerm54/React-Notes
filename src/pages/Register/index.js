import React, { useState } from 'react';

// Components

import LogIn from './login';
import SignUp from './signup';

// UI
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from './background-unsplash-dimmed.jpg';

const useStyles = makeStyles(theme => (
  {
    root: {
      backgroundAttachment: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'none',
      backgroundColor: 'grey',
      backgroundImage: `url(${backgroundImage})`,
      height: '100%',
      //paddingTop: '6rem',
      /*paddingLeft: theme.spacing(7) + 1, // Match the heigh of the navbar
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(9) + 1,
      },*/
    },
    container: {
      display: 'flex',
      height: '100%'
    },
    formContainer: {
      margin: 'auto',
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

  return (
    <main className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
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