document.addEventListener("DOMContentLoaded", function () {
  const roleSelect = document.getElementById("role");
  const toggleSignupBtn = document.getElementById("toggle-signup");
  const signupForm = document.getElementById("signup-form");

  const API_BASE = "http://localhost:3000";

  // Toggle signup visibility
  toggleSignupBtn.addEventListener("click", () => {
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
  });

  // Show signup option only for End User
  roleSelect.addEventListener("change", () => {
    if (roleSelect.value === "enduser") {
      toggleSignupBtn.style.display = "block";
    } else {
      toggleSignupBtn.style.display = "none";
      signupForm.style.display = "none";
    }
  });

  // Login form
  document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const role = roleSelect.value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const result = await res.json();
      if (result.success) {
        if (role === "enduser") window.location.href = "user-dashboard.html";
        else if (role === "agent") window.location.href = "agent-dashboard.html";
        else if (role === "admin") window.location.href = "admin-dashboard.html";
      } else {
        alert("Login failed: " + result.message);
      }
    } catch (err) {
      alert("Error logging in");
    }
  });

  // Signup form
  document.getElementById("signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "enduser" })
      });

      const result = await res.json();
      if (result.success) {
        alert("Signup successful. You can now log in.");
        signupForm.reset();
      } else {
        alert("Signup failed: " + result.message);
      }
    } catch (err) {
      alert("Error signing up");
    }
  });
});
