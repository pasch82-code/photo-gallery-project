import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../state";
import { filtersInitialState } from "./filtersSlice";

export namespace FiltersSelectors {

    export const getMinHeight = (state: AppState) => state.filters.minHeight;
    export const getMinWidth = (state: AppState) => state.filters.minWidth;
    export const getMaxHeight = (state: AppState) => state.filters.maxHeight;
    export const getMaxWidth = (state: AppState) => state.filters.maxWidth;
    
    export const isFiltered = createSelector(
        [getMinWidth, getMinHeight, getMaxWidth, getMaxHeight], (minWidth, minHeight, maxWidth, maxHeight) =>
        minWidth != filtersInitialState.minWidth ||
        minHeight != filtersInitialState.minHeight ||
        maxWidth != filtersInitialState.maxWidth ||
        maxHeight != filtersInitialState.maxHeight);

     export const getFiltersOpened = (state: AppState) => state.filters.opened;

}