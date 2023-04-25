import { RedditImageData } from "./redditPost";

/* This code is defining an interface named `RedditReducedPostData` which describes the structure of a
reduced Reddit post data object. The interface has six properties: `id`, `title`, `permalink`,
`thumbnailUrl`, `resolutions`, and `source`. The `id`, `title`, and `permalink` properties are of
type `string`, while `thumbnailUrl` is also of type `string` but represents a URL. The `resolutions`
and `source` properties are arrays of `RedditImageData` objects. This interface can be used to
define the shape of objects that conform to this structure. */
export interface RedditReducedPostData {
  id: string,
  title: string,
  permalink: string;
  thumbnailUrl: string;
  resolutions: RedditImageData[];
  source: RedditImageData;
}