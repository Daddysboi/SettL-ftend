// SecondSection.js
import React from "react";

const SecondSection = ({ formData, handleChange }) => {
  const handleFileChange = (e) => {
    // Access the file from the event
    const file = e.target.files[0];

    // You may want to perform additional checks on the file, such as size or type

    // Update the form data
    handleChange({
      target: {
        name: "productImage",
        value: file, // This assumes you want to store the entire File object in state
      },
    });
  };

  return (
    <>
      <div className="checkout-field">
        <input
          type="file"
          name="productImage"
          placeholder="Product Image"
          onChange={handleFileChange}
        />
      </div>

      <div className="checkout-field">
        <input
          type="text"
          name="productColor"
          placeholder="Product Color"
          value={formData.productColor}
          onChange={handleChange}
        />
      </div>

      <div className="checkout-field">
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
        />
      </div>

      <div className="checkout-field">
        <input
          type="text"
          name="expectedDeliveryDate"
          placeholder="Expected Delivery Date"
          value={formData.expectedDeliveryDate}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SecondSection;
