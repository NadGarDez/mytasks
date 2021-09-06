import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const component = ({route}) =>{
  const preventDefault = (event) => event.preventDefault();

  return(
    <>
      <AppBar >
        <Toolbar>
          <Typography variant="h5" style={{flexGrow:1}}>
            {
              route == "panel" ? "My Task Panel" : "My Task"
            }
          </Typography>
          {
            route == "index"
            ?(
              <Button color="inherit" href="/login">
                Login
              </Button>
            )
            :(
              <Button color="inherit" href="/">
                Inicio
              </Button>
            )
          }

        </Toolbar>
      </AppBar>
      <Toolbar />
    </>

  )
}


export default component
