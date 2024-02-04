import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from '../firebase'
const Navbar = () => {
    const auth = getAuth(app)
    const [sesion, setSesion] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const authentication = async () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const storage = localStorage.getItem("USER_V1");
                    const parsedDataUser = JSON.parse(storage);
                    setSesion(parsedDataUser.sesion)
                } else {
                    const storage = localStorage.getItem('USER_V1')
                    const dataUser = JSON.parse(storage)
                    dataUser.sesion = false
                    localStorage.setItem('USER_V1', JSON.stringify(dataUser))
                    navigate('/login')
                }
            })
        }
        authentication()
    }, []);
    return (
        <>
            <nav className='navbar mt-0 navbar-expand-lg navbar-light bg-light shadow'>
                <div className='container-fluid'>
                    <div className='navbar-brand'><NavLink
                        to='/'
                        className='nav-link'
                    ><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/c_crop,w_1024,h_400,g_auto/v1706547648/Stadi/Mesa_de_trabajo_1transparent_ybzbrp.png" width={150 + "px"}></img></NavLink></div>
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
                            {sesion ?
                                <li>
                                    <NavLink
                                        to='/login'
                                        className='nav-link btn-color text-white'
                                    >
                                        Cerrar Sesion
                                    </NavLink>
                                </li>
                                :
                                <li>
                                    <NavLink
                                        to='/login'
                                        className='nav-link btn-color text-white'
                                    >
                                        Iniciar Sesion
                                    </NavLink>
                                </li>

                            }
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    )
}
export default Navbar