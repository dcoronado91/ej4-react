import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'dark'
  )

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  const toggleFavorite = (game) =>
    setFavorites(prev =>
      prev.some(f => f.id === game.id)
        ? prev.filter(f => f.id !== game.id)
        : [...prev, { id: game.id, name: game.name, background_image: game.background_image, rating: game.rating }]
    )

  const isFavorite = (id) => favorites.some(f => f.id === id)

  return (
    <AppContext.Provider value={{ theme, toggleTheme, favorites, toggleFavorite, isFavorite }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
  return ctx
}
