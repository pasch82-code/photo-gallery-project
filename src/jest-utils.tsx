import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom'
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import store from './state/store';
import { AxiosResponse } from 'axios';
import { Mappers } from './mappers';
import { RedditPostRoot } from './api/redditPost';
import { redditPostsMockPage1, redditPostsMockPage2 } from './api/redditPostsMocks';
import { first } from 'lodash';
import { produce } from 'immer';
import { adapters } from './state/adapters';
import { initialState } from './state/initialState';
import "./src/body.css";
import "./src/customScrollbar.css";

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

    export const stateWithPreloadedFirstPageOfPosts = produce(initialState, draftState => {
        draftState.galleryPage.posts = adapters.setAll(initialState.galleryPage.posts, firstPageOfPosts);
        draftState.galleryPage.hasError = false;
        draftState.galleryPage.hasMoreRecords = true;
        draftState.galleryPage.lastSearchText = "pics";
        draftState.galleryPage.isFetching = false;
    })

    export const stateWithPreloadedFavoritesFirstPageOfPosts = produce(initialState, draftState => {
        draftState.favoritesPage.favorites = adapters.setAll(initialState.favoritesPage.favorites, firstPageOfPosts);
        draftState.favoritesPage.hasError = false;
        draftState.favoritesPage.hasMoreRecords = true;
        draftState.favoritesPage.isFetching = false;
    })

    export const stateWithPreloadedFavoriteSinglePost = produce(initialState, draftState => {
        draftState.favoritesPage.favorites = adapters.setOne(initialState.favoritesPage.favorites, first(firstPageOfPosts));
    })
}

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
    //const history = createMemoryHistory();
    //history.push('/home');
    return (<I18nextProvider i18n={i18n}>
        <Provider store={store}>
            {children}
        </Provider>
    </I18nextProvider>);
}

export const WrapperWithRouter: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <BrowserRouter >
            <Wrapper>
                {children}
            </Wrapper>
        </BrowserRouter>
    );
}