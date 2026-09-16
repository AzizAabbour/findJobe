import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PaperPlaneIcon,
  ClockIcon,
  CheckCircledIcon,
  BookmarkIcon,
  BackpackIcon
} from '@radix-ui/react-icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { StatCard } from '../components/StatCard';
import { JobCard } from '../components/JobCard';
import { profileService } from '../services/profileService';
import { applicationService, APPLICATION_STATUSES } from '../services/applicationService';
import { jobService } from '../services/jobService';
import { companyService } from '../services/companyService';
import { formatDate } from '../utils/formatDate';

export const Dashboard = () => {
  const [profile, setProfile] = useState(profileService.getProfile());
  const [stats, setStats] = useState(applicationService.getStats());
  const [applications, setApplications] = useState(applicationService.getAll());
  const [savedJobIds, setSavedJobIds] = useState(jobService.getSavedIds());
  const [savedCompanyIds, setSavedCompanyIds] = useState(companyService.getSavedIds());
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    const allJobs = jobService.getAll();
    const userSkills = profile.skills || ['React.js', 'Laravel', 'PHP', 'JavaScript'];

    const matched = allJobs.map(job => {
      const matchCount = (job.technologies || []).filter(tech =>
        userSkills.some(s => s.toLowerCase().includes(tech.toLowerCase()) || tech.toLowerCase().includes(s.toLowerCase()))
      ).length;
      return { ...job, matchScore: matchCount };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setRecommendedJobs(matched.slice(0, 3));
  }, [profile]);

  const recentApplications = applications.slice(0, 4);

  const chartData = [
    { name: 'Nouveau', count: stats.pending, color: 'var(--status-ready)' },
    { name: 'Envoyé', count: stats.sent, color: 'var(--status-sent)' },
    { name: 'Relance', count: stats.followUp, color: 'var(--status-followup)' },
    { name: 'Entretien', count: stats.interview, color: 'var(--status-interview)' },
    { name: 'Offre', count: stats.accepted, color: 'var(--status-accepted)' }
  ];

  const handleToggleSaveJob = (id) => {
    const updated = jobService.toggleSave(id);
    setSavedJobIds(updated);
  };

  return (
    <div className="page-container">
      {/* Welcome Page Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
            Tableau de Bord Candidat
          </span>
          <h1 className="page-title">
            Welcome back, {profile.fullName ? profile.fullName.split(' ')[0] : 'Aziz'} 👋
          </h1>
          <p className="page-subtitle">
            {profile.title} • {profile.diploma}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Link to="/assistant" className="btn btn-primary btn-sm">
            <PaperPlaneIcon width={13} height={13} /> Nouvelle Candidature
          </Link>
          <Link to="/jobs" className="btn btn-secondary btn-sm">
            <BackpackIcon width={13} height={13} /> Explorer les Offres
          </Link>
        </div>
      </div>

      {/* Primary KPI Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <StatCard
          title="Candidatures Envoyées"
          value={stats.sent}
          subtitle="Dossiers transmis"
          icon={PaperPlaneIcon}
          color="var(--status-sent)"
        />
        <StatCard
          title="En Préparation / Attente"
          value={stats.pending}
          subtitle="Brouillons & Prêts"
          icon={ClockIcon}
          color="var(--status-ready)"
        />
        <StatCard
          title="Entretiens Obtenus"
          value={stats.interview}
          subtitle="Visio & Présentiel"
          icon={CheckCircledIcon}
          color="var(--status-interview)"
        />
        <StatCard
          title="Offres Sauvegardées"
          value={savedJobIds.length}
          subtitle={`${savedCompanyIds.length} entreprises favorites`}
          icon={BookmarkIcon}
          color="var(--color-gold-light)"
        />
      </div>

      {/* Main Grid: Pipeline Chart & Recent Applications */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Pipeline Chart */}
        <div className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#FFF' }}>Activité du Pipeline</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Répartition de vos démarches actives</p>
            </div>
            <Link to="/applications" className="btn btn-gold-outline btn-sm" style={{ padding: '0.25rem 0.55rem', fontSize: '0.74rem' }}>
              Vue Kanban →
            </Link>
          </div>

          <div style={{ height: '200px', width: '100%', marginTop: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '0.8rem'
                  }}
                />
                <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications Activity */}
        <div className="glass-card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#FFF' }}>Dernières Candidatures</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Historique récent de vos envois</p>
            </div>
            <Link to="/applications" className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.55rem', fontSize: '0.74rem' }}>
              Tout afficher ({applications.length})
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Aucune candidature envoyée pour l'instant.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {recentApplications.map((app) => {
                const statusMeta = APPLICATION_STATUSES[app.status.replace('-', '_')] || {
                  label: app.status,
                  color: 'var(--color-gold)'
                };

                return (
                  <div
                    key={app.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      gap: '0.65rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '7px',
                          background: `${app.companyLogoColor || '#9B7842'}22`,
                          color: app.companyLogoColor || 'var(--color-gold-light)',
                          border: `1px solid ${app.companyLogoColor || '#9B7842'}44`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          flexShrink: 0
                        }}
                      >
                        {app.companyLogoText || 'CO'}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {app.jobTitle}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {app.companyName} • {app.city}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
                      <span
                        className="badge"
                        style={{
                          background: `${statusMeta.color}22`,
                          color: statusMeta.color,
                          border: `1px solid ${statusMeta.color}55`,
                          fontSize: '0.7rem'
                        }}
                      >
                        {statusMeta.label}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {formatDate(app.sentDate || app.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Opportunities for your profile */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.3rem' }}>Match Profil React & Laravel</span>
            <h2 style={{ fontSize: '1.3rem', color: '#FFF' }}>Opportunités Recommandées pour Vous</h2>
          </div>
          <Link to="/jobs" className="btn btn-secondary btn-sm">
            Voir toutes les opportunités →
          </Link>
        </div>

        <div className="grid-cards">
          {recommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onToggleSave={handleToggleSaveJob}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
