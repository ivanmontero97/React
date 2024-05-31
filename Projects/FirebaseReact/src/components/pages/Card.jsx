import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import "../styles/Shared.css"
import "../styles/Card.css"

export function Card({tittle, link, img,text}){

    return(
        <>
            <div className="card">
                <h1>{tittle}</h1>
                <img src={img} alt="Imagen" />
                <Link to={link}>{text}</Link>    
            </div>
        
        </>
    )
}

Card.propTypes = {
    tittle: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
