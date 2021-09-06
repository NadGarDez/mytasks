import React, {useState,useEffect} from "react"
import Footer from "../components/footer.js"
import Nav from "../components/nav.js"
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/PermIdentity';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/AddCircle';
import Delete from "@material-ui/icons/Delete"
import Edit from '@material-ui/icons/Edit';
import Check from "@material-ui/icons/Check"
import Tooltip from '@material-ui/core/Tooltip';
import CreateDialog from "../components/createTaskdialog.js"
import EdidDialog from "../components/editDialog.js"
import Wd from "../components/waringDialog.js"
import { useMediaQuery } from 'react-responsive'
import operations from "../db/operations.js"
const connection = require("../db/connection")
const client = connection.default
import { gql } from '@apollo/client';

import { useRouter } from 'next/router'




const component = () => {

  const [aTasks,setATasks] = useState(true)
  const [aTasksCompleted,setATasksCompleted] = useState(false)
  const [showCDialog,setshowCDialog] = useState(false)
  const [showEDialog,setshowEDialog] = useState(false)
  const [tasks,setTask] = useState(null)
  const [showWD,setWD] = useState(false)
  const [mesage,setMesage] = useState("")
  const [dataEdit,setDataEdit] = useState({nombre:"",descripcion:"",responsables:""})


  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })


  useEffect(
    async ()=>{
      if(tasks == null){
        let data = await fetchTasks()
        console.log(data)
        setTask(data)

      }
    }
  )

  const handleEDialog = ()=>{
    setshowEDialog(!showEDialog)
  }

  const handleCDialog = ()=>{
    setshowCDialog(!showCDialog)
  }

  const handleWD = ()=>{
    setWD(!showWD)
  }

  const handleActive = async ()=>{
    if(!aTasks){
        setTask([])
      setATasks(!aTasks)
      setATasksCompleted(!aTasksCompleted)
      let data = await fetchTasks()
      setTask(data)
    }
  }

  const handleActive2 = async ()=>{
    if(!aTasksCompleted){
      setTask([])
      setATasksCompleted(!aTasksCompleted)
      setATasks(!aTasks)
      let data = await fetchTasksCompleted()
      setTask(data)
    }
  }

  const createTask = async (nombre,descripcion,responsables)=>{

    if (nombre != "" && descripcion != "" && responsables != "") {
      let result =""
      try {
        result = await operations.create(nombre,descripcion,responsables)
      } catch (e) {
        console.log(e)

      }
      console.log(result)

      if(result.data != null){
        handleCDialog()
        setMesage("Actividad creaada correctamente")
        refreshTask()
        handleWD()
      }
      else{
        handleCDialog()
        setMesage("Maximo de peticiones por unidad de tiempo ... Intente mas tarde")
        handleWD()
      }


    }
    else{
      setMesage("Todos los datos son requeridos")
      handleWD()
    }
  }

  const editTask = async (id,nombre,descripcion,responsables)=>{
    if (nombre != "" && descripcion != "" && responsables != "") {

      let result =""
      try {
        result = await operations.edit(id,nombre,descripcion,responsables)
      } catch (e) {
        console.log(e)

      }
      console.log(result)

      if(result.data != null){
        handleEDialog()
        setMesage("Actividad editada correctamente")
        refreshTask()
        handleWD()
      }
      else{
        setMesage("Maximo de peticiones por unidad de tiempo ... Intente mas tarde")
      }

    }
    else{
      setMesage("Todos los datos son requeridos")
      handleWD()
    }
  }

  const deleteTask = async (id)=>{

      let result =""
      try {
        result = await operations.delete(id)
      } catch (e) {
        console.log(e)

      }
      console.log(result)


    if(result.data != null){
      setMesage("Actividad eliminada correctamente")
      refreshTask()
      handleWD()
    }
    else{
      setMesage("Maximo de peticiones por unidad de tiempo ... Intente mas tarde")
      handleWD()
    }
    refreshTask()
  }

  const fetchTasks =  async () => {

    let result =""
    try {
      result = await operations.fetch1()
    } catch (e) {
      console.log(e)


    }

    console.log(result)



    return result.data != null ? result.data.tasksList.items : []

  }

  const fetchTasksCompleted =  async () => {
    let result =""
    try {
      result = await operations.fetch2()
    } catch (e) {
      console.log(e)

    }
    console.log(result)



    return result.data != null ? result.data.tasksList.items : []
  }

  const refreshTask = async ()=>{
    setTask([])
    setTimeout(async function () {
      let data = ""
      if (aTasks == true) {
        data = await fetchTasks()
      }
      else{
        data = await fetchTasksCompleted()
      }
      setTask(data)
    }, 3000);
  }

  const taskComplete = async (id)=>{

    let result = await operations.complete(id)


     result = await result.json()
      if (result.message == "success") {
        setMesage("Actividad culminada correctamente")
        refreshTask()
        handleWD()
      }
      else{
        setMesage("Maximo de peticiones por unidad de tiempo ... Intente mas tarde")
        refreshTask()
        handleWD()
      }
      console.log(result)
  }

    const subComponent = ()=>{
      let component = false
      let divMensaje = aTasks == true ? "Lista de tareas vacias" : "Lista de tareas completadas vacias"

      if (tasks == null || tasks.length == 0) {
        component = (
          <div className="PerfectCenter h100 w100">
            <p>{divMensaje}</p>

          </div>
        )
      }
      return component

    }

  return(
    <div>
      <Wd open={showWD} action={handleWD} mesage={mesage}/>
      <CreateDialog show={showCDialog} close={handleCDialog} send={createTask} />
      <EdidDialog show={showEDialog} close={handleEDialog} send={editTask} item={dataEdit}/>
      <Nav route="panel"/>
      <main className="w100 Column image " style={{height:800}}>
      <div className="Row PerfectCenter w100 h90">
        <div className="Row Column w80 h80 bRound minimalShadow" style={{backgroundColor:"white"}}>
          <div className="Row w100 h10">
            <div className="h100 w50 PerfectCenter"
              onClick = {
                ()=>{
                  handleActive()
                }
              }
            >

              {
                isDesktopOrLaptop &&
                <a href="#" id="tasks"><p className="title mediumSize2"
                  style={{
                    color: aTasks == true ? "#3f51b5": "gray"
                  }}
                >
                  Tareas
                </p></a>
              }
              {
                isTabletOrMobile &&
                <a href="#" id="tasks"><p className="title mediumSize"
                  style={{
                    color: aTasks == true ? "#3f51b5": "gray"
                  }}
                >
                  Tareas
                </p></a>
              }
            </div>
            <div className="h100 w50 PerfectCenter"
              onClick = {
                ()=>{
                  handleActive2()
                }
              }
            >
              {
                isDesktopOrLaptop &&
                <a href="#" id="ctasks"><p className="title mediumSize2"
                  style={{
                    color: aTasksCompleted == true ? "#3f51b5": "gray"
                  }}
                >
                  Tareas Completadas
                </p></a>
              }
              {
                isTabletOrMobile &&
                <a href="#" id="ctasks"><p className="title mediumSize"
                  style={{
                    color: aTasksCompleted == true ? "#3f51b5": "gray"
                  }}
                >
                  Tareas Completadas
                </p></a>
              }

            </div>
          </div>

          {
            aTasks == true
            ? (
              <div className="Column w100 h90 " style={{padding:"3%", overflow:"scroll"}}>
                <div className="RowReverse h10 VerticalCenter">
                  <Tooltip title="Crear Nueva Tarea">
                    <IconButton color="primary" id="anadirTarea"
                      onClick = {
                        ()=>{
                          setshowCDialog(true)
                        }
                      }
                    >
                      <p className="smallSize"></p>
                      <Add/>
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="Column h90">


                <Table size="small" id="tasksList">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontSize:20}}>Nombre</TableCell>
                      <TableCell style={{fontSize:20}}>Fecha de publicacion</TableCell>
                      <TableCell style={{fontSize:20}}>Descripcion</TableCell>
                      <TableCell style={{fontSize:20}}>Responsables</TableCell>
                      <TableCell style={{fontSize:20}}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      tasks != null &&
                      tasks.map(
                        (item)=>(
                          <TableRow key={item.id}>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{item.descripcion}</TableCell>
                            <TableCell>{item.responsables}</TableCell>
                            <TableCell >
                              <Tooltip title="Editar">
                                <IconButton color="primary" name="edit"
                                  onClick={
                                    ()=>{
                                      setDataEdit(item)
                                      handleEDialog()
                                    }
                                  }
                                >

                                  <Edit/>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Eliminar">
                                <IconButton color="secondary" name="eliminar"
                                  onClick={
                                    ()=>{
                                      deleteTask(item.id)
                                    }
                                  }
                                >

                                  <Delete/>
                                </IconButton>

                              </Tooltip>
                              <Tooltip title="Culminar">
                                <IconButton style={{ color: "green" }} name="culminar"
                                  onClick={
                                    ()=>{
                                      taskComplete(item.id)
                                    }
                                  }
                                >

                                  <Check/>
                                </IconButton>

                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        )
                      )


                    }
                  </TableBody>
                  </Table>
                  {
                    subComponent()
                  }



                </div>
              </div>
            )
            :(
              <div className="Column w100 h90 " style={{padding:"3%", overflow:"scroll"}}>
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontSize:20}} >Nombre</TableCell>
                    <TableCell style={{fontSize:20}}>Fecha de publicacion</TableCell>
                    <TableCell style={{fontSize:20}}>Descripcion</TableCell>
                    <TableCell style={{fontSize:20}}>Responsables</TableCell>
                    <TableCell style={{fontSize:20}}>Fecha dec culminacion</TableCell>
                    <TableCell style={{fontSize:20}}>Accion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tasks.legth != 0 &&
                    tasks.map(
                      (item)=>(
                        <TableRow key={item.id}>
                          <TableCell>{item.nombre}</TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                          <TableCell>{item.descripcion}</TableCell>
                          <TableCell>{item.responsables}</TableCell>
                          <TableCell>{new Date(item.culminacion).toLocaleString()}</TableCell>
                          <TableCell >


                            <Tooltip title="Eliminar" name="eliminar">
                              <IconButton color="secondary"
                                onClick={
                                  ()=>{
                                    deleteTask(item.id)
                                  }
                                }
                              >

                                <Delete/>
                              </IconButton>

                            </Tooltip>

                          </TableCell>

                        </TableRow>
                      )
                    )


                  }
                </TableBody>
                </Table>
                {
                  subComponent()

                }
              </div>
            )
          }

        </div>
      </div>
      </main>
      <Footer/>
      <style>{`
        .image {
          background-image:linear-gradient(#caeafb,transparent)
        }

        .avatar {
          background-color:#7487f1;
          height:70px;
          width:70px;
        }
      `}</style>
    </div>
  )
}




export default component
