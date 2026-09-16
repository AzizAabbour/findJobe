import React from 'react';
import { MixerHorizontalIcon, ResetIcon } from '@radix-ui/react-icons';
import { SkillBadge } from './SkillBadge';

export const FilterPanel = ({
  selectedCity,
  setSelectedCity,
  selectedTech,
  setSelectedTech,
  selectedType,
  setSelectedType,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
  onResetFilters,
  cities = [
    "Casablanca", "Rabat", "Salé", "Mohammedia", "Temara",
    "Marrakech", "Agadir", "Tangier", "Fes", "Meknes", "Kenitra", "Settat", "Oujda"
  ],
  technologies = [
    "React", "Laravel", "PHP", "JavaScript", "Node.js", "Express.js",
    "MySQL", "SQL", "Docker", "Git", "REST API", "Vue", "Angular", "Python", "MongoDB"
  ],
  jobTypes = ["Tous les types", "Stage / Internship", "Junior", "Full-time / CDI", "Part-time", "Freelance"],
  locations = ["Tous les modes", "Remote", "Hybrid", "On-site"],
  categories = ["Toutes les catégories", "Startup", "Software Company", "Web Agency", "Digital Agency", "IT Consulting", "SaaS", "FinTech", "EdTech"]
}) => {
  const hasActiveFilters = Boolean(
    selectedCity ||
    selectedTech ||
    (selectedType && selectedType !== 'Tous les types') ||
    (selectedLocation && selectedLocation !== 'Tous les modes') ||
    (selectedCategory && selectedCategory !== 'Toutes les catégories')
  );

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFF', fontWeight: 700, fontSize: '0.9rem' }}>
          <MixerHorizontalIcon width={16} height={16} style={{ color: 'var(--color-gold-light)' }} />
          <span>Filtres de recherche</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="btn btn-gold-outline btn-sm"
            style={{ fontSize: '0.74rem', padding: '0.2rem 0.55rem' }}
          >
            <ResetIcon width={12} height={12} /> Réinitialiser
          </button>
        )}
      </div>

      {/* Grid of dropdown selectors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        {/* City Filter */}
        <div>
          <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
            Ville
          </label>
          <select
            value={selectedCity || ''}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ width: '100%', height: '36px', fontSize: '0.84rem' }}
          >
            <option value="">Toutes les villes</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        {selectedType !== undefined && (
          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
              Type de contrat
            </label>
            <select
              value={selectedType || 'Tous les types'}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ width: '100%', height: '36px', fontSize: '0.84rem' }}
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}

        {/* Location mode Filter */}
        {selectedLocation !== undefined && (
          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
              Présentiel / Distanciel
            </label>
            <select
              value={selectedLocation || 'Tous les modes'}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{ width: '100%', height: '36px', fontSize: '0.84rem' }}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        )}

        {/* Category Filter */}
        {selectedCategory !== undefined && (
          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
              Catégorie Entreprise
            </label>
            <select
              value={selectedCategory || 'Toutes les catégories'}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', height: '36px', fontSize: '0.84rem' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Quick Tech Filter Pills */}
      <div>
        <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
          Filtrer par stack technique :
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => setSelectedTech('')}
            className={`btn btn-sm ${!selectedTech ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.74rem', padding: '0.2rem 0.55rem' }}
          >
            Toutes
          </button>
          {technologies.map((tech) => (
            <SkillBadge
              key={tech}
              skill={tech}
              size="sm"
              clickable
              active={selectedTech === tech}
              onClick={() => setSelectedTech(selectedTech === tech ? '' : tech)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
