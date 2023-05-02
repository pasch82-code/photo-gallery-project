import React from 'react';
import { test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Label from './Label';

test('Label text component should work', async () => {
    const value = "label value";
    render(<Label>
        {value}
    </Label>);

    const label: HTMLLabelElement = await screen.findByText(value);
    expect(label).toBeInTheDocument();
})