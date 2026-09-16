import React, { useRef, useState } from 'react';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiDownload, FiTrash2, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { validateCVFile } from '../utils/validators';
import { formatDate } from '../utils/formatDate';
import { useToast } from '../context/ToastContext';

export const CVUploader = ({ cvData, onSaveCV, onDeleteCV }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { showSuccess, showError } = useToast();

  const handleFile = (file) => {
    setErrorMsg('');
    const validation = validateCVFile(file);
    if (!validation.valid) {
      setErrorMsg(validation.error);
      showError(validation.error);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newCv = {
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        status: "Ready for applications",
        dataUrl: e.target.result // Base64 data URL
      };
      onSaveCV(newCv);
      showSuccess(`CV "${file.name}" importé avec succès !`);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDownload = () => {
    if (!cvData) return;
    if (cvData.dataUrl) {
      const link = document.createElement('a');
      link.href = cvData.dataUrl;
      link.download = cvData.fileName || 'CV_Abdelaziz_Aabbour.pdf';
      link.click();
    } else {
      // Mock download dummy blob if seed data without actual PDF
      const blob = new Blob(["DevApply Demo CV - Abdelaziz Aabbour\nFull Stack Web Developer"], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = cvData.fileName || 'CV_Abdelaziz_Aabbour.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '420 Ko';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} Ko`;
    return `${(kb / 1024).toFixed(2)} Mo`;
  };

  return (
    <div style={{ width: '100%' }}>
      {cvData ? (
        /* CV Active Display */
        <div className="glass-card gold-border" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'rgba(155, 120, 66, 0.15)',
                  border: '1px solid var(--color-gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-light)',
                  flexShrink: 0
                }}
              >
                <FiFileText size={28} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.15rem', color: '#FFF' }}>
                    {cvData.fileName || 'CV_Abdelaziz_Aabbour.pdf'}
                  </h4>
                  <span className="badge badge-verified">
                    <FiCheckCircle size={11} /> {cvData.status || 'Ready for applications'}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'flex', gap: '1rem' }}>
                  <span>Taille : {formatFileSize(cvData.fileSize)}</span>
                  <span>•</span>
                  <span>Mis à jour le : {formatDate(cvData.uploadDate)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={handleDownload}
                className="btn btn-secondary btn-sm"
                title="Télécharger une copie de mon CV"
              >
                <FiDownload /> Télécharger
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="btn btn-gold-outline btn-sm"
                title="Remplacer par un nouveau fichier PDF"
              >
                <FiRefreshCw /> Remplacer
              </button>
              <button
                type="button"
                onClick={onDeleteCV}
                className="btn btn-danger btn-sm"
                title="Supprimer mon CV"
              >
                <FiTrash2 /> Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Upload Area */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="glass-panel"
          style={{
            border: `2px dashed ${dragActive ? 'var(--color-gold)' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragActive ? 'rgba(155, 120, 66, 0.08)' : 'rgba(21, 21, 21, 0.6)',
            transition: 'all var(--transition-normal)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(155, 120, 66, 0.12)',
              border: '1px solid var(--color-gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gold-light)',
              margin: '0 auto 1.25rem'
            }}
          >
            <FiUploadCloud size={32} />
          </div>

          <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '0.5rem' }}>
            Importer votre CV (Format PDF)
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
            Glissez-déposez votre CV ici ou cliquez pour parcourir vos fichiers.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span>✓ Format accepté : <strong>PDF uniquement</strong></span>
            <span>•</span>
            <span>✓ Taille max : <strong>5 Mo</strong></span>
            <span>•</span>
            <span>🔒 Stockage sécurisé et privé</span>
          </div>

          {errorMsg && (
            <div style={{
              marginTop: '1.25rem',
              color: '#F87171',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}>
              <FiAlertCircle /> {errorMsg}
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};
