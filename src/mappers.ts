import { RedditPost } from "./api/redditPost";
import { find, first, flatten, last } from "lodash";
import { ROW_HEIGHTS, Resolution } from "./theme";
import { ThumbnailProps } from "./ui/Thumbnail";
import { RedditReducedPost } from "./state/state";

export const composePostImageId = (post: RedditPost) => !post ? null : post.kind + "_" + post.data.id;

export namespace Mappers {

    /**
     * The function maps an array of RedditPost objects to an array of RedditReducedPost objects by
     * filtering and flattening the posts and extracting relevant information.
     * @param {RedditPost[]} posts - an array of RedditPost objects, which contain information about a
     * post on the Reddit platform.
     * @returns The function `mapToReducedRedditPost` returns an array of `RedditReducedPost` objects,
     * which are created by mapping and reducing the input array of `RedditPost` objects. The resulting
     * `RedditReducedPost` objects contain a subset of the properties of the original `RedditPost`
     * objects, including the post ID, title, source image, permalink, image resolutions, and thumbnail
     */
    export function mapToReducedRedditPost(posts: RedditPost[]) {

        let images: RedditReducedPost[] = flatten(posts.filter(post => post.data.preview).map(post => {

            const image = first(post.data.preview.images);

            const mappedImage: RedditReducedPost = {
                id: composePostImageId(post),
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

    /**
     * This function maps an array of RedditReducedPost objects to an array of ThumbnailProps objects,
     * with optional filtering by image resolution.
     * @param {RedditReducedPost[]} posts - an array of RedditReducedPost objects
     * @param {Resolution} resolution - The desired resolution for the thumbnail image. It is used to
     * find the closest matching resolution from the available resolutions of the post's image.
     * @param {number} [minWidth] - The minimum width of the source image that should be included in
     * the result. Images with a source width less than this value will be filtered out.
     * @param {number} [minHeight] - The minimum height in pixels that the source image must have to be
     * included in the resulting array of thumbnail image props.
     * @param {number} [maxWidth] - The maximum width that the images should have. Any images with a
     * sourceWidth greater than this value will be filtered out.
     * @param {number} [maxHeight] - The maximum height that a thumbnail image can have. Any thumbnail
     * image with a height greater than this value will be filtered out from the final result.
     * @returns The function `mapToThumbnailImageProps` returns an array of `ThumbnailProps` objects,
     * which are created by mapping over an array of `RedditReducedPost` objects and extracting
     * relevant properties such as thumbnail URL, post ID, title, source URL, source height and width,
     * and permalink. The function also filters the resulting array based on optional minimum and
     * maximum width and height parameters.
     */
    export function mapToThumbnailImageProps(posts: RedditReducedPost[], resolution: Resolution, minWidth?: number, minHeight?: number, maxWidth?: number, maxHeight?: number) {

        let images = posts.map(post => {

            let imageByResolution = resolution ? find(post.resolutions, r => r.height >= ROW_HEIGHTS[resolution]) : null;
            if (imageByResolution == undefined)
                imageByResolution = last(post.resolutions);

            const thumb: ThumbnailProps = {
                ...imageByResolution,
                thumbnailUrl: post.thumbnailUrl,
                postId: post.id,
                title: post.title,
                sourceUrl: post.source.url,
                sourceHeight: post.source.height,
                sourceWidth: post.source.width,
                permalink: post.permalink
            }

            return thumb;
        });

        if (minWidth)
            images = images.filter(i => i.sourceWidth >= minWidth);

        if (minHeight)
            images = images.filter(i => i.sourceHeight >= minHeight);

        if (maxWidth)
            images = images.filter(i => i.sourceWidth <= maxWidth);

        if (maxHeight)
            images = images.filter(i => i.sourceHeight <= maxHeight);

        return images;
    }

}