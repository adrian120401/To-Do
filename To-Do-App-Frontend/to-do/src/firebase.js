// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3UvfzlRp8EZJK2mlR6hZk_jg7Wi6tung",
  authDomain: "to-do-66fa1.firebaseapp.com",
  projectId: "to-do-66fa1",
  storageBucket: "to-do-66fa1.appspot.com",
  messagingSenderId: "660902490899",
  appId: "1:660902490899:web:f181c5b65d012256f4a0e6",
  measurementId: "G-MV8CRMR67W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;