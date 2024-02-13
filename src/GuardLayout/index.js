import React from "react";
import { Outlet } from "react-router-dom";
import AuthGuard from "../AuthGuard";

const GuardLayout = () => {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
};

export default GuardLayout;
