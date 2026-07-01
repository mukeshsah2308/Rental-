
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFP7J4H9AcSR8gcy03wokTbO8Svg-2gSc",
  authDomain: "todo-f2b74.firebaseapp.com",
  projectId: "todo-f2b74",
  storageBucket: "todo-f2b74.firebasestorage.app",
  messagingSenderId: "731579375587",
  appId: "1:731579375587:web:3205879595dd4da88b8ad6",
  measurementId: "G-LXJDX2X0ZV"
};


const app = initializeApp(firebaseConfig);

// ✅ export from here
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();