import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './GameCard.css'

function GameCard({ game }) {
  const { toggleFavorite, isFavorite } = useApp()
  const favorite = isFavorite(game.id)

  return (
    <article className="game-card">
      <Link to={`/items/${game.id}`} className="game-card-link">
        <div className="game-card-img">
          {game.background_image
            ? <img src={game.background_image} alt={game.name} loading="lazy" />
            : <div className="game-card-no-img"></div>
          }
          <span className="game-card-rating">⭐ {game.rating?.toFixed(1) ?? 'N/A'}</span>
        </div>
        <div className="game-card-body">
          <h3 className="game-card-title">{game.name}</h3>
          {game.genres?.length > 0 && (
            <p className="game-card-genres">
              {game.genres.slice(0, 3).map(g => g.name).join(' · ')}
            </p>
          )}
          {game.released && (
            <p className="game-card-year">
              {new Date(game.released).getFullYear()}
            </p>
          )}
        </div>
      </Link>
      <button
        className={`fav-btn${favorite ? ' fav-btn--active' : ''}`}
        onClick={() => toggleFavorite(game)}
        aria-label={favorite ? `Quitar ${game.name} de favoritos` : `Agregar ${game.name} a favoritos`}
      >
        {favorite ? '❤️' : '🤍'}
      </button>
    </article>
  )
}

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string,
    rating: PropTypes.number,
    released: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default GameCard
