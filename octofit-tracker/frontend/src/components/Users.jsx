import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'));
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadUsers();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="h4 fw-bold">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group mt-3">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name || 'Unknown user'}</strong>
            <div className="text-muted small">{user.email}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
