let attempts = 0;
const maxAttempts = 3;

const correctUsername = "admin";
const correctPassword = "1234";

function login() {
  if (attempts >= maxAttempts) {
    document.getElementById("message").innerText =
      "Too many failed attempts. Access blocked.";
    return;
  }

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === correctUsername && password === correctPassword) {
    sessionStorage.setItem("token", "loggedIn");
    window.location.href = "dashboard.html";
  } else {
    attempts++;
    document.getElementById("message").innerText =
      `Login failed. Attempts left: ${maxAttempts - attempts}`;
  }
}
