import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
  PaperPlaneIcon,
  BackpackIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons';
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
          <ArrowLeftIcon width={14} height={14} /> Retour aux offres
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
    <div className="page-container" style={{ maxWidth: '1000px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/jobs" className="btn btn-secondary btn-sm">
          <ArrowLeftIcon width={13} height={13} /> Retour à la liste des offres
        </Link>
      </div>

      {/* Already Applied Banner if exists */}
      {existingApp && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.15rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.65rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <CheckCircledIcon width={18} height={18} style={{ color: '#10B981' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.88rem' }}>
                Vous avez déjà postulé à cette opportunité
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Statut actuel : <strong>{existingApp.status}</strong> • Envoyée le {formatDate(existingApp.sentDate || existingApp.createdAt)}
              </div>
            </div>
          </div>
          <Link to="/applications" className="btn btn-sm" style={{ background: '#10B981', color: '#070707', fontWeight: 700, fontSize: '0.76rem' }}>
            Voir dans le Kanban →
          </Link>
        </div>
      )}

      {/* Top Header Card */}
      <div className="glass-card gold-border" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${job.companyLogoColor || '#9B7842'} 0%, #171717 150%)`,
                border: `1px solid ${job.companyLogoColor || '#9B7842'}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#FFFFFF',
                flexShrink: 0
              }}
            >
              {job.companyLogoText || 'CO'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
                <Link
                  to={`/companies/${job.companyId}`}
                  style={{ fontSize: '0.95rem', color: 'var(--color-gold-light)', fontWeight: 600 }}
                >
                  {job.companyName}
                </Link>
                <VerificationBadge verifiedAt={job.verifiedAt} sourceUrl={job.sourceUrl} isDemo={job.isDemo} />
              </div>

              <h1 style={{ fontSize: '1.55rem', color: '#FFF', marginTop: '0.2rem', lineHeight: 1.2 }}>
                {job.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.45rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
                <span className="badge badge-gray">
                  {job.city} ({job.locationType || 'Sur site'})
                </span>
                <span className="badge badge-gold">
                  <BackpackIcon width={10} height={10} /> {job.jobType}
                </span>
                {job.salaryRange && (
                  <span className="badge badge-gray" style={{ color: '#34D399' }}>
                    {job.salaryRange}
                  </span>
                )}
                <span style={{ color: 'var(--text-muted)' }}>
                  Publié {getRelativeTime(job.postedDate)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button onClick={handleToggleSave} className="btn btn-secondary btn-sm">
              {isSaved ? <BookmarkFilledIcon width={13} height={13} /> : <BookmarkIcon width={13} height={13} />} {isSaved ? 'Enregistrée' : 'Sauvegarder'}
            </button>
            <button onClick={handleApplyClick} className="btn btn-primary btn-sm">
              <PaperPlaneIcon width={13} height={13} /> Postuler à cette offre
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 300px',
        gap: '1.75rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Job Description, Tasks, Requirements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Job Overview */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.85rem' }}>
              Description du Poste
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.85rem' }}>
                Missions & Responsabilités
              </h3>
              <ul style={{ paddingLeft: '1.15rem', color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.65 }}>
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.85rem' }}>
                Profil Recherché & Compétences
              </h3>
              <ul style={{ paddingLeft: '1.15rem', color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.65 }}>
                {job.requirements.map((req, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.85rem' }}>
              Technologies Requises
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {(job.technologies || []).map((tech) => (
                <SkillBadge key={tech} skill={tech} active />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick info & Company Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Quick Apply Summary */}
          <div className="glass-card" style={{ padding: '1.35rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '0.75rem' }}>
              Postuler en toute simplicité
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1rem' }}>
              Utilisez notre assistant pour générer une lettre en français adaptée aux critères de cette offre et transmettre votre CV directement.
            </p>
            <button onClick={handleApplyClick} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              <PaperPlaneIcon width={13} height={13} /> Ouvrir l'Assistant
            </button>
          </div>

          {/* Company Card Mini */}
          {company && (
            <div className="glass-card" style={{ padding: '1.35rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '0.65rem' }}>
                À propos de l'Entreprise
              </h4>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-gold-light)' }}>
                {company.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem', marginBottom: '0.65rem' }}>
                {company.city} • {company.category}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.85rem' }}>
                {company.tagline || company.description?.slice(0, 130) + '...'}
              </p>
              <Link to={`/companies/${company.id}`} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
                Voir la fiche entreprise →
              </Link>
            </div>
          )}

          {/* Source Verification Note */}
          <div className="glass-panel" style={{ padding: '1.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34D399', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <CheckCircledIcon width={12} height={12} /> Donnée d'offre vérifiée
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
              Vérification effectuée le {formatDate(job.verifiedAt)}
            </div>
            {job.sourceUrl && (
              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.74rem', color: 'var(--color-gold-light)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Source de l'annonce <ExternalLinkIcon width={10} height={10} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
