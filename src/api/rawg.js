const BASE_URL = 'https://api.rawg.io/api'
const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const buildUrl = (path, params = {}) => {
  const query = new URLSearchParams({ key: API_KEY, ...params })
  return `${BASE_URL}/${path}?${query}`
}

const handleResponse = async (res) => {
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export const getGames = ({ search = '', page = 1, pageSize = 20, ordering = '-rating' } = {}) =>
  fetch(buildUrl('games', {
    page,
    page_size: pageSize,
    ordering,
    ...(search && { search }),
  })).then(handleResponse)

export const getGameById = (id) =>
  fetch(buildUrl(`games/${id}`)).then(handleResponse)

export const getGameScreenshots = (id) =>
  fetch(buildUrl(`games/${id}/screenshots`)).then(handleResponse)

export const getRandomGame = async () => {
  const randomPage = Math.floor(Math.random() * 40) + 1
  const data = await getGames({ page: randomPage, pageSize: 1, ordering: '-rating' })
  return data.results[0]
}
