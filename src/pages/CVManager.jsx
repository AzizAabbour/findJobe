import React, { useState } from 'react';
import { FiFileText, FiShield, FiCheckCircle, FiInfo, FiUploadCloud, FiAward } from 'react-icons/fi';
import { CVUploader } from '../components/CVUploader';
import { ConfirmModal } from '../components/ApplicationModal';
import { profileService } from '../services/profileService';
import { useToast } from '../context/ToastContext';

export const CVManager = () => {
  const [cvData, setCvData] = useState(profileService.getCV());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showSuccess, showInfo } = useToast();

  const handleSaveCV = (newCv) => {
    profileService.saveCV(newCv);
    setCvData(newCv);
  };

  const handleDeleteConfirm = () => {
    profileService.deleteCV();
    setCvData(null);
    showSuccess("CV supprimé avec succès.");
  };

  return (
    <div className="page-container" style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Document de Référence
          </span>
          <h1 className="page-title">Gestion de mon CV</h1>
          <p className="page-subtitle">
            Téléversez et gérez le Curriculum Vitae qui sera joint à vos candidatures aux startups et entreprises marocaines.
          </p>
        </div>
      </div>

      {/* Main CV Component */}
      <div style={{ marginBottom: '2.5rem' }}>
        <CVUploader
          cvData={cvData}
          onSaveCV={handleSaveCV}
          onDeleteCV={() => setIsDeleteModalOpen(true)}
        />
      </div>

      {/* Security & Privacy Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ color: '#34D399', fontSize: '1.5rem', marginTop: '2px', flexShrink: 0 }}>
          <FiShield />
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', color: '#FFF', marginBottom: '0.25rem' }}>
            Confidentialité & Sécurité des données
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Votre CV est stocké de manière sécurisée dans votre navigateur local. Il n'est jamais publié sur internet ni partagé publiquement. Il n'est transmis qu'aux recruteurs officiels lors de l'envoi explicite d'une candidature par email ou formulaire.
          </p>
        </div>
      </div>

      {/* Best practices for Moroccan Junior Web Devs */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiAward style={{ color: 'var(--color-gold-light)' }} /> Conseils Recrutement Tech Maroc pour Lauréats Bac+2
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'var(--bg-elevated)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--color-gold-light)', marginBottom: '0.4rem' }}>
              1. Mettez en avant vos Projets Pratiques
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Les startups marocaines valorisent les projets concrets (ex: E-commerce avec React/Laravel, Dashboard de gestion, API REST documentée). Insérez des liens directs vers vos dépôts GitHub et démos en ligne.
            </p>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--color-gold-light)', marginBottom: '0.4rem' }}>
              2. Clarté de la Stack Technique
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Spécifiez explicitement vos compétences fondamentales : React.js, PHP / Laravel, MySQL, JavaScript ES6+, Git, Docker et intégration responsive.
            </p>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--color-gold-light)', marginBottom: '0.4rem' }}>
              3. Format PDF Épuré & Optimisé
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Conservez un CV d'une seule page, bien structuré et lisible par les outils ATS de recrutement, nommé idéalement <code>CV_Prenom_Nom.pdf</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Supprimer votre CV ?"
        message="Cette action retirera votre CV actuel de la plateforme. Vous devrez en importer un nouveau pour postuler."
        confirmText="Supprimer le CV"
        isDanger={true}
      />
    </div>
  );
};
