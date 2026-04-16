import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { HiOutlineShoppingBag, HiCheck } from 'react-icons/hi';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="product-card__link" id={`product-${product.id}`}>
        <div className={`product-card__image-wrapper ${product.images.length > 1 ? 'has-hover' : ''}`}>
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="product-card__image product-card__image--primary"
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
          />
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} hover`}
              className="product-card__image product-card__image--hover"
              loading="lazy"
            />
          )}
          {product.badge && (
            <span className={`product-card__badge product-card__badge--${product.badge.replace(' ', '-')}`}>
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="product-card__sold-out">
              <span>Épuisé</span>
            </div>
          )}
        </div>

        <div className="product-card__info">
          <h3 className="product-card__name">{product.name}</h3>
          <div className="product-card__price-row">
            <span className="product-card__price">{product.price} Dh</span>
            {product.originalPrice && (
              <span className="product-card__original-price">{product.originalPrice} Dh</span>
            )}
          </div>
        </div>
      </Link>

      <button 
        className={`product-card__btn ${justAdded ? 'product-card__btn--added' : ''}`}
        disabled={!product.inStock}
        onClick={handleAddToCart}
        id={`add-to-cart-${product.id}`}
      >
        <AnimatePresence mode="wait">
          {justAdded ? (
            <motion.span
              key="added"
              className="product-card__btn-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <HiCheck size={16} />
              Ajouté au panier ✓
            </motion.span>
          ) : (
            <motion.span
              key="add"
              className="product-card__btn-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {product.inStock ? (
                <>
                  <HiOutlineShoppingBag size={16} />
                  Ajouter au panier
                </>
              ) : (
                'Épuisé'
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
