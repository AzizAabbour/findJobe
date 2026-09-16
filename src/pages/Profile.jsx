import React, { useState } from 'react';
import {
  PersonIcon,
  BackpackIcon,
  GlobeIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  PlusIcon,
  CheckCircledIcon
} from '@radix-ui/react-icons';
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
    <div className="page-container" style={{ maxWidth: '960px' }}>
      <div className="page-header">
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
            Mon Dossier Candidat
          </span>
          <h1 className="page-title">Profil Développeur</h1>
          <p className="page-subtitle">
            Configurez vos informations professionnelles pour pré-remplir automatiquement vos candidatures.
          </p>
        </div>

        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          <CheckCircledIcon width={15} height={15} /> Enregistrer mon profil
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal & Contact Information */}
        <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <PersonIcon style={{ color: 'var(--color-gold-light)' }} width={17} height={17} /> Identité & Coordonnées
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
        <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <BackpackIcon style={{ color: 'var(--color-gold-light)' }} width={17} height={17} /> Formation & Expérience
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
        <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <GlobeIcon style={{ color: 'var(--color-gold-light)' }} width={17} height={17} /> Liens & Portfolios
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
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
        <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <BackpackIcon style={{ color: 'var(--color-gold-light)' }} width={17} height={17} /> Compétences & Technologies Maîtrisées
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Ces technologies sont utilisées pour calculer le matching avec les offres d'emploi et enrichir vos lettres de candidature.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem', minHeight: '36px' }}>
            {profile.skills.map((skill) => (
              <SkillBadge
                key={skill}
                skill={skill}
                onRemove={handleRemoveSkill}
                active
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem', maxWidth: '440px' }}>
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
              className="btn btn-gold-outline btn-sm"
            >
              <PlusIcon width={14} height={14} /> Ajouter
            </button>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Suggestions rapides :
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
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

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <CheckCircledIcon width={16} height={16} /> Enregistrer toutes les modifications
          </button>
        </div>
      </form>
    </div>
  );
};
