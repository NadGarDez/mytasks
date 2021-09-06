
import Nav from "../components/nav.js"
import Footer from "../components/footer"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useMediaQuery } from 'react-responsive'

export default function Home() {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })


  const styles = {
    continer:{
      width:"100%",
      height:1000,
      padding:0
    }
  }
  return (
    <div>
      <Nav route="index"/>
      <main className="w100 h60 PerfectCenter image" style={{height:800,}}>
        {
          isDesktopOrLaptop &&
          <div className="Column h50 w50 PerfectCenter" >
            <div>
              <p style={{fontSize:60,textAlign:"center"}} className="title">My tasks</p>
            </div>
            <div>
              <p style={{fontSize:40,textAlign:"center"}} className="textGray">Aplicacion web para el manejo de tareas</p>
            </div>
            <div style={{padding:10}}>
            <Button color="inherit" href="/login" variant="outlined" color="primary">
              Empezars
            </Button>
            </div>

          </div>
        }
        {
          isTabletOrMobile &&
          <div className="Column h50 w80 PerfectCenter" >
            <div>
              <p style={{fontSize:60,textAlign:"center"}} className="title">My tasks</p>
            </div>
            <div>
              <p style={{fontSize:40,textAlign:"center"}} className="textGray">Aplicacion web para el manejo de tareas</p>
            </div>
            <div style={{padding:10}}>
            <Button color="inherit" href="/panel" variant="outlined" color="primary">
              Empezars
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
      `}</style>
    </div>
  )
}
