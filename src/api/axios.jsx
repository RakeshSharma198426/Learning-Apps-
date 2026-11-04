import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  loginRequest,
  msalInstance,
  msalInstanceInitialized,
} from "../utils/auth";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    await msalInstanceInitialized;
    try {
      const token = sessionStorage.getItem("accessToken");

      const isTokenExpired = (token) => {
        if (!token) return true;
        const { exp } = jwtDecode(token);
        const bufferTime = 60 * 1000; // seconds before actual expiry
        return Date.now() >= exp * 1000 - bufferTime;
      };
      let accessToken = token;

      if (isTokenExpired(token)) {
        const account = msalInstance.getAllAccounts()[0];
        if (account) {
          try {
            const response = await msalInstance.acquireTokenSilent({
              scopes: loginRequest.scopes,
              account,
            });
            accessToken = response.accessToken;
            sessionStorage.setItem("accessToken", accessToken);
          } catch (err) {
            if (err instanceof InteractionRequiredAuthError) {
              msalInstance.logoutRedirect({ postLogoutRedirectUri: "/" });
              sessionStorage.clear();
              console.error("User interaction required:", err);
            } else {
              msalInstance.logoutRedirect({ postLogoutRedirectUri: "/" });
              sessionStorage.clear();
              console.error("Silent token refresh failed:", err);
            }
          }
        }
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      const subscriptionValue = import.meta.env
        .VITE_API_OCP_APIM_SUBSCRIPTION_KEY;
      if (subscriptionValue) {
        config.headers["Ocp-Apim-Subscription-Key"] = subscriptionValue;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);
export default api;
