import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { HiOutlineX, HiMinus, HiPlus, HiOutlineTrash } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    orderViaWhatsApp,
  } = useCart();

  const handleOrder = () => {
    orderViaWhatsApp();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            id="cart-drawer"
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <h3 className="cart-drawer__title">
                <HiOutlineShoppingBag size={20} />
                Panier ({totalItems})
              </h3>
              <button
                className="cart-drawer__close"
                onClick={() => setIsCartOpen(false)}
                aria-label="Fermer le panier"
                id="cart-close"
              >
                <HiOutlineX size={22} />
              </button>
            </div>

            {/* Content */}
            {cartItems.length === 0 ? (
              <div className="cart-drawer__empty">
                <div className="cart-drawer__empty-icon">🛒</div>
                <h4>Votre panier est vide</h4>
                <p>Ajoutez des bijoux pour commencer</p>
                <Link
                  to="/collections"
                  className="shimmer-btn"
                  onClick={() => setIsCartOpen(false)}
                  id="cart-empty-cta"
                >
                  Découvrir nos bijoux
                </Link>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="cart-drawer__items">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          to={`/product/${item.id}`}
                          className="cart-item__image-link"
                          onClick={() => setIsCartOpen(false)}
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="cart-item__image"
                          />
                        </Link>

                        <div className="cart-item__info">
                          <Link
                            to={`/product/${item.id}`}
                            className="cart-item__name"
                            onClick={() => setIsCartOpen(false)}
                          >
                            {item.name}
                          </Link>
                          <span className="cart-item__price">{item.price} Dh</span>

                          <div className="cart-item__controls">
                            <div className="cart-item__qty">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="cart-item__qty-btn"
                                aria-label="Diminuer"
                              >
                                <HiMinus size={12} />
                              </button>
                              <span className="cart-item__qty-value">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="cart-item__qty-btn"
                                aria-label="Augmenter"
                              >
                                <HiPlus size={12} />
                              </button>
                            </div>

                            <span className="cart-item__subtotal">
                              {item.price * item.quantity} Dh
                            </span>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="cart-item__remove"
                              aria-label="Supprimer"
                            >
                              <HiOutlineTrash size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="cart-drawer__footer">
                  <div className="cart-drawer__total">
                    <span>Total</span>
                    <span className="cart-drawer__total-value">{totalPrice} Dh</span>
                  </div>

                  <button
                    className="cart-drawer__order-btn"
                    onClick={handleOrder}
                    id="cart-order-btn"
                  >
                    <FaWhatsapp size={20} />
                    Commander sur WhatsApp • {totalPrice} Dh
                  </button>

                  <button
                    className="cart-drawer__clear"
                    onClick={clearCart}
                    id="cart-clear-btn"
                  >
                    Vider le panier
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
