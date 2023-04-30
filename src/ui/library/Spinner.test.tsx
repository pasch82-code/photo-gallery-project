import userEvent from "@testing-library/user-event"
import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { t } from 'i18next';
import Spinner from "./Spinner";

beforeEach(() => {
    //window.history.pushState({}, '', '/');
    // jest.mock('use-breakpoint', () => {
    // return jest.fn(() => ({
    //     useBreakpoint: {
    //         breakpoint: Resolution.desktop
    //     }
    // }))
    //})
});

afterEach(() => {
    //window.history.pushState({}, '', '/');
    jest.clearAllMocks();
});

const handleLoadMore = jest.fn();

test('should show spinner component', async () => {
    // ARRANGE
    render(<Spinner/>);

    const svg = screen.queryByLabelText("spinner");
    // ACT
    //expect(await screen.findByRole('button')).toBeDisabled()
    debug();
})

