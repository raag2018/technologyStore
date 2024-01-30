import "../CSS/main.css"
import { NavLink } from 'react-router-dom'

const  HomePages = () => {
  //<div className="p-5 m-0 text-left bg-image img-fluid rounded-3 mx-auto d-block w-100" style={{backgroundImage: `url(${"https://res.cloudinary.com/dgxmqoyv4/image/upload/c_lfill,g_center,h_500,w_2140,y_0/v1706578187/hero_Mesa_de_trabajo_1_hhjzu0.png"})`}}>
  //
    //https://res.cloudinary.com/dgxmqoyv4/image/upload/q_auto/f_auto/c_pad,g_center,w_1080,h_608,ar_16:9/v1706578187/hero_Mesa_de_trabajo_1_hhjzu0.png

    return (
      <>
      <div className="jumbotron jumbotron-bg jumbotron-hg m-3">
      <div className="mask rounded text-white p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.6)", width:"40%"}}><h1 className="display-4 kanit-black">El cambio que buscas empieza hoy!</h1>
          <p className="lead kanit-black ">Con nuestros cursos especializados en desarrollo web, programacion, diseño y mas, podras hacer realidad tus proyectos virtuales.</p>
          <hr className="my-4"/>
          <p className="kanit-regular">Registrate para ver nuestros cursos como Estudiante o crear nuevos con nuestros perfiles Coach</p>
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