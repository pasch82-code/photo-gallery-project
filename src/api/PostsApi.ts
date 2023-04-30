import axios, { AxiosResponse } from "axios";
import { RedditPostRoot } from "./redditPost";

/** The PostsApi class provides methods for retrieving favorite posts by ID and searching for posts by
channel name from the Reddit API. */
class PostsApi {

    /** This is a method in the `PostsApi` class that retrieves favorite posts by their IDs from the
    Reddit API. It takes in an array of post IDs as a required parameter `ids` and an optional
    parameter `afterId` which is used for pagination. The method returns a Promise that resolves to
    an AxiosResponse object containing the response data from the API. The response data is expected
    to be in the format of a `RedditPostRoot` object. The method constructs a URL using the provided
    IDs and optional `afterId` parameter, and then makes a GET request to the Reddit API using the
    Axios library. */
    getFavoritesPosts = async (ids: string[], afterId?: string): Promise<AxiosResponse<RedditPostRoot>> => {
        const afterText = afterId ? `?after=${afterId}` : "";
        const response = await axios.get<RedditPostRoot>(`https://api.reddit.com/by_id/${ids.join(",")}${afterText}`);
        return response;
    }

    /** `searchPostsByChannelName` is a method in the `PostsApi` class that searches for posts on Reddit
    by channel name. It takes in two parameters: `searchText`, which is a string representing the
    name of the channel to search for, and `afterId`, which is an optional string representing the ID
    of the last post in the previous search results (used for pagination). */
    searchPostsByChannelName = async (searchText: string, afterId?: string): Promise<AxiosResponse<RedditPostRoot>> => {
        const afterText = afterId ? `?after=${afterId}` : "";
        const response = await axios.get<RedditPostRoot>(`https://www.reddit.com/r/${searchText}/top.json${afterText}`);
        return response;
    }
}

export default new PostsApi();