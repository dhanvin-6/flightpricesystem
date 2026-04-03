import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, User, Mail, Phone, Plane, ChevronRight, CreditCard, ShieldCheck } from 'lucide-react';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialMethod = queryParams.get('method') || 'Credit / Debit Card';
  const bookingId = queryParams.get('bookingId');
  
  const [paymentMethod, setPaymentMethod] = useState(initialMethod);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        if (bookingId) {
          navigate(`/bookings?paid=${bookingId}`);
        } else {
          navigate('/bookings');
        }
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <ShieldCheck size={64} color="#22c55e" style={{ marginBottom: '20px' }} />
        <h2 style={{ fontSize: '28px', color: '#1e293b', fontWeight: '800', marginBottom: '10px' }}>Payment Successful!</h2>
        <p style={{ color: '#64748b' }}>Your tickets have been securely booked. Redirecting to your bookings...</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '40px 0', fontFamily: 'Inter, sans-serif' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* LEFT COLUMN: PAYMENT FORMS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Contact Details */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>Contact details</h3>
            <div style={{ display: 'flex', gap: '15px', color: '#64748b', fontSize: '14px' }}>
               <User size={18} color="#94a3b8" />
               <div>
                 <div style={{ color: '#475569', fontWeight: '600' }}>DHANVIN RATHEESH</div>
                 <div>dhanvinratheesh@gmail.com</div>
                 <div>+91 09886942030</div>
               </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>Passenger details</h3>
            <div style={{ display: 'flex', gap: '15px', color: '#64748b', fontSize: '14px', alignItems: 'center' }}>
               <User size={18} color="#94a3b8" />
               <div style={{ color: '#475569', fontWeight: '500' }}>DHANVIN RATHEESH</div>
            </div>
          </div>

          {/* Secure Payment */}
          <div style={{ background: 'white', border: '1px solid #3b82f6', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '25px', background: 'rgba(59, 130, 246, 0.05)', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <Lock size={18} color="#3b82f6" />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Secure payment</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600', margin: 0 }}>All card information is fully encrypted, secure and protected.</p>
            </div>
            
            <div style={{ background: '#ecfdf5', padding: '10px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
              We accept multiple payment methods for this booking.
            </div>

            <div style={{ padding: '0 25px' }}>
              {/* Option 1 */}
              <div 
                onClick={() => setPaymentMethod('Credit / Debit Card')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: paymentMethod === 'Credit / Debit Card' ? '#f8fafc' : 'white' }}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: paymentMethod === 'Credit / Debit Card' ? '6px solid #3b82f6' : '1px solid #cbd5e1' }} />
                  <div>
                    <div style={{ color: paymentMethod === 'Credit / Debit Card' ? '#3b82f6' : '#1e293b', fontWeight: '600', fontSize: '14px' }}>Credit/debit card</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>(No processing fee)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: '800', fontStyle: 'italic', color: '#1a1f71', background: '#f8fafc', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '11px' }}>VISA</span>
                  <span style={{ fontWeight: '800', color: '#ea001b', background: '#f8fafc', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '11px' }}>MC</span>
                  <span style={{ fontWeight: '800', color: '#0055a5', background: '#f8fafc', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '11px' }}>RuPay</span>
                </div>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => setPaymentMethod('Net Banking')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: paymentMethod === 'Net Banking' ? '#f8fafc' : 'white' }}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: paymentMethod === 'Net Banking' ? '6px solid #3b82f6' : '1px solid #cbd5e1' }} />
                  <div>
                    <div style={{ color: paymentMethod === 'Net Banking' ? '#3b82f6' : '#1e293b', fontWeight: '600', fontSize: '14px' }}>Online banking</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>(No processing fee)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <CreditCard size={20} color="#64748b" />
                </div>
              </div>

              {/* Option 3 */}
              <div 
                onClick={() => setPaymentMethod('UPI')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: paymentMethod === 'UPI' ? '#f8fafc' : 'white' }}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: paymentMethod === 'UPI' ? '6px solid #3b82f6' : '1px solid #cbd5e1' }} />
                  <div>
                    <div style={{ color: paymentMethod === 'UPI' ? '#3b82f6' : '#1e293b', fontWeight: '600', fontSize: '14px' }}>UPI</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>(No processing fee)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: '800', fontStyle: 'italic', color: '#0f172a', background: '#f8fafc', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px' }}>UPI</span>
                </div>
              </div>
              
            </div>

            <div style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', background: '#f8fafc' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                By proceeding, I agree to Flight Price Agent's <span style={{ color: '#3b82f6', cursor: 'pointer' }}>Terms of Use</span> and <span style={{ color: '#3b82f6', cursor: 'pointer' }}>Privacy Policy</span>.
              </div>
              <button 
                onClick={handlePay}
                disabled={processing}
                style={{ background: processing ? '#93c5fd' : '#3b82f6', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {processing ? 'PROCESSING...' : 'PAY NOW'} <Lock size={14} />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           
           <div style={{ background: '#f0fdfa', borderRadius: '12px', padding: '20px', border: '1px solid #ccfbf1' }}>
             <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>DEL to BLR</h3>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '15px' }}>
               <Plane size={14} /> FLIGHT <span style={{ opacity: 0.6 }}>1 adult</span>
             </div>
             
             <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
               <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Depart - Fri, Apr 3, 2026</div>
               <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                 <div style={{ width: '30px', height: '30px', background: '#fffbeb', borderRadius: '4px', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span style={{ color: '#d97706', fontSize: '10px', fontWeight: '800' }}>SJ</span>
                 </div>
                 <div>
                   <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>DEL 19:20 ➔ BLR 22:15</div>
                   <div style={{ color: '#64748b', fontSize: '12px' }}>SpiceJet</div>
                 </div>
               </div>
             </div>
             
             <div style={{ textAlign: 'right', marginTop: '15px' }}>
               <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View flight details & policies <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginBottom: '2px' }} /></span>
             </div>
           </div>

           <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
             <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Price breakdown</h3>
             
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#1e293b', fontWeight: '600' }}>
               <span>Adult</span>
               <span>Rs. 8,469.45 x 1</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#64748b' }}>
               <span>Base fare</span>
               <span>Rs. 6,876.00</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '12px', color: '#64748b' }}>
               <span>Taxes and fees</span>
               <span>Rs. 1,593.45</span>
             </div>
             
             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '20px', fontSize: '14px', color: '#1e293b', fontWeight: '600' }}>
               <span>Discount</span>
               <span style={{ color: '#10b981' }}>-Rs. 395.26</span>
             </div>
             
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <span style={{ fontSize: '16px', color: '#1e293b', fontWeight: '700' }}>Total</span>
               <div style={{ textAlign: 'right' }}>
                 <div style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Rs. 8,469.45</div>
                 <div style={{ fontSize: '24px', fontWeight: '800', color: '#ea001b' }}>Rs. 8,074.19</div>
               </div>
             </div>
             
           </div>

        </div>

      </div>
    </div>
  );
}

export default Payment;
