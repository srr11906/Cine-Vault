import "../styles/MovieCard.css";
import { useFavorites } from "../context/FavoritesContext";
import { useWatchList } from "../context/WatchListContext";
import { getMovieTrailer } from "../services/api";

function MovieCard({movie, onMovieClick}){
    
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    const { addToWatchList, removeFromWatchList, isInWatchList } = useWatchList();
    const watchlist = isInWatchList(movie.id);

    function onFavoriteClick() {
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    function onWatchListClick() {
        if (isInWatchList(movie.id)) {
            removeFromWatchList(movie.id);
        } else {
            addToWatchList(movie);
        }
    }

    async function handleTrailerClick() {
        try {
            const trailerUrl = await getMovieTrailer(movie.id);
            if(trailerUrl){
                window.open(trailerUrl, "_blank");
            } 
            else{
                alert("Trailer not available");
            }
        } 
        catch(error){
            alert("Failed to load trailer");
        }
    }

    return(
        <div className="movie-card" onClick={() => {onMovieClick(movie)}} >
            <div className="movie-poster">
                {movie.poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            ) : (
                <div className="no-poster">
                    🎬
                    <p>No Poster Available</p>
                </div>
            )}
                <div className="movie-overlay">
                    <div className="btn-container">
                        <button title={favorite? "Remove from Favorites" : "Add to Favorites"} className="fav-wl-btn" onClick={(e) => {
                            e.stopPropagation();
                            onFavoriteClick();
                        }}>
                            {favorite ? "❤️" : "🤍"}
                        </button>
                        <button title={watchlist ? "Remove from WatchList" : "Add to WatchList"} className="fav-wl-btn" onClick={(e) => {
                            e.stopPropagation();
                            onWatchListClick();
                        }}>
                            {watchlist ? "☑️" : "📋"}
                        </button>
                    </div>
                    <div className="overlay-content">
                        <h3>{movie.title}</h3>

                        <p className="movie-year">
                            {movie.release_date?.split("-")[0]}
                        </p>

                        <p className="movie-overview">
                            {movie.overview || "No overview available."}
                        </p>

                        <a className="trailer-btn" onClick={(e) => {
                            e.stopPropagation();
                            handleTrailerClick();
                        }}>
                            ▶ Play Trailer
                        </a>

                    </div>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard