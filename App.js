import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginStack from './android/app/src/main/navigator/LoginStack';
import DrawerStack from './android/app/src/main/navigator/DrawerStack';
import Menu from './android/app/src/main/component/Menu';
import ReviewClaim from './android/app/src/main/activity/ReviewClaim';
import EditProfile from './android/app/src/main/activity/EditProfile';
import ShowImage from './android/app/src/main/activity/ShowImage';
import FillClaims from './android/app/src/main/activity/FillClaims';

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
        },
        FillDetails: {
                screen: FillClaims,
                navigationOptions: {
                                header: null
                }
        },
        ReviewClaim: {
                screen: ReviewClaim,
                navigationOptions: {
                                header: null
                }
        },
        EditProfile: {
                screen: EditProfile,
                navigationOptions: {
                                header: null
                }
        },
        ShowImage: {
             screen: ShowImage,
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
