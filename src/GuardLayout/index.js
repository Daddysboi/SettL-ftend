import React from "react";
import { Outlet } from "react-router-dom";
import Guard from "../Guard";

const GuardLayout = () => {
  return (
    <Guard>
      <Outlet />
    </Guard>
  );
};

export default GuardLayout;
