import React from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = MagnifyingGlassIcon,
  title = "Aucun élément trouvé",
  description = "Essayez de modifier vos filtres ou effectuez une recherche différente.",
  actionText,
  actionLink,
  onAction
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1.5rem 0'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(155, 120, 66, 0.1)',
          border: '1px solid var(--color-gold-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-gold-light)',
          marginBottom: '1rem'
        }}
      >
        <Icon width={24} height={24} />
      </div>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: '#FFF' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--text-muted)', maxWidth: '420px', fontSize: '0.88rem', marginBottom: actionText ? '1.25rem' : 0 }}>
        {description}
      </p>

      {actionText && (
        actionLink ? (
          <Link to={actionLink} className="btn btn-primary btn-sm">
            {actionText}
          </Link>
        ) : (
          <button onClick={onAction} className="btn btn-primary btn-sm">
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
