import React, { useState } from 'react';
import { FiBookmark, FiBriefcase, FiLayers, FiCode, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { companyService } from '../services/companyService';
import { profileService } from '../services/profileService';
import { JobCard } from '../components/JobCard';
import { CompanyCard } from '../components/CompanyCard';
import { SkillBadge } from '../components/SkillBadge';
import { EmptyState } from '../components/EmptyState';
import { useToast } from '../context/ToastContext';

export const SavedJobs = () => {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs', 'companies', 'skills'
  const [savedJobIds, setSavedJobIds] = useState(jobService.getSavedIds());
  const [savedCompanyIds, setSavedCompanyIds] = useState(companyService.getSavedIds());
  const [profile, setProfile] = useState(profileService.getProfile());
  const { showSuccess } = useToast();

  const allJobs = jobService.getAll();
  const allCompanies = companyService.getAll();

  const savedJobsList = allJobs.filter(j => savedJobIds.includes(j.id));
  const savedCompaniesList = allCompanies.filter(c => savedCompanyIds.includes(c.id));

  const handleToggleSaveJob = (id) => {
    const updated = jobService.toggleSave(id);
    setSavedJobIds(updated);
    showSuccess("Liste des offres enregistrées mise à jour.");
  };

  const handleToggleSaveCompany = (id) => {
    const updated = companyService.toggleSave(id);
    setSavedCompanyIds(updated);
    showSuccess("Liste des entreprises favorites mise à jour.");
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Espace Veille & Favoris
          </span>
          <h1 className="page-title">Opportunités Sauvegardées</h1>
          <p className="page-subtitle">
            Retrouvez rapidement les offres d'emploi, entreprises et technologies que vous suivez.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '3px', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'jobs' ? 'var(--color-gold)' : 'transparent',
              color: activeTab === 'jobs' ? '#070707' : 'var(--text-secondary)',
              fontWeight: 600
            }}
          >
            <FiBriefcase size={13} /> Offres ({savedJobsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('companies')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'companies' ? 'var(--color-gold)' : 'transparent',
              color: activeTab === 'companies' ? '#070707' : 'var(--text-secondary)',
              fontWeight: 600
            }}
          >
            <FiLayers size={13} /> Entreprises ({savedCompaniesList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'skills' ? 'var(--color-gold)' : 'transparent',
              color: activeTab === 'skills' ? '#070707' : 'var(--text-secondary)',
              fontWeight: 600
            }}
          >
            <FiCode size={13} /> Stack Favorite
          </button>
        </div>
      </div>

      {/* Tab 1: Saved Jobs */}
      {activeTab === 'jobs' && (
        savedJobsList.length === 0 ? (
          <EmptyState
            icon={FiBookmark}
            title="Aucune offre enregistrée"
            description="Parcourez le tableau d'opportunités et cliquez sur l'icône signet pour sauvegarder des offres."
            actionText="Explorer les offres"
            actionLink="/jobs"
          />
        ) : (
          <div className="grid-cards">
            {savedJobsList.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={true}
                onToggleSave={handleToggleSaveJob}
              />
            ))}
          </div>
        )
      )}

      {/* Tab 2: Saved Companies */}
      {activeTab === 'companies' && (
        savedCompaniesList.length === 0 ? (
          <EmptyState
            icon={FiLayers}
            title="Aucune entreprise enregistrée"
            description="Explorez l'annuaire des startups marocaines et ajoutez des entreprises à vos favoris."
            actionText="Explorer les entreprises"
            actionLink="/companies"
          />
        ) : (
          <div className="grid-cards">
            {savedCompaniesList.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                isSaved={true}
                onToggleSave={handleToggleSaveCompany}
              />
            ))}
          </div>
        )
      )}

      {/* Tab 3: Favorite Technologies & Stack */}
      {activeTab === 'skills' && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '0.5rem' }}>
            Technologies Suivies dans Votre Profil
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Ces technologies sont surveillées pour faire correspondre automatiquement les nouvelles offres de développement web.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {(profile.skills || []).map((skill) => (
              <SkillBadge key={skill} skill={skill} active size="md" />
            ))}
          </div>

          <Link to="/profile" className="btn btn-gold-outline btn-sm">
            Modifier mes technologies dans mon profil →
          </Link>
        </div>
      )}
    </div>
  );
};
