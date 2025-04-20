const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const todos = [
  { id: 1, task: "Estudar SQL" },
  { id: 2, task: "Fazer deploy do front" },
];

// Lista todas as tarefas
app.get("/todos", (req, res) => {
  res.json(todos);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Adiciona uma tarefa
app.post("/todos", (req, res) => {
  const novaTarefa = req.body.tarefa;

  if (!novaTarefa) {
    return res.status(400).json({ erro: "Tarefa é obrigatória!" });
  }

  const nova = {
    id: Date.now(),
    task: novaTarefa,
  };

  todos.push(nova);
  res.status(201).json({ mensagem: "Tarefa adicionada com sucesso!", nova });
});

// Editar tarefa
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const novaTarefa = req.body.tarefa;

  const index = todos.findIndex((todo) => todo.id == id);
  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  todos[index].task = novaTarefa;
  res.json({ mensagem: "Tarefa atualizada com sucesso!" });
});

// Excluir tarefa
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id == id);
  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  todos.splice(index, 1);
  res.json({ mensagem: "Tarefa excluída com sucesso!" });
});

