import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Animal, CartItem } from '../types/animal';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (animal: Animal) => void;
  removeFromCart: (animalId: string) => void;
  updateQuantity: (animalId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (animal: Animal) => {
    console.log('Adding to cart:', animal.name);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.animal.id === animal.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.animal.id === animal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { animal, quantity: 1 }];
    });
  };

  const removeFromCart = (animalId: string) => {
    console.log('Removing from cart:', animalId);
    setCartItems(prevItems => prevItems.filter(item => item.animal.id !== animalId));
  };

  const updateQuantity = (animalId: string, quantity: number) => {
    console.log('Updating quantity for:', animalId, 'to:', quantity);
    if (quantity <= 0) {
      removeFromCart(animalId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.animal.id === animalId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.animal.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};