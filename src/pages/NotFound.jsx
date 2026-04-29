import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found">
      <span className="not-found-icon">🕹️</span>
      <h1>404</h1>
      <p>Esta página no existe en ninguna consola.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </main>
  )
}

export default NotFound
