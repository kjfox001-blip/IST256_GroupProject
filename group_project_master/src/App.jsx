import MyNav from './components/layout/navbar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import MyFooter from './components/layout/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>

    </div>
  );
}

export default App;