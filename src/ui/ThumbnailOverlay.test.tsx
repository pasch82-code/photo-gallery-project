import ThumbnailImage from './ThumbnailImage';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import { useInView } from 'react-intersection-observer';
import { ROW_HEIGHTS } from '../theme';
import { Resolution } from '../theme';
import Thumbnail, { ThumbnailProps } from './Thumbnail';
import ThumbnailOverlay, { ThumbnailOverlayProps } from './ThumbnailOverlay';
import { WrapperWithRouter } from '../jest-utils';

const props: ThumbnailOverlayProps = {
  postId: "postId",
  title: "image title",
  sourceHeight: 2000,
  sourceWidth: 1000,
  permalink: "https://jestjs.io",
  url: "https://jestjs.io/img/opengraph.png",

}

function renderThumbnailOverlay() {
  render(<ThumbnailOverlay {...props} />, { wrapper: WrapperWithRouter });
}

it("should display ThumbnailOverlay", async () => {
  renderThumbnailOverlay();

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

