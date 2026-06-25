// Loading, error, and empty-result states for the player list page.

const VARIANTS = {
  loading: {
    title: 'Loading players…',
    description: 'Fetching the latest roster from the API.',
  },
  error: {
    title: 'Could not load players',
    description: null,
  },
  'no-results': {
    title: 'No players match',
    description: 'Try adjusting your search or filters to find a player.',
  },
};

export default function EmptyState({ variant, message }) {
  const config = VARIANTS[variant] ?? VARIANTS['no-results'];
  const description = message ?? config.description;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      {variant === 'loading' && (
        <div
          className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-600"
          aria-hidden="true"
        />
      )}
      {variant === 'error' && (
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600"
          aria-hidden="true"
        >
          !
        </div>
      )}
      {variant === 'no-results' && (
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          aria-hidden="true"
        >
          ∅
        </div>
      )}
      <h2 className="text-lg font-semibold text-slate-900">{config.title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}
