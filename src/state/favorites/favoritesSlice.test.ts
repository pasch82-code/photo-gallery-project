import { JestUtils } from "../../jest-utils";
import { adapters } from "../adapters";
import { clearFavorites, favoritesInitialState, favoritesReducer, getFavoritesPostsFailure, getFavoritesPostsStart, getFavoritesPostsSuccess, loadMoreFavoritesFailure, loadMoreFavoritesStart, loadMoreFavoritesSuccess, toggleFavorite, toggleFavoriteThunk } from "../favorites/favoritesSlice";
import { initialState } from "../initialState";
import store from "../store";
import { Thunk } from 'redux-testkit';

describe('redux state init tests', () => {
    it('Should initially set initial State', () => {
        const state = store.getState().favoritesPageState
        expect(state).toBe(favoritesInitialState);
    });
})

describe('reducer actions getFavoritesPosts', () => {

    describe('getFavoritesPostsStart', () => {

        const action = getFavoritesPostsStart();
        const newState = favoritesReducer(favoritesInitialState, action);

        it('is fetching ', () => {
            expect(newState.isFetching).toEqual(true);
            expect(newState.hasError).toEqual(false);
        });
    });

    describe('getFavoritesPostsSuccess with array of posts', () => {

        const action = getFavoritesPostsSuccess({ posts: JestUtils.firstPageOfPosts });
        const newState = favoritesReducer(favoritesInitialState, action);

        it('fetched favorites are stored in the state', () => {
            expect(adapters.getSelectors().selectAll(newState.favorites)).toEqual(JestUtils.firstPageOfPosts);
        });

        it('is not fetching', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('records search is not yet completed', () => {
            expect(newState.hasMoreRecords).toBe(true);
        });
    });

    describe('getFavoritesPostsSuccess with an empty array of posts', () => {

        const action = getFavoritesPostsSuccess({ posts: [] });
        const newState = favoritesReducer(favoritesInitialState, action);

        it('favorites are empty', () => {
            expect(adapters.getSelectors().selectAll(newState.favorites)).toEqual([]);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('search is completed', () => {
            expect(newState.hasMoreRecords).toBe(false);
        });
    });

    describe('getFavoritesPostsFailure', () => {
        const action = getFavoritesPostsFailure();
        const newState = favoritesReducer(favoritesInitialState, action);

        it('has not fetched favorites', () => {
            expect(adapters.getSelectors().selectAll(newState.favorites)).toEqual([]);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('error is set', () => {
            expect(newState.hasError).toBe(true);
        });
    });

})

describe('reducer actions loadMoreFavorites', () => {

    describe('loadMoreFavoritesStart', () => {

        const action = loadMoreFavoritesStart();
        const newState = favoritesReducer(JestUtils.favoritesStateWithFirstPageOfFavorites, action);

        it('is fetching ', () => {
            expect(newState.isFetching).toEqual(true);
            expect(newState.hasError).toEqual(false);
        });
    });

    describe('loadMoreFavoritesSuccess with array of posts', () => {

        const action = loadMoreFavoritesSuccess({ posts: JestUtils.nextPageOfPosts });
        const newState = favoritesReducer(JestUtils.favoritesStateWithFirstPageOfFavorites, action);

        it('fetched favorites are added in the state', () => {
            expect(adapters.getSelectors().selectAll(newState.favorites)).toEqual(JestUtils.allPosts);
        });

        it('is not fetching', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('favorites search is not yet completed', () => {
            expect(newState.hasMoreRecords).toBe(true);
        });
    });

    describe('loadMoreFavoritesSuccess with an empty array of posts does not clear old posts', () => {

        const action = loadMoreFavoritesSuccess({ posts: [] });
        const newState = favoritesReducer(JestUtils.favoritesStateWithFirstPageOfFavorites, action);

        it('favorites are still the first page', () => {
            expect(adapters.getSelectors().selectAll(newState.favorites)).toEqual(JestUtils.firstPageOfPosts);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('favorites search is completed', () => {
            expect(newState.hasMoreRecords).toBe(false);
        });
    });

    describe('loadMoreFavoritesFailure does not clear old posts', () => {
        const action = loadMoreFavoritesFailure();
        const newState = favoritesReducer(JestUtils.favoritesStateWithFirstPageOfFavorites, action);

        it('has not fetched favorites', () => {
            expect(adapters.getSelectors().selectAll(newState.favorites)).toEqual(JestUtils.firstPageOfPosts);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('error is set', () => {
            expect(newState.hasError).toBe(true);
        });
    });

})

describe('reducer actions favorite', () => {

    describe('toggleFavorite add/remove from favorites', () => {

        const post = JestUtils.singleFirstPost;

        const removeAction = toggleFavorite({ id: post.id, post });
        const removedState = favoritesReducer(JestUtils.favoritesStateWithFirstPageOfFavorites, removeAction);

        it('it has been removed from favorites ', () => {
            const postIsFavorite = removedState.favoritesIds.some((id) => id == post.id);
            expect(postIsFavorite).toBe(false);

            const postExists = adapters.getSelectors().selectById(removedState.favorites, post.id);
            expect(postExists).toBe(undefined);

        });

        const addAction = toggleFavorite({ id: post.id, post });
        const addedState = favoritesReducer(removedState, addAction);

        it('it has been added to favorites ', () => {
            const postIsFavorite = addedState.favoritesIds.some((id) => id == post.id);
            expect(postIsFavorite).toBe(true);

            const postExists = adapters.getSelectors().selectById(addedState.favorites, post.id);
            expect(postExists).not.toBe(undefined);

        });
    });

    describe('clear favorites', () => {

        const action = clearFavorites();
        const newState = favoritesReducer(favoritesInitialState, action);

        it('is has cleared favorites ', () => {
            expect(newState.favoritesIds).toEqual([]);
        });
    });

})