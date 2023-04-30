import ThumbnailImage from './ThumbnailImage';
import React from 'react';
import { fireEvent, render , screen} from '@testing-library/react';
import { debug } from 'jest-preview';
import { ROW_HEIGHTS } from '../theme';
import { Resolution } from '../theme';
import PixelatedImage from './PixelatedImage';

const thumbSrc = "https://jestjs.io/img/opengraph.png";
const rowHeight = ROW_HEIGHTS[Resolution.desktop];

it("should display PixelatedImage ", () => {
  
  render(<PixelatedImage src={thumbSrc} height={rowHeight}  />);
  debug();
});


// it("should display ThumbnailImage source image if it is in view", async () => {
//   //(useInView as jest.Mock).mockImplementation(() => ({ inView: true, ref: {  current: { } }}));
//   renderImage();  
//   const img: HTMLImageElement = await screen.findByRole("img");

//   jest.useFakeTimers();

//   fireEvent.load(img); 
//   jest.advanceTimersByTime(2000);

//   expect(img.height).toBe(rowHeight);  
//   fireEvent.click(img);
//   expect(handleClick).toBeCalledTimes(1);

//   debug();
// });
