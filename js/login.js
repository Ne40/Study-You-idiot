import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUknZsCJc7LF2KOCaeJLGr_WCN0zxYs9k",
    authDomain: "study-you-idiot-authentication.firebaseapp.com",
    projectId: "study-you-idiot-authentication"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    try {
        error.textContent = "";

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        console.log("Logged in:", userCredential.user.email);

        window.location.href = "rooms.html";

    } catch (err) {
        console.error(err);

        error.textContent = "Wrong email or password ❌";
    }
});