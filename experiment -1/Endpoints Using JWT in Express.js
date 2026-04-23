
const express = require("express"), jwt = require("jsonwebtoken"), bcrypt = require("bcryptjs");
const app = express(); app.use(express.json());
const KEY = "myKey", users = [], PORT = 3000;

// REGISTER
app.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  users.push({ username: req.body.username, password: hash });
  res.send("Registered");
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ user: user.username }, KEY, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).send("Failed");
});

// AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, KEY, (err, data) => {
    if (err) return res.sendStatus(401);
    req.user = data; next();
  });
};

// PROTECTED ROUTE
app.get("/dashboard", auth, (req, res) => res.json(req.user));

app.listen(PORT, () => console.log("Running on " + PORT));