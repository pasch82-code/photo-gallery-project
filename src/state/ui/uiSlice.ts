import { Draft, createSlice } from "@reduxjs/toolkit";
import { UiState } from "../state";

export const uiInitialState: UiState = {}

export const uiSlice = createSlice({
    name: 'uiSlice',
    initialState: uiInitialState,
    reducers: {
        openSidebar: (state: Draft<UiState>) => {
            state.sidebarOpened = true;
        },
        closeSidebar: (state: Draft<UiState>) => {
            state.sidebarOpened = false;
        }
    }
});

export const {
    openSidebar, closeSidebar
} = uiSlice.actions

export const uiReducer = uiSlice.reducer;