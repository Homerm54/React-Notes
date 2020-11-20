import React, { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { ui, note } from 'redux/actions';
import { NOTE_READ, NOTE_EDIT } from 'constants/uiLocations';
import { drawerSpacing } from "constants/ui";

import MarkdownRenderer from './readMode';
import { NoteEditor, CategorySelector, TitleEditor } from './editMode';
import Loading from 'loading';

import useForm from 'hooks/useForm';

//UI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';




const useStyle = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    height: '100%',
    width: '100%',
    paddingLeft: theme.spacing(drawerSpacing - 5),
    paddingRight: theme.spacing(2.5),
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(drawerSpacing + 2) + 3,
    },
  },
  information: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0.8),
  },
  selector: {
    marginTop: 'auto',
    marginBottom: 'auto',
  }
}))



export default function Note() {


  const classes = useStyle();
  const dispatch = useDispatch();

  const Note = useSelector(state => state.notes.note);
  const isLoading = useSelector(state => state.ui.loading);
  const toUpdate = useSelector(state => state.notes.update);
  const inEditMode = useSelector(state => {

    if (state.ui.location === NOTE_EDIT) return true;
    return false; // userLocation will be changed to NOTE_READ later
  });

  const [values, handleInputChange] = useForm({
    title: Note.title,
    body: Note.body,
    category: Note.category,
    id: Note.id,
  })


  useEffect(() => {
    dispatch(ui.changeUserLocation(NOTE_READ));
  }, [dispatch]);


  useEffect(() => { // To avoid any potential loop
    toUpdate && dispatch(note.startUpdateNote(values));
  }, [toUpdate, dispatch, note]);



  if (isLoading) return <Loading />

  return (
    <Paper className={classes.root} elevation={3}>
      {inEditMode ?
        <Typography variant="h4" >
          <TitleEditor 
            values={values}
            handleInputChange={handleInputChange} 
          />
        </Typography>
        :
        <Typography variant="h4" component='h1' >{Note.title}</Typography>
      }

      <Grid container className={classes.information}>

        <Grid item xs={12} md>
          <Typography color='textSecondary' variant='body'>
            Created: {new Date(Note.created).toDateString()}
          </Typography>
        </Grid>

        <Grid item xs={12} md>
          <Typography color='textSecondary' variant='body'>
            Last Modified: {new Date(Note.last_modified).toDateString()}
          </Typography>
        </Grid>

        <Grid container item xs={12} md spacing={2}>

          {inEditMode ?

            <CategorySelector
              values={values}
              handleInputChange={handleInputChange}
            />
            :
            <Grid item>
              <Typography color='textSecondary' variant='body'>
                Category: {values.category}
              </Typography>
            </Grid>
          }

        </Grid>
      </Grid>

      <Divider />
      <br />

      {inEditMode ?
        <NoteEditor
          text={values.body}
          handleChange={handleInputChange}
        />
        :
        <MarkdownRenderer text={Note.body} />
      }

    </Paper>
  )
}