import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGames, getRandomGame } from '../api/rawg'
import GameCard from '../components/GameCard'
import SearchBar from '../components/SearchBar'
import { useApp } from '../context/AppContext'
import './GameList.css'

const ORDERINGS = [
  { value: '-rating', label: 'Mejor valorados' },
  { value: '-released', label: 'Más recientes' },
  { value: 'name', label: 'Nombre (A-Z)' },
  { value: '-metacritic', label: 'Metacritic' },
]

function GameList() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [ordering, setOrdering] = useState('-rating')
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [showFavs, setShowFavs] = useState(false)
  const { favorites } = useApp()
  const navigate = useNavigate()

  const fetchGames = useCallback(() => {
    setLoading(true)
    setError(null)
    getGames({ search, page, ordering })
      .then(data => {
        setGames(prev => page === 1 ? data.results : [...prev, ...data.results])
        setHasNext(!!data.next)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [search, page, ordering])

  useEffect(() => {
    setPage(1)
    setGames([])
  }, [search, ordering])

  useEffect(() => {
    if (!showFavs) fetchGames()
  }, [fetchGames, showFavs])

  const handleRandom = async () => {
    try {
      const game = await getRandomGame()
      if (game) navigate(`/items/${game.id}`)
    } catch {
      // noop
    }
  }

  const handleSearchChange = (val) => {
    setSearch(val)
    setShowFavs(false)
  }

  const displayedGames = showFavs ? favorites : games

  return (
    <main className="game-list">
      <div className="game-list-header">
        <h1>Videojuegos</h1>
        <button className="btn btn-secondary" onClick={handleRandom}>
          🎲 Aleatorio
        </button>
      </div>

      <div className="game-list-controls">
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          onClear={() => { setSearch(''); setShowFavs(false) }}
          placeholder="Buscar videojuego..."
        />
        <select
          className="ordering-select"
          value={ordering}
          onChange={e => setOrdering(e.target.value)}
        >
          {ORDERINGS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button
          className={`btn ${showFavs ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setShowFavs(f => !f)}
        >
          ❤️ Favoritos {favorites.length > 0 && `(${favorites.length})`}
        </button>
      </div>

      {loading && page === 1 && <p className="loading">Cargando juegos...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && displayedGames.length === 0 && (
        <p className="empty">
          {showFavs ? 'No tenés juegos favoritos aún.' : 'No se encontraron juegos.'}
        </p>
      )}

      <div className="games-grid">
        {displayedGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {!showFavs && hasNext && (
        <div className="load-more-wrap">
          <button
            className="btn btn-primary"
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar más'}
          </button>
        </div>
      )}
    </main>
  )
}

export default GameList
