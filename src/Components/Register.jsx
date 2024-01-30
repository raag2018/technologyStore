import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { app } from '../firebase'
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { emailValidation, minPassword, maxPassword, nameValidation, lastNameValidatio } from '../Utils/validations'
import { useNavigate } from 'react-router-dom'
const Register = () => {
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
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const db = getFirestore(app)
            agregarProfile(db, data)
            navigate('/')
            console.log(response)
        } catch (error) {
            setError(error.message.replace('Firebase', ''))
        }
    }
   
    const agregarProfile = async(db, data) => {
        try {
             await addDoc(collection(db, "users"), {
                nombre: data.nombre,
                apellido: data.apellido,
                correo: data.email,
                rol_usuario: data.rol_usuario
            });
            console.log("se agrego correctamente")
        } catch (e) {
            console.log(e.message)
        }
    }


    return (
        <>
            <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center">
                    Register User
                </h5>
                <form onSubmit={handleSubmit(loginUser)}>
                <div className="mb-3">
                        <input type="text" name="nombre" {...register("nombre", { required: 'Name is required', pattern: nameValidation })} className="form-control"
                            placeholder="Type your name" />
                        {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="text" name="apellido" {...register("apellido", { required: 'Lastname is lastname', pattern: lastNameValidatio })} className="form-control"
                            placeholder="Type your lastname" />
                        {errors.apellido && <span className="text-danger">{errors.apellido.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="text" name="rol_usuario" {...register("rol_usuario", { required: 'Rol user' })} className="form-control"
                            placeholder="Type your rol users" />
                        {errors.rol_usuario && <span className="text-danger">{errors.rol_usuario.message}</span>}
                    </div>
                    
                    <div className="mb-3">
                        <input type="text" name="email" {...register("email", { required: 'Email is required', pattern: emailValidation })} className="form-control"
                            placeholder="Type your email" />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" {...register("password", { required: 'Password is required', minLength: minPassword, maxLength: maxPassword })} className="form-control"
                            placeholder="Type your password" />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                    <div className="mb-3 d-grid gap-2">
                        <button type="submit" className="btn btn-success">Create Account</button>
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
export default Register