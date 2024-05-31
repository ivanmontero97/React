import { useState } from 'react';
import { db } from '../config/config.js';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "../styles/Shared.css"
import "../styles/MoviesAdd.css"

export function MoviesAdd() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState(1);
    const [year, setYear] = useState('');
    const [duration, setDuration] = useState('');
    const [movieAdded, setMovieAdded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'movies'), {
                title,
                description,
                director,
                image,
                rating: Number(rating),
                year: Number(year),
                duration: Number(duration)
            });
            console.log("Document written with ID: ", docRef.id);
            // Reset form and set movieAdded to true
            setTitle('');
            setDescription('');
            setDirector('');
            setImage('');
            setRating(1);
            setYear('');
            setDuration('');
            setMovieAdded(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className='card'>
            {movieAdded ? (
                <div className="movieAdded">
                    <p className='success'>¡Has añadido una película a tu lista!</p>
                    <Link to="/movies/add" onClick={() => setMovieAdded(false)}>Añadir otra película</Link>
                    <Link to="/indexMenu">Ir al menú index</Link>
                </div>
            ) : (
                <>
                    <h2>Añadir Película</h2>
                    <form id="addMoviesForm" onSubmit={handleSubmit}>
                        <div className='validationInput'>
                            <label>Título:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className='validationInput'>
                            <label>Descripción:</label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div className='validationInput'>
                            <label>Dirección:</label>
                            <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} required />
                        </div>
                        <div className='validationInput'>
                            <label>Imagen (URL):</label>
                            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} required />
                        </div>
                        <div className='validationInput'>
                            <label>Nota (1-5):</label>
                            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
                        </div>
                        <div className='validationInput'>
                            <label>Año:</label>
                            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
                        </div>
                        <div className='validationInput'>
                            <label >Duración (min):</label>
                            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                        </div>
                        <button type="submit">Añadir Película</button>
                    </form>
                </>
            )}
        </div>
    );
}
