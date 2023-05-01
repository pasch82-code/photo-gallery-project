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
 * @returns The `AppRoutes` component is being returned, which contains two `Route` components. The
 * first `Route` component has a path of "/" and renders the `GalleryPage` component. The second
 * `Route` component has a path of `RoutePaths.favorites` (which is likely a constant defined elsewhere
 * in the code) and renders the `FavoritesPage` component.
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