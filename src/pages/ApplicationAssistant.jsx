import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  PaperPlaneIcon,
  FileTextIcon,
  Pencil1Icon,
  EyeOpenIcon,
  BookmarkIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  ReloadIcon,
  GlobeIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons';
import { profileService } from '../services/profileService';
import { companyService } from '../services/companyService';
import { jobService } from '../services/jobService';
import { applicationService } from '../services/applicationService';
import { emailService } from '../services/emailService';
import { generateApplicationMessage, generateFollowUpMessage } from '../utils/generateMessage';
import { ApplicationModal } from '../components/ApplicationModal';
import { useToast } from '../context/ToastContext';

export const ApplicationAssistant = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const jobIdParam = searchParams.get('jobId');
  const companyIdParam = searchParams.get('companyId');
  const followUpIdParam = searchParams.get('followUpId');

  const [profile, setProfile] = useState(profileService.getProfile());
  const [cv, setCv] = useState(profileService.getCV());
  const [companies, setCompanies] = useState(companyService.getAll());
  const [jobs, setJobs] = useState(jobService.getAll());

  const [selectedJobId, setSelectedJobId] = useState(jobIdParam || '');
  const [selectedCompanyId, setSelectedCompanyId] = useState(companyIdParam || '');
  const [isFollowUpMode, setIsFollowUpMode] = useState(Boolean(followUpIdParam));

  const [message, setMessage] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  useEffect(() => {
    if (followUpIdParam) {
      const app = applicationService.getById(followUpIdParam);
      if (app) {
        setIsFollowUpMode(true);
        setSelectedCompanyId(app.companyId ? String(app.companyId) : '');
        setSelectedJobId(app.jobId ? String(app.jobId) : '');
        setRecipientEmail(app.recipientEmail || '');
        setSubject(`Relance Candidature — ${app.jobTitle} (${profile.fullName})`);

        const followUpText = generateFollowUpMessage({
          applicant: profile,
          application: app,
          job: { title: app.jobTitle },
          company: { name: app.companyName }
        });
        setMessage(followUpText);
        return;
      }
    }

    if (jobIdParam) {
      const job = jobService.getById(jobIdParam);
      if (job) {
        setSelectedJobId(String(job.id));
        setSelectedCompanyId(String(job.companyId));
        setRecipientEmail(job.contactEmail || '');
        setSubject(`Candidature — ${job.title} (${profile.fullName})`);

        const comp = companyService.getById(job.companyId);
        const generated = generateApplicationMessage({
          applicant: profile,
          job,
          company: comp || { name: job.companyName }
        });
        setMessage(generated);
      }
    } else if (companyIdParam) {
      const comp = companyService.getById(companyIdParam);
      if (comp) {
        setSelectedCompanyId(String(comp.id));
        setRecipientEmail(comp.email || '');
        setSubject(`Candidature Spontanée — Développeur Web Full Stack (${profile.fullName})`);

        const generated = generateApplicationMessage({
          applicant: profile,
          job: { title: "Développeur Web Full Stack (React / Laravel)" },
          company: comp
        });
        setMessage(generated);
      }
    } else if (jobs.length > 0) {
      const firstJob = jobs[0];
      setSelectedJobId(String(firstJob.id));
      setSelectedCompanyId(String(firstJob.companyId));
      setRecipientEmail(firstJob.contactEmail || '');
      setSubject(`Candidature — ${firstJob.title} (${profile.fullName})`);

      const comp = companyService.getById(firstJob.companyId);
      const generated = generateApplicationMessage({
        applicant: profile,
        job: firstJob,
        company: comp || { name: firstJob.companyName }
      });
      setMessage(generated);
    }
  }, [jobIdParam, companyIdParam, followUpIdParam]);

  useEffect(() => {
    if (selectedJobId || selectedCompanyId) {
      const isDup = applicationService.isDuplicate(selectedJobId, selectedCompanyId);
      setDuplicateWarning(isDup && !isFollowUpMode);
    }
  }, [selectedJobId, selectedCompanyId, isFollowUpMode]);

  const handleJobSelectChange = (newJobId) => {
    setSelectedJobId(newJobId);
    if (!newJobId) return;

    const job = jobService.getById(newJobId);
    if (job) {
      setSelectedCompanyId(String(job.companyId));
      setRecipientEmail(job.contactEmail || '');
      setSubject(`Candidature — ${job.title} (${profile.fullName})`);

      const comp = companyService.getById(job.companyId);
      const generated = generateApplicationMessage({
        applicant: profile,
        job,
        company: comp || { name: job.companyName }
      });
      setMessage(generated);
    }
  };

  const handleCompanySelectChange = (newCompanyId) => {
    setSelectedCompanyId(newCompanyId);
    const comp = companyService.getById(newCompanyId);
    if (comp) {
      setRecipientEmail(comp.email || '');
      const compJobs = jobService.getByCompanyId(newCompanyId);
      if (compJobs.length > 0) {
        handleJobSelectChange(String(compJobs[0].id));
      } else {
        setSelectedJobId('');
        setSubject(`Candidature Spontanée — Développeur Web Full Stack (${profile.fullName})`);
        const generated = generateApplicationMessage({
          applicant: profile,
          job: { title: "Développeur Web Full Stack" },
          company: comp
        });
        setMessage(generated);
      }
    }
  };

  const handleRegenerate = () => {
    const job = selectedJobId ? jobService.getById(selectedJobId) : { title: 'Développeur Web Full Stack' };
    const comp = selectedCompanyId ? companyService.getById(selectedCompanyId) : { name: 'Votre Entreprise' };

    const generated = isFollowUpMode
      ? generateFollowUpMessage({
          applicant: profile,
          application: { jobTitle: job?.title, companyName: comp?.name },
          job,
          company: comp
        })
      : generateApplicationMessage({
          applicant: profile,
          job: job || {},
          company: comp || {}
        });

    setMessage(generated);
    showInfo("Message régénéré avec vos données actuelles.");
  };

  const handleSaveDraft = () => {
    const currentJob = selectedJobId ? jobService.getById(selectedJobId) : null;
    const currentComp = selectedCompanyId ? companyService.getById(selectedCompanyId) : null;

    applicationService.create({
      jobId: currentJob ? currentJob.id : null,
      jobTitle: currentJob ? currentJob.title : 'Candidature spontanée',
      companyId: currentComp ? currentComp.id : null,
      companyName: currentComp ? currentComp.name : 'Entreprise Tech',
      companyLogoText: currentComp ? currentComp.logoText : 'CO',
      companyLogoColor: currentComp ? currentComp.logoColor : '#9B7842',
      city: currentJob ? currentJob.city : (currentComp ? currentComp.city : 'Maroc'),
      status: 'READY',
      applicationMethod: 'email',
      recipientEmail: recipientEmail,
      cvUsed: cv ? cv.fileName : 'CV_Abdelaziz_Aabbour.pdf',
      messageSent: message,
      notes: "Brouillon préparé avec l'Assistant. Prêt pour transmission."
    });

    showSuccess("Candidature enregistrée dans le Kanban (Colonne : Prêt à postuler) !");
    navigate('/applications');
  };

  const handleSendConfirmed = async () => {
    setIsSending(true);
    const currentJob = selectedJobId ? jobService.getById(selectedJobId) : null;
    const currentComp = selectedCompanyId ? companyService.getById(selectedCompanyId) : null;
    const companyName = currentComp ? currentComp.name : (currentJob ? currentJob.companyName : 'Entreprise');
    const jobTitle = currentJob ? currentJob.title : 'Développeur Web Full Stack';

    try {
      await emailService.sendApplicationEmail({
        applicantName: profile.fullName,
        applicantEmail: profile.email,
        companyName,
        jobTitle,
        applicationMessage: message,
        portfolioUrl: profile.portfolio,
        githubUrl: profile.github,
        linkedinUrl: profile.linkedin,
        recipientEmail: recipientEmail
      });

      if (isFollowUpMode && followUpIdParam) {
        applicationService.addFollowUpRecord(followUpIdParam, "Email de relance envoyé via l'Assistant");
      } else {
        applicationService.create({
          jobId: currentJob ? currentJob.id : null,
          jobTitle,
          companyId: currentComp ? currentComp.id : null,
          companyName,
          companyLogoText: currentComp ? currentComp.logoText : 'CO',
          companyLogoColor: currentComp ? currentComp.logoColor : '#9B7842',
          city: currentJob ? currentJob.city : (currentComp ? currentComp.city : 'Maroc'),
          status: 'SENT',
          applicationMethod: 'email',
          recipientEmail: recipientEmail,
          cvUsed: cv ? cv.fileName : 'CV_Abdelaziz_Aabbour.pdf',
          messageSent: message,
          notes: "Candidature envoyée avec succès via l'Assistant."
        });
      }

      setIsConfirmModalOpen(false);
      setIsSending(false);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9B7842', '#C49F63', '#FFFFFF', '#10B981']
        });
      } catch (err) {
        // ignore confetti
      }

      showSuccess(`Candidature transmise avec succès à ${companyName} !`);
      setTimeout(() => {
        navigate('/applications');
      }, 1200);

    } catch (error) {
      setIsSending(false);
      showError(error.message || "Une erreur est survenue lors de l'envoi.");
    }
  };

  const selectedCompObj = companies.find(c => String(c.id) === String(selectedCompanyId));
  const selectedJobObj = jobs.find(j => String(j.id) === String(selectedJobId));

  return (
    <div className="page-container" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
            {isFollowUpMode ? 'Relance de Candidature' : 'Générateur de Candidature Personnalisée'}
          </span>
          <h1 className="page-title">
            {isFollowUpMode ? 'Assistant de Relance' : 'Assistant de Candidature IA'}
          </h1>
          <p className="page-subtitle">
            Générez une lettre et un email de motivation sur-mesure en français pour maximiser vos chances d'entretien.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button type="button" onClick={handleRegenerate} className="btn btn-secondary btn-sm">
            <ReloadIcon width={12} height={12} /> Réinitialiser le texte
          </button>
          <button type="button" onClick={handleSaveDraft} className="btn btn-gold-outline btn-sm">
            <BookmarkIcon width={12} height={12} /> Enregistrer en Brouillon
          </button>
        </div>
      </div>

      {/* Duplicate Alert Banner */}
      {duplicateWarning && (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem 1.15rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <ExclamationTriangleIcon width={18} height={18} style={{ color: '#FBBF24', flexShrink: 0 }} />
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: '#FFF' }}>Attention :</strong> Vous avez déjà enregistré ou envoyé une candidature pour cette opportunité. Évitez les doublons.
          </div>
        </div>
      )}

      {/* Target Company & Job Selection Card */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#FFF', marginBottom: '0.85rem' }}>
          1. Sélection de l'Entreprise et du Poste Cible
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Entreprise / Startup :
            </label>
            <select
              value={selectedCompanyId}
              onChange={(e) => handleCompanySelectChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">Sélectionner une entreprise...</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.city} - {c.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Poste / Offre visée :
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => handleJobSelectChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">Candidature Spontanée</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} — {j.companyName} ({j.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Email Recrutement RH (Officiel) :
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="recrutement@entreprise.ma"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Objet de l'Email :
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Candidature Développeur Web Full Stack"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Message Editor & Preview Card */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.65rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#FFF' }}>
            2. Personnalisation du Message en Français
          </h3>

          <div style={{ display: 'flex', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '2px', border: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'edit' ? 'var(--color-gold)' : 'transparent',
                color: activeTab === 'edit' ? '#070707' : 'var(--text-secondary)',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                fontSize: '0.74rem'
              }}
            >
              <Pencil1Icon width={12} height={12} /> Éditeur
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'preview' ? 'var(--color-gold)' : 'transparent',
                color: activeTab === 'preview' ? '#070707' : 'var(--text-secondary)',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                fontSize: '0.74rem'
              }}
            >
              <EyeOpenIcon width={12} height={12} /> Aperçu Final
            </button>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <div>
            <textarea
              rows={13}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                padding: '0.85rem',
                resize: 'vertical'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              <span>Conseil : Vous pouvez éditer librement ce texte avant envoi.</span>
              <span>{message.length} caractères</span>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: '#0D0D0D',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              minHeight: '260px'
            }}
          >
            {message}
          </div>
        )}

        {/* Attached CV & Links Confirmation Strip */}
        <div style={{
          marginTop: '1.25rem',
          padding: '0.85rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.65rem',
          fontSize: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileTextIcon width={14} height={14} style={{ color: '#34D399' }} />
            <span style={{ color: 'var(--text-muted)' }}>CV joint :</span>
            <span style={{ fontWeight: 600, color: '#FFF' }}>
              {cv ? cv.fileName : 'CV_Abdelaziz_Aabbour.pdf'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', color: 'var(--text-secondary)' }}>
            {profile.portfolio && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <GlobeIcon width={11} height={11} /> Portfolio
              </span>
            )}
            {profile.github && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <GitHubLogoIcon width={11} height={11} /> GitHub
              </span>
            )}
            {profile.linkedin && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <LinkedInLogoIcon width={11} height={11} /> LinkedIn
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleSaveDraft}
          className="btn btn-secondary btn-lg"
        >
          <BookmarkIcon width={14} height={14} /> Sauvegarder comme Brouillon
        </button>

        <button
          type="button"
          onClick={() => {
            if (!recipientEmail) {
              showWarning("Veuillez renseigner un email de recrutement destinataire.");
              return;
            }
            setIsConfirmModalOpen(true);
          }}
          className="btn btn-primary btn-lg"
        >
          <PaperPlaneIcon width={14} height={14} /> Préparer & Transmettre la Candidature
        </button>
      </div>

      {/* Confirmation Modal */}
      <ApplicationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirmSend={handleSendConfirmed}
        companyName={selectedCompObj ? selectedCompObj.name : 'Entreprise'}
        jobTitle={selectedJobObj ? selectedJobObj.title : 'Développeur Web Full Stack'}
        recipientEmail={recipientEmail}
        message={message}
        cvName={cv ? cv.fileName : 'CV_Abdelaziz_Aabbour.pdf'}
        isSending={isSending}
      />
    </div>
  );
};
