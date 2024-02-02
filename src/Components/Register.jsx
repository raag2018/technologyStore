import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { app } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { emailValidation, minPassword, maxPassword, nameValidation, lastNameValidatio } from '../Utils/validations'
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
            const storage = localStorage.getItem('USER_V1')
            if (!storage) {
                const newUser = {
                    nombre: data.nombre,
                    apellido: data.apellido,
                    correo: data.email,
                    rol_usuario: data.rol_usuario
                }
                const initialValue = JSON.stringify(newUser)
                localStorage.setItem('USER_V1', initialValue)
                await createUserWithEmailAndPassword(auth, data.email, data.password)
                const db = getFirestore(app)
                addUser(db, data)
                navigate('/login')
            } else {
                setError("Este usuario ya existe")
            }
        } catch (error) {
            setError('Este usuario ya esta registrado')
        }
    }

    const addUser = async (db, data) => {
        try {
            await addDoc(collection(db, "users"), {
                nombre: data.nombre,
                apellido: data.apellido,
                correo: data.email,
                rol_usuario: data.rol_usuario
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            <div className="card form-width mx-auto m-5">
                <div className="card-body">
                    <h5 className="card-title text-center">
                        Registro de usuario
                    </h5>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="mb-3">
                            <input type="text" name="nombre" {...register("nombre", { required: 'Campo obligatorio', pattern: nameValidation })} className="form-control"
                                placeholder="Escribe tu nombre" />
                            {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                        </div>
                        <div className="mb-3">
                            <input type="text" name="apellido" {...register("apellido", { required: 'Campo obligatorio', pattern: lastNameValidatio })} className="form-control"
                                placeholder="Escribe tu apellido" />
                            {errors.apellido && <span className="text-danger">{errors.apellido.message}</span>}
                        </div>

                        <div className="mb-3">
                            <input type="text" name="email" {...register("email", { required: 'Campo obligatorio', pattern: emailValidation })} className="form-control"
                                placeholder="Escribe tu correo" />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" {...register("password", { required: 'Campo obligatorio', minLength: minPassword, maxLength: maxPassword })} className="form-control"
                                placeholder="Escribe tu contraseña" />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <div className="row m-3 justify-content-center mx-auto">
                            <h5 className="text-center">Selecciona tu tipo de perfil</h5>
                            <div className="col-md-4 col-lg-4 col-sm-4">
                                <label>
                                    <input type="radio" name="rol_usuario" {...register("rol_usuario", { required: 'Selecciona un tipo de perfil' })} selected checked className="card-input-element" value={"Estudiante"} />
                                    <div className="card card-default card-input">
                                        <div className="card-header user-select-none text-center kanit-black"><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/e_colorize:50,co_rgb:2ecc71/v1706596671/book_hxbhh6.png" width={40 + "vw"}></img><br />Estudiante</div>
                                        <div className="card-body user-select-none text-center">
                                            Te permite acceder a los cursos disponibles
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <div className="col-md-4 col-lg-4 col-sm-4">
                                <label>
                                    <input type="radio" name="rol_usuario" {...register("rol_usuario", { required: 'Selecciona un tipo de perfil' })} className="card-input-element" value={"Coach"} />
                                    <div className="card card-default card-input">
                                        <div className="card-header user-select-none text-center kanit-black"><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/e_colorize:50,co_rgb:2ecc71/v1706596124/coach_isdxyh.png" width={40 + "vw"}></img><br />Coach</div>
                                        <div className="card-body user-select-none text-center">
                                            Te permite crear y administrar tus propios cursos en Stadi
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="mb-3 d-grid gap-2">
                            <button type="submit" className="btn btn-success">Crear Cuenta</button>
                        </div>

                        {
                            error && <div className='mb-3 d-grid gap-2 bg-danger p-2'><span className='text-white text-center'> {error}</span></div>
                        }
                        <div className='text-center mx-auto'><NavLink to='/login' className='nav-link'>
                            Ya tienes una cuenta? <b>Inicia Sesion</b>
                        </NavLink></div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Register