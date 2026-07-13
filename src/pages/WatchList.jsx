import MovieCard from "../components/MovieCard";
import "../styles/WatchList.css";
import { useWatchList } from "../context/WatchListContext";

function WatchList(){

const { watchList } = useWatchList();

    if(watchList.length === 0){
        return(
            <div className="watchList-empty">
                <h2>📋</h2>
                <h3>Your Watchlist is Empty</h3>
                <p>Add movies to your watchlist and they'll appear here</p>
            </div>
        );
    }
    return(
        <div className="movies-grid">
            {watchList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
export default WatchList