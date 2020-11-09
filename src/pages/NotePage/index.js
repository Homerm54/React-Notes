import React from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import AddIcon from '@material-ui/icons/AddBox';

const useStyle = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(7) + 1, // Match the heigh of the navbar
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    paddingTop: "15%",
    height: '100%',
    width: '100%',
    paddingRight: theme.spacing(2.5),
    [theme.breakpoints.up("md")]: {
      paddingTop: "7%",
      paddingRight: theme.spacing(2) + 1
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(10) + 1,
    },
  }
}))

export default function Note() {
  const { name } = useParams();
  const classes = useStyle();

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h4" component='h1' >{ name }</Typography>
      <Divider />
      <Typography align='justify' paragraph variant='body2'>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      {/** Maybe move the info of the note to another section.
      <Chip
        label="To Do"
        variant="outlined"
        avatar={<Avatar>T</Avatar>}
        onDelete={() => console.log('Category Deleted')}
      />
      <Chip
        label="Add New Category"
        variant="outlined"
        avatar={<Avatar><AddIcon /></Avatar>}
        onClick={() => console.log('Category Added')}
      />
      <Divider />
       */}

    </Paper>
  )
}