import { createDrawerNavigator } from 'react-navigation';
import MainPage from '../activity/MainPage';
import Menu from '../component/Menu';
import FillClaims from '../activity/FillClaims';

const DrawerStack = createDrawerNavigator(
    {
        Home: {
                screen: MainPage,
        },
        FillDetails: {
                screen: FillClaims,
        }
    },
    {
        initialRouteName: "Home",
        contentComponent: Menu
    }
);

export default DrawerStack;