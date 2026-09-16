import React from 'react';
import { FiSearch, FiFolder, FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = FiSearch,
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
        padding: '3.5rem 2rem',
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
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(155, 120, 66, 0.1)',
          border: '1px solid var(--color-gold-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-gold-light)',
          marginBottom: '1.25rem'
        }}
      >
        <Icon size={28} />
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: '#FFF' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--text-muted)', maxWidth: '420px', fontSize: '0.9rem', marginBottom: actionText ? '1.5rem' : 0 }}>
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
