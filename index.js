const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const todos = [
  { id: 1, task: "Estudar SQL" },
  { id: 2, task: "Fazer deploy do front" },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
