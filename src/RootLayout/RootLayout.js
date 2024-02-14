import { Outlet } from "react-router-dom";
import Header from "../Components/LayoutComponents/Header";
import Footer from "../Components/LayoutComponents/Footer";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
