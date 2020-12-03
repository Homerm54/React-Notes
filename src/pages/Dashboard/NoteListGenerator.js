import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { note } from "redux/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

// UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';



export default function CreateNoteList({ list, arialLabel }) {


  const dispatch = useDispatch();
  
  
  function handleDelete(note_id) {

    return () => {

      dispatch(note.deleteNote(note_id));
    }
  }


  function setActiveNote(note_item) {
    
    return ()=>{
      // console.log('Note to be active:', note)
      dispatch(note.setActiveNote(note_item));
    }
  }


  return (
    <List arial-label={arialLabel || 'Note List'}>
      {list.map((note, ix) => {

        return (
          <ListItem key={ix}>

            <Link
              component={RouterLink}
              to='/note'
              color="inherit"
              onClick={setActiveNote(note)}
            >

              <ListItemText
                primary={note.title}
                secondary={new Date(note.created).toDateString()}
              />

            </Link>

            <ListItemSecondaryAction onClick={handleDelete(note.id)}>
              <IconButton
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>

          </ListItem>
        )
      })}
    </List>
  )
}


CreateNoteList.propTypes = {
  list: PropTypes.array.isRequired,
  arialLabel: PropTypes.string,
}