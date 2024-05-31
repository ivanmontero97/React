import { useState,useEffect } from 'react';
import { Card } from './Card.jsx';
import { db } from '../config/config.js';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../styles/Shared.css"
import "../styles/MoviesList.css"



export function MoviesList(){
    const[moviesList, setMovieList] = useState([])

    const fetchMovies = async () => {
        const query = await getDocs(collection(db,'movies'));
        let movies=[];

        query.forEach((movie)=>{
            movies.push({id:movie.id,...movie.data() })
        });
        setMovieList(movies);
    }

    useEffect(()=>{
        fetchMovies();
    }, []); // Este array vacío indica que el efecto se ejecutará solo una vez, al montar el componente

    return(
        <>
        <div className='card'>
            <h1>Llista de pelicules</h1>
            <div className="listado-pelis">
                {moviesList
                    .map((movie) => (
                        <Card
                            key={movie.id}
                            img={movie.image}
                            title={movie.title}
                            rate={movie.rate}
                            description={movie.description}
                        />
                    ))}
            </div>

            <Link to="/">
                <button>
                    Volver
                </button>
            </Link>
        </div>
        </>
    )
}