//cek login 
document.addEventListener("DOMContentLoaded", function() {

    const token = localStorage.getItem('token');
    const username =localStorage.getItem('username');

    if(!token) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${username}`;
    }
});
