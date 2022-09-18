import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp} from 'react-navigation';
import Images from '../../Themes/Images';
import styles from './MenuMainButton1Styles';

export namespace MenuMainButton1 {
    export interface Props {
        navigation: NavigationScreenProp<any, any>;

        testID?: string;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State {}
}

export default class MenuMainButton1 extends React.Component<MenuMainButton1.Props, MenuMainButton1.State> {
    constructor(props: MenuMainButton1.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
                //onPress={() => this.props.navigation.navigate('MainScreen')}
                style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>
                <Image source={Images.menuMain1} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        );
    }
}
