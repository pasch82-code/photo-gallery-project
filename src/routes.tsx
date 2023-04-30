import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import FavoritesPage from "./ui/favorites/FavoritesPage";;
import GalleryPage from "./ui/gallery/GalleryPage";
import { useAppDispatch } from "./state/state";
import { initFromLocalStorage } from "./state/favorites/favoritesSlice";

export namespace RoutePaths {
    export const favorites = "favorites";
}

/**
 * This is a function that defines the routes for a React app and initializes data from local storage.
 */
function AppRoutes() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initFromLocalStorage());
    }, []);

    return (<Routes>
        <Route path="/" element={<><GalleryPage /></>}>);
        </Route>
        <Route path={RoutePaths.favorites} element={<><FavoritesPage /></>} >
        </Route>
    </Routes>)
}

export default AppRoutes