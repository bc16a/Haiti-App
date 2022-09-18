import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp} from 'react-navigation';
import Images from '../../Themes/Images';
import styles from './MenuBackButtonStyles';

export namespace MenuBackButton {
    export interface Props {
        navigation: NavigationScreenProp<any, any>;

        testID?: string;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State {}
}

export default class MenuBackButton extends React.Component<MenuBackButton.Props, MenuBackButton.State> {
    constructor(props: MenuBackButton.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
                //onPress={() => this.props.navigation.navigate('MainScreen')}
                onPress={() => this.props.navigation.goBack()}
                style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>
                <Image source={Images.arrowBackwards3} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
        );
    }
}
