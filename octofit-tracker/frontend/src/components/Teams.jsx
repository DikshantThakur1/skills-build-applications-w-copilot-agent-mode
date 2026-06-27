import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'));
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="h4 fw-bold">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="row g-3 mt-2">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id || team.name}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 fw-semibold">{team.name}</h3>
                <p className="text-muted mb-2">{team.sport}</p>
                <p className="small mb-0">Captain: {team.captain || 'TBD'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
