import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import unescape from "lodash/unescape";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS, ROW_HEIGHTS } from "../theme";
import ThumbnailImage from "./ThumbnailImage";
import styled from "styled-components";
import ThumbnailOverlay from "./ThumbnailOverlay";

const StyledThumbnail = styled.div`
  margin: 2px;
  position: relative;
  z-index: 3;
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

export interface ThumbnailProps {
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
 * This is a functional component that renders a `ThumbnailImage` 
 * with an overlay `ThumbnailOverlay` that appears on hover.
 * @param props - An object containing the properties passed down to the GalleryThumbnail component.
 * @returns A React functional component called GalleryThumbnail.
 */
const Thumbnail: React.FC<PropsWithChildren<ThumbnailProps>> = (props) => {

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

  const calcWidth = !isNaN(width * rowHeight / height) ? Math.trunc(width * rowHeight / height) : null;

  return (<StyledThumbnail
    style={{
      flexGrow: calcWidth,
      height: rowHeight ? rowHeight + "px" : null,
      width: calcWidth ? calcWidth + "px" : null
    }}
    onMouseOver={handleMouseOver}
    onMouseLeave={handleMouseLeave} >

    {isHover && <ThumbnailOverlay {...props} />}

    <StyledThumbnailImageContainer>
      <ThumbnailImage
        rowHeight={rowHeight}
        thumbSrc={unescape(thumbnailUrl)}
        url={unescape(url)} />
    </StyledThumbnailImageContainer>

  </StyledThumbnail>);
}

export default Thumbnail;