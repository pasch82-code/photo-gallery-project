import store from "../store";
import { filtersInitialState } from "./filtersSlice";

describe('redux state tests', () => {
    it('Should initially set initial State', () => {
        const state = store.getState().filters
        expect(state).toBe(filtersInitialState);
    });
})
