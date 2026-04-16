import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('soy-bijoux-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('soy-bijoux-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';

    let msg = `Bonjour! 👋\nJe souhaite commander:\n\n`;

    cartItems.forEach((item, index) => {
      msg += `${index + 1}. 🛍️ *${item.name}*\n`;
      msg += `   💰 ${item.price} Dh × ${item.quantity} = ${item.price * item.quantity} Dh\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━\n`;
    msg += `💵 *Total: ${totalPrice} Dh*\n\n`;
    msg += `Merci de confirmer la disponibilité et les détails de livraison! 🙏`;

    return encodeURIComponent(msg);
  };

  const orderViaWhatsApp = () => {
    const msg = generateWhatsAppMessage();
    if (msg) {
      window.open(`https://wa.me/212604965460?text=${msg}`, '_blank');
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      orderViaWhatsApp,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
