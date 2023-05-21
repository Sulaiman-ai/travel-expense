// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc48TQMfMzsrhbrRdvPY_qIq2u1ADl_i8",
  authDomain: "travel-expense-tracker-94c10.firebaseapp.com",
  projectId: "travel-expense-tracker-94c10",
  storageBucket: "travel-expense-tracker-94c10.appspot.com",
  messagingSenderId: "942278812387",
  appId: "1:942278812387:web:1b16108d5802014cb59bd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;