const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.status(200).json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const newRep = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRep);

  return response.status(200).json(newRep);
});

app.put('/repositories/:id', (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const index = repositories.findIndex((curr) => curr.id === id);

  if (index < 0) return response.status(400).json({ error: 'id not found' });

  repositories[index] = {
    id,
    title,
    url,
    techs,
    likes: repositories[index].likes,
  };

  return response.status(200).json(repositories[index]);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((curr) => curr.id === id);

  if (index < 0) return response.status(400).json({ error: 'id not found' });

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((curr) => curr.id === id);

  if (index < 0) return response.status(400).json({ error: 'id not found' });

  const { url, title, techs, likes } = repositories[index];
  repositories[index] = {
    id,
    url,
    title,
    techs,
    likes: likes + 1,
  };

  return response.status(200).json(repositories[index]);
});

module.exports = app;
