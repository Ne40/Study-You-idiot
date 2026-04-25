import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUknZsCJc7LF2KOCaeJLGr_WCN0zxYs9k",
    authDomain: "study-you-idiot-authentication.firebaseapp.com",
    projectId: "study-you-idiot-authentication"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const CLOUD_NAME = "dbpzeqzvl";
const UPLOAD_PRESET = "Profile-Img";

let currentUser = null;

const profileForm = document.getElementById("profileForm");
const profileImageInput = document.getElementById("profileImage");
const avatarPreview = document.getElementById("avatarPreview");
const error = document.getElementById("error");

async function uploadImageToCloudinary(imageFile) {
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
}

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

profileForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const bio = document.getElementById("bio").value.trim();
    const education = document.getElementById("education").value;
    const major = document.getElementById("major").value.trim();
    const goals = document.getElementById("goals").value.trim();
    const imageFile = profileImageInput.files[0];

    if (!currentUser) {
        error.textContent = "Please login first ❌";
        return;
    }

    try {
        error.textContent = "";

        let imageUrl = "";

        if (imageFile) {
            console.log("Uploading image...");
            imageUrl = await uploadImageToCloudinary(imageFile);
            console.log("Image URL:", imageUrl);
        }

console.log("Saving profile for:", currentUser.uid);

    await setDoc(doc(db, "users", currentUser.uid), {
        email: currentUser.email,
        gender: gender,
        bio: bio,
        education: education,
        major: education === "University" ? major : "",
        goals: goals,
        profileImage: imageUrl,
        profileCompleted: true,
        updatedAt: new Date()
    }, { merge: true });
    
    console.log("Profile saved successfully");
    localStorage.setItem("profileImage", imageUrl); 

    window.location.href = "rooms.html";

    } catch (err) {
        error.textContent = "Something went wrong ❌";
        console.error(err);
    }
});