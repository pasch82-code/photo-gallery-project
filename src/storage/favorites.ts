import isEmpty from "lodash/isEmpty"
import isNil from "lodash/isNil"

const favoritesKey = `photo-gallery-favorites`

/**
 * This code defines a TypeScript namespace called `FavoriteStorage` that contains three functions for
managing favorite items in local storage.
 */
export namespace FavoriteStorage {

    /**
     * This function retrieves favorite items from local storage and returns them as an array.
     * @returns The function `getFavorites` returns an array of favorite items that are stored in the
     * local storage. If there are no favorite items stored, it returns `null`.
     */
    export const getFavorites = () => {
        const favorites = localStorage.getItem(favoritesKey)
        if (isNil(favorites) || isEmpty(favorites))
            return null;
        else
            return favorites.split(",")
    }

    /**
     * This function sets the user's favorite items in local storage.
     * @param {string[]} favorites - favorites is an array of strings that represents the user's favorite posts ids.
     * This function sets the favorites in the browser's local storage by converting the array to a
     * comma-separated string using the `toString()` method. If the `favorites` parameter is null or
     * undefined, an empty string is stored in
     */
    /**
     * The function sets an array of strings as favorites in local storage.
     * @param {string[]} favorites - `favorites` is an array of strings that contains the list of favorite
     * items that the user has selected. This function takes this array and stores it in the browser's
     * local storage using the `localStorage.setItem()` method. If the `favorites` array is null or
     * undefined, it sets an empty string as
     */
    export const setFavorites = (favorites: string[]) => {
        localStorage.setItem(favoritesKey, favorites?.toString() ?? "");
    }

    /**
     * The function clears the favorites from local storage.
     */
    export const clearFavorites = () => {
        localStorage.removeItem(favoritesKey);
    }

}