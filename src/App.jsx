import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useMsal } from "@azure/msal-react";
import "../src/styles/styles.scss";
import AppRoutes from "./routes/appRoutes";
import { groups, role } from "./utils/auth";

const App = () => {
  const { instance } = useMsal();
  const [isMsalReady, setIsMsalReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isInitialized = false;
    const init = async () => {
      if (isInitialized) return; // Prevent duplicate calls
      isInitialized = true;

      try {
        await instance.initialize();

        const response = await instance.handleRedirectPromise();

        if (response) {
          // Decode the JWT token
          const decodedToken = jwtDecode(response.accessToken);
          const userProfile = {
            email: decodedToken.preferred_username,
            name: decodedToken.name,
            userId: decodedToken.oid,
          };

          // Check for roles and groups .

          const hasValidRoles =
            decodedToken.roles && decodedToken.roles.includes(role);
          const hasValidGroups =
            decodedToken.groups && decodedToken.groups.includes(groups);

          if (hasValidRoles && hasValidGroups) {
            // Store the access token if valid
            sessionStorage.setItem("accessToken", response.accessToken);
            sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
            // Redirect to the dashboard
            const redirectPath =
              sessionStorage.getItem("postLoginRedirect") || "/dashboard";
            sessionStorage.removeItem("postLoginRedirect");
            window.location.replace(redirectPath);
          } else {
            // Handle invalid roles/groups
            sessionStorage.setItem("authError", true);
            navigate("/unauthorized-error", { replace: true });
          }
        }
        setIsMsalReady(true);
      } catch (error) {
        sessionStorage.clear();
        console.error("MSAL redirect error:", error);
      }
    };

    init();
  }, [instance]);

  return (
    <>
      {!isMsalReady ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <AppRoutes />
      )}
    </>
  );
};

export default App;
