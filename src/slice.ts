import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, defaultFilters, initialState } from "./state";
import { FavoriteStorage } from "./storage/favorites";
import { RedditReducedPostData } from "./types/entity";
import { adapters } from "./adapters";

export const postImagesSlice = createSlice({
    name: 'postImages',
    initialState: initialState,
    reducers: {
        getPostsFetch: (state: Draft<AppState>) => {
            state.ui.galleryPage.isLoading = true;
        },
        getFavoritesFetch: (state: Draft<AppState>) => {
            state.ui.favoritesPage.isLoading = true;
        }, 
        getLoadMorePostsFetch: (state: Draft<AppState>) => {
            state.ui.galleryPage.isLoading = true;
        },
        getLoadMoreFavoritesFetch: (state: Draft<AppState>) => {
            state.ui.favoritesPage.isLoading = true;
        },
        getPostsSuccess: (state: Draft<AppState>, action: PayloadAction<{ posts: RedditReducedPostData[] , searchText: string}>) => {
            const { posts, searchText } = action.payload;
            adapters.setAll(state.entities.posts, posts);
            state.ui.galleryPage.hasMoreRecords = posts.length > 0;
            state.ui.galleryPage.lastSearchText = searchText;           
            state.ui.galleryPage.isLoading = false;
        },
        getLoadMorePostsSuccess: (state: Draft<AppState>, action: PayloadAction<{ posts: RedditReducedPostData[] }>) => {
            const { posts } = action.payload;
            adapters.addMany(state.entities.posts, posts);
            state.ui.galleryPage.hasMoreRecords = posts.length > 0;
            state.ui.galleryPage.isLoading = false;
        },
        getFavoritesSuccess: (state: Draft<AppState>, action: PayloadAction<{ posts: RedditReducedPostData[] }>) => {
            const { posts } = action.payload;
            adapters.addMany(state.entities.favorites, posts);
            state.ui.favoritesPage.hasMoreRecords = posts.length > 0;
            state.ui.favoritesPage.isLoading = false;
        },  
        getLoadMoreFavoritesSuccess: (state: Draft<AppState>, action: PayloadAction<{ posts: RedditReducedPostData[] }>) => {
            const { posts } = action.payload;
            adapters.addMany(state.entities.favorites, posts);
            state.ui.favoritesPage.hasMoreRecords = posts.length > 0;
            state.ui.favoritesPage.isLoading = false;
        },      
        setFailure: (state: Draft<AppState>) => {

        },
        changeSearchText: (state: Draft<AppState>, action: PayloadAction<string>) => {
            state.ui.galleryPage.editingSearchText = action.payload;
        },
        changeWidth: (state: Draft<AppState>, action: PayloadAction<number[]>) => {
            state.ui.filters.minWidth = action.payload[0];
            state.ui.filters.maxWidth = action.payload[1];
        },
        changeHeight: (state: Draft<AppState>, action: PayloadAction<number[]>) => {
            state.ui.filters.minHeight = action.payload[0];
            state.ui.filters.maxHeight = action.payload[1];
        },
        toggleFavorite: (state: Draft<AppState>, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.ui.favoritesPage.ids.includes(id)) {
                state.ui.favoritesPage.ids.push(id);
                const post = adapters.getSelectors().selectById(state.entities.posts, id);
                adapters.addOne(state.entities.favorites, post);
            }
            else {
                state.ui.favoritesPage.ids = state.ui.favoritesPage.ids.filter(fId => fId != id);
                adapters.removeOne(state.entities.favorites, id);
            }
            FavoriteStorage.setFavorites(state.ui.favoritesPage.ids);
        },
        setFavoritesFromStore: (state: Draft<AppState>) => {
            const favoriteIds = FavoriteStorage.getFavorites();
            state.ui.favoritesPage.ids = favoriteIds ?? [];
        },
        clearFavorites: (state: Draft<AppState>) => {
            state.ui.favoritesPage.ids = [];
            FavoriteStorage.clearFavorites();
            adapters.removeAll(state.entities.favorites);
        },
        openSidebar: (state: Draft<AppState>) => {
            state.ui.sidebarOpened = true;
        }, 
        closeSidebar: (state: Draft<AppState>) => {
            state.ui.sidebarOpened = false;
        },  
        toggleFiltersOpened: (state: Draft<AppState>, action: PayloadAction<boolean>) => {
            state.ui.filters.opened = action.payload;
        },
        clearFilters: (state: Draft<AppState>) => {
            state.ui.filters = defaultFilters;
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    getPostsFetch, getPostsSuccess, changeSearchText,
    toggleFavorite, getFavoritesSuccess, getFavoritesFetch, clearFavorites, setFavoritesFromStore, openSidebar, closeSidebar, toggleFiltersOpened,
    changeWidth, changeHeight, clearFilters, getLoadMorePostsFetch, getLoadMoreFavoritesFetch, setFailure, getLoadMorePostsSuccess, getLoadMoreFavoritesSuccess
} = postImagesSlice.actions

export const postReducer = postImagesSlice.reducer;