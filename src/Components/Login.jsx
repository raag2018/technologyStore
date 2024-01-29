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
            navigate('/auth/products')
            console.log(response)
        } catch (error) {
            setError(error.message.replace('Firebase', ''))
        }
    }
    return (
        <>
            <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center">
                    Login User
                </h5>
                <form onSubmit={handleSubmit(loginUser)}>
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
                        <button type="submit" className="btn btn-success">SignIn</button>
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