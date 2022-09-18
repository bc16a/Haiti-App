import React from 'react';

import styles from './Styles/NavigationStyles';
//import MenuMainButton from '../Components/MenuMainButton/MenuMainButton';
//import MenuHelpButton from '../Components/MenuHelpButton/MenuHelpButton';
//import MenuMainButton1 from '../Components/MenuMainButton1/MenuMainButton1';
//import MenuHelpButton1 from '../Components/MenuHelpButton1/MenuHelpButton1';
//import MenuArchiveButton from '../Components/MenuArchiveButton/MenuArchiveButton';
//import MenuArchiveButton1 from '../Components/MenuArchiveButton1/MenuArchiveButton1';

//import StartPageAllButtons from '../Containers/StartPageAllButtons/StartPageAllButtons';
import InitPage from '../Containers/InitPage/InitPage'; 
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';
//import { View } from 'react-native'; 
import MenuBackButton from '../Components/MenuBackButton/MenuBackButton';
import MenuFiltroMes from '../Components/MenuFiltroMes/MenuFiltroMes';
import LoginPage from '../Containers/LoginPage/LoginPage';
import RegisterPage from '../Containers/RegisterPage/RegisterPage';
import Conta from '../Containers/Conta/Conta';
import { View } from 'react-native';
import SlashPage from '../Containers/SlashPage/SlashPage';



//createStackNavigator(RouteConfigs, StackNavigatorConfig);

const Routes = createAppContainer(

    createStackNavigator({

        SlashScreen:
        {
            screen: SlashPage,

            navigationOptions: {
                header: null,
            }

        },

        ProfileScreenA:
        {
            screen: InitPage,

            navigationOptions: {
                header: null,
            }

        },

        RegisterPageScreen: {
            screen: RegisterPage,
            navigationOptions: {
                header: null,
            }
        },

        LoginPageScreen: {
            screen: LoginPage,
            navigationOptions: {
                header: null,
            }
        },

        ContaScreen: 
        {
            screen: Conta,
            navigationOptions: {
                header: null,
            }

            // navigationOptions: ({ navigation }) => ({
            //     headerStyle: styles.appHeader,
            //     headerTitleStyle: styles.title,
            //     title: 'Kont',
            //     headerLeft: <MenuBackButton testID={'back'} navigation={navigation as any} />,
            //     headerRight: <View />
            // })

        },
 
        // MainScreen: {
        //     screen: StartPageAllButtons,
        //     navigationOptions: ({ navigation }) => ({
        //         headerStyle: styles.appHeader,
        //         headerTitleStyle: styles.title,
        //         headerLeftContainerStyle: { marginLeft: 10 },
        //         headerTitle: <MenuMainButton1 testID={'main'} navigation={navigation as any} />,
        //         headerLeft: <MenuHelpButton testID={'help'} navigation={navigation as any} />,
        //         headerRight: <MenuArchiveButton testID={'archive'} navigation={navigation as any} />
        //     })
        // },
 
        //...MyOtherRoutes,
    })
);

export default Routes;