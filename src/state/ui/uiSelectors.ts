import { AppState } from "../state";

export namespace UiSelectors {

    export const getSidebarNavOpened = (state: AppState) => state.ui.sidebarOpened;
    
}
