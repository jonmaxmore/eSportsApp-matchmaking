import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBuV804JXOlV6qqbdZq1vEQcGlk_uQg81o",
  authDomain: "battlelab-platform.firebaseapp.com",
  databaseURL: "https://battlelab-platform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "battlelab-platform",
  storageBucket: "battlelab-platform.appspot.com",
  messagingSenderId: "107211499098",
  appId: "1:107211499098:web:e57dea75cfe879dab09a63",
  measurementId: "G-5WM2W68EB7"
};

// Initialize Firebase
export const appFire = initializeApp(firebaseConfig);
export const authSocial = getAuth();