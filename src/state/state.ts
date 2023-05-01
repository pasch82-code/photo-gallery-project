import { Action, AnyAction, CombinedState, EntityState, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { RedditImageData } from "../api/redditPost";

export interface RedditReducedPost {
    id: string,
    title: string,
    permalink: string;
    thumbnailUrl: string;
    resolutions: RedditImageData[];
    source: RedditImageData;
  }

export interface FiltersState {
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    opened?: boolean,
}

export interface PostsState {
    posts: EntityState<RedditReducedPost>,
    isFetching?: boolean;
    hasMoreRecords?: boolean;
    editingSearchText?: string;
    lastSearchText?: string;
    hasError?: boolean
}

export interface FavoritesState {
    favorites: EntityState<RedditReducedPost>,
    isFetching?: boolean;
    hasMoreRecords?: boolean;
    favoritesIds: string[];
    hasError?: boolean
}

export interface UiState {
    sidebarOpened?: boolean;
}

export interface AppState {
    filters: FiltersState,
    ui: UiState,
    favoritesPageState: FavoritesState,
    galleryPage: PostsState
}

export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<CombinedState<AppState>, null, AnyAction> & ThunkDispatch<CombinedState<AppState>, undefined, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, CombinedState<AppState>, unknown, Action<string>>;