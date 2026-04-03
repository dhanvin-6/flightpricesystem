import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, LogOut, Ticket, Plane, CreditCard, Gift, ArrowRight, ShieldCheck, TrendingUp, Zap, BarChart3, Globe, Cpu, Info } from 'lucide-react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      const fetchData = async () => {
        try {
          const [bookingsRes, dealsRes] = await Promise.all([
            axios.get(`http://localhost:8000/api/bookings/${parsedUser.username}`),
            axios.get('http://localhost:8000/api/deals')
          ]);
          setBookings(bookingsRes.data);
          setDeals(dealsRes.data);
        } catch (err) {
          console.error("Error fetching dashboard data", err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user || loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '40px', height: '40px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }} />
    </div>
  );

  // Mocked data for AI Ticket Price Predictor
  const predictiveData = [
    { year: '2024', base: 45, surge: 12 },
    { year: '2025', base: 48, surge: 15 },
    { year: '2026', base: 52, surge: 18 },
    { year: '2027', base: 58, surge: 22 },
    { year: '2028', base: 65, surge: 28 },
    { year: '2029', base: 72, surge: 35 },
    { year: '2030', base: 80, surge: 42 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-page mb-8">
      {/* HEADER SECTION */}
      <header className="hero" style={{ minHeight: '30vh', padding: '60px 0', alignItems: 'flex-start', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div>
            <div className="badge mb-2" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--secondary)' }}>Executive Member</div>
            <h2 className="font-outfit">Welcome, <span className="text-gold">{user.username}</span></h2>
            <p className="text-secondary">Managing your global travel itinerary and exclusive membership perks.</p>
          </div>
          <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '10px 20px', fontSize: '14px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* ANALYTICS GRID */}
      <section className="container">
        <div className="grid">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card insight-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div className="analytics-stat">
                <span className="label">Miles Earned</span>
                <span className="value text-gold">1,250 pts</span>
              </div>
              <Gift size={24} className="text-gold" />
            </div>
            <div style={{ height: '6px', background: 'var(--glass)', borderRadius: '3px', marginTop: '20px' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1 }} style={{ height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
            </div>
            <p className="text-secondary mt-4" style={{ fontSize: '12px' }}>Next reward (Silver Tier) at 2,000 miles</p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="card insight-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div className="analytics-stat">
                <span className="label">Global Presence</span>
                <span className="value text-secondary">24 Cities</span>
              </div>
              <Globe size={24} className="text-secondary" />
            </div>
            <div style={{ display: 'flex', gap: '5px', marginTop: '15px' }}>
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} style={{ height: '4px', flex: 1, background: i < 5 ? 'var(--secondary)' : 'var(--glass)', borderRadius: '2px' }} />
              ))}
            </div>
            <p className="text-secondary mt-4" style={{ fontSize: '12px' }}>Coverage across 4 continents</p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="card insight-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div className="analytics-stat">
                <span className="label">Savings AI</span>
                <span className="value" style={{ color: '#10b981' }}>₹12.4k</span>
              </div>
              <Zap size={24} style={{ color: '#10b981' }} />
            </div>
            <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)', marginTop: '10px' }}>
              <p style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Efficient Booking Rate: 92%</p>
            </div>
            <p className="text-secondary mt-4" style={{ fontSize: '12px' }}>Amount saved using AI predictions</p>
          </motion.div>
        </div>
      </section>

      {/* ANALYTICS HUB */}
      <section className="container mt-8">
        <h2 className="font-outfit mb-8" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BarChart3 className="text-gold" /> Travel Insights
        </h2>
        
        <div className="analytics-hub">
          {/* PRICE PULSE CHART */}
          <div className="insight-card">
            <h3 className="mb-4 font-outfit" style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <TrendingUp size={18} className="text-secondary" /> Price Pulse (Global Deals)
            </h3>
            <p className="text-secondary mb-8" style={{ fontSize: '14px' }}>Real-time price distribution across current top-tier routes.</p>
            
            <div className="bar-chart-container">
              {deals.length > 0 ? deals.slice(0, 8).map((deal, idx) => (
                <div 
                  key={deal.id} 
                  className="chart-bar" 
                  style={{ height: `${(deal.price / 8000) * 100}%` }}
                  data-label={deal.to.slice(0, 3).toUpperCase()}
                  data-value={`₹${deal.price}`}
                />
              )) : (
                <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p className="text-secondary">Generating market pulse...</p>
                </div>
              )}
            </div>
          </div>

          {/* DESTINATIONS FORECAST */}
          <div className="insight-card">
            <h3 className="mb-4 font-outfit" style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Globe size={18} className="text-gold" /> Trending Forecast
            </h3>
            <div className="forecast-grid">
              {[
                { city: 'Goa', sentiment: 'FALLING', label: 'sentiment-falling' },
                { city: 'Dubai', sentiment: 'RISING', label: 'sentiment-rising' },
                { city: 'Singapore', sentiment: 'STABLE', label: 'sentiment-stable' },
                { city: 'London', sentiment: 'RISING', label: 'sentiment-rising' }
              ].map((item, idx) => (
                <div key={idx} className="forecast-item" onClick={() => navigate(`/search?to=${item.city}`)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.sentiment === 'FALLING' ? '#10b981' : item.sentiment === 'RISING' ? '#ef4444' : '#64748b' }} />
                    <span style={{ fontWeight: '600' }}>{item.city}</span>
                  </div>
                  <span className={`sentiment-badge ${item.label}`}>{item.sentiment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE PREDICTIVE INSIGHTS */}
      <section className="container mt-8">
        <h2 className="font-outfit mb-8" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Cpu className="text-gold" /> AI Predictive Analytics
        </h2>

        <div className="insight-card" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 className="mb-2 font-outfit" style={{ fontSize: '24px' }}>AI Ticket Price Predictor</h3>
                <p className="text-secondary" style={{ fontSize: '14px' }}>System-wide projection of average ticket costs and surcharge dynamics, 2024 - 2030.</p>
              </div>
              <div className="demand-legend">
                <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--primary)' }}></div> Base Fare</div>
                <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--secondary)' }}></div> Taxes & Fuel</div>
              </div>
            </div>

            <div className="stacked-bar-container">
              {predictiveData.map((data, idx) => (
                <div key={data.year} className="stacked-bar">
                  <div className="bar-segment bar-segment-a" style={{ height: `${data.base}%` }}></div>
                  <div className="bar-segment bar-segment-b" style={{ height: `${data.surge}%` }}></div>
                   <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700' }}>
                    {data.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="growth-stat-box">
             <div className="growth-value">4.2%</div>
             <div className="growth-label">Avg. Fare Hike Forecast</div>
             <p className="text-secondary mt-4" style={{ fontSize: '13px' }}>Projected annual core price adjustment based on proprietary AI fuel and demand modeling.</p>
             <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontSize: '12px', fontWeight: '700' }}>
               <Info size={14} /> Price stability analysis complete
             </div>
          </div>
        </div>
      </section>

      {/* BOOKINGS SECTION */}
      <section className="container mt-8">
        <h2 className="font-outfit mb-8" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <Ticket className="text-gold" /> Active Itineraries
        </h2>
        
        {bookings.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {bookings.map((booking, idx) => (
              <motion.div 
                key={booking.id} 
                initial={{ x: -20, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="card glass-panel" 
                style={{ padding: '0', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'auto 1fr auto', background: 'rgba(15, 23, 42, 0.4)' }}
              >
                <div style={{ background: 'var(--primary)', color: '#000', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                  <Plane size={32} />
                  <p style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Confirmed</p>
                </div>
                
                <div style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <p className="text-secondary" style={{ fontSize: '12px' }}>Reference: {booking.id.slice(-8).toUpperCase()}</p>
                    <p className="text-secondary" style={{ fontSize: '12px' }}>Booked: {booking.booking_date}</p>
                  </div>
                  <h3>{booking.flight_details}</h3>
                  <div className="mt-4" style={{ display: 'flex', gap: '20px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                       <User size={16} /> {booking.passengers?.[0] || 'Executive'}
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                       <ShieldCheck size={16} /> {booking.seat_preference}
                     </div>
                  </div>
                </div>

                <div style={{ padding: '30px', borderLeft: '1px dashed var(--glass-border)', display: 'flex', alignItems: 'center' }}>
                  <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '10px 15px' }}>
                    Manage <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card text-center" style={{ padding: '60px', background: 'rgba(255,255,255,0.02)', borderStyle: 'dashed' }}>
            <p className="text-secondary mb-4">No reservations detected in your itinerary.</p>
            <Link to="/search" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Discover Flights</Link>
          </div>
        )}
      </section>
    </motion.div>
  );
}

export default Dashboard;
