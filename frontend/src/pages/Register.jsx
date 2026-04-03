import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        username,
        password
      });
      
      if (response.data.status === 'success') {
        alert("Registration successful! Please login.");
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <header className="hero">
        <h2 className="accent">Join Our Community</h2>
        <p>Create an account to start booking flights and earning miles.</p>
      </header>

      <section style={{ maxWidth: '450px', margin: '0 auto', padding: '40px 20px' }}>
        <form className="card" onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="text-center accent">Register</h3>
          {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '14px' }}>{error}</p>}
          
          <div className="form-group">
            <label className="text-sub mb-4" style={{ display: 'block' }}>Username</label>
            <input 
              type="text" 
              placeholder="Choose a username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-sub mb-4" style={{ display: 'block' }}>Password</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-sub mb-4" style={{ display: 'block' }}>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', padding: '16px' }}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
          
          <p className="text-center text-sub" style={{ fontSize: '14px' }}>
            Already have an account? <Link to="/login" className="accent" style={{ textDecoration: 'none' }}>Login here</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Register;
