import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Navbar.css'

function Navbar() {
  const { theme, toggleTheme, favorites } = useApp()

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        🎮 <span>GameBlog</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Inicio
        </NavLink>
        <NavLink to="/items" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Juegos
        </NavLink>
      </nav>

      <div className="navbar-actions">
        {favorites.length > 0 && (
          <span className="fav-count">❤️ {favorites.length}</span>
        )}
        <button className="theme-btn" onClick={toggleTheme} title="Cambiar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  // consume contexto internamente, sin props externas
}

export default Navbar
