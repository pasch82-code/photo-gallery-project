import { call, select } from "redux-saga/effects";
import PostsApi from "../api/PostsApi";
import { expectSaga } from 'redux-saga-test-plan';
import { loadMorePostsSaga } from "./posts/loadMorePostsSaga";
import { JestUtils } from "../jest-utils";
import { rootReducer } from "../state/store";
import { PostSelectors } from "../state/posts/postsSelectors";
import { AppState } from "../state/state";
import { adapters } from "../state/adapters";
import { favoritesReducer, toggleFavorite } from "../state/favorites/favoritesSlice";
import { produce } from "immer";
import { getFavoritesPostsSaga } from "./favorites/getFavoritesPostsSaga";
import { FavoritesSelectors } from "../state/favorites/favoritesSelectors";
import { Resolution } from "../theme";
import { last } from "lodash";

describe('redux saga integrations tests', () => {

  it('loadMorePostsSaga saga does not replace existing posts', async () => {

    const searchText = "pics";
    const afterId = "afterId";

    const initialState = JestUtils.appStateWithPreloadedFirstPageOfPosts;
    expect(adapters.getSelectors().selectAll(initialState.galleryPage.posts)).toEqual(JestUtils.firstPageOfPosts);

    const saga = await expectSaga(loadMorePostsSaga)
      .withReducer(rootReducer)
      .withState(initialState)
      .provide([
        [select(PostSelectors.getEditingSearchText), searchText],
        [select(PostSelectors.selectAfterId), afterId],
        [call(PostsApi.searchPostsByChannelName, searchText, afterId), JestUtils.validNextPageResponse]
      ])
      .run();

    const sagaState: AppState = saga.storeState;

    expect(adapters.getSelectors().selectAll(sagaState.galleryPage.posts)).toEqual(JestUtils.allPosts);
    expect(sagaState.galleryPage.isFetching).toEqual(false);
    expect(sagaState.galleryPage.hasError).toEqual(false);
    expect(sagaState.galleryPage.hasMoreRecords).toEqual(true);

  });

  it('getFavoritesPostsStart saga does not replace existing favorite posts and it is sorted correctly', async () => {

    const searchText = "pics";
    const afterId = "afterId";

    const initialState = JestUtils.appStateWithPreloadedFirstPageOfPosts;
    expect(adapters.getSelectors().selectAll(initialState.galleryPage.posts)).toEqual(JestUtils.firstPageOfPosts);

    const post = JestUtils.singleFirstPost;
    const addAction = toggleFavorite({ id: post.id, post });    
    const favoritesState = favoritesReducer(initialState.favoritesPageState, addAction);

    const appInitialStateWithOneFavorite = produce(initialState, draftState => {
      draftState.favoritesPageState = favoritesState;
    })

     const storageIds: string[] = FavoritesSelectors.getLocalStorageIds(appInitialStateWithOneFavorite);
     const stateIds: string[] = FavoritesSelectors.selectReduxStateIds(appInitialStateWithOneFavorite);

     expect(storageIds).toStrictEqual([post.id]); 
     expect(stateIds).toStrictEqual([post.id]); 

    const saga = await expectSaga(getFavoritesPostsSaga)
      .withReducer(rootReducer)
      .withState(appInitialStateWithOneFavorite)
      .provide([
        [select(FavoritesSelectors.getLocalStorageIds), []],
        [select(FavoritesSelectors.selectReduxStateIds), ["id1"]],
        [call(PostsApi.getFavoritesPosts, ["id1"]), JestUtils.validNextPageResponse]
      ])
      .run();

    const sagaState: AppState = saga.storeState;

    //should be the last sorted post
    const sortedImages = FavoritesSelectors.selectImages(sagaState, Resolution.desktop);
    expect(last(sortedImages).postId).toBe(post.id);
  
  });

});
