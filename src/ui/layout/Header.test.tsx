import React from 'react';
import { test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import {  renderWithProviders } from "../../jest-utils";
import Header from "./Header";
import { debug } from 'jest-preview';

test('should show header component', async () => {
 
    renderWithProviders(<Header />);
    const filterButton = await screen.findByRole('button', { name: "filter" });
    expect(await screen.findByRole('button', { name: "hamburger" })).toBeInTheDocument()
    expect(filterButton).toBeInTheDocument()
    
    fireEvent.click(filterButton);
    //TODO better test the dispatch really happens
    
    //debug();
})