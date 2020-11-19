import React from 'react';

import TextField from '@material-ui/core/TextField';


export default function NoteEdit({ text, handleChange }) {

  return (
      <TextField
        id="note-body"
        label="Note"
        name='body'
        multiline
        value={text}
        variant="outlined"
        onChange={handleChange}
        style={{width: '100%'}}
      />
  )
}