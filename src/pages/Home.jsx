import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getGames, getRandomGame } from '../api/rawg'
import GameCard from '../components/GameCard'
import './Home.css'

function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getGames({ pageSize: 8, ordering: '-rating' })
      .then(data => setFeatured(data.results))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleRandom = async () => {
    try {
      const game = await getRandomGame()
      if (game) navigate(`/items/${game.id}`)
    } catch {
      // noop
    }
  }

  return (
    <main className="home">
      <section className="home-hero">
        <h1 className="home-title">🎮 GameBlog</h1>
        <p className="home-subtitle">
          Descubre los mejores videojuegos, guarda tus favoritos y explora el universo gamer.
        </p>
        <div className="home-hero-btns">
          <Link to="/items" className="btn btn-primary">Ver todos los juegos</Link>
          <button className="btn btn-secondary" onClick={handleRandom}>
            🎲 Juego aleatorio
          </button>
        </div>
      </section>

      <section className="home-featured">
        <h2>Mejor valorados</h2>
        {loading && <p className="loading">Cargando juegos...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <div className="games-grid">
            {featured.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
