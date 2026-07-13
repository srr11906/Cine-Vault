import MovieCard from "../components/MovieCard";
import "../styles/Favorites.css";
import { useFavorites } from "../context/FavoritesContext";

function Favorites(){

const { favorites } = useFavorites();

    if(favorites.length === 0){
        return(
            <div className="favorites-empty">
                <h2>❤️</h2>
                <h3>No Favorites Yet</h3>
                <p>Start exploring and tap 🤍 to save your favorite movies</p>
            </div>
        );
    }

    async function shareFavorites() {
        if (favorites.length === 0) {
            alert("No favorite movies to share.");
            return;
        }
        const text = `🎬 My Favorite Movies\n\n${favorites.map(
            (movie, index) =>
                `${index + 1}. ${movie.title} (${movie.release_date?.split("-")[0]}) ⭐ ${movie.vote_average.toFixed(1)}`
        )
        .join("\n")}`;

        try{
            if (navigator.share) {
                await navigator.share({
                    title: "My Favorite Movies",
                    text: text
                });
            } 
            else{
                await navigator.clipboard.writeText(text);
                alert("Favorites copied to clipboard!");
            }
        } 
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <button
                className="share-btn"
                onClick={shareFavorites}
            >
                📤 Share Favorites
            </button>
        </>
    );
}
export default Favorites