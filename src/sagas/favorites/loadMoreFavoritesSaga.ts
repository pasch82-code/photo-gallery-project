import { select, put, call } from 'redux-saga/effects'
import { AxiosResponse } from "axios";
import { RedditPostRoot } from '../../api/redditPost';
import { Mappers } from '../../mappers';
import { difference } from 'lodash';
import PostsApi from '../../api/PostsApi';
import { FavoritesSelectors } from '../../state/favorites/favoritesSelectors';
import { loadMoreFavoritesFailure, loadMoreFavoritesSuccess } from '../../state/favorites/favoritesSlice';
import { RedditReducedPost } from '../../state/state';

/** This is a generator function called `loadMoreFavoritesSaga` that uses Redux-Saga to handle
asynchronous actions. It selects data from the Redux store using `select`, and it will makes 
an API call only if localStorage cached ids are not already present in the Redux state. 
It then maps the response data using a mapper function and dispatches a success or
failure action using `put`. The function catches any errors using a try-catch block. */
export function* loadMoreFavoritesSaga() {

    try {
        const storageIds: string[] = yield select(FavoritesSelectors.getLocalStorageIds);
        const stateIds: string[] = yield select(FavoritesSelectors.selectReduxStateIds);
        const idsToRetrieve = difference(storageIds, stateIds);
        const afterId: string = yield select(FavoritesSelectors.selectAfterId);

        let posts: RedditReducedPost[] = [];

        if (idsToRetrieve.length > 0) {
            const response: AxiosResponse<RedditPostRoot> = yield call(PostsApi.getFavoritesPosts, idsToRetrieve, afterId);
            posts = Mappers.mapToReducedRedditPost(response.data.data.children);
        }

        yield put(loadMoreFavoritesSuccess({ posts }));

    } catch (e) {
        yield put(loadMoreFavoritesFailure());
    }
}
