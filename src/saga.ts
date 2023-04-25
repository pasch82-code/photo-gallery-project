import { select, put, takeEvery } from 'redux-saga/effects'
import { getFavoritesSuccess, setFailure, getPostsSuccess, getLoadMoreFavoritesSuccess, getLoadMorePostsSuccess } from './slice';
import axios, { AxiosResponse } from "axios";
import { PostSelectors } from './selectors';
import { RedditPostRoot } from './types/redditPost';
import { PostMappers } from './mappers';
import { RedditReducedPostData } from './types/entity';
import { difference } from 'lodash';

/** This is a generator function called `workGetPostsFetch` that is used in a Redux-Saga to handle the
asynchronous fetching of posts from the Reddit API. It first selects the current search text from
the Redux store using `yield select`, and then makes a GET request to the Reddit API using Axios to
retrieve the top posts from the specified subreddit. It then maps the retrieved data to a simplified
format using `PostMappers.mapToRedditPostImageData`, and dispatches a `getPostsSuccess` action with
the retrieved posts and search text using `yield put`. If there is an error during the process, it
dispatches a `setFailure` action instead. The `yield` keyword is used to pause the function until
the asynchronous operation is complete. */
function* workGetPostsFetch() {
  console.log("workGetPostsFetch!")
  try {
    const searchText: string = yield select(PostSelectors.getEditingSearchText);

    let posts: RedditReducedPostData[] = [];

    if (searchText) {
      const response: AxiosResponse<RedditPostRoot> = yield axios.get<RedditPostRoot>(`https://www.reddit.com/r/${searchText}/top.json`);
      posts = PostMappers.mapToRedditPostImageData(response.data.data.children);
    }

    yield put(getPostsSuccess({ posts, searchText }));
  } catch (e) {
    yield put(setFailure());
  }
}

function* workGetLoadMorePostsFetch() {
  console.log("workGetLoadMorePostsFetch!")
  try {
    const searchText: string = yield select(PostSelectors.getEditingSearchText);
    const afterId: string = yield select(PostSelectors.selectGalleryAfterId);

    let posts: RedditReducedPostData[] = [];

    if (searchText && afterId) {
      const afterText = `?after=${afterId}`;
      const response: AxiosResponse<RedditPostRoot> = yield axios.get<RedditPostRoot>(`https://www.reddit.com/r/${searchText}/top.json${afterText}`);
      posts = PostMappers.mapToRedditPostImageData(response.data.data.children);
    }
    yield put(getLoadMorePostsSuccess({ posts }));

  } catch (e) {
    yield put(setFailure());
  }
}

function* workGetFavoritesFetch() {
  console.log("workGetFavoritesFetch!")
  try {
    const favoriteCachedIds: string[] = yield select(PostSelectors.getFavoritesStoredIds);
    const currentStoreIds: string[] = yield select(PostSelectors.selectFavoritePostIds);
    const favoriteIds = difference(favoriteCachedIds, currentStoreIds);

    let posts: RedditReducedPostData[] = [];

    if (favoriteIds.length > 0) {
      const response: AxiosResponse<RedditPostRoot> = yield axios.get<RedditPostRoot>(`https://api.reddit.com/by_id/${favoriteIds.join(",")}`);
      posts = PostMappers.mapToRedditPostImageData(response.data.data.children);
    }

    yield put(getFavoritesSuccess({ posts }));

  } catch (e) {
    yield put(setFailure());
  }
}

function* workGetLoadMoreFavoritesFetch() {
  console.log("workGetLoadMoreFavoritesFetch!")
  try {
    const favoriteCachedIds: string[] = yield select(PostSelectors.getFavoritesStoredIds);
    const currentStoreIds: string[] = yield select(PostSelectors.selectFavoritePostIds);
    const favoriteIds = difference(favoriteCachedIds, currentStoreIds);
    const lastId: string = yield select(PostSelectors.selectFavoriteAfterId);

    let posts: RedditReducedPostData[] = [];
    if (favoriteIds.length > 0) {
      const afterText = lastId ? `?after=${lastId}` : "";
      const response: AxiosResponse<RedditPostRoot> = yield axios.get<RedditPostRoot>(`https://api.reddit.com/by_id/${favoriteIds.join(",")}${afterText}`);
      posts = PostMappers.mapToRedditPostImageData(response.data.data.children);
    }
    yield put(getLoadMoreFavoritesSuccess({ posts }));

  } catch (e) {
    yield put(setFailure());
  }
}

function* postImagesSaga(): Generator {
  yield takeEvery('postImages/getPostsFetch', workGetPostsFetch);
  yield takeEvery('postImages/getFavoritesFetch', workGetFavoritesFetch);
  yield takeEvery('postImages/getLoadMorePostsFetch', workGetLoadMorePostsFetch);
  yield takeEvery('postImages/getLoadMoreFavoritesFetch', workGetLoadMoreFavoritesFetch);
}

export default postImagesSaga;