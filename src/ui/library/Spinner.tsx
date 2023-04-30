import React from "react";
import styled from "styled-components";

const StyledSpinnerContainer = styled.div`      
    div {	
        z-index: 11;
        width: 0.6rem;
        height: 4rem;
        margin-top: -4rem;
        margin-left: -0.25rem;
        position: absolute;
        left: 50%;
        top: 50%;
        border-top: 2rem solid #fff;
        transform: rotate(calc(var(--i) * 30deg));
        transform-origin: 50% 100%;
        animation: spinner 1.2s calc((var(--i) - 12) * 0.1s) infinite;
    }

    div:nth-child(1) { --i: 0; }
    div:nth-child(2) { --i: 1; }
    div:nth-child(3) { --i: 2; }
    div:nth-child(4) { --i: 3; }
    div:nth-child(5) { --i: 4; }
    div:nth-child(6) { --i: 5; }
    div:nth-child(7) { --i: 6; }
    div:nth-child(8) { --i: 7; }
    div:nth-child(9) { --i: 8; }
    div:nth-child(10) { --i: 9; }
    div:nth-child(11) { --i: 10; }
    div:nth-child(12) { --i: 11; }
`;

/** This code defines a React functional component called `Spinner`. It uses styled-components to create
a container with 12 div elements that are styled to create a spinning animation.
 */
const Spinner: React.FC = () => {

    return (<>
        <StyledSpinnerContainer aria-label="spinner" >
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </StyledSpinnerContainer>
    </>
    );
};

export default Spinner;