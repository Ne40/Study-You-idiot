import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUknZsCJc7LF2KOCaeJLGr_WCN0zxYs9k",
    authDomain: "study-you-idiot-authentication.firebaseapp.com",
    projectId: "study-you-idiot-authentication",
    storageBucket: "study-you-idiot-authentication.appspot.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let currentUser = null;

const profileImageInput = document.getElementById("profileImage");
const avatarPreview = document.getElementById("avatarPreview");

profileImageInput.addEventListener("change", function () {
    const file = profileImageInput.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    avatarPreview.innerHTML = `
        <img src="${imageURL}" alt="Profile Preview">
    `;
});

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "Log-in.html";
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
    const goals = document.getElementById("goals").value.trim();
    const imageFile = document.getElementById("profileImage").files[0];
    const error = document.getElementById("error");

    if (!currentUser) {
        error.textContent = "Please login first ❌";
        return;
    }

    try {
        let imageUrl = "";

        if (imageFile) {
            const imageRef = ref(storage, `profileImages/${currentUser.uid}`);
            await uploadBytes(imageRef, imageFile);
            imageUrl = await getDownloadURL(imageRef);
        }

        await setDoc(doc(db, "users", currentUser.uid), {
            email: currentUser.email,
            gender,
            bio,
            education,
            major: education === "University" ? major : "",
            goals,
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