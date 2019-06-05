import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPage from './android/app/src/main/activity/LoginPage';
import MainPage from './android/app/src/main/activity/MainPage';

const AppNavigator = createStackNavigator(
    {
        Login: LoginPage,
        Main: MainPage
    },
    {
        initialRouteName: "Login",
        navigationOptions: {
            header: null
        }
    }
);

export default createAppContainer(AppNavigator);
