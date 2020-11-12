import firebase from 'firebase/app';
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDNQRLwHXC_zYcknNdf1rplcYpBP2qIKxA",
    authDomain: "project-share-8df06.firebaseapp.com",
    databaseURL: "https://project-share-8df06.firebaseio.com",
    projectId: "project-share-8df06",
    storageBucket: "project-share-8df06.appspot.com",
    messagingSenderId: "242999336210",
    appId: "1:242999336210:web:43105302d4336a9113a7cb",
    measurementId: "G-FXCLV7D7WE"
}

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };