import React, { useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHeart, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { UiSelectors } from "../../state/ui/uiSelectors";
import { AppState, useAppDispatch } from "../../state/state";
import { closeSidebar } from "../../state/ui/uiSlice";

const sidebarWidth = 220;

const StyledNavOverlay = styled.a<{ opened: boolean }>`
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  background-color: #0f0f0f;
  cursor: default;
  transition: opacity 0.2s ease-in-out;        
  display: ${({ opened }) => opened ? "block" : "none"};
  opacity: ${({ opened }) => opened ? "0.8" : "0"};
  pointer-events: ${({ opened }) => opened ? "auto" : "none"}; 
`;

const StyledNav = styled.nav<{ opened: boolean }>`
  position: absolute;
  z-index: 3;
  top: 0;
  height: 100vh;    
  background-color: #4b4a4a;
  box-shadow: 0 0 0 0 #3f3f3f;
  width: ${sidebarWidth}px;
  transform: ${({ opened }) => opened ? "translateX(0px)" : `translateX(-${sidebarWidth}px)`};
  transition: transform 0.5s ease-in-out;

  > ul {
    position: relative;
    list-style-type: none;
    padding-inline-start: 0;
    margin: 0;
  }

  > ul li {
    position: relative;
    z-index: 4;
    opacity: ${({ opened }) => opened ? "1" : "0"};
  }

  > ul li a {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 0 20px 30px;
  }

  > ul li a svg {
    margin: 0 8px 2px 0;
  }

  > ul li:hover {
    z-index: 5;
    background-color: #706f6f;
  }
`;

/**
 * This is a functional component that renders a sidebar navigation with links to the home page and
 * favorites page, and allows the user to close the sidebar.
 * @param  - The `SidebarNav` component is a functional component that takes no props as input. It uses
 * the `useSelector` hook from the `react-redux` library to retrieve the `opened` state from the Redux
 * store using the `PostSelectors.getSidebarNavOpened` selector. It also uses the `
 * @returns The `SidebarNav` component is being returned, which renders a navigation sidebar with links
 * to the home page and favorites page. The `opened` variable is obtained from the Redux store using
 * the `useSelector` hook, and the `handleCloseSidebarNav` function is defined using the `useCallback`
 * hook to dispatch a `closeSidebar` action when the sidebar is closed. The component also renders
 */
const SidebarNav: React.FC = ({ }) => {
  const opened = useSelector((state: AppState) => UiSelectors.getSidebarNavOpened(state));

  const dispatch = useAppDispatch();

  const handleCloseSidebarNav = useCallback(() => {
    dispatch(closeSidebar())
  }, []);

  return (<>
    <StyledNav opened={opened} >
      <ul>
        <li><Link to={`/`} onClick={handleCloseSidebarNav}><FaHome />Home</Link></li>
        <li><Link to={`/favorites`} onClick={handleCloseSidebarNav}><FaHeart /> Favorites</Link></li>
      </ul>
    </StyledNav>
    <StyledNavOverlay opened={opened} onClick={handleCloseSidebarNav} />
  </>);
}

export default SidebarNav;