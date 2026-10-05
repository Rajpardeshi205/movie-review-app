import { useState } from 'react'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export default function App() {
  const [title, setTitle] = useState('')
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async (e) => {
    e.preventDefault()
    const query = title.trim()
    if (!query) return

    if (!API_KEY) {
      setError('Missing VITE_OMDB_API_KEY. Add it to your .env file.')
      return
    }

    setLoading(true)
    setError('')
    setMovie(null)

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(query)}`
      )
      const data = await res.json()
      if (data.Response === 'False') throw new Error(data.Error || 'Movie not found')
      setMovie(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <h1>🎬 Movie Review</h1>

      <form onSubmit={search}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie name…"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {movie && (
        <div className="card">
          {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
          ) : (
            <div className="no-poster">No poster</div>
          )}
          <div className="info">
            <h2>{movie.Title}</h2>
            <p className="year">{movie.Year} · {movie.Genre}</p>
            <p className="rating">⭐ {movie.imdbRating} <span>/ 10 IMDb</span></p>
            <p>{movie.Plot}</p>
          </div>
        </div>
      )}
    </main>
  )
}
