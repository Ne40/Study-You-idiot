import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUknZsCJc7LF2KOCaeJLGr_WCN0zxYs9k",
    authDomain: "study-you-idiot-authentication.firebaseapp.com",
    projectId: "study-you-idiot-authentication",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        localStorage.setItem("user", userCredential.user.email);
        window.location.href = "rooms.html";
    })
    .catch(() => {
        document.getElementById("error").textContent = "Login failed ❌";
    });
});