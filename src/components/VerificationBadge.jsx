import React from 'react';
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { formatDate } from '../utils/formatDate';

export const VerificationBadge = ({ verifiedAt, sourceUrl, isDemo }) => {
  const isRecent = () => {
    if (!verifiedAt) return false;
    const date = new Date(verifiedAt);
    const now = new Date();
    const diffDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffDays <= 60;
  };

  const isVerified = Boolean(verifiedAt && isRecent());

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      {isVerified ? (
        <span
          className="badge badge-verified"
          title={`Source vérifiée le ${formatDate(verifiedAt)}`}
        >
          <CheckCircledIcon width={12} height={12} />
          <span>Vérifié {formatDate(verifiedAt)}</span>
        </span>
      ) : (
        <span
          className="badge badge-warning"
          title="Cette offre nécessite une nouvelle vérification"
        >
          <ExclamationTriangleIcon width={12} height={12} />
          <span>À vérifier</span>
        </span>
      )}

      {isDemo && (
        <span
          className="badge"
          style={{
            background: 'rgba(155, 120, 66, 0.15)',
            color: 'var(--color-gold-light)',
            border: '1px dashed var(--color-gold-border)',
            fontSize: '0.66rem'
          }}
          title="Donnée de démonstration vérifiée pour l'écosystème marocain"
        >
          DEMO
        </span>
      )}
    </div>
  );
};
