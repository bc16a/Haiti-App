import { Platform } from 'react-native';

const fontFamilies = {
    roboto: Platform.OS === 'ios' ? 'Roboto-Regular' : 'Roboto-Regular',
    robotoThin: Platform.OS === 'ios' ? 'Roboto-Regular' : 'Roboto-Regular',
    robotoBold: Platform.OS === 'ios' ? 'Roboto-Bold' : 'Roboto-Bold',
    robotoMedium: Platform.OS === 'ios' ? 'Roboto-Medium' : 'Roboto-Medium',
    museo700: Platform.OS === 'ios' ? 'Museo-700' : 'Museo-700'
};

const defaultFont = fontFamilies.roboto;
const defaultBoldFont = fontFamilies.robotoBold;
const defaultThinFont = fontFamilies.robotoThin;
const defaultMediumFont = fontFamilies.robotoMedium

export default {
    fontFamilies,
    defaultFont,
    defaultBoldFont,
    defaultThinFont,
    defaultMediumFont
};
