import React from 'react';
import { test } from '@jest/globals';
import { render } from '@testing-library/react';
import { debug } from 'jest-preview';
import { Resolution } from "../../theme";
import InfiniteScrollContainer from "./InfiniteScrollContainer";

beforeEach(() => {
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
    jest.clearAllMocks();
});

const handleScrollReached = jest.fn();

test('InfiniteScrollContainer should work', async () => {
  
     render(<InfiniteScrollContainer
         hasRecords={false}
         isFetching={false}
         onScrollReached={handleScrollReached} >
     </InfiniteScrollContainer>);

    // ACT
    //expect(await screen.findByRole('button')).toBeDisabled()
    debug();
})