import { select, put, call } from 'redux-saga/effects'
import { AxiosResponse } from "axios";
import { RedditPostRoot } from '../../api/redditPost';
import { Mappers } from '../../mappers';
import PostsApi from '../../api/PostsApi';
import { PostSelectors } from '../../state/posts/postsSelectors';
import { loadMorePostsFailure, loadMorePostsSuccess } from '../../state/posts/postsSlice';
import { RedditReducedPost } from '../../state/state';

/* This is a generator function called `loadMorePostsSaga` that uses the `redux-saga` library to handle
asynchronous actions in a Redux application. It selects data from the Redux store using `select`,
and it will makes  an API call only if search text and last after Id for pagination are valid. 
It then maps the response data using a mapper function and dispatches a success or
failure action using `put`. The function catches any errors using a try-catch block.*/
export function* loadMorePostsSaga() {
    try {
        const searchText: string = yield select(PostSelectors.getEditingSearchText);
        const afterId: string = yield select(PostSelectors.selectAfterId);

        let posts: RedditReducedPost[] = [];

        if (searchText && afterId) {
            const response: AxiosResponse<RedditPostRoot> = yield call(PostsApi.searchPostsByChannelName, searchText, afterId);
            posts = Mappers.mapToReducedRedditPost(response.data.data.children);
        }

        yield put(loadMorePostsSuccess({ posts }));

    } catch (e) {
        yield put(loadMorePostsFailure());
    }
}