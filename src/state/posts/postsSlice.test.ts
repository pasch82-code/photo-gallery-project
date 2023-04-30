import { JestUtils } from "../../jest-utils";
import { adapters } from "../adapters";
import store from "../store";
import { postsInitialState, postsReducer, searchPostsByChannelNameFailure, searchPostsByChannelNameStart, searchPostsByChannelNameSuccess } from "./postsSlice";

describe('redux state tests', () => {
    it('Should initially set initial State', () => {
        const state = store.getState().galleryPage
        expect(state).toBe(postsInitialState);
    });
})

describe('reducer actions', () => {

    describe('searchPostsByChannelNameStart', () => {

        const action = searchPostsByChannelNameStart();
        const newState = postsReducer(postsInitialState, action);

        it('is fetching ', () => {
            expect(newState.isFetching).toEqual(true);
            expect(newState.hasError).toEqual(false);
        });
    });

    describe('searchPostsByChannelNameSuccess with array of posts', () => {
        const searchText = "searchText";

        const action = searchPostsByChannelNameSuccess({ posts: JestUtils.firstPageOfPosts, searchText });
        const newState = postsReducer(postsInitialState, action);
        
        it('fetched posts are stored in the state', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual(JestUtils.firstPageOfPosts);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });
    });

    describe('searchPostsByChannelNameSuccess with empty array of posts', () => {
        const searchText = "searchText";

        const action = searchPostsByChannelNameSuccess({ posts: [], searchText });
        const newState = postsReducer(postsInitialState, action);

        it('posts are empty', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual([]);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });
    });

    describe('searchPostsByChannelNameFailure', () => {
        const action = searchPostsByChannelNameFailure();
        const newState = postsReducer(postsInitialState, action);

        it('has not fetched posts', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual([]);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('error is set', () => {
            expect(newState.hasError).toBe(true);
        });
    });

})