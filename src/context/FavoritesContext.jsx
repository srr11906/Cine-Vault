import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
    
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            if (prev.some((fav) => fav.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) =>
            prev.filter((movie) => movie.id !== movieId)
        );
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}