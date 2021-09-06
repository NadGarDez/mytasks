import Footer from "../components/footer.js"
import Nav from "../components/nav.js"
import React, {useState,useEffect} from "react"
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/PermIdentity';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from "../components/dialogLogin.js"
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'

const login = props => {
  const [email,setEmail] = useState("")
  const [passWord,setPassword] = useState("")
  const [remember,setRemeber] = useState(false)
  const [dialog, setDialog] = useState(false)
  const router = useRouter()

  const handleRemember = (value)=>{
    setRemeber(!remember)
  }
  const handleDialog = ()=>{
    setDialog(false)
  }

  const handleLogin = ()=>{
    const allow = true
    if (allow) {
      router.push("/panel")
    }
    else{
      setDialog(true)
    }
  }

  useEffect(
    ()=>{
      console.log(email, "email")
      console.log(passWord, "passWord")
      console.log(remember, "remember")
    }
  )

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })



  return(
    <div>
      <Nav route="login"/>
      <Dialog open={dialog} action={handleDialog}/>

      <main className="w100 PerfectCenter image " style={{height:800}}>
          {
            isDesktopOrLaptop &&
            <div className="Column h75 w30 VerticalCenter whiteBackground topShadow bRound" style={{paddingLeft:"3%",paddingRight:"3%",paddingTop:"5%",paddingBottom:"5%"}}>

            <div className="Column PerfectCenter h20 w100">
              <Avatar className="avatar">
                <UserIcon style={{fontSize:60}}/>
              </Avatar>
            </div>
            <div className="Column PerfectCenter h20 w100 title">
              <p style={{fontSize:40,textAlign:"center"}} className="title">Login</p>
            </div>
            <div className="PerfectCenter h20 w100">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange = {
                  e => {
                    setEmail(e.target.value)
                  }
                }
              />
            </div>
            <div className="PerfectCenter h20 w100">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {
                  e => {
                    setPassword(e.target.value)
                  }
                }
              />
            </div>
            <div className="VerticalCenter Row h10 w100">
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={handleRemember}
                      value="remember"
                      color="primary"
                    />
                  }
                  label="Recordar"
              />
            </div>

            <div className="PerfectCenter Row h10 w100">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={
                  ()=>{
                    handleLogin()
                  }
                }
              >
              Enviar
             </Button>
            </div>



            </div>
          }
          {
            isTabletOrMobile &&
            <div className="Column h75 w80 VerticalCenter whiteBackground topShadow bRound" style={{paddingLeft:"3%",paddingRight:"3%",paddingTop:"5%",paddingBottom:"5%"}}>

            <div className="Column PerfectCenter h20 w100">
              <Avatar className="avatar">
                <UserIcon style={{fontSize:60}}/>
              </Avatar>
            </div>
            <div className="Column PerfectCenter h20 w100 title">
              <p style={{fontSize:40,textAlign:"center"}} className="title">Login</p>
            </div>
            <div className="PerfectCenter h20 w100">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange = {
                  e => {
                    setEmail(e.target.value)
                  }
                }
              />
            </div>
            <div className="PerfectCenter h20 w100">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {
                  e => {
                    setPassword(e.target.value)
                  }
                }
              />
            </div>
            <div className="VerticalCenter Row h10 w100">
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={handleRemember}
                      value="remember"
                      color="primary"
                    />
                  }
                  label="Recordar"
              />
            </div>

            <div className="PerfectCenter Row h10 w100">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={
                  ()=>{
                    handleLogin()
                  }
                }
              >
              Enviar
             </Button>
            </div>



            </div>
          }

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

export default login


/*
<div className="PerfectCenter h20 w100">
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    autoFocus
  />
</div>
<div className="PerfectCenter h20 w100">
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    autoComplete="current-password"
  />
</div>

*/
