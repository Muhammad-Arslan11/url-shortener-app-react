import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../pages/Header';

function Layout() {
  return (
    <div>
      {/* Main section */}
      <main className="w-screen h-screen bg-gray-800">
        <Header/>
        <Outlet />
      </main>

      {/* Footer section below main */}
      <footer className="w-screen p-10 bg-gray-600 text-center text-gray-200">
        &copy; {new Date().getFullYear()} github.com/Muhammad-Arslan11
      </footer>
    </div>
  );
}

export default Layout;
