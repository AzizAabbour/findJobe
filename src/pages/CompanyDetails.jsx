import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiExternalLink,
  FiUsers,
  FiLayers,
  FiBriefcase,
  FiCheckCircle,
  FiBookmark,
  FiSend,
  FiArrowLeft,
  FiShield,
  FiInfo
} from 'react-icons/fi';
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
          <FiArrowLeft /> Retour à l'annuaire
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
    <div className="page-container" style={{ maxWidth: '1100px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/companies" className="btn btn-secondary btn-sm">
          <FiArrowLeft /> Retour à l'annuaire
        </Link>
      </div>

      {/* Main Header Banner Card */}
      <div className="glass-card gold-border" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${company.logoColor || '#9B7842'} 0%, #151515 150%)`,
                border: `1px solid ${company.logoColor || '#9B7842'}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.5rem',
                color: '#FFFFFF',
                boxShadow: `0 6px 20px ${company.logoColor || '#9B7842'}44`,
                flexShrink: 0
              }}
            >
              {company.logoText || 'CO'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.75rem', color: '#FFF' }}>{company.name}</h1>
                <VerificationBadge verifiedAt={company.verifiedAt} sourceUrl={company.sourceUrl} isDemo={company.isDemo} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                <span className="badge badge-gray">
                  <FiLayers size={11} /> {company.category}
                </span>
                <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FiMapPin size={13} /> {company.city}, Maroc
                </span>
                <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FiUsers size={13} /> {company.companySize} collaborateurs
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={handleToggleSave} className="btn btn-secondary">
              <FiBookmark fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Enregistrée' : 'Sauvegarder'}
            </button>
            <button onClick={handleSpontaneousApply} className="btn btn-primary">
              <FiSend /> Candidature Spontanée
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout: Details & Sidebar Links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Company Overview */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1rem' }}>
              Présentation de l'Entreprise
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
              {company.description}
            </p>
          </div>

          {/* Technology Stack */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1rem' }}>
              Technologies & Stack Technique
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(company.technologies || []).map((tech) => (
                <SkillBadge key={tech} skill={tech} active />
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#FFF' }}>
                Postes & Opportunités Actives ({companyJobs.length})
              </h3>
            </div>

            {companyJobs.length === 0 ? (
              <div style={{
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid var(--border-subtle)'
              }}>
                <FiInfo size={28} style={{ color: 'var(--color-gold-light)', marginBottom: '0.75rem' }} />
                <h4 style={{ color: '#FFF', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  No verified opening currently available
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
                  Cette entreprise n'a pas d'offre d'emploi active enregistrée pour le moment. Vous pouvez lui adresser une candidature spontanée ciblée.
                </p>
                {company.email && (
                  <button onClick={handleSpontaneousApply} className="btn btn-gold-outline btn-sm">
                    <FiSend size={14} /> Send spontaneous application
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {companyJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Official Channels & Verification */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Official Recruitment Links */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', color: '#FFF', marginBottom: '1rem' }}>
              Canaux Officiels de Recrutement
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {company.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <FiMail style={{ color: 'var(--color-gold-light)', flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden', minWidth: 0 }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Email Recrutement RH</div>
                    <div style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', width: '100%', fontSize: '0.85rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiGlobe /> Site Web Officiel
                  </span>
                  <FiExternalLink size={13} />
                </a>
              )}

              {company.careersUrl && (
                <a
                  href={company.careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold-outline"
                  style={{ justifyContent: 'space-between', width: '100%', fontSize: '0.85rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiBriefcase /> Page Carrières Officielle
                  </span>
                  <FiExternalLink size={13} />
                </a>
              )}

              {company.linkedin && (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', width: '100%', fontSize: '0.85rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiLinkedin /> Page LinkedIn
                  </span>
                  <FiExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Verification Audit Box */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
              <FiShield /> Traçabilité & Données Vérifiées
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '0.75rem' }}>
              Dernière vérification des coordonnées effectuée le <strong>{formatDate(company.verifiedAt)}</strong>.
            </p>
            {company.sourceUrl && (
              <a
                href={company.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--color-gold-light)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              >
                Consulter la source officielle <FiExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
