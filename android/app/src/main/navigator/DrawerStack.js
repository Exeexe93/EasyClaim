import { createDrawerNavigator } from 'react-navigation';
import MainPage from '../activity/MainPage';
import Menu from '../component/Menu';
import Notifications from '../activity/Notifications';
import Profile from '../activity/Profile';

const DrawerStack = createDrawerNavigator(
    {
        Home: {
                screen: MainPage,
        },
        Notifications: {
                screen: Notifications,
        },
        Profile: {
                screen: Profile,
        },
    },
    {
        contentComponent: Menu
    }
);

export default DrawerStack;