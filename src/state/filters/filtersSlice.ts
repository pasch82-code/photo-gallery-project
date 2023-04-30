import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FiltersState } from "../state";

export const filtersInitialState: FiltersState = {
    maxHeight: 10000,
    maxWidth: 10000,
    minWidth: 0,
    minHeight: 0,
    opened: false
}

export const filtersSlice = createSlice({
    name: 'filtersSlice',
    initialState: filtersInitialState,
    reducers: {
        changeWidth: (state: Draft<FiltersState>, action: PayloadAction<number[]>) => {
            state.minWidth = action.payload[0];
            state.maxWidth = action.payload[1];
        },
        changeHeight: (state: Draft<FiltersState>, action: PayloadAction<number[]>) => {
            state.minHeight = action.payload[0];
            state.maxHeight = action.payload[1];
        },
        toggleFiltersOpened: (state: Draft<FiltersState>, action: PayloadAction<boolean>) => {
            state.opened = action.payload;
        },
        clearFilters: (state: Draft<FiltersState>) => {
            return filtersInitialState;
        }
    }
});

export const {
   toggleFiltersOpened, changeWidth, changeHeight, clearFilters,
} = filtersSlice.actions

export const filtersReducer = filtersSlice.reducer;