import React from "react";
import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div>
      {/* Main section */}
      <main className="w-screen bg-gray-800">
        <Header/>
        <Outlet />
        {/* Footer section below main */}
        <Footer/>
      </main>
    </div>
  );
}

export default Layout;
