import React, { Children } from 'react';
import { describe, test } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act, render, screen, prettyDOM, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { debug } from 'jest-preview';
import AppRoutes, { RoutePaths } from '../../routes';
import { t } from 'i18next';
import { Wrapper } from '../../jest-utils';
import { Resolution } from '../../theme';
import userEvent from '@testing-library/user-event';
import { expectIsFavoritesPage } from '../favorites/FavoritesPage.test';

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

test("should display gallery page", async () => {
  renderGalleryPage();
  await expectIsGalleryPage();
  //expect(input).toHaveValue("pics")
  //debug();
})

test("should redirect to favorites", async () => {
  renderGalleryPage();

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

function renderGalleryPage() {
  const path = `/`;

  render(<MemoryRouter initialEntries={[path]}>
    <AppRoutes />
  </MemoryRouter>, { wrapper: Wrapper });
}
