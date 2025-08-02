document.addEventListener("DOMContentLoaded", function () {
  const roleSelect = document.getElementById("role");
  const toggleSignupBtn = document.getElementById("toggle-signup");
  const signupForm = document.getElementById("signup-form");

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

  // Redirect after login
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const role = roleSelect.value;
    if (role === "enduser") {
      window.location.href = "user-dashboard.html";
    } else if (role === "agent") {
      window.location.href = "agent-dashboard.html";
    } else if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    }
  });
});
