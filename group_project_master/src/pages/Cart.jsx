import { Link } from "react-router-dom";

function Cart(props) {
    const subtotal = props.cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0);

    return (
        <div className="app-container">
            <main style={{ padding: '40px', fontFamily: 'Roboto, sans-serif'}}>
            <h1 class = "title">Your Cart</h1>
            {props.cart.length === 0 ? (
                <div style={{ textAlign: 'center', margintop: '60px'}}>
                    <p style={{ fontSize: '20px' }}>Your cart is empty</p>
                    <Link to="/shop" className="btn btn-primary"> Go to shop</Link>
                </div>
            ) : (
                <div>
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th className = "subtitle-white">Item</th>
                                <th className = "subtitle-white">Price</th>
                                <th className = "subtitle-white">Quantity</th>
                                <th className = "subtitle-white">Total</th>
                                <th className = "subtitle-white">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.cart.map(cartItem => (
                                <tr key={cartItem.id}>
                                    <td>{cartItem.name}</td>
                                    <td>${cartItem.price.toLocaleString('en-us', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <div>
                                            <button className="btn btn-secondary btn-sm"
                                             onClick={() => props.updateQuantity(cartItem.id, cartItem.quantity - 1)}>-</button>
                                            <span>{cartItem.quantity}</span>
                                            <button className="btn btn-secondary btn-sm"
                                            onClick={() => props.updateQuantity(cartItem.id, cartItem.quantity + 1)}>+</button>
                                        </div>
                                    </td>
                                    <td>${(cartItem.price * cartItem.quantity).toLocaleString('en-us', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => props.removeFromCart(cartItem.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>
                        Subtotal: ${subtotal.toLocaleString('en-us', { minimumFractionDigits: 2 })}
                    </h4>

                    <div>
                        <Link to="/shop" className="btn btn-secondary me-2">Continue Shopping</Link>
                        <button className="btn btn-success btn-lg">Proceed to Checkout</button>
                    </div>
                </div>
            )}
            </main>
        </div>
    )
}
export default Cart;