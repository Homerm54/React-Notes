import { types } from 'redux/types';
import { db } from "firebase_folder";
import { startLoading, finishLoading } from "./ui";
import helperLoadNotes from 'helpers/loadNotes';



export function createNewNote() {

  return async (dispatch, getState) => {

    dispatch(startLoading());

    const { uid } = getState().auth;

    const newNote = {
      title: 'Brand New Note',
      body: '### To be filled!.',
      created: new Date().getTime(),
      last_modified: new Date().getTime(),
      category: 'To Do',
    }

    const docRef = await db.collection(`${uid}/notes/notes`).add(newNote);

    dispatch(setActiveNote({
      id: docRef.id, 
      ...newNote
    }));

    // Add new note to State (Like the local storage).
    const notes = getState().notes.notes;
    notes['To Do'].push(newNote);

    dispatch(setNotes(notes));
    dispatch(finishLoading());

  }
}



export function setNotes(notes){
  
  return {
    type: types.setNotes,
    payload: {
      notes,
    }
  }
}



export function setActiveNote(note){

  return {
    type: types.setActiveNote,
    payload: {
      note
    }
  }
}



export function loadNotes(){

  return async (dispatch, getState) =>{

    const uid = getState().auth.uid;

    const notes = await helperLoadNotes(uid);

    dispatch(setNotes(notes));
    dispatch(finishLoading());
  }
}



export function startUpdateNote(data){

  return async (dispatch, getState) =>{
    
    dispatch(startLoading());

    const { uid } = getState().auth;

    await db.collection(`${uid}/notes/notes`).doc(data.id).update(
      {
        title: data.title,
        body: data.body,
        last_modified: new Date().getTime(),
        category: data.category,
      }
    )

    dispatch(setActiveNote(data));
    dispatch(clearUpdateNote());
    dispatch(finishLoading());
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



export function clearUpdateNote(){
  return {
    type: types.updateNote,
    payload: {
      update: false,
    }
  }
}



export function deleteNote(noteId){

  return async (dispatch, getState) =>{

    dispatch(startLoading());

    const uid = getState().auth.uid;
    const note_id = noteId || getState().note.id;
    db.collection(`${uid}/notes/notes`).doc(note_id).delete();

    dispatch(loadNotes()); // Start Loading will fire the stop loading
    
  }
}


export function clearNotesOnMemory(){

  return {
    type: types.clearNotes,
    payload: {
      notes: {},
    }
  }
}