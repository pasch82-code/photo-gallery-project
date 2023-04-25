import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import isNil from "lodash/isNil";

const DEBOUNCE_MILLISECONDS = 1500;

interface InputContainerProps {
   hasIcon: boolean,
   width?: number
}

const StyledInputContainer = styled.div<InputContainerProps>`      
   position: relative; 
   height: 100%;

   svg {
      margin-left: 1rem;   
      margin-top: 0.5rem;
      position: absolute
   }

   input {
      height: 32px;
      border: 1px solid #c0c0c0;
      border-radius: 16px;
      box-sizing: border-box;
      padding: 12px;
      background-color: #a09f9f;
      color: #ffffff;      
      padding-left: ${({ hasIcon }) => hasIcon ? "2.5rem": ""}; 
      font-size: 12px;
   }

   input:focus {
      outline: 1px solid white;
   }

   input:hover {
      border: 1px solid #dddddd;
      color: #ffffff;
      background-color: #bdbcbc;
   }

   input::placeholder {
      color: #ebeaea;
    }
`;

interface InputTextProps {
   placeholder: string,
   icon?: React.ReactNode,
   value: any,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
  This is a functional component that renders an input field with a placeholder,
  icon, and onChange event that is debounced.
 */
const InputText: React.FC<InputTextProps> = ({ placeholder, icon, value, onChange }) => {

   const [localValue, setLocalValue] = useState("");

   useEffect(() => {
      if (!isNil(value)) 
         setLocalValue(value);
   }, [value]);

   const debounceChange = useCallback(debounce((evt) => {
      onChange(evt);
   }, DEBOUNCE_MILLISECONDS), [])

   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(evt.target.value);
      debounceChange(evt)
   }

   return (<StyledInputContainer hasIcon={icon != null} >
          {icon}
         <input
            placeholder={placeholder}
            type="text"
            onChange={handleChange}
            value={localValue} 
         />
      </StyledInputContainer>);
};

export default InputText;