
import { testSaga } from 'redux-saga-test-plan';
import { loadMoreFavoritesSaga } from "./loadMoreFavoritesSaga";
import { FavoritesSelectors } from '../../state/favorites/favoritesSelectors';
import PostsApi from '../../api/PostsApi';
import { JestUtils } from '../../jest-utils';
import { loadMoreFavoritesFailure, loadMoreFavoritesSuccess } from '../../state/favorites/favoritesSlice';

describe('loadMoreFavoritesSaga unit test', () => {

  it('should trigger success action when provided ids are not yet in the redux state and a valid response is provided', async () => {

    testSaga(loadMoreFavoritesSaga)
      .next()
      .select(FavoritesSelectors.getLocalStorageIds)
      .next(["id1", "id2", "id3", "id4", "id5"]) //missing two ids in the state
      .select(FavoritesSelectors.selectReduxStateIds)
      .next(["id1", "id2", "id3"])
      .select(FavoritesSelectors.selectAfterId)
      .next("afterId")
      .call(PostsApi.getFavoritesPosts, [ 'id4', 'id5' ], "afterId")
      .next(JestUtils.validNextPageResponse)
      .put(loadMoreFavoritesSuccess({ posts: JestUtils.nextPageOfPosts }))
      .next()
      .isDone();
  });

  it('should trigger success action with an empty array when all ids are already cached, so API call is skipped', async () => {
    
    testSaga(loadMoreFavoritesSaga)
      .next()
      .select(FavoritesSelectors.getLocalStorageIds)
      .next()
      .select(FavoritesSelectors.selectReduxStateIds)
      .next() 
      .select(FavoritesSelectors.selectAfterId)
      .next()//no ids to retrieve, call is skipped
      .put(loadMoreFavoritesSuccess({ posts: [] }))
      .next()
      .isDone();

      testSaga(loadMoreFavoritesSaga)
      .next()
      .select(FavoritesSelectors.getLocalStorageIds)
      .next(["id1", "id2", "id3"]) //all ids are already in the state
      .select(FavoritesSelectors.selectReduxStateIds)
      .next(["id1", "id2", "id3", "id4", "id5"]) 
      .select(FavoritesSelectors.selectAfterId)
      .next()//no ids to retrieve, call is skipped
      .put(loadMoreFavoritesSuccess({ posts: [] }))
      .next()
      .isDone();
  });

  it('should trigger failure action when valid ids are provided, but there is a null response', async () => {

    testSaga(loadMoreFavoritesSaga)
    .next()
    .select(FavoritesSelectors.getLocalStorageIds)
    .next(["id1", "id2"])
    .select(FavoritesSelectors.selectReduxStateIds)
    .next(["id1"])
    .select(FavoritesSelectors.selectAfterId)
    .next("afterId")
    .call(PostsApi.getFavoritesPosts, ["id2"], "afterId")
    .next(JestUtils.nullResponse)
    .put(loadMoreFavoritesFailure())
    .next()
    .isDone();

  });


});
