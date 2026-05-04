import ItemCards from "../components/layout/ItemCards";
import '../assets/titles.css';

function Collection(props) {
    return (
        <div className="app-container">
            <main>
                <h1 className="title">{props.title}</h1>
                <h3 className="description">{props.description}</h3>
                <ItemCards
                    addToCart={props.addToCart}
                    filterCategory={props.category}
                />
            </main>
        </div>
    )
}
export default Collection;