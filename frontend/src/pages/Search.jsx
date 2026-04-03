import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Search as SearchIcon, Calendar, User, Clock, ArrowRight, X, CheckCircle, Globe, ChevronDown, Filter, Info, Hotel, Package, MapPin, Users, ArrowLeftRight, Building, House, Briefcase, Plus, Minus } from 'lucide-react';
import PriceTrend from '../components/PriceTrend';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Search State
  const [fromCity, setFromCity] = useState(queryParams.get('from') || '');
  const [toCity, setToCity] = useState(queryParams.get('to') || '');
  const [date, setDate] = useState(queryParams.get('date') || '');
  const [tripType, setTripType] = useState('One-way');
  
  // Passenger State (Image 4)
  const [paxCount, setPaxCount] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [flightClass, setFlightClass] = useState('Economy');
  const [showPaxDropdown, setShowPaxDropdown] = useState(false);

  // UI State
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Booking State
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const popularCities = [
    { name: 'New Delhi and NCR, India', code: 'DEL' },
    { name: 'Mumbai, India', code: 'BOM' },
    { name: 'Bangalore, India', code: 'BLR' },
    { name: 'Chennai, India', code: 'MAA' }
  ];

  useEffect(() => {
    setFromCity(queryParams.get('from') || '');
    setToCity(queryParams.get('to') || '');
    setDate(queryParams.get('date') || '');
  }, [location.search]);

  const fetchFlights = async (overrideFrom, overrideTo) => {
    const extractBase = (str) => {
      if (!str) return '';
      const part = str.split(',')[0].trim();
      return part.includes('Delhi') ? 'Delhi' : part;
    };

    const searchFromCity = overrideFrom !== undefined ? overrideFrom : fromCity;
    const searchToCity = overrideTo !== undefined ? overrideTo : toCity;

    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/flights', {
        params: { 
          from_city: extractBase(searchFromCity), 
          to_city: extractBase(searchToCity) 
        }
      });
      
      const flights = res.data;
      setFilteredFlights(flights);
      
      // PARALLEL PREDICTIONS (PERFORMANCE BOOST)
      const predPromises = flights.map(f => 
        axios.get(`http://localhost:8000/api/predict/${f.id}`)
          .then(r => ({ id: f.id, data: r.data }))
          .catch(() => null)
      );
      
      const results = await Promise.all(predPromises);
      const newPredictions = {};
      results.forEach(r => { if (r) newPredictions[r.id] = r.data; });
      setPredictions(newPredictions);

    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const qFrom = new URLSearchParams(location.search).get('from') || '';
    const qTo = new URLSearchParams(location.search).get('to') || '';
    if (qFrom || qTo) {
      fetchFlights(qFrom, qTo);
    }
  }, [location.search]);

  const handleSearch = () => {
    if (fromCity === toCity && fromCity !== '') {
      alert("Please select a different destination city than your origin.");
      return;
    }
    navigate(`/search?from=${fromCity}&to=${toCity}&date=${date}`);
    // If we're already on this URL, fetchFlights won't trigger automatically via useEffect, so we call it manually
    if (location.search === `?from=${fromCity}&to=${toCity}&date=${date}`) {
      fetchFlights();
    }
  };

  const swapCities = (e) => {
    e.stopPropagation();
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const updatePax = (type, delta) => {
    setPaxCount(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const SuggestionDropdown = ({ onSelect }) => (
    <div className="suggestion-dropdown">
       <div className="dropdown-header">Popular cities near you</div>
       {popularCities.map((city, idx) => (
         <div key={idx} className="dropdown-item" onMouseDown={() => onSelect(city.name)}>
            <div className="dropdown-item-left">
              <MapPin size={16} color="#64748b" />
              <span className="dropdown-item-city">{city.name}</span>
            </div>
            <span className="dropdown-item-all">All airports</span>
         </div>
       ))}
    </div>
  );

  return (
    <div className="search-page" style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* AGODA TABS (Top Header) */}
      <div className="agoda-tabs-container">
        <div className="agoda-tab"><Building size={18} /> Hotels & Homes</div>
        <div className="agoda-tab active"><Plane size={18} /> Flights</div>
        <div className="agoda-tab"><House size={18} /> Homes & Apts</div>
        <div className="agoda-tab"><Briefcase size={18} /> Flight + Hotel</div>
        <div className="agoda-tab"><Globe size={18} /> Activities</div>
      </div>

      {/* AGODA SEARCH BAR (Pixel Perfect Overhaul) */}
      <div style={{ background: 'var(--agoda-gray)', padding: '20px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="agoda-search-card">
            
            {/* Trip Type Pills (Image 1) */}
            <div className="agoda-pill-container">
              <div 
                className={`agoda-pill ${tripType === 'One-way' ? 'active' : ''}`}
                onClick={() => setTripType('One-way')}
              >
                One-way
              </div>
              <div 
                className={`agoda-pill ${tripType === 'Round-trip' ? 'active' : ''}`}
                onClick={() => setTripType('Round-trip')}
              >
                Round-trip
              </div>
            </div>

            {/* Origin & Destination Grid (Image 1 & 2) */}
            <div className="agoda-input-grid">
              <div className="agoda-input-box">
                <div className="agoda-input-label"><Plane size={11} /> Flying from</div>
                <Plane size={20} color="#64748b" />
                <input 
                  type="text" 
                  placeholder="Origin" 
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  onFocus={() => setFromFocused(true)}
                  onBlur={() => setTimeout(() => setFromFocused(false), 300)}
                  style={{ border: 'none', width: '100%', outline: 'none', fontWeight: '700', fontSize: '15px', color: '#1e293b' }}
                />
                <AnimatePresence>
                  {fromFocused && <SuggestionDropdown onSelect={(c) => setFromCity(c)} />}
                </AnimatePresence>
                
                {/* Swap Button (Image 1 Center) */}
                <div className="swap-btn" onClick={swapCities} style={{ right: '-18px', background: 'white', border: '1px solid #e2e8f0', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', position: 'absolute', zIndex: 10 }}>
                  <ArrowLeftRight size={14} color="#64748b" />
                </div>
              </div>

              <div className="agoda-input-box" style={{ paddingLeft: '28px' }}>
                <div className="agoda-input-label"><MapPin size={11} /> Flying to</div>
                <MapPin size={20} color="#64748b" />
                <input 
                  type="text" 
                  placeholder="Destination" 
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  onFocus={() => setToFocused(true)}
                  onBlur={() => setTimeout(() => setToFocused(false), 300)}
                  style={{ border: 'none', width: '100%', outline: 'none', fontWeight: '700', fontSize: '15px', color: '#1e293b' }}
                />
                <AnimatePresence>
                  {toFocused && <SuggestionDropdown onSelect={(c) => setToCity(c)} />}
                </AnimatePresence>
              </div>
            </div>

            {/* Secondary Row: Date & Passengers (Image 3 & 4) */}
            <div className="agoda-secondary-grid">
              <div className="agoda-input-box">
                <div className="agoda-input-label"><Calendar size={11} /> Departure</div>
                <Calendar size={20} color="#64748b" />
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  style={{ border: 'none', width: '100%', outline: 'none', fontWeight: '700', fontSize: '14px', color: '#1e293b' }}
                />
              </div>

              <div className="agoda-input-box" onClick={() => setShowPaxDropdown(!showPaxDropdown)} style={{ cursor: 'pointer' }}>
                <div className="agoda-input-label"><Users size={11} /> Passengers & Class</div>
                <Users size={20} color="#64748b" />
                <div style={{ flex: 1, fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
                  {paxCount.adults + paxCount.children + paxCount.infants} Passenger, {flightClass}
                </div>
                <ChevronDown size={18} color="#64748b" />

                {/* PASSENGER DROPDOWN (Image 4) */}
                <AnimatePresence>
                  {showPaxDropdown && (
                    <motion.div 
                      className="pax-dropdown" 
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <div className="pax-row">
                        <div className="pax-label">
                          <h4>Adults</h4>
                          <span>12yrs and above</span>
                        </div>
                        <div className="pax-counter">
                          <button className="counter-btn" onClick={() => updatePax('adults', -1)} disabled={paxCount.adults <= 1}><Minus size={14} /></button>
                          <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{paxCount.adults}</span>
                          <button className="counter-btn" onClick={() => updatePax('adults', 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="pax-row">
                        <div className="pax-label">
                          <h4>Children</h4>
                          <span>2-11yrs</span>
                        </div>
                        <div className="pax-counter">
                          <button className="counter-btn" onClick={() => updatePax('children', -1)} disabled={paxCount.children <= 0}><Minus size={14} /></button>
                          <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{paxCount.children}</span>
                          <button className="counter-btn" onClick={() => updatePax('children', 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="pax-row">
                        <div className="pax-label">
                          <h4>Infants</h4>
                          <span>Below 2yrs</span>
                        </div>
                        <div className="pax-counter">
                          <button className="counter-btn" onClick={() => updatePax('infants', -1)} disabled={paxCount.infants <= 0}><Minus size={14} /></button>
                          <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{paxCount.infants}</span>
                          <button className="counter-btn" onClick={() => updatePax('infants', 1)}><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="class-selector">
                        {['Economy', 'Premium economy', 'Business', 'First'].map(c => (
                          <div 
                            key={c} 
                            className={`class-pill ${flightClass === c ? 'active' : ''}`}
                            onClick={() => setFlightClass(c)}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Agoda Blue Search Button */}
            <button className="agoda-search-btn" onClick={handleSearch}>
              SEARCH FLIGHTS
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
        {/* SIDEBAR FILTERS (Existing) */}
        <aside>
          <div className="filter-sidebar" style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div className="filter-section" style={{ borderBottom: '1px solid #f1f5f9', padding: '20px' }}>
              <h4 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Airlines <ChevronDown size={14} /></h4>
              <div style={{ marginTop: '15px', display: 'grid', gap: '10px' }}>
                <div className="filter-option"><input type="checkbox" defaultChecked /> Indigo</div>
                <div className="filter-option"><input type="checkbox" defaultChecked /> Air India</div>
                <div className="filter-option"><input type="checkbox" defaultChecked /> Vistara</div>
                <div className="filter-option"><input type="checkbox" defaultChecked /> Akasa Air</div>
              </div>
            </div>
            <div className="filter-section" style={{ borderBottom: '1px solid #f1f5f9', padding: '20px' }}>
              <h4 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Stops <ChevronDown size={14} /></h4>
              <div style={{ marginTop: '15px', display: 'grid', gap: '10px' }}>
                <div className="filter-option"><input type="radio" name="stops" defaultChecked /> Any</div>
                <div className="filter-option"><input type="radio" name="stops" /> Non-stop</div>
                <div className="filter-option"><input type="radio" name="stops" /> 1 Stop</div>
              </div>
            </div>
          </div>
        </aside>

        {/* RESULTS AREA */}
        <main>
          <div style={{ display: 'grid', gap: '15px' }}>
            {filteredFlights.length > 0 ? filteredFlights.map((flight, idx) => (
              <motion.div 
                key={flight.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flight-card-horizontal"
                style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}
              >
                <div className="airline-info">
                   <div style={{ background: '#eff6ff', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                      <Plane size={24} color="var(--agoda-blue-dark)" />
                   </div>
                   <h4 style={{ fontSize: '15px', fontWeight: '700' }}>{flight.airline}</h4>
                   <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{flightClass}</span>
                </div>

                <div className="route-info">
                   <div style={{ textAlign: 'center' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>{flight.departure}</h3>
                      <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '700' }}>{flight.from}</p>
                   </div>
                   
                   <div className="duration-line">
                      <div className="duration-label">2h 30m</div>
                      <Plane size={14} style={{ color: '#94a3b8', transform: 'rotate(90deg)' }} />
                   </div>

                   <div style={{ textAlign: 'center' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>{flight.arrival}</h3>
                      <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '700' }}>{flight.to}</p>
                   </div>
                   
                   <div style={{ width: '160px' }}>
                      <PriceTrend prediction={predictions[flight.id]} />
                   </div>
                </div>

                <div className="price-action">
                   <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: '800' }}>PROMO APPLIED</span>
                      <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#10b981' }}>₹{flight.price}</h2>
                   </div>
                   <button className="btn btn-primary" style={{ background: 'var(--agoda-blue-dark)', borderRadius: '10px', boxShadow: 'none' }} onClick={() => setSelectedFlight(flight)}>
                      SELECT
                   </button>
                </div>
              </motion.div>
            )) : (
              <div style={{ textAlign: 'center', padding: '100px', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                 <Plane size={64} color="#cbd5e1" style={{ margin: '0 auto 20px' }} />
                 <h3>Let's find your destination</h3>
                 <p style={{ color: '#64748b' }}>Search above to explore real-time availability</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Simplified Booking Modal */}
      <AnimatePresence>
        {selectedFlight && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
             <div style={{ background: 'white', padding: '30px', borderRadius: '20px', maxWidth: '400px', width: '90%' }}>
                <h3 className="mb-4" style={{ color: '#1e293b' }}>Confirm Reservation</h3>
                <p className="mb-4" style={{ color: '#64748b' }}>{selectedFlight.airline} - {selectedFlight.from} to {selectedFlight.to}</p>
                <button 
                  className="agoda-search-btn" 
                  onClick={async () => { 
                    try {
                      await axios.post('http://localhost:8000/api/bookings', {
                        username: 'guest',
                        flight_id: selectedFlight.id,
                        flight_details: selectedFlight,
                        passengers: ['Dhanvin'],
                        status: 'Confirmed'
                      });
                      setBookingSuccess(true); 
                      setTimeout(() => {
                        setSelectedFlight(null);
                        navigate('/bookings');
                      }, 1500); 
                    } catch (e) {
                      console.error("Booking error", e);
                      alert("Booking failed. Please try again.");
                    }
                  }}
                >
                  {bookingSuccess ? 'BOOKING CONFIRMED!' : 'CONFIRM BOOKING'}
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search;
