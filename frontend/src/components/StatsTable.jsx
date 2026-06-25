// Generic stats table — column definitions + row data, reused across profile tabs.

import { formatStatValue } from '../utils/formatStatValue';

export default function StatsTable({ title, columns, rows, emptyMessage }) {
  if (!rows?.length) {
    if (!emptyMessage) return null;
    return (
      <div>
        {title && (
          <h3 className="mb-3 text-sm font-semibold text-slate-800">{title}</h3>
        )}
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-slate-800">{title}</h3>
      )}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-medium text-slate-600 ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex} className="hover:bg-slate-50/50">
                {columns.map((col) => {
                  const raw = col.render ? col.render(row) : row[col.key];
                  const display =
                    col.format === false ? raw : formatStatValue(raw);
                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-slate-800 ${
                        col.align === 'right' ? 'text-right tabular-nums' : 'text-left'
                      }`}
                    >
                      {display}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
