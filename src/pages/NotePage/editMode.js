import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';


export function NoteEditor({ text, handleChange }) {

  return (
    <TextField
      id="note-body"
      label="Note"
      name='body'
      multiline
      value={text}
      variant="outlined"
      onChange={handleChange}
      style={{ width: '100%' }}
    />
  )
}

export function CategorySelector({ values, handleInputChange }) {

  return (
    <Grid item>
      <TextField
        size='small'
        margin="none"
        InputProps={{
          startAdornment:
            <InputAdornment position='start'>Category:</InputAdornment>,
        }}
        value={values.category}
        onChange={handleInputChange}
        name='category'
        select
      >
        <MenuItem value='To Do'>To Do</MenuItem>
        <MenuItem value='Study'>Study</MenuItem>
        <MenuItem value='Reminders'>Reminders</MenuItem>
        <MenuItem value='Work'>Work</MenuItem>

      </TextField>
    </Grid>
  )
}

export function TitleEditor({ values, handleInputChange }) {

  return (
    <TextField
      name='title'
      onChange={handleInputChange}
      label="Title"
      variant="outlined"
      value={values.title}
      required
    />
  )
}