import React from 'react';
import { test } from '@jest/globals';
import { screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import { renderWithProviders } from "../../jest-utils";
import SidebarNav from "./SidebarNav";

test('should show sidebar nav component', async () => {

    renderWithProviders(<SidebarNav />, { useRouter: true });
 
    expect(await screen.findByRole('link', { name: "Home" })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: "Favorites" })).toBeInTheDocument()

    debug();
})