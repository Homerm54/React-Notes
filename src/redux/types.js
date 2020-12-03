export const types = {

  // Actions writed using the '[Domain] Action Type' convention
  
  login: '[Auth] Login',    
  logout: '[Auth] Logout',

  // UI Related Actions Types
  uiSetError: '[UI] Set Error',
  uiClearError: '[UI] Clear Error',
  uiStartLoading: '[UI] Start Loading',
  uiFinishLoading: '[UI] Finish Loading',
  uiChangeUserLocation: '[UI] Change User Location',

  // Note Related Actions
  createNewNote: '[Note] Create New Note',
  deleteNote: '[Note] Delete Note',
  updateNote: '[Note] Update State Change',
  setNotes: '[Note] Set User Notes',
  setActiveNote: '[Note] Active Note Body',
  clearNotes: '[Note] Clear Notes', // To be used on logout
  
}