// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import React, { createContext, useEffect, useState } from "react";
// import Aos from "aos";
// import { TailSpin as Loader } from "react-loader-spinner";
// import "aos/dist/aos.css";

// import "./App.css";
// import Home from "./Pages/Home";
// import SignUp from "./Pages/SignUp";
// import PrivacyPolicy from "./Pages/PrivacyPolicy";
// import RootLayout from "./RootLayout/RootLayout";
// import SignIn from "./Pages/SignIn";
// import Error404 from "./Pages/Error404";
// import TermsAndConditions from "./Pages/TermsofService";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import ForgotPassword from "./Pages/ForgotPassword";
// import ResetPassword from "./Pages/ResetPassword";
// import Otp from "./Pages/Otp";
// import ConfirmTransaction from "./Pages/ConfirmTransaction";
// import GuardLayout from "./GuardLayout";

// export const userContext = createContext();

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<GuardLayout />}>
//       <Route path="/login" element={<SignIn />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route
//         path="/reset-password/:userId/:resetString"
//         element={<ResetPassword />}
//       />
//       <Route path="/otp" element={<Otp />} />
//       <React.Suspense fallback="...loading">
//         <Route path="/dashboard" index element={<Dashboard />}></Route>
//       </React.Suspense>
//       <Route path="/" element={<RootLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/confirm-transaction"
//           element={<ConfirmTransaction />}
//         ></Route>
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//         <Route path="*" element={<Error404 />} />
//       </Route>
//     </Route>
//   )
// );

// function App() {
//   // const [userData, setUserData] = useState("");
//   const [user, setUser] = useState([]);
//   const [profile, setProfile] = useState([]);

//   useEffect(() => {
//     Aos.init({
//       duration: 2000,
//     });
//   }, []);

//   return (
//     <userContext.Provider value={{ user, setUser, profile, setProfile }}>
//       <div className="App">
//         <RouterProvider router={router}>
//           {/* <React.Suspense
//             fallback={
//               <Loader
//                 type="TailSpin"
//                 color="#ff4500"
//                 height={60}
//                 width={60}
//                 style={{ margin: "auto" }}
//               />
//             }
//           > */}
//           {/* <RootLayout /> */}
//           {/* </React.Suspense> */}
//         </RouterProvider>
//       </div>
//     </userContext.Provider>
//   );
// }

// export default App;

import React, { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Aos from "aos";
import { TailSpin as Loader } from "react-loader-spinner";
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
      <Route path="/dashboard" index element={<Dashboard />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/confirm-transaction" element={<ConfirmTransaction />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Route>
  )
);

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentTransactionId, setcurrentTransactionId] = useState("");

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        currentTransactionId,
        setcurrentTransactionId,
      }}
    >
      <div className="App">
        <RouterProvider router={router}>
          <React.Suspense
            fallback={
              <Loader
                type="TailSpin"
                color="#ff4500"
                height={60}
                width={60}
                style={{ margin: "auto" }}
              />
            }
          >
            <RootLayout />
          </React.Suspense>
        </RouterProvider>
      </div>
    </userContext.Provider>
  );
}

export default App;
