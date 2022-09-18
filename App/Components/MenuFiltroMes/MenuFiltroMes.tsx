import * as React from 'react';
import { Image, TouchableOpacity, Button, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Images from '../../Themes/Images';
import styles from './MenuFiltroMesStyles';

export namespace MenuFiltroMes {
    export interface Props {
        navigation: NavigationScreenProp<any, any>;

        testID?: string;
    }

    // tslint:disable-next-line:no-empty-interface
    export interface State { }
}

export default class MenuFiltroMes extends React.Component<MenuFiltroMes.Props, MenuFiltroMes.State> {
    constructor(props: MenuFiltroMes.Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
                onPress={() => this.props.navigation.navigate('MainScreen')}
                style={[{borderColor: "yellow", borderWidth:3, height:40, width:40},styles.centeredColumn, styles.centeredRow, styles.smallPaddingLeft, styles.smallPaddingRight]}>

        <Text style={{color:'white'}}>Mês</Text> 
        
            </TouchableOpacity>

       
        );
    }
}
