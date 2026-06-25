// Dropdown filters for nationality, club, league, and position — options derived from player data.

const FILTER_FIELDS = [
  { key: 'nationality', label: 'Nationality', optionsKey: 'nationalities' },
  { key: 'currentClub', label: 'Club', optionsKey: 'clubs' },
  { key: 'league', label: 'League', optionsKey: 'leagues' },
  { key: 'position', label: 'Position', optionsKey: 'positions' },
];

function handleFilterChange(filters, onFiltersChange, key, value) {
  onFiltersChange({ ...filters, [key]: value });
}

export default function FilterPanel({ filters, options, onFiltersChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {FILTER_FIELDS.map(({ key, label, optionsKey }) => (
        <div key={key}>
          <label
            htmlFor={`filter-${key}`}
            className="mb-1 block text-xs font-medium text-slate-600"
          >
            {label}
          </label>
          <select
            id={`filter-${key}`}
            value={filters[key]}
            onChange={(e) =>
              handleFilterChange(filters, onFiltersChange, key, e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Any {label.toLowerCase()}</option>
            {options[optionsKey].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
