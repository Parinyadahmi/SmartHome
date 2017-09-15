import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';

// Screen
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Activity from '../screens/Activity';

export const Tabs = TabNavigator({
        Feed: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
                style: {
                    backgroundColor: '#4CAF50',
                },
            },
        },
        Activity: {
            screen: Activity,
            navigationOptions: {
                tabBarLabel: 'Activity',
                tabBarIcon: ({tintColor}) => <Icon name="account-circle" size={35} color={tintColor}/>
            },
        },
        Setting: {
            screen: Settings,
            navigationOptions: {
                tabBarLabel: 'Setting',
                tabBarIcon: ({tintColor}) => <Icon name="account-circle" size={35} color={tintColor}/>
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
                backgroundColor: '#4CAF50',
            },
        },

    }
);

export const Root = Tabs;
