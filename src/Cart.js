import React, { useState } from 'react';
import { useCart } from './CartContext';
import './cartStyle.css';

function Cart() {
  const { cartItems, totalPrice, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const placeOrder = () => {
    setOrderSuccess(true);
    clearCart();
  };

  const closePopup = () => {
    setOrderSuccess(false);
  };

  return (
    <div className="cart-container">
      <h1 style={{ textAlign: 'center' }}>Your Cart</h1>

      {cartItems.length > 0 ? (
        <div>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <p><strong>{item.name}</strong> - Rs. {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>Decrease</button>
                    <button onClick={() => increaseQuantity(item.id)}>Increase</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h4>Total Price: Rs. {totalPrice}</h4>
            <button className="checkout-btn" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>Your cart is empty</p>
      )}

      {orderSuccess && (
        <div className="order-success-popup">
          <div className="popup-content">
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been placed successfully. We will deliver it shortly.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
