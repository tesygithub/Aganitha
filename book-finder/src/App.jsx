import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'

export default function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function searchBooks(q) {
    if (!q) {
      setBooks([])
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      // Open Library Search API - no key required
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&limit=20`
      )
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      setBooks(data.docs || [])
    } catch (err) {
      console.error(err)
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    searchBooks(query.trim())
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">📚 Book Finder</h1>
          <p className="text-slate-600">
            Search books by title (Open Library). Try "Harry Potter", "Pride and Prejudice", etc.
          </p>
        </header>

        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} onSubmit={handleSubmit} />

        {loading && (
          <div className="mt-4 text-slate-600">Loading results…</div>
        )}

        {error && (
          <div className="mt-4 text-red-600">Error: {error}</div>
        )}

        <main className="mt-6">
          {books.length === 0 && !loading && (
            <div className="text-slate-600">No results yet — enter a title and press Search.</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {books.map((b) => (
              <BookCard key={b.key ?? b.cover_edition_key ?? b.edition_key?.[0]} book={b} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}



