import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tickets = [];
let users = [
  { _id: "ADM001", name: "Admin", email: "admin@quickdesk.com", password: "admin123", role: "admin" },
  { _id: "AGT001", name: "John Doe", email: "agent@quickdesk.com", password: "agent123", role: "agent" }
];
let categories = [
  { name: "Login Issues", description: "Problems logging in" },
  { name: "Network", description: "Connectivity problems" }
];

// Login
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (user) res.json({ success: true, user });
  else res.status(401).json({ success: false, message: "Invalid credentials" });
});

// Signup
app.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ success: false, message: "User already exists" });
  }

  const newUser = {
    _id: `USR${users.length + 1}.padStart(6, "0")`,
    name, email, password, role
  };
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

// Get users (non-endusers)
app.get("/agents", (req, res) => {
  const agents = users.filter(u => u.role !== "enduser");
  res.json(agents);
});

// Get categories
app.get("/categories", (req, res) => {
  res.json(categories);
});

// Mount ticket routes
app.use(ticketRoutes(tickets));

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});