import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledLabel = styled.label` 
  color: #c5c4c4;
  font-size: 12px;
`;

/**
 This code defines a functional component called `Label` that takes in a prop called `children` and
returns a styled `span` element with the `children` prop as its content.  */
const Label: React.FC<PropsWithChildren> = ({ children }) => {
    return (<StyledLabel>
        {children}
    </StyledLabel>)
};

export default Label;