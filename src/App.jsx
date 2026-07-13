import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import WatchList from './pages/WatchList';

function App() {
  return (
    <div>
      <NavBar/>
      <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/watchlist" element={<WatchList/>}/>
      </Routes>
    </main>
    </div>
  )
}

export default App
