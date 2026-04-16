import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { ScrollReveal } from '../components/ScrollAnimations';
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-wrapper" id="contact-page">
      <div className="contact-header">
        <ScrollReveal>
          <h1 className="contact-header__title">Contactez-Nous</h1>
          <p className="contact-header__subtitle">
            Nous serions ravis de vous entendre. N'hésitez pas à nous contacter !
          </p>
        </ScrollReveal>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Contact Form */}
          <ScrollReveal variant="fadeInLeft" className="contact-form-wrapper">
            <h2 className="contact-form__title">Envoyez-nous un message</h2>
            
            {submitted ? (
              <motion.div 
                className="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="contact-success__icon">✨</span>
                <h3>Message envoyé !</h3>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__group">
                  <label htmlFor="contact-name">Nom complet</label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Votre nom..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Votre message..."
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="shimmer-btn" id="contact-submit">
                  Envoyer le Message
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal variant="fadeInRight" className="contact-info-wrapper">
            <h2 className="contact-info__title">Nos Coordonnées</h2>
            
            <div className="contact-info__items">
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <HiOutlineLocationMarker size={22} />
                </div>
                <div>
                  <h4>Adresse</h4>
                  <p>Casablanca, Maroc</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <HiOutlinePhone size={22} />
                </div>
                <div>
                  <h4>Téléphone</h4>
                  <p>+212 604 965 460</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <HiOutlineMail size={22} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>contact@soybijoux.ma</p>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <h4 className="contact-socials__title">Suivez-nous</h4>
              <div className="contact-socials__links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-social" id="contact-instagram">
                  <FaInstagram size={22} />
                  <span>Instagram</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="contact-social" id="contact-tiktok">
                  <FaTiktok size={20} />
                  <span>TikTok</span>
                </a>
                <a href="https://wa.me/212604965460" target="_blank" rel="noopener noreferrer" className="contact-social contact-social--whatsapp" id="contact-whatsapp">
                  <FaWhatsapp size={22} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
