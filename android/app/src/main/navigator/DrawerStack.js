import { createDrawerNavigator } from 'react-navigation';
import MainPage from '../activity/MainPage';
import Menu from '../component/Menu';
import History from '../activity/History';
import Profile from '../activity/Profile';
import Submission from '../activity/Submission';

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
        Submission: {
                screen: Submission,
        }
    },
    {
        contentComponent: Menu
    }
);

export default DrawerStack;