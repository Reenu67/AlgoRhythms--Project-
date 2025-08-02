// agent-script.js
const ticketList = document.getElementById("agentTicketList");
const queueFilter = document.getElementById("queueFilter");
const modal = document.getElementById("replyModal");
const modalTicketId = document.getElementById("modalTicketId");
const closeModal = document.getElementById("closeModal");
const agentHeader = document.getElementById("agentHeader");
const resolvedCount = document.getElementById("resolvedCount");

let currentTicketId = null;
const agentId = "AGT001";
const agentName = "John Doe";

// Set dynamic header
agentHeader.innerHTML = `QuickDesk Support System<br>Agent ID: ${agentId} | Name: ${agentName}`;

function getTickets() {
  return JSON.parse(localStorage.getItem("tickets")) || [];
}

function saveTickets(tickets) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function loadTickets() {
  const tickets = getTickets();
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
}

function assignTicket(id) {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === id);
  if (ticket) {
    ticket.assignedTo = agentId;
    saveTickets(tickets);
    loadTickets();
  }
}

function openReplyModal(id) {
  modal.style.display = "flex";
  modalTicketId.textContent = `Ticket ID: ${id}`;
  currentTicketId = id;
}

function submitReply() {
  const replyText = document.getElementById("agentReply").value;
  const newStatus = document.getElementById("updateStatus").value;

  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === currentTicketId);
  if (ticket) {
    if (!ticket.conversation) ticket.conversation = [];
    ticket.conversation.push({ role: "agent", message: replyText });
    ticket.status = newStatus;
    saveTickets(tickets);
    loadTickets();
    modal.style.display = "none";
    document.getElementById("agentReply").value = "";
  }
}

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = e => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

queueFilter.onchange = loadTickets;
window.onload = loadTickets;
