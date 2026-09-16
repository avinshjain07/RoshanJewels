import { Link } from 'react-router-dom';

/**
 * Breadcrumb — Navigation breadcrumb trail.
 * Replaces the breadcrumbs generated in products-renderer.js.
 *
 * Props:
 *   pageTitle    — e.g. 'Diamond Collection'
 *   pageRoute    — e.g. '/diamond'
 *   activeFilter — Current filter ('' or 'All' = not shown)
 *   search       — Current search query ('' = not shown)
 */
export default function Breadcrumb({ pageTitle, pageRoute, activeFilter, search }) {
  const showFilter = activeFilter && activeFilter !== 'All';
  const showSearch = search && search.trim();

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {' > '}
      <Link to={pageRoute}>{pageTitle}</Link>
      {showFilter && (
        <>
          {' > '}
          <span>{activeFilter}</span>
        </>
      )}
      {showSearch && (
        <>
          {' > '}
          <span>Search: &quot;{search}&quot;</span>
        </>
      )}
    </div>
  );
}
