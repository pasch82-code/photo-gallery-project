import ThumbnailImage from './ThumbnailImage';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import { useInView } from 'react-intersection-observer';
import { ROW_HEIGHTS } from '../theme';
import { Resolution } from '../theme';

const thumbSrc = "https://jestjs.io/img/opengraph.png";
const imageSource = "https://jestjs.io/img/opengraph.png";
const rowHeight = ROW_HEIGHTS[Resolution.desktop];

const handleClick = jest.fn();

function renderImage(inView: boolean) {
    (useInView as jest.Mock).mockImplementation(() => ({ inView, ref: { current: {} } }));
    render(<ThumbnailImage rowHeight={rowHeight} thumbSrc={thumbSrc} url={imageSource} onClick={handleClick} />);
}

it("should display ThumbnailImage svg pixellated image instead of image if it is not in view", async () => {

    renderImage(false);

    const img: HTMLImageElement = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
    const svg = screen.queryByLabelText("svg-thumb");
    expect(svg).toBeInTheDocument();

    debug();
});


it("should display ThumbnailImage source image when is loaded and it is in view", async () => {
    
    renderImage(true);

    jest.useFakeTimers();

    const svg = screen.queryByLabelText("svg-thumb");
    expect(svg).toBeInTheDocument();

    const img: HTMLImageElement = screen.getByRole("img");
    fireEvent.load(img);

    jest.advanceTimersByTime(1000);

    expect(img).toBeInTheDocument();
    expect(svg).not.toBeInTheDocument();
    expect(img.height).toBe(rowHeight);
    expect(img.src).toBe(imageSource);

    fireEvent.click(img);
    expect(handleClick).toBeCalledTimes(1);

    debug();
});