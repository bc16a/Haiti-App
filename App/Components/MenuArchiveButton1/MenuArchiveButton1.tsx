import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp} from 'react-navigation';
import Images from '../../Themes/Images';
import styles from './MenuArchiveButton1Styles';

export namespace MenuArchiveButton1 {
    export interface Props {
        navigation: NavigationScreenProp<any, any>;

        testID?: string;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State {}
}

export default class MenuArchiveButton1 extends React.Component<MenuArchiveButton1.Props, MenuArchiveButton1.State> {
    constructor(props: MenuArchiveButton1.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
               // onPress={() => this.props.navigation.navigate("ArchiveScreen")}
                style={[styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.paddingRight]}>
                <Image source={Images.menuArchive1} style={{ width: 28, height: 24 }} />
            </TouchableOpacity>
        );
    }
}
