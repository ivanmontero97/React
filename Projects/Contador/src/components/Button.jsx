import PropTypes from 'prop-types';

export function Button ({children, onClick , esClick}) {

    return(
        <>
            <button className={esClick ? 'btnClick' : 'btnReiniciar'} onClick={onClick}>{children}</button>
        </>
    )
}
/*
PropTypes es una herramienta proporcionada por React que permite definir el tipo de datos esperado para cada una de las props 
que recibe un componente, así como si son requeridas o no. Esto es especialmente útil para documentar y validar las props que un 
componente espera recibir, lo que ayuda a prevenir errores y facilita el mantenimiento del código.
*/
Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    esClick: PropTypes.bool.isRequired,
  };
