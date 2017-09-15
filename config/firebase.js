import * as firebase from "firebase";

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
        })
    }

}

export default firebaseService;