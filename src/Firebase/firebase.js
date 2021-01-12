import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD-vrXHaslSYqEx_sqy4CzKTZSemXUocDk",
    authDomain: "snapchat-clone-979dd.firebaseapp.com",
    projectId: "snapchat-clone-979dd",
    storageBucket: "snapchat-clone-979dd.appspot.com",
    messagingSenderId: "108464507811",
    appId: "1:108464507811:web:0b11db27d9c6a0fafee816",
    measurementId: "G-V6SP6M58B6"
}
const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth()
const storage=firebase.storage()
const provider=new firebase.auth.GoogleAuthProvider()
export {db,auth,storage,provider};