// Claus
const keys = {
    api_key: '3efcc82595f2e7ebbf6e2a1feb53a6c2',
    session_id: '9c4bb38500d19f297160a0db82a099c238f82548',
    account_id: '21283104'
}
var total_pages = 0;
var current_page = 1;
var currentQuery='';

// Agregar un elemento de "loading"
const loadingElement = document.createElement('div');
loadingElement.id = 'loading';
loadingElement.innerHTML = '<img src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif" alt="loading...">';
document.body.appendChild(loadingElement);
loadingElement.style.display = 'none'; // Ocultar inicialmente

let moviesResult = document.getElementById("moviesResult");


async function setFav(id, favBool){
    moviesResult.innerHTML="";
    const url=`https://api.themoviedb.org/3/account/${keys.account_id}/favorite?session_id=${keys.session_id}`
        const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWZjYzgyNTk1ZjJlN2ViYmY2ZTJhMWZlYjUzYTZjMiIsInN1YiI6IjY2NGRiZjM2ZjU3YzIzYTM2MTA2MTMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6fwBt3rBIXKPk0QzZPSdf8onl8WjIEjfvtS05dPIRBc'
        },
        body: JSON.stringify({media_type: 'movie', media_id: id, favorite: favBool})
      };
    try{
        const result = await fetch(url,options);
        const data =await result.json()
        console.log(data);
        console.log(`${id} marked as ${favBool}`)
        showFavs();    
    } catch (error){
        console.log(error)
    }
}

async function showFavs(){
    moviesResult.innerHTML="";
    const url =` https://api.themoviedb.org/3/account/${keys.account_id}/favorite/movies?language=es&page=1&session_id=${keys.session_id}&sort_by=created_at.asc`
    const options= {
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWZjYzgyNTk1ZjJlN2ViYmY2ZTJhMWZlYjUzYTZjMiIsInN1YiI6IjY2NGRiZjM2ZjU3YzIzYTM2MTA2MTMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6fwBt3rBIXKPk0QzZPSdf8onl8WjIEjfvtS05dPIRBc'
        }
    };
    try{
        const response = await fetch(url,options)
        const data = await response.json()
        data.results.forEach(movie => printMovie(movie,true,false));    
    } catch(error){
        console.log(error)
    }

}

//Es la misma funcion que ShowFavs pero devuelve los id en vez de pintar las peliculas de favoritos.
async function getFavorites() {
    const url = `https://api.themoviedb.org/3/account/${keys.account_id}/favorite/movies?language=es&session_id=${keys.session_id}&sort_by=created_at.asc`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWZjYzgyNTk1ZjJlN2ViYmY2ZTJhMWZlYjUzYTZjMiIsInN1YiI6IjY2NGRiZjM2ZjU3YzIzYTM2MTA2MTMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6fwBt3rBIXKPk0QzZPSdf8onl8WjIEjfvtS05dPIRBc'
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.results.map(movie => movie.id);
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function searchMovies(query, page = 1) {
    try {
         // Mostrar el elemento de "loading"
         loadingElement.style.display = 'block';
        if (page === 1) {
            // Limpiar el contenido HTML solo si es la primera página
            moviesResult.innerHTML = "";
        }         
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${current_page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWZjYzgyNTk1ZjJlN2ViYmY2ZTJhMWZlYjUzYTZjMiIsInN1YiI6IjY2NGRiZjM2ZjU3YzIzYTM2MTA2MTMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6fwBt3rBIXKPk0QzZPSdf8onl8WjIEjfvtS05dPIRBc'
            }
        };
    
        //Resolvemos las promises de fetch y getFavorites
        const [response, favorites] = await Promise.all([fetch(url, options), getFavorites()]);
        const data = await response.json();

        total_pages = data.total_pages; // Actualizar el total de páginas

        //Comparamos si los resultados de response contienen el id de mis peliculas añadidas a favoritos (array favorites de ids)
        data.results.forEach(movie => {
            const isFavorite = favorites.includes(movie.id);
            printMovie(movie, isFavorite, false);
        });
        // Ocultar el elemento de "loading"
        loadingElement.style.display = 'none';
        clearInput();
        removeActive();
    } catch (error) {
        console.log(error);
        // Ocultar el elemento de "loading"
        loadingElement.style.display = 'none';
    }
}



/* FUNCIONS D'INTERACCIÓ AMB EL DOM */

// Click Favorites
document.getElementById("showFavs").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    showFavs();
})

// Click Watchlist
document.getElementById("showWatch").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    //showWatch();
})

/* Funcions per detectar la cerca d'una pel·lícula */
// Intro a l'input
document.getElementById("search").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch(this.value);
    
    }

});

document.querySelector(".searchBar i").addEventListener("click", () => {
    handleSearch(document.getElementById("search").value);
});
// Click a la lupa
document.querySelector(".searchBar i").addEventListener("click", ()=>searchMovies(document.getElementById("search").value));

// Netejar l'input
document.getElementById("search").addEventListener('click', ()=>clearInput()); 

function clearInput(){
    document.getElementById("search").value="";
}

// Elimina l'atribut active del menú
function removeActive(){
    document.querySelectorAll(".menu li a").forEach(el=>el.classList.remove("active"));
}

/* Funció per printar les pel·lícules */
function printMovie(movie, fav, watch){

    let favIcon = fav ? 'iconActive' : 'iconNoActive';
    let watchIcon = watch ? 'iconActive' : 'iconNoActive';

    moviesResult.innerHTML += `<div class="movie">
                                    <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                                    <h3>${movie.original_title}</h3>
                                    <div class="buttons">
                                        <a id="fav" onClick="setFav(${movie.id}, ${!fav})"><i class="fa-solid fa-heart ${favIcon}"></i></a>
                                        <a id="watch" onClick="setWatch(${movie.id}, ${!watch})"><i class="fa-solid fa-eye ${watchIcon}"></i></a>
                                    </div>`;
}

// Detectar el scroll
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && current_page < total_pages) {
        // Incrementar la página actual
        current_page++;
        
        // Realizar la búsqueda de la siguiente página
        searchMovies(currentQuery, current_page);
    }
});

// Función para manejar la búsqueda inicial
function handleSearch(query) {
    currentQuery = query;
    current_page = 1; // Reiniciar a la primera página
    searchMovies(query, current_page);
}

