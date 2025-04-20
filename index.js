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

app.post("/todos", (req, res) => {
  const novaTarefa = req.body.tarefa;

  if (!novaTarefa) {
    return res.status(400).json({ erro: "Tarefa é obrigatória!" });
  }

  // Definir a nova tarefa corretamente
  const novoItem = {
    id: todos.length + 1, // Atribui um ID baseado na quantidade de itens existentes
    task: novaTarefa, // Usa o valor da tarefa enviada
  };

  // Agora você pode adicionar ela ao array todos
  todos.push(novoItem);

  res
    .status(201)
    .json({ mensagem: "Tarefa adicionada com sucesso!", tarefa: novoItem });
});

