import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiGlobe, FiLinkedin, FiMail, FiBookmark, FiExternalLink, FiUsers, FiLayers } from 'react-icons/fi';
import { SkillBadge } from './SkillBadge';
import { VerificationBadge } from './VerificationBadge';

export const CompanyCard = ({ company, isSaved, onToggleSave }) => {
  const {
    id,
    name,
    city,
    category,
    description,
    tagline,
    website,
    linkedin,
    careersUrl,
    email,
    technologies = [],
    companySize,
    openPositions = [],
    verifiedAt,
    sourceUrl,
    isDemo,
    logoColor = '#9B7842',
    logoText = 'CO'
  } = company;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top row: Logo, Name, Category & Bookmark */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${logoColor} 0%, #151515 150%)`,
              border: `1px solid ${logoColor}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              color: '#FFFFFF',
              boxShadow: `0 4px 14px ${logoColor}33`,
              flexShrink: 0
            }}
          >
            {logoText}
          </div>
          <div>
            <Link
              to={`/companies/${id}`}
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#FFFFFF',
                display: 'block',
                lineHeight: 1.2
              }}
            >
              {name}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>
                <FiLayers size={10} /> {category}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <FiMapPin size={11} /> {city}
              </span>
            </div>
          </div>
        </div>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(id)}
            className="btn btn-secondary btn-icon"
            style={{
              width: '32px',
              height: '32px',
              color: isSaved ? 'var(--color-gold-light)' : 'var(--text-muted)'
            }}
            title={isSaved ? "Retirer des favoris" : "Sauvegarder l'entreprise"}
          >
            <FiBookmark fill={isSaved ? 'currentColor' : 'none'} size={15} />
          </button>
        )}
      </div>

      {/* Tagline / Short description */}
      <p style={{
        fontSize: '0.86rem',
        color: 'var(--text-secondary)',
        marginBottom: '1rem',
        lineHeight: 1.45,
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {tagline || description}
      </p>

      {/* Meta chips: size & open positions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <FiUsers size={13} /> {companySize} emp.
        </span>
        <span>•</span>
        <span style={{
          color: openPositions.length > 0 ? '#34D399' : 'var(--text-muted)',
          fontWeight: openPositions.length > 0 ? 600 : 400
        }}>
          {openPositions.length > 0
            ? `${openPositions.length} poste${openPositions.length > 1 ? 's' : ''} ouvert${openPositions.length > 1 ? 's' : ''}`
            : 'Aucun poste actif'}
        </span>
      </div>

      {/* Technologies stack tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
        {technologies.slice(0, 4).map((tech) => (
          <SkillBadge key={tech} skill={tech} size="sm" />
        ))}
        {technologies.length > 4 && (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '0.2rem' }}>
            +{technologies.length - 4}
          </span>
        )}
      </div>

      {/* Footer: Verification & Action links */}
      <div style={{
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginTop: 'auto'
      }}>
        <VerificationBadge verifiedAt={verifiedAt} sourceUrl={sourceUrl} isDemo={isDemo} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-icon"
              style={{ width: '30px', height: '30px' }}
              title="Site Web Officiel"
            >
              <FiGlobe size={13} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-icon"
              style={{ width: '30px', height: '30px' }}
              title="Page LinkedIn"
            >
              <FiLinkedin size={13} />
            </a>
          )}
          <Link to={`/companies/${id}`} className="btn btn-gold-outline btn-sm">
            Détails <FiExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};
