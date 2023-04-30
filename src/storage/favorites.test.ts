import FavoriteStorage from "./favorites"

describe('favorite local storage', () => {

    it('should get and set', () => {

        const ids: string[] = ["id1", "id2", "id3", "id4"]

        FavoriteStorage.setFavorites(ids);

        const favoriteIds = FavoriteStorage.getFavorites();

        expect(favoriteIds.sort()).toEqual(ids.sort())

        FavoriteStorage.clearFavorites();

        const clearedFav = FavoriteStorage.getFavorites();

        expect(clearedFav).toBe(null);
    });

})