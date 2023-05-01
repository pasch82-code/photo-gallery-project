import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavoritesState, RedditReducedPost } from "../state";
import FavoriteStorage from "../../storage/favorites";
import { adapters } from "../adapters";
import { AppDispatch, AppState } from "../state";
import { PostSelectors } from "../posts/postsSelectors";

export const toggleFavoriteThunk = (id: string) => (dispatch: AppDispatch, getState: () => AppState) => { //test thunk
    const post = PostSelectors.selectById(getState(), id);
    dispatch(favoritesSlice.actions.toggleFavorite({ id, post }));
}

export const favoritesInitialState: FavoritesState = {
    favoritesIds: [],
    favorites: adapters.getInitialState()
}

export const favoritesSlice = createSlice({
    name: 'favoritesSlice',
    initialState: favoritesInitialState,
    reducers: {
        getFavoritesPostsStart: (state: Draft<FavoritesState>) => {
            state.isFetching = true;
            state.hasError = false;
        },
        getFavoritesPostsSuccess: (state: Draft<FavoritesState>, action: PayloadAction<{ posts: RedditReducedPost[] }>) => {
            const { posts } = action.payload;
            adapters.upsertMany(state.favorites, posts);
            state.hasMoreRecords = posts.length > 0;
            state.isFetching = false;
        },
        getFavoritesPostsFailure: (state: Draft<FavoritesState>, action: PayloadAction<string>) => {
            state.isFetching = false;
            state.hasError = true;
        },
        loadMoreFavoritesStart: (state: Draft<FavoritesState>) => {
            state.isFetching = true;
            state.hasError = false;
        },
        loadMoreFavoritesSuccess: (state: Draft<FavoritesState>, action: PayloadAction<{ posts: RedditReducedPost[] }>) => {
            const { posts } = action.payload;
            adapters.addMany(state.favorites, posts);
            state.hasMoreRecords = posts.length > 0;
            state.isFetching = false;
        },
        loadMoreFavoritesFailure: (state: Draft<FavoritesState>) => {
            state.isFetching = false;
            state.hasError = true
        },    
        toggleFavorite: (state: Draft<FavoritesState>, action: PayloadAction<{ id: string, post: RedditReducedPost }>) => {  //it's a saga?  
            const { id, post } = action.payload;
            if (!state.favoritesIds.includes(id)) {
                state.favoritesIds.push(id);
                adapters.addOne(state.favorites, post);
            }
            else {
                state.favoritesIds = state.favoritesIds.filter(fId => fId != id);
                adapters.removeOne(state.favorites, id);
            }
            FavoriteStorage.setFavorites(state.favoritesIds);
        },
        initFromLocalStorage: (state: Draft<FavoritesState>) => {
            const favoriteIds = FavoriteStorage.getFavorites();
            state.favoritesIds = favoriteIds ?? [];
        },
        clearFavorites: (state: Draft<FavoritesState>) => {
            state.favoritesIds = [];
            FavoriteStorage.clearFavorites();
            adapters.removeAll(state.favorites);
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(changeWidths, (state) => {
    //             state.hasMoreRecords = true;
    //         })
    // }
});

export const {
    getFavoritesPostsStart, getFavoritesPostsSuccess, getFavoritesPostsFailure,
    loadMoreFavoritesStart, loadMoreFavoritesSuccess, loadMoreFavoritesFailure,
    clearFavorites, initFromLocalStorage, toggleFavorite
} = favoritesSlice.actions

export const favoritesReducer = favoritesSlice.reducer;