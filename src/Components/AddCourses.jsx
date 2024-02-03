import { useState } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { app } from '../firebase'
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite'
import { nameValidation, imgValidation, descriptionValidation, contentValidation } from '../Utils/validations'
const AddCourse = () => {
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const uploadImage = async (data) => {
    const files = data.ImageCurse;
    const arr = new FormData();
    arr.append('file', files[0]);
    arr.append('upload_preset', 'technologyStore');
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyhftwfrw/image/upload",
        {
          method: 'POST',
          body: arr
        }
      );
      const file = await response.json();
      setLoading(false);
      return file.secure_url;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const add = async (data) => {
    try {
      const db = getFirestore(app)
      addCourse(db, data)
      navigate('/')
    } catch (error) {
      setError(error)
    }
    console.log(error)
  }

  const addCourse = async (db, data) => {
    try {
      const imageCurse = await uploadImage(data); // Espera a que se complete la carga de la imagen

      await addDoc(collection(db, "cursos"), {
        CourseName: data.CourseName,
        Category: data.Category,
        Description: data.Description,
        Content: data.Content,
        ImageCurse: imageCurse
      });

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Course container justify-content-center mt-3">
      <div className="row">
        <div className="col-sm-6">
          <h1 className="text-center text-muted">Crear Nuevo Curso</h1>
          <form className='form-group' onSubmit={handleSubmit(add)}>
            <div>
              <label className="m-2 fw-bold">
                Nombre del curso:
              </label>
              <input type="text" name="CourseName" {...register("CourseName", { required: 'Campo obligatorio', pattern: nameValidation })} className="form-control"
                placeholder="Escribe el nombre del curso" />
              {errors.CourseName && <span className="text-danger">{errors.CourseName.message}</span>}
            </div>
            <div>
              <label className="m-2 fw-bold">
                Categoría:
              </label>
              <select name="Category" {...register("Category", { required: 'Campo obligatorio' })} className="form-control">
                <option value="Finanzas">Finanzas</option>
                <option value="Salud">Salud</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Psicología">Psicología</option>
              </select>
              {errors.Category && <span className="text-danger">{errors.Category.message}</span>}
            </div>
            <div>
              <label className="m-2 fw-bold">
                Descripción:
              </label>
              <input type="text" name="Description" {...register("Description", { required: 'Campo obligatorio', pattern: descriptionValidation })} className="form-control"
                placeholder="Escribe la descripcion del curso" />
              {errors.Description && <span className="text-danger">{errors.Description.message}</span>}
            </div>
            <div>
              <label className="m-2 fw-bold">
                Contenido:
              </label>
              <input type="text" name="Content" {...register("Content", { required: 'Campo obligatorio', pattern: contentValidation })} className="form-control"
                placeholder="Escribe el contenido del curso" />
              {errors.Content && <span className="text-danger">{errors.Content.message}</span>}
            </div>
            <div>
              <label className="m-2 fw-bold">
                Imagen del curso:
              </label>
              <input type="file" name="ImageCurse" {...register("ImageCurse", { required: 'Campo obligatorio', pattern: imgValidation })} className="form-control"
                placeholder="Seleccione la imagen del curso" />
              {errors.ImageCurse && <span className="text-danger">{errors.ImageCurse.message}</span>}
            </div>
            <div className='m-2'>
              <button type="submit" className="btn btn-primary">Guardar</button>
              {loading ? <span>Guardando Curso...</span> : ''}
            </div>
          </form>
        </div>
        <div className="col-sm-6">

        </div>
      </div>
    </div>
  );
};
export default AddCourse