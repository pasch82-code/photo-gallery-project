import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { rootReducer } from './state/store';
import { AxiosResponse } from 'axios';
import { Mappers } from './mappers';
import { RedditPostRoot } from './api/redditPost';
import { redditPostsMockPage1, redditPostsMockPage2 } from './api/redditPostsMocks';
import { first } from 'lodash';
import { produce } from 'immer';
import { adapters } from './state/adapters';
import { initialState } from './state/initialState';
import { postsInitialState } from './state/posts/postsSlice';
import { favoritesInitialState } from './state/favorites/favoritesSlice';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { AppState } from './state/state';
import { RenderOptions, render } from '@testing-library/react';
import "./src/body.css";
import "./src/customScrollbar.css";

/** This code defines a namespace called `JestUtils` which contains various utility functions and
constants used for testing. It includes functions for wrapping API responses, mapping data, and
producing different states for the application. These functions and constants can be imported and
used in test files to simplify and streamline the testing process. */
export namespace JestUtils {

    const wrapResponse = (data: any): AxiosResponse<any> => ({
        data,
        status: 0,
        statusText: "",
        headers: undefined,
        config: undefined
    });

    export const validFirstPageResponse: AxiosResponse<RedditPostRoot> = wrapResponse(redditPostsMockPage1);
    export const validNextPageResponse: AxiosResponse<RedditPostRoot> = wrapResponse(redditPostsMockPage2);

    export const firstPageOfPosts = Mappers.mapToReducedRedditPost(validFirstPageResponse.data.data.children);
    export const nextPageOfPosts = Mappers.mapToReducedRedditPost(validNextPageResponse.data.data.children);

    export const allPosts = firstPageOfPosts.concat(nextPageOfPosts);

    export const nullResponse: AxiosResponse = wrapResponse(null);

    export const postsStateWithFirstPage = produce(postsInitialState, draftState => {
        draftState.posts = adapters.setAll(initialState.galleryPage.posts, firstPageOfPosts);
        draftState.hasError = false;
        draftState.hasMoreRecords = true;
        draftState.lastSearchText = "pics";
        draftState.isFetching = false;
    })

    /** application state with first page of posts and no favorites set */
    export const appStateWithPreloadedFirstPageOfPosts = produce(initialState, draftState => {
        draftState.galleryPage = postsStateWithFirstPage;
    })

    export const favoritesStateWithFirstPageOfFavorites = produce(favoritesInitialState, draftState => {
        draftState.favorites = adapters.setAll(initialState.favoritesPageState.favorites, firstPageOfPosts);
        draftState.hasError = false;
        draftState.hasMoreRecords = true;
        draftState.isFetching = false;
        draftState.favoritesIds = firstPageOfPosts.map(f => f.id)
    })

    export const stateWithPreloadedFavoritesFirstPageOfPosts = produce(initialState, draftState => {
        draftState.favoritesPageState = favoritesStateWithFirstPageOfFavorites;
    })

    export const singleFirstPost = first(firstPageOfPosts);

    export const stateWithPreloadedFavoriteSinglePost = produce(initialState, draftState => {
        draftState.favoritesPageState.favorites = adapters.setOne(initialState.favoritesPageState.favorites, singleFirstPost);
        draftState.favoritesPageState.favoritesIds = [singleFirstPost.id];
    })
}

const configureTestStore = (preloadedState: AppState) => configureStore(
    {
        reducer: rootReducer,
        preloadedState: preloadedState ?? undefined
    })

/**
 *  This type interface extends the default options for render from RTL, as well
    as allows the user to specify other things such as initialState, store.
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<AppState> | undefined;
    useRouter?: boolean
}

/**
 * This function renders a React component with providers and options, including the ability to use a
 * router and preloaded state.
 * @param ui - The React element that needs to be rendered with the providers.
 * @param {ExtendedRenderOptions}  - - `ui`: The React element to be rendered.
 * @returns An object containing the configured test store and the result of rendering the provided
 * React element with the configured providers and options.
 */
export function renderWithProviders(
    ui: React.ReactElement,
    {
        useRouter = false,
        preloadedState = undefined,
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    const store = configureTestStore(preloadedState);

    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {

        let component: JSX.Element = <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                {children}
            </Provider>
        </I18nextProvider>

        if (useRouter)
            component = <BrowserRouter >
                {component}
            </BrowserRouter>
        return component;
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}