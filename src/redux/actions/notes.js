import { types } from 'redux/types';
import { db } from "firebase_folder";
import { startLoading, finishLoading, setError } from "./ui";
import helperLoadNotes from 'helpers/loadNotes';



export function createNewNote() {

  return (dispatch, getState) => {

    dispatch(startLoading());

    const uid = getState().auth.uid;
    const date = new Date().getTime();

    const newNote = {
      title: 'Brand New Note',
      body: '### To be filled!.',
      created: date,
      last_modified: date,
      category: "To Do",
    }

    db.collection(`${uid}/notes/notes`).add(newNote)
      .then(docRef => {

        const notes = getState().notes.notes;
        notes['To Do'].push(newNote);
        
        // Add new note to State (Like the local storage).
        dispatch(setActiveNote({
          id: docRef.id,
          ...newNote
        }));

        dispatch(setNotes(notes));
        dispatch(finishLoading());

      })
      .catch(err => {

        console.log(`Error creating new note: ${err}`);
        dispatch(setError(`Error creating new note: ${err}`));
        dispatch(finishLoading());
      });
  }
}



export function setNotes(notes) {

  return {
    type: types.setNotes,
    payload: {
      notes,
    }
  }
}



export function setActiveNote(note) {

  return {
    type: types.setActiveNote,
    payload: {
      note
    }
  }
}



export function loadNotes() {

  return (dispatch, getState) => {

    const uid = getState().auth.uid;

    helperLoadNotes(uid).then(notes => {

      dispatch(setNotes(notes));
      dispatch(finishLoading());
    }).catch(err => {

      console.log(`Error Loading User Notes: ${err}`);
      dispatch(setError(`Error Loading User Notes: ${err}`));
      dispatch(finishLoading());
    })
  }
}



export function startUpdateNote(data) {

  return (dispatch, getState) => {

    dispatch(startLoading());

    const uid = getState().auth.uid;

    db.collection(`${uid}/notes/notes`).doc(data.id).update(
      {
        title: data.title,
        body: data.body,
        last_modified: new Date().getTime(),
        category: data.category,
      }
    ).then(() => {

      dispatch(setActiveNote(data));
      dispatch(clearUpdateNote());
      dispatch(loadNotes());
    }).catch(err => {

      console.log(`Error Updating Note: ${err}`);
      dispatch(setError(`Error Updating Note: ${err}`));
      dispatch(finishLoading());
    })
  }
}



export function updateNote() {
  return {
    type: types.updateNote,
    payload: {
      update: true,
    },
  }
}



export function clearUpdateNote() {
  return {
    type: types.updateNote,
    payload: {
      update: false,
    }
  }
}



export function deleteNote(noteId) {

  return (dispatch, getState) => {

    dispatch(startLoading());

    const uid = getState().auth.uid;
    const note_id = noteId || getState().notes.note.id;

    db.collection(`${uid}/notes/notes`).doc(note_id).delete()
      .then(() => {

        dispatch(loadNotes()); // Start Loading will fire the stop loading
      }).catch(err => {

        console.log(`Error Deleting Note: ${err}`);
        dispatch(setError(`Error Deleting Note: ${err}`));
        dispatch(finishLoading());
      });
  }
}


export function clearNotesOnMemory() {

  return {
    type: types.clearNotes,
    payload: {
      notes: {},
    }
  }
}