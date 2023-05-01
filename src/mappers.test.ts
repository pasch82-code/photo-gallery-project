import { JestUtils } from './jest-utils';
import { Mappers, composePostImageId } from './mappers';
import { flatten } from 'lodash';
import { Resolution } from './theme';

describe('mapToReducedRedditPost', () => {

    it('should correctly maps data', () => {

        const posts = JestUtils.validFirstPageResponse.data.data.children;
        const filteredPost = flatten(posts.filter(post => post.data.preview));
        const reducedPost = Mappers.mapToReducedRedditPost(posts);

        expect(posts.length).toBeGreaterThanOrEqual(reducedPost.length);
        expect(filteredPost.length).toEqual(reducedPost.length);

        expect(filteredPost.map(p => p.data.title).sort()).toEqual(reducedPost.map(rp => rp.title).sort());
        expect(filteredPost.map(p => composePostImageId(p)).sort()).toEqual(reducedPost.map(rp => rp.id).sort());
        expect(filteredPost.map(p => p.data.permalink).sort()).toEqual(reducedPost.map(rp => rp.permalink).sort());
        expect(filteredPost.map(p => p.data.thumbnail).sort()).toEqual(reducedPost.map(rp => rp.thumbnailUrl).sort());
        expect(flatten(filteredPost.map(p => p.data.preview.images.map(i => i.resolutions))).sort()).toEqual(reducedPost.map(rp => rp.resolutions).sort());
        expect(flatten(filteredPost.map(p => p.data.preview.images.map(i => i.source))).sort()).toEqual(reducedPost.map(rp => rp.source).sort());
    });
});

describe('mapToThumbnailImageProps', () => {
    it('should correctly maps data', () => {

        const posts = JestUtils.firstPageOfPosts;
        
        const images = Mappers.mapToThumbnailImageProps(JestUtils.firstPageOfPosts, Resolution.desktop);
        expect(posts.length).toEqual(images.length);
        expect(posts.map(p => p.id).sort()).toEqual(images.map(i => i.postId).sort());
        expect(posts.map(p => p.permalink).sort()).toEqual(images.map(i => i.permalink).sort());
        expect(posts.map(p => p.thumbnailUrl).sort()).toEqual(images.map(i => i.thumbnailUrl).sort());
        expect(posts.map(p => p.title).sort()).toEqual(images.map(i => i.title).sort());    
    });

    it('it should not map data when provided wrong sizes', () => {

        const wrongResolution = Mappers.mapToThumbnailImageProps(JestUtils.firstPageOfPosts, Resolution.desktop, 100000, 100000, 1, 1);
        expect(wrongResolution.length).toEqual(0);

    });
});