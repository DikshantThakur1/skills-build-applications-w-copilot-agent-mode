import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">A modern fitness companion for teams and solo athletes.</h1>
          <p className="lead text-muted">
            Track workouts, manage teams, and compare progress through a polished multi-tier experience.
          </p>
          <div className="d-flex gap-3">
            <Link className="btn btn-primary btn-lg" to="/users">Explore data</Link>
            <a className="btn btn-outline-secondary btn-lg" href="http://localhost:8000/api/health">Check API</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h2 className="h4 fw-semibold">Today at a glance</h2>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item px-0">Workout streak: 12 days</li>
              <li className="list-group-item px-0">Leaderboard rank: #3</li>
              <li className="list-group-item px-0">Next goal: 8k steps</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
