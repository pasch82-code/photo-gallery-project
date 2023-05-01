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
  
        expect(axios.get).toHaveBeenCalledWith(`https://www.reddit.com/r/${searchString}/top.json`);
      });

           
      it('httpClient is called as expected with pagination', async () => {
        const searchString = 'test';
        const afterId = 'test';
        
        PostsApi.searchPostsByChannelName(searchString, afterId);
  
        expect(axios.get).toHaveBeenCalledWith(`https://www.reddit.com/r/${searchString}/top.json?after=${afterId}`);
      });

    });
  
    describe('getFavoritesPosts', () => {  
      it('httpClient is called as expected', () => {
        PostsApi.getFavoritesPosts([]);
        expect(axios.get).toHaveBeenCalledWith(`https://api.reddit.com/by_id/`);
      });

      it('httpClient is called as expected with pagination', async () => {
        const afterId = 'test';        
        PostsApi.getFavoritesPosts([], afterId);  
        expect(axios.get).toHaveBeenCalledWith(`https://api.reddit.com/by_id/?after=${afterId}`);
      });
    });

  });
  