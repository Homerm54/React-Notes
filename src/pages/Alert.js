import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ui } from 'redux/actions';


// UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';



export default function AlertWindow() {

  const err = useSelector(state => state.ui.error);
  const dispatch = useDispatch();

  const open = err ? true : false;


  function handleClose() {

    dispatch(ui.clearError());
  }



  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">
        An error occured :(
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          Looks like something went wrong, check the message below:
          <Typography color='error' style={{marginTop: '0.8rem'}}>
            {err}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close this message
        </Button>
      </DialogActions>
    </Dialog>
  )

}