import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollAnimations';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero-section">
      {/* Background with parallax */}
      <motion.div 
        className="hero__bg"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="hero__bg-overlay" />
        <img 
          src="/images/hero.jpg" 
          alt="Soy Bijoux Collection" 
          className="hero__bg-image"
        />
      </motion.div>

      {/* Content */}
      <div className="hero__content">
        <motion.div 
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          ✨ Nouvelle Collection 2026
        </motion.div>

        <motion.h1 
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          L'Élégance<br />
          <span className="hero__title-accent">Qui Vous Ressemble</span>
        </motion.h1>

        <motion.p 
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Découvrez notre collection de bijoux artisanaux, créés 
          avec passion pour sublimer chaque moment de votre vie.
        </motion.p>

        <motion.div 
          className="hero__cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link to="/collections" className="shimmer-btn" id="hero-cta-primary">
            Découvrir la Collection
          </Link>
          <Link to="/collections?cat=nouveau" className="hero__cta-secondary" id="hero-cta-secondary">
            Nouveautés →
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="hero__scroll-line" />
        <span>Défiler</span>
      </motion.div>
    </section>
  );
}
