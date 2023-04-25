import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import GalleryPage from "./ui/GalleryPage";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { postReducer } from "./slice";
import postImagesSaga from "./saga";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutePaths } from "./routes";
import FavoritesPage from "./ui/FavoritesPage";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import "@fontsource/roboto";
import "./body.css";
import "./customScrollbar.css";

const saga = createSagaMiddleware();

const store = configureStore(
  {
    reducer: postReducer,
    middleware: [saga]
  })

saga.run(postImagesSaga);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  //<StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><GalleryPage /></>}>);
          </Route>
          <Route path={RoutePaths.favorites} element={<><FavoritesPage /></>} >
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </Provider>
  //</StrictMode>
);