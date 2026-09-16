/**
 * Application Management Service (Kanban board, status tracking, duplicate prevention)
 */
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import { calculateFollowUpDate } from '../utils/formatDate';

export const APPLICATION_STATUSES = {
  NEW: { key: 'NEW', label: 'Nouveau', color: 'var(--status-new)', order: 1 },
  READY: { key: 'READY', label: 'Prêt à postuler', color: 'var(--status-ready)', order: 2 },
  SENT: { key: 'SENT', label: 'Envoyé', color: 'var(--status-sent)', order: 3 },
  FOLLOW_UP: { key: 'FOLLOW-UP', label: 'Relance à faire', color: 'var(--status-followup)', order: 4 },
  INTERVIEW: { key: 'INTERVIEW', label: 'Entretien', color: 'var(--status-interview)', order: 5 },
  REJECTED: { key: 'REJECTED', label: 'Refusé', color: 'var(--status-rejected)', order: 6 },
  ACCEPTED: { key: 'ACCEPTED', label: 'Accepté / Offre', color: 'var(--status-accepted)', order: 7 }
};

const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    jobId: 101,
    jobTitle: "Junior Full Stack Developer",
    companyId: 1,
    companyName: "Atlas Digital Labs",
    companyLogoText: "AD",
    companyLogoColor: "#9B7842",
    city: "Casablanca",
    status: "SENT",
    applicationMethod: "email",
    recipientEmail: "recrutement@example-atlasdigital.ma",
    cvUsed: "CV_Abdelaziz_Aabbour.pdf",
    messageSent: "Madame, Monsieur l'équipe recrutement de Atlas Digital Labs...",
    createdAt: "2026-09-14T14:30:00.000Z",
    sentDate: "2026-09-14T15:00:00.000Z",
    followUpDate: "2026-09-21",
    notes: "Candidature envoyée par email avec CV joint. Poste hybride très intéressant pour profil React/Laravel.",
    followUpHistory: []
  },
  {
    id: "app-2",
    jobId: 103,
    jobTitle: "Junior Full Stack Web Developer (Laravel / React)",
    companyId: 2,
    companyName: "Medina Softworks",
    companyLogoText: "MS",
    companyLogoColor: "#2563EB",
    city: "Rabat",
    status: "INTERVIEW",
    applicationMethod: "email",
    recipientEmail: "carrieres@example-medinasoft.ma",
    cvUsed: "CV_Abdelaziz_Aabbour.pdf",
    messageSent: "Madame, Monsieur l'équipe recrutement de Medina Softworks...",
    createdAt: "2026-09-10T11:00:00.000Z",
    sentDate: "2026-09-10T11:30:00.000Z",
    followUpDate: "2026-09-17",
    notes: "Entretien technique visio prévu le 18 Septembre à 11h. Revoir les questions sur Laravel Eloquent et les React Hooks.",
    followUpHistory: [
      { date: "2026-09-15T09:00:00.000Z", note: "Email de relance envoyé" }
    ]
  },
  {
    id: "app-3",
    jobId: 104,
    jobTitle: "Junior Web Developer (React / PHP)",
    companyId: 3,
    companyName: "Koutoubia Web Studio",
    companyLogoText: "KW",
    companyLogoColor: "#D97706",
    city: "Marrakech",
    status: "FOLLOW-UP",
    applicationMethod: "email",
    recipientEmail: "jobs@example-koutoubiaweb.ma",
    cvUsed: "CV_Abdelaziz_Aabbour.pdf",
    messageSent: "Madame, Monsieur l'équipe recrutement de Koutoubia Web Studio...",
    createdAt: "2026-09-08T09:00:00.000Z",
    sentDate: "2026-09-08T09:15:00.000Z",
    followUpDate: "2026-09-15",
    notes: "Délai de relance atteint (7 jours écoulés). Relance recommandée.",
    followUpHistory: []
  },
  {
    id: "app-4",
    jobId: 105,
    jobTitle: "Stage PFE / Pré-embauche Full Stack Web",
    companyId: 4,
    companyName: "Strait Tech Solutions",
    companyLogoText: "ST",
    companyLogoColor: "#059669",
    city: "Tangier",
    status: "READY",
    applicationMethod: "email",
    recipientEmail: "rh@example-straittech.ma",
    cvUsed: "CV_Abdelaziz_Aabbour.pdf",
    messageSent: "Lettre de motivation préparée pour stage PFE...",
    createdAt: "2026-09-16T12:00:00.000Z",
    sentDate: null,
    followUpDate: null,
    notes: "Dossier prêt. Vérifier les détails du stage avant envoi.",
    followUpHistory: []
  }
];

export const applicationService = {
  getAll: () => {
    const saved = getItem(STORAGE_KEYS.APPLICATIONS);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      setItem(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
      return INITIAL_APPLICATIONS;
    }
    return saved;
  },

  getById: (id) => {
    const apps = applicationService.getAll();
    return apps.find(a => a.id === id) || null;
  },

  isDuplicate: (jobId, companyId) => {
    const apps = applicationService.getAll();
    return apps.some(a => (
      (jobId && String(a.jobId) === String(jobId)) ||
      (!jobId && companyId && String(a.companyId) === String(companyId) && a.status !== 'REJECTED')
    ));
  },

  create: (applicationData) => {
    const apps = applicationService.getAll();
    const id = `app-${Date.now()}`;
    const now = new Date().toISOString();
    const isSent = applicationData.status === 'SENT';

    const newApp = {
      id,
      jobId: applicationData.jobId || null,
      jobTitle: applicationData.jobTitle || 'Candidature spontanée',
      companyId: applicationData.companyId || null,
      companyName: applicationData.companyName || 'Entreprise',
      companyLogoText: applicationData.companyLogoText || 'CO',
      companyLogoColor: applicationData.companyLogoColor || '#9B7842',
      city: applicationData.city || 'Maroc',
      status: applicationData.status || 'NEW',
      applicationMethod: applicationData.applicationMethod || 'email',
      recipientEmail: applicationData.recipientEmail || '',
      cvUsed: applicationData.cvUsed || 'CV_Abdelaziz_Aabbour.pdf',
      messageSent: applicationData.messageSent || '',
      createdAt: now,
      sentDate: isSent ? now : null,
      followUpDate: isSent ? calculateFollowUpDate(now, 7) : null,
      notes: applicationData.notes || '',
      followUpHistory: []
    };

    apps.unshift(newApp);
    setItem(STORAGE_KEYS.APPLICATIONS, apps);
    return newApp;
  },

  updateStatus: (id, newStatus) => {
    const apps = applicationService.getAll();
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    const app = apps[index];
    const wasSent = app.status === 'SENT' || app.sentDate;

    apps[index] = {
      ...app,
      status: newStatus,
      sentDate: (newStatus === 'SENT' && !wasSent) ? now : app.sentDate,
      followUpDate: (newStatus === 'SENT' && !app.followUpDate) ? calculateFollowUpDate(now, 7) : app.followUpDate
    };

    setItem(STORAGE_KEYS.APPLICATIONS, apps);
    return apps[index];
  },

  update: (id, updatedFields) => {
    const apps = applicationService.getAll();
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return null;

    apps[index] = { ...apps[index], ...updatedFields };
    setItem(STORAGE_KEYS.APPLICATIONS, apps);
    return apps[index];
  },

  addFollowUpRecord: (id, noteText) => {
    const apps = applicationService.getAll();
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    const record = { date: now, note: noteText || 'Relance effectuée' };
    const nextFollowUp = calculateFollowUpDate(now, 7);

    apps[index].followUpHistory = apps[index].followUpHistory || [];
    apps[index].followUpHistory.push(record);
    apps[index].followUpDate = nextFollowUp;
    apps[index].status = 'SENT'; // Return to SENT after follow-up

    setItem(STORAGE_KEYS.APPLICATIONS, apps);
    return apps[index];
  },

  delete: (id) => {
    const apps = applicationService.getAll();
    const filtered = apps.filter(a => a.id !== id);
    setItem(STORAGE_KEYS.APPLICATIONS, filtered);
    return true;
  },

  getStats: () => {
    const apps = applicationService.getAll();
    return {
      total: apps.length,
      pending: apps.filter(a => a.status === 'NEW' || a.status === 'READY').length,
      sent: apps.filter(a => a.status === 'SENT').length,
      followUp: apps.filter(a => a.status === 'FOLLOW-UP').length,
      interview: apps.filter(a => a.status === 'INTERVIEW').length,
      rejected: apps.filter(a => a.status === 'REJECTED').length,
      accepted: apps.filter(a => a.status === 'ACCEPTED').length
    };
  }
};
