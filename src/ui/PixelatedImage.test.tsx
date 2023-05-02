import React from 'react';
import { render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import { ROW_HEIGHTS } from '../theme';
import { Resolution } from '../theme';
import PixelatedImage from './PixelatedImage';

const rowHeight = ROW_HEIGHTS[Resolution.desktop];
const thumbSrc = `https://picsum.photos/200/${rowHeight}.jpg`;

it("should display a PixelatedImage", async () => {
  //jest.useFakeTimers();

  render(<PixelatedImage src={thumbSrc} height={rowHeight} />);
  debug();

  const svg = await screen.findByLabelText("svg-thumb");
  expect(svg).toBeInTheDocument();
  expect(svg).toHaveStyle(`height: ${rowHeight}px;`)

  debug();
});