import userEvent from "@testing-library/user-event"
import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { t } from 'i18next';
import InputText from "./InputText";
import { Resolution } from "../../theme";
import InfiniteScrollContainer from "./InfiniteScrollContainer";

beforeEach(() => {
    //window.history.pushState({}, '', '/');
    jest.mock('use-breakpoint', () => {
        return jest.fn(() => ({
            useBreakpoint: {
                breakpoint: Resolution.desktop
            }
        }))
    })

    jest.mock('react', () => {
        return {
          ...jest.requireActual<typeof React>('react'),
          useRef: jest.fn(),
        };
      });
});

afterEach(() => {
    //window.history.pushState({}, '', '/');
    jest.clearAllMocks();
});

const handleScrollReached = jest.fn();

test('InfiniteScrollContainer should work', async () => {
  
    //test local value

    //test debounce, placeholder, icon

    // ARRANGE
     render(<InfiniteScrollContainer
         hasRecords={false}
         isLoading={false}
         onScrollReached={handleScrollReached} >
     </InfiniteScrollContainer>);

    // ACT
    //expect(await screen.findByRole('button')).toBeDisabled()
    debug();
})