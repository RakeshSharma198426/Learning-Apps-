import { PublicClientApplication } from "@azure/msal-browser";

export const isAuthenticated = () => {
  return sessionStorage.getItem("accessToken") ? true : false;
};

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_MSAL_TENANT_ID
    }`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
  },
};

export const role = import.meta.env.VITE_MSAL_ROLE;
export const groups = import.meta.env.VITE_MSAL_GROUP;

export const loginRequest = {
  scopes: ["email", import.meta.env.VITE_MSAL_API_SCOPE, "User.Read"],
};
export const msalInstance = new PublicClientApplication(msalConfig);
export const msalInstanceInitialized = msalInstance.initialize();