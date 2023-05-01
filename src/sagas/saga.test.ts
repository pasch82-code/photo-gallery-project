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

});
