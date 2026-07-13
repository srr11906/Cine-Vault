import "../styles/SkeletonCard.css";

function SkeletonCard() {

    return (
        <div className="movie-card">
            <div className="skeleton-poster"></div>
            <div className="movie-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-year"></div>
                <div className="skeleton-overview"></div>
                <div className="skeleton-overview short"></div>
            </div>
        </div>
    );
}

export default SkeletonCard;