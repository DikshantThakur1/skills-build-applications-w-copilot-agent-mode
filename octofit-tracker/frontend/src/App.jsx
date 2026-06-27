import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

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
            <Link className="btn btn-primary btn-lg" to="/dashboard">Open dashboard</Link>
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
  )
}

function Dashboard() {
  return (
    <main className="container py-5">
      <h1 className="display-6 fw-bold">Dashboard</h1>
      <p className="text-muted">The React presentation tier is now connected to the OctoFit tracker experience.</p>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
