import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import { getFeaturedProducts, getNewProducts } from '../data/products';
import { ScrollReveal } from '../components/ScrollAnimations';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewProducts();

  return (
    <div className="page-wrapper" id="home-page">
      <Hero />
      <CategoryGrid />
      
      <ProductGrid 
        products={featured}
        title="Nos Best-Sellers"
        subtitle="Les pièces les plus aimées par nos clientes"
      />

      {/* CTA Banner */}
      <section className="cta-banner" id="cta-banner">
        <ScrollReveal variant="fadeIn">
          <div className="cta-banner__content container">
            <h2 className="cta-banner__title">Trouvez Votre Bijou Parfait</h2>
            <p className="cta-banner__text">
              Explorez notre collection complète de bracelets, colliers, bagues et boucles d'oreilles
            </p>
            <Link to="/collections" className="shimmer-btn" id="cta-banner-btn">
              Voir Toute la Collection
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <ProductGrid 
        products={newArrivals}
        title="Nouveautés"
        subtitle="Les dernières pièces ajoutées à notre collection"
      />

      <FeaturesSection />
      <Footer />
    </div>
  );
}
