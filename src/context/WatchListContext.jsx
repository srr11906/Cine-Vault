import { createContext, useContext, useState, useEffect } from "react";

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

export function WatchListProvider({ children }) {
    
    const [watchList, setWatchList] = useState(() => {
        const storedWatchList = localStorage.getItem("watchlist");
        return storedWatchList ? JSON.parse(storedWatchList) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchList)
        );
    }, [watchList]);

    const addToWatchList = (movie) => {
        setWatchList((prev) => {
            if (prev.some((wl) => wl.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    const removeFromWatchList = (movieId) => {
        setWatchList((prev) =>
            prev.filter((movie) => movie.id !== movieId)
        );
    };

    const isInWatchList = (movieId) => {
        return watchList.some((movie) => movie.id === movieId);
    };

    return (
        <WatchListContext.Provider
            value={{
                watchList,
                addToWatchList,
                removeFromWatchList,
                isInWatchList,
            }}
        >
            {children}
        </WatchListContext.Provider>
    );
}