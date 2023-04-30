import { useSelector } from "react-redux";
import { PropsWithChildren, useCallback } from "react";
import styled from "styled-components";
import { device } from "../../theme";
import React from "react";
import IconButton from "../library/IconButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscSettings } from "react-icons/vsc";
import Filters from "../Filters";
import { FiltersSelectors } from "../../state/filters/filtersSelectors";
import { AppState, useAppDispatch } from "../../state/state";
import { toggleFiltersOpened } from "../../state/filters/filtersSlice";
import { openSidebar } from "../../state/ui/uiSlice";

const headerHeight = 60;
const filterHeight = 160;

const StyledHeader = styled.header<{ filtersOpened?: boolean }>`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;    
  background-color: #3f3f3f;
  box-shadow: 0 -3px 8px 5px #3f3f3f;
  display: flex; 
  flex-direction: column;
  height: ${headerHeight}px;

  .header-row {
    height: ${headerHeight}px;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
    align-items: center;  
    z-index: 4;  
    background-color: #3f3f3f;

    > div {
        padding: 8px;
    }
  }

  .header-content {        
    height: ${headerHeight}px;
    padding-right: 8px;
    flex-grow: 1; 
    align-items: center;
    justify-content: center; 
    display: flex;

    @media ${device.tablet} {
      justify-content: right;
    }
  } 

  .header-filters {
    z-index: 3;   
    height: ${filterHeight}px;
    transform: ${({ filtersOpened }) => filtersOpened ? "translateY(0px)" : `translateY(-${filterHeight}px)`};
    transition: transform 0.5s ease-in-out;
    box-sizing: border-box;
    background-color: #3f3f3f;
    padding: 8px;

    @media ${device.tablet} {
      position: fixed;
      background-color: #3f3f3f;
      width: 320px;
      right: 0px;
      top: ${headerHeight}px;
  }    
}`;

/**
 * This is a functional component for a header with a hamburger menu button that
 * toggles a sidebar and a filter button that toggles a filter section.
 * The component uses Redux hooks to retrieve and update the state of the
 * filters and sidebar. The header includes the `Filters` component that is conditionally rendered
 * based on the state of the filtersOpened variable.
 */
const Header: React.FC<PropsWithChildren> = ({ children }) => {
    const filtersOpened = useSelector((state: AppState) => FiltersSelectors.getFiltersOpened(state));
    const isFiltered = useSelector((state: AppState) => FiltersSelectors.isFiltered(state));

    const dispatch = useAppDispatch();
  
    const handleHamburgerButtonClick = useCallback(() => {
      dispatch(openSidebar())
    }, []);

    const handleFilterButtonClick = useCallback(() => {
        dispatch(toggleFiltersOpened(!filtersOpened))
    }, [filtersOpened]);

    return (<>
        <StyledHeader filtersOpened={filtersOpened}>
            <div className="header-row" >
                <IconButton name="hamburger" onClick={handleHamburgerButtonClick}>
                    <GiHamburgerMenu />
                </IconButton>
                <div className="header-content">
                    {children}
                </div>
                <IconButton name="filter" onClick={handleFilterButtonClick}>
                    <VscSettings color={isFiltered ? "white" : "#a5a4a4"} />
                </IconButton>
            </div>
            <div className="header-filters">
                <Filters />
            </div>
        </StyledHeader>
    </>);
}

export default Header;