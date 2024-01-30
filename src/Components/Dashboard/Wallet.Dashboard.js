import React from "react";

const Wallet = () => {
  return <div>Wallet Coming soon </div>;
};

export default Wallet;

// ib real application i shouldnt be ablle to save and be promted to input fields required and if possible sent and error with toast, you can add toast to this form and a more validation and i notice the bback botton closes the form which only suppose to take be back to the previous modal, the save option too should save all thhe imput fields accumulatively in each state, if you need a form validator apart  from yup, feel free to introduuce a library that will do all that sice yup did not work

const handleBack = () => {
  // Handle going back to the previous modal or step
  // For now, just close the current modal
  onRequestClose();
};
