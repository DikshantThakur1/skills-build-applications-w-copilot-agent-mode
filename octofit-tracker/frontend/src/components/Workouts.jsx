import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      const apiUrl = import.meta.env.VITE_CODESPACE_NAME
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
        : 'http://localhost:8000/api/workouts/';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="h4 fw-bold">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3 mt-2">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id || workout.title}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 fw-semibold">{workout.title}</h3>
                <p className="text-muted small">{workout.description}</p>
                <p className="small mb-0">{workout.durationMinutes} min · {workout.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
