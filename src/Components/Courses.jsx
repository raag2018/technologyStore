import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { app } from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  const db = getFirestore(app)

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

  return (
    <div className="container row">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <div key={index} className='col-sm-6 col-lg-4 my-2 mb-3'>
            <div className="bg-primary card mb- border-info ">
              <img src={course.ImageCurse} className="card-img-top p-1" alt="imagen de course" width={200} height={200}/>
              <div className="card-body text-white">
                <h5 className="card-title">Información</h5>
                <p className="card-text">{course.CourseName}</p>
                <button onClick={() => navigate(`/course/${course.CourseName}`, {state: {key: `${course.CourseName}`}})} className="btn btn-success">Ver curso</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='col-sm-12 my-2 mb-3'>
          <label className='text-white mt-4'> Sin registros</label>
        </div>
      )}
    </div>
  )
}

export default Courses