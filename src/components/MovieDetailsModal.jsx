import { useEffect, useState } from "react";
import "../styles/MovieDetailsModal.css";
import { getMovieDetails } from "../services/api";
import { getMovieTrailer } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import { useWatchList } from "../context/WatchListContext";

function MovieDetailsModal({ movie, isOpen, onClose }) {

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const favorite = movie ? isFavorite(movie.id) : false;

    const { addToWatchList, removeFromWatchList, isInWatchList } = useWatchList();
    const watchlist = movie ? isInWatchList(movie.id) : false;

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

    useEffect(() => {
        if (!movie) return;
        const loadDetails = async () => {
            setLoading(true);
            try{
                const data = await getMovieDetails(movie.id);
                setDetails(data);
            } 
            catch(err){
                console.error(err);
            } 
            finally{
                setLoading(false);
            }
        };
        loadDetails();
    }, [movie]);

    useEffect(() => {
        if(isOpen){
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    async function handleTrailerClick() {
            try{
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

    if (!isOpen || !movie) return null;

    return (

        <div className="modal-overlay" onClick={onClose}>
            <div
                className="movie-modal"
                onClick={(e) => e.stopPropagation()}>
                <button
                    className="close-btn"
                    onClick={onClose}>
                    ✕
                </button>
                {loading ? (
                    <h2>Loading movie...</h2>
                ) : (
                    <>
                        {movie.poster_path ? (
                            <div className="modal-left">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                             />
                            </div>
                            ) : (
                                <div className="no-poster">
                                    🎬
                                    <p>No Poster Available</p>
                                </div>
                            )}

                        <div className="modal-right">

                            <h1>{movie.title}</h1>

                            <p className="rating">
                                ⭐ {movie.vote_average.toFixed(1)}
                            </p>

                            <p>
                                <strong>Release:</strong>{" "}
                                {movie.release_date}
                            </p>

                            <p>
                                <strong>Runtime:</strong>{" "}
                                {details?.runtime} min
                            </p>

                            <p>
                                <strong>Language:</strong>{" "}
                                {movie.original_language.toUpperCase()}
                            </p>

                            <p>
                                <strong>Genres:</strong>{" "}
                                {"[" + details?.genres
                                    ?.map((g) => g.name)
                                    .join("] [") + "]"}
                            </p>

                            <h3>Overview</h3>

                            <p className="overview">
                                {movie.overview}
                            </p>

                            <div className="modal-actions">
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

                            <a className="modal-trailer-btn" onClick={() => {
                                handleTrailerClick();
                                }}>
                                ▶ Play Trailer
                            </a>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MovieDetailsModal;