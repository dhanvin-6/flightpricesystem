import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, MapPin, Star, ChevronDown, Leaf, Map, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

function Activities() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Most Popular');
  const [searchInput, setSearchInput] = useState('');
  const [showStations, setShowStations] = useState(false);
  const stations = ['Station Meteo Ribicos', 'Grand Central Hub', 'Airport Terminal 1', 'Downtown Express'];
  const [selectedStation, setSelectedStation] = useState(stations[0]);
  
  const cards = [
    { name: 'David McColm', number: '•••• •••• •••• 8724', exp: '07/25', balance: '$1,822.19', bank: 'RuPay' },
    { name: 'David McColm', number: '•••• •••• •••• 4092', exp: '11/28', balance: '$12,450.00', bank: 'Visa Debit' },
    { name: 'David McColm', number: '•••• •••• •••• 6511', exp: '03/27', balance: '$8,940.00', bank: 'Mastercard Debit' }
  ];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCard = cards[activeCardIndex];

  const paymentMethods = ['Credit / Debit Card', 'UPI', 'Net Banking', 'Digital Wallet'];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const destinations = [
    {
      id: 1,
      name: 'Sigiriya, CP',
      country: 'Sri Lanka',
      rating: '5.0',
      image: '/images/sri_lanka.png',
      wiki: 'https://en.wikipedia.org/wiki/Sigiriya'
    },
    {
      id: 2,
      name: 'Red and Brown Castle Landscape',
      country: 'Japan',
      rating: '5.0',
      image: '/images/japan.png',
      wiki: 'https://en.wikipedia.org/wiki/Japanese_castle'
    },
    {
      id: 3,
      name: 'The Grand Badshahi Mosque',
      country: 'Pakistan',
      rating: '5.0',
      image: '/images/pakistan.png',
      wiki: 'https://en.wikipedia.org/wiki/Badshahi_Mosque'
    },
    {
      id: 4,
      name: 'Handara Gate Under Blue Sky',
      country: 'Indonesia',
      rating: '5.0',
      image: '/images/indonesia.png',
      wiki: 'https://en.wikipedia.org/wiki/Candi_bentar'
    }
  ];

  const packages = [
    { name: '10 days 3 Asian Countries Tour', price: '$12,000', status: 'Booking Closed', date: '12 Apr 2024', icon: <Leaf size={16} /> },
    { name: '20 Days Europe Tour', price: '$19,000', status: 'Booking Open', date: '16 Jun 2024', icon: <Map size={16} color="#f97316" /> },
    { name: '30 Days North America Tour', price: '$23,000', status: 'Booking Open', date: '20 Dec 2024', icon: <Compass size={16} color="#f97316" /> },
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
          Explore The Beauty of <span style={{ color: '#a855f7' }}>Our Planet</span>
        </h1>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="search-bar-wrapper" style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 15px', width: '350px' }}>
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Choose Destination" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?to=${encodeURIComponent(searchInput)}`)}
              style={{ border: 'none', outline: 'none', padding: '12px 10px', width: '100%', fontSize: '14px' }}
            />
            <Mic size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate(`/search?to=${encodeURIComponent(searchInput)}`)}
            style={{ background: '#4c1d95', borderColor: '#4c1d95', padding: '0 30px', borderRadius: '12px', fontWeight: '600' }}
          >
            Search
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          {['Most Popular', 'Best Price', 'Near Me'].map(tab => (
            <div 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ 
                color: activeTab === tab ? '#f8fafc' : '#94a3b8', 
                fontWeight: activeTab === tab ? '700' : '500', 
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '15px',
                marginBottom: '-16px'
              }}
            >
              {tab}
              {activeTab === tab && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: '#4c1d95' }} />
              )}
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 15px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Worldwide</span>
          <ChevronDown size={16} color="#64748b" />
        </div>
      </div>

      {/* DESTINATION CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '50px' }}>
        {destinations.map(dest => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={dest.id} 
            className="destination-card"
            style={{ backgroundImage: `url(${dest.image})` }}
            onClick={() => window.open(dest.wiki, '_blank')}
          >
            <div className="destination-card-overlay">
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '0px' }}>{dest.name}</h3>
              {dest.id === 1 && <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginTop: '4px', marginBottom: '15px' }}>{dest.country}</h3>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#38bdf8" />
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{dest.country}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{dest.rating}</span>
                </div>
              </div>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  navigate(`/search?to=${encodeURIComponent(dest.country)}`); 
                }}
                style={{ 
                  width: '100%', 
                  padding: '10px 0', 
                  background: 'rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(5px)',
                  color: 'white', 
                  border: '1px solid rgba(255,255,255,0.4)', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontWeight: '700', 
                  fontSize: '13px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LOWER SECTION: TABLE & PAYMENT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }}>
        
        {/* PACKAGES TABLE */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#f8fafc', margin: 0 }}>Featured Packages</h2>
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowStations(!showStations)} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e2e8f0', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', background: 'white' }}>
                <MapPin size={14} color="#94a3b8" />
                <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedStation}</span>
                <ChevronDown size={14} color="#94a3b8" />
              </div>
              {showStations && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '5px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', width: '200px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 10 }}>
                  {stations.map(station => (
                    <div 
                      key={station} 
                      onClick={() => { setSelectedStation(station); setShowStations(false); }} 
                      style={{ padding: '10px 15px', fontSize: '13px', cursor: 'pointer', borderBottom: '1px solid #f8fafc', color: selectedStation === station ? '#4c1d95' : '#64748b', fontWeight: selectedStation === station ? '700' : '500' }}
                    >
                      {station}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <table className="activities-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Pricing</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, idx) => (
                <tr key={idx}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                      {pkg.icon}
                    </div>
                    {pkg.name}
                  </td>
                  <td>{pkg.price}</td>
                  <td>
                    <span 
                      className={`status-pill ${pkg.status === 'Booking Closed' ? 'closed' : 'open'}`}
                      onClick={() => pkg.status === 'Booking Open' && navigate('/search')}
                      style={{ cursor: pkg.status === 'Booking Open' ? 'pointer' : 'default' }}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td>{pkg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAYMENT METHOD */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowPaymentMethods(!showPaymentMethods)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
                  {selectedPaymentMethod === 'Credit / Debit Card' ? 'Payment Method' : selectedPaymentMethod}
                </h2>
                <ChevronDown size={20} color="#f8fafc" style={{ marginTop: '2px' }} />
              </div>
              
              {showPaymentMethods && (
                <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', width: '220px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 20 }}>
                  {paymentMethods.map(method => (
                    <div 
                      key={method} 
                      onClick={() => { 
                        setSelectedPaymentMethod(method); 
                        setShowPaymentMethods(false); 
                        navigate(`/payment?method=${encodeURIComponent(method)}`);
                      }} 
                      style={{ padding: '12px 15px', fontSize: '14px', cursor: 'pointer', borderBottom: '1px solid #f8fafc', color: selectedPaymentMethod === method ? '#4c1d95' : '#64748b', fontWeight: selectedPaymentMethod === method ? '700' : '500' }}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedPaymentMethod === 'Credit / Debit Card' && (
              <span onClick={() => setActiveCardIndex((activeCardIndex + 1) % cards.length)} style={{ fontSize: '13px', color: '#4c1d95', fontWeight: '700', cursor: 'pointer' }}>Change Card</span>
            )}
          </div>
          
          {selectedPaymentMethod === 'Credit / Debit Card' ? (
            <div className="credit-card">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                 <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', margin: 0, fontWeight: '700' }}>{activeCard.bank}</h3>
                 <div style={{ display: 'flex' }}>
                   <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)', zIndex: 2 }}></div>
                   <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', marginLeft: '-12px', zIndex: 1 }}></div>
                 </div>
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
                 <div>
                   <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '5px' }}>Card Balance</div>
                   <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '1px' }}>{activeCard.balance}</div>
                 </div>
                 <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                      <path d="M4 12V10c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6H6c-3.3 0-6-2.7-6-6v-2z"></path>
                      <path d="M8 8v8"></path>
                      <path d="M12 6v12"></path>
                      <path d="M16 8v8"></path>
                    </svg>
                 </div>
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                 <div>
                   <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>{activeCard.exp}</div>
                   <div style={{ fontSize: '14px', fontWeight: '600' }}>{activeCard.name}</div>
                 </div>
                 <div style={{ fontSize: '16px', letterSpacing: '2px', fontWeight: '600' }}>
                   {activeCard.number}
                 </div>
               </div>
            </div>
          ) : (
            <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', padding: '60px 20px', borderRadius: '16px', textAlign: 'center' }}>
              <Compass size={32} color="#94a3b8" style={{ marginBottom: '15px' }} />
              <div style={{ fontSize: '16px', color: '#475569', fontWeight: '700', marginBottom: '8px' }}>Setup {selectedPaymentMethod}</div>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>Configure your {selectedPaymentMethod} details to enable secure, fast bookings on your next adventure.</p>
              <button style={{ marginTop: '20px', background: 'white', border: '1px solid #cbd5e1', padding: '8px 20px', borderRadius: '8px', color: '#4c1d95', fontWeight: '600', cursor: 'pointer' }}>Connect Now</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Activities;
