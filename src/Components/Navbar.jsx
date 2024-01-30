import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <nav className='navbar mt-0 navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/q_auto/f_auto/c_crop,ar_16:9/v1706547648/Mesa_de_trabajo_1transparent_ybzbrp.png" width={128+"px"}></img></a>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarText' aria-controls='navbarText' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarText'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li>
                                <NavLink
                                    to='/'
                                    className='nav-link'
                                >
                                    Cursos
                                </NavLink>
                            </li>
                        </ul>
                        <ul className='navbar-nav  mb-2 mb-lg-0'>
                            <li>
                                <NavLink
                                    className='nav-link btn btn-info text-white me-2'
                                    to='/registrar'
                                >
                                    Registrate
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/login'
                                    className='nav-link btn btn-danger text-white'
                                >
                                    Iniciar Sesion
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar