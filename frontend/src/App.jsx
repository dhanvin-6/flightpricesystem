import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings';
import Activities from './pages/Activities';
import Payment from './pages/Payment';
import Footer from './components/Footer';

function Navbar() {
  return (
    <nav>
      <Link to="/" style={{ textDecoration: 'none' }}><h1>✈ Flight Price Agent</h1></Link>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/search">Search Flights</NavLink></li>
        <li><NavLink to="/dashboard">Analytics</NavLink></li>
        <li><NavLink to="/activities">Things to Do</NavLink></li>
        <li><NavLink to="/bookings">My Bookings</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
