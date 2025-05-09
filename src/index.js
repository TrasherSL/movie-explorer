import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider } from "./theme/ThemeContext";
import { MovieProvider } from "./context/MovieContext";  // Import MovieProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CustomThemeProvider>
    <BrowserRouter>
      <MovieProvider>  {/* Wrap the app with MovieProvider */}
        <App />
      </MovieProvider>
    </BrowserRouter>
  </CustomThemeProvider>
);
