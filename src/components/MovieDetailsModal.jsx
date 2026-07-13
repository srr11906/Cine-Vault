import { useEffect, useState } from "react";
import "../styles/MovieDetailsModal.css";
import { getMovieDetails } from "../services/api";
import { getMovieTrailer } from "../services/api";

function MovieDetailsModal({ movie, isOpen, onClose }) {

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

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