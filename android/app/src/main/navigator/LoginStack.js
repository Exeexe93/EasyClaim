import { createStackNavigator } from 'react-navigation';
import LoginPage from '../activity/LoginPage';
import Register from '../activity/Register';
import ForgetPassword from '../activity/ForgetPassword';

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: LoginPage,
            navigationOptions: {
                header: null
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                headerStyle: {
                  backgroundColor: '#2699FB'
                }
            }
        },
        ForgetPassword: {
            screen: ForgetPassword,
            navigationOptions: {
                headerStyle: {
                  backgroundColor: '#2699FB'
                }
            }
        }
    },
    {
        initialRouteName: "Login"
    }
);

export default LoginStack;
