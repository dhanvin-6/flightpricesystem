import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Compass, Star, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

function Home() {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/deals')
      .then(res => setDeals(res.data))
      .catch(err => console.error(err));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="home-page">
      {/* CINEMATIC HERO - SIMPLIFIED WITHOUT SEARCH BAR */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-visual">
          <img src={heroBg} alt="Luxury Travel" />
        </div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ zIndex: 1, width: '100%', maxWidth: '800px' }}
        >
          <div className="badge mb-4" style={{ background: 'rgba(251, 191, 36, 0.2)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(10px)' }}>
            <Star size={14} fill="currentColor" /> Premium Travel Experience
          </div>
          <h2 className="font-outfit" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)', fontSize: '4rem', lineHeight: '1.1' }}>Explore The World <br /><span className="text-gold">Without Limits</span></h2>
          <p style={{ color: '#e2e8f0', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontSize: '1.2rem', maxWidth: '600px', margin: '20px 0 40px' }}>Book with our AI-driven price prediction and experience luxury travel at the best possible price.</p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '16px 40px', fontSize: '18px', borderRadius: '50px' }}
              onClick={() => navigate('/search')}
            >
              Explore Flights <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </button>
            <button 
              className="btn btn-outline" 
              style={{ padding: '16px 40px', fontSize: '18px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.3)' }}
              onClick={() => navigate('/dashboard')}
            >
              Analyze Trends
            </button>
          </div>
        </motion.div>
      </section>

      {/* CORE FEATURES */}
      <section className="container mb-8" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid"
        >
          <motion.div variants={item} className="card text-center" style={{ background: 'rgba(15, 23, 42, 0.95)' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--secondary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <ShieldCheck size={28} />
            </div>
            <h3>Verified Airlines</h3>
            <p className="text-secondary mt-4">We partner with top-tier global carriers to ensure your comfort and safety.</p>
          </motion.div>

          <motion.div variants={item} className="card text-center" style={{ background: 'rgba(15, 23, 42, 0.95)' }}>
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Globe size={28} />
            </div>
            <h3>Global Routes</h3>
            <p className="text-secondary mt-4">Covering over 2,000 destinations across every continent on the planet.</p>
          </motion.div>

          <motion.div variants={item} className="card text-center" style={{ background: 'rgba(15, 23, 42, 0.95)' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Plane size={28} />
            </div>
            <h3>AI Prediction</h3>
            <p className="text-secondary mt-4">Our proprietary ML model predicts price trends with over 90% accuracy.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED DEALS */}
      <section className="container mt-8 pb-8">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 className="font-outfit">Exclusive <span className="text-gold">Deals</span></h2>
            <p className="text-secondary">Signature routes curated for the sophisticated traveler.</p>
          </div>
          <Link to="/search" className="accent" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            View All Flights <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid"
        >
          {deals.length > 0 ? deals.slice(0, 3).map(deal => (
            <motion.div key={deal.id} variants={item} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Available Now</span>
                <span className="text-secondary font-outfit" style={{ fontWeight: '700' }}>{deal.airline}</span>
              </div>
              <h3 className="mb-2">{deal.from} → {deal.to}</h3>
              <p className="text-secondary" style={{ fontSize: '14px' }}>Executive Class | Direct Flight</p>
              
              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p className="text-secondary" style={{ fontSize: '12px' }}>Starting at</p>
                  <h2 className="text-gold">₹{deal.price}</h2>
                </div>
                <Link to="/search" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                  Reserve
                </Link>
              </div>
            </motion.div>
          )) : (
            <div className="card" style={{ gridColumn: '1/-1', textAlign: 'center' }}>
              <p className="text-secondary">Fetching the most exclusive deals...</p>
            </div>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
}

export default Home;
