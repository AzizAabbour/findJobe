/**
 * Date formatting and follow-up calculation utilities
 */

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      ...options
    }).format(date);
  } catch {
    return dateString;
  }
};

export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Il y a ${diffInHours} h`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Hier';
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
  if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} sem.`;
  return formatDate(dateString);
};

export const calculateFollowUpDate = (sentDate, days = 7) => {
  const d = sentDate ? new Date(sentDate) : new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const isFollowUpDue = (followUpDate) => {
  if (!followUpDate) return false;
  const today = new Date().toISOString().split('T')[0];
  return today >= followUpDate;
};
