import PropTypes from 'prop-types';
import "../styles/Shared.css"
import "../styles/MoviesCard.css"

export function MovieCard({title,imagen,rate,direction}){

    return (
        <>
            <div className="movieCard">
                <h4>{title}</h4>
                <img className="img-peli" src={imagen} alt={"pelicula" + {title}}></img>
                <p>
                    <span><strong>Puntuación :</strong>{rate} </span>
                    <span><strong>Dirección :</strong>{direction} </span>
                </p>
            </div>
        </>
    )

}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired
};
