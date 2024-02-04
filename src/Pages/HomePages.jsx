import "../CSS/main.css"
import { NavLink } from 'react-router-dom'
import Courses from "../Components/Courses"
const  HomePages = () => {
    //TODO: Verificar responsividad del jumbotron y adaptar imagen segun tamaño de dispositivos

    return (
      <>
      <div className="jumbotron jumbotron-bg jumbotron-hg m-3">
      <div className="mask rounded text-white p-3 m-2 jumbotron-card"><h1 className="display-4 kanit-black">El cambio que buscas empieza hoy!</h1>
          <p className="lead kanit-black ">Con nuestros cursos especializados en desarrollo web, programacion, diseño y mas, podras hacer realidad tus proyectos virtuales.</p>
          <hr className="my-4"/>
          <p className="lead kanit-black">
          <NavLink
            className='nav-link btn-color-jumbo mx-auto'
            to='/registrar'
            >Registrate</NavLink>
        </p>
        </div>
      
      </div>
      <Courses/>
      </>
    )
  }
  
  export default HomePages