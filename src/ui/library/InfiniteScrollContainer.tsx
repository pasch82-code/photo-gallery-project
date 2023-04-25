import React, { PropsWithChildren, useRef, useCallback, useEffect } from "react"
import CustomScroll from 'react-custom-scroll';
import styled from "styled-components";
import debounce from 'lodash/debounce';
import useBreakpoint from 'use-breakpoint';
import { BREAKPOINTS, ROW_HEIGHTS } from '../../theme';

const StyledInfiniteScrollContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: "hidden"; 
  width: 100%;
  height: 100%;
`;

interface InfiniteScrollContainerProps {
  isLoading: boolean;
  hasRecords: boolean;
  count: number;
  onScrollReached: () => void;
}

/** This is a functional component that renders a infinite scroll component on the top of its child.
 *  The `CustomScroll` component has an `onScroll` event listener that triggers the `handleOnScroll` 
 *  function when the user scrolls. The `handleOnScroll` function checks if the user has scrolled
 *  to the bottom of the container and if so, it calls the
 * `invokeLoadMore` function. The `invokeLoadMore` function debounces the `onScrollReached` function
 * call to prevent multiple calls. The component also has an `useEffect` hook that checks if
 * the content height is less than the container height and if so, it automatically calls the`invokeLoadMore` function.
 *  */
const InfiniteScrollContainer: React.FC<PropsWithChildren<InfiniteScrollContainerProps>> = ({ isLoading, hasRecords, children, onScrollReached }) => {

  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const rowHeight = ROW_HEIGHTS[breakpoint];
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<any>(null);

  const invokeLoadMore = useCallback(debounce(() => {
    onScrollReached();
  }, 750, { leading: true }), []);

  const handleOnScroll = useCallback((e: any) => {
    const parentHeight = containerRef.current.offsetHeight;
    const scrollNode = e.target as HTMLElement;
    const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight);
    const offset = Math.round(rowHeight * (scrollNode.scrollHeight / parentHeight))
    const scrollPosition = Math.round(scrollNode.scrollHeight - offset);

    if (scrollPosition <= scrollContainerBottomPosition) {
      if (isLoading == false && hasRecords)
        invokeLoadMore();
    }
  }, [isLoading, hasRecords]);

  useEffect(() => {
    const parentHeight = containerRef.current.offsetHeight;
    const contentHeight = (scrollbarRef as any).current.contentHeight;

    if (isLoading == false && hasRecords && contentHeight < (parentHeight + rowHeight)) {
      //console.log("automatically trying to load more! - even if not scrolling.");
      invokeLoadMore();
    }
  }, [isLoading, hasRecords]);

  return (<StyledInfiniteScrollContainer ref={containerRef}>
    <CustomScroll flex="1" onScroll={handleOnScroll} ref={scrollbarRef} >
        {children}
    </CustomScroll>
  </StyledInfiniteScrollContainer>);
};

export default InfiniteScrollContainer;