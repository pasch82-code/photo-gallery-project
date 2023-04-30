
import PostsApi from "../../api/PostsApi";
import { testSaga } from 'redux-saga-test-plan';
import { searchPostsByChannelNameSaga } from "./searchPostsByChannelNameSaga";
import { JestUtils } from "../../jest-utils";
import { searchPostsByChannelNameFailure, searchPostsByChannelNameSuccess } from "../../state/posts/postsSlice";
import { PostSelectors } from "../../state/posts/postsSelectors";

const searchText = "validSearchText";

describe('searchPostsByChannelNameSaga', () => {

  it('should trigger success action when provided a valid search text and API send back a valid response', async () => {

    testSaga(searchPostsByChannelNameSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next(searchText)
      .call(PostsApi.searchPostsByChannelName, searchText)
      .next(JestUtils.validFirstPageResponse)
      .put(searchPostsByChannelNameSuccess({ posts: JestUtils.firstPageOfPosts, searchText: searchText }))
      .next()
      .isDone();
  });

  it('should trigger failure action when provided a valid search text and API send back a null response', async () => {

    testSaga(searchPostsByChannelNameSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next(searchText)
      .call(PostsApi.searchPostsByChannelName, searchText)
      .next(JestUtils.nullResponse)
      .put(searchPostsByChannelNameFailure())
      .next()
      .isDone();
  });

  it('should trigger success action with an empty array when provided a empty search text and API call is skipped', () => {

    testSaga(searchPostsByChannelNameSaga)
      .next()
      .select(PostSelectors.getEditingSearchText)
      .next("")
      .put(searchPostsByChannelNameSuccess({ posts: [], searchText: "" }))
      .next()
      .isDone();
  });

});