import React, { useState, useMemo } from 'react';
import { FiBriefcase, FiSend, FiBookmark, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { JobCard } from '../components/JobCard';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { EmptyState } from '../components/EmptyState';

export const Jobs = () => {
  const [jobs, setJobs] = useState(jobService.getAll());
  const [savedJobIds, setSavedJobIds] = useState(jobService.getSavedIds());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedType, setSelectedType] = useState('Tous les types');
  const [selectedLocation, setSelectedLocation] = useState('Tous les modes');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search query (title, companyName, city, technologies, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyName.toLowerCase().includes(q);
        const matchesCity = job.city.toLowerCase().includes(q);
        const matchesTech = (job.technologies || []).some(t => t.toLowerCase().includes(q));
        const matchesDesc = (job.description || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesCity && !matchesTech && !matchesDesc) {
          return false;
        }
      }

      // City filter
      if (selectedCity && job.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Job Type filter
      if (selectedType && selectedType !== 'Tous les types') {
        const typeNormalized = selectedType.toLowerCase();
        const jobTypeNormalized = job.jobType.toLowerCase();
        if (!jobTypeNormalized.includes(typeNormalized) && !typeNormalized.includes(jobTypeNormalized)) {
          return false;
        }
      }

      // Location Mode filter (Remote, Hybrid, On-site)
      if (selectedLocation && selectedLocation !== 'Tous les modes') {
        if ((job.locationType || '').toLowerCase() !== selectedLocation.toLowerCase()) {
          return false;
        }
      }

      // Tech filter
      if (selectedTech) {
        const hasTech = (job.technologies || []).some(
          t => t.toLowerCase() === selectedTech.toLowerCase()
        );
        if (!hasTech) return false;
      }

      return true;
    });
  }, [jobs, searchQuery, selectedCity, selectedType, selectedLocation, selectedTech]);

  const handleToggleSave = (id) => {
    const updated = jobService.toggleSave(id);
    setSavedJobIds(updated);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedTech('');
    setSelectedType('Tous les types');
    setSelectedLocation('Tous les modes');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Offres d'Emploi & Stages
          </span>
          <h1 className="page-title">Opportunités Web & Full Stack au Maroc</h1>
          <p className="page-subtitle">
            Trouvez votre prochain poste de Développeur Junior, Stage PFE ou Développeur Full Stack (React / Laravel).
          </p>
        </div>

        <Link to="/admin" className="btn btn-secondary btn-sm">
          <FiPlus /> Ajouter une offre vérifiée
        </Link>
      </div>

      {/* Global Search */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        placeholder="Rechercher poste (Junior, Full Stack), techno (React, Laravel, MySQL), ville..."
        count={filteredJobs.length}
      />

      {/* Filter Panel */}
      <FilterPanel
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedTech={selectedTech}
        setSelectedTech={setSelectedTech}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onResetFilters={handleResetFilters}
      />

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          icon={FiBriefcase}
          title="Aucune offre ne correspond à vos critères"
          description="Modifiez vos mots-clés ou réinitialisez les filtres pour découvrir toutes les opportunités disponibles."
          actionText="Réinitialiser les filtres"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid-cards">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};
