import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJYj8AZGv9VySM2C3HmaaBEoW_HQ3JwcE",
    authDomain: "fenwaycdc-be78a.firebaseapp.com",
    projectId: "fenwaycdc-be78a",
    storageBucket: "fenwaycdc-be78a.appspot.com",
    messagingSenderId: "840610701213",
    appId: "1:840610701213:web:c10ded6713f1c01297d974",
    measurementId: "G-Y06YPN47LL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
