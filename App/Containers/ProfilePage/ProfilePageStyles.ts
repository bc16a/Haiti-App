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
    titleBar: {
        height: 50, backgroundColor: '#a5a3a2', width: '100%', alignItems: 'center', justifyContent: 'center'
    } as ViewStyle,
    datasBar: {
        height: 50, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1
    } as ViewStyle,
    body: {
        height: '100%'
    } as ViewStyle,
    textLeft: {
        marginLeft: 15
    } as ViewStyle,
    textRight: {
        marginRight: 15
    } as ViewStyle,
    buttonView: {
        borderColor: 'black', backgroundColor: 'grey', borderRadius: 25, height: 40, width: 250, alignItems: 'center',  marginBottom: 10, justifyContent: 'center'
    } as ViewStyle,

};