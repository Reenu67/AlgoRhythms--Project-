let users = [];
let categories = [];

const API_BASE = "http://localhost:5000";  // Adjust if hosted differently

function showSection(section) {
  document.getElementById("usersSection").style.display = section === "users" ? "block" : "none";
  document.getElementById("categoriesSection").style.display = section === "categories" ? "block" : "none";
}

function renderUsers() {
  const table = document.getElementById("userTable");
  table.innerHTML = "";
  users.forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user._id}</td>
        <td>${user.name}</td>
        <td>${user.role || "N/A"}</td>
        <td>${user.status || "Active"}</td>
        <td><button onclick="editUser('${user._id}')">Edit</button></td>
      </tr>`;
  });
}

function renderCategories() {
  const table = document.getElementById("categoryTable");
  table.innerHTML = "";
  categories.forEach(cat => {
    table.innerHTML += `
      <tr>
        <td>${cat.name}</td>
        <td>${cat.description}</td>
        <td><button onclick="editCategory('${cat.name}')">Edit</button></td>
      </tr>`;
  });
}

function filterUsers(query) {
  const filtered = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));
  const table = document.getElementById("userTable");
  table.innerHTML = "";
  filtered.forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user._id}</td>
        <td>${user.name}</td>
        <td>${user.role || "N/A"}</td>
        <td>${user.status || "Active"}</td>
        <td><button onclick="editUser('${user._id}')">Edit</button></td>
      </tr>`;
  });
}

function addUser() {
  alert("Add User Form (to be implemented)");
}

function editUser(id) {
  alert(`Edit user ${id} (to be implemented)`);
}

function addCategory() {
  alert("Add Category Form (to be implemented)");
}

function editCategory(name) {
  alert(`Edit category ${name} (to be implemented)`);
}

// 🔁 Fetch All Users from Backend
async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE}/agents`);
    const data = await res.json();
    users = data;
    renderUsers();
  } catch (err) {
    console.error("Failed to fetch users:", err);
  }
}

// 🔁 Fetch All Categories (dummy for now, until Flask route is added)
async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`); // You'll need to create this route
    const data = await res.json();
    categories = data;
    renderCategories();
  } catch (err) {
    console.warn("Using default categories, backend not ready yet.");
    categories = [
      { name: "Login Issues", description: "Problems logging in" },
      { name: "Network", description: "Connectivity problems" }
    ];
    renderCategories();
  }
}

//  Initial Fetch
fetchUsers();
fetchCategories();
