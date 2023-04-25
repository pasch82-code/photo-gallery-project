import React, { useState } from "react";
import styled from "styled-components";
import { useInView } from 'react-intersection-observer';
import PixelatedImage from "./PixelatedImage";

const StyledThumbnailImageDiv = styled.div`
  background: gray;
  width: 100%;
  height: 100%;
  position: relative;
  background: gray;
`;

const StyledSourceImage = styled.img`
  animation: fadeIn ease 0.1s;
  object-fit: cover;
  z-index:2; 
  position: absolute;  
`;

interface ThumbnailImageProps {
  url: string,
  thumbSrc: string,
  rowHeight: number,
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void
}

/**
 * This code defines a React functional component called `ThumbnailImage`.
 * It has a state variable called `isImageLoaded` to track the loading of the source image 
 * and it uses react-intersection-observer `inView` to track the visibility of the component in the screen.
 * It will show `PixelatedImage` component until `isImageLoaded` is set to false.
 * The source image began to load only when the component is visible is in the screen.
 */
const ThumbnailImage: React.FC<ThumbnailImageProps> = ({ url, thumbSrc, rowHeight, onClick }) => {

  const [isImageLoaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, delay: 0 });

  const imageLoaded = () => {
      setLoaded(true);
  }

  return (<StyledThumbnailImageDiv ref={ref}  >
    {isImageLoaded == false ? <PixelatedImage src={thumbSrc} height={rowHeight} /> : null}
    {inView == true? <StyledSourceImage
        onLoad={imageLoaded}
        onClick={onClick}
        height={rowHeight}
        src={url}
        width={"100%"}
      /> : null}
  </StyledThumbnailImageDiv>
  )
};

export default ThumbnailImage;