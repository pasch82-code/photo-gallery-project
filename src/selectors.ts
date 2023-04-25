import { EntityId, createSelector } from "@reduxjs/toolkit";
import { AppState, defaultFilters } from "./state";
import { adapters } from "./adapters";
import { find, last, sortBy } from "lodash";
import { ROW_HEIGHTS, Resolution } from "./theme";
import { GalleryThumbnailProps } from "./ui/GalleryThumbnail";
import { RedditReducedPostData } from "./types/entity";

/* This code defines a namespace called `PostSelectors` and exports several functions and selectors
related to selecting and filtering Reddit post data. */
export namespace PostSelectors {

    const { selectAll: selectPosts } = adapters?.getSelectors<AppState>(state => state.entities.posts);
    const { selectAll: selectFavoritePosts, selectIds: selectFavPostIds } = adapters?.getSelectors<AppState>(state => state.entities.favorites);

    export const selectFavoritePostIds = createSelector([selectFavPostIds], (ids: EntityId[]) => ids?.map(i => i?.toString()));
    export const selectGalleryAfterId = createSelector([selectPosts], (posts: RedditReducedPostData[]) => last(posts)?.id);
    export const selectFavoriteAfterId = createSelector([selectFavoritePosts], (posts: RedditReducedPostData[]) => last(posts)?.id);

    export const getFavoritesStoredIds = (state: AppState) => state.ui.favoritesPage.ids;

    export const selectOrderedFavoritePostImages = createSelector([selectFavoritePosts, getFavoritesStoredIds],
        (posts: RedditReducedPostData[], orderedIds: string[]) =>
            sortBy(posts, (item) => orderedIds.indexOf(item.id) !== -1 ? orderedIds.indexOf(item.id) : posts.length)
    );

    export const getMinHeight = (state: AppState) => state.ui.filters.minHeight;
    export const getMinWidth = (state: AppState) => state.ui.filters.minWidth;
    export const getMaxHeight = (state: AppState) => state.ui.filters.maxHeight;
    export const getMaxWidth = (state: AppState) => state.ui.filters.maxWidth;

    export const isFiltered = createSelector(
        [getMinWidth, getMinHeight, getMaxWidth, getMaxHeight,
        ], (minWidth, minHeight, maxWidth, maxHeight) =>
        minWidth != defaultFilters.minWidth ||
        minHeight != defaultFilters.minHeight ||
        maxWidth != defaultFilters.maxWidth ||
        maxHeight != defaultFilters.maxHeight);

    export const isGalleryLoading = (state: AppState) => state.ui.galleryPage.isLoading;
    export const isFavoritesLoading = (state: AppState) => state.ui.favoritesPage.isLoading;

    export const galleryHasMoreRecords = (state: AppState) => state.ui.galleryPage.hasMoreRecords;
    export const favoritesHasMoreRecords = (state: AppState) => state.ui.favoritesPage.hasMoreRecords;

    export const getSidebarNavOpened = (state: AppState) => state.ui.sidebarOpened;
    export const getFiltersOpened = (state: AppState) => state.ui.filters.opened;

    export const selectImages = createSelector(
        [selectPosts,
            (state: AppState, resolution: Resolution) => resolution,
            getMinWidth, getMinHeight, getMaxWidth, getMaxHeight,
        ], (posts, resolution, minWidth, minHeight, maxWidth, maxHeight) => mapToThumbnailImageProps(posts, resolution, minWidth, minHeight, maxWidth, maxHeight))

    export const selectFavoriteImages = createSelector(
        [selectOrderedFavoritePostImages,
            (state: AppState, resolution: Resolution) => resolution,
            getMinWidth, getMinHeight, getMaxWidth, getMaxHeight,
        ], (posts, resolution, minWidth, minHeight, maxWidth, maxHeight) => mapToThumbnailImageProps(posts, resolution, minWidth, minHeight, maxWidth, maxHeight))

    export const getEditingSearchText = (state: AppState) => state.ui.galleryPage.editingSearchText;
    export const getLastSearchText = (state: AppState) => state.ui.galleryPage.lastSearchText;

    export const isFavorite = createSelector([getFavoritesStoredIds, (state: AppState, id: string) => id], (ids, id) => ids.indexOf(id) != -1);
}

/**
 * This function maps an array of Reddit post data to an array of thumbnail image properties, with
 * optional filtering by minimum and maximum width and height.
 * @param {RedditReducedPostData[]} posts - an array of RedditReducedPostData objects
 * @param {Resolution} resolution - The desired resolution for the thumbnail image. It is used to find
 * the closest matching resolution from the available resolutions of the post.
 * @param {number} minWidth - The minimum width that the source image should have to be included in the
 * returned array of thumbnail image props.
 * @param {number} minHeight - The minimum height in pixels that the source image must have to be
 * included in the resulting array of thumbnail image props.
 * @param {number} maxWidth - The maximum width that the images should have. Any images with a
 * sourceWidth greater than this value will be filtered out.
 * @param {number} maxHeight - The maximum height that a thumbnail image can have. Any thumbnail image
 * with a height greater than this value will be filtered out.
 * @returns an array of GalleryThumbnailProps objects, which are created by mapping over an array of
 * RedditReducedPostData objects and extracting relevant data from them. The resulting array is then
 * filtered based on the provided minWidth, minHeight, maxWidth, and maxHeight parameters.
 */
function mapToThumbnailImageProps(posts: RedditReducedPostData[], resolution: Resolution, minWidth: number, minHeight: number, maxWidth: number, maxHeight: number) {

    let images = posts.map(post => {

        let imageByResolution = resolution ? find(post.resolutions, r => r.height >= ROW_HEIGHTS[resolution]) : null;
        if (imageByResolution == undefined)
            imageByResolution = last(post.resolutions);

        const thumb: GalleryThumbnailProps = {
            ...imageByResolution,
            thumbnailUrl: post.thumbnailUrl,
            postId: post.id,
            title: post.title,
            sourceUrl: post.source.url,
            sourceHeight: post.source.height,
            sourceWidth: post.source.width,
            permalink: post.permalink
        }

        return thumb;
    });

    if (minWidth)
        images = images.filter(i => i.sourceWidth >= minWidth);

    if (minHeight)
        images = images.filter(i => i.sourceHeight >= minHeight);

    if (maxWidth)
        images = images.filter(i => i.sourceWidth <= maxWidth);

    if (maxHeight)
        images = images.filter(i => i.sourceHeight <= maxHeight);

    return images;
}