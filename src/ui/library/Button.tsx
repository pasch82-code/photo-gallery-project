import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledButton = styled.button` 
  background: #929191;
  color: #c5c4c4;
  border: none;
  padding: 8px 8px;
  border-radius: 4px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 11px;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover:not([disabled]) {
    color: #ffffff;
    border: 1px solid #dddddd;
    background-color: #d4d3d3;    
    margin: -1px;
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
  }  

  &:disabled {
    color: #777777;
  }  
`;

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean
}

/**
 * This is a React functional component that renders a button with a label as a children,
 * optional disabled state and onClick event handler.
 */
const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, disabled, onClick }) => {
  return (<StyledButton disabled={disabled} onClick={onClick}>
    {children}
  </StyledButton>)
};

export default Button;