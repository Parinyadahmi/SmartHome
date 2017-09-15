import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Switch,
    FlatList
} from 'react-native';
import * as firebase from "firebase";

import {StackNavigator} from 'react-navigation'

console.ignoredYellowBox = ['Setting a timer'];


import Landing from './screens/landing'

const firebaseConfig = {
    apiKey: "AIzaSyBmFmhmiNqwPcz_dQ182Tkpcw-xPGb67-4",
    authDomain: "smart-home-d9a27.firebaseapp.com",
    databaseURL: "https://smart-home-d9a27.firebaseio.com",
    projectId: "smart-home-d9a27",
    storageBucket: "smart-home-d9a27.appspot.com",
    messagingSenderId: "787922450582"
};

const firebaseRef = firebase.initializeApp(firebaseConfig);

class App extends Component {

    static navigationOptions = {
        title: "Smart Home"
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('myhome/switch');
    }

    getRef() {
        return firebaseRef.database().ref();
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snapshot) => {
            var items = [];
            snapshot.forEach((child) => {

                var key = child.key;
                var value = child.val();

                items.push({
                    switch: key,
                    value: value
                });

            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });

        /* itemsRef.on('child_changed', (snapshot) => {
             var key = snapshot.key;
             var value = snapshot.val();
             console.log(key, value);

         });*/
    }

    updateData(data) {

        var switchKey = data.switch;
        var value = !data.value;

        firebase.database().ref('myhome/switch').update({
            [switchKey]: value
        })
    }


    renderList = (data) => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15

            }}>
                <Text style={{flex: 1}}>{data.switch} </Text>
                <Switch
                    onValueChange={() => {
                        this.updateData(data)
                    }}
                    value={data.value}/>
            </View>
        )
    };

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderList}
                />


                <Button title="Setting" onPress={() => navigate('Setting', {name: 'Jane'})}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonLogin: {
        height: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default StackNavigator({
    Home: {screen: App},
    Setting: {screen: Landing},
});