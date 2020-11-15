/**
 * Expected State of this Reducer:
 * 
 * {
 *    notes: [{
 *              id: , 
 *              title: , 
 *                // Allow multiple Notes with the same name, but no same category
 *              category: ,
 *            },],         - Array of notes created by the user, by category
 * 
 *    activeNote: {}, // Maybe only this one?
 * }
 * 
 */


const initialState = {
  notes: [],
}

export default function NotesReducer(state = initialState, action){

  switch (action.type){
    /*case types.value:
      
      return state;*/
  
    default:
    return state;
  }
}