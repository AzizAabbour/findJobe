import React from 'react';

export const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid-cards">
        {items.map((_, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: '1.5rem',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              animation: 'pulse 1.8s infinite ease-in-out'
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'var(--bg-elevated)' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ width: '60%', height: '16px', background: 'var(--bg-elevated)', borderRadius: '4px' }} />
                <div style={{ width: '40%', height: '12px', background: 'var(--bg-elevated)', borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ width: '100%', height: '40px', background: 'var(--bg-elevated)', borderRadius: '6px', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <div style={{ width: '25%', height: '24px', background: 'var(--bg-elevated)', borderRadius: '12px' }} />
              <div style={{ width: '25%', height: '24px', background: 'var(--bg-elevated)', borderRadius: '12px' }} />
              <div style={{ width: '25%', height: '24px', background: 'var(--bg-elevated)', borderRadius: '12px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((_, i) => (
        <div
          key={i}
          style={{
            height: '48px',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-sm)',
            animation: 'pulse 1.8s infinite ease-in-out'
          }}
        />
      ))}
    </div>
  );
};
