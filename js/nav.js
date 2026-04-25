const userBox = document.getElementById("userBox");

let user = localStorage.getItem("user");

if (user) {
    userBox.innerHTML = `
        <div class="user-info">
            <span>Welcome, ${user.split("@")[0]} 👋</span>
            <button onclick="logout()">Logout</button>
        </div>
    `;
} else {
    userBox.innerHTML = `
        <a href="Log-in.html">Log-in</a>
        <a href="Sign-up.html">Sign-up</a>
    `;
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "Log-in.html";
}