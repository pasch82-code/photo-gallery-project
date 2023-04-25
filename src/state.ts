import { Action, AnyAction, CombinedState, EntityState, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { adapters } from "./adapters";
import { RedditReducedPostData } from "./types/entity";

export interface PhotoGalleryFiltersState {
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    opened?: boolean
}

export interface PhotoGalleryEntities {
    posts: EntityState<RedditReducedPostData>;
    favorites: EntityState<RedditReducedPostData>;
}

export interface PhotoGalleryUi {
    filters: PhotoGalleryFiltersState;
    sidebarOpened: boolean;

    galleryPage: {
        isLoading?: boolean;
        hasMoreRecords?: boolean;
        editingSearchText?: string;
        lastSearchText?: string;
    }

    favoritesPage: {
        isLoading?: boolean;
        hasMoreRecords?: boolean;
        ids: string[];
    }
}

interface BaseAppState<TEntities, TUi> {
    entities: TEntities;
    ui?: TUi
}

export const defaultFilters: PhotoGalleryFiltersState = {
    maxHeight: 10000,
    maxWidth: 10000,
    minWidth: 0,
    minHeight: 0,
    opened: false
}

/* `initialState` is a constant that defines the initial state of the Redux store for the photo gallery
app. It is of type `AppState`, which is an interface that defines the shape of the state object. */
export const initialState: AppState = {
    entities: {
        posts: adapters.getInitialState(),
        favorites: adapters.getInitialState()
    },
    ui: {
        filters: defaultFilters,
        sidebarOpened: false,
        favoritesPage: {
            ids: []
        },
        galleryPage: {
            editingSearchText: "pics"
        }
    }
}

export type AppState = BaseAppState<PhotoGalleryEntities, PhotoGalleryUi>;
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<CombinedState<AppState>, null, AnyAction> & ThunkDispatch<CombinedState<AppState>, undefined, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, CombinedState<AppState>, unknown, Action<string>>;