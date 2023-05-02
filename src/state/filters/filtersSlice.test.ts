import store from "../store";
import { changeHeights, changeWidths, clearFilters, filtersInitialState, filtersReducer, toggleFiltersOpened } from "./filtersSlice";

describe('redux state tests', () => {
    it('Should initially set initial State', () => {
        const state = store.getState().filters
        expect(state).toBe(filtersInitialState);
    });
})

describe('reducer actions filters', () => {

    describe('change min and max widths', () => {

        const action = changeWidths([10, 20]);
        const newState = filtersReducer(filtersInitialState, action);

        it('is has changed widths ', () => {
            expect(newState.minWidth).toEqual(10);
            expect(newState.maxWidth).toEqual(20);
        });
    });

    describe('change min and max heights', () => {

        const action = changeHeights([10, 20]);
        const newState = filtersReducer(filtersInitialState, action);

        it('is has changed heights ', () => {
            expect(newState.minHeight).toEqual(10);
            expect(newState.maxHeight).toEqual(20);
        });
    });

    describe('toggle opened filters value', () => {
        const openFiltersAction = toggleFiltersOpened(true);
        const openedFiltersState = filtersReducer(filtersInitialState, openFiltersAction);

        it('is has changed opened to true', () => {
            expect(openedFiltersState.opened).toEqual(true);
        });

        const closeFiltersAction = toggleFiltersOpened(false);
        const closedFilterState = filtersReducer(openedFiltersState, closeFiltersAction);
        
        it('is has changed opened again to false', () => {
            expect(closedFilterState.opened).toEqual(false);
        });
    });

    describe('clearFilters action', () => {
        const action = toggleFiltersOpened(); //do any action
        const newState = filtersReducer(filtersInitialState, action);

        const clearAction = clearFilters();
        const clearedState = filtersReducer(newState, clearAction);

        it('is has cleared all values ', () => {
            expect(clearedState).toEqual(filtersInitialState);
        });
    });

})
