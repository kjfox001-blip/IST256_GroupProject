
import MyFooter from '../components/layout/Footer';
import MyNav from '../components/layout/navbar';
import ItemCards from '../components/layout/ItemCards.jsx';
import '../assets/titles.css';

function Shop() {
  return (
    <div className="app-container">
      <header>
        {/* we are going to add some content here later */}
      </header>
      
      <main>
        {/* we are going to add some content here later */}
        <h1 class = 'title'>Shop</h1>
        <h3 class = 'description'>These deals won't cost you an arm or a leg!</h3>
        <ItemCards />
      </main>
      
    </div>
  );
}

export default Shop;