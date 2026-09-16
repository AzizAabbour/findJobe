import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiFileText, FiSend, FiUser, FiBell } from 'react-icons/fi';
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
      background: 'rgba(11, 11, 11, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem'
    }}>
      {/* Left side: Hamburger & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggleSidebar}
          className="btn btn-secondary btn-icon"
          style={{ display: 'flex' }}
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            color: '#0B0B0B'
          }}>
            DA
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#FFF' }}>
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
        <FiSearch style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Rechercher startup, techno (React, Laravel), ville..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            paddingLeft: '2.5rem',
            paddingRight: '1rem',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.85rem'
          }}
        />
      </form>

      {/* Right: Quick actions & profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Link
          to="/assistant"
          className="btn btn-gold-outline btn-sm"
          style={{ display: 'none', md: 'inline-flex' }}
        >
          <FiSend /> Assistant IA
        </Link>

        <Link
          to="/cv-manager"
          className="btn btn-secondary btn-sm"
          title="Mon CV"
        >
          <FiFileText /> CV
        </Link>

        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.35rem 0.75rem 0.35rem 0.45rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            transition: 'all var(--transition-fast)'
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--color-gold)',
            color: '#070707',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.8rem'
          }}>
            {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'A'}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {profile.fullName ? profile.fullName.split(' ')[0] : 'Aziz'}
          </span>
        </Link>
      </div>
    </header>
  );
};
