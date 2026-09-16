import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSend, FiFileText, FiAlertCircle, FiCheck, FiMail } from 'react-icons/fi';

export const ApplicationModal = ({
  isOpen,
  onClose,
  onConfirmSend,
  companyName,
  jobTitle,
  recipientEmail,
  message,
  cvName,
  isSending = false
}) => {
  const [confirmedByUser, setConfirmedByUser] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>Confirmation d'envoi</span>
            <h3 style={{ fontSize: '1.35rem', color: '#FFF' }}>Postuler chez {companyName}</h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-icon" aria-label="Fermer">
            <FiX size={18} />
          </button>
        </div>

        {/* Recipient & Job metadata */}
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '1rem',
          marginBottom: '1.25rem',
          fontSize: '0.88rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Poste ciblé :</span>
            <span style={{ fontWeight: 600, color: '#FFF' }}>{jobTitle}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Destinataire officiel :</span>
            <span style={{ fontWeight: 600, color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiMail size={12} /> {recipientEmail || 'Email RH vérifié'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>CV joint :</span>
            <span style={{ fontWeight: 600, color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiFileText size={12} /> {cvName || 'CV_Abdelaziz_Aabbour.pdf'}
            </span>
          </div>
        </div>

        {/* Message preview snippet */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            Aperçu de la lettre de candidature :
          </label>
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            maxHeight: '140px',
            overflowY: 'auto',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </div>
        </div>

        {/* Explicit confirmation checkbox */}
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem',
            cursor: 'pointer',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(155, 120, 66, 0.08)',
            border: '1px solid var(--color-gold-border)',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            userSelect: 'none'
          }}
        >
          <input
            type="checkbox"
            checked={confirmedByUser}
            onChange={(e) => setConfirmedByUser(e.target.checked)}
            style={{ marginTop: '0.2rem', accentColor: 'var(--color-gold)' }}
          />
          <span>
            Je confirme vouloir transmettre ma candidature personnalisée à l'adresse officielle de recrutement. Aucune candidature automatique non sollicitée n'est envoyée.
          </span>
        </label>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary" disabled={isSending}>
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirmSend}
            disabled={!confirmedByUser || isSending}
            className="btn btn-primary"
          >
            {isSending ? (
              <span>Transmission en cours...</span>
            ) : (
              <>
                <FiSend size={15} /> Confirmer & Envoyer
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Êtes-vous sûr ?",
  message = "Cette action est irréversible.",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  isDanger = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '440px' }}
      >
        <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '0.6rem' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.45 }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
