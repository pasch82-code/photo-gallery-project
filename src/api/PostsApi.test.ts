import axios from "axios";
import PostsApi from "./PostsApi";

describe('posts api', () => {
    beforeEach(() => {
      axios.get = jest.fn();
    })

    describe('searchPostsByChannelName', () => {
      it('httpClient is called as expected', async () => {
        const searchString = 'test';
        PostsApi.searchPostsByChannelName(searchString);
        //TODOPS leak
        expect(axios.get).toHaveBeenCalledWith(`https://www.reddit.com/r/${searchString}/top.json`);
      });
    });
  
    describe('getFavoritesPosts', () => {  
      it('httpClient is called as expected', () => {
        PostsApi.getFavoritesPosts([]);
        expect(axios.get).toHaveBeenCalledWith(`https://api.reddit.com/by_id/`);
      });
    });
  });
  