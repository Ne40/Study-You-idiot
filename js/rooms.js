import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// 🔥 حط config بتاعك هنا
const firebaseConfig = {
    apiKey: "AIzaSyAUknZsCJc7LF2KOCaeJLGr_WCN0zxYs9k",
    authDomain: "study-you-idiot-authentication.firebaseapp.com",
    projectId: "study-you-idiot-authentication",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ تحقق من المستخدم
onAuthStateChanged(auth, (user) => {
    console.log("USER:", user);

    if (!user) {
        window.location.href = "Log-in.html";
    } else {
        loadRooms();
    }
});

// ✅ تحميل الرومات
function loadRooms() {
    fetch("./data/rooms.json")
    .then(res => {
        if (!res.ok) {
            throw new Error("rooms.json not found");
        }
        return res.json();
    })
    .then(data => {
        let container = document.getElementById("roomsContainer");
        container.innerHTML = "";

        data.forEach(room => {
            let div = document.createElement("div");
            div.classList.add("room-card");

            div.innerHTML = `
                <h2>${room.name}</h2>
                <p>${room.users} people studying</p>
                <button onclick="joinRoom('${room.name}')">Join</button>
            `;

            container.appendChild(div);
        });
    })
    .catch(err => {
        console.error(err);
        document.getElementById("roomsContainer").innerHTML =
            `<p style="color:#ffb3b3;">Failed to load rooms ❌</p>`;
    });
}

// ✅ دخول الروم
window.joinRoom = function(roomName) {
    let safeRoomName = roomName.replaceAll(" ", "-");
    window.location.href = `VideoRoom.html?room=${safeRoomName}`;
};