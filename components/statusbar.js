import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import color from '../config/color';

class StatusBarBackground extends Component {
    render() {
        return (
            <View style={[styles.statusBarBackground, this.props.style || {}]}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight,
        backgroundColor: color.black,
    }

})

module.exports = StatusBarBackground;