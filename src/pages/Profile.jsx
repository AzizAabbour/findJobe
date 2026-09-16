import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiAward, FiGlobe, FiGithub, FiLinkedin, FiPlus, FiSave, FiCheckCircle } from 'react-icons/fi';
import { profileService } from '../services/profileService';
import { SkillBadge } from '../components/SkillBadge';
import { useToast } from '../context/ToastContext';

const PRESET_SKILLS = [
  "React.js", "JavaScript", "HTML", "CSS", "Laravel", "PHP", "MySQL", "SQL",
  "Node.js", "Express.js", "REST API", "Git", "GitHub", "Docker", "Flutter",
  "TypeScript", "Tailwind CSS", "Bootstrap", "PostgreSQL", "MongoDB", "Redux"
];

export const Profile = () => {
  const [profile, setProfile] = useState(profileService.getProfile());
  const [newSkill, setNewSkill] = useState('');
  const { showSuccess } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skillToAdd) => {
    const skill = (skillToAdd || newSkill).trim();
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    profileService.saveProfile(profile);
    showSuccess("Profil développeur mis à jour avec succès !");
  };

  return (
    <div className="page-container" style={{ maxWidth: '1000px' }}>
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
            Mon Dossier Candidat
          </span>
          <h1 className="page-title">Profil Développeur</h1>
          <p className="page-subtitle">
            Configurez vos informations professionnelles pour pré-remplir automatiquement vos candidatures.
          </p>
        </div>

        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          <FiSave /> Enregistrer mon profil
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal & Contact Information */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiUser style={{ color: 'var(--color-gold-light)' }} /> Identité & Coordonnées
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Nom Complet *
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                required
                placeholder="Ex: Abdelaziz Aabbour"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Titre Professionnel *
              </label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                required
                placeholder="Ex: Junior Full Stack Web Developer"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Email Professionnel *
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                placeholder="Ex: abdelaziz@example.ma"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Numéro de Téléphone *
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
                placeholder="Ex: +212 6 00 00 00 00"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Ville de Résidence *
              </label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                required
                placeholder="Ex: Casablanca"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Pays
              </label>
              <input
                type="text"
                name="country"
                value={profile.country}
                onChange={handleChange}
                placeholder="Morocco"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiAward style={{ color: 'var(--color-gold-light)' }} /> Formation & Expérience
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Établissement de Formation *
              </label>
              <input
                type="text"
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="Ex: OFPPT / ISTA"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Intitulé du Diplôme (Bac+2) *
              </label>
              <input
                type="text"
                name="diploma"
                value={profile.diploma}
                onChange={handleChange}
                placeholder="Ex: Développement Digital – Option Web Full Stack"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Années d'Expérience
              </label>
              <input
                type="text"
                name="yearsOfExperience"
                value={profile.yearsOfExperience}
                onChange={handleChange}
                placeholder="Ex: Junior (0-1 an)"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Bio / Résumé Professionnel
            </label>
            <textarea
              name="shortBio"
              rows={3}
              value={profile.shortBio}
              onChange={handleChange}
              placeholder="Présentation synthétique de vos motivations et de vos compétences clés..."
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Links & Portfolios */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiGlobe style={{ color: 'var(--color-gold-light)' }} /> Liens & Portfolios
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Lien Portfolio Personnel
              </label>
              <input
                type="url"
                name="portfolio"
                value={profile.portfolio}
                onChange={handleChange}
                placeholder="https://abdelaziz-dev.vercel.app"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Profil GitHub
              </label>
              <input
                type="url"
                name="github"
                value={profile.github}
                onChange={handleChange}
                placeholder="https://github.com/abdelaziz-aabbour"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Profil LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/abdelaziz-aabbour"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Skills Management */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiBriefcase style={{ color: 'var(--color-gold-light)' }} /> Compétences & Technologies Maîtrisées
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Ces technologies sont utilisées pour calculer le matching avec les offres d'emploi et enrichir vos lettres de candidature.
          </p>

          {/* Current Skills list */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', minHeight: '40px' }}>
            {profile.skills.map((skill) => (
              <SkillBadge
                key={skill}
                skill={skill}
                onRemove={handleRemoveSkill}
                active
              />
            ))}
          </div>

          {/* Add custom skill input */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', maxWidth: '480px' }}>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="Ajouter une compétence (ex: Next.js, Redux)..."
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="btn btn-gold-outline"
            >
              <FiPlus /> Ajouter
            </button>
          </div>

          {/* Suggested skills */}
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Suggestions rapides :
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {PRESET_SKILLS.filter(s => !profile.skills.includes(s)).slice(0, 10).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="badge badge-gray"
                  style={{ cursor: 'pointer', borderStyle: 'dashed' }}
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <FiCheckCircle /> Enregistrer toutes les modifications
          </button>
        </div>
      </form>
    </div>
  );
};
