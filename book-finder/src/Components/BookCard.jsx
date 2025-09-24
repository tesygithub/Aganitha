import React from 'react'

export default function BookCard({ book }) {
  const title = book.title || 'Untitled'
  const author = (book.author_name && book.author_name.join(', ')) || 'Unknown author'
  const year = book.first_publish_year || '—'
  const publisher = (book.publisher && book.publisher[0]) || '—'
  const coverId = book.cover_i
  const isbn = (book.isbn && book.isbn[0]) || null

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : isbn
    ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
    : 'https://via.placeholder.com/128x193?text=No+Cover'

  const openLibraryUrl = book.key ? `https://openlibrary.org${book.key}` : '#'

  return (
    <article className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img src={coverUrl} alt={`Cover for ${title}`} className="w-32 h-auto object-contain rounded" />
      <div className="flex-1">
        <a href={openLibraryUrl} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline">
          {title}
        </a>
        <div className="text-sm text-slate-600">{author}</div>
        <div className="mt-2 text-sm"><strong>First published:</strong> {year}</div>
        <div className="text-sm"><strong>Publisher:</strong> {publisher}</div>
        {book.language && <div className="text-sm">Language: {book.language.join(', ')}</div>}
      </div>
    </article>
  )
}


