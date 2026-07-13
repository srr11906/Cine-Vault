import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import { searchMovies, getMovies } from "../services/api";
import MovieDetailsModal from "../components/MovieDetailsModal";

function Home(){

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("te");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const loadMovies = async () => {
        setLoading(true);
        try{
            const data = await getMovies(language, genre, year, 1);

            setMovies(data);
            setPage(1);
            setError(null);
        } 
        catch(err){
            setError("Failed to load movies");
        } 
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, [language, genre, year]);

    const loadMore = async () => {
        const nextPage = page + 1;
        const data = await getMovies(
            language,
            genre,
            year,
            nextPage
        );
        setMovies((prev) => [...prev, ...data]);
        setPage(nextPage);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            const movies = await getMovies(language, genre, year, 1);
            setMovies(movies);
            return;
        }

        const results = await searchMovies(searchQuery);
        setMovies(results);
    };

    function openMovieDetails(movie){
        setSelectedMovie(movie);
        setIsModalOpen(true);
    }

    function closeMovieDetails(){
        setIsModalOpen(false);
        setSelectedMovie(null);
    }

    if (loading) {
        return (
            <div className="movies-grid">
                {Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return(
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input type="text" placeholder="Enter movie name" className="search-input"
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)}} />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <div className="filters">
                <select value={language}
                        onChange={(e) => setLanguage(e.target.value)}>
                    <option value="te">Telugu</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="ml">Malayalam</option>
                    <option value="kn">Kannada</option>
                </select>

                <select value={genre}
                    onChange={(e) => setGenre(e.target.value)}>
                    <option value="">All Genres</option>

                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Science Fiction</option>
                    <option value="53">Thriller</option>
                </select>

                <select value={year}
                        onChange={(e)=>setYear(e.target.value)}>

                <option value="">All Years</option>
                {Array.from({length:30},(_,i)=>{
                const y = new Date().getFullYear()-i;

                return(
                    <option key={y} value={y}>
                        {y}
                    </option>
                );
                })}
                </select>
            </div>

             <div className="movies-grid">
                {movies.length === 0 ? (
                <div className="no-movies">
                    <h2>🔍</h2>
                    <h3>No Movies Found</h3>
                    <p>Try searching for another movie</p>
                </div>
                ) : (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} onMovieClick={openMovieDetails}/>
                    ))
                )}
            </div>

            {movies.length > 0 && (
                <button
                    onClick={loadMore}
                    className="load-more-btn"
                >
                    Load More
                </button>
            )}

            <MovieDetailsModal
                movie={selectedMovie}
                isOpen={isModalOpen}
                onClose={closeMovieDetails}
            />

        </div>
    );
}

export default Home