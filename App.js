import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginStack from './android/app/src/main/navigator/LoginStack';
import DrawerStack from './android/app/src/main/navigator/DrawerStack';
import Menu from './android/app/src/main/component/Menu';

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginStack,
            navigationOptions: {
                header: null
            }
        },
        Drawer: {
            screen: DrawerStack,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: "Login"
    }
);

export default createAppContainer(AppNavigator);
