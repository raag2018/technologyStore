import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from '../firebase'

import AddCourse from '../Components/AddCourses'
import ListCourse from '../Components/ListCourse'
const UserType = () => {
  const [typeUser, setTypeUser] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const auth = getAuth(app)
  const [sesion, setSesion] = useState(false)

  useEffect(() => {
    const authentication =
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const storage = localStorage.getItem("USER_V1");
          const parsedDataUser = JSON.parse(storage);
          setSesion(parsedDataUser.sesion)
          setTypeUser(parsedDataUser.rol_usuario)
          setDataUser(parsedDataUser)
        } else {
          const storage = localStorage.getItem('USER_V1')
          const dataUser = JSON.parse(storage)
          dataUser.sesion = sesion
          localStorage.setItem('USER_V1', JSON.stringify(dataUser))
          navigate('/login')
        }
        setLoading(false)
      })
    return () => {
      authentication()
    }
  }, [auth, navigate, sesion]);
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