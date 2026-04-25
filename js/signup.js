import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUknZsCJc7LF2KOCaeJLGr_WCN0zxYs9k",
    authDomain: "study-you-idiot-authentication.firebaseapp.com",
    projectId: "study-you-idiot-authentication",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("error");

    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match ❌";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            profileCompleted: false,
            createdAt: new Date()
        });

        localStorage.setItem("user", username);
        window.location.href = "CompleteProfile.html";

    } catch (error) {
        document.getElementById("error").textContent = error.message;
    }
});