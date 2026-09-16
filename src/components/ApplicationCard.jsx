import React from 'react';
import { FiClock, FiCalendar, FiMail, FiEdit2, FiTrash2, FiAlertCircle, FiCheck, FiSend } from 'react-icons/fi';
import { formatDate, isFollowUpDue } from '../utils/formatDate';
import { APPLICATION_STATUSES } from '../services/applicationService';

export const ApplicationCard = ({
  application,
  onOpenDetails,
  onStatusChange,
  onDelete,
  onFollowUp
}) => {
  const {
    id,
    jobTitle,
    companyName,
    companyLogoText = 'CO',
    companyLogoColor = '#9B7842',
    city,
    status,
    applicationMethod,
    recipientEmail,
    sentDate,
    followUpDate,
    notes,
    cvUsed
  } = application;

  const currentStatusMeta = APPLICATION_STATUSES[status.replace('-', '_')] || {
    label: status,
    color: 'var(--color-gold)'
  };

  const followUpNeeded = status === 'FOLLOW-UP' || (status === 'SENT' && isFollowUpDue(followUpDate));

  return (
    <div
      onClick={onOpenDetails}
      className="glass-card"
      style={{
        padding: '1.1rem',
        cursor: 'pointer',
        borderLeft: `4px solid ${currentStatusMeta.color}`,
        marginBottom: '0.85rem'
      }}
    >
      {/* Header: Company + Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${companyLogoColor} 0%, #171717 140%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: '#FFFFFF',
              flexShrink: 0
            }}
          >
            {companyLogoText}
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', fontWeight: 600 }}>
              {companyName}
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
              {jobTitle}
            </div>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            style={{ color: 'var(--text-muted)', padding: '4px' }}
            title="Supprimer la candidature"
          >
            <FiTrash2 size={13} />
          </button>
        )}
      </div>

      {/* Meta: Method, Location, Dates */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
        <span className="badge badge-gray" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
          <FiMail size={10} /> {applicationMethod}
        </span>
        <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>•</span>
        <span>{city}</span>
      </div>

      {/* Follow-up notification alert banner */}
      {followUpNeeded && (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-xs)',
            padding: '0.4rem 0.6rem',
            fontSize: '0.75rem',
            color: '#FBBF24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FiAlertCircle size={12} /> Relance recommandée
          </span>
          {onFollowUp && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFollowUp(application);
              }}
              className="btn btn-sm"
              style={{
                background: 'var(--status-followup)',
                color: '#070707',
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                fontWeight: 700
              }}
            >
              Relancer
            </button>
          )}
        </div>
      )}

      {/* Notes preview */}
      {notes && (
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginBottom: '0.75rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          "{notes}"
        </p>
      )}

      {/* Footer Dates */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '0.6rem'
      }}>
        <span>
          {sentDate ? `Envoyé le ${formatDate(sentDate)}` : 'Créé le ' + formatDate(application.createdAt)}
        </span>
        {followUpDate && (
          <span style={{ color: followUpNeeded ? '#FBBF24' : 'inherit' }}>
            Relance: {formatDate(followUpDate)}
          </span>
        )}
      </div>
    </div>
  );
};
