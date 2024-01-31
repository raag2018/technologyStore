import { useState } from "react";

export const AddCourse = () => {
  const [formData, setFormData] = useState({
    CourseName: '',
    Category: 'Finanzas', // Valor predeterminado
    Description: '',
    Content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puedes hacer algo con los datos del formulario aquí
    console.log('Datos enviados:', formData);
  };

  return (
    <div className="Course">
      <h1>Formulario React</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del curso:
          <input
            type="text"
            name="CourseName"
            value={formData.CourseName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Categoría:
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
          >
            <option value="Finanzas">Finanzas</option>
            <option value="Salud">Salud</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Psicología">Psicología</option>
          </select>
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contenido:
          <input
            type="text"
            name="Content"
            value={formData.Content}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
