import React, { useState } from 'react';
import { FiSettings, FiMail, FiShield, FiDatabase, FiDownload, FiUpload, FiRotateCcw, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { isEmailConfigured } from '../services/emailService';
import { companyService } from '../services/companyService';
import { jobService } from '../services/jobService';
import { applicationService } from '../services/applicationService';
import { profileService } from '../services/profileService';
import { ConfirmModal } from '../components/ApplicationModal';
import { useToast } from '../context/ToastContext';

export const Settings = () => {
  const [emailConfigured, setEmailConfigured] = useState(isEmailConfigured());
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { showSuccess, showError, showInfo } = useToast();

  const handleExportData = () => {
    const backupData = {
      profile: profileService.getProfile(),
      cv: profileService.getCV(),
      companies: companyService.getAll(),
      jobs: jobService.getAll(),
      applications: applicationService.getAll(),
      savedJobs: jobService.getSavedIds(),
      savedCompanies: companyService.getSavedIds(),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devapply_morocco_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSuccess("Sauvegarde de vos données téléchargée avec succès !");
  };

  const handleImportData = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.profile) profileService.saveProfile(data.profile);
        if (data.cv) profileService.saveCV(data.cv);
        showSuccess("Données importées avec succès ! Rechargement...");
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        showError("Fichier de sauvegarde invalide.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetConfirm = () => {
    companyService.resetToDefault();
    jobService.resetToDefault();
    showSuccess("Base de données réinitialisée aux données de démonstration officielles !");
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Configuration & Système
          </span>
          <h1 className="page-title">Paramètres de la Plateforme</h1>
          <p className="page-subtitle">
            Gérez votre passerelle email, vos données locales et vos options de sécurité.
          </p>
        </div>
      </div>

      {/* Email Integration (EmailJS) Status */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiMail style={{ color: 'var(--color-gold-light)' }} /> Passerelle Email Officielle (EmailJS)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Permet la transmission sécurisée et directe de vos candidatures aux adresses de recrutement vérifiées.
            </p>
          </div>

          <div>
            {emailConfigured ? (
              <span className="badge badge-verified">
                <FiCheckCircle size={12} /> EmailJS Configuré & Prêt
              </span>
            ) : (
              <span className="badge badge-gold">
                Mode Simulation Actif (Sécurisé)
              </span>
            )}
          </div>
        </div>

        <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '0.75rem' }}>
            Pour activer l'envoi d'emails réels sans backend intermédiaire, créez un fichier <code>.env</code> à la racine du projet avec vos identifiants EmailJS :
          </p>
          <pre style={{ background: '#090909', padding: '0.75rem', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-gold-light)', overflowX: 'auto' }}>
{`VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_public_key`}
          </pre>
          <p style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ✓ En mode simulation, l'assistant prépare la candidature et l'enregistre parfaitement dans votre suivi Kanban sans dépendance externe requise.
          </p>
        </div>
      </div>

      {/* Local Storage & Data Management */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiDatabase style={{ color: 'var(--color-gold-light)' }} /> Gestion des Données & Sauvegarde Locale
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Toutes vos données (profil, CV, candidatures et notes) sont stockées dans votre navigateur. Vous pouvez exporter une copie JSON à tout moment.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={handleExportData} className="btn btn-secondary">
            <FiDownload /> Exporter mes données (.JSON)
          </button>

          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <FiUpload /> Importer une sauvegarde
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              style={{ display: 'none' }}
            />
          </label>

          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="btn btn-danger"
          >
            <FiRotateCcw /> Réinitialiser la base
          </button>
        </div>
      </div>

      {/* Security & Ethical Automation Policy */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiShield style={{ color: '#34D399' }} /> Charte Éthique & Respect des Plateformes
        </h3>
        <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.7 }}>
          <li>DevApply Morocco n'effectue aucun scraping non autorisé ni usurpation d'identité sur LinkedIn ou Indeed.</li>
          <li>Aucun envoi massif de spam automatisé n'est permis. Toute candidature nécessite une confirmation explicite du développeur.</li>
          <li>Chaque offre répertoriée comporte une date de vérification et un lien source pour garantir son authenticité.</li>
        </ul>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
        title="Réinitialiser toutes les données ?"
        message="Cette action réinitialisera les entreprises et offres à leur état initial. Vos candidatures et notes personnalisées seront conservées."
        confirmText="Réinitialiser"
        isDanger={true}
      />
    </div>
  );
};
