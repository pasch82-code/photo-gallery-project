import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledPixelatedSvg = styled.svg`
    width: 100%;
    z-index: 1;
    position: absolute;
`;

interface PixelatedImageProps {
  src: string,
  height: number
}

/**
 * This is a React functional component that renders a pixelated image with a changing pixel size.
 * @param - `src` (the source URL of the image to be pixelated) and `height` (the height of the SVG container).
 */
const PixelatedImage: React.FC<PixelatedImageProps> = ({ src, height }) => {

  const pixelMaxWidth = 12;
  const pixelMinWidth = 4;

  const [size, setSize] = useState<number>(pixelMaxWidth);
  const timer = useRef<NodeJS.Timer>(null);
  const countdown = useRef<boolean>(true);

  const clearTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
  }

  useEffect(() => {
    const intervalMs: number = 100;
    timer.current = setInterval(() => {
      setSize(size => {
        if (countdown.current && size < pixelMinWidth)
          countdown.current = false;
        if (!countdown.current && size > pixelMaxWidth)
          countdown.current = true;
        if (countdown.current)
          return size - 1;
        else
          return size + 1;
      });
    }, intervalMs);

    return () => {
      clearTimer();
    }
  }, []);

  return (<StyledPixelatedSvg style={{ height: height + "px" }} >
    <filter id="pixelate" x="0" y="0" >
      <feFlood x={4} y={4} height={1} width={1} />
      <feComposite width={size * 2} height={size * 2} />
      <feTile result="a" />
      <feComposite in="SourceGraphic" in2="a" operator="in" />
      <feMorphology operator="dilate" radius={size} />
    </filter>
    <image
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      filter={"url(#pixelate)"}
      href={src}
    />
  </StyledPixelatedSvg>)
};

export default PixelatedImage;