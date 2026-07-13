const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (
        language,
        genre = "",
        year = "",
        page = 1
    ) => {

        let url =
            `${BASE_URL}/discover/movie?api_key=${API_KEY}` +
            `&with_original_language=${language}` +
            `&sort_by=popularity.desc` +
            `&page=${page}`;

        if(genre){
            url += `&with_genres=${genre}`;
        }

        if(year){
            url += `&primary_release_year=${year}`;
        }

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        return data.results;
    };
    
    export const searchMovies = async (query) => {

        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        if(!response.ok){
            throw new Error("Failed to search movies");
        }

        const data = await response.json();
        return data.results;
    };

    export const getMovieTrailer = async (movieId) => {

        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch trailer");
        }

        const data = await response.json();
        console.log(data);

        const trailer = data.results.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        );

        if (!trailer) {
            return null;
        }

        return `https://www.youtube.com/watch?v=${trailer.key}`;
};

export const getMovieDetails = async (movieId) => {

    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );

    if (!response.ok){
        throw new Error("Failed to fetch movie details");
    }

    return await response.json();

};
