import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";

const CreateTransaction = () => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    sellerName: "",
    sellerEmail: "",
    productName: "",
    productDescription: "",
    productQuantity: "",
    productPrice: "",
    productColor: "",
    productImage: "",
    deliveryAddress: "",
    expectedDeliveryDate: "",
    termsAndConditions: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // ...

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      termsAndConditions: !formData.termsAndConditions,
    });
  };

  // ...

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      formData.sellerName &&
      formData.sellerEmail &&
      formData.productName &&
      formData.productDescription &&
      formData.productQuantity &&
      formData.productPrice &&
      formData.productColor &&
      formData.productImage &&
      formData.currency &&
      formData.deliveryAddress &&
      formData.expectedDeliveryDate &&
      formData.deliveryMethod &&
      formData.transactionType &&
      formData.termsAndConditions
    );
  };

  const generateContract = () => {
    // Display the contract as a pop-up or modal
    alert("Review contract:\n\n" + JSON.stringify(formData, null, 2));
  };
  const componentProps = {
    email: formData.sellerEmail,
    amount: parseFloat(formData.productPrice) * 100,
    metadata: {
      name: formData.sellerName,
      phone: "", // Add a phone field if needed
    },
    publicKey,
    text: "Buy Now",
    onSuccess: ({ reference }) => {
      generateContract();
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
    },
    onClose: () => alert("Wait! You need this product, don't go!"),
  };
  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value);

    if (!isNaN(amount)) {
      setFormData({ ...formData, productPrice: amount.toFixed(2) });
    } else {
      // Handle invalid amount input (non-numeric)
      setFormData({ ...formData, productPrice: "" });
    }
  };
  // const handlePay = () => {
  //   // Validate form before allowing payment
  //   if (isFormValid()) {
  //     const amountInKobo = Math.floor(parseFloat(formData.productPrice) * 100);

  //     if (isNaN(amountInKobo) || amountInKobo <= 0) {
  //       alert("Invalid product price. Please enter a valid amount.");
  //       return;
  //     }

  //     const updatedComponentProps = {
  //       ...componentProps,
  //       amount: amountInKobo,
  //     };

  //     // Implement payment logic here
  //     alert("Payment successful!");
  //   } else {
  //     alert(
  //       "Please fill in all the required fields and accept terms before proceeding."
  //     );
  //   }
  // };

  return (
    <div className="App">
      <div className="checkout-form">
        <FirstSection formData={formData} handleChange={handleChange} />
        <SecondSection formData={formData} handleChange={handleChange} />

        {/* Checkbox for terms and conditions */}

        <div className="checkout-field">
          <input
            type="text"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleAmountChange}
            placeholder="Product Price"
          />
        </div>
        {/* Button to review contract */}
        <button
          type="button"
          onClick={generateContract}
          disabled={!isFormValid()}
        >
          Review Contract
        </button>
        <div className="checkout-field">
          <input
            type="checkbox"
            id="termsAndConditions"
            checked={formData.termsAndConditions}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsAndConditions">
            I accept the Terms and Conditions
          </label>
        </div>

        <PaystackButton className="paystack-button" {...componentProps} />
      </div>
    </div>
  );
};

export default CreateTransaction;
