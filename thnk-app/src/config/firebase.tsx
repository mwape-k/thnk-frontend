// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeURXF4tqpGw_tHUTxiZ5XbzW_WA7Zse0",
  authDomain: "thnk-ab344.firebaseapp.com",
  projectId: "thnk-ab344",
  storageBucket: "thnk-ab344.firebasestorage.app",
  messagingSenderId: "210732028189",
  appId: "1:210732028189:web:db416adb970dd010a191f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
