// admin-script.js
const users = [];

const categories = [
  { name: "Login Issues", description: "Problems logging in" },
  { name: "Network", description: "Connectivity problems" }
];

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
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td><button onclick="editUser('${user.id}')">Edit</button></td>
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
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td><button onclick="editUser('${user.id}')">Edit</button></td>
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

// Initial rendering
renderUsers();
renderCategories();

