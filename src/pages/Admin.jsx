import React, { useState } from 'react';
import {
  FiDatabase,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiShield,
  FiExternalLink,
  FiX,
  FiSave,
  FiBriefcase,
  FiLayers
} from 'react-icons/fi';
import { companyService } from '../services/companyService';
import { jobService } from '../services/jobService';
import { VerificationBadge } from '../components/VerificationBadge';
import { ConfirmModal } from '../components/ApplicationModal';
import { useToast } from '../context/ToastContext';
import { formatDate } from '../utils/formatDate';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('companies'); // 'companies' or 'jobs'
  const [companies, setCompanies] = useState(companyService.getAll());
  const [jobs, setJobs] = useState(jobService.getAll());

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // { type: 'company'|'job', id }

  const { showSuccess, showError } = useToast();

  const refreshData = () => {
    setCompanies([...companyService.getAll()]);
    setJobs([...jobService.getAll()]);
  };

  // Verification helper: updates verifiedAt to today and updates in storage
  const handleVerifyCompany = (comp) => {
    const today = new Date().toISOString().split('T')[0];
    companyService.update(comp.id, { verifiedAt: today });
    refreshData();
    showSuccess(`Entreprise "${comp.name}" marquée comme vérifiée au ${today}`);
  };

  const handleVerifyJob = (job) => {
    const today = new Date().toISOString().split('T')[0];
    jobService.update(job.id, { verifiedAt: today });
    refreshData();
    showSuccess(`Offre "${job.title}" marquée comme vérifiée au ${today}`);
  };

  // Company Form submission
  const handleCompanySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const techArray = formData.get('technologies')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const compData = {
      name: formData.get('name'),
      city: formData.get('city'),
      category: formData.get('category'),
      website: formData.get('website'),
      linkedin: formData.get('linkedin'),
      careersUrl: formData.get('careersUrl'),
      email: formData.get('email'),
      companySize: formData.get('companySize'),
      description: formData.get('description'),
      tagline: formData.get('tagline'),
      sourceUrl: formData.get('sourceUrl') || "https://example.com",
      verifiedAt: formData.get('verifiedAt') || new Date().toISOString().split('T')[0],
      technologies: techArray
    };

    if (editingCompany) {
      companyService.update(editingCompany.id, compData);
      showSuccess("Entreprise mise à jour avec succès !");
    } else {
      companyService.create(compData);
      showSuccess("Nouvelle entreprise ajoutée au répertoire !");
    }

    setIsCompanyModalOpen(false);
    setEditingCompany(null);
    refreshData();
  };

  // Job Form submission
  const handleJobSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const techArray = formData.get('technologies')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const companyId = formData.get('companyId');
    const selectedComp = companies.find(c => String(c.id) === String(companyId));

    const jobData = {
      title: formData.get('title'),
      companyId: Number(companyId),
      companyName: selectedComp ? selectedComp.name : 'Entreprise',
      companyLogoText: selectedComp ? selectedComp.logoText : 'CO',
      companyLogoColor: selectedComp ? selectedComp.logoColor : '#9B7842',
      city: formData.get('city'),
      jobType: formData.get('jobType'),
      locationType: formData.get('locationType'),
      experienceLevel: formData.get('experienceLevel'),
      salaryRange: formData.get('salaryRange'),
      contactEmail: formData.get('contactEmail'),
      description: formData.get('description'),
      sourceUrl: formData.get('sourceUrl') || "https://example.com",
      verifiedAt: formData.get('verifiedAt') || new Date().toISOString().split('T')[0],
      technologies: techArray
    };

    if (editingJob) {
      jobService.update(editingJob.id, jobData);
      showSuccess("Offre d'emploi mise à jour !");
    } else {
      jobService.create(jobData);
      showSuccess("Nouvelle offre d'emploi créée avec succès !");
    }

    setIsJobModalOpen(false);
    setEditingJob(null);
    refreshData();
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'company') {
      companyService.delete(itemToDelete.id);
      showSuccess("Entreprise supprimée.");
    } else {
      jobService.delete(itemToDelete.id);
      showSuccess("Offre supprimée.");
    }
    setItemToDelete(null);
    refreshData();
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Gestion & Traçabilité des Données
          </span>
          <h1 className="page-title">Administration des Données</h1>
          <p className="page-subtitle">
            Ajoutez, éditez et certifiez les offres et entreprises avec leur source et date de vérification.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {activeTab === 'companies' ? (
            <button
              onClick={() => {
                setEditingCompany(null);
                setIsCompanyModalOpen(true);
              }}
              className="btn btn-primary"
            >
              <FiPlus /> Ajouter une entreprise
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingJob(null);
                setIsJobModalOpen(true);
              }}
              className="btn btn-primary"
            >
              <FiPlus /> Ajouter une offre
            </button>
          )}
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('companies')}
          className={`btn btn-sm ${activeTab === 'companies' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <FiLayers /> Entreprises ({companies.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`btn btn-sm ${activeTab === 'jobs' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <FiBriefcase /> Offres d'emploi ({jobs.length})
        </button>
      </div>

      {/* Table of Companies */}
      {activeTab === 'companies' && (
        <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem' }}>Entreprise</th>
                <th style={{ padding: '1rem' }}>Catégorie & Ville</th>
                <th style={{ padding: '1rem' }}>Email Recrutement</th>
                <th style={{ padding: '1rem' }}>Statut Vérification</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((comp) => (
                <tr key={comp.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#FFF' }}>
                    {comp.name}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    {comp.category} • {comp.city}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--color-gold-light)' }}>
                    {comp.email || 'Non spécifié'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <VerificationBadge verifiedAt={comp.verifiedAt} sourceUrl={comp.sourceUrl} isDemo={comp.isDemo} />
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleVerifyCompany(comp)}
                        className="btn btn-sm"
                        style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', padding: '0.3rem 0.6rem' }}
                        title="Marquer comme vérifiée aujourd'hui"
                      >
                        <FiCheckCircle /> Certifier
                      </button>
                      <button
                        onClick={() => {
                          setEditingCompany(comp);
                          setIsCompanyModalOpen(true);
                        }}
                        className="btn btn-secondary btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="Modifier"
                      >
                        <FiEdit2 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete({ type: 'company', id: comp.id });
                          setIsDeleteModalOpen(true);
                        }}
                        className="btn btn-danger btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="Supprimer"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table of Jobs */}
      {activeTab === 'jobs' && (
        <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem' }}>Intitulé du Poste</th>
                <th style={{ padding: '1rem' }}>Entreprise & Ville</th>
                <th style={{ padding: '1rem' }}>Contrat & Mode</th>
                <th style={{ padding: '1rem' }}>Statut Vérification</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#FFF' }}>
                    {job.title}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    {job.companyName} • {job.city}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                      {job.jobType} ({job.locationType || 'Sur site'})
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <VerificationBadge verifiedAt={job.verifiedAt} sourceUrl={job.sourceUrl} isDemo={job.isDemo} />
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleVerifyJob(job)}
                        className="btn btn-sm"
                        style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', padding: '0.3rem 0.6rem' }}
                        title="Marquer comme vérifiée aujourd'hui"
                      >
                        <FiCheckCircle /> Certifier
                      </button>
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setIsJobModalOpen(true);
                        }}
                        className="btn btn-secondary btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="Modifier"
                      >
                        <FiEdit2 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete({ type: 'job', id: job.id });
                          setIsDeleteModalOpen(true);
                        }}
                        className="btn btn-danger btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        title="Supprimer"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Add/Edit Company */}
      {isCompanyModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsCompanyModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '2rem', maxWidth: '650px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF' }}>
                {editingCompany ? "Modifier l'entreprise" : "Ajouter une entreprise certifiée"}
              </h3>
              <button onClick={() => setIsCompanyModalOpen(false)} className="btn btn-secondary btn-icon">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleCompanySubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Nom de l'entreprise *
                  </label>
                  <input type="text" name="name" defaultValue={editingCompany?.name || ''} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Ville *
                  </label>
                  <input type="text" name="city" defaultValue={editingCompany?.city || 'Casablanca'} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Catégorie *
                  </label>
                  <select name="category" defaultValue={editingCompany?.category || 'Startup'} style={{ width: '100%' }}>
                    <option value="Startup">Startup</option>
                    <option value="Software Company">Software Company</option>
                    <option value="Web Agency">Web Agency</option>
                    <option value="Digital Agency">Digital Agency</option>
                    <option value="IT Consulting">IT Consulting</option>
                    <option value="SaaS">SaaS</option>
                    <option value="FinTech">FinTech</option>
                    <option value="EdTech">EdTech</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Taille (effectif)
                  </label>
                  <input type="text" name="companySize" defaultValue={editingCompany?.companySize || '1-10'} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Email Recrutement RH
                  </label>
                  <input type="email" name="email" defaultValue={editingCompany?.email || ''} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Site Web Officiel
                  </label>
                  <input type="url" name="website" defaultValue={editingCompany?.website || ''} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    URL Page Carrières
                  </label>
                  <input type="url" name="careersUrl" defaultValue={editingCompany?.careersUrl || ''} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Page LinkedIn
                  </label>
                  <input type="url" name="linkedin" defaultValue={editingCompany?.linkedin || ''} style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Technologies (séparées par virgule)
                </label>
                <input
                  type="text"
                  name="technologies"
                  defaultValue={editingCompany?.technologies?.join(', ') || 'React, Laravel, PHP, MySQL'}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Description de l'entreprise
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingCompany?.description || ''}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-elevated)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    URL Source Vérifiée *
                  </label>
                  <input type="url" name="sourceUrl" defaultValue={editingCompany?.sourceUrl || 'https://example.com'} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Date de Vérification *
                  </label>
                  <input type="date" name="verifiedAt" defaultValue={editingCompany?.verifiedAt || new Date().toISOString().split('T')[0]} required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsCompanyModalOpen(false)} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiSave /> Enregistrer l'entreprise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Job */}
      {isJobModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsJobModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '2rem', maxWidth: '650px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF' }}>
                {editingJob ? "Modifier l'offre" : "Ajouter une offre d'emploi vérifiée"}
              </h3>
              <button onClick={() => setIsJobModalOpen(false)} className="btn btn-secondary btn-icon">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleJobSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Intitulé du poste *
                  </label>
                  <input type="text" name="title" defaultValue={editingJob?.title || ''} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Entreprise associée *
                  </label>
                  <select name="companyId" defaultValue={editingJob?.companyId || companies[0]?.id} style={{ width: '100%' }}>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Ville *
                  </label>
                  <input type="text" name="city" defaultValue={editingJob?.city || 'Casablanca'} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Type de contrat *
                  </label>
                  <select name="jobType" defaultValue={editingJob?.jobType || 'Full-time'} style={{ width: '100%' }}>
                    <option value="Full-time">Full-time / CDI</option>
                    <option value="Junior">Junior</option>
                    <option value="Internship">Stage / Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Mode de travail
                  </label>
                  <select name="locationType" defaultValue={editingJob?.locationType || 'Hybrid'} style={{ width: '100%' }}>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Niveau d'expérience
                  </label>
                  <input type="text" name="experienceLevel" defaultValue={editingJob?.experienceLevel || 'Junior (0-2 ans / Bac+2)'} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Fourchette de Salaire
                  </label>
                  <input type="text" name="salaryRange" defaultValue={editingJob?.salaryRange || '5,500 - 8,000 DH/mois'} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Email Recrutement
                  </label>
                  <input type="email" name="contactEmail" defaultValue={editingJob?.contactEmail || ''} style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Technologies requises (séparées par virgule)
                </label>
                <input
                  type="text"
                  name="technologies"
                  defaultValue={editingJob?.technologies?.join(', ') || 'React, JavaScript, Laravel, PHP, MySQL'}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Description de l'offre
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingJob?.description || ''}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-elevated)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    URL Source Vérifiée *
                  </label>
                  <input type="url" name="sourceUrl" defaultValue={editingJob?.sourceUrl || 'https://example.com/jobs'} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Date de Vérification *
                  </label>
                  <input type="date" name="verifiedAt" defaultValue={editingJob?.verifiedAt || new Date().toISOString().split('T')[0]} required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsJobModalOpen(false)} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiSave /> Enregistrer l'offre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Supprimer cet élément ?"
        message="Cette action retirera définitivement l'élément de la base de données."
        confirmText="Supprimer"
        isDanger={true}
      />
    </div>
  );
};
