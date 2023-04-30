import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostsState, RedditReducedPost } from "../state";
import { adapters } from "../adapters";

export const postsInitialState: PostsState = {
    posts: adapters.getInitialState(),
    editingSearchText: "pics"
}

export const postsSlice = createSlice({
    name: 'postsSlice',
    initialState: postsInitialState,
    reducers: {
        searchPostsByChannelNameStart: (state: Draft<PostsState>) => {
            state.isFetching = true;
            state.hasError = false;
        },
        searchPostsByChannelNameSuccess: (state: Draft<PostsState>, action: PayloadAction<{ posts: RedditReducedPost[], searchText: string }>) => {
            const { posts, searchText } = action.payload;
            adapters.setAll(state.posts, posts);
            state.hasMoreRecords = posts.length > 0;
            state.lastSearchText = searchText;
            state.isFetching = false;
        },
        searchPostsByChannelNameFailure: (state: Draft<PostsState>) => {
            state.isFetching = false;
            state.hasError = true
        },
        loadMorePostsStart: (state: Draft<PostsState>) => {
            state.isFetching = true;
            state.hasError = false;
        },
        loadMorePostsSuccess: (state: Draft<PostsState>, action: PayloadAction<{ posts: RedditReducedPost[] }>) => {
            const { posts } = action.payload;
            adapters.addMany(state.posts, posts);
            state.hasMoreRecords = posts.length > 0;
            state.isFetching = false;
        },
        loadMorePostsFailure: (state: Draft<PostsState>) => {
            state.isFetching = false;
            state.hasError = true
        },
        changeSearchText: (state: Draft<PostsState>, action: PayloadAction<string>) => {
            state.editingSearchText = action.payload;
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    searchPostsByChannelNameStart, searchPostsByChannelNameSuccess, searchPostsByChannelNameFailure,
    loadMorePostsStart, loadMorePostsSuccess, loadMorePostsFailure,
    changeSearchText
} = postsSlice.actions

export const postsReducer = postsSlice.reducer;