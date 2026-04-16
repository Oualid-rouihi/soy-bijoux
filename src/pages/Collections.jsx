import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { ScrollReveal } from '../components/ScrollAnimations';
import './Collections.css';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const [activeCategory, setActiveCategory] = useState(catParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (catParam) setActiveCategory(catParam);
  }, [catParam]);

  const filteredProducts = products.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-wrapper" id="collections-page">
      <div className="collections-header">
        <ScrollReveal>
          <h1 className="collections-header__title">Nos Collections</h1>
          <p className="collections-header__subtitle">
            Découvrez tous nos bijoux, de bracelets aux boucles d'oreilles
          </p>
        </ScrollReveal>
      </div>

      <div className="container">
        {/* Search */}
        <div className="collections-search">
          <input
            type="text"
            placeholder="Rechercher un bijou..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="collections-search__input"
            id="collections-search"
          />
        </div>

        {/* Category Filters */}
        <div className="collections-filters" id="category-filters">
          <button
            className={`collections-filter ${activeCategory === 'all' ? 'collections-filter--active' : ''}`}
            onClick={() => setActiveCategory('all')}
            id="filter-all"
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`collections-filter ${activeCategory === cat.id ? 'collections-filter--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              id={`filter-${cat.id}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="collections-count">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        <motion.div className="collections-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="collections-empty">
            <p>Aucun bijou trouvé 😔</p>
            <button 
              className="shimmer-btn" 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            >
              Voir tous les produits
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
