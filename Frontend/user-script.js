const tbody = document.querySelector("#ticketTable tbody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const sortSelect = document.getElementById("sortSelect");

function renderTickets() {
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

  const searchTerm = searchInput.value.toLowerCase();
  const filterStatus = statusFilter.value;
  const sortBy = sortSelect.value;

  let filtered = tickets.filter(ticket => {
    return (filterStatus === "All" || ticket.status === filterStatus) &&
           (ticket.subject.toLowerCase().includes(searchTerm));
  });

  filtered.sort((a, b) => {
    if (sortBy === "Replies") {
      return b.replies - a.replies;
    } else {
      return new Date(b.updated) - new Date(a.updated);
    }
  });

  tbody.innerHTML = "";
  filtered.forEach(ticket => {
    const row = `<tr>
      <td>${ticket.id}</td>
      <td>${ticket.subject}</td>
      <td>${ticket.category}</td>
      <td>${ticket.status}</td>
      <td>${ticket.updated}</td>
      <td>${ticket.replies}</td>
    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });

  updateSummary(tickets);
}

function updateSummary(tickets) {
  document.getElementById("open-count").textContent = tickets.filter(t => t.status === "Open").length;
  document.getElementById("progress-count").textContent = tickets.filter(t => t.status === "In Progress").length;
  document.getElementById("resolved-count").textContent = tickets.filter(t => t.status === "Resolved").length;
  document.getElementById("closed-count").textContent = tickets.filter(t => t.status === "Closed").length;
}

searchInput?.addEventListener("input", renderTickets);
statusFilter?.addEventListener("change", renderTickets);
sortSelect?.addEventListener("change", renderTickets);

if (tbody) renderTickets();
