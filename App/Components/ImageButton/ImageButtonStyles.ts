import { ViewStyle, ImageStyle } from 'react-native';
import { ApplicationStyles, Colors } from '../../Themes';

export default {
    ...ApplicationStyles.screen,
    ...ApplicationStyles.texts,
    ...ApplicationStyles,
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.colors.kelly_green
    } as ViewStyle,
    image: {
        width: 20,
        height: 20
    } as ImageStyle
};
