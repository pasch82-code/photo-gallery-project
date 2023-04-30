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
     * @param {RedditPost[]} posts - an array of RedditPost objects, which contain information about a post
     * on the Reddit platform.
     * @returns an array of objects of type `RedditReducedPost`. The array contains the mapped properties
     * of the input `RedditPost` array, filtered to only include posts with a `preview` property. The
     * mapped properties include the post's `id`, `title`, `source`, `permalink`, `resolutions`, and
     * `thumbnailUrl`.
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
     * filtering by source image dimensions if specified.
     * @param {RedditReducedPost[]} posts - an array of RedditReducedPost objects
     * @param {Resolution} resolution - a string representing the desired resolution of the thumbnail
     * image (e.g. "low", "medium", "high")
     * @param {number} minWidth - The minimum width that the source image of the thumbnail should have
     * in order to be included in the returned array of thumbnail image props.
     * @param {number} minHeight - The minimum height that the source image must have to be included in
     * the resulting array of thumbnail image props.
     * @param {number} maxWidth - The maximum width that the images should have. Images with a
     * sourceWidth greater than this value will be filtered out.
     * @param {number} maxHeight - The maximum height that an image can have to be included in the
     * returned array of ThumbnailProps.
     * @returns The function `mapToThumbnailImageProps` returns an array of `ThumbnailProps` objects,
     * which are created by mapping over an array of `RedditReducedPost` objects and extracting
     * relevant properties such as thumbnail URL, post ID, title, source URL, source height and width,
     * and permalink. The resulting array is then filtered based on optional minimum and maximum width
     * and height parameters before being returned.
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