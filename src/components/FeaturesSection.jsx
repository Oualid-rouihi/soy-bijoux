import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollAnimations';
import { TbTruckDelivery, TbDiamond, TbHeadset, TbShieldCheck } from 'react-icons/tb';
import './FeaturesSection.css';

const features = [
  {
    icon: <TbTruckDelivery size={32} />,
    title: 'Livraison Rapide',
    description: 'Livraison partout au Maroc en 24-48h',
  },
  {
    icon: <TbDiamond size={32} />,
    title: 'Qualité Premium',
    description: 'Bijoux en acier inoxydable, plaqué or garanti',
  },
  {
    icon: <TbHeadset size={32} />,
    title: 'Service Client',
    description: 'À votre écoute 7j/7 via WhatsApp',
  },
  {
    icon: <TbShieldCheck size={32} />,
    title: 'Paiement Sécurisé',
    description: 'Paiement à la livraison disponible',
  },
];

export default function FeaturesSection() {
  return (
    <section className="features-section" id="features-section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Pourquoi Soy Bijoux ?</h2>
          <p className="section-subtitle">
            Nous mettons l'excellence à votre portée
          </p>
        </ScrollReveal>

        <StaggerContainer className="features-grid">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="feature-card" id={`feature-${index}`}>
                <div className="feature-card__icon">
                  {feature.icon}
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
