import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username,
        password
      });
      
      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="hero">
        <h2 className="accent">Welcome Back</h2>
        <p>Login to manage your bookings and view personalized analytics.</p>
      </header>

      <section style={{ maxWidth: '450px', margin: '0 auto', padding: '40px 20px' }}>
        <form className="card" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="text-center accent">Login</h3>
          {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '14px' }}>{error}</p>}
          
          <div className="form-group">
            <label className="text-sub mb-4" style={{ display: 'block' }}>Username</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-sub mb-4" style={{ display: 'block' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', padding: '16px' }}
          >
            {loading ? 'Authenticating...' : 'Login Now'}
          </button>
          
          <p className="text-center text-sub" style={{ fontSize: '14px' }}>
            Don't have an account? <Link to="/register" className="accent" style={{ textDecoration: 'none' }}>Register here</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Login;
