import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  DashboardIcon,
  BackpackIcon,
  LayersIcon,
  CheckCircledIcon,
  PaperPlaneIcon,
  FileTextIcon,
  BookmarkIcon,
  PersonIcon,
  GearIcon,
  MixerHorizontalIcon
} from '@radix-ui/react-icons';

const NAV_SECTIONS = [
  {
    title: 'Général',
    items: [
      { path: '/', label: 'Accueil', icon: HomeIcon },
      { path: '/dashboard', label: 'Tableau de bord', icon: DashboardIcon },
      { path: '/jobs', label: 'Opportunités Web', icon: BackpackIcon },
      { path: '/companies', label: 'Startups & Agences', icon: LayersIcon }
    ]
  },
  {
    title: 'Candidatures',
    items: [
      { path: '/applications', label: 'Suivi Kanban', icon: CheckCircledIcon },
      { path: '/assistant', label: 'Assistant Candidature', icon: PaperPlaneIcon, highlight: true },
      { path: '/cv-manager', label: 'Gestion CV', icon: FileTextIcon },
      { path: '/saved', label: 'Favoris & Veille', icon: BookmarkIcon }
    ]
  },
  {
    title: 'Mon Espace',
    items: [
      { path: '/profile', label: 'Profil Développeur', icon: PersonIcon },
      { path: '/admin', label: 'Gestion Données', icon: MixerHorizontalIcon },
      { path: '/settings', label: 'Paramètres & API', icon: GearIcon }
    ]
  }
];

export const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Mobile backdrop only active on screens <= 960px */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          background: '#111111',
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
          padding: '1.25rem 1.25rem 1rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            color: '#070707',
            boxShadow: 'var(--shadow-gold)'
          }}>
            DA
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.02rem', color: '#FFF', lineHeight: 1.1 }}>
              DevApply <span style={{ color: 'var(--color-gold-light)' }}>MA</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              MAROC TECH HUB
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '0.85rem 0.65rem', flex: 1 }}>
          {NAV_SECTIONS.map((section, idx) => (
            <div key={idx} style={{ marginBottom: '1.15rem' }}>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.35rem 0.65rem 0.25rem'
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
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.86rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      background: isActive
                        ? 'linear-gradient(90deg, rgba(155, 120, 66, 0.22) 0%, rgba(155, 120, 66, 0.05) 100%)'
                        : 'transparent',
                      borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                      marginBottom: '0.15rem',
                      transition: 'all var(--transition-fast)'
                    })}
                  >
                    <Icon width={17} height={17} style={{ color: item.highlight ? 'var(--color-gold-light)' : 'inherit', flexShrink: 0 }} />
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
          padding: '0.85rem 1rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--color-gold-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--color-gold-light)'
          }}>
            Bac+2
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Full Stack Junior
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              OFPPT Digital Dev
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
