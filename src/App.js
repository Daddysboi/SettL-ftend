import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import RootLayout from "./RootLayout/RootLayout";
import SignIn from "./Pages/SignIn";
import Error404 from "./Pages/Error404";
import TermsAndConditions from "./Pages/TermsofService";
import Payment from "./Components/Payment";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Otp from "./Pages/Otp";

export const userContext = createContext();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:userId/:resetString"
        element={<ResetPassword />}
      />
      <Route path="/otp" element={<Otp />} />

      <Route path="/" element={<RootLayout />}>
        <Route path="/dashboard" index element={<Dashboard />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Route>
  )
);

function App() {
  const [userData, setUserData] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  return (
    <userContext.Provider
      value={{ user, setUser, profile, setProfile, userData, setUserData }}
    >
      <div className="App">
        <RouterProvider router={router}>
          <RootLayout />
        </RouterProvider>
      </div>
    </userContext.Provider>
  );
}

export default App;
