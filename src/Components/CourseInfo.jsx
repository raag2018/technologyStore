import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import { app } from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

const CourseInfo = () => {
        const [courses, setCourses] = useState([])
        const [course, setCourse] = useState(null)

        const db = getFirestore(app)
        const location = useLocation();
        console.log(location);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const dbCourses = collection(db, 'cursos')
                const listCourses = await getDocs(dbCourses)
                const coursesData = listCourses.docs.map(doc => doc.data())
                setCourses(coursesData)
                console.log(coursesData)
            } catch (error) {
                console.error("Error al obtener datos:", error)
            }
        }
        fetchCourses()
    }, [db])

    useEffect(() => {
        const selectedCourse = courses.find(c => c.CourseName === location.state.key)
        setCourse(selectedCourse)
    }, [courses, location.state.key])

        return (
                course ? (
                    <>
                        <div className='col-sm-6 col-lg-4 my-2 mb-3 border border-dark rounded mx-auto'>
                        <div className="text-dark card">
                          <img src={course.ImageCurse} className="card-img-top p-1 img-fluid" alt="imagen de course"/>
                          <div className="card-body text-dark">
                            <h1 className="card-title text-center">{course.CourseName}</h1>
                            <hr/>
                            <p className="card-text">Categoria: {course.Category}</p>
                            <p className="card-text">Coach: {course.Coach}</p>
                            <p className="card-text">Descripcion: {course.Description}</p>
                          </div>
                        </div>
                      </div>
                    </>
                ) : (
                        <div>
                                <h1>Cargando...</h1>
                        </div>
                )
        )
}

export default CourseInfo;