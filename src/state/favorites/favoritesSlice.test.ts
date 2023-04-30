import { JestUtils } from "../../jest-utils";
import { adapters } from "../adapters";
import { favoritesInitialState, favoritesReducer, getFavoritesPostsFailure, getFavoritesPostsStart, getFavoritesPostsSuccess } from "../favorites/favoritesSlice";
import store from "../store";

describe('redux state tests', () => {
    it('Should initially set initial State', () => {
        const state = store.getState().favoritesPage
        expect(state).toBe(favoritesInitialState);
    });
})

describe('reducer actions', () => {

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

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });
    });

    describe('getFavoritesPostsSuccess with empty array of posts', () => {
   
        const action = getFavoritesPostsSuccess({ posts: [] });
        const newState = favoritesReducer(favoritesInitialState, action);

        it('favorites are empty', () => {
            expect(adapters.getSelectors().selectAll(newState.favorites)).toEqual([]);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
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