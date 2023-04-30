import Filters from "./Filters"
import userEvent from "@testing-library/user-event"
import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { t } from 'i18next';
import { Wrapper } from "../jest-utils";

test('should show filter component and button is disabled at start', async () => {
    // ARRANGE
    render(<Filters />, { wrapper: Wrapper });
    // ACT
    expect(await screen.findByRole('button')).toBeDisabled()
    debug();
})