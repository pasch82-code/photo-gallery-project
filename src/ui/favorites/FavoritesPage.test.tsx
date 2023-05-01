import React from 'react';
import { test } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../jest-utils';
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

function renderRouterFavoritesPage() {
  const path = `/${RoutePaths.favorites}`;

  renderWithProviders(<MemoryRouter initialEntries={[path]}>
    <AppRoutes />
  </MemoryRouter>);
}

test("router should display favorites page", async () => {
  renderRouterFavoritesPage();

  await expectIsFavoritesPage();

  //debug();
})

test("sidebar link should redirect to home", async () => {

  renderRouterFavoritesPage();

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

  renderRouterFavoritesPage();

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

