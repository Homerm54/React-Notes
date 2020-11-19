import { db } from 'firebase_folder';

export default async function loadNotes(uid){

  const notesSnap = await db.collection(`${uid}/notes/notes`).get();

  const notes = {
    "To Do": [], 
    Work: [],
    Study: [],
    Reminders: [],
  };  // Return empty array if no notes.

  notesSnap.forEach( note =>{
    const id = note.id;
    const data = note.data();
    
    notes[data.category].push({id, ...data});
  });

  return notes;
}