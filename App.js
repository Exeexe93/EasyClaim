import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPage from './android/app/src/main/activity/LoginPage';
import MainPage from './android/app/src/main/activity/MainPage';

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginPage,
            navigationOptions: {
                headerLeft: null
            }
        },
        Main: {
            screen: MainPage,
            navigationOptions: {
                headerLeft: null
            }
        }
    },
    {
        initialRouteName: "Login"
    }
);

export default createAppContainer(AppNavigator);
