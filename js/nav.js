const userBox = document.getElementById("userBox");

let user = localStorage.getItem("user");

if (user) {
    userBox.innerHTML = `
        <div class="user-info">
            <li><a href="intro.html">Home</a></li>
            <li><a href="rooms.html">Rooms</a></li>
            <li class="welcome">Welcome, ${user.split("@")[0]} 👋</li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        </div>
    `;
} else {
    userBox.innerHTML = `
        <li><a href="intro.html">Home</a></li>
        <li><a href="rooms.html">Rooms</a></li>
        <li><a href="Log-in.html">Log-in</a></li>
        <li><a href="Sign-up.html">Sign-up</a></li>
    `;
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "Log-in.html";
}