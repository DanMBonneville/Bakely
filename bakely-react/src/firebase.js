 import firebase from 'firebase/app'
 import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDiNj7-21to6pADvUoVfy_PfqqWj0mR7c4",
    authDomain: "bakely-server.firebaseapp.com",
    projectId: "bakely-server",
    storageBucket: "bakely-server.appspot.com",
    messagingSenderId: "455658577748",
    appId: "1:455658577748:web:b44163be32025bd93072c1",
    measurementId: "G-7NG3CFNH08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore()

export default {
    firebase, db
}