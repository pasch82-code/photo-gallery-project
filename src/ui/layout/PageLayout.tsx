import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Header from "./Header";
import SidebarNav from "./SidebarNav";

const headerHeight = 60;
const padding = 8;

const StyledContainer = styled.div`
  padding-top: ${headerHeight}px;
  z-index: 1;
  width: 100%;

  > div {
      width: calc(100% - ${padding}px);
      padding-left: ${padding / 2}px;
  }
`

interface PageLayoutProps {
  headerContent?: React.ReactNode;
}

/**
 * This is a TypeScript React functional component that renders a page layout with a header, sidebar
 * navigation, and container for children components.
 * @param  - The `PageLayout` component is a functional component that takes in two props:
 * @returns A React functional component called `PageLayout` is being returned. It takes in two props:
 * `children` and `headerContent`, both of which are of type `PropsWithChildren<PageLayoutProps>`. The
 * component returns a JSX expression that renders a `Header` component with the `headerContent` prop
 * passed as its child, a `SidebarNav` component, and a `StyledContainer
 */
const PageLayout: React.FC<PropsWithChildren<PageLayoutProps>> = ({ children, headerContent }) => {
  return (<>
    <Header>
      {headerContent}
    </Header>
    <SidebarNav />
    <StyledContainer>
      {children}
    </StyledContainer>
  </>);
}

export default PageLayout;