import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

const Contracts = () => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    sellerName: "",
    sellerEmail: "",
    productName: "",
    productDescription: "",
    productQuantity: "",
    productPrice: "",
    ProductColor: "",
    ProductImage: "",
    currency: "NGN", // Assuming Nigerian Naira, update as needed
    deliveryAddress: "",
    deliveryMethod: "",
    transactionType: "",
    expectedDeliveryDate: "",
    termsAndConditions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateContract = () => {
    // Use a template string for the contract
    const contract = `
      Contract:

      This Contract Agreement is entered into by and between ${formData.buyerName} ("Buyer") and ${formData.sellerName} ("Seller") on this date.

      1. Product Details:
         Product: ${formData.productName}
         Description: ${formData.productDescription}
         Quantity: ${formData.productQuantity}
         Price: ${formData.productPrice} ${formData.currency}

      2. Delivery Information:
         Delivery Address: ${formData.deliveryAddress}
         Delivery Method: ${formData.deliveryMethod}
         Expected Delivery Date: ${formData.expectedDeliveryDate}

      3. Transaction Details:
         Transaction Type: ${formData.transactionType}

      4. Terms and Conditions:
         ${formData.termsAndConditions}

      Buyer's Name: ${formData.buyerName}             Seller's Name: ${formData.sellerName}
      Buyer's Email: ${formData.buyerEmail}           Seller's Email: ${formData.sellerEmail}
    `;

    // Log or handle the contract as needed (e.g., send to backend, display to user)
    console.log(contract);

    // Display the contract for review (you can customize this part as needed)
    alert("Review contract:\n\n" + contract);
  };

  const componentProps = {
    email: formData.buyerEmail,
    amount: parseFloat(formData.productPrice) * 100,
    metadata: {
      name: formData.buyerName,
      phone: "", // Add a phone field if needed
    },
    publicKey,
    text: "Buy Now",
    onSuccess: ({ reference }) => {
      // Payment successful, generate the contract
      generateContract();
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
    },
    onClose: () => alert("Wait! You need this product, don't go!"),
  };

  return (
    <div className="App">
      {/* Your existing UI components */}
      {/* ... */}

      <div className="checkout-form">
        {/* Your existing form fields */}
        {/* ... */}

        {/* New form fields for additional details */}
        <div className="checkout-field">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>
        <div className="checkout-field">
          <label>Product Description</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
          />
        </div>
        {/* Add more fields as needed */}

        {/* Button to initiate payment */}
        <PaystackButton className="paystack-button" {...componentProps} />

        {/* Button to display generated contract */}
        <button type="button" onClick={generateContract}>
          Review Contract
        </button>
      </div>
    </div>
  );
};

export default Contracts;
