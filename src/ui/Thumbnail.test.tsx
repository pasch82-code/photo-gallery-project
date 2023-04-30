import ThumbnailImage from './ThumbnailImage';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import { useInView } from 'react-intersection-observer';
import { ROW_HEIGHTS } from '../theme';
import { Resolution } from '../theme';
import Thumbnail, { ThumbnailProps } from './Thumbnail';

const props: ThumbnailProps = {
  thumbnailUrl: "https://jestjs.io/img/opengraph.png",
  postId: "postId",
  title: "image title",
  sourceHeight: 2000,
  sourceWidth: 1000,
  sourceUrl: "https://jestjs.io/img/opengraph.png",
  permalink: "https://jestjs.io",
  url: "https://jestjs.io/img/opengraph.png",
  width: 400,
  height: 300
}

function renderImage() {
  render(<Thumbnail {...props} />);
}

it("should display Thumbnail ", () => {
  (useInView as jest.Mock).mockImplementation(() => ({ inView: true, ref: {  current: { } }}));
  renderImage();

  // const img: HTMLImageElement = screen.queryByRole("img");
  // expect(img).not.toBeInTheDocument();
  // const svg = screen.queryByLabelText("svg-thumb");
  // expect(svg).toBeInTheDocument();

  debug();
});


// it("should display Thumbnail source image when is loaded and it is in view", async () => {
//   renderImage(true);
//   jest.useFakeTimers();
//   const svg = screen.queryByLabelText("svg-thumb");
//   expect(svg).toBeInTheDocument();
//   const img: HTMLImageElement = screen.getByRole("img");
//   fireEvent.load(img);
//   jest.advanceTimersByTime(1000);
//   expect(img).toBeInTheDocument();
//   expect(svg).not.toBeInTheDocument();
//   expect(img.height).toBe(rowHeight);
//   expect(img.src).toBe(imageSource);
//   fireEvent.click(img);
//   expect(handleClick).toBeCalledTimes(1);
//   debug();
// });

