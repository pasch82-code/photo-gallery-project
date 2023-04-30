import userEvent from "@testing-library/user-event"
import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { Wrapper } from "../../jest-utils";
import Header from "./Header";

test('should show header component', async () => {
  
    render(<Header />, { wrapper: Wrapper });
  
    expect(await screen.findByRole('button', { name: "hamburger"})).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: "filter"})).toBeInTheDocument()

    debug();
})