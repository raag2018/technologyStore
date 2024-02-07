import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';
import { CorreoContext } from '../Context/correoContext';

const Navbar = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const context = useContext(CorreoContext);
    const [sesion, setSesion] = useState(false);

    useEffect(() => {
        const storage = localStorage.getItem(`${context.correo}`);
        const dataUser = storage ? JSON.parse(storage) : {};
        setSesion(dataUser.sesion || false);
    }, [context]);

    const logout = async () => {
        await signOut(auth);
        setSesion(false);
        localStorage.removeItem(`${context.correo}`);
        navigate('/login');
    };

    return (
        <nav className='navbar mt-0 navbar-expand-lg navbar-light bg-light shadow'>
            <div className='container-fluid'>
                <div className='navbar-brand'>
                    <NavLink to='/' className='nav-link'>
                        <img src='https://res.cloudinary.com/dgxmqoyv4/image/upload/c_crop,w_1024,h_400,g_auto/v1706547648/Stadi/Mesa_de_trabajo_1transparent_ybzbrp.png' width={150 + 'px'} />
                    </NavLink>
                </div>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarText' aria-controls='navbarText' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarText'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li>
                            <NavLink to='/' className='nav-link'>
                                Cursos
                            </NavLink>
                        </li>
                        {sesion && (
                            <li>
                                <NavLink to='/auth/dashboard' className='nav-link'>
                                    Mi Perfil
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className='navbar-nav mb-2 mb-lg-0 '>
                        {sesion ? (
                            <li className='text-sm-left'>
                                <button onClick={logout} className='nav-link text-dark border-0 bg-light'>
                                    Cerrar Sesión
                                </button>
                            </li>
                        ) : (
                            <li className='text-sm-left'>
                                <NavLink to='/login' className='nav-link text-dark'>
                                    Iniciar Sesión
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
