/**
 * Input sanitization, validation and file format checks
 */

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
};

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateCVFile = (file, maxSizeBytes = 5 * 1024 * 1024) => {
  if (!file) {
    return { valid: false, error: "Aucun fichier sélectionné." };
  }

  const isPdfType = file.type === 'application/pdf';
  const isPdfExtension = file.name.toLowerCase().endsWith('.pdf');

  if (!isPdfType && !isPdfExtension) {
    return {
      valid: false,
      error: "Format de fichier non valide. Seuls les fichiers PDF (.pdf) sont acceptés."
    };
  }

  if (file.size > maxSizeBytes) {
    const sizeMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `Le fichier dépasse la taille maximale autorisée de ${sizeMb} Mo.`
    };
  }

  return { valid: true, error: null };
};
