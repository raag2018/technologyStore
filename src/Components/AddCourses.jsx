import { useState } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { app } from '../firebase'
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite'
import { nameValidation } from '../Utils/validations'
export const AddCourse = () => {
  const navigate = useNavigate()
  const [error, setError] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const add = async (data) => {
    try {
      console.log(data)
      const db = getFirestore(app)
      addCourse(db, data)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
    console.log(error);
  }

  const addCourse = async (db, data) => {
    try {
      await addDoc(collection(db, "cursos"), {
        CourseName: data.CourseName,
        Category: data.Category,
        Description: data.Description,
        Content: data.Content
      });
      console.log("se agrego correctamente")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="Course container justify-content-center mt-3">
      <h1 className="text-center text-muted">Crear Nuevo Curso</h1>
      <form onSubmit={handleSubmit(add)}>
        <label className="m-2">
          Nombre del curso:
          <input type="text" name="CourseName" {...register("CourseName", { required: 'Campo obligatorio', pattern: nameValidation })} className="form-control"
            placeholder="Escribe el nombre del curso" />
          {errors.CourseName && <span className="text-danger">{errors.CourseName.message}</span>}
        </label>
        <br />
        <label className="m-2">
          Categoría:
          <select name="Category" {...register("Category", { required: 'Campo obligatorio' })} className="form-control">
            <option value="Finanzas">Finanzas</option>
            <option value="Salud">Salud</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Psicología">Psicología</option>
          </select>
          {errors.Category && <span className="text-danger">{errors.Category.message}</span>}
        </label>
        <br />
        <label className="m-2">
          Descripción:
          <input type="text" name="Description" {...register("Description", { required: 'Campo obligatorio', pattern: nameValidation })} className="form-control"
            placeholder="Escribe la descripcion del curso" />
          {errors.Description && <span className="text-danger">{errors.Description.message}</span>}
        </label>
        <br />
        <label className="m-2">
          Contenido:

          <input type="text" name="Content" {...register("Content", { required: 'Campo obligatorio', pattern: nameValidation })} className="form-control"
            placeholder="Escribe el contenido del curso" />
          {errors.Content && <span className="text-danger">{errors.Content.message}</span>}
        </label>
        <br />
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};
