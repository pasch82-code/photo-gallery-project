
import { testSaga } from 'redux-saga-test-plan';
import { FavoritesSelectors } from '../../state/favorites/favoritesSelectors';
import PostsApi from '../../api/PostsApi';
import { JestUtils } from '../../jest-utils';
import { getFavoritesPostsSaga } from './getFavoritesPostsSaga';
import { getFavoritesPostsFailure, getFavoritesPostsSuccess } from '../../state/favorites/favoritesSlice';

describe('getFavoritesPostsSaga unit test', () => {

  it('should trigger success action when provided ids are not yet in the redux state and a valid response is provided', async () => {

    testSaga(getFavoritesPostsSaga)
      .next()
      .select(FavoritesSelectors.getLocalStorageIds)
      .next(["id1", "id2", "id3", "id4", "id5"]) //missing two ids in the state
      .select(FavoritesSelectors.selectReduxStateIds)
      .next(["id1", "id2", "id3"]) //'id4', 'id5' are missing in the state, so try to call
      .call(PostsApi.getFavoritesPosts, ['id4', 'id5'])
      .next(JestUtils.validNextPageResponse)
      .put(getFavoritesPostsSuccess({ posts: JestUtils.nextPageOfPosts }))
      .next()
      .isDone();
  });

  it('should trigger success action with an empty array when all ids are already cached, so API call is skipped', async () => {

    testSaga(getFavoritesPostsSaga)
      .next()
      .select(FavoritesSelectors.getLocalStorageIds)
      .next()
      .select(FavoritesSelectors.selectReduxStateIds)
      .next()//no ids to retrieve, call is skipped
      .put(getFavoritesPostsSuccess({ posts: [] }))
      .next()
      .isDone();

    testSaga(getFavoritesPostsSaga)
      .next()
      .select(FavoritesSelectors.getLocalStorageIds)
      .next(["id1", "id2", "id3"]) 
      .select(FavoritesSelectors.selectReduxStateIds)
      .next(["id1", "id2", "id3", "id4", "id5"]) //all ids are already in the state, skip call, go to success
      .put(getFavoritesPostsSuccess({ posts: [] }))
      .next()
      .isDone();
  });

  it('should trigger failure action when valid ids are provided, but there is a null response', async () => {

    testSaga(getFavoritesPostsSaga)
      .next()
      .select(FavoritesSelectors.getLocalStorageIds)
      .next(["id1", "id2"])
      .select(FavoritesSelectors.selectReduxStateIds)
      .next(["id1"]) //id2 is missing in the state, so try to call
      .call(PostsApi.getFavoritesPosts, ["id2"])
      .next(JestUtils.nullResponse)
      .put(getFavoritesPostsFailure())
      .next()
      .isDone();

  });

});