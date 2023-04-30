import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import { Wrapper } from '../../jest-utils';
import AppRoutes, { RoutePaths } from '../../routes';
import { t } from 'i18next';
import { Resolution } from '../../theme';
import userEvent from '@testing-library/user-event';
import { expectCommonButtonsExists } from '../gallery/GalleryPage.test';

beforeEach(() => {
  window.history.pushState({}, '', '/');
  jest.clearAllMocks();
});

jest.mock('use-breakpoint', () => {
  return jest.fn(() => ({
    useBreakpoint: {
      breakpoint: Resolution.desktop
    }
  }))
})

function renderFavoritesPage() {
  const path = `/${RoutePaths.favorites}`;

  render(<MemoryRouter initialEntries={[path]}>
    <AppRoutes />
  </MemoryRouter>, { wrapper: Wrapper });
}

test("should display favorites page", async () => {
  renderFavoritesPage();

  await expectIsFavoritesPage();

  //debug();
})

test("should redirect to home", async () => {

  renderFavoritesPage();

  const hamburgerButton = await screen.findByRole('button', { name: "hamburger" });
  await userEvent.click(hamburgerButton);

  const homeLink = await screen.findByRole('link', {
    name: /home/i
  })

  await userEvent.click(homeLink);

  // const textbox = await screen.findByRole('textbox');
  // expect(textbox).toBeInTheDocument();
  // expect(textbox).toHaveValue("pics")

  //debug();

})

test("should clear favorites", async () => {

  renderFavoritesPage();

  const clearButton = await getClearButton()
  expect(clearButton).toBeInTheDocument();

  //await userEvent.click(clearButton);
  //debug();
})

export async function expectIsFavoritesPage() {
  const clearButton = await getClearButton();
  expect(clearButton).toBeInTheDocument();
  await expectCommonButtonsExists();
}

async function getClearButton() {
  return await screen.findByRole('button', { name: t("translations:favorites.clear") });
}

