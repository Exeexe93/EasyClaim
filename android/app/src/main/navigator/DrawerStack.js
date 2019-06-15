import { createDrawerNavigator } from 'react-navigation';
import MainPage from '../activity/MainPage';
import Menu from '../component/Menu';
import FillClaims from '../activity/FillClaims';
import Notifications from '../activity/Notifications';
import ReviewClaim from '../activity/ReviewClaim';
import Profile from '../activity/Profile';
import EditProfile from '../activity/EditProfile';

const DrawerStack = createDrawerNavigator(
    {
        Home: {
                screen: MainPage,
        },
        FillDetails: {
                screen: FillClaims,
        },
        Notifications: {
                screen: Notifications,
        },
        Notifications: {
                screen: Notifications,
        },
        ReviewClaim: {
                screen: ReviewClaim,
        },
        Profile: {
                screen: Profile,
        },
        EditProfile: {
                screen: EditProfile,
        }
    },
    {
        contentComponent: Menu
    }
);

export default DrawerStack;