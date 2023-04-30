import createSagaMiddleware from "redux-saga";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import saga from "../sagas/saga";
import { filtersReducer } from "./filters/filtersSlice";
import { uiReducer } from "./ui/uiSlice";
import { AppState } from "./state";
import { favoritesReducer } from "./favorites/favoritesSlice";
import { postsReducer } from "./posts/postsSlice";

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers<AppState>({
  filters: filtersReducer,
  ui: uiReducer,
  favoritesPage: favoritesReducer,
  galleryPage: postsReducer
});

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV === 'development'
  })

sagaMiddleware.run(saga);

export default store;