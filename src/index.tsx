import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import store from "./state/store";
import "@fontsource/roboto";
import "./body.css";
import "./customScrollbar.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  //<StrictMode>
  <I18nextProvider i18n={i18n}>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  </I18nextProvider>
  //</StrictMode>
);