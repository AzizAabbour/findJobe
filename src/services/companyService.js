/**
 * Company Data Service with LocalStorage persistence and mock REST readiness
 */
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import { INITIAL_COMPANIES } from '../data/companies';

export const companyService = {
  getAll: () => {
    const saved = getItem(STORAGE_KEYS.COMPANIES);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      setItem(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
      return INITIAL_COMPANIES;
    }
    return saved;
  },

  getById: (id) => {
    const companies = companyService.getAll();
    return companies.find(c => String(c.id) === String(id)) || null;
  },

  create: (newCompany) => {
    const companies = companyService.getAll();
    const id = Date.now();
    const company = {
      ...newCompany,
      id,
      verifiedAt: newCompany.verifiedAt || new Date().toISOString().split('T')[0],
      sourceUrl: newCompany.sourceUrl || "https://example.com/source",
      isDemo: newCompany.isDemo !== undefined ? newCompany.isDemo : false,
      logoText: newCompany.logoText || (newCompany.name ? newCompany.name.slice(0, 2).toUpperCase() : "CO"),
      logoColor: newCompany.logoColor || "#9B7842",
      openPositions: newCompany.openPositions || []
    };
    companies.unshift(company);
    setItem(STORAGE_KEYS.COMPANIES, companies);
    return company;
  },

  update: (id, updatedFields) => {
    const companies = companyService.getAll();
    const index = companies.findIndex(c => String(c.id) === String(id));
    if (index === -1) return null;
    companies[index] = { ...companies[index], ...updatedFields };
    setItem(STORAGE_KEYS.COMPANIES, companies);
    return companies[index];
  },

  delete: (id) => {
    const companies = companyService.getAll();
    const filtered = companies.filter(c => String(c.id) !== String(id));
    setItem(STORAGE_KEYS.COMPANIES, filtered);
    return true;
  },

  getSavedIds: () => {
    return getItem(STORAGE_KEYS.SAVED_COMPANIES, []);
  },

  toggleSave: (id) => {
    const saved = companyService.getSavedIds();
    const strId = Number(id);
    let updated;
    if (saved.includes(strId)) {
      updated = saved.filter(item => item !== strId);
    } else {
      updated = [...saved, strId];
    }
    setItem(STORAGE_KEYS.SAVED_COMPANIES, updated);
    return updated;
  },

  resetToDefault: () => {
    setItem(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    return INITIAL_COMPANIES;
  }
};
