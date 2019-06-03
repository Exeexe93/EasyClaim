import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPage from './app/src/main/activity/LoginPage';
import MainPage from './app/src/main/activity/MainPage';

const AppNavigator = createStackNavigator(
{
    Login: LoginPage,
    Main: MainPage
}
{
    initialRouteName: "Login"
}
);

export default createAppContainer(AppNavigator);
