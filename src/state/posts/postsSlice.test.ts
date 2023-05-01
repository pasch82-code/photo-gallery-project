import { JestUtils } from "../../jest-utils";
import { adapters } from "../adapters";
import store from "../store";
import { changeSearchText, loadMorePostsFailure, loadMorePostsStart, loadMorePostsSuccess, postsInitialState, postsReducer, searchPostsByChannelNameFailure, searchPostsByChannelNameStart, searchPostsByChannelNameSuccess } from "./postsSlice";

describe('redux posts state tests', () => {
    it('should initially set initial State', () => {
        const state = store.getState().galleryPage
        expect(state).toBe(postsInitialState);
    });
    
    it('should change text', () => {
        const text = "text"
        const action = changeSearchText(text);
        const newState = postsReducer(postsInitialState, action);

        expect(newState.editingSearchText).toEqual(text);
    });

    it('should clear text', () => {
        const action = changeSearchText(null);
        const newState = postsReducer(postsInitialState, action);
        expect(newState.editingSearchText).toEqual(null);
    });
})


describe('reducer actions searchPostsByChannelName', () => {

    describe('searchPostsByChannelNameStart', () => {

        const action = searchPostsByChannelNameStart();
        const newState = postsReducer(postsInitialState, action);

        it('is fetching ', () => {
            expect(newState.isFetching).toEqual(true);
            expect(newState.hasError).toEqual(false);
        });
    });

    describe('searchPostsByChannelNameSuccess with an array of posts', () => {
        const searchText = "searchText";

        const action = searchPostsByChannelNameSuccess({ posts: JestUtils.firstPageOfPosts, searchText });
        const newState = postsReducer(postsInitialState, action);
        
        it('fetched posts are stored in the state', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual(JestUtils.firstPageOfPosts);
        });

        it('is not fetching', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('posts search is not yet completed', () => {
            expect(newState.hasMoreRecords).toBe(true);
        });
    });

    describe('searchPostsByChannelNameSuccess with an empty array of posts', () => {
        const searchText = "searchText";

        const action = searchPostsByChannelNameSuccess({ posts: [], searchText });
        const newState = postsReducer(postsInitialState, action);

        it('posts are empty', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual([]);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('posts search is completed', () => {
            expect(newState.hasMoreRecords).toBe(false);
        });
    });

    describe('searchPostsByChannelNameFailure', () => {
        const action = searchPostsByChannelNameFailure();
        const newState = postsReducer(postsInitialState, action);

        it('has not fetched posts', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual([]);
        });

        it('is not fetching', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('error is set', () => {
            expect(newState.hasError).toBe(true);
        });
    });

})

describe('reducer actions loadMorePosts', () => {

    describe('loadMorePostsStart', () => {

        const action = loadMorePostsStart();
        const newState = postsReducer(JestUtils.postsStateWithFirstPage, action);

        it('is fetching ', () => {
            expect(newState.isFetching).toEqual(true);
            expect(newState.hasError).toEqual(false);
        });
    });

    describe('loadMorePostsSuccess with an array of posts', () => {

        const action = loadMorePostsSuccess({ posts: JestUtils.nextPageOfPosts });
        const newState = postsReducer(JestUtils.postsStateWithFirstPage, action);
        
        it('fetched posts are added in the state', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual(JestUtils.allPosts);
        });

        it('is not fetching', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('posts search is not yet completed', () => {
            expect(newState.hasMoreRecords).toBe(true);
        });
    });

    describe('loadMorePostsSuccess with an empty array of posts does not clear old posts', () => {
      
        const action = loadMorePostsSuccess({ posts: [] });
        const newState = postsReducer(JestUtils.postsStateWithFirstPage, action);

        it('posts are still the old ones', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual(JestUtils.firstPageOfPosts);
        });

        it('is not fetching anymore', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('posts search is completed', () => {
            expect(newState.hasMoreRecords).toBe(false);
        });
    });

    describe('loadMorePostsFailure does not clear old posts', () => {
        const action = loadMorePostsFailure();
        const newState = postsReducer(JestUtils.postsStateWithFirstPage, action);

        it('posts are still the old ones', () => {
            expect(adapters.getSelectors().selectAll(newState.posts)).toEqual(JestUtils.firstPageOfPosts);
        });

        it('is not fetching', () => {
            expect(newState.isFetching).toBe(false);
        });

        it('error is set', () => {
            expect(newState.hasError).toBe(true);
        });
    });

})