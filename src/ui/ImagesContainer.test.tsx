import Filters from "./Filters"
import userEvent from "@testing-library/user-event"
import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { t } from 'i18next';
import { Resolution } from "../theme";
import ImagesContainer from "./ImagesContainer";

const handleLoadMore = jest.fn();

test('load images container component with spinner', async () => {
    // ARRANGE
    render(<ImagesContainer
         handleLoadMore={handleLoadMore} 
         hasRecords={false}
         images={[]} 
         isLoading={true} />);
    // ACT
    //expect(await screen.findByRole('button')).toBeDisabled()
    debug();
})

test('load images container component without spinner', async () => {
    // ARRANGE
    render(<ImagesContainer
         handleLoadMore={handleLoadMore} 
         hasRecords={false}
         images={[]} 
         isLoading={true} />);

         const svg = screen.queryByLabelText("spinner");
    // ACT
    //expect(await screen.findByRole('button')).toBeDisabled()
    debug();
})