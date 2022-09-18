import { Color } from 'csstype';

export interface GradientPallete {
    beginColor: Color;
    endColor: Color;
    colors?: Color[] | null;
}

const colors = {
    background: '#1F0808',
    clear: 'rgba(0,0,0,0)',
    title: '#6d6d6d',
    coolGrey: '#A3AEB3',
    waterMelon: '#fa3e55',
    greyish_brown_87: 'rgba(66, 66, 66, 0.87)',
    warm_grey: '#9b9b9b',
    cool_grey: '#9a9a9b',
    black_two: '#1a1919',
    black: 'black',
    white: 'white',
    switch_grey: '#42221f1f',
    thumbSwitch_grey: '#f1f1f1',
    white_two: '#fcfcfc',
    greyish_brown: '#4a4a4a',
    white_three: '#e3e3e3',
    greyish: '#b0b0b0',
    brownish_grey: '#606060',
    brownish_grey_two: '#707070',
    dark_blue_grey: '#1a3c47',
    very_light_blue: '#e2e9ed',
    
    // gradient example
    turquoise_green: '#00e57e',
    cerulean: '#0088c8',
    turquoise_blue: '#01aaae',
    tangerine: '#fa9a18',
    sun_yellow: '#ffd134',
    pumpkin_orange: '#f87b06',
    darkish_purple: '#441b7a',
    purple: '#5F0172',

    // App colors
    gunmetal: '#3e5055',
    kelly_green: '#00a335',
    cool_grey_two: '#8b979f',
    powder_blue: '#d1dae0',
    soft_green: '#7cc478',
    ice_blue: '#ebeeee',
    cherry_red: '#fc101f',
    beige: '#FFFFF0'
};

const gradients = {
    turquoiseGradient: {
        beginColor: colors.turquoise_green,
        endColor: colors.cerulean
    } as GradientPallete,
    vipMajorGradient: {
        colors: [
            colors.turquoise_green,
            colors.cerulean,
            colors.tangerine,
            colors.sun_yellow,
            colors.pumpkin_orange,
            colors.darkish_purple,
            colors.purple
        ]
    } as GradientPallete
};

export default {
    colors,
    gradients
};
