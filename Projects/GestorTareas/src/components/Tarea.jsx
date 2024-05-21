import { FaTrashAlt } from "react-icons/fa";
import PropTypes from 'prop-types';

//Recurso : https://www.freecodecamp.org/espanol/news/como-usar-iconos-svg-en-react-y-font-awesome/

export function Tarea(props) {
const {tarea, completarTarea,eliminarTarea} = props;

  return (
    <div
      className={`tasca ${tarea.completada ? 'tascaCompletada' : 'tascaIncompletada'}`}
      onClick={() => completarTarea(tarea.id)}
    >
      <span>{tarea.text}</span>
    <FaTrashAlt className="trash"         onClick={(e) => {
        //Realmente no sería necesario es solo como precaución
          e.stopPropagation(); // Evitar que el click en el botón llame a completarTasca debido al burbujeo en la propagación de eventos
          eliminarTarea(tarea.id);
        }}
    />
    </div>
  );
}

/*Importante definir esto o no me detecta las props. EsLint la herramienta de análisis de estático de
código ayuda a identificar y corregir problemas en código JavaScript y React.estar configurado para 
requerir que todas las props utilizadas en un componente sean validadas con propTypes */
Tarea.propTypes = {
    tarea: PropTypes.object.isRequired,
    completarTarea: PropTypes.func.isRequired,
    eliminarTarea: PropTypes.func.isRequired,
  };