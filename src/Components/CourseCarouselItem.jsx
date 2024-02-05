import { useState, useEffect } from "react"
import { app } from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

const CourseCarouselItem = () => {
    const [courses, setCourses] = useState([])
    const db = getFirestore(app)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const dbCourses = collection(db, 'cursos')
                const listCourses = await getDocs(dbCourses)
                const coursesData = listCourses.docs.map(doc => doc.data())
                console.log(coursesData)
                setCourses(coursesData)
            } catch (error) {
                console.error("Error al obtener datos:", error)
            }
        }
        fetchCourses()
    }, [db])    
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {courses.length > 0 &&
                    courses.map(( _, index) => (
                        <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                    ))}
            </ol>
            <div className="carousel-inner">
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div  key={index} className={`carousel-item  ${index === 0 ? 'active' : ''}`}>
                            <img src={course.ImageCurse} alt={course.CourseName} style={{"width": '100%'}} height={300}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{course.CourseName}</h5>
                                    <p>{course.Couch}</p>
                                </div>
                        </div>
                    ))
                ) : (
                    <div className='col-sm-12 my-2 mb-3'>
                        <label className='text-white mt-4'> Sin registros</label>
                    </div>
                )}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default CourseCarouselItem