import React, { PropsWithChildren } from "react"
import styled from "styled-components";
import InfiniteScrollContainer from "./library/InfiniteScrollContainer";
import Spinner from "./library/Spinner";
import Thumbnail, { ThumbnailProps } from "./Thumbnail";

const StyledImageContainer = styled.div<{ hasRecords: boolean }>`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  max-height: 100%;
  overflow: "hidden"; 

  &::after {
    content: '';
    flex-grow: 999999999;
    margin: 2px; 
    border: ${({ hasRecords }) => hasRecords ? "1px solid black" : ""}; 
    background:${({ hasRecords }) => hasRecords ? "gray" : ""}; 
    animation: ${({ hasRecords }) => hasRecords ? "blink 0.8s infinite" : ""}; 
  }  
`;

interface ImagesContainerProps {
  hasRecords: boolean;
  isLoading: boolean;
  handleLoadMore: () => void;
  images: ThumbnailProps[]
}

/** The `ImagesContainer` renders a `InfiniteScrollContainer` component with an infinite scroll feature.
 It render `StyledImageContainer`component inside it, which maps over the `images` prop and
renders a `GalleryThumbnail` component for each image. If `isLoading` is true, a `Spinner` component
is also rendered. */
const ImagesContainer: React.FC<PropsWithChildren<ImagesContainerProps>> = ({ isLoading, hasRecords, handleLoadMore, images }) => {
   return (<><InfiniteScrollContainer
        onScrollReached={handleLoadMore}
        isLoading={isLoading}
        hasRecords={hasRecords} >
        <StyledImageContainer hasRecords={hasRecords} >
          {images?.map(image => <Thumbnail key={image.postId} {...image} />)}
        </StyledImageContainer>
      </InfiniteScrollContainer>
      {isLoading && <Spinner />}
      </>);
};

export default ImagesContainer;