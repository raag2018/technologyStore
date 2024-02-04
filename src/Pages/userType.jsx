import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from '../firebase'
import { CorreoContext } from '../Context/correoContext'
import AddCourse from '../Components/AddCourses'
import ListCourse from '../Components/ListCourse'
const UserType = () => {
  const [typeUser, setTypeUser] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const auth = getAuth(app)
  const [sesion, setSesion] = useState(false)
  const context = useContext(CorreoContext)
  useEffect(() => {
    const authentication =
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const storage = localStorage.getItem(`${context.correo}`);
          const parsedDataUser = JSON.parse(storage);
          setSesion(parsedDataUser.sesion)
          setTypeUser(parsedDataUser.rol_usuario)
          setDataUser(parsedDataUser)
        } else {
          const storage = localStorage.getItem(`${context.correo}`)
          const dataUser = JSON.parse(storage)
          dataUser.sesion = sesion
          localStorage.setItem(`${context.correo}`, JSON.stringify(dataUser))
          navigate('/login')
        }
        setLoading(false)
      })
    return () => {
      authentication()
    }
  }, [auth, navigate, sesion, context]);
  if (typeUser === 'Estudiante') {
    if (loading) { return <h1>Cargando</h1> }
    return (
      <div>
        {typeUser}
      </div>
    );
  } else if (typeUser === 'Coach') {
    if (loading) { return <h1>Cargando</h1> }
    return (

      <div className="Course container justify-content-center mt-3">
        <div className="row">
          <AddCourse coach={`${dataUser.nombre} ${dataUser.apellido}`} />
          <ListCourse />
        </div>
      </div>

    )
  }
}
export default UserType;