import React from 'react'
export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by book title..."
        className="flex-1 p-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        aria-label="Search books by title"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  )
}
