import  { useState } from 'react';
import PropTypes from 'prop-types';

export function FormularioTareas(props) {
  const [textTasca, setTextTasca] = useState('');

  const canviTextTasca = e => {
    setTextTasca(e.target.value);
  };

  const enviarForm = e => {
    e.preventDefault();
    const tascaNova = {
      text: textTasca,
      completada: false
    };
    props.afegirTarea(tascaNova);
    setTextTasca(''); // Limpiar el input después de enviar el formulario
  };

  return (
    <form onSubmit={enviarForm}>
      <input  className="inputForm" type="text" value={textTasca} onChange={canviTextTasca} />
      <button className="buttonForm"  type="submit">Afegir Tasca</button>
    </form>
  );
}
FormularioTareas.propTypes = {
    afegirTarea: PropTypes.func.isRequired, 
  };
  