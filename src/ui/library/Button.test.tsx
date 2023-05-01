import React from 'react';
import { test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { debug } from 'jest-preview';
import Button from "./Button";

const handleClick = jest.fn();

test('button component should work', async () => {
    render(<Button onClick={handleClick} />);
    const button: HTMLInputElement = await screen.findByRole('button');
    fireEvent.click(button);
    expect(handleClick).toBeCalledTimes(1);    
    //debug();
})

test('button component should be disabled', async () => {
    render(<Button disabled />);
    const button: HTMLInputElement = await screen.findByRole('button');
    expect(button).toBeDisabled();
    //debug();
})