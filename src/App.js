import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import "./App.css";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import RootLayout from "./RootLayout/RootLayout";
import SignIn from "./Pages/SignIn";
import Error404 from "./Pages/Error404";
import TermsAndConditions from "./Pages/TermsofService";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Otp from "./Pages/Otp";
import ConfirmTransaction from "./Pages/ConfirmTransaction";
import GuardLayout from "./GuardLayout";

export const userContext = createContext();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GuardLayout />}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:userId/:resetString"
        element={<ResetPassword />}
      />
      <Route path="/otp" element={<Otp />} />
      <Route path="/dashboard" index element={<Dashboard />}></Route>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/confirm-transaction"
          element={<ConfirmTransaction />}
        ></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Route>
  )
);

function App() {
  // const [userData, setUserData] = useState("");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, profile, setProfile }}>
      <div className="App">
        <RouterProvider router={router}>
          <RootLayout />
        </RouterProvider>
      </div>
    </userContext.Provider>
  );
}

export default App;
