import firebase from 'firebase/app';
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDbZs77poEWsfPtjndfH6wB2cRl1VEa33c",
    authDomain: "project-share-8244f.firebaseapp.com",
    databaseURL: "https://project-share-8244f.firebaseio.com",
    projectId: "project-share-8244f",
    storageBucket: "project-share-8244f.appspot.com",
    messagingSenderId: "620086156576",
    appId: "1:620086156576:web:72edfa289c392951cb8b45",
    measurementId: "G-8S4YP6XX0Y"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
