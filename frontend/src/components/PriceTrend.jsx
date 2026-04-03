import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { motion } from 'framer-motion';

function PriceTrend({ prediction }) {
  if (!prediction) return null;

  const isRising = prediction.prediction === "Rising";
  const isFalling = prediction.prediction === "Falling";
  const isStable = prediction.prediction === "Stable";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`price-trend-card p-4 rounded-xl flex items-center justify-between mt-4 ${
        isRising ? 'bg-rose-500/10 border border-rose-500/20' : 
        isFalling ? 'bg-emerald-500/10 border border-emerald-500/20' : 
        'bg-slate-500/10 border border-slate-500/20'
      }`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '13px',
        background: isRising ? 'rgba(244, 63, 94, 0.1)' : isFalling ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)',
        border: `1px solid ${isRising ? 'rgba(244, 63, 94, 0.2)' : isFalling ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isRising && <TrendingUp size={16} color="#f43f5e" />}
        {isFalling && <TrendingDown size={16} color="#10b981" />}
        {isStable && <Minus size={16} color="#94a3b8" />}
        
        <div>
          <p style={{ fontWeight: '700', color: isRising ? '#f43f5e' : isFalling ? '#10b981' : '#f8fafc', marginBottom: '2px' }}>
            Price {prediction.prediction}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
            {prediction.confidence} Confidence • {prediction.recommendation}
          </p>
        </div>
      </div>
      
      <div title="AI Price Insight" style={{ cursor: 'pointer' }}>
        <Info size={14} color="var(--text-secondary)" />
      </div>
    </motion.div>
  );
}

export default PriceTrend;
