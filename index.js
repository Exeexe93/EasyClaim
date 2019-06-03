/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import Login from './android/app/src/main/activity/LoginPage'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Login);
