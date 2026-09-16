import React from 'react';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Rechercher par poste, entreprise, compétence...",
  count
}) => {
  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
      <MagnifyingGlassIcon
        width={18}
        height={18}
        style={{
          position: 'absolute',
          left: '1.1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-gold-light)',
          pointerEvents: 'none'
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          paddingLeft: '2.85rem',
          paddingRight: value ? '5.5rem' : '2.5rem',
          height: '44px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.92rem'
        }}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          style={{
            position: 'absolute',
            right: count !== undefined ? '3.8rem' : '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="Effacer la recherche"
        >
          <Cross2Icon width={15} height={15} />
        </button>
      )}
      {count !== undefined && (
        <span
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.74rem',
            color: 'var(--color-gold-light)',
            fontWeight: 700,
            background: 'var(--color-gold-subtle)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)'
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
};
