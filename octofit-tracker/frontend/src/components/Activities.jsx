import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      const apiUrl = import.meta.env.VITE_CODESPACE_NAME
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
        : 'http://localhost:8000/api/activities/';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadActivities();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="h4 fw-bold">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group mt-3">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id || activity.type}>
            <strong>{activity.type}</strong>
            <div className="text-muted small">{activity.durationMinutes} min · {activity.calories} cal</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
