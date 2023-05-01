import React from 'react';
import { test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import Spinner from "./Spinner";

test('should show spinner component', async () => {
    render(<Spinner/>);
    const svg = screen.queryByLabelText("spinner");
    expect(svg).toBeInTheDocument()
    debug();
})