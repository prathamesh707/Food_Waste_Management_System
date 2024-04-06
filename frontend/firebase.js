// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth module

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzSn5-ESscFKDgr279B8YqfYUS7oh0nxc",
  authDomain: "floodprediction-b23d0.firebaseapp.com",
  projectId: "floodprediction-b23d0",
  storageBucket: "floodprediction-b23d0.appspot.com",
  messagingSenderId: "281625042395",
  appId: "1:281625042395:web:7d27f3c39bb61d66275bfe"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// Initialize the auth service
const auth = getAuth(app); // Get the auth service from the initialized app

export { auth }; //