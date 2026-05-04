import Hero from '../components/Home/Hero';
import MyFooter from '../components/layout/Footer';
import MyNav from '../components/layout/navbar';
import itemsData from '../data/items.json';
import '../assets/titles.css';
import '../components/layout/ItemCards.css';

const allItems = Array.isArray(itemsData) ? itemsData : itemsData.items ?? [];

const hotItemIds = [22, 29, 30, 1, 9, 2, 18, 23];
const hotItems = allItems.filter(item => hotItemIds.includes(item.id));

function Home(props) {
  return (
    <div className="app-container">
      <Hero />
      <main>
        <h1 className="title">Hot Items</h1>
        <h3 className="description">Check out our most popular items</h3>
        <div className="item-cards">
          {hotItems.map(item => (
            <div className="item-card" key={item.id}>
            <div className="item-card-img_container">
              <img
              src={item.image}
              alt={item.name}
              className="item-card_img"
              />
            </div>
            <div className="item-card_body">
              <div className="item-card_top-row">
                  <span className="item-card_category">{item.category}</span>
                  <p className="item-card_price">${item.price.toLocaleString('en-us', { minimumFractionDigits: 2 })}</p>
                </div>
                <h4 className="item-card_name">{item.name}</h4>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => props.addToCart(item, 1)}>
                  Add To Cart
                </button>
              </div>
          </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;