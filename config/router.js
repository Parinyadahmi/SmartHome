import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';

//config
import color from './color'

// Screen
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Activity from '../screens/Activity';


export const Tabs = TabNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home',
            },
        },
        Activity: {
            screen: Activity,
            navigationOptions: {
                tabBarLabel: 'Activity',
            },
        },
        Setting: {
            screen: Settings,
            navigationOptions: {
                tabBarLabel: 'Setting',
            },
        },

    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#ffffff',
            indicatorStyle: {
                backgroundColor: 'rgba(255,255,255,0.7)',
            },
            style: {
                backgroundColor: color.primary,
            },
        },

    },
);

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            title: 'Eco House',
            headerTitleStyle: {
                color: 'white',
            },
            headerStyle: {
                backgroundColor: color.primary,
                elevation: null
            },
        },
    },
    Settings: {
        screen: Settings,
    },
}, {
    mode: 'modal',
});
