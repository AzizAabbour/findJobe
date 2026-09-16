import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
  PaperPlaneIcon,
  GlobeIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  BackpackIcon,
  ExternalLinkIcon,
  InfoCircledIcon,
  CheckCircledIcon,
  PersonIcon,
  LayersIcon
} from '@radix-ui/react-icons';
import { companyService } from '../services/companyService';
import { jobService } from '../services/jobService';
import { SkillBadge } from '../components/SkillBadge';
import { VerificationBadge } from '../components/VerificationBadge';
import { JobCard } from '../components/JobCard';
import { formatDate } from '../utils/formatDate';

export const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = companyService.getById(id);
    if (found) {
      setCompany(found);
      const jobs = jobService.getByCompanyId(id);
      setCompanyJobs(jobs);
      const savedIds = companyService.getSavedIds();
      setIsSaved(savedIds.includes(Number(id)));
    }
  }, [id]);

  if (!company) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Entreprise non trouvée</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          L'entreprise demandée n'existe pas ou a été retirée du répertoire.
        </p>
        <Link to="/companies" className="btn btn-primary">
          <ArrowLeftIcon width={14} height={14} /> Retour à l'annuaire
        </Link>
      </div>
    );
  }

  const handleToggleSave = () => {
    const updated = companyService.toggleSave(company.id);
    setIsSaved(updated.includes(Number(company.id)));
  };

  const handleSpontaneousApply = () => {
    navigate(`/assistant?companyId=${company.id}`);
  };

  return (
    <div className="page-container" style={{ maxWidth: '1050px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/companies" className="btn btn-secondary btn-sm">
          <ArrowLeftIcon width={13} height={13} /> Retour à l'annuaire
        </Link>
      </div>

      {/* Main Header Banner Card */}
      <div className="glass-card gold-border" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${company.logoColor || '#9B7842'} 0%, #151515 150%)`,
                border: `1px solid ${company.logoColor || '#9B7842'}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.35rem',
                color: '#FFFFFF',
                boxShadow: `0 4px 16px ${company.logoColor || '#9B7842'}44`,
                flexShrink: 0
              }}
            >
              {company.logoText || 'CO'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.6rem', color: '#FFF' }}>{company.name}</h1>
                <VerificationBadge verifiedAt={company.verifiedAt} sourceUrl={company.sourceUrl} isDemo={company.isDemo} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.3rem', flexWrap: 'wrap', fontSize: '0.82rem' }}>
                <span className="badge badge-gray">
                  <LayersIcon width={11} height={11} /> {company.category}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {company.city}, Maroc
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {company.companySize} collaborateurs
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button onClick={handleToggleSave} className="btn btn-secondary btn-sm">
              {isSaved ? <BookmarkFilledIcon width={13} height={13} /> : <BookmarkIcon width={13} height={13} />} {isSaved ? 'Enregistrée' : 'Sauvegarder'}
            </button>
            <button onClick={handleSpontaneousApply} className="btn btn-primary btn-sm">
              <PaperPlaneIcon width={13} height={13} /> Candidature Spontanée
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 320px',
        gap: '1.75rem',
        alignItems: 'start'
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Company Overview */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.85rem' }}>
              Présentation de l'Entreprise
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {company.description}
            </p>
          </div>

          {/* Technology Stack */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.85rem' }}>
              Technologies & Stack Technique
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {(company.technologies || []).map((tech) => (
                <SkillBadge key={tech} skill={tech} active />
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>
                Postes & Opportunités Actives ({companyJobs.length})
              </h3>
            </div>

            {companyJobs.length === 0 ? (
              <div style={{
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                textAlign: 'center',
                border: '1px solid var(--border-subtle)'
              }}>
                <InfoCircledIcon width={24} height={24} style={{ color: 'var(--color-gold-light)', margin: '0 auto 0.5rem' }} />
                <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '0.35rem' }}>
                  No verified opening currently available
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', maxWidth: '400px', margin: '0 auto 1rem' }}>
                  Cette entreprise n'a pas d'offre d'emploi active enregistrée pour le moment. Vous pouvez lui adresser une candidature spontanée ciblée.
                </p>
                {company.email && (
                  <button onClick={handleSpontaneousApply} className="btn btn-gold-outline btn-sm">
                    <PaperPlaneIcon width={12} height={12} /> Send spontaneous application
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {companyJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Official Recruitment Links */}
          <div className="glass-card" style={{ padding: '1.35rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '0.85rem' }}>
              Canaux Officiels de Recrutement
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {company.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 0.75rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <EnvelopeClosedIcon width={14} height={14} style={{ color: 'var(--color-gold-light)', flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden', minWidth: 0 }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Email Recrutement RH</div>
                    <div style={{ fontSize: '0.82rem', color: '#FFF', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {company.email}
                    </div>
                  </div>
                </div>
              )}

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'space-between', width: '100%', fontSize: '0.82rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <GlobeIcon width={13} height={13} /> Site Web Officiel
                  </span>
                  <ExternalLinkIcon width={12} height={12} />
                </a>
              )}

              {company.careersUrl && (
                <a
                  href={company.careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold-outline btn-sm"
                  style={{ justifyContent: 'space-between', width: '100%', fontSize: '0.82rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <BackpackIcon width={13} height={13} /> Page Carrières
                  </span>
                  <ExternalLinkIcon width={12} height={12} />
                </a>
              )}

              {company.linkedin && (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'space-between', width: '100%', fontSize: '0.82rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <LinkedInLogoIcon width={13} height={13} /> Page LinkedIn
                  </span>
                  <ExternalLinkIcon width={12} height={12} />
                </a>
              )}
            </div>
          </div>

          {/* Verification Audit Box */}
          <div className="glass-panel" style={{ padding: '1.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#34D399', fontWeight: 700, fontSize: '0.84rem', marginBottom: '0.4rem' }}>
              <CheckCircledIcon width={13} height={13} /> Traçabilité & Données Vérifiées
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '0.65rem' }}>
              Dernière vérification des coordonnées effectuée le <strong>{formatDate(company.verifiedAt)}</strong>.
            </p>
            {company.sourceUrl && (
              <a
                href={company.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.74rem', color: 'var(--color-gold-light)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Consulter la source officielle <ExternalLinkIcon width={10} height={10} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
