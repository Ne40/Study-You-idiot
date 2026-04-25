import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUknZsCJc7LF2KOCaeJLGr_WCN0zxYs9k",
  authDomain: "study-you-idiot-authentication.firebaseapp.com",
  projectId: "study-you-idiot-authentication",
  storageBucket: "study-you-idiot-authentication.firebasestorage.app",
  messagingSenderId: "253550090268",
  appId: "1:253550090268:web:977057f4e2ba3ac347e7d9",
  measurementId: "G-ZKXXZ981E2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };