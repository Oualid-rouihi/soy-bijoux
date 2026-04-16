import { Link } from 'react-router-dom';
import { ScrollReveal } from './ScrollAnimations';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <ScrollReveal>
          <div className="footer__top">
            {/* Brand */}
            <div className="footer__brand">
              <h3 className="footer__logo">SOY BIJOUX</h3>
              <p className="footer__tagline">
                L'élégance qui vous ressemble. Bijoux artisanaux de qualité, 
                livrés partout au Maroc.
              </p>
              <div className="footer__socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" id="social-instagram" aria-label="Instagram">
                  <FaInstagram size={20} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" id="social-tiktok" aria-label="TikTok">
                  <FaTiktok size={18} />
                </a>
                <a href="https://wa.me/212604965460" target="_blank" rel="noopener noreferrer" className="footer__social-link" id="social-whatsapp" aria-label="WhatsApp">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__column">
              <h4 className="footer__column-title">Liens Rapides</h4>
              <Link to="/" className="footer__link">Accueil</Link>
              <Link to="/collections" className="footer__link">Collections</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
            </div>

            {/* Categories */}
            <div className="footer__column">
              <h4 className="footer__column-title">Catégories</h4>
              <Link to="/collections?cat=bracelets" className="footer__link">Bracelets</Link>
              <Link to="/collections?cat=colliers" className="footer__link">Colliers</Link>
              <Link to="/collections?cat=bagues" className="footer__link">Bagues</Link>
              <Link to="/collections?cat=boucles" className="footer__link">Boucles d'oreilles</Link>
            </div>

            {/* Newsletter */}
            <div className="footer__column">
              <h4 className="footer__column-title">Newsletter</h4>
              <p className="footer__newsletter-text">
                Recevez nos dernières nouveautés et offres exclusives.
              </p>
              <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Votre email..." 
                  className="footer__newsletter-input"
                  id="newsletter-email"
                />
                <button type="submit" className="footer__newsletter-btn" id="newsletter-submit">
                  →
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>

        <div className="footer__bottom">
          <p>© 2026 Soy Bijoux. Tous droits réservés.</p>
          <p>Fait avec 💛 au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
