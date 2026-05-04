import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import "../assets/titles.css";
import "../assets/checkout.css";
import'bootstrap/dist/css/bootstrap.min.css';

const EMPTY_FORM = {
    name: "",
    email: "",

    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    paymentMethod: "card",
    cardName: "",
    cardNum: "",
    cardExpDt:"",
    cardCvv: "",
};

function formatCardNumber(value){
    return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})/g, "$1")
    .trim();
}

function formatExpDate(value){
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if(digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
}
function Checkout(props){

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const orderRef = useRef(null);

    const subtotal = props.cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0);

    const taxRate = 0.06;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    function handleChange(e){
        const { name, value } = e.target;
        if(name === "cardNum"){
            setFormData(prev => ({ ...prev, [name]: formatCardNumber(value) }));
            return;
        }
        if(name === "cardExpDt"){
            setFormData(prev => ({ ...prev, [name]: formatExpDate(value) }));
            return;
        }
        if(name === "cardCvv"){
            setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 4) }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function validate(){
        const e = {};
        if (!formData.name.trim())e.name = "Name is Required";
        if (!formData.email.trim())e.email = "Email is Required";
        if (!formData.address.trim())e.address = "Address is Required";
        if (!formData.city.trim())e.city = "City is Required";
        if (!formData.state.trim())e.state = "State is Required";
        if (!formData.zipCode.trim())e.zipCode = "Zip Code is Required";
        if (formData.paymentMethod === "card"){
            if (!formData.cardName.trim())e.cardName = "Name on Card is Required";
            if (formData.cardNum.replace (/\s/g, '').length < 16)e.cardNum = "Card Number is Invalid";
            if (!formData.cardExpDt.trim())e.cardExpDt = "Card Expiry Date is Required";
            if (formData.cardCvv.length !== 3)e.cardCvv = "Card cvv is Invalid";
        }
        setErrors(e);
        return e;
    }
    function handleSubmit(e){
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        const now = new Date();
        
        const orderData = {
            orderid: `ORD-${now.getTime()}`,
            orderPlaced: now.toISOString(),
            customer:{
                name: formData.name,
                email: formData.email,
            },
            shippingInfo:{
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
            },
            paymentInfo:{
                method: formData.paymentMethod,
                ...(formData.paymentMethod ==="card" && {
                    cardName: formData.cardName,
                    cardNum: formData.cardNum,
                    cardExpDt: formData.cardExpDt,
                }),
            },
            items: props.cart.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            total: total,
        };
        orderRef.current = {
            ...orderData,
            subtotal: subtotal,
            tax: tax,
            total: total,
        };

        console.log("Order Placed:", orderData);
        setSubmitted(true);
        props.clearCart();
    }
    if (submitted){
        return(
            <div className="checkout-success">
                <main style={{ padding: '40px', fontFamily: 'Roboto, sans-serif'}}>
                    <div style={{maxWidth: '700px', margin: '0 auto', border: '1px solid #ddd', padding: '30px', borderRadius: '8px'}}>
                        
                        <h1 className="title">Order Confirmed</h1>
                        <p>Cheers! <strong>{formData.name}</strong> - your order has been placed</p>
                        <hr />
                        <h4>Order Details</h4>
                        <p><strong>Order ID:</strong>{orderRef.current.orderid}</p>
                        <p><strong>Email:</strong>{formData.email}</p>
                        <hr />
                        <h4>Shipping To</h4>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.state}, {formData.zipCode}</p>
                        <hr />
                        <h4>Items Ordered</h4>
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Item Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderRef.current.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>${item.price.toLocaleString('en-us', { minimumFractionDigits: 2 })}</td>
                                        <td>{item.quantity}</td>
                                        <td>${(item.price * item.quantity).toLocaleString('en-us', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            
                            <div style={{ textAlign: 'right'}}>
                                <p><strong>Subtotal:</strong> ${orderRef.current.subtotal.toLocaleString('en-us', { minimumFractionDigits: 2 })}</p>
                                <p><strong>Tax (6%):</strong> ${orderRef.current.tax.toLocaleString('en-us', { minimumFractionDigits: 2 })}</p>
                                <h4><strong>Total: ${orderRef.current.total.toLocaleString('en-us', { minimumFractionDigits: 2 })}</strong></h4>
                            </div>
                            <hr />

                            <div style={{textAlign: 'center'}}>
                                <Link to = "/shop" className="btn btn-primary">Continue Shopping</Link>
                                <Link to = "/home" className="btn btn-secondary">Home</Link>
                            </div>
                    </div>
                </main>
            </div>
    );
}
    return(
        <div className = "app-container">
            <main style = {{ padding: '40px', fontFamily: 'Roboto, sans-serif'}}>
                <h1 className="title">Checkout</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="string" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                        {errors.address && <small className="text-danger">{errors.address}</small>}
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="state">State</label>
                            <input type="text" className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} />
                            {errors.state && <small className="text-danger">{errors.state}</small>}
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input inputMode = "numeric" type="text" className="form-control" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                            {errors.zipCode && <small className="text-danger">{errors.zipCode}</small>}
                        </div>
                    </div>
                    <h2>Payment Information</h2>
                    <div className = "form-row">
                        {formData.paymentMethod === "card" && (<>
                            <div className = "form-group">
                                <label htmlFor="cardName">Name of Cardholder</label>
                                <input type="text" className="form-control" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} />
                                {errors.cardName && <small className="text-danger">{errors.cardName}</small>}
                            </div>
                            <div className = "form-group">
                                <label htmlFor="cardNum">Card Number</label>
                                <input type="number" className="form-control" id="cardNum" name="cardNum" value={formData.cardNumber} onChange={handleChange} />
                                {errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
                            </div>
                            <div className = "form-group">
                                <label htmlFor="cardExpDt">Expiry Date</label>
                                <input type="text" className="form-control" id="cardExpDt" name="cardExpDt" value={formData.cardExpDt} onChange={handleChange} />
                                {errors.cardExpDt && <small className="text-danger">{errors.cardExpDt}</small>}
                            </div>
                            <div className = "form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input inputMode="numeric" type="text" className="form-control" id="cardCvv" name="cardCvv" value={formData.cardCvv} onChange={handleChange} />
                                {errors.cardCvv && <small className="text-danger">{errors.cardCvv}</small>}
                            </div>
                        </>)}
                    </div>
                    <div className="order-section">
                        <h5 className="order-section_heading">Order Summary</h5>
                        <h5>Subtotal : ${subtotal.toLocaleString('en-us', { minimumFractionDigits: 2 })}</h5>
                        <h5>Tax (6%): ${tax.toLocaleString('en-us', { minimumFractionDigits: 2 })}</h5>
                        <h5><strong>Total: ${total.toLocaleString('en-us', { minimumFractionDigits: 2 })}</strong></h5>
                    </div>
                    <div className="checkout-actions">
                        <button type = "submit" className = "btn btn-success">Place Order</button>
                    </div>
                </form>
            </main>
        </div>
    );
}
export default Checkout;