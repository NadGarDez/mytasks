import React,{useState,useEffect} from "react"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const a = ({show,close,send})=>{
  const [nombre,setNombre] = useState("")
  const [descripcion,setDescripcion] = useState("")
  const [responsables,setResponsables] = useState("")

  return (
      <div>
         <Dialog open={show} onClose={close} aria-labelledby="form-dialog-title">
           <DialogTitle id="form-dialog-title">Crear Nueva Tarea</DialogTitle>
           <DialogContent>
             <DialogContentText>
              Son necesarias todos los campos
             </DialogContentText>
             <TextField
               autoFocus
               margin="dense"
               id="CTnombre"
               label="Nombre de tarea"
               type="email"
               fullWidth
               inputProps={{ maxLength: 50 }}
               onChange = {
                 (e)=>{
                   setNombre(e.target.value)
                 }
               }
             />
             <TextField

               margin="dense"
               id="CTdescripcion"
               label="Description de tarea"
               type="email"
               fullWidth
               multiline
               maxRows={4}
               inputProps={{ maxLength: 100 }}
               onChange = {
                 (e)=>{
                   setDescripcion(e.target.value)
                 }
               }
             />
             <TextField

               margin="dense"
               id="CTresponsables"
               label="Responsables"
               type="email"
               fullWidth
               multiline
               maxRows={4}
               inputProps={{ maxLength: 100 }}
               onChange = {
                 (e)=>{
                   setResponsables(e.target.value)
                 }
               }
             />
           </DialogContent>
           <DialogActions>
             <Button onClick={close} color="primary"
              onClick={
                ()=>{
                  setNombre("")
                  setDescripcion("")
                  setResponsables("")
                  close()
                }
              }
             >
               Cerrar
             </Button>
             <Button onClick={
               ()=>{
                  send(nombre,descripcion,responsables)
               }

             } color="primary">
              Enviar
             </Button>
           </DialogActions>
         </Dialog>
      </div>
  )
}



export default a
