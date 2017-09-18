import * as firebase from "firebase";
import Moment from 'moment';

const firebaseConfig = {
    apiKey: "AIzaSyBmFmhmiNqwPcz_dQ182Tkpcw-xPGb67-4",
    authDomain: "smart-home-d9a27.firebaseapp.com",
    databaseURL: "https://smart-home-d9a27.firebaseio.com",
    projectId: "smart-home-d9a27",
    storageBucket: "smart-home-d9a27.appspot.com",
    messagingSenderId: "787922450582"
};

const firebaseRef = firebase.initializeApp(firebaseConfig);

const firebaseService = {
    getRef() {
        return firebaseRef.database().ref();
    },

    updateData(data) {
        let switchKey = data.switch;
        let value = !data.value;

        firebase.database().ref('myhome/switch').update({
            [switchKey]: value
        });

        this.addLogs(data);
    },

    addLogs(data) {
        let rootRef = firebase.database().ref().child("logs");
        let newKey = rootRef.push().key;
        let dt = new Date();
        let date = Moment(dt).format('YYYY/MM/DD HH:mm:ss');

        let logs = {
            "log_id": newKey,
            "switch_id": parseFloat(data.switch),
            "value": !data.value,
            "data_date": date
        };
        rootRef.child(newKey).set(logs);
    }
}

export default firebaseService;