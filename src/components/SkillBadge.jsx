import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

export const SkillBadge = ({ skill, onRemove, clickable, active, onClick, size = 'md' }) => {
  const isRemovable = typeof onRemove === 'function';

  return (
    <span
      onClick={clickable ? onClick : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: size === 'sm' ? '0.18rem 0.5rem' : '0.3rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontSize: size === 'sm' ? '0.74rem' : '0.8rem',
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
            padding: '1px',
            marginLeft: '2px',
            borderRadius: '50%'
          }}
          aria-label={`Supprimer ${skill}`}
        >
          <Cross2Icon width={11} height={11} />
        </button>
      )}
    </span>
  );
};
