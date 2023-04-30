import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
const favoritesKey = `photo-gallery-favorites`;

/* The `FavoriteStorage` class provides methods for retrieving, setting, and clearing favorites stored
in local storage. */
class FavoriteStorage {

   /* `getFavorites` is a method that retrieves the favorites from local storage. It first retrieves
   the favorites from local storage using the `localStorage.getItem` method and stores it in the
   `favorites` variable. It then checks if the `favorites` variable is null or empty using the
   `isNil` and `isEmpty` methods from the Lodash library. If it is null or empty, it returns null.
   Otherwise, it splits the `favorites` string by comma using the `split` method and returns an
   array of favorites. */
    getFavorites = () => {
        const favorites = localStorage.getItem(favoritesKey)
        if (isNil(favorites) || isEmpty(favorites))
            return null;
        else
            return favorites.split(",")
    }

  /* `setFavorites` is a method that takes an array of strings called `favorites` as a parameter. It
  then converts the `favorites` array to a string using the `toString` method and sets it as the
  value of the `favoritesKey` in the local storage using the `localStorage.setItem` method. If the
  `favorites` parameter is null or undefined, it sets an empty string as the value of the
  `favoritesKey`. The `??` operator is used to provide a default value of an empty string if the
  `toString` method returns null or undefined. */
    setFavorites = (favorites: string[]) => {
        localStorage.setItem(favoritesKey, favorites?.toString() ?? "");
    }

   /* `clearFavorites` is a method that removes the value associated with the `favoritesKey` from the
   local storage using the `localStorage.removeItem` method. This effectively clears the favorites
   stored in the local storage. */
    clearFavorites = () => {
        localStorage.removeItem(favoritesKey);
    }

}

export default new FavoriteStorage();