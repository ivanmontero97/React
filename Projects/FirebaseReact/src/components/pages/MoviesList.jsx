import { useState, useEffect } from 'react';
import { MovieCard } from './MovieCard.jsx';
import { db } from '../config/config.js';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../styles/Shared.css";
import "../styles/MoviesList.css";

export function MoviesList() {
    const [moviesList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

    const fetchMovies = async () => {
        const query = await getDocs(collection(db, 'movies'));
        let movies = [];
        query.forEach((movie) => {
            movies.push({ id: movie.id, ...movie.data() });
        });
        setMovieList(movies);
        setIsLoading(false); // Establecer isLoading en false después de cargar los datos
    };

    useEffect(() => {
        fetchMovies();
    }, []); // Este array vacío indica que el efecto se ejecutará solo una vez, al montar el componente

    if (isLoading) {
        return (
            <div className="loading">
                <h2>Cargando...</h2>
            </div>
        );
    }

    return (
        <>
            <div className='cardListMovies'>
                <h1>Lista de peliculas</h1>
                <div className="listado-pelis">
                    {moviesList.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            rate={movie.rating}
                            direction={movie.director}
                            imagen={movie.image}
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
    );
}
