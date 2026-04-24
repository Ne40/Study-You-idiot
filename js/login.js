document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === "" || password === "") {
        document.getElementById("error").innerText = "Please fill all fields!";
        return;
    }

    // تخزين الاسم
    localStorage.setItem("user", username);

    // تحويل لصفحة الرومات
    window.location.href = "rooms.html";
});