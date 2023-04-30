import PostsApi from "../../api/PostsApi";
import { testSaga } from 'redux-saga-test-plan';
import { loadMorePostsSaga } from "./loadMorePostsSaga";
import { JestUtils } from "../../jest-utils";
import { PostSelectors } from "../../state/posts/postsSelectors";
import { loadMorePostsFailure, loadMorePostsSuccess } from "../../state/posts/postsSlice";

const searchText = "validSearchText";
const afterId = "validAfterId";

describe('loadMorePostsSaga', () => {

  it('should trigger success action when provided a valid search text, afterId, and valid response', async () => {

    testSaga(loadMorePostsSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next(searchText)
      .select(PostSelectors.selectAfterId)
      .next(afterId)
      .call(PostsApi.searchPostsByChannelName, searchText, afterId)
      .next(JestUtils.validNextPageResponse)
      .put(loadMorePostsSuccess({ posts: JestUtils.nextPageOfPosts }))
      .next()
      .isDone();

  });

  it('should trigger failure action when provided a valid search text and afterId, but null response', async () => {

    testSaga(loadMorePostsSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next(searchText)
      .select(PostSelectors.selectAfterId)
      .next(afterId)
      .call(PostsApi.searchPostsByChannelName, searchText, afterId)
      .next(JestUtils.nullResponse)
      .put(loadMorePostsFailure())
      .next()
      .isDone();
  });

  it('should trigger success action with an empty array when provided a empty search text or empty afterId, so API call is skipped', () => {

    testSaga(loadMorePostsSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next("")
      .select(PostSelectors.selectAfterId)
      .next(afterId)
      .put(loadMorePostsSuccess({ posts: [] }))
      .next()
      .isDone();

    testSaga(loadMorePostsSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next(searchText)
      .select(PostSelectors.selectAfterId)
      .next("")
      .put(loadMorePostsSuccess({ posts: [] }))
      .next()
      .isDone();

    testSaga(loadMorePostsSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next("")
      .select(PostSelectors.selectAfterId)
      .next("")
      .put(loadMorePostsSuccess({ posts: [] }))
      .next()
      .isDone();

  });

});
