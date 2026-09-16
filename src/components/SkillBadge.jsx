import React from 'react';
import { FiX } from 'react-icons/fi';

export const SkillBadge = ({ skill, onRemove, clickable, active, onClick, size = 'md' }) => {
  const isRemovable = typeof onRemove === 'function';

  return (
    <span
      onClick={clickable ? onClick : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: size === 'sm' ? '0.2rem 0.55rem' : '0.35rem 0.85rem',
        borderRadius: 'var(--radius-full)',
        fontSize: size === 'sm' ? '0.75rem' : '0.82rem',
        fontWeight: 600,
        background: active
          ? 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)'
          : 'rgba(255, 255, 255, 0.05)',
        color: active ? '#0B0B0B' : 'var(--text-secondary)',
        border: active
          ? '1px solid var(--color-gold-light)'
          : '1px solid var(--border-subtle)',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'all var(--transition-fast)',
        userSelect: 'none'
      }}
    >
      <span>{skill}</span>
      {isRemovable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(skill);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: active ? '#0B0B0B' : 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px',
            marginLeft: '2px',
            borderRadius: '50%'
          }}
          aria-label={`Supprimer ${skill}`}
        >
          <FiX size={12} />
        </button>
      )}
    </span>
  );
};
