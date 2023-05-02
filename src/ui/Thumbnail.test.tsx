import React from 'react';
import { render } from '@testing-library/react';
import { debug } from 'jest-preview';
import { useInView } from 'react-intersection-observer';
import Thumbnail, { ThumbnailProps } from './Thumbnail';

const props: ThumbnailProps = {
  thumbnailUrl: "https://picsum.photos/200/300",
  postId: "postId",
  title: "image title",
  sourceHeight: 2000,
  sourceWidth: 1000,
  sourceUrl: "https://picsum.photos/200/300",
  permalink: "https://jestjs.io",
  url: "https://picsum.photos/200/300",
  width: 400,
  height: 300
}

it("should display a Thumbnail", () => {
  (useInView as jest.Mock).mockImplementation(() => ({ inView: true, ref: {  current: { } }}));
  render(<Thumbnail {...props} />);

  debug();
});

