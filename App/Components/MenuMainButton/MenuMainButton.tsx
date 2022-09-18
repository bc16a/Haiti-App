import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp} from 'react-navigation';
import Images from '../../Themes/Images';
import styles from './MenuMainButtonStyles';

export namespace MenuMainButton {
    export interface Props {
        navigation: NavigationScreenProp<any, any>;

        testID?: string;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State {}
}

export default class MenuMainButton extends React.Component<MenuMainButton.Props, MenuMainButton.State> {
    constructor(props: MenuMainButton.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
                onPress={() => this.props.navigation.navigate('MainScreen')}
                style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>
                <Image source={Images.menuMain} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        );
    }
}
