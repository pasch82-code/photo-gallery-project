import React from 'react';
import { test } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import AppRoutes from '../../routes';
import { t } from 'i18next';
import { Resolution } from '../../theme';
import userEvent from '@testing-library/user-event';
import { expectIsFavoritesPage } from '../favorites/FavoritesPage.test';

import { renderWithProviders } from '../../jest-utils';
import { debug } from 'jest-preview';

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

test("router should display gallery page", async () => {
  renderRouterGalleryPage();
  await expectIsGalleryPage();
  //expect(input).toHaveValue("pics")
  //debug();
})

test("sidebar link should redirect to favorites", async () => {
  renderRouterGalleryPage();

  const hamburgerButton = await getHamburgerButton();
  await userEvent.click(hamburgerButton);

  const favLink = await screen.findByRole('link', {
    name: /favorites/i
  })

  await userEvent.click(favLink);

  await expectIsFavoritesPage();
  
  //debug();
})

export async function expectIsGalleryPage() {
  const input = await screen.findByRole('textbox', { name: t("translations:gallery.channel") });
  expect(input).toBeInTheDocument();

  await expectCommonButtonsExists();
}

export async function expectCommonButtonsExists() {
  const hamburgerButton = await getHamburgerButton();
  expect(hamburgerButton).toBeInTheDocument();

  const filterButton = await getFilterButton();
  expect(filterButton).toBeInTheDocument();
}

async function getFilterButton() {
  return await screen.findByRole('button', { name: "filter" });
}

async function getHamburgerButton() {
  return await screen.findByRole('button', { name: "hamburger" });
}

function renderRouterGalleryPage() {
  const path = `/`;

  renderWithProviders(<MemoryRouter initialEntries={[path]}>
    <AppRoutes />
  </MemoryRouter>);
}
