import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./styles/index.css";
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { WatchListProvider } from './context/WatchListContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <WatchListProvider>
          <App />
        </WatchListProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
