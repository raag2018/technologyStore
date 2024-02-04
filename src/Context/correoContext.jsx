import { createContext, useEffect, useState } from 'react'
import { app } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth"
export const CorreoContext = createContext()
// eslint-disable-next-line react/prop-types
const CorreoContextProvider = ({ children }) => {
    const [correo, setCorreo] = useState()
    const auth = getAuth(app)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCorreo(user.email)
            }
        })
        return () => {
            unsubscribe()
        };
    }, [auth])
    return (
        <CorreoContext.Provider value={{
            correo, setCorreo
        }}>
            {children}
        </CorreoContext.Provider>
    )
}
export default CorreoContextProvider