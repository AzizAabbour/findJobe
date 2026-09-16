/**
 * Profile & CV Management Service
 */
import { getItem, setItem, removeItem, STORAGE_KEYS } from '../utils/storage';

const DEFAULT_PROFILE = {
  fullName: "Abdelaziz Aabbour",
  title: "Junior Full Stack Web Developer",
  email: "abdelaziz.aabbour@example.ma",
  phone: "+212 6 00 00 00 00",
  city: "Casablanca",
  country: "Morocco",
  education: "OFPPT / ISTA",
  diploma: "Développement Digital – Option Web Full Stack (Bac+2)",
  yearsOfExperience: "Junior (0-1 an)",
  linkedin: "https://linkedin.com/in/abdelaziz-aabbour",
  github: "https://github.com/abdelaziz-aabbour",
  portfolio: "https://abdelaziz-dev.vercel.app",
  shortBio: "Lauréat Bac+2 passionné par le développement d'applications web modernes et performantes. Compétent en React.js pour le frontend et Laravel/Node.js pour la création d'API RESTful robustes.",
  skills: [
    "React.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Laravel",
    "PHP",
    "MySQL",
    "SQL",
    "Node.js",
    "Express.js",
    "REST API",
    "Git",
    "GitHub",
    "Docker"
  ]
};

const DEFAULT_CV = {
  fileName: "CV_Abdelaziz_Aabbour.pdf",
  fileSize: 420500, // ~420 KB
  uploadDate: "2026-09-16T10:00:00.000Z",
  status: "Ready for applications",
  dataUrl: null // Data URL when uploaded
};

export const profileService = {
  getProfile: () => {
    return getItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  },

  saveProfile: (profileData) => {
    setItem(STORAGE_KEYS.PROFILE, profileData);
    return profileData;
  },

  getCV: () => {
    return getItem(STORAGE_KEYS.CV, DEFAULT_CV);
  },

  saveCV: (cvData) => {
    setItem(STORAGE_KEYS.CV, cvData);
    return cvData;
  },

  deleteCV: () => {
    removeItem(STORAGE_KEYS.CV);
    return true;
  }
};
