import express from 'express';
const app = express();
const port = 3000;
const tarefas = [
    { id: 1, titulo: 'Comprar leite', concluida: false },
    { id: 2, titulo: 'Estudar Node.js', concluida: true },
    { id: 3, titulo: 'Fazer exercícios', concluida: false }
]

  app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de tarefas no ar');
});

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.get('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === parseInt(id));
  res.json(tarefa);
  if (!tarefa) {
    res.status(404).send({ error: 'Tarefa não encontrada' });
  }
});

app.get('/tarefas?concluida=true', (req, res) => {
  const concluida = req.query.concluida === 'true';
  const tarefasFiltradas = tarefas.filter(t => t.concluida === concluida);
  res.json(tarefasFiltradas);
});

app.post('/tarefas', (req, res) => {
  const titulo = req.body.titulo;
  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});