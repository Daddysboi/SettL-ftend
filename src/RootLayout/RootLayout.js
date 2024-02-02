import Header from "../Components/LayoutComponents/Header";
import Footer from "../Components/LayoutComponents/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
