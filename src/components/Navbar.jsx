import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { RiMenu3Line } from 'react-icons/ri';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner">
          <button 
            className="navbar__menu-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
            id="menu-toggle"
          >
            <RiMenu3Line size={22} />
          </button>

          <Link to="/" className="navbar__logo" id="brand-logo">
            SOY BIJOUX
          </Link>

          <div className="navbar__actions">
            <Link to="/collections" className="navbar__icon-btn" aria-label="Rechercher" id="search-btn">
              <HiOutlineSearch size={20} />
            </Link>
            <button 
              className="navbar__icon-btn navbar__cart-btn" 
              aria-label="Panier" 
              id="cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <HiOutlineShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span 
                  className="navbar__cart-badge"
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="menu-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              id="mobile-menu"
            >
              <div className="menu-drawer__header">
                <span className="menu-drawer__brand">SOY BIJOUX</span>
                <button 
                  className="menu-drawer__close"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Fermer le menu"
                  id="menu-close"
                >
                  <HiOutlineX size={22} />
                </button>
              </div>

              <div className="menu-drawer__search">
                <HiOutlineSearch size={18} />
                <input type="text" placeholder="Rechercher..." id="menu-search-input" />
              </div>

              <nav className="menu-drawer__nav">
                <Link to="/" className="menu-drawer__link" id="nav-home">
                  Page d'Accueil
                </Link>
                <Link to="/collections" className="menu-drawer__link" id="nav-collections">
                  Collections
                </Link>
                <Link to="/collections?cat=bracelets" className="menu-drawer__link menu-drawer__link--sub" id="nav-bracelets">
                  Bracelets
                </Link>
                <Link to="/collections?cat=colliers" className="menu-drawer__link menu-drawer__link--sub" id="nav-colliers">
                  Colliers
                </Link>
                <Link to="/collections?cat=bagues" className="menu-drawer__link menu-drawer__link--sub" id="nav-bagues">
                  Bagues
                </Link>
                <Link to="/collections?cat=boucles" className="menu-drawer__link menu-drawer__link--sub" id="nav-boucles">
                  Boucles d'oreilles
                </Link>
                <Link to="/contact" className="menu-drawer__link" id="nav-contact">
                  Contactez-nous
                </Link>
              </nav>

              <div className="menu-drawer__footer">
                <p>© 2026 Soy Bijoux</p>
                <p>Bijoux de qualité, faits avec amour 💛</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
