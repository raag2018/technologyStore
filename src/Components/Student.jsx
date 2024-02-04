import { useContext } from "react";
import { CorreoContext } from "../Context/correoContext";
import CourseCarouselItem from "./CourseCarouselItem";

const Student = () => {
    const context = useContext(CorreoContext);
    const storage = localStorage.getItem(context.correo);
    const data = JSON.parse(storage);

    return (
        <div className="container">
            <div className="p-4 p-md-5 text-center text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h3 className="fst-italic">Estudiante: {data.nombre} {data.apellido}</h3>
                </div>
            </div>
            <CourseCarouselItem />
        </div>
    )
};

export default Student;
