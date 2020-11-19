import { types } from 'redux/types';

/**
 * Expected State of this Reducer:
 * 
 * {
 *    active_note_id: Note ID <String>,
 *    note: { title, body, created, last_modified }
 *    save: bool - indicate if user decided to save note
 * }
 * 
 */


const initialState = {
  notes: {},
  note: {
    title: 'New Note',
    body: '-',
    created: '-',
    last_modified: '-',
    id: '',
  },
  delete: false,
  update: false,
}

export default function NotesReducer(state = initialState, action) {

  switch (action.type) {
    case types.setNotes:

      return {
        ...state,
        notes: action.payload.notes
      };

    case types.setActiveNote:

      return {
        ...state,
        note: action.payload.note
      }

    case types.updateNote:

      return {
        ...state,
        update: action.payload.update
      }

    default:
      console.log('[Note] Default Case reached');
      return state;
  }
}