import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <nav className='navbar mt-0 navbar-expand-lg navbar-light bg-light shadow'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/c_crop,w_1024,h_400,g_auto/v1706547648/Mesa_de_trabajo_1transparent_ybzbrp.png" width={150+"px"}></img></a>
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
                                    className='nav-link btn-color text-white me-2'
                                    to='/registrar'
                                >
                                    Registrate
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/login'
                                    className='nav-link btn-color text-white'
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