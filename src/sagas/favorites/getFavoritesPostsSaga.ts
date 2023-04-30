import { select, put, call } from 'redux-saga/effects'
import { AxiosResponse } from "axios";
import { RedditPostRoot } from '../../api/redditPost';
import { Mappers } from '../../mappers';
import { difference } from 'lodash';
import PostsApi from '../../api/PostsApi';
import { FavoritesSelectors } from '../../state/favorites/favoritesSelectors';
import { getFavoritesPostsFailure, getFavoritesPostsSuccess } from '../../state/favorites/favoritesSlice';
import { RedditReducedPost } from '../../state/state';

/** This is a generator function called `getFavoritesPostsSaga` that uses the `redux-saga` library to
handle asynchronous actions in a Redux application. It selects data from the Redux store using `select`,
and it will makes an API call only if localStorage cached ids are not already present in the Redux state. 
It then maps the response data using a mapper function and dispatches a success or
failure action using `put`. The function catches any errors using a try-catch block. */
export function* getFavoritesPostsSaga() {

    try {
        const storageIds: string[] = yield select(FavoritesSelectors.getLocalStorageIds);
        const stateIds: string[] = yield select(FavoritesSelectors.selectReduxStateIds);
        const idsToRetrieve = difference(storageIds, stateIds);

        let posts: RedditReducedPost[] = [];

        if (idsToRetrieve.length > 0) {
            const response: AxiosResponse<RedditPostRoot> = yield call(PostsApi.getFavoritesPosts, idsToRetrieve);
            posts = Mappers.mapToReducedRedditPost(response.data.data.children);
        }

        yield put(getFavoritesPostsSuccess({ posts }));
    }
    catch (e) {
        yield put(getFavoritesPostsFailure());
    }
}
