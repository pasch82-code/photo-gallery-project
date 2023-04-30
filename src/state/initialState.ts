import { favoritesInitialState } from "./favorites/favoritesSlice"
import { filtersInitialState } from "./filters/filtersSlice"
import { postsInitialState } from "./posts/postsSlice"
import { AppState } from "./state"
import { uiInitialState } from "./ui/uiSlice"

export const initialState: AppState = {
    filters: filtersInitialState,
    ui: uiInitialState,
    favoritesPage: favoritesInitialState,
    galleryPage: postsInitialState
}