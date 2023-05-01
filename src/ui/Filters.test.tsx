import Filters from "./Filters"
import React from 'react';
import {  render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import { renderWithProviders } from "../jest-utils";

test('should show filter component and button is disabled at start', async () => {

    renderWithProviders(<Filters />);
    const button = await screen.findByRole('button');
    expect(button).toBeDisabled()

    debug();
})