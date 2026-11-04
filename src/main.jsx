// 1. React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

// 2. React Router
import { BrowserRouter } from "react-router-dom";

// 3. MUI (Material UI)
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme.jsx";

// 4. Emotion (for global styles)
import { Global } from "@emotion/react";
import { GlobalStyles } from "./styles/globalStyles.js";

// 5. Redux
import { Provider } from "react-redux";
import store from "./store.jsx";

// 6. MSAL (Microsoft Authentication Library)
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./utils/auth.js";

// 7. App Entry
import App from "./App.jsx";

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Render React App
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global styles={GlobalStyles} />
        <BrowserRouter>
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
