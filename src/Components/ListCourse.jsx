import { useState, useEffect } from "react"
import { app } from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
const ListCourse = (props) => {
    const coach = props
    const [courses, setCourses] = useState([])
    const db = getFirestore(app)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const dbCourses = collection(db, 'cursos')
                const listCourses = await getDocs(dbCourses)
                const coursesData = listCourses.docs.map(doc => doc.data())
                // Filtrar los cursos por el tipo de coach
                const filteredCourses = coach
                    ? coursesData.filter(course => course.Couch === coach.coach)
                    : coursesData
                setCourses(filteredCourses)
            } catch (error) {
                console.error("Error al obtener datos:", error)
            }
        }
        fetchCourses()
    }, [db, coach]);
    return (
        <div className="col-sm-6 bg-light rounded border border-dark ">
            <h3 className="">Lista de cursos</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col" className="bg-secondary text-white">Curso</th>
                        <th scope="col" className="bg-secondary text-white">Actualizar</th>
                        <th scope="col" className="bg-secondary text-white">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <tr key={index} >
                                <td>{course.CourseName}</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td rowSpan={3}>Sin datos obtenidos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default ListCourse