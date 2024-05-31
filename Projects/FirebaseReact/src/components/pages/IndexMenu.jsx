import "../styles/Shared.css"
import { Card } from "./Card"
import "../styles/IndexMenu.css"

export function IndexMenu(){
 return (
    <>
        <div id="containerIndex">
            <Card img='/src/components/img/addMovie.png' tittle="Añadir peliculas" text="Pulsa aquí para añadir nuevas peliculas" link="/movies/add"></Card>
            <Card img='/src/components/img/listMovies.png' tittle="Lista de peliculas" text="Ver tu colección de peliculas" link="/movies/list"></Card>
        </div>
    </>
 )
}