import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        <main>
            {/* Header */}
            <Outlet/>
        </main>
        {/*  Footer*/}
      </div>
    </>
  );
}

export default Layout;
