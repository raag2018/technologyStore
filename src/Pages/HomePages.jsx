import "../CSS/main.css"
import { NavLink } from 'react-router-dom'

const  HomePages = () => {
    //TODO: Verificar responsividad del jumbotron y adaptar imagen segun tamaño de dispositivos

    return (
      <>
      <div className="jumbotron jumbotron-bg jumbotron-hg m-3">
      <div className="mask rounded text-white p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.6)", width:"40%"}}><h1 className="display-4 kanit-black">El cambio que buscas empieza hoy!</h1>
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
      </>
    )
  }
  
  export default HomePages