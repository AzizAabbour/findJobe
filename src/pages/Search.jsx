import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiLayers, FiTag, FiMapPin } from 'react-icons/fi';
import { jobService } from '../services/jobService';
import { companyService } from '../services/companyService';
import { JobCard } from '../components/JobCard';
import { CompanyCard } from '../components/CompanyCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';

const POPULAR_SEARCHES = [
  "Laravel React Casablanca",
  "Junior Full Stack",
  "Stage PFE Rabat",
  "Node.js Tangier",
  "PHP MySQL Agadir",
  "React Developer"
];

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const [jobs, setJobs] = useState(jobService.getAll());
  const [companies, setCompanies] = useState(companyService.getAll());
  const [savedJobIds, setSavedJobIds] = useState(jobService.getSavedIds());
  const [savedCompanyIds, setSavedCompanyIds] = useState(companyService.getSavedIds());

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setQuery(q);
    }
  }, [searchParams]);

  const handleSearchChange = (newQ) => {
    setQuery(newQ);
    setSearchParams(newQ ? { q: newQ } : {});
  };

  const handleSelectQuickSearch = (keyword) => {
    setQuery(keyword);
    setSearchParams({ q: keyword });
  };

  // Perform multi-keyword search
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const matchedJobs = jobs.filter((job) => {
    if (terms.length === 0) return true;
    const textCorpus = [
      job.title,
      job.companyName,
      job.city,
      job.locationType,
      job.jobType,
      ...(job.technologies || []),
      job.description || '',
      ...(job.requirements || [])
    ].join(' ').toLowerCase();

    return terms.every(term => textCorpus.includes(term));
  });

  const matchedCompanies = companies.filter((company) => {
    if (terms.length === 0) return true;
    const textCorpus = [
      company.name,
      company.city,
      company.category,
      ...(company.technologies || []),
      company.description || '',
      company.tagline || ''
    ].join(' ').toLowerCase();

    return terms.every(term => textCorpus.includes(term));
  });

  const totalResults = matchedJobs.length + matchedCompanies.length;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Moteur de Recherche Global
          </span>
          <h1 className="page-title">Recherche d'Opportunités Tech</h1>
          <p className="page-subtitle">
            Combinez plusieurs mots-clés (ex: "Laravel React Casablanca") pour trouver instantanément vos cibles.
          </p>
        </div>
      </div>

      {/* Global Search Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <SearchBar
          value={query}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          placeholder="Exemple: Laravel React Casablanca, Stage Tangier, Node.js..."
          count={totalResults}
        />
      </div>

      {/* Popular quick searches */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recherches fréquentes :</span>
        {POPULAR_SEARCHES.map((keyword) => (
          <button
            key={keyword}
            type="button"
            onClick={() => handleSelectQuickSearch(keyword)}
            className="badge badge-gray"
            style={{ cursor: 'pointer' }}
          >
            {keyword}
          </button>
        ))}
      </div>

      {totalResults === 0 ? (
        <EmptyState
          icon={FiSearch}
          title={`Aucun résultat pour "${query}"`}
          description="Vérifiez l'orthographe des technologies ou essayez avec des termes plus généraux."
          actionText="Effacer la recherche"
          onAction={() => handleSearchChange('')}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Matched Jobs Section */}
          {matchedJobs.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiBriefcase style={{ color: 'var(--color-gold-light)' }} /> Offres d'emploi correspondantes ({matchedJobs.length})
                </h3>
              </div>
              <div className="grid-cards">
                {matchedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={(id) => setSavedJobIds(jobService.toggleSave(id))}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Matched Companies Section */}
          {matchedCompanies.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiLayers style={{ color: 'var(--color-gold-light)' }} /> Entreprises & Startups correspondantes ({matchedCompanies.length})
                </h3>
              </div>
              <div className="grid-cards">
                {matchedCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    isSaved={savedCompanyIds.includes(company.id)}
                    onToggleSave={(id) => setSavedCompanyIds(companyService.toggleSave(id))}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
