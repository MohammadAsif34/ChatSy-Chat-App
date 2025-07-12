import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Welcome to ChatSy Server." });
});

app.listen(8000, (err) => {
  if (err) return console.log(err.message);
  console.log("server running at http://localhost:8000");
});
