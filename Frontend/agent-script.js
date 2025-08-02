const ticketList = document.getElementById("agentTicketList");
const queueFilter = document.getElementById("queueFilter");
const modal = document.getElementById("replyModal");
const modalTicketId = document.getElementById("modalTicketId");
const closeModal = document.getElementById("closeModal");
const agentHeader = document.getElementById("agentHeader");
const resolvedCount = document.getElementById("resolvedCount");

const API_BASE = "http://localhost:3000"; // Change if hosted elsewhere

let currentTicketId = null;
const agentId = "AGT001";
const agentName = "John Doe";

// Set dynamic header
agentHeader.innerHTML = `QuickDesk Support System<br>Agent ID: ${agentId} | Name: ${agentName}`;

async function loadTickets() {
  try {
    const response = await fetch(`${API_BASE}/tickets`);
    const tickets = await response.json();
    const filter = queueFilter.value;
    ticketList.innerHTML = "";

    let resolvedByAgent = 0;

    tickets.forEach(ticket => {
      if (filter === "unassigned" && ticket.assignedTo) return;
      if (filter === "assigned" && ticket.assignedTo !== agentId) return;

      if (ticket.assignedTo === agentId && (ticket.status === "Resolved" || ticket.status === "Closed")) {
        resolvedByAgent++;
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${ticket.id}</td>
        <td>${ticket.subject}</td>
        <td>${ticket.category}</td>
        <td>${ticket.status}</td>
        <td>${ticket.assignedTo || "-"}</td>
        <td>
          <button onclick="assignTicket('${ticket.id}')">Assign</button>
          <button onclick="openReplyModal('${ticket.id}')">Reply</button>
        </td>
      `;
      ticketList.appendChild(row);
    });

    resolvedCount.textContent = `Tickets Resolved/Closed by You: ${resolvedByAgent}`;
  } catch (err) {
    console.error("Error fetching tickets:", err);
  }
}

async function assignTicket(id) {
  await fetch(`${API_BASE}/tickets/${id}/assign`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assignedTo: agentId })
  });
  loadTickets();
}

function openReplyModal(id) {
  modal.style.display = "flex";
  modalTicketId.textContent = `Ticket ID: ${id}`;
  currentTicketId = id;
}

async function submitReply() {
  const replyText = document.getElementById("agentReply").value;
  const newStatus = document.getElementById("updateStatus").value;

  await fetch(`${API_BASE}/tickets/${currentTicketId}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: replyText, status: newStatus, role: "agent" })
  });

  loadTickets();
  modal.style.display = "none";
  document.getElementById("agentReply").value = "";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };

queueFilter.onchange = loadTickets;
window.onload = loadTickets;
