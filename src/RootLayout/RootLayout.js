import { Outlet } from "react-router-dom";
import Header from "../Components/LayoutComponents/Header";
import Footer from "../Components/LayoutComponents/Footer";
import AuthGuard from "../AuthGuard";

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
