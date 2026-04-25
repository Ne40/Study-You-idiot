const navMenu = document.getElementById("navMenu");
const userBox = document.getElementById("userBox");

let user = localStorage.getItem("user");

if (user) {
    navMenu.innerHTML = `
        <li><a href="intro.html">Home</a></li>
        <li><a href="rooms.html">Rooms</a></li>
        <li class="welcome">Welcome, ${user.split("@")[0]} 👋</li>
    `;

    userBox.innerHTML = "";
} else {
    navMenu.innerHTML = `
        <li><a href="intro.html">Home</a></li>
        <li><a href="rooms.html">Rooms</a></li>
        <li><a href="Log-in.html">Log-in</a></li>
        <li><a href="Sign-up.html">Sign-up</a></li>
    `;

    userBox.innerHTML = "";
}