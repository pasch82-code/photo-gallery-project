import { EntityId, createSelector } from "@reduxjs/toolkit";
import { adapters } from "../adapters";
import { last, sortBy } from "lodash";
import { Resolution } from "../../theme";
import { FiltersSelectors } from "../filters/filtersSelectors";
import { Mappers } from "../../mappers";
import { AppState, RedditReducedPost } from "../state";

export namespace FavoritesSelectors {

    const { selectAll: _selectAll, selectIds: _selectIds } = adapters?.getSelectors<AppState>(state => state.favoritesPageState.favorites);

    export const selectReduxStateIds = createSelector([_selectIds], (ids: EntityId[]) => ids?.map(i => i?.toString()));
    export const selectAfterId = createSelector([_selectAll], (posts: RedditReducedPost[]) => last(posts)?.id);

    export const getLocalStorageIds = (state: AppState) => state.favoritesPageState.favoritesIds;
    export const isFetching = (state: AppState) => state.favoritesPageState.isFetching;
    export const hasMoreRecords = (state: AppState) => state.favoritesPageState.hasMoreRecords;

    const sortFavoritePostImages = createSelector([_selectAll, getLocalStorageIds],
        (posts: RedditReducedPost[], orderedIds: string[]) =>
            sortBy(posts, (item) => orderedIds.indexOf(item.id) !== -1 ? orderedIds.indexOf(item.id) : posts.length)
    );

    export const selectImages = createSelector(
        [sortFavoritePostImages,
            (state: AppState, resolution: Resolution) => resolution,
            FiltersSelectors.getMinWidth, FiltersSelectors.getMinHeight, FiltersSelectors.getMaxWidth, FiltersSelectors.getMaxHeight,
        ], (posts, resolution, minWidth, minHeight, maxWidth, maxHeight) => Mappers.mapToThumbnailImageProps(posts, resolution, minWidth, minHeight, maxWidth, maxHeight))

    export const isFavorite = createSelector([getLocalStorageIds, (state: AppState, id: string) => id], (ids, id) => ids.indexOf(id) != -1);
}