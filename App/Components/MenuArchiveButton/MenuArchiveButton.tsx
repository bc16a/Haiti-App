import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp} from 'react-navigation';
import Images from '../../Themes/Images';
import styles from './MenuArchiveButtonStyles';

export namespace MenuArchiveButton {
    export interface Props {
        navigation: NavigationScreenProp<any, any>;

        testID?: string;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State {}
}

export default class MenuArchiveButton extends React.Component<MenuArchiveButton.Props, MenuArchiveButton.State> {
    constructor(props: MenuArchiveButton.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
                onPress={() => this.props.navigation.navigate("Tutorial")}
                style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.paddingRight]}>
                <Image source={Images.menuArchive} style={{ width: 28, height: 24 }} />
            </TouchableOpacity>
        );
    }
}
