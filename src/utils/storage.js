/**
 * LocalStorage Safe Storage Engine with fallback and default seed support
 */

const STORAGE_KEYS = {
  PROFILE: 'devapply_user_profile',
  CV: 'devapply_user_cv',
  COMPANIES: 'devapply_companies',
  JOBS: 'devapply_jobs',
  APPLICATIONS: 'devapply_applications',
  SAVED_JOBS: 'devapply_saved_jobs',
  SAVED_COMPANIES: 'devapply_saved_companies',
  SETTINGS: 'devapply_settings'
};

export const getItem = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`[Storage] Failed to get ${key}:`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to set ${key}:`, error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to remove ${key}:`, error);
    return false;
  }
};

export { STORAGE_KEYS };
