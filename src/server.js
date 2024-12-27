const express = require('express');
const bodyParser = require('body-parser');
const playlistController = require('./controllers/playlist-controller');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/playlists', playlistController.index); // Obter todas as playlists
app.get('/playlists/:id', playlistController.show); // Obter playlist individual
app.post('/playlists', playlistController.save); // Criar nova playlist
app.put('/playlists/:id', playlistController.update); // Atualizar playlist
app.delete('/playlists/:id', playlistController.delete); // Deletar playlist

app.post('/playlists/:id/music', playlistController.addMusic); // Adicionar música
app.delete('/playlists/:id/music/:musicId', playlistController.removeMusic); // Remover música

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
