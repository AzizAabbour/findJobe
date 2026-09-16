/**
 * Job Data Service with full filter engine and persistence
 */
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import { INITIAL_JOBS } from '../data/jobs';

export const jobService = {
  getAll: () => {
    const saved = getItem(STORAGE_KEYS.JOBS);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      setItem(STORAGE_KEYS.JOBS, INITIAL_JOBS);
      return INITIAL_JOBS;
    }
    return saved;
  },

  getById: (id) => {
    const jobs = jobService.getAll();
    return jobs.find(j => String(j.id) === String(id)) || null;
  },

  getByCompanyId: (companyId) => {
    const jobs = jobService.getAll();
    return jobs.filter(j => String(j.companyId) === String(companyId));
  },

  create: (newJob) => {
    const jobs = jobService.getAll();
    const id = Date.now();
    const job = {
      ...newJob,
      id,
      postedDate: newJob.postedDate || new Date().toISOString().split('T')[0],
      verifiedAt: newJob.verifiedAt || new Date().toISOString().split('T')[0],
      sourceUrl: newJob.sourceUrl || "https://example.com/jobs/source",
      isDemo: newJob.isDemo !== undefined ? newJob.isDemo : false,
      responsibilities: newJob.responsibilities || [],
      requirements: newJob.requirements || [],
      technologies: newJob.technologies || []
    };
    jobs.unshift(job);
    setItem(STORAGE_KEYS.JOBS, jobs);
    return job;
  },

  update: (id, updatedFields) => {
    const jobs = jobService.getAll();
    const index = jobs.findIndex(j => String(j.id) === String(id));
    if (index === -1) return null;
    jobs[index] = { ...jobs[index], ...updatedFields };
    setItem(STORAGE_KEYS.JOBS, jobs);
    return jobs[index];
  },

  delete: (id) => {
    const jobs = jobService.getAll();
    const filtered = jobs.filter(j => String(j.id) !== String(id));
    setItem(STORAGE_KEYS.JOBS, filtered);
    return true;
  },

  getSavedIds: () => {
    return getItem(STORAGE_KEYS.SAVED_JOBS, []);
  },

  toggleSave: (id) => {
    const saved = jobService.getSavedIds();
    const numId = Number(id);
    let updated;
    if (saved.includes(numId)) {
      updated = saved.filter(item => item !== numId);
    } else {
      updated = [...saved, numId];
    }
    setItem(STORAGE_KEYS.SAVED_JOBS, updated);
    return updated;
  },

  resetToDefault: () => {
    setItem(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    return INITIAL_JOBS;
  }
};
