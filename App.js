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
    apiKey: "AIzaSyBx8XDUT4ZnTKBnNHLugSO_VLQwR8t7qcY",
    authDomain: "smart-farm-f1edb.firebaseapp.com/",
    databaseURL: "https://smart-farm-f1edb.firebaseio.com/",
    storageBucket: "",
};

const firebaseRef = firebase.initializeApp(firebaseConfig);

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
                    onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                    value={this.state.falseSwitchIsOn}/>
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