// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByEWR3ErNg_rx3iamBcqeSsCBm5XOdDM8",
  authDomain: "rs-chat-8a88f.firebaseapp.com",
  projectId: "rs-chat-8a88f",
  storageBucket: "rs-chat-8a88f.appspot.com",
  messagingSenderId: "959841812078",
  appId: "1:959841812078:web:c5a2d1fc223cfbb636307f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;