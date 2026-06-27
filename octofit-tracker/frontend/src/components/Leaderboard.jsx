import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      const apiUrl = import.meta.env.VITE_CODESPACE_NAME
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
        : 'http://localhost:8000/api/leaderboard/';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadEntries();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="h4 fw-bold">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="list-group mt-3">
        {entries.map((entry, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.displayName}>
            <span>#{index + 1} {entry.displayName}</span>
            <span className="badge bg-primary">{entry.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
