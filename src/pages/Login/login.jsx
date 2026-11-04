import React from "react";
import { Grid, Button, Paper, Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../utils/auth";
import colors from "../../theme/colors";

const Login = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    sessionStorage.setItem("postLoginRedirect", "/dashboard");
    instance.loginRedirect({ ...loginRequest, prompt: "select_account" });
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side */}
      <Grid
        size={{ xs: 12, md: 5 }}
        container
        alignItems="center"
        sx={{
          pl: "72px",
        }}
      >
        {/* Login Content */}
        <Grid item>
          <Grid item sx={{ position: "absolute", top: 20 }}>
            <img src="/assets/svg/Logo.svg" alt="Wipfli Logo" width="100" />
          </Grid>

          <div
            style={{ marginBottom: "38px", color: colors.primary }}
            className="text-lora-36-bold"
          >
            FRD creation Login
          </div>

          <Paper
            elevation={1}
            sx={{
              py: 4,
              px: 3,
              borderRadius: "16px",
              width: "400px",
              height: "255px",
              boxShadow: "none",
              border: "1px solid #E1E1E1",
            }}
          >
            <div
              style={{ marginBottom: "8px", color: "#000000" }}
              className="text-lora-24-bold"
            >
              Glad to see you here !
            </div>

            <div
              style={{ marginBottom: "24px", color: "#7B7B7B" }}
              className="text-montserrat-12-medium-line"
            >
              Welcome to WipFli FRD generation platform
            </div>

            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.primary,
                height: "48px",
                width: "352px",
                borderRadius: 10,
                textTransform: "none",
              }}
              onClick={handleLogin}
            >
              <div
                style={{ color: "#fff" }}
                className="text-montserrat-14-semi-bold"
              >
                Login with Azure SSO
              </div>

              <Box
                component="img"
                src="/assets/svg/Arrow.svg"
                alt=""
                sx={{
                  width: 10,
                  height: 10,
                  marginRight: 0.5,
                  marginLeft: 1.0,
                }}
              />
            </Button>

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              mt={3}
            >
              <div
                className="text-montserrat-14-medium-line"
                style={{
                  color: "#606060",
                }}
              >
                Need help?
              </div>
              <div
                className="text-montserrat-12-medium-line"
                style={{ marginLeft: "8px" }}
              >
                Contact IT Support
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Right Side */}
      <Grid
        item
        size={{ xs: 0, md: 7 }}
        sx={{
          backgroundImage: "url(/assets/svg/Login_Image.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default Login;
