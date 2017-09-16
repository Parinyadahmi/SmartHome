import React, {Component} from 'react';
import {Root} from './config/router';

import {View, Text, StyleSheet, Platform} from 'react-native';
import StatusBarBackground from './components/statusbar'

const App = () =>
    <View style={{flex: 1}}>
        <StatusBarBackground/>
        <Root/>
    </View>;

export default App;