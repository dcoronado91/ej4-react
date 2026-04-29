import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getGameById, getGameScreenshots } from '../api/rawg'
import { useApp } from '../context/AppContext'
import './GameDetail.css'

function GameDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useApp()

  const [game, setGame] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([getGameById(id), getGameScreenshots(id)])
      .then(([gameData, ssData]) => {
        setGame(gameData)
        setScreenshots(ssData.results ?? [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <main className="detail-state"><p className="loading">Cargando juego...</p></main>
  if (error) return (
    <main className="detail-state">
      <p className="error">Error: {error}</p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Volver</button>
    </main>
  )
  if (!game) return null

  const favorite = isFavorite(game.id)

  return (
    <main className="game-detail">
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${game.background_image})` }}
      >
        <div className="detail-hero-overlay">
          <button className="btn btn-secondary btn-back" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <h1 className="detail-title">{game.name}</h1>
          <div className="detail-badges">
            {game.rating > 0 && <span className="badge">⭐ {game.rating.toFixed(1)}</span>}
            {game.metacritic && <span className="badge badge--green">Metacritic {game.metacritic}</span>}
            {game.released && <span className="badge">{new Date(game.released).getFullYear()}</span>}
          </div>
          <button
            className={`btn ${favorite ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => toggleFavorite(game)}
          >
            {favorite ? '❤️ En favoritos' : '🤍 Agregar a favoritos'}
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-info">
          {game.description_raw && (
            <section className="detail-section">
              <h2>Descripción</h2>
              <p>{game.description_raw.slice(0, 800)}{game.description_raw.length > 800 ? '...' : ''}</p>
            </section>
          )}

          <section className="detail-section">
            <h2>Información</h2>
            <dl className="detail-dl">
              {game.genres?.length > 0 && (
                <><dt>Géneros</dt><dd>{game.genres.map(g => g.name).join(', ')}</dd></>
              )}
              {game.platforms?.length > 0 && (
                <><dt>Plataformas</dt><dd>{game.platforms.map(p => p.platform.name).join(', ')}</dd></>
              )}
              {game.developers?.length > 0 && (
                <><dt>Desarrollador</dt><dd>{game.developers.map(d => d.name).join(', ')}</dd></>
              )}
              {game.publishers?.length > 0 && (
                <><dt>Publisher</dt><dd>{game.publishers.map(p => p.name).join(', ')}</dd></>
              )}
              {game.website && (
                <><dt>Sitio web</dt><dd><a href={game.website} target="_blank" rel="noopener noreferrer">{game.website}</a></dd></>
              )}
            </dl>
          </section>
        </div>

        {screenshots.length > 0 && (
          <section className="detail-screenshots">
            <h2>Screenshots</h2>
            <div className="screenshots-grid">
              {screenshots.slice(0, 6).map(ss => (
                <img key={ss.id} src={ss.image} alt="Screenshot del juego" loading="lazy" />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default GameDetail
