// FirstSection.js
import React from "react";

const FirstSection = ({ formData, handleChange }) => {
  return (
    <>
      <div className="checkout-field">
        <input
          type="text"
          name="sellerName"
          placeholder="Seller Name"
          value={formData.sellerName}
          onChange={handleChange}
        />
      </div>

      <div className="checkout-field">
        <input
          type="text"
          name="sellerEmail"
          placeholder="Seller Email"
          value={formData.sellerEmail}
          onChange={handleChange}
        />
      </div>

      <div className="checkout-field">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
        />
      </div>

      <div className="checkout-field">
        <input
          type="text"
          name="productDescription"
          placeholder="Product Description"
          value={formData.productDescription}
          onChange={handleChange}
        />
      </div>

      <div className="checkout-field">
        <input
          type="text"
          name="productQuantity"
          placeholder="Qty"
          value={formData.productQuantity}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default FirstSection;
