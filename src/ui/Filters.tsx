import React, { useCallback } from "react";
import { AppState, defaultFilters, useAppDispatch } from "../state";
import { changeHeight, changeWidth, clearFilters } from "../slice";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { PostSelectors } from "../selectors";
import RangeInput from "./library/RangeInput";
import Button from "./library/Button";
import Label from "./library/Label";

const StyledFilters = styled.div`
    display: block;
    width: 100%;
    > div {
        margin: 4px 8px;
        display: flex;
        align-items: center;
        > span {
            width: 64px;
        }
        > div {
            flex-grow: 1;
        }
        &.button {
            justify-content: end;
        }
    }
`;

/**
 * This is a functional component called `Filters` that renders a set of filter controls for width and
 * height, as well as a button to clear the filters. It uses `useSelector` to retrieve the current
 * filter values from the Redux store, and `useAppDispatch` to dispatch actions to update the filter
 * values. The `handleChangeWidth`, `handleChangHeight`, and `handleClearBtnClicked` functions are all
 * defined using `useCallback` to ensure that they are only recreated when their dependencies change.
 * The component returns a JSX element that renders the filter controls and button using styled components.
 */
function Filters() {
    const minWidth = useSelector((state: AppState) => PostSelectors.getMinWidth(state)) ?? defaultFilters.minWidth;
    const minHeight = useSelector((state: AppState) => PostSelectors.getMinHeight(state)) ?? defaultFilters.minHeight;
    const maxWidth = useSelector((state: AppState) => PostSelectors.getMaxWidth(state)) ?? defaultFilters.maxWidth;
    const maxHeight = useSelector((state: AppState) => PostSelectors.getMaxHeight(state)) ?? defaultFilters.maxHeight;

    const isFilterButtonDisabled = !useSelector((state: AppState) => PostSelectors.isFiltered(state));

    const dispatch = useAppDispatch();

    const handleChangeWidth = useCallback((values: number[]) => {
        dispatch(changeWidth(values));
    }, [])

    const handleChangHeight = useCallback((values: number[]) => {
        dispatch(changeHeight(values));
    }, [])

    const handleClearBtnClicked = useCallback(() => {
        dispatch(clearFilters());
    }, [])

    return (<StyledFilters>
        <div >
            <Label>width</Label>
            <RangeInput min={0} max={defaultFilters.maxWidth} values={[minWidth, maxWidth]} onChange={handleChangeWidth} rtl={false} />
        </div>
        <div >
            <Label>height</Label>
            <RangeInput min={0} max={defaultFilters.maxHeight} values={[minHeight, maxHeight]} onChange={handleChangHeight} rtl={false} />
        </div>
        <div className="button">
            <Button disabled={isFilterButtonDisabled} onClick={handleClearBtnClicked}>clear filters</Button>
        </div>
    </StyledFilters>);
}

export default Filters;