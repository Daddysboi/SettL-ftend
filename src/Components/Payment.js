import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

const Payment = () => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value);

    if (!isNaN(amount)) {
      setFormData({ ...formData, amount: amount.toFixed(2) });
    } else {
      // Handle invalid amount input (non-numeric)
      setFormData({ ...formData, amount: "" });
    }
  };

  const componentProps = {
    email: formData.email,
    amount: parseFloat(formData.amount) * 100, // Convert to kobo
    metadata: {
      name: formData.name,
      phone: formData.phone,
    },
    publicKey,
    text: "Buy Now",
    onSuccess: ({ reference }) => {
      alert(
        `Your transaction was successful! Transaction reference: ${reference}`
      );
    },
    onClose: () => alert("Transaction Cancelled"),
  };

  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <div className="overlay-effect"></div>
          <img
            className="item-image"
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="product"
          />
          <div className="item-details">
            <p className="item-details__title">Coconut Oil</p>
            <p className="item-details__amount">
              NGN {parseFloat(formData.amount).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="checkout-field">
              <label>Amount</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
