import React, { useState, useEffect } from "react";
import { Divider, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import "./Sidebar.css";
import RoundedButton from "../Button/RoundedButton";
import LogoutModal from "../Logout/LogoutModal";
import { LocaleStrings } from "../../constants/locale-strings";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const { instance } = useMsal();
  const { sideMenuBarListItems, sideMenuBar } = LocaleStrings;

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const handleConfirmLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
    setTimeout(() => {
      sessionStorage.clear();
    }, 100);
    setOpen(false);
  };

  const handleLogoutModal = () => {
    setOpen(true);
  };

  const [activeItem, setActiveItem] = useState(sideMenuBarListItems.dashboard);

  const pathToMenuMap = {
    "/dashboard": sideMenuBarListItems.dashboard,
    "/projects": sideMenuBarListItems.projects,
    "/jobs": sideMenuBarListItems.jobs,
  };

  useEffect(() => {
    const current = pathToMenuMap[location.pathname];
    if (current) {
      setActiveItem(current);
    }
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    setActiveItem(item);
    switch (item) {
      case sideMenuBarListItems.dashboard:
        navigate("/dashboard");
        break;
      case sideMenuBarListItems.projects:
        navigate("/projects");
        break;
      case sideMenuBarListItems.jobs:
        navigate("/jobs");
        break;
      case sideMenuBarListItems.logout:
        handleLogoutModal();
        break;
      default:
        break;
    }
  };

  return (
    <div className="sidebar" data-testid="sidebar">
      <div className="text-lora-32-semi-bold" style={{ color: "#000000" }}>
        {sideMenuBar.hiText} {userProfile?.name || ""}!
      </div>

      <div
        className="text-montserrat-16-medium-line"
        style={{ color: "#6D6D6D", marginTop: "12px", marginBottom: "28px" }}
      >
        {sideMenuBar.subTitle}
      </div>

      <RoundedButton
        text={sideMenuBar.createNewProjectButtonTitle}
        imageSrc="assets/svg/Plus_White.svg"
        variant="primary-large"
        height={48}
        width={300}
        onClick={() => {}}
        testId="create-project-button"
      />

      <ul
        data-testid="sidebar-menu"
        style={{ width: "285px", listStyle: "none", padding: 0, margin: 0 }}
      >
        {Object.values(sideMenuBarListItems).map((item, index) => (
          <li
            key={item}
            data-testid={`sidebar-menu-item-${item
              .replace(/\s/g, "")
              .toLowerCase()}`}
            onClick={() => handleMenuClick(item)}
            className={activeItem === item ? "active" : ""}
            style={{
              padding: "20px 0",
              borderBottom:
                index !== sideMenuBarListItems.length - 1
                  ? "1.5px solid #e9e9e9"
                  : "none",
              cursor: "pointer",
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderRight: "1.5px solid #E9E9E9",
          height: "230px",
          marginRight: "-14px",
          marginTop: "-220px",
        }}
      />
      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onLogout={handleConfirmLogout}
      />
    </div>
  );
};

export default Sidebar;
