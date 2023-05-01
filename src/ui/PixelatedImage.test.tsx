import React from 'react';
import { render } from '@testing-library/react';
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