import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";

import "./SidebarLayout.css";

import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  const handleSearch = (query) => {
    // Handle the search query (e.g., filter data, API call, etc.)
  };

  return (
    <div className="layout-container">
      <Header onSearch={handleSearch} isSearchBar="true" />{" "}
      {/* Move Header here */}
      <div className="layout-main">
        <Sidebar />
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SidebarLayout;
