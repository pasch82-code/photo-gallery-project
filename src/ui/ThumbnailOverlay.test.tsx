import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import ThumbnailOverlay, { ThumbnailOverlayProps } from './ThumbnailOverlay';
import { JestUtils, renderWithProviders } from '../jest-utils';

const props: ThumbnailOverlayProps = {
  postId: JestUtils.singleFirstPost.id,
  title: "image title",
  sourceHeight: 2000,
  sourceWidth: 1000,
  permalink: "https://jestjs.io",
  url: "https://picsum.photos/200/300"
}

it("should display a ThumbnailOverlay", async () => {

  renderWithProviders(<ThumbnailOverlay {...props} />, { preloadedState: JestUtils.appStateWithPreloadedFirstPageOfPosts, useRouter: true });

  const addFavoriteicon = await screen.findByRole('button', { name: "favorite" });
  expect(addFavoriteicon).toBeInTheDocument()
  fireEvent.click(addFavoriteicon);

  debug();
});
