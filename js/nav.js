const navMenu = document.getElementById("navMenu");

let username = localStorage.getItem("user");
let profileImage = localStorage.getItem("profileImage");

if (username) {
    navMenu.innerHTML = `
        <li><a href="intro.html">Home</a></li>
        <li><a href="rooms.html">Rooms</a></li>
        <li>
            <a href="Profile.html" class="profile-nav">
                <img src="${profileImage || 'images/logo.png'}" alt="Profile">
                <span>${username}</span>
            </a>
        </li>
    `;
} else {
    navMenu.innerHTML = `
        <li><a href="intro.html">Home</a></li>
        <li><a href="rooms.html">Rooms</a></li>
        <li><a href="Log-in.html">Log-in</a></li>
        <li><a href="Sign-up.html">Sign-up</a></li>
    `;
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
    window.location.href = "Log-in.html";
}