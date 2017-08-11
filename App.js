import React , {Component} from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Switch
} from 'react-native';
import * as firebase from "firebase";
import FBSDK, {LoginManager, AccessToken} from "react-native-fbsdk"
import {StackNavigator} from 'react-navigation'

const firebaseConfig = {
    apiKey: "AIzaSyBmFmhmiNqwPcz_dQ182Tkpcw-xPGb67-4",
    authDomain: "smart-home-d9a27.firebaseapp.com",
    databaseURL: "https://smart-home-d9a27.firebaseio.com",
    projectId: "smart-home-d9a27",
    storageBucket: "smart-home-d9a27.appspot.com",
    messagingSenderId: "787922450582"
};

const firebaseRef = firebase.initializeApp(firebaseConfig);


// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('myhome');


class App extends Component {

    static navigationOptions = {
        title: "Smart Home"
    }

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRol) => oldRow !== newRol
        });

        this.state = {
            dataSource: ds.cloneWithRows(['Switch 1', 'Switch 2', 'Switch 3', 'Switch 4', 'Switch 5', 'Switch 6', 'Switch 7', 'Switch 8']),
        };
    }

    componentDidMount() {
        this.listenForItems(itemsRef);
    }

    listenForItems(itemsRef) {
        itemsRef.on('child_changed', (snapshot) => {

            var key = snapshot.key;
            var value = snapshot.val();
            console.log(key, value);

        });
    }

    updateData(){
        console.log( firebase.database().ref('myhome').update({
            Light2 : 10,
        }))
    }


    renderList = (rowData) => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15

            }}>
                <Text style={{flex:1}}>{rowData} </Text>
                <Switch
                    onValueChange={() => {this.updateData()}}
                    value={true}/>
            </View>
        )
    };

    render() {
        return (
            <View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderList}
                />
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
    Home: {
        screen: App
    }
});