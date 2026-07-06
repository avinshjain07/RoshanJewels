/**
 * CategoryFilter — Filter button row for collection and type pages.
 * Pixel-perfect port of the .filter-container HTML from products-renderer.js.
 *
 * Props:
 *   options       — Array of filter strings e.g. ['All', 'Earrings', 'Rings']
 *   activeFilter  — Currently selected filter string
 *   onChange      — (filterValue: string) => void
 */
export default function CategoryFilter({ options, activeFilter, onChange }) {
  return (
    <div className="filter-container">
      {options.map((opt) => {
        const displayOpt = opt.replace(' Collection', '');
        const isActive   = activeFilter.toLowerCase() === opt.toLowerCase();
        return (
          <button
            key={opt}
            className={`filter-btn${isActive ? ' active' : ''}`}
            data-filter={opt}
            onClick={() => onChange(opt)}
            aria-pressed={isActive}
          >
            {displayOpt}
          </button>
        );
      })}
    </div>
  );
}
