import React from "react"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



const dialog = ({open,action,mesage})=>{
  return (
    <>
    <Dialog
        open={open}

      >
        <DialogTitle id="warningTitle">{mesage}</DialogTitle>

        <DialogActions>
          <Button color="primary" autoFocus

            onClick={
              ()=>{
                action()
              }
            }
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


export default dialog
