import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../data/products';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollAnimations';
import './CategoryGrid.css';

export default function CategoryGrid() {
  return (
    <section className="categories-section" id="categories-section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Collections en Vedette</h2>
          <p className="section-subtitle">
            Collections qui valent la peine d'être explorées
          </p>
        </ScrollReveal>

        <StaggerContainer className="categories-grid">
          {categories.map((cat, index) => (
            <StaggerItem key={cat.id}>
              <Link to={`/collections?cat=${cat.id}`} className="category-card" id={`category-${cat.id}`}>
                <motion.div 
                  className="category-card__image-wrapper"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="category-card__image"
                    loading="lazy"
                  />
                  <div className="category-card__overlay" />
                </motion.div>
                <div className="category-card__label">
                  <span className="category-card__name">{cat.name}</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
