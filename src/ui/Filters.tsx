import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import RangeInput from "./library/RangeInput";
import Button from "./library/Button";
import Label from "./library/Label";
import { useTranslation } from "react-i18next";
import { FiltersSelectors } from "../state/filters/filtersSelectors";
import { AppState, useAppDispatch } from "../state/state";
import { changeHeight, changeWidth, clearFilters, filtersInitialState } from "../state/filters/filtersSlice";

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

function Filters() {
    const minWidth = useSelector((state: AppState) => FiltersSelectors.getMinWidth(state)) ?? filtersInitialState.minWidth;
    const minHeight = useSelector((state: AppState) => FiltersSelectors.getMinHeight(state)) ?? filtersInitialState.minHeight;
    const maxWidth = useSelector((state: AppState) => FiltersSelectors.getMaxWidth(state)) ?? filtersInitialState.maxWidth;
    const maxHeight = useSelector((state: AppState) => FiltersSelectors.getMaxHeight(state)) ?? filtersInitialState.maxHeight;
    
    const { t } = useTranslation("translations");
  
    const isFilterButtonDisabled = !useSelector((state: AppState) => FiltersSelectors.isFiltered(state));

    const dispatch = useAppDispatch();

    const handleChangeWidth = useCallback((values: number[]) => {
        dispatch(changeWidth(values));
    }, [])

    const handleChangHeight = useCallback((values: number[]) => {
        dispatch(changeHeight(values));
    }, [])

    const handleClearButtonClicked = useCallback(() => {
        dispatch(clearFilters());
    }, [])

    return (<StyledFilters>
        <div >
            <Label>width</Label>
            <RangeInput min={0} max={filtersInitialState.maxWidth} values={[minWidth, maxWidth]} onChange={handleChangeWidth} rtl={false} />
        </div>
        <div >
            <Label>height</Label>
            <RangeInput min={0} max={filtersInitialState.maxHeight} values={[minHeight, maxHeight]} onChange={handleChangHeight} rtl={false} />
        </div>
        <div className="button">
            <Button disabled={isFilterButtonDisabled} onClick={handleClearButtonClicked}>{t("clear filters")}</Button>
        </div>
    </StyledFilters>);
}

export default Filters;