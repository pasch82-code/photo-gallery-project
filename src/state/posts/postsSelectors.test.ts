import { last } from "lodash";
import { JestUtils } from "../../jest-utils";
import { PostSelectors } from "./postsSelectors";

describe('redux selectors tests', () => {

    it('Should select the id of the last post', () => {
        const lastPost = last(JestUtils.firstPageOfPosts);
        const state = JestUtils.appStateWithPreloadedFirstPageOfPosts;
        const afterId = PostSelectors.selectAfterId(state);
        expect(afterId).toBe(lastPost.id);
    });
    
})