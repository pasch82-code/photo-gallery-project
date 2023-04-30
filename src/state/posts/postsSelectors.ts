import { createSelector } from "@reduxjs/toolkit";
import { last } from "lodash";
import { AppState, RedditReducedPost } from "../state";
import { FiltersSelectors } from "../filters/filtersSelectors";
import { Mappers } from "../../mappers";
import { Resolution } from "../../theme";
import { adapters } from "../adapters";

export namespace PostSelectors {

    const { selectAll } = adapters?.getSelectors<AppState>(state => state.galleryPage.posts);
    export const { selectById } = adapters?.getSelectors<AppState>(state => state.galleryPage.posts);

    export const selectAfterId = createSelector([selectAll], (posts: RedditReducedPost[]) => last(posts)?.id);

    export const isFetching = (state: AppState) => state.galleryPage.isFetching;

    export const hasMoreRecords = (state: AppState) => state.galleryPage.hasMoreRecords;

    export const selectImages = createSelector(
        [selectAll,
            (state: AppState, resolution: Resolution) => resolution,
            FiltersSelectors.getMinWidth, FiltersSelectors.getMinHeight, FiltersSelectors.getMaxWidth, FiltersSelectors.getMaxHeight,
        ], (posts, resolution, minWidth, minHeight, maxWidth, maxHeight) => Mappers.mapToThumbnailImageProps(posts, resolution, minWidth, minHeight, maxWidth, maxHeight))

    export const getEditingSearchText = (state: AppState) => state.galleryPage.editingSearchText;
    export const getLastSearchText = (state: AppState) => state.galleryPage.lastSearchText;

}