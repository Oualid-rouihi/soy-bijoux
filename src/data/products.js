// ===== SOY BIJOUX — Product Data =====
// Add your own products here. Replace images with your own product photos.

export const categories = [
  {
    id: 'bracelets',
    name: 'Bracelets',
    description: 'Élégance à votre poignet',
    image: '/images/categories/bracelets.jpg',
  },
  {
    id: 'colliers',
    name: 'Colliers',
    description: 'Sublimez votre décolleté',
    image: '/images/categories/colliers.jpg',
  },
  {
    id: 'bagues',
    name: 'Bagues',
    description: 'Des bagues qui racontent votre histoire',
    image: '/images/categories/bagues.jpg',
  },
  {
    id: 'boucles',
    name: "Boucles d'oreilles",
    description: 'Éclat et raffinement',
    image: '/images/categories/boucles.jpg',
  },
];

// Empty list - Waiting for you to add your products!
export const products = [  {
    id: 1,
    name: "Bague Ajustable Triple Rang",
    price: 45,
    originalPrice: null,
    category: "bagues",
    badge: null,
    inStock: true,
    description: "Bague Ajustable Triple Rang - Acier Inoxydable\n\nUn design audacieux pour une élégance instantanée. Cette bague en acier inoxydable doré superpose trois délicats anneaux pour un effet de volume sophistiqué",
    images: ['/images/products/bagues/Bagues_5.jpeg'],
  },
  {
    id: 2,
    name: "Bague Ouverte Asymétrique",
    price: 49,
    originalPrice: null,
    category: "bagues",
    badge: null,
    inStock: true,
    description: "Un design asymétrique contemporain pour un look minimaliste ultra-tendance. Cette bague ajustable en acier inoxydable résiste au quotidien tout en apportant une touche d'originalité unique à vos mains.",
    images: ['/images/products/bagues/Bagues_28.jpeg'],
  },
];

export const getFeaturedProducts = () => products.filter(p => p.badge === 'best seller');
export const getNewProducts = () => products.filter(p => p.badge === 'nouveau');
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getProductById = (id) => products.find(p => p.id === Number(id));
