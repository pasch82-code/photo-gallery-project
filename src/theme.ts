import { DefaultTheme } from 'styled-components'

export enum Resolution {
    mobile = 'mobile',
    tablet = 'tablet',
    desktop = 'desktop'
}

/* Exporting a constant object named `BREAKPOINTS` that contains the values of the breakpoints for
different resolutions. The keys of the object are the values of the `Resolution` enum, and the
values are the pixel values for the breakpoints. The breakpoint for the `mobile`
resolution is set to 0 pixels, the breakpoint for the `tablet` resolution is set to 768 pixels, and
the breakpoint for the `desktop` resolution is set to 1280 pixels. */
export const BREAKPOINTS = {
    [Resolution.mobile]: 0,
    [Resolution.tablet]: 768,
    [Resolution.desktop]: 1280
};

const size = {
    [Resolution.mobile]: `${BREAKPOINTS[Resolution.mobile]}px`,
    [Resolution.tablet]: `${BREAKPOINTS[Resolution.tablet]}px`,
    [Resolution.desktop]: `${BREAKPOINTS[Resolution.desktop]}px`,
}

/* `export const device` is an object that contains media queries for different resolutions. The keys
of the object are the values of the `Resolution` enum, and the values are media queries that check
if the screen width is greater than or equal to the breakpoint for that resolution. The values of
the media queries are generated using the `size` object, which contains the pixel values for the
breakpoints. This object can be used in styled components to apply different styles based on the
screen resolution. */
export const device = {
    [Resolution.mobile]: `(min-width: ${size.mobile})`,
    [Resolution.tablet]: `(min-width: ${size.tablet})`,
    [Resolution.desktop]: `(min-width: ${size.desktop})`
};

export const ROW_HEIGHTS = {
    [Resolution.mobile]: 180,
    [Resolution.tablet]: 220,
    [Resolution.desktop]: 320
};

const theme: DefaultTheme = {
    // gray1: "rgb(175 175 175)"
};

export default theme;