import express from 'express';
const app = express();
const port = 3000;

const usuarios = [
  { id: 1, nome: "Valentino" },
  { id: 2, nome: "Beatriz" },
  { id: 3, nome: "João" }
];

app.get('/', (req, res) => {
  res.send('Bem-vindo ao Express!');
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: "Luísa"
  }
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const usuario = usuarios.find(u => u.id === parseInt(id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.status(200).json(usuario);
});-

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});