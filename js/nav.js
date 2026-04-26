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

let themeBtn = document.createElement("li");

themeBtn.innerHTML = `<button id="themeToggle">🌙</button>`;

navMenu.appendChild(themeBtn);

const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
}

toggle.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "🌙";
    }
};