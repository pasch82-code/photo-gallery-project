import React from 'react';
import {  test } from '@jest/globals';
import {  render, screen, fireEvent } from '@testing-library/react';
import { debug } from 'jest-preview';
import IconButton from "./IconButton";

const handleClick = jest.fn();

test('icon button component should work', async () => {

    render(<IconButton onClick={handleClick} name={"test"} />);
    const button: HTMLInputElement  = await screen.findByRole('button');
    fireEvent.click(button);
    expect(handleClick).toBeCalledTimes(1);
    debug();
})

