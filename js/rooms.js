// ✅ تأكد إن المستخدم عامل login الأول
let user = localStorage.getItem("user");

if (!user) {
    window.location.href = "Log-in.html";
}

// ✅ تحميل الرومات
fetch("data/rooms.json")
.then(response => response.json())
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
    console.error("Error loading rooms:", err);
});


function joinRoom(roomName) {
    let safeRoomName = roomName.replaceAll(" ", "-");

    window.location.href = `VideoRoom.html?room=${safeRoomName}`;
}