import { RedditPost } from "./types/redditPost";
import { first, flatten } from "lodash";
import { RedditReducedPostData as RedditPostImageData } from "./types/entity";

const calculatePostImageId = (post: RedditPost) => !post? null : post.kind + "_" + post.data.id;

export namespace PostMappers {

    export function mapToRedditPostImageData(posts: RedditPost[]) {

        let images: RedditPostImageData[] = flatten(posts.filter(post => post.data.preview).map(post => {

            const image = first(post.data.preview.images);

            const mappedImage: RedditPostImageData = {
                id: calculatePostImageId(post),
                title: post.data.title,
                source: image.source,
                permalink: post.data.permalink,
                resolutions: image.resolutions,
                thumbnailUrl: post.data.thumbnail
            }
            return mappedImage;
        }));

        return images;
    }
}