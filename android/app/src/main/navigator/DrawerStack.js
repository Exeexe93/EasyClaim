import { createDrawerNavigator } from 'react-navigation';
import MainPage from '../activity/MainPage';
import Menu from '../component/Menu';
import History from '../activity/History';
import Profile from '../activity/Profile';

const DrawerStack = createDrawerNavigator(
    {
        Home: {
                screen: MainPage,
        },
        History: {
                screen: History,
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