import firebase from 'firebase';

const API_SECRET_KEY = process.env.REACT_APP_FB_API_KEY;

const firebaseConfig = {
  apiKey: API_SECRET_KEY,
  authDomain: 'wizetube3.firebaseapp.com',
  projectId: 'wizetube3',
  storageBucket: 'wizetube3.appspot.com',
  messagingSenderId: '1013347374567',
  appId: '1:1013347374567:web:266e6d7c52c497c1de9942',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
