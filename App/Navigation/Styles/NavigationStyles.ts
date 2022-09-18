import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, ApplicationStyles, Fonts } from '../../Themes';

export default {
    ...ApplicationStyles.texts,
    ...ApplicationStyles.screen,
    ...ApplicationStyles,
    logoImage: {
        width: 62,
        height: 62
    },
    logoImageRounded: {
        borderRadius: 62 / 2,
        overflow: 'hidden',
        resizeMode: 'cover'
    } as ImageStyle,
    header: {
        height: 55,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: Colors.colors.white_two
    } as ViewStyle,
    appHeader: {
        height: 55,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.colors.powder_blue,
        backgroundColor: '#4169E1',
       // backgroundColor: Colors.colors.white_two,
    } as ViewStyle,
    headerBorder: {
        height: 65,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.colors.white_two,
        borderBottomWidth: 2,
        borderBottomColor: Colors.colors.white_three
    } as ViewStyle,
    title: {
        ...ApplicationStyles.texts.bigBoldText,
        color: 'white',
        fontWeight:'bold',
        //color: Colors.colors.turquoise_blue,
        // alignSelf: 'center',
        flex: 1,
        // justifyContent: 'center',
        textAlign: 'center'
    } as TextStyle,
    titleCenter: {
        ...ApplicationStyles.texts.bigBoldText,
        color: Colors.colors.kelly_green,
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
    } as TextStyle,
    drawer: {
        flex: 1,
        backgroundColor: Colors.colors.kelly_green
    } as ViewStyle,
    drawerContainer: {
        flex: 1
    } as ViewStyle,
    headerContainer: {
        height: 157,
        backgroundColor: 'white',
        paddingRight: 15,
        paddingTop: 30
    } as ViewStyle,
    logoContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.colors.kelly_green
    } as ViewStyle,
    itemStyle: {
        margin: 0
    },
    labelStyle: {
        fontFamily: Fonts.defaultThinFont,
        color: 'white'
    },
    iconContainerStyle: {
        marginBottom: 7,
        opacity: 1
    } as ViewStyle,
    gunmetalText: {
        color: Colors.colors.gunmetal
    } as TextStyle,
    itemIcon: {
        width: 18.2,
        height: 17
    } as ViewStyle,
    logoutContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingLeft: '7.2%',
        backgroundColor: Colors.colors.kelly_green,
        marginBottom: 20
    } as ViewStyle,
    logoutText: {
        color: 'white',
        marginLeft: '11%'
    } as TextStyle
};
