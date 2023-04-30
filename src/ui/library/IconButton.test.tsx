import userEvent from "@testing-library/user-event"
import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { t } from 'i18next';
import InputText from "./InputText";
import { Resolution } from "../../theme";
import IconButton from "./IconButton";

beforeEach(() => {

});

afterEach(() => {
    //window.history.pushState({}, '', '/');
    jest.clearAllMocks();
});

const handleClick = jest.fn();

test('icon button component should work', async () => {

    render(<IconButton onClick={handleClick} name={"test"} />);

    const button: HTMLInputElement  = await screen.findByRole('button');

    fireEvent.click(button);
    expect(handleClick).toBeCalledTimes(1);
    debug();
})

