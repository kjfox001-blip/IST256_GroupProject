import { useState, useEffect } from 'react';
import MyNav from './components/layout/navbar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import Collection from './pages/Collection.jsx';
import MyFooter from './components/layout/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout.jsx';


function App() {
  const [cart, setCart] =useState([]);

  const addToCart = (itemToAdd, quantity) => {
    const existingItem =cart.find(cartItem => cartItem.id === itemToAdd.id);

    if (existingItem) {
      const updatedCart = cart.map(cartItem => { 
        if (cartItem.id === itemToAdd.id) {
          return { ...cartItem, quantity: cartItem.quantity + quantity};
        }
        return cartItem;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...itemToAdd, quantity: quantity }])
    }
  }

  const removeFromCart = (idToBeRemoved) => {
    const remainingItems = cart.filter(cartItem => {
      return cartItem.id !== idToBeRemoved;
    });
    setCart(remainingItems);
  }
   const updateQuantity = (idToUpdate, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(idToUpdate);
      return;
    }

    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === idToUpdate) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    setCart(updatedCart);
   }

   const clearCart = () => {
      setCart([]);
    }

    useEffect(() => {
      if (cart.length > 0){
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      }
    }, [cart]);

    useEffect(() => {
      const savedCart = localStorage.getItem('shoppingCart');
      if(savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/cart" element= { 
            <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity} />} />
            <Route path="/armor" element={
              <Collection
                title="Armour"
                description="Never forget who you are. Wear it Like Armour."
                category="Armour"
                addToCart={addToCart}/>
            }/>
            <Route path="/arms" element={
              <Collection
                title="Arms"
                description="A swordsman should be as good as his sword."
                category="Arms"
                addToCart={addToCart}/>
            }/>
            <Route path="/shields" element={
              <Collection
                title="Shield"
                description="The shields that guarded the realms of men."
                category="Shields"
                addToCart={addToCart}/>
            }/>
            <Route path="/checkout" element={<Checkout cart={cart} clearCart = {clearCart} />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>

    </div>
  );
}

export default App;