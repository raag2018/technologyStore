//TODO: Añadir funcionalidad que verifique el tipo de usuario para permitir accesos a pagina de creacion de cursos y storefront de cursos

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { app } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { emailValidation, minPassword, maxPassword } from '../Utils/validations'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const auth = getAuth(app)
    const navigate = useNavigate()
    const [error, setError] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const loginUser = async (data) => {
        try {
            const storage = localStorage.getItem('USER_V1')
            const dataUser = JSON.parse(storage)
            const emailUser = dataUser.email;
            dataUser.sesion = true
            localStorage.setItem('USER_V1', JSON.stringify(dataUser))
            const response = await signInWithEmailAndPassword(auth, data.email, data.password)
            if (!response.user.email && !emailUser) {
                setError("Usted no posee una cuenta")
            } else {
                navigate('/auth/dashboard')
            }
        } catch (error) {
            setError("El usuario y/o contraseña son incorrectos")
        }
    }
    return (
        <>
            <div className="card w-50 mx-auto m-5">
                <div className="card-body">
                    <h5 className="card-title text-center">
                        Login
                    </h5>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="mb-3">
                            <input type="text" name="email" {...register("email", { required: 'Email is required', pattern: emailValidation })} className="form-control"
                                placeholder="Escribe tu correo" />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" {...register("password", { required: 'Password is required', minLength: minPassword, maxLength: maxPassword })} className="form-control"
                                placeholder="Escribe tu contraseña" />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="submit" className="btn btn-success">Iniciar Sesion</button>
                        </div>
                        {
                            error && <div className='mb-3 d-grid gap-2 bg-danger p-2'><span className='text-white text-center'> {error}</span></div>
                        }
                        <div className='text-center mx-auto'><NavLink to='/registrar' className='nav-link'>
                            <b>Crear Cuenta</b>
                        </NavLink></div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login