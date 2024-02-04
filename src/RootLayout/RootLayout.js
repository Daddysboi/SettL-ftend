import Header from "../Components/LayoutComponents/Header";
import Footer from "../Components/LayoutComponents/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
