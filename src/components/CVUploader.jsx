import React, { useRef, useState } from 'react';
import {
  UploadIcon,
  FileTextIcon,
  CheckCircledIcon,
  DownloadIcon,
  TrashIcon,
  ReloadIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons';
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
        dataUrl: e.target.result
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
        <div className="glass-card gold-border" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(155, 120, 66, 0.15)',
                  border: '1px solid var(--color-gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-light)',
                  flexShrink: 0
                }}
              >
                <FileTextIcon width={24} height={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.05rem', color: '#FFF' }}>
                    {cvData.fileName || 'CV_Abdelaziz_Aabbour.pdf'}
                  </h4>
                  <span className="badge badge-verified">
                    <CheckCircledIcon width={11} height={11} /> {cvData.status || 'Ready for applications'}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', gap: '0.75rem' }}>
                  <span>Taille : {formatFileSize(cvData.fileSize)}</span>
                  <span>•</span>
                  <span>Mis à jour le : {formatDate(cvData.uploadDate)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleDownload}
                className="btn btn-secondary btn-sm"
                title="Télécharger une copie de mon CV"
              >
                <DownloadIcon width={13} height={13} /> Télécharger
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="btn btn-gold-outline btn-sm"
                title="Remplacer par un nouveau fichier PDF"
              >
                <ReloadIcon width={13} height={13} /> Remplacer
              </button>
              <button
                type="button"
                onClick={onDeleteCV}
                className="btn btn-danger btn-sm"
                title="Supprimer mon CV"
              >
                <TrashIcon width={13} height={13} /> Supprimer
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
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragActive ? 'rgba(155, 120, 66, 0.08)' : 'var(--bg-surface)',
            transition: 'all var(--transition-normal)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(155, 120, 66, 0.12)',
              border: '1px solid var(--color-gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gold-light)',
              margin: '0 auto 1rem'
            }}
          >
            <UploadIcon width={26} height={26} />
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.4rem' }}>
            Importer votre CV (Format PDF)
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto 1rem' }}>
            Glissez-déposez votre CV ici ou cliquez pour parcourir vos fichiers.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            <span>✓ Format : <strong>PDF</strong></span>
            <span>•</span>
            <span>✓ Taille max : <strong>5 Mo</strong></span>
            <span>•</span>
            <span>🔒 Privé & sécurisé</span>
          </div>

          {errorMsg && (
            <div style={{
              marginTop: '1rem',
              color: '#F87171',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}>
              <ExclamationTriangleIcon width={13} height={13} /> {errorMsg}
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
