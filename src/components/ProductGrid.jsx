import ProductCard from './ProductCard';
import { StaggerContainer, StaggerItem, ScrollReveal } from './ScrollAnimations';
import './ProductGrid.css';

export default function ProductGrid({ products, title, subtitle }) {
  return (
    <section className="product-grid-section" id="products-section">
      <div className="container">
        {title && (
          <ScrollReveal>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </ScrollReveal>
        )}

        <StaggerContainer className="product-grid">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
