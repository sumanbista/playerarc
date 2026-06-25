// Text search input for filtering players by name.

export default function SearchBar({ searchTerm, onSearchTermChange }) {
  return (
    <div className="relative">
      <label htmlFor="player-search" className="sr-only">Search players</label>
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
      <input
        id="player-search"
        type="search"
        placeholder="Search by player name…"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
    </div>
  );
}
