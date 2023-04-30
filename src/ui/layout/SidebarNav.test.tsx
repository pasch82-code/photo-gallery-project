import React from 'react';
import { test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { WrapperWithRouter } from "../../jest-utils";
import SidebarNav from "./SidebarNav";

test('should show sidebar nav component', async () => {

    render(<SidebarNav />, { wrapper: WrapperWithRouter });
 
    expect(await screen.findByRole('link', { name: "Home" })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: "Favorites" })).toBeInTheDocument()

    debug();
})