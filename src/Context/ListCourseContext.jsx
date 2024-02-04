import { useState, useEffect, createContext } from "react"
import { app } from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
export const ListCourseContext = createContext()
 // eslint-disable-next-line react/prop-types
 const ListCourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([])
    const db = getFirestore(app)
    const [coach, setCoach] = useState('')
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const dbCourses = collection(db, 'cursos')
                const listCourses = await getDocs(dbCourses)
                const coursesData = listCourses.docs.map(doc => doc.data())
                const storage = localStorage.getItem('USER_V1')
                const dataUser = JSON.parse(storage)
                setCoach(`${dataUser.nombre} ${dataUser.apellido}`)
                // Filtrar los cursos por el tipo de coach
                const filteredCourses = coach
                    ? coursesData.filter(course => course.Couch === coach)
                    : coursesData
                setCourses(filteredCourses)
            } catch (error) {
                console.error("Error al obtener datos:", error)
            }
        }
        fetchCourses()
    }, [db, coach])
    return (
        <ListCourseContext.Provider value={{
            courses, setCourses
        }}>
            {children}
        </ListCourseContext.Provider>
    )
}
export default ListCourseProvider