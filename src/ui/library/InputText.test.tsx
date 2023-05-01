import React from 'react';
import { test } from '@jest/globals';
import { act, render, screen,  fireEvent } from '@testing-library/react';
import { debug } from 'jest-preview';
import InputText, { DEBOUNCE_MILLISECONDS } from "./InputText";

const handleChange = jest.fn();

test('input text component should work', async () => {

    const value = "initial value";
    const inputName = "input-name";
    const placeholder = "placeholder value";

    render(<InputText
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={handleChange} />);

    const input: HTMLInputElement = await screen.findByRole('textbox', { name: inputName });

    expect(input).toHaveValue(value);
    expect(input).toHaveAttribute("placeholder", placeholder)

    jest.useFakeTimers();

    await act(async () => {
        fireEvent.change(input, { target: { value: "a" } });
        fireEvent.change(input, { target: { value: "ab" } });
        fireEvent.change(input, { target: { value: "abc" } });
        fireEvent.change(input, { target: { value: "abcd" } });
        fireEvent.change(input, { target: { value: "abcde" } });
        fireEvent.change(input, { target: { value: "abcdef" } });
        fireEvent.change(input, { target: { value: "abcdefg" } });

        jest.advanceTimersByTime(DEBOUNCE_MILLISECONDS);
        expect(handleChange).toBeCalledTimes(1);
        expect(input).toHaveValue("abcdefg");
    })

    await act(async () => {
        fireEvent.change(input, { target: { value: "another value" } });
        jest.advanceTimersByTime(DEBOUNCE_MILLISECONDS);
        fireEvent.change(input, { target: { value: "final value" } });
        jest.advanceTimersByTime(DEBOUNCE_MILLISECONDS);
        expect(handleChange).toBeCalledTimes(3);
        expect(input).toHaveValue("final value");
    })

    debug();
})