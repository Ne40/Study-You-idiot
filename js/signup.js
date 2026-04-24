let signupForm = document.getElementById("signupForm");
let error = document.getElementById("error");

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match ❌";
        return;
    }

    let userData = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    localStorage.setItem("user", username);

    window.location.href = "rooms.html";
});