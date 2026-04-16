import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollAnimations';
import { HiArrowLeft, HiMinus, HiPlus, HiCheck } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  if (!product) {
    return (
      <div className="page-wrapper">
        <div className="product-not-found container">
          <h2>Produit introuvable</h2>
          <Link to="/collections" className="shimmer-btn">Retour aux collections</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setIsCartOpen(true);
    }, 800);
  };

  const whatsappMsg = encodeURIComponent(
    `Bonjour! 👋\nJe souhaite commander:\n\n🛍️ *${product.name}*\n💰 Prix unitaire: ${product.price} Dh\n📦 Quantité: ${quantity}\n💵 Total: ${totalPrice} Dh\n\nMerci de confirmer la disponibilité et les détails de livraison! 🙏`
  );

  return (
    <div className="page-wrapper" id="product-detail-page">
      <div className="product-detail-header">
        <div className="container">
          <Link to="/collections" className="product-detail__back" id="back-btn">
            <HiArrowLeft size={18} />
            Retour
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="product-detail">
          {/* Image Gallery */}
          <motion.div 
            className="product-detail__gallery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="product-detail__main-image-wrapper">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="product-detail__main-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {product.badge && (
                <span className={`product-card__badge product-card__badge--${product.badge.replace(' ', '-')}`}>
                  {product.badge}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="product-detail__thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`product-detail__thumb ${i === selectedImage ? 'product-detail__thumb--active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                    id={`thumb-${i}`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="product-detail__info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="product-detail__name">{product.name}</h1>
            
            <div className="product-detail__price-row">
              <span className="product-detail__price">{product.price} Dh</span>
              {product.originalPrice && (
                <span className="product-detail__original-price">{product.originalPrice} Dh</span>
              )}
              {product.originalPrice && (
                <span className="product-detail__discount">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="product-detail__stock">
              {product.inStock ? (
                <><span className="stock-dot stock-dot--in" /> En stock</>
              ) : (
                <><span className="stock-dot stock-dot--out" /> Épuisé</>
              )}
            </p>

            <p className="product-detail__description">{product.description}</p>

            {/* Quantity */}
            <div className="product-detail__quantity">
              <span className="product-detail__quantity-label">Quantité</span>
              <div className="product-detail__quantity-controls">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="product-detail__qty-btn"
                  id="qty-minus"
                >
                  <HiMinus size={14} />
                </button>
                <span className="product-detail__qty-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="product-detail__qty-btn"
                  id="qty-plus"
                >
                  <HiPlus size={14} />
                </button>
              </div>
            </div>

            {/* Total */}
            {quantity > 1 && (
              <div className="product-detail__total">
                <span>Total:</span>
                <span className="product-detail__total-value">{totalPrice} Dh</span>
              </div>
            )}

            {/* Actions */}
            <div className="product-detail__actions">
              <button
                className={`product-detail__add-btn shimmer-btn ${justAdded ? 'product-detail__add-btn--added' : ''} ${!product.inStock ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                id="add-to-cart"
              >
                {justAdded ? (
                  <><HiCheck size={18} /> Ajouté au panier ✓</>
                ) : product.inStock ? (
                  <><HiOutlineShoppingBag size={18} /> Ajouter au panier • {totalPrice} Dh</>
                ) : (
                  'Épuisé'
                )}
              </button>
              
              <a 
                href={`https://wa.me/212604965460?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="product-detail__whatsapp-btn"
                id="whatsapp-order"
              >
                <FaWhatsapp size={20} />
                Commander direct
              </a>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products" id="related-products">
            <ScrollReveal>
              <h2 className="section-title">Vous Aimerez Aussi</h2>
              <p className="section-subtitle">D'autres bijoux de la même collection</p>
            </ScrollReveal>
            <StaggerContainer className="related-grid">
              {relatedProducts.map(p => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
