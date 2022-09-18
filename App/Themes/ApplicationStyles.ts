import { TextStyle, ViewStyle } from 'react-native';
import Colors from './Colors';
import EspartaApplicationStyles from './EspartaApplicationStyles';
import { responsiveWidth } from 'react-native-responsive-dimensions';

// Funcionamento similar ao BOOTSTRAP
const ApplicationStyles = {
    ...EspartaApplicationStyles,

    // Criar uma seção para estilos de view conforme o aplicativo
    defaultScreen: {
        brasRoundedButton: {
            backgroundColor: Colors.colors.kelly_green,
            borderRadius: 3,
            height: 60
        } as ViewStyle
    },
    defaultBackground: {
        backgroundColor: Colors.colors.white_two
    } as ViewStyle,

    sectionBorder: {
        borderBottomWidth: 1,
        borderColor: Colors.colors.warm_grey
    } as ViewStyle,

    smallButton: {
        width: responsiveWidth(30),
        height: 40
    } as ViewStyle,

    // Criar uma seção para estilos de texto conforme o aplicativo
    defaultText: {
        brasText: {
            ...EspartaApplicationStyles.texts.bigInputText,
            color: Colors.colors.white_two
        } as TextStyle,
        smallBrasText: {
            ...EspartaApplicationStyles.texts.regularInputText,
            color: Colors.colors.white_two
        } as TextStyle
    },

    greyText: {
        color: Colors.colors.cool_grey_two
    } as TextStyle,

    greenText: {
        color: Colors.colors.kelly_green
    } as TextStyle,

    gunmetalText: {
        color: Colors.colors.gunmetal
    } as TextStyle,

    whiteText: {
        color: 'white'
    } as TextStyle,

    line: {
        alignSelf: 'center',
        width: '96%',
        height: 0.5,
        backgroundColor: Colors.colors.powder_blue
    } as ViewStyle,
    listSeparator: {
        height: 1,
        width: responsiveWidth(90),
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.colors.powder_blue
    } as ViewStyle
};
export default ApplicationStyles;
