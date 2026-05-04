import MyNav from './components/layout/navbar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import Collection from './pages/Collection.jsx';
import MyFooter from './components/layout/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout.jsx';
import { useCart } from './useCart.js';

function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

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