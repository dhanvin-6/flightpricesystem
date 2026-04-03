import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plane, Calendar, User, Download, X, CheckCircle, RefreshCcw, CreditCard, Bell, Shield, Coffee, Briefcase, FileText, ChevronRight, QrCode, MapPin } from 'lucide-react';

function Bookings() {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Active');
  
  const [paidBookings, setPaidBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('paidBookings')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newlyPaid = searchParams.get('paid');
    if (newlyPaid && !paidBookings.includes(newlyPaid)) {
       const updated = [...paidBookings, newlyPaid];
       setPaidBookings(updated);
       localStorage.setItem('paidBookings', JSON.stringify(updated));
       navigate('/bookings', { replace: true });
    }
  }, [location.search, paidBookings, navigate]);
  
  // Modals / Detail States
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/bookings/guest');
      setBookings(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    // Mock cancellation logic
    try {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
      setShowCancel(false);
      setSelectedBooking(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReschedule = () => {
    alert("Rescheduling flight... Searching for new dates.");
    setShowReschedule(false);
  };

  const BookingCard = ({ booking }) => {
    const flight = booking.flight_details;
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="management-card"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ background: '#eff6ff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plane size={20} color="var(--agoda-blue-dark)" />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{flight.airline}</h4>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Flight ID: {booking.id.slice(-8).toUpperCase()}</span>
            </div>
          </div>
          <span className={`status-badge ${booking.status.toLowerCase()}`}>
            {booking.status}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '15px 0', borderTop: '1px solid #f1f5f9' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{flight.departure}</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{flight.from}</div>
          </div>
          <div style={{ flex: 1, position: 'relative', textAlign: 'center' }}>
             <div style={{ height: '2px', background: '#e2e8f0', width: '100%', position: 'absolute', top: '50%' }}></div>
             <Plane size={14} color="#94a3b8" style={{ position: 'relative', background: 'white', padding: '0 10px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{flight.arrival}</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{flight.to}</div>
          </div>
        </div>

        {booking.status === 'Confirmed' && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {paidBookings.includes(booking.id) ? (
              <button className="btn btn-outline" style={{ padding: '10px 15px', fontSize: '13px', borderColor: '#e2e8f0', color: '#64748b', cursor: 'pointer', borderRadius: '8px' }} onClick={() => { setSelectedBooking(booking); setShowTicket(true); }}>
                <Download size={14} style={{ marginRight: '6px', verticalAlign: 'middle', marginBottom: '2px' }} /> Download Ticket
              </button>
            ) : (
              <button onClick={() => navigate(`/payment?bookingId=${booking.id}`)} style={{ padding: '10px 15px', fontSize: '13px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                <CreditCard size={14} style={{ marginRight: '6px', verticalAlign: 'middle', marginBottom: '2px' }} /> Pay Now
              </button>
            )}
            <button className="btn btn-outline" style={{ padding: '10px 15px', fontSize: '13px', borderColor: '#e2e8f0', color: '#64748b' }} onClick={() => { setSelectedBooking(booking); setShowInvoice(true); }}>
              <FileText size={14} style={{ marginRight: '6px' }} /> Invoice
            </button>
            <div style={{ flex: 1 }}></div>
            <button className="btn btn-outline" style={{ padding: '10px 15px', fontSize: '13px', borderColor: '#e2e8f0', color: '#64748b' }} onClick={() => { setSelectedBooking(booking); setShowReschedule(true); }}>
              Modify
            </button>
            <button className="btn btn-outline" style={{ padding: '10px 15px', fontSize: '13px', borderColor: '#fee2e2', color: '#ef4444' }} onClick={() => { setSelectedBooking(booking); setShowCancel(true); }}>
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        
        {/* LEFT: MAIN MANAGEMENT AREA */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Booking Management</h2>
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
              {['Active', 'Past', 'Cancelled'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{ 
                    padding: '8px 20px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '13px', 
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: activeTab === t ? 'white' : 'transparent',
                    color: activeTab === t ? 'var(--agoda-blue-dark)' : '#64748b',
                    boxShadow: activeTab === t ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '100px' }}>Loading your reservations...</div>
            ) : bookings.filter(b => activeTab === 'Cancelled' ? b.status === 'Cancelled' : b.status === 'Confirmed').length > 0 ? (
              bookings.filter(b => activeTab === 'Cancelled' ? b.status === 'Cancelled' : b.status === 'Confirmed').map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div style={{ background: 'white', padding: '80px', borderRadius: '20px', textAlign: 'center', border: '1.5px solid #e2e8f0' }}>
                <Briefcase size={48} color="#cbd5e1" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ color: '#1e293b' }}>No {activeTab.toLowerCase()} bookings found</h3>
                <p style={{ color: '#64748b' }}>Time for a new adventure?</p>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT: NOTIFICATIONS & ADD-ONS */}
        <aside>
          <div className="addon-section" style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
              <Bell size={18} color="var(--accent)" />
              <h4 style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>Notifications</h4>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ background: 'white', padding: '12px', borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0', position: 'relative' }}>
                <div className="notification-dot"></div>
                <strong style={{ color: '#10b981' }}>Flight Status: Scheduled</strong>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>Your flight tomorrow is on time.</p>
              </div>
              <div style={{ background: 'white', padding: '12px', borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b' }}>Reward Points Earned</strong>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>You earned 450 points from last trip.</p>
              </div>
            </div>
          </div>

          <div className="addon-section">
            <h4 style={{ marginBottom: '15px', fontSize: '15px', color: '#1e293b' }}>Travel Add-ons</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              {[
                { icon: <Shield size={16} />, title: 'Travel Insurance', desc: 'Secure your trip for ₹450', price: 450 },
                { icon: <Coffee size={16} />, title: 'In-flight Meal', desc: 'Pre-book premium meal for ₹500', price: 500 },
                { icon: <Briefcase size={16} />, title: 'Extra Baggage', desc: 'Add 15kg extra weight for ₹1,200', price: 1200 }
              ].map((addon, idx) => (
                <div key={idx} onClick={() => { setSelectedAddon(addon); setShowAddonModal(true); }} style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: 'var(--agoda-blue-dark)' }}>{addon.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{addon.title}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{addon.desc}</div>
                  </div>
                  <ChevronRight size={14} color="#cbd5e1" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {/* TICKET MODAL (Ticket Generation) */}
        {showTicket && selectedBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="boarding-pass" style={{ maxWidth: '600px', width: '100%', padding: '40px' }}>
              <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }} onClick={() => setShowTicket(false)}>
                <X size={20} color="#1e293b" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
                <Plane size={32} color="var(--agoda-blue-dark)" />
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '4px', margin: 0, color: '#1e293b' }}>Boarding Pass</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Passenger</label>
                  <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Dhanvin Shah</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Flight</label>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>UK 982</div>
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Seat</label>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>12F</div>
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Gate</label>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>G22</div>
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Boarding</label>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>09:15 AM</div>
                    </div>
                  </div>
                </div>
                <div style={{ background: '#f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', padding: '20px' }}>
                   <QrCode size={100} color="#1e293b" />
                   <span style={{ fontSize: '10px', marginTop: '10px', fontWeight: '700' }}>{selectedBooking.id.slice(-8)}</span>
                </div>
              </div>
              <div style={{ marginTop: '30px', padding: '20px', background: 'var(--agoda-blue-dark)', color: 'white', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                   <label style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>From</label>
                   <div style={{ fontSize: '24px', fontWeight: '800' }}>{selectedBooking.flight_details.from.slice(0,3).toUpperCase()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <label style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>To</label>
                   <div style={{ fontSize: '24px', fontWeight: '800' }}>{selectedBooking.flight_details.to.slice(0,3).toUpperCase()}</div>
                </div>
              </div>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button className="btn btn-outline" style={{ padding: '12px 30px', fontWeight: '700', borderRadius: '10px', borderColor: '#e2e8f0', color: '#64748b' }} onClick={() => setShowTicket(false)}>
                  CLOSE PASS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* INVOICE MODAL (Invoice System) */}
        {showInvoice && selectedBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ background: 'white', maxWidth: '700px', width: '100%', borderRadius: '20px', padding: '40px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }} onClick={() => setShowInvoice(false)}>
                  <X size={20} color="#1e293b" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div>
                    <h2 style={{ margin: 0, color: 'var(--agoda-blue-dark)' }}>TAX INVOICE</h2>
                    <p style={{ color: '#64748b' }}>Invoice ID: INV-{selectedBooking.id.slice(-6)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ color: '#1e293b' }}>Flight Price System</strong><br/>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Digital Hub, Mumbai<br/>GST: 27ABCDE1234F1Z5</span>
                  </div>
                </div>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flight Ticket - {selectedBooking.flight_details.airline}</td>
                      <td>1</td>
                      <td>₹{selectedBooking.flight_details.price - 400}</td>
                      <td>₹{selectedBooking.flight_details.price - 400}</td>
                    </tr>
                    <tr>
                      <td>Convenience Fee</td>
                      <td>1</td>
                      <td>₹300</td>
                      <td>₹300</td>
                    </tr>
                    <tr>
                      <td>Service Tax (GST)</td>
                      <td>5%</td>
                      <td>₹100</td>
                      <td>₹100</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ textAlign: 'right', marginTop: '30px' }}>
                   <div style={{ fontSize: '14px', color: '#64748b' }}>Grand Total</div>
                   <div style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b' }}>₹{selectedBooking.flight_details.price}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                  <button className="btn btn-outline" style={{ padding: '12px 30px', fontWeight: '700', borderRadius: '10px', borderColor: '#e2e8f0', color: '#64748b' }} onClick={() => setShowInvoice(false)}>
                    CLOSE INVOICE
                  </button>
                  <button className="agoda-search-btn" style={{ width: 'auto', padding: '12px 30px' }} onClick={() => window.print()}>PRINT INVOICE</button>
                </div>
             </motion.div>
          </motion.div>
        )}

        {/* RESCHEDULE MODAL (Modification) */}
        {showReschedule && selectedBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ background: 'white', padding: '40px', borderRadius: '20px', width: '500px' }}>
                <h3 style={{ color: '#1e293b' }}>Modify / Reschedule</h3>
                <p style={{ color: '#64748b', marginBottom: '25px' }}>Current: {selectedBooking.flight_details.from} to {selectedBooking.flight_details.to}</p>
                <div style={{ marginBottom: '20px' }}>
                   <label style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>PICK NEW DATE</label>
                   <input type="date" className="agoda-input-box" style={{ width: '100%', marginTop: '5px' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                   <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowReschedule(false)}>Cancel</button>
                   <button className="btn btn-primary" style={{ flex: 1, background: 'var(--agoda-blue-dark)', color: 'white' }} onClick={handleReschedule}>Search Flights</button>
                </div>
             </div>
          </motion.div>
        )}

        {/* CANCEL MODAL (Refund System) */}
        {showCancel && selectedBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ background: 'white', padding: '40px', borderRadius: '20px', width: '450px', textAlign: 'center' }}>
                <div style={{ background: '#fee2e2', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <X size={32} color="#ef4444" />
                </div>
                <h3 style={{ color: '#1e293b' }}>Cancel Booking?</h3>
                <p style={{ color: '#64748b', marginBottom: '10px' }}>Are you sure you want to cancel your flight to {selectedBooking.flight_details.to}?</p>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', marginBottom: '25px' }}>
                   <span style={{ fontSize: '13px', color: '#64748b' }}>Estimated Refund Value:</span>
                   <div style={{ fontSize: '20px', fontWeight: '800', color: '#ef4444' }}>₹{selectedBooking.flight_details.price - 1500}</div>
                   <span style={{ fontSize: '11px', color: '#94a3b8' }}>(After ₹1,500 penalty)</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                   <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowCancel(false)}>No, Keep it</button>
                   <button className="btn btn-primary" style={{ flex: 1, background: '#ef4444', color: 'white', borderColor: '#ef4444' }} onClick={() => handleCancel(selectedBooking.id)}>Confirm Cancellation</button>
                </div>
             </div>
          </motion.div>
        )}

        {/* ADDON PURCHASE MODAL */}
        {showAddonModal && selectedAddon && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ background: 'white', padding: '40px', borderRadius: '20px', width: '450px', textAlign: 'center' }}>
                <div style={{ background: '#eff6ff', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--agoda-blue-dark)' }}>
                  {selectedAddon.icon}
                </div>
                <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Add {selectedAddon.title}?</h3>
                <p style={{ color: '#64748b', marginBottom: '25px' }}>{selectedAddon.desc}. This will be added to your active booking.</p>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                   <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddonModal(false)}>Cancel</button>
                   <button className="btn btn-primary" style={{ flex: 1, background: 'var(--agoda-blue-dark)', color: 'white', border: 'none' }} onClick={() => { alert(`${selectedAddon.title} added successfully!`); setShowAddonModal(false); }}>Pay ₹{selectedAddon.price}</button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Bookings;
