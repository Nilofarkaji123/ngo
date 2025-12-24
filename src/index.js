import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="54055043424-u6ehvcch09deiq86aok6ivfaoi8heq4o.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
