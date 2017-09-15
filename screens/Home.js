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

import firebaseService from '../config/firebase'

console.ignoredYellowBox = ['Setting a timer'];


class App extends Component {
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
        return firebaseService.getRef();
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
        firebaseService.updateData(data);
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

export default App;