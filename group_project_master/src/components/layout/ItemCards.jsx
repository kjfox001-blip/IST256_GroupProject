import itemsData from '../../data/items.json';
import './ItemCards.css';
import { useState } from 'react';

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
    const [qty, setQty] = useState({});

    function increaseQty(id){
        setQty((prev) => ({...prev, [id]: (prev[id] || 0) + 1}));
    }

    function decreaseQty(id){
        setQty ((prev) => {
            const currentQty = prev[id] || 0;
            if (currentQty <= 1){
                const updatedQty = {...prev};
                delete updatedQty[id];
                return updatedQty;
            }
            return {...prev, [id]: currentQty - 1};
        });
    }

    return (
        <div className="item-cards">
            {item.map((item) => {
                const count = qty[item.id] || 0;
                const inCart = count > 0;
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
                            {inCart ?(
                                <div className = "item-card_counter">
                                    <button type="button" class="btn btn-primary btn-sm" onclick={() => decreaseQty(item.id)}>Small button</button>
                                    <span className="item-card_count">{count}</span>
                                    <button type="button" class="btn btn-primary btn-sm" onclick={() => increaseQty(item.id)}>Small button</button>
                                </div>
                            ) : (
                                <button type="button" class="btn btn-primary btn-lg">Add To Cart</button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ItemCards;