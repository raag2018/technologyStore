import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { app } from '../firebase';
import { emailValidation, minPassword, maxPassword } from '../Utils/validations';
import { useNavigate } from 'react-router-dom';
import { CorreoContext } from '../Context/correoContext';
import { useForm } from 'react-hook-form'; // Añade esta línea para importar 'useForm'

const Login = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { correo } = useContext(CorreoContext);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(); // Inicializa useForm

    const loginUser = async (data) => {
        try {
            const response = await signInWithEmailAndPassword(auth, data.email, data.password);
            if (response.user.email) {
                const storage = localStorage.getItem(`${correo}`);
                const dataUser = storage ? JSON.parse(storage) : {};
                dataUser.email = data.email;
                dataUser.sesion = true;
                localStorage.setItem(`${correo}`, JSON.stringify(dataUser));
                navigate('/auth/dashboard');
            } else {
                setError('Usted no posee una cuenta');
            }
        } catch (error) {
            setError('El usuario y/o contraseña son incorrectos');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem(`${correo}`);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
            <div className="card w-50 mx-auto m-5">
                <div className="card-body">
                    <h5 className="card-title text-center">Login</h5>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="email"
                                {...register("email", { required: 'Email is required', pattern: emailValidation })}
                                className="form-control"
                                placeholder="Escribe tu correo"
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                name="password"
                                {...register("password", { required: 'Password is required', minLength: minPassword, maxLength: maxPassword })}
                                className="form-control"
                                placeholder="Escribe tu contraseña"
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="submit" className="btn btn-success">Iniciar Sesion</button>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                        {error && <div className='mb-3 d-grid gap-2 bg-danger p-2'><span className='text-white text-center'> {error}</span></div>}
                        <div className='text-center mx-auto'><NavLink to='/registrar' className='nav-link'><b>Crear Cuenta</b></NavLink></div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
