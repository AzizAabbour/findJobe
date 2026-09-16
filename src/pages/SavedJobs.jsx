import React, { useState } from 'react';
import {
  BookmarkIcon,
  BackpackIcon,
  LayersIcon,
  CodeIcon
} from '@radix-ui/react-icons';
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
  const [activeTab, setActiveTab] = useState('jobs');
  const [savedJobIds, setSavedJobIds] = useState(jobService.getSavedIds());
  const [savedCompanyIds, setSavedCompanyIds] = useState(companyService.getSavedIds());
  const [profile] = useState(profileService.getProfile());
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
          <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
            Espace Veille & Favoris
          </span>
          <h1 className="page-title">Opportunités Sauvegardées</h1>
          <p className="page-subtitle">
            Retrouvez rapidement les offres d'emploi, entreprises et technologies que vous suivez.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '2px', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'jobs' ? 'var(--color-gold)' : 'transparent',
              color: activeTab === 'jobs' ? '#070707' : 'var(--text-secondary)',
              fontWeight: 600,
              padding: '0.25rem 0.6rem',
              fontSize: '0.76rem'
            }}
          >
            <BackpackIcon width={12} height={12} /> Offres ({savedJobsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('companies')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'companies' ? 'var(--color-gold)' : 'transparent',
              color: activeTab === 'companies' ? '#070707' : 'var(--text-secondary)',
              fontWeight: 600,
              padding: '0.25rem 0.6rem',
              fontSize: '0.76rem'
            }}
          >
            <LayersIcon width={12} height={12} /> Entreprises ({savedCompaniesList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'skills' ? 'var(--color-gold)' : 'transparent',
              color: activeTab === 'skills' ? '#070707' : 'var(--text-secondary)',
              fontWeight: 600,
              padding: '0.25rem 0.6rem',
              fontSize: '0.76rem'
            }}
          >
            <CodeIcon width={12} height={12} /> Stack Favorite
          </button>
        </div>
      </div>

      {/* Tab 1: Saved Jobs */}
      {activeTab === 'jobs' && (
        savedJobsList.length === 0 ? (
          <EmptyState
            icon={BookmarkIcon}
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
            icon={LayersIcon}
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
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.4rem' }}>
            Technologies Suivies dans Votre Profil
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Ces technologies sont surveillées pour faire correspondre automatiquement les nouvelles offres de développement web.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.75rem' }}>
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
