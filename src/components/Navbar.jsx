import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  HamburgerMenuIcon,
  Cross2Icon,
  PaperPlaneIcon,
  FileTextIcon
} from '@radix-ui/react-icons';
import { profileService } from '../services/profileService';

export const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const profile = profileService.getProfile();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      height: 'var(--navbar-height)',
      background: '#0E0E0E',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.75rem'
    }}>
      {/* Left side: Hamburger & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <button
          onClick={toggleSidebar}
          className="btn btn-secondary btn-icon"
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <Cross2Icon width={17} height={17} /> : <HamburgerMenuIcon width={17} height={17} />}
        </button>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '7px',
            background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.88rem',
            color: '#0B0B0B'
          }}>
            DA
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#FFF' }}>
            DevApply <span style={{ color: 'var(--color-gold-light)' }}>MA</span>
          </span>
        </Link>
      </div>

      {/* Middle: Quick Search */}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          flex: '0 1 420px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <MagnifyingGlassIcon
          width={16}
          height={16}
          style={{ position: 'absolute', left: '0.85rem', color: 'var(--text-muted)' }}
        />
        <input
          type="text"
          placeholder="Rechercher startup, techno (React, Laravel), ville..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            paddingLeft: '2.4rem',
            paddingRight: '1rem',
            height: '36px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.84rem'
          }}
        />
      </form>

      {/* Right: Quick actions & profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <Link
          to="/assistant"
          className="btn btn-gold-outline btn-sm"
        >
          <PaperPlaneIcon width={13} height={13} /> Assistant IA
        </Link>

        <Link
          to="/cv-manager"
          className="btn btn-secondary btn-sm"
          title="Mon CV"
        >
          <FileTextIcon width={13} height={13} /> CV
        </Link>

        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.3rem 0.65rem 0.3rem 0.35rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            transition: 'all var(--transition-fast)'
          }}
        >
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'var(--color-gold)',
            color: '#070707',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}>
            {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'A'}
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {profile.fullName ? profile.fullName.split(' ')[0] : 'Aziz'}
          </span>
        </Link>
      </div>
    </header>
  );
};
