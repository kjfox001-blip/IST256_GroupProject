import itemsData from '../../data/items.json';
import './ItemCards.css';
import useState from 'react';

const PLACEHOLDER = "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?semt=ais_hybrid&w=740&q=80";

const item = Array.isArray(itemsData) ? itemsData : itemsData.items ?? [];

function isDirectImageUrl(url) {
    return typeof url === 'string' && /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i.test(url);
}

function formatPrice(price) {
    if (typeof price !== 'number') return 'N/A';
    if (price < 1) return `${(price *100).toFixed(0)}¢/ea`;
    return`$${price.toLocaleString('en-us', { minimumFractionDigits: 2 })}`;
}

function ItemCards() {
    return (
        <div className="item-cards">
            {item.map((item) => {
                return(
                    <div className="item-card" key={item.id}>
                        <div className="item-card_image-container">
                            <img 
                                src={isDirectImageUrl(item.image) ? item.image : PLACEHOLDER} 
                                alt={item.name} 
                                className="item-card_img"
                                onError={(e) => {e.target.src = PLACEHOLDER; }} 
                            />
                        </div>
                        <div className="item-card_body">
                            <div className = "item-card_top-row">
                                {item.category && (
                                    <span className="item-card_category">{item.category}</span>
                             )}
                                <p className="item-card_price">{formatPrice(item.price)}</p>
                            </div>
                            <h4 className="item-card_name">{item.name}</h4>
                            <input type="number" className="item-card_counter" text="Input #"/>
                            <button type="button" class="btn btn-primary btn-lg">Add To Cart</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ItemCards;