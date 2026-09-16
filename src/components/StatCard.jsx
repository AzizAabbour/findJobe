import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'var(--color-gold)', onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="glass-card"
      style={{
        padding: '1.4rem',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: color,
          opacity: 0.12,
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color
            }}
          >
            <Icon size={19} />
          </div>
        )}
      </div>

      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
        {value}
      </div>

      {subtitle && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
          {subtitle}
        </div>
      )}
    </motion.div>
  );
};
