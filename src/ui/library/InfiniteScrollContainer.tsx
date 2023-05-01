import React, { PropsWithChildren, useRef, useCallback, useEffect } from "react"
import CustomScroll from 'react-custom-scroll';
import styled from "styled-components";
import debounce from 'lodash/debounce';
import useBreakpoint from 'use-breakpoint';
import { BREAKPOINTS, ROW_HEIGHTS } from '../../theme';
import useResizeObserver from "use-resize-observer";

const StyledInfiniteScrollContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: "hidden"; 
  width: 100%;
  height: 100%;
`;

interface InfiniteScrollContainerProps {
  isFetching: boolean;
  hasRecords: boolean;
  onScrollReached: () => void;
}

/** This is a functional component that renders an infinite scroll component on top of its child. It has
logic to handle infinite scrolling by detecting when the user has scrolled to the bottom of the
container and invoking a `onScrollReached` function. 
The component also has an `useEffect` hook that checks if the content height
is less than the container height and there are more records to fetch. If so, it automatically calls
the `onScrollReached` function. 
The `onScrollReached` function is debounced to prevent multiple calls.*/
const InfiniteScrollContainer: React.FC<PropsWithChildren<InfiniteScrollContainerProps>> = ({ isFetching, hasRecords, children, onScrollReached }) => {

  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const rowHeight = ROW_HEIGHTS[breakpoint];
  const containerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const { ref: contentResizeObserverRef, height: contentObservedHeight } = useResizeObserver<HTMLDivElement>();

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
      if (isFetching == false && hasRecords) {
        //console.log("invokeLoadMore! scrolling.");
        invokeLoadMore();
      }
    }
  }, [isFetching, hasRecords]);

  useEffect(() => {
    const containerHeight = containerRef.current.offsetHeight;
    const scrollbarHeight = (scrollbarRef as any).current.contentHeight;
    const contentHeightIsLessTheContainer = contentObservedHeight < (containerHeight + rowHeight) && scrollbarHeight < (containerHeight + rowHeight);

    if (isFetching == false && hasRecords == true && contentHeightIsLessTheContainer) {
      //console.log("invokeLoadMore! automatically.");
      invokeLoadMore();
    }
  }, [isFetching, contentObservedHeight, hasRecords]);

  return (<StyledInfiniteScrollContainer ref={containerRef}>
    <CustomScroll flex="1" onScroll={handleOnScroll} ref={scrollbarRef} >
      <div style={{ flexGrow: 1 }} ref={contentResizeObserverRef}>
        {children}
      </div>
    </CustomScroll>
  </StyledInfiniteScrollContainer>);
};

export default InfiniteScrollContainer;