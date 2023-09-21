// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBycenTB37rfcM1UdixcUJW-dqUhpnOW8Q",
  authDomain: "authentication-11c16.firebaseapp.com",
  databaseURL: "https://authentication-11c16-default-rtdb.firebaseio.com",
  projectId: "authentication-11c16",
  storageBucket: "authentication-11c16.appspot.com",
  messagingSenderId: "795457698836",
  appId: "1:795457698836:web:982eacb205846f62cdbb01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
