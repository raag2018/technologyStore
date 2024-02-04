import { useContext} from "react"
import { ListCourseContext } from '../Context/ListCourseContext'
const ListCourse = () => {
    const context = useContext(ListCourseContext)

    return (
        <div className="col-sm-6 bg-light rounded border border-dark ">
            <h3 className="">Lista de cursos</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col" className="bg-secondary text-white">Curso</th>
                        <th scope="col" className="bg-secondary text-white">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {context.courses.length > 0 ? (
                        context.courses.map((course, index) => (
                            <tr key={index} >
                                <td>{course.CourseName}</td>
                                <td></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td rowSpan={2}>Sin datos obtenidos</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        </div>
    )
}
export default ListCourse