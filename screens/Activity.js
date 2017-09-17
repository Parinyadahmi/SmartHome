import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import firebaseService from '../config/firebase'

export default class Example extends Component {
    constructor() {
        super()

        this.state = {
            waiting: true,
            data: []
        }

        this.itemsRef = this.getRef();
    }

    getRef() {
        return firebaseService.getRef().child('logs');
    }

    componentDidMount() {
        this.itemsRef.once('value', (snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                var value = child.val();

                items.push({
                    switch_id: value.switch_id,
                    time: value.data_date,
                    title: value.value ? 'Turn on ' + value.switch_id : 'Turn off ' + value.switch_id,
                    description: value.data_date
                });

            });

            this.setState({
                waiting: false,
                data: items
            });
        });
    }


    render() {
        var {waiting, data} = this.state;
        if (waiting) {
            return (
                <ActivityIndicator/>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Timeline
                        style={styles.list}
                        data={data}
                        circleSize={20}
                        circleColor='rgb(45,156,219)'
                        lineColor='rgb(45,156,219)'
                        timeContainerStyle={{minWidth: 52}}
                        timeStyle={{
                            textAlign: 'center',
                            backgroundColor: '#ff9797',
                            color: 'white',
                            padding: 5,
                            borderRadius: 13
                        }}
                        descriptionStyle={{color: 'gray'}}
                        options={{
                            style: {paddingTop: 5}
                        }}
                    />
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    list: {
        flex: 1,
    },
});