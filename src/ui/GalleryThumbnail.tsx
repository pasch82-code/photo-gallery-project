import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import unescape from "lodash/unescape";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS, ROW_HEIGHTS } from "../theme";
import ThumbnailImage from "./ThumbnailImage";
import styled from "styled-components";
import GalleryThumbnailOverlay from "./GalleryThumbnailOverlay";

const StyledGalleryThumbnail = styled.div<{ rowHeight: number; imageHeight: number; imageWidth: number;}>`
  margin: 2px;
  position: relative;
  z-index: 3;
  flex-grow: ${({ imageWidth, rowHeight, imageHeight }) => imageWidth * rowHeight / imageHeight};
  height: ${({ rowHeight }) => rowHeight + "px"};
  width: ${({ imageWidth, rowHeight, imageHeight }) => (imageWidth * rowHeight / imageHeight) + "px"}; 
  flex-grow: 1;
  border: rgb(133, 133, 133) solid 1px;
  background-color: #b9b9b9;
`;

const StyledThumbnailImageContainer = styled.div`
  position: absolute;
  z-index: 8;
  width: 100%;
  height: 100%;
`;

export interface GalleryThumbnailProps {
  thumbnailUrl: string,
  postId: string,
  title: string,
  sourceHeight: number,
  sourceWidth: number,
  sourceUrl: string;
  permalink: string;
  url: string
  width: number
  height: number
}

/**
 * This is a functional component that renders a gallery thumbnail `ThumbnailImage` 
 * with an overlay `GalleryThumbnailOverlay` that appears on hover.
 * @param props - An object containing the properties passed down to the GalleryThumbnail component.
 * @returns A React functional component called GalleryThumbnail.
 */
const GalleryThumbnail: React.FC<PropsWithChildren<GalleryThumbnailProps>> = (props) => {

  const { postId, height, width, url, thumbnailUrl } = props;
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const rowHeight = ROW_HEIGHTS[breakpoint];
  const [isHover, setHover] = useState(false);

  useEffect(() => {
    return () => {
      setHover(false);
    }
  }, [postId]);

  const handleMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setHover(true);
  }, [postId]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setHover(false);
  }, [postId]);

  return (<StyledGalleryThumbnail
    imageHeight={height}
    rowHeight={rowHeight}
    imageWidth={width}
    onMouseOver={handleMouseOver}
    onMouseLeave={handleMouseLeave} >

    {isHover && <GalleryThumbnailOverlay {...props} />}

    <StyledThumbnailImageContainer>
      <ThumbnailImage
        rowHeight={rowHeight}
        thumbSrc={unescape(thumbnailUrl)}
        url={unescape(url)} />
    </StyledThumbnailImageContainer>

  </StyledGalleryThumbnail>);
}

export default GalleryThumbnail;