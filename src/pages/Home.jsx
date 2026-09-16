import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiSend,
  FiFileText,
  FiCheckCircle,
  FiBriefcase,
  FiLayers,
  FiShield,
  FiClock,
  FiTrendingUp,
  FiAward,
  FiTerminal,
  FiCode
} from 'react-icons/fi';
import { companyService } from '../services/companyService';
import { jobService } from '../services/jobService';
import { applicationService } from '../services/applicationService';
import { JobCard } from '../components/JobCard';

export const Home = () => {
  const companies = companyService.getAll();
  const jobs = jobService.getAll();
  const stats = applicationService.getStats();

  const featuredJobs = jobs.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '3rem 0 4rem',
        overflow: 'hidden'
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(155, 120, 66, 0.18) 0%, rgba(11, 11, 11, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          {/* OFPPT / Bac+2 Target Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', marginBottom: '1.25rem' }}
          >
            <span
              className="badge badge-gold"
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FiAward size={14} /> Plateforme Dédiée aux Développeurs Web Full Stack & Lauréats Bac+2 au Maroc
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em'
            }}
          >
            Find Your Next Web Development Opportunity in <span className="gold-text">Morocco</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '740px',
              margin: '0 auto 2.25rem'
            }}
          >
            One profile. One CV. Multiple opportunities. Discover startups and technology companies looking for Web Developers and Full Stack Developers in Casablanca, Rabat, Marrakech, Tangier, and across Morocco.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}
          >
            <Link to="/jobs" className="btn btn-primary btn-lg">
              <FiBriefcase size={18} /> Explore Opportunities
            </Link>
            <Link to="/cv-manager" className="btn btn-secondary btn-lg">
              <FiFileText size={18} /> Upload My CV
            </Link>
          </motion.div>
        </div>

        {/* Animated Developer Visual (Terminal & Code Window) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          <div className="glass-card gold-border animate-gold-pulse" style={{ padding: '0', overflow: 'hidden' }}>
            {/* Terminal Top bar */}
            <div style={{
              background: '#151515',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10B981' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                devapply-morocco ~ stack: [React, Laravel, MySQL, Docker]
              </div>
              <div style={{ width: '40px' }} />
            </div>

            {/* Terminal Body */}
            <div style={{
              padding: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              background: '#0D0D0D',
              color: 'var(--text-secondary)'
            }}>
              <div>
                <span style={{ color: 'var(--color-gold-light)' }}>const</span> candidate = &#123;
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                name: <span style={{ color: '#34D399' }}>"Abdelaziz Aabbour"</span>,
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                diploma: <span style={{ color: '#34D399' }}>"Bac+2 Développeur Web Full Stack (OFPPT)"</span>,
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                frontend: [<span style={{ color: '#60A5FA' }}>"React.js"</span>, <span style={{ color: '#60A5FA' }}>"JavaScript ES6"</span>, <span style={{ color: '#60A5FA' }}>"HTML5/CSS3"</span>],
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                backend: [<span style={{ color: '#F87171' }}>"Laravel"</span>, <span style={{ color: '#F87171' }}>"PHP"</span>, <span style={{ color: '#F87171' }}>"Node.js"</span>, <span style={{ color: '#F87171' }}>"MySQL"</span>],
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                targetLocation: <span style={{ color: '#FBBF24' }}>"Casablanca, Rabat & Remote Morocco"</span>,
              </div>
              <div style={{ paddingLeft: '1.5rem' }}>
                status: <span style={{ color: '#10B981' }}>"Ready to join innovative startups & tech agencies"</span>
              </div>
              <div>&#125;;</div>
              <div style={{ marginTop: '0.75rem', color: 'var(--color-gold-light)' }}>
                &gt; DevApply.matchOpportunities(candidate) =&gt; <span style={{ color: '#34D399' }}>{jobs.length} opportunités vérifiées trouvées ✓</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Real Statistics Section */}
      <section style={{ padding: '2rem 0 3.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--color-gold-light)', marginBottom: '0.5rem', display: 'inline-block' }}>
              <FiLayers size={24} />
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFF' }}>
              {companies.length}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Entreprises & Startups Répertoriées
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: '#60A5FA', marginBottom: '0.5rem', display: 'inline-block' }}>
              <FiBriefcase size={24} />
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFF' }}>
              {jobs.length}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Opportunités & Stages Ouverts
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: '#A78BFA', marginBottom: '0.5rem', display: 'inline-block' }}>
              <FiSend size={24} />
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFF' }}>
              {stats.sent}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Candidatures Envoyées
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: '#34D399', marginBottom: '0.5rem', display: 'inline-block' }}>
              <FiTrendingUp size={24} />
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFF' }}>
              {stats.pending + stats.interview}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Candidatures en Cours / Entretiens
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Preview */}
      <section style={{ padding: '1rem 0 3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>Sélection Récente</span>
            <h2 style={{ fontSize: '1.6rem', color: '#FFF' }}>Dernières Opportunités Développeur Web</h2>
          </div>
          <Link to="/jobs" className="btn btn-gold-outline btn-sm">
            Voir toutes les offres ({jobs.length}) →
          </Link>
        </div>

        <div className="grid-cards">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Features Showcase */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>Fonctionnalités Clés</span>
          <h2 style={{ fontSize: '1.8rem', color: '#FFF' }}>Un Pipeline de Recrutement Structuré</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Pensé pour éliminer les candidatures non ciblées et maximiser vos réponses positives d'entretiens.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(155, 120, 66, 0.15)',
              color: 'var(--color-gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <FiSend size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.5rem' }}>
              Assistant de Candidature
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Générez en un clic des lettres et emails de motivation ultra-personnalisés en français, adaptés aux exigences techniques de chaque startup marocaine.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(96, 165, 250, 0.15)',
              color: '#60A5FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <FiCheckCircle size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.5rem' }}>
              Tableau Kanban de Suivi
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Visualisez le cycle complet de vos démarches : Nouveau, Prêt, Envoyé, Relance à faire, Entretien, Refusé et Accepté avec alertes automatiques.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(52, 211, 153, 0.15)',
              color: '#34D399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <FiShield size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.5rem' }}>
              Éthique & Zéro Spam
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Aucun scraping non autorisé ni robot spammeur. Seules les adresses officielles publiques et formulaires autorisés sont exploités, avec confirmation obligatoire.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
