import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>

      <main className="min-h-screen max-w-7xl container mx-auto px-4">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-15">
        Made with ❤️ by Sujal Singal
      </div>
    </div>
  );
};

export default AppLayout;
