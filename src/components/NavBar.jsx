import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">🎞️ Cine Vault</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/favorites" className="navbar-link">Favorites</Link>
                <Link to="/watchlist" className="navbar-link">Watchlist</Link>
            </div>
        </nav>
    );
}

export default NavBar