/**
 * Loader — Full-page loading spinner shown while lazy-loaded pages load.
 * Uses existing spinner CSS class if available, otherwise inline minimal styles.
 */
export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '1rem',
        color: '#b23b4b',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid #fde2e4',
          borderTop: '4px solid #d44c66',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ color: '#b23b4b', fontSize: '0.95rem' }}>Loading…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
