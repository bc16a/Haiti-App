import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp} from 'react-navigation';
import Images from '../../Themes/Images';
import styles from './MenuHelpButton1Styles';

export namespace MenuHelpButton1 {
    export interface Props {
        navigation: NavigationScreenProp<any, any>;

        testID?: string;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State {}
}

export default class MenuHelpButton1 extends React.Component<MenuHelpButton1.Props, MenuHelpButton1.State> {
    constructor(props: MenuHelpButton1.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
               // onPress={() => this.props.navigation.navigate("HelpScreen")}
                style={[styles.centeredColumn, styles.centeredRow, styles.paddingLeft, styles.smallPaddingRight]}>
                <Image source={Images.menuHelp1} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        );
    }
}
