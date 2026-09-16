import React from 'react';
import { Link } from 'react-router-dom';
import {
  GlobeIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
  ExternalLinkIcon,
  PersonIcon,
  LayersIcon
} from '@radix-ui/react-icons';
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
    <div className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top row: Logo, Name, Category & Bookmark */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${logoColor} 0%, #151515 150%)`,
              border: `1px solid ${logoColor}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: '#FFFFFF',
              boxShadow: `0 3px 10px ${logoColor}33`,
              flexShrink: 0
            }}
          >
            {logoText}
          </div>
          <div>
            <Link
              to={`/companies/${id}`}
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#FFFFFF',
                display: 'block',
                lineHeight: 1.2
              }}
            >
              {name}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
              <span className="badge badge-gray" style={{ fontSize: '0.68rem' }}>
                <LayersIcon width={10} height={10} /> {category}
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {city}
              </span>
            </div>
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
            title={isSaved ? "Retirer des favoris" : "Sauvegarder l'entreprise"}
          >
            {isSaved ? <BookmarkFilledIcon width={14} height={14} /> : <BookmarkIcon width={14} height={14} />}
          </button>
        )}
      </div>

      {/* Tagline / Short description */}
      <p style={{
        fontSize: '0.84rem',
        color: 'var(--text-secondary)',
        marginBottom: '0.85rem',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <PersonIcon width={12} height={12} /> {companySize} emp.
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
        {technologies.slice(0, 4).map((tech) => (
          <SkillBadge key={tech} skill={tech} size="sm" />
        ))}
        {technologies.length > 4 && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '0.2rem' }}>
            +{technologies.length - 4}
          </span>
        )}
      </div>

      {/* Footer: Verification & Action links */}
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
        <VerificationBadge verifiedAt={verifiedAt} sourceUrl={sourceUrl} isDemo={isDemo} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-icon"
              style={{ width: '28px', height: '28px' }}
              title="Site Web Officiel"
            >
              <GlobeIcon width={12} height={12} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-icon"
              style={{ width: '28px', height: '28px' }}
              title="Page LinkedIn"
            >
              <LinkedInLogoIcon width={12} height={12} />
            </a>
          )}
          <Link to={`/companies/${id}`} className="btn btn-gold-outline btn-sm" style={{ padding: '0.25rem 0.6rem', fontSize: '0.76rem' }}>
            Détails <ExternalLinkIcon width={11} height={11} />
          </Link>
        </div>
      </div>
    </div>
  );
};
