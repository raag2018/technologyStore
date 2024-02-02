import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const AddCourse = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    courseName: "",
    category: "Finanzas",
    description: "",
    content: "",
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const db = getFirestore();
        const coursesCollection = collection(db, "cursos");
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui podremos utilizar el correo y la contraseña del usuario para la autentificacion
      const email = "example@example.com";
      const password = "contraseña";
      await signInWithEmailAndPassword(auth, email, password);

      // Llama a la funcion para los datos del formulario
      await newCourse(formData);
      console.log("Datos enviados", formData);

      
    } catch (error) {
      console.error(error);
    }
  };

  const newCourse = async (data) => {
    try {
      const db = getFirestore();
      await addDoc(collection(db, "cursos"), data);

      
      const updatedCoursesSnapshot = await getDocs(collection(db, "cursos"));
      const updatedCoursesData = updatedCoursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(updatedCoursesData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del curso:
        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Categoría:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Descripción:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Contenido:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Guardar curso</button>
      
      {/* Se renderiza */}
      <ul>
        {courses.map((course) => (
          <div className="card w-50 mx-auto m-5" key={course.id}>
            <div className="card-body">
              <h5 className="card-title text-center">
                {course.courseName} {course.category} {course.content} {course.description}
              </h5>
            </div>
          </div>
        ))}
      </ul>
    </form>
  );
};
