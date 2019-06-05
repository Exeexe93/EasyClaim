import { createDrawerNavigator } from 'react-navigation';
import MainPage from '../activity/MainPage';
import Menu from '../component/Menu'

const DrawerStack = createDrawerNavigator(
    {
        Home: {
                screen: MainPage,
        },
    },
    {
        initialRouteName: "Home",
        contentComponent: Menu
    }
);

export default DrawerStack;