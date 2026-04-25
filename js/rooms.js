let user = localStorage.getItem("user");

if (!user) {
    window.location.href = "Log-in.html";
}

fetch("./data/rooms.json")
.then(response => {
    if (!response.ok) {
        throw new Error("rooms.json not found");
    }
    return response.json();
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
        `<p style="color:#ffb3b3;">Rooms failed to load ❌</p>`;
});

function joinRoom(roomName) {
    let safeRoomName = roomName.replaceAll(" ", "-");
    window.location.href = `VideoRoom.html?room=${safeRoomName}`;
}