import { ApplicationStyles, Colors } from '../../Themes';
import { ViewStyle, TextStyle } from 'react-native';

export default {
    ...ApplicationStyles.screen,
    ...ApplicationStyles.texts,
    ...ApplicationStyles,

    rightText: {
        fontSize: 16,
        color: Colors.colors.white
    } as TextStyle,
    fill: {
        //flex: 1,
      } as ViewStyle,



};