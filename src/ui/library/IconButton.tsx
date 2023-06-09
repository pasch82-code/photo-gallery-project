import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const size = 32;

const StyledIconButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  justify-content: center;
  width: ${size}px;               
  height: ${size}px;    

  > svg {
    width: 18px;               
    height: 18px; 
  }

  &:after {
    content: "";
    position: absolute;
    opacity: 0.2;           
    width: ${size}px;               
    height:${size}px;              
    transform: scale(0);
    border-radius: 50%;
    background-image: linear-gradient(to top right, white, gray);
    transition: all 0.2s ease-out;
  }

  &:hover:after {
    transform: scale(1);
  }    
`;

interface IconButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    name: string
}

/** This code defines a functional component called `IconButton` that takes in two props: `children` and
`onClick`. The `children` prop is used to render any child components that are passed to the
`IconButton` component, while the `onClick` prop is a function that will be called when the
`StyledIconButton` element is clicked. The `StyledIconButton` element is a styled `div` that
displays an icon and has a hover effect. The `IconButton` component returns this `StyledIconButton`
element with the `onClick` prop passed to it. */
const IconButton: React.FC<PropsWithChildren<IconButtonProps>> = ({ children, name, onClick }) => {
    return (<StyledIconButton onClick={onClick} role="button" aria-label={name}>
        {children}
    </StyledIconButton>)
};

export default IconButton;