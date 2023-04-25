import React from 'react';
import { Direction, Range, getTrackBackground } from 'react-range';
import styled from 'styled-components';

interface RangeInputProps {
    min: number,
    max: number,
    rtl: boolean,
    values: number[],
    onChange: (values: number[]) => void
}

const RangeInputContainer = styled.div`      
    display: block;
    padding: 8px 16px;	
`;

/**
 * This is a functional component called `RangeInput` that takes in props of type `RangeInputProps`. It
 * returns a `RangeInputContainer` component that contains a `Range` component from the `react-range`
 * library. The `Range` component renders a draggable track and thumbs that can be used to select a
 * range of values between the `min` and `max` values specified in the props. The `onChange` function
 * is called whenever the selected values are changed. The `rtl` prop is used to determine the
 * direction of the range selection. The `renderTrack` and `renderThumb` props are used to customize
 * the appearance of the track and thumbs respectively
 */
const RangeInput: React.FC<RangeInputProps> = ({
    min, max, rtl, values, onChange
}) => {
    return (
        <RangeInputContainer>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: 0,
                    margin:0
                }}
            >
                <Range
                    draggableTrack
                    allowOverlap={false}
                    values={values}
                    direction={Direction.Right}
                    step={1}
                    min={min}
                    max={max}
                    rtl={rtl}
                    onChange={onChange}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: '36px',
                                display: 'flex',
                                width: '100%',
                                padding: 0,
                                margin:0
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: '4px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                        values,
                                        colors: ['#202020', '#ccc', '#202020'],
                                        min,
                                        max,
                                        rtl
                                    }),
                                    alignSelf: 'center',
                                    padding: 0,
                                    margin:0
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ index, props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '16px',
                                width: '16px',
                                borderRadius: '8px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 2px 6px #AAA',
                                padding: 0,
                                margin:0
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-16px',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '11px',
                                    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                    padding: '1px',
                                    borderRadius: '4px',
                                    backgroundColor: '#5a5959',
                                    margin:0
                                }}
                            >
                                {(values[index])?.toFixed(0)}
                            </div>
                            <div
                                style={{
                                    height: '8px',
                                    width: '3px',
                                    backgroundColor: isDragged ? '#2b2b2b' : '#CCC',
                                    padding: 0,
                                    margin:0
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        </RangeInputContainer>
    );
};

export default RangeInput;