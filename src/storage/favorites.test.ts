import FavoritesStorage from "./favorites"

describe('favorite local storage', () => {

    it('should get and set', () => {

        const ids: string[] = ["id1", "id2", "id3", "id4"]

        FavoritesStorage.setFavorites(ids);
        const favoriteIds = FavoritesStorage.getFavorites();

        expect(favoriteIds.sort()).toEqual(ids.sort())
        FavoritesStorage.clearFavorites();

        const clearedFav = FavoritesStorage.getFavorites();
        expect(clearedFav).toBe(null);
    });

})