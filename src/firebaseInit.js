import firebase from "firebase/app";
import "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7KJm9g4JftP2nCLfJMZ1RiTW7cc-Xsgk",
    authDomain: "pushnoti-b2057.firebaseapp.com",
    projectId: "pushnoti-b2057",
    storageBucket: "pushnoti-b2057.appspot.com",
    messagingSenderId: "583433262770",
    appId: "1:583433262770:web:9038ac85cfb278fe62dbab"

};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async(setTokenFound) => {
    let currentToken = "";

    try {
        currentToken = await messaging.getToken({ vapidKey: publicKey });
        if (currentToken) {
            setTokenFound(true);
        } else {
            setTokenFound(false);
        }
    } catch (error) {
        console.log("An error occurred while retrieving token. ", error);
    }

    return currentToken;
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });