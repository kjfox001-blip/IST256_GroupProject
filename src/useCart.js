import { useState, useEffect } from 'react';

export const useCart = () => {
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (itemToAdd, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemToAdd.id);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === itemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...itemToAdd, quantity }];
    });
  };

  const removeFromCart = (idToBeRemoved) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== idToBeRemoved));
  };

  const updateQuantity = (idToUpdate, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(idToUpdate);
      return;
    }

    setCart(prevCart => prevCart.map(cartItem =>
      cartItem.id === idToUpdate
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};