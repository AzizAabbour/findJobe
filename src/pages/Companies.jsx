import React, { useState, useMemo } from 'react';
import { FiLayers, FiPlus, FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { companyService } from '../services/companyService';
import { CompanyCard } from '../components/CompanyCard';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { EmptyState } from '../components/EmptyState';

export const Companies = () => {
  const [companies, setCompanies] = useState(companyService.getAll());
  const [savedCompanyIds, setSavedCompanyIds] = useState(companyService.getSavedIds());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Search query filter (name, city, category, tech, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(q);
        const matchesCity = company.city.toLowerCase().includes(q);
        const matchesCategory = company.category.toLowerCase().includes(q);
        const matchesTech = (company.technologies || []).some(t => t.toLowerCase().includes(q));
        const matchesDesc = (company.description || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesCategory && !matchesTech && !matchesDesc) {
          return false;
        }
      }

      // City filter
      if (selectedCity && company.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory && selectedCategory !== 'Toutes les catégories' && company.category !== selectedCategory) {
        return false;
      }

      // Tech filter
      if (selectedTech) {
        const hasTech = (company.technologies || []).some(
          t => t.toLowerCase() === selectedTech.toLowerCase()
        );
        if (!hasTech) return false;
      }

      return true;
    });
  }, [companies, searchQuery, selectedCity, selectedCategory, selectedTech]);

  const handleToggleSave = (id) => {
    const updated = companyService.toggleSave(id);
    setSavedCompanyIds(updated);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedTech('');
    setSelectedCategory('Toutes les catégories');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Annuaire Tech Maroc
          </span>
          <h1 className="page-title">Startups & Entreprises Technologiques</h1>
          <p className="page-subtitle">
            Explorez les startups, agences web et éditeurs de logiciels au Maroc recrutant des Développeurs Web.
          </p>
        </div>

        <Link to="/admin" className="btn btn-secondary btn-sm">
          <FiPlus /> Proposer une entreprise
        </Link>
      </div>

      {/* Global Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        placeholder="Rechercher par nom, ville (Casablanca, Rabat...), catégorie ou technologie..."
        count={filteredCompanies.length}
      />

      {/* Filter Panel */}
      <FilterPanel
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedTech={selectedTech}
        setSelectedTech={setSelectedTech}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onResetFilters={handleResetFilters}
      />

      {/* Grid of Company Cards */}
      {filteredCompanies.length === 0 ? (
        <EmptyState
          icon={FiLayers}
          title="Aucune entreprise trouvée"
          description="Aucune startup ou agence ne correspond à vos critères de recherche actuels."
          actionText="Réinitialiser les filtres"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid-cards">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              isSaved={savedCompanyIds.includes(company.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};
