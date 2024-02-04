import { useState, useEffect } from "react"
import  AddCourse  from "../Components/AddCourses"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {app} from '../firebase'
import { useNavigate } from "react-router-dom";
const UserType = () => {
  const [typeUser, setTypeUser] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const auth = getAuth(app)
  const navigate = useNavigate()
  useEffect(() => {
    const authentication = async() => {
      onAuthStateChanged(auth, (user) => {
        if(user){
          const storage = localStorage.getItem("USER_V1");
          const parsedDataUser = JSON.parse(storage);
          if (parsedDataUser && parsedDataUser.rol_usuario) {
            setTypeUser(parsedDataUser.rol_usuario);
            setDataUser(parsedDataUser);
          }
        }else{
          const storage = localStorage.getItem('USER_V1')
          const dataUser = JSON.parse(storage)
          dataUser.sesion = false
          localStorage.setItem('USER_V1', JSON.stringify(dataUser))
          navigate('/login')
        }
      })
    } 
    authentication()
  }, []);
  if(typeUser === 'Estudiante'){

      return (
        <div>
          {typeUser}
        </div>
      );
  }else if(typeUser === 'Coach'){
    return (
        <div>
          <AddCourse coach={`${dataUser.nombre} ${dataUser.apellido}`}/>
        </div>
      );
  }
};

export default UserType;