import { call, select } from "redux-saga/effects";
import PostsApi from "../api/PostsApi";
import { expectSaga } from 'redux-saga-test-plan';
import { loadMorePostsSaga } from "./posts/loadMorePostsSaga";
import { JestUtils } from "../jest-utils";
import { rootReducer } from "../state/store";
import { PostSelectors } from "../state/posts/postsSelectors";
import { AppState } from "../state/state";
import { adapters } from "../state/adapters";

describe('integrations tests', () => {

  it('loadMorePostsSaga saga does not replace existing posts', async () => {

    const searchText = "pics";
    const afterId = "afterId";

    const initialState = JestUtils.stateWithPreloadedFirstPageOfPosts;
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

  // it('null response failure triggers failure action', () => {
  //   const searchText = 'test';
  //   const response: AxiosResponse<RedditPostRoot> = {
  //     data: null,
  //     status: 0,
  //     statusText: "",
  //     headers: undefined,
  //     config: undefined
  //   };

  //   const generator = searchPostsByChannelNameSaga(searchPostsByChannelNameStart({ searchText }));

  //   expect(generator.next().value)
  //     .toEqual(call(PostsApi.searchPostsByChannelName, searchText));

  //   expect(generator.next(response).value)
  //     .toEqual(put(searchPostsByChannelNameFailure()));

  //   expect(generator.next())
  //     .toEqual({ done: true, value: undefined });
  // });

  // it('empty search text trigger success with empty array', () => {
  //   const searchText = '';

  //   const generator = searchPostsByChannelNameSaga(searchPostsByChannelNameStart({ searchText }));

  //   expect(generator.next().value)
  //     .toEqual(put(searchPostsByChannelNameSuccess({ posts: [], searchText })));

  //   expect(generator.next())
  //     .toEqual({ done: true, value: undefined });
  // });

});
