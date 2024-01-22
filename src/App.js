import RootLayout from "./RootLayout/RootLayout";
import "./App.css";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import SignIn from "./Pages/SignIn";
import Error404 from "./Pages/Error404";
import TermsAndConditions from "./Pages/TermsAndConditions";
import Payment from "./Components/Payment";
import Contracts from "./Components/Contracts";
import Otp from "./Pages/Otp";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/otp" element={<Otp />} />

      <Route path="/payment" element={<Payment />} />

      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
