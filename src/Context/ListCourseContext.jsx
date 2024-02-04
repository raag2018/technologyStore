import { useState, useEffect, createContext, useContext } from "react"
import { app } from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { CorreoContext } from "./correoContext"
export const ListCourseContext = createContext()
 // eslint-disable-next-line react/prop-types
 const ListCourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([])
    const db = getFirestore(app)
    const [coach, setCoach] = useState('')
    const contextCorreo = useContext(CorreoContext)
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const dbCourses = collection(db, 'cursos')
                const listCourses = await getDocs(dbCourses)
                const coursesData = listCourses.docs.map(doc => doc.data())
                const storage = localStorage.getItem(`${contextCorreo.correo}`)
                const dataUser = JSON.parse(storage)
                if(storage){
                    setCoach(`${dataUser.nombre} ${dataUser.apellido}`)
                    // Filtrar los cursos por el tipo de coach
                    const filteredCourses = coach
                        ? coursesData.filter(course => course.Couch === coach)
                        : coursesData
                    setCourses(filteredCourses)
                }
            } catch (error) {
                console.error("Error al obtener datos:", error)
            }
        }
        fetchCourses()
    }, [db, coach, contextCorreo])
    return (
        <ListCourseContext.Provider value={{
            courses, setCourses
        }}>
            {children}
        </ListCourseContext.Provider>
    )
}
export default ListCourseProvider