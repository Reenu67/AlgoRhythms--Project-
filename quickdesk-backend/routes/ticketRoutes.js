import express from "express";

const ticketRoutes = (tickets) => {
  const router = express.Router();

  router.get("/tickets", (req, res) => {
    res.json(tickets);
  });

  router.post("/api/tickets", (req, res) => {
    const { id, subject, category, status, replies = 0, updated } = req.body;
    if (!id || !subject || !category || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTicket = {
      id,
      subject,
      category,
      status,
      replies,
      updated,
      assignedTo: null,
      messages: []
    };

    tickets.push(newTicket);
    res.status(201).json({ success: true, ticket: newTicket });
  });

  router.put("/tickets/:id/assign", (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.assignedTo = req.body.assignedTo;
    res.json({ success: true, ticket });
  });

  router.post("/tickets/:id/reply", (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const { message, status, role } = req.body;
    if (message) {
      ticket.messages.push({ message, role, date: new Date().toISOString() });
      ticket.replies = (ticket.replies || 0) + 1;
    }
    if (status) ticket.status = status;
    ticket.updated = new Date().toISOString().split("T")[0];

    res.json({ success: true, ticket });
  });

  return router;
};

export default ticketRoutes;