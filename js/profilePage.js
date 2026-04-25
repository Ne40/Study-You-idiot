import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
let todos = [];

const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileBio = document.getElementById("profileBio");

const bioInput = document.getElementById("bio");
const goalsInput = document.getElementById("goals");
const imageInput = document.getElementById("profileImage");
const saveBtn = document.getElementById("saveProfileBtn");
const logoutBtn = document.getElementById("logoutBtn");

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
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

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "Log-in.html";
        return;
    }

    currentUser = user;
    await loadProfile();
});

async function loadProfile() {
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        error.textContent = "Profile not found ❌";
        return;
    }

    const data = userSnap.data();

    profileName.textContent = data.username || "User";
    profileEmail.textContent = data.email || currentUser.email;
    profileBio.textContent = data.bio || "No bio yet...";

    bioInput.value = data.bio || "";
    goalsInput.value = data.goals || "";

    if (data.profileImage) {
        profileAvatar.innerHTML = `<img src="${data.profileImage}" alt="Profile">`;
        localStorage.setItem("profileImage", data.profileImage);
    }

    localStorage.setItem("user", data.username || currentUser.email);

    todos = data.todos || [];
    renderTodos();
}

imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    profileAvatar.innerHTML = `<img src="${imageURL}" alt="Profile Preview">`;
});

saveBtn.addEventListener("click", async function () {
    try {
        error.textContent = "";

        let imageUrl = localStorage.getItem("profileImage") || "";

        const imageFile = imageInput.files[0];

        if (imageFile) {
            imageUrl = await uploadImageToCloudinary(imageFile);
        }

        await updateDoc(doc(db, "users", currentUser.uid), {
            bio: bioInput.value.trim(),
            goals: goalsInput.value.trim(),
            profileImage: imageUrl,
            profileCompleted: true,
            updatedAt: new Date()
        });

        localStorage.setItem("profileImage", imageUrl);

        profileBio.textContent = bioInput.value.trim() || "No bio yet...";

        alert("Profile updated ✅");

    } catch (err) {
        error.textContent = "Could not save profile ❌";
        console.error(err);
    }
});

addTodoBtn.addEventListener("click", async function () {
    const task = todoInput.value.trim();

    if (!task) return;

    todos.push({
        text: task,
        done: false
    });

    todoInput.value = "";

    await saveTodos();
    renderTodos();
});

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="${todo.done ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                ${todo.text}
            </span>

            <div>
                <button onclick="toggleTodo(${index})">Done</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

async function saveTodos() {
    await setDoc(doc(db, "users", currentUser.uid), {
        todos: todos
    }, { merge: true });
}

window.toggleTodo = async function (index) {
    todos[index].done = !todos[index].done;
    await saveTodos();
    renderTodos();
};

window.deleteTodo = async function (index) {
    todos.splice(index, 1);
    await saveTodos();
    renderTodos();
};

logoutBtn.addEventListener("click", async function () {
    await signOut(auth);

    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");

    window.location.href = "Log-in.html";
});