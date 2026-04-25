import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("No user yet...");
        return;
    }

    currentUser = user;
});

document.getElementById("profileForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const bio = document.getElementById("bio").value.trim();
    const education = document.getElementById("education").value;
    const major = document.getElementById("major").value.trim();
    const imageFile = document.getElementById("profileImage").files[0];
    const error = document.getElementById("error");

    try {
        let imageUrl = "";

        if (imageFile) {
            const imageRef = ref(storage, `profileImages/${currentUser.uid}`);
            await uploadBytes(imageRef, imageFile);
            imageUrl = await getDownloadURL(imageRef);
        }

        await setDoc(doc(db, "users", currentUser.uid), {
            email: currentUser.email,
            gender: gender,
            bio: bio,
            education: education,
            major: education === "University" ? major : "",
            profileImage: imageUrl,
            profileCompleted: true,
            updatedAt: new Date()
        }, { merge: true });

        window.location.href = "rooms.html";

    } catch (err) {
        error.textContent = "Something went wrong ❌";
        console.error(err);
    }
});