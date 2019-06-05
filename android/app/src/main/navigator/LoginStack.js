import { createStackNavigator } from 'react-navigation';
import LoginPage from '../activity/LoginPage';

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: LoginPage,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: "Login"
    }
);

export default LoginStack;
