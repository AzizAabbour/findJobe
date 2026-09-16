import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiSend,
  FiBookmark,
  FiArrowLeft,
  FiCheckCircle,
  FiExternalLink,
  FiMail,
  FiShield,
  FiLayers,
  FiAlertCircle
} from 'react-icons/fi';
import { jobService } from '../services/jobService';
import { companyService } from '../services/companyService';
import { applicationService } from '../services/applicationService';
import { SkillBadge } from '../components/SkillBadge';
import { VerificationBadge } from '../components/VerificationBadge';
import { formatDate, getRelativeTime } from '../utils/formatDate';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [existingApp, setExistingApp] = useState(null);

  useEffect(() => {
    const foundJob = jobService.getById(id);
    if (foundJob) {
      setJob(foundJob);
      const foundCompany = companyService.getById(foundJob.companyId);
      setCompany(foundCompany);

      const saved = jobService.getSavedIds();
      setIsSaved(saved.includes(Number(id)));

      const allApps = applicationService.getAll();
      const app = allApps.find(a => String(a.jobId) === String(id));
      if (app) setExistingApp(app);
    }
  }, [id]);

  if (!job) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Offre d'emploi non trouvée</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          Cette offre n'existe plus ou a été retirée.
        </p>
        <Link to="/jobs" className="btn btn-primary">
          <FiArrowLeft /> Retour aux offres
        </Link>
      </div>
    );
  }

  const handleToggleSave = () => {
    const updated = jobService.toggleSave(job.id);
    setIsSaved(updated.includes(Number(job.id)));
  };

  const handleApplyClick = () => {
    navigate(`/assistant?jobId=${job.id}`);
  };

  return (
    <div className="page-container" style={{ maxWidth: '1050px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/jobs" className="btn btn-secondary btn-sm">
          <FiArrowLeft /> Retour à la liste des offres
        </Link>
      </div>

      {/* Already Applied Banner if exists */}
      {existingApp && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <FiCheckCircle size={20} style={{ color: '#10B981' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.92rem' }}>
                Vous avez déjà postulé à cette opportunité
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Statut actuel : <strong>{existingApp.status}</strong> • Envoyée le {formatDate(existingApp.sentDate || existingApp.createdAt)}
              </div>
            </div>
          </div>
          <Link to="/applications" className="btn btn-sm" style={{ background: '#10B981', color: '#070707', fontWeight: 700 }}>
            Voir dans le Kanban →
          </Link>
        </div>
      )}

      {/* Top Header Card */}
      <div className="glass-card gold-border" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${job.companyLogoColor || '#9B7842'} 0%, #171717 150%)`,
                border: `1px solid ${job.companyLogoColor || '#9B7842'}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.35rem',
                color: '#FFFFFF',
                flexShrink: 0
              }}
            >
              {job.companyLogoText || 'CO'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <Link
                  to={`/companies/${job.companyId}`}
                  style={{ fontSize: '1rem', color: 'var(--color-gold-light)', fontWeight: 600 }}
                >
                  {job.companyName}
                </Link>
                <VerificationBadge verifiedAt={job.verifiedAt} sourceUrl={job.sourceUrl} isDemo={job.isDemo} />
              </div>

              <h1 style={{ fontSize: '1.7rem', color: '#FFF', marginTop: '0.2rem', lineHeight: 1.2 }}>
                {job.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap', fontSize: '0.82rem' }}>
                <span className="badge badge-gray">
                  <FiMapPin size={11} /> {job.city} ({job.locationType || 'Sur site'})
                </span>
                <span className="badge badge-gold">
                  <FiBriefcase size={11} /> {job.jobType}
                </span>
                {job.salaryRange && (
                  <span className="badge badge-gray" style={{ color: '#34D399' }}>
                    <FiDollarSign size={11} /> {job.salaryRange}
                  </span>
                )}
                <span style={{ color: 'var(--text-muted)' }}>
                  Publié {getRelativeTime(job.postedDate)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={handleToggleSave} className="btn btn-secondary">
              <FiBookmark fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Enregistrée' : 'Sauvegarder'}
            </button>
            <button onClick={handleApplyClick} className="btn btn-primary btn-lg">
              <FiSend /> Postuler à cette offre
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 320px',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Job Description, Tasks, Requirements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Job Overview */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1rem' }}>
              Description du Poste
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1rem' }}>
                Missions & Responsabilités
              </h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem' }}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1rem' }}>
                Profil Recherché & Compétences
              </h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {job.requirements.map((req, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem' }}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1rem' }}>
              Technologies Requises
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(job.technologies || []).map((tech) => (
                <SkillBadge key={tech} skill={tech} active />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick info & Company Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Apply Summary */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', color: '#FFF', marginBottom: '1rem' }}>
              Postuler en toute simplicité
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1.25rem' }}>
              Utilisez notre assistant pour générer une lettre en français adaptée aux critères de cette offre et transmettre votre CV directement.
            </p>
            <button onClick={handleApplyClick} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <FiSend /> Ouvrir l'Assistant
            </button>
          </div>

          {/* Company Card Mini */}
          {company && (
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#FFF', marginBottom: '0.75rem' }}>
                À propos de l'Entreprise
              </h4>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-gold-light)' }}>
                {company.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', marginBottom: '0.75rem' }}>
                {company.city} • {company.category}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1rem' }}>
                {company.tagline || company.description?.slice(0, 140) + '...'}
              </p>
              <Link to={`/companies/${company.id}`} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                Voir la fiche entreprise →
              </Link>
            </div>
          )}

          {/* Source Verification Note */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
              <FiShield /> Donnée d'offre vérifiée
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Vérification effectuée le {formatDate(job.verifiedAt)}
            </div>
            {job.sourceUrl && (
              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--color-gold-light)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              >
                Source de l'annonce <FiExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
