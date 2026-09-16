import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BackpackIcon,
  ClockIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
  PaperPlaneIcon
} from '@radix-ui/react-icons';
import { SkillBadge } from './SkillBadge';
import { VerificationBadge } from './VerificationBadge';
import { getRelativeTime } from '../utils/formatDate';

export const JobCard = ({ job, isSaved, onToggleSave, onQuickApply }) => {
  const navigate = useNavigate();
  const {
    id,
    companyId,
    companyName,
    companyLogoText = 'CO',
    companyLogoColor = '#9B7842',
    title,
    city,
    locationType,
    jobType,
    experienceLevel,
    salaryRange,
    technologies = [],
    postedDate,
    verifiedAt,
    sourceUrl,
    isDemo,
    description
  } = job;

  const handleApplyClick = (e) => {
    e.stopPropagation();
    if (onQuickApply) {
      onQuickApply(job);
    } else {
      navigate(`/assistant?jobId=${id}`);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header: Company + Title + Save */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '9px',
              background: `linear-gradient(135deg, ${companyLogoColor} 0%, #151515 150%)`,
              border: `1px solid ${companyLogoColor}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: '#FFFFFF',
              flexShrink: 0
            }}
          >
            {companyLogoText}
          </div>
          <div>
            <Link
              to={`/companies/${companyId}`}
              style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)', fontWeight: 600, display: 'block' }}
            >
              {companyName}
            </Link>
            <Link
              to={`/jobs/${id}`}
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.25,
                marginTop: '0.1rem',
                display: 'block'
              }}
            >
              {title}
            </Link>
          </div>
        </div>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(id)}
            className="btn btn-secondary btn-icon"
            style={{
              width: '30px',
              height: '30px',
              color: isSaved ? 'var(--color-gold-light)' : 'var(--text-muted)'
            }}
            title={isSaved ? "Retirer de mes offres enregistrées" : "Enregistrer cette offre"}
          >
            {isSaved ? <BookmarkFilledIcon width={14} height={14} /> : <BookmarkIcon width={14} height={14} />}
          </button>
        )}
      </div>

      {/* Meta tags: City, Location type, Job type, Salary */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem', fontSize: '0.76rem' }}>
        <span className="badge badge-gray">
          {city} ({locationType || 'Sur site'})
        </span>
        <span className="badge badge-gold">
          <BackpackIcon width={10} height={10} /> {jobType}
        </span>
        {experienceLevel && (
          <span className="badge badge-gray">
            {experienceLevel}
          </span>
        )}
        {salaryRange && (
          <span className="badge badge-gray" style={{ color: '#34D399' }}>
            {salaryRange}
          </span>
        )}
      </div>

      {/* Brief description snippet */}
      {description && (
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          marginBottom: '0.85rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {description}
        </p>
      )}

      {/* Required Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
        {technologies.slice(0, 5).map((tech) => (
          <SkillBadge key={tech} skill={tech} size="sm" />
        ))}
        {technologies.length > 5 && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '0.2rem' }}>
            +{technologies.length - 5}
          </span>
        )}
      </div>

      {/* Footer: Verification, Posted Date & Actions */}
      <div style={{
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <VerificationBadge verifiedAt={verifiedAt} sourceUrl={sourceUrl} isDemo={isDemo} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <ClockIcon width={11} height={11} /> {getRelativeTime(postedDate)}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link to={`/jobs/${id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}>
            Détails
          </Link>
          <button onClick={handleApplyClick} className="btn btn-primary btn-sm" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}>
            <PaperPlaneIcon width={11} height={11} /> Postuler
          </button>
        </div>
      </div>
    </div>
  );
};
