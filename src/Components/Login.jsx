//TODO: Añadir funcionalidad que verifique el tipo de usuario para permitir accesos a pagina de creacion de cursos y storefront de cursos

import { useForm } from 'react-hook-form'
import { useState } from 'react'
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
            const response = await signInWithEmailAndPassword(auth, data.email, data.password)
            navigate('/')
            console.log(response)
        } catch (error) {
            setError(error.message.replace('Firebase', ''))
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
                </form>
                {
                    error && <span className='text-danger'> {error}</span>
                }
            </div>
        </div>
        </>
    )
}
export default Login