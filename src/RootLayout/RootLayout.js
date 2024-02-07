import { Outlet } from "react-router-dom";
import Header from "../Components/LayoutComponents/Header";
import Footer from "../Components/LayoutComponents/Footer";
import AuthGuard from "../AuthGuard";

const RootLayout = () => {
  return (
    <div>
      <AuthGuard>
        <Header />
        <Outlet />
        <Footer />
      </AuthGuard>
    </div>
  );
};

export default RootLayout;
