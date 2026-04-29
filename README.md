# GameBlog — Mini-blog de Videojuegos

Mini-blog de videojuegos construido con **Vite + React + React Router v6** como ejercicio universitario.

## Nivel declarado: Senior (100 pts)

| Nivel | Requerimientos cumplidos |
|-------|--------------------------|
| **Junior** | Proyecto con Vite, 3 rutas, datos en capa separada, `useParams`, `<Link>`, README |
| **Mid** | + Página 404, búsqueda/filtro, botón aleatorio con `useNavigate`, componentes con PropTypes |
| **Senior** | + Context API (tema + favoritos), 3 componentes con PropTypes, consumo de API externa (RAWG) |

---

## Stack tecnológico

- [Vite 8](https://vite.dev/) — bundler y dev server
- [React 19](https://react.dev/) — UI
- [React Router DOM v6](https://reactrouter.com/) — enrutamiento SPA
- [prop-types](https://www.npmjs.com/package/prop-types) — validación de props en runtime
- [RAWG Video Games Database API](https://rawg.io/apidocs) — fuente de datos de videojuegos

---

## Requisitos previos

- Node.js 18 o superior
- API key gratuita de [RAWG](https://rawg.io/apidocs) (registro instantáneo en rawg.io)

---

## Cómo correr el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/dcoronado91/ej4-react.git
cd ej4-react

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
#    Crear un archivo .env.local en la raíz con:
VITE_RAWG_API_KEY=tu_api_key_de_rawg

# 4. Levantar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

### Otros comandos

```bash
npm run build      # build de producción
npm run preview    # preview del build
npm run lint       # linter ESLint
```

---

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_RAWG_API_KEY` | API key de RAWG Video Games Database |

El archivo `.env.local` **nunca se commitea** (cubierto por `.gitignore`).
Se incluye `.env.example` como plantilla.

---

## Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Juegos mejor valorados, hero con fondo, botón aleatorio |
| `/items` | GameList | Listado completo con búsqueda, filtro y paginación |
| `/items/:id` | GameDetail | Detalle del juego — usa `useParams` |
| `*` | NotFound | Página 404 para rutas inexistentes |

---

## Funcionalidades

- **Búsqueda** de juegos en tiempo real desde RAWG API
- **Filtro por orden**: mejor valorados, más recientes, nombre, Metacritic
- **Paginación** con botón "Cargar más"
- **Juego aleatorio** con `useNavigate` (disponible en Home y GameList)
- **Favoritos** persistentes en `localStorage` (Context API)
- **Tema claro/oscuro** persistente en `localStorage` (Context API)
- **Página 404** para cualquier ruta no definida
- **Screenshots** del juego en la página de detalle

---

## Componentes reutilizables con PropTypes

### `GameCard`
Tarjeta de juego con imagen, rating, géneros, año y botón de favorito.

| Prop | Tipo | Requerida | Descripción |
|------|------|-----------|-------------|
| `game` | `shape` | ✅ | Objeto de juego de la API |
| `game.id` | `number` | ✅ | ID único del juego |
| `game.name` | `string` | ✅ | Nombre del juego |
| `game.background_image` | `string` | — | URL de la imagen de portada |
| `game.rating` | `number` | — | Rating (0–5) |
| `game.released` | `string` | — | Fecha de lanzamiento |
| `game.genres` | `array` | — | Lista de géneros `[{ id, name }]` |

### `SearchBar`
Campo de búsqueda con botón para limpiar.

| Prop | Tipo | Requerida | Descripción |
|------|------|-----------|-------------|
| `value` | `string` | ✅ | Valor actual del input |
| `onChange` | `func` | ✅ | Callback al cambiar el texto |
| `onClear` | `func` | ✅ | Callback al limpiar |
| `placeholder` | `string` | — | Texto placeholder (default: `"Buscar..."`) |

### `Navbar`
Barra de navegación con links internos y toggle de tema.
Consume el contexto internamente — sin props externas.

---

## Estado global — Context API

`AppContext` expone a toda la app:

| Valor | Tipo | Descripción |
|-------|------|-------------|
| `theme` | `string` | `'dark'` o `'light'` |
| `toggleTheme` | `func` | Alterna entre temas |
| `favorites` | `array` | Juegos marcados como favoritos |
| `toggleFavorite(game)` | `func` | Agrega o quita un juego de favoritos |
| `isFavorite(id)` | `func` | Retorna `true` si el juego está en favoritos |

El tema y los favoritos se persisten en `localStorage`.

---

## Estructura del proyecto

```
ej4-react/
├── demo/                    # Video de demostración
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── rawg.js          # Servicio RAWG: getGames, getGameById, getGameScreenshots, getRandomGame
│   ├── assets/
│   ├── components/
│   │   ├── GameCard.jsx     # Tarjeta de juego (PropTypes)
│   │   ├── GameCard.css
│   │   ├── Navbar.jsx       # Navegación con <Link> (PropTypes)
│   │   ├── Navbar.css
│   │   ├── SearchBar.jsx    # Buscador (PropTypes)
│   │   └── SearchBar.css
│   ├── context/
│   │   └── AppContext.jsx   # Tema + favoritos (Context API)
│   ├── pages/
│   │   ├── Home.jsx         # Ruta /
│   │   ├── GameList.jsx     # Ruta /items
│   │   ├── GameDetail.jsx   # Ruta /items/:id
│   │   └── NotFound.jsx     # Ruta *
│   ├── App.jsx              # Definición de rutas
│   ├── index.css            # Variables CSS globales + reset
│   └── main.jsx             # Entry point con BrowserRouter + AppProvider
├── .env.example             # Plantilla de variables de entorno
├── .env.local               # API key real (NO commiteado)
├── index.html
├── package.json
└── vite.config.js
```

---

## Demo

El video mostrando las 3 rutas principales en funcionamiento está en la carpeta [`/demo`](./demo/).