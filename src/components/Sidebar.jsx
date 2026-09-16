import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiGrid,
  FiBriefcase,
  FiLayers,
  FiSend,
  FiFileText,
  FiUser,
  FiBookmark,
  FiSettings,
  FiDatabase,
  FiCheckCircle,
  FiExternalLink
} from 'react-icons/fi';

const NAV_SECTIONS = [
  {
    title: 'Général',
    items: [
      { path: '/', label: 'Accueil', icon: FiHome },
      { path: '/dashboard', label: 'Tableau de bord', icon: FiGrid },
      { path: '/jobs', label: 'Opportunités Web', icon: FiBriefcase },
      { path: '/companies', label: 'Startups & Agences', icon: FiLayers }
    ]
  },
  {
    title: 'Candidatures',
    items: [
      { path: '/applications', label: 'Suivi Kanban', icon: FiCheckCircle },
      { path: '/assistant', label: 'Assistant Candidature', icon: FiSend, highlight: true },
      { path: '/cv-manager', label: 'Gestion CV', icon: FiFileText },
      { path: '/saved', label: 'Favoris & Veille', icon: FiBookmark }
    ]
  },
  {
    title: 'Mon Espace',
    items: [
      { path: '/profile', label: 'Profil Développeur', icon: FiUser },
      { path: '/admin', label: 'Gestion Données', icon: FiDatabase },
      { path: '/settings', label: 'Paramètres & API', icon: FiSettings }
    ]
  }
];

export const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 45
          }}
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          background: 'linear-gradient(180deg, #111111 0%, #0B0B0B 100%)',
          borderRight: '1px solid var(--border-subtle)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform var(--transition-normal)',
          overflowY: 'auto'
        }}
      >
        {/* Brand */}
        <div style={{
          padding: '1.5rem 1.5rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#070707',
            boxShadow: 'var(--shadow-gold)'
          }}>
            DA
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFF', lineHeight: 1.1 }}>
              DevApply <span style={{ color: 'var(--color-gold-light)' }}>MA</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              MAROC TECH HUB
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
          {NAV_SECTIONS.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.4rem 0.75rem 0.3rem'
              }}>
                {section.title}
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => {
                      if (window.innerWidth < 960) {
                        closeSidebar();
                      }
                    }}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      background: isActive
                        ? 'linear-gradient(90deg, rgba(155, 120, 66, 0.22) 0%, rgba(155, 120, 66, 0.05) 100%)'
                        : 'transparent',
                      borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                      marginBottom: '0.2rem',
                      transition: 'all var(--transition-fast)'
                    })}
                  >
                    <Icon size={17} style={{ color: item.highlight ? 'var(--color-gold-light)' : 'inherit' }} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.highlight && (
                      <span className="badge badge-gold" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem' }}>
                        IA
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer profile summary */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--color-gold-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--color-gold-light)'
          }}>
            Bac+2
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Full Stack Junior
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              OFPPT Digital Dev
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
