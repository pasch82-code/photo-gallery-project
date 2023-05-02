import React from 'react';
import { test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import ImagesContainer from "./ImagesContainer";

const handleLoadMore = jest.fn();

test('should show load images container component with spinner', async () => {

    render(<ImagesContainer
        handleLoadMore={handleLoadMore}
        hasRecords={false}
        images={[]}
        isLoading={true} />);

    const svg = screen.queryByLabelText("spinner");
    expect(svg).toBeInTheDocument()
    debug();
})

test('should show load images container component without spinner', async () => {

    render(<ImagesContainer
        handleLoadMore={handleLoadMore}
        hasRecords={false}
        images={[]}
        isLoading={false} />);

    const svg = screen.queryByLabelText("spinner");
    expect(svg).not.toBeInTheDocument()
    debug();
})