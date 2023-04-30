import store from "../store";
import { uiInitialState } from "./uiSlice";

describe('redux state tests', () => {
    it('Should initially set initial State', () => {
        const state = store.getState().ui
        expect(state).toBe(uiInitialState);
    });
})
