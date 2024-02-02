import { useState, useEffect } from "react";
import  AddCourse  from "../Components/AddCourses";

const UserType = () => {
  const [typeUser, setTypeUser] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem("USER_V1");
    const dataUser = JSON.parse(storage);

    if (dataUser && dataUser.rol_usuario) {
      setTypeUser(dataUser.rol_usuario);
    }
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
          <AddCourse/>
        </div>
      );
  }
};

export default UserType;