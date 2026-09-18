/**
 * SearchBar — Product search input with magnifier icon.
 * Pixel-perfect port of the .search-wrapper HTML from products-renderer.js.
 *
 * Props:
 *   value      — Current search string (controlled)
 *   onChange   — (value: string) => void
 *   placeholder — Input placeholder text
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search this collection...',
}) {
  return (
    <div className="search-wrapper">
      <i className="fas fa-search"></i>
      <input
        type="text"
        id="product-search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}
