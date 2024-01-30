export const handlePaymentSuccess = async ({ reference }) => {
  try {
    // Make API call to backend to store transaction details and update wallet
    const response = await axios.post("/api/transactions", {
      reference,
      // other transaction details...
    });

    if (response.data.success) {
      // Update wallet balance after successful payment
      updateWallet(response.data.updatedWalletBalance);

      // Send invitation to buyer
      sendInvitation(response.data.buyerEmail);

      // Additional logic for handling transaction status
      // ...
    } else {
      console.error("Transaction failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
};
