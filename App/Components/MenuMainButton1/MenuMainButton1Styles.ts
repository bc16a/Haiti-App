import { ApplicationStyles } from '../../Themes';

export default {
    ...ApplicationStyles,
    ...ApplicationStyles.screen,

    buttonContainer: {
        height: '100%',
        padding: 25,
        justifyContent: 'center'
    },
    closeButtonStyle: {
        width: 24,
        height: 24
    },
    backButtonStyle: {
        width: 24,
        height: 24
    }
};
